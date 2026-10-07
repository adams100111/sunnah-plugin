import { sourceAllowsClaim, type CompiledRegistry } from "@sunnah/registry";
import {
  ClaimVerificationSchema,
  PublicationResultSchema,
  type Claim,
  type ClaimVerification,
  type Evidence,
  type PublicationResult,
  type SupportStatus,
} from "@sunnah/schemas";

export interface SemanticVerifier {
  verify(claim: Claim, evidence: Evidence[]): Promise<ClaimVerification>;
}

function normalize(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim().toLocaleLowerCase();
}

export class ConservativeSemanticVerifier implements SemanticVerifier {
  async verify(claim: Claim, evidence: Evidence[]): Promise<ClaimVerification> {
    const normalizedClaim = normalize(claim.text);
    const entailed = evidence.some((item) => normalize(item.passage).includes(normalizedClaim));
    return ClaimVerificationSchema.parse({
      claimId: claim.id,
      status: entailed ? "ENTAILED" : "NOT_SUPPORTED",
      evidenceIds: evidence.map((item) => item.id),
      reasons: entailed
        ? ["Claim text is directly present in retrieved evidence."]
        : ["No configured semantic verifier established support for this paraphrase."],
    });
  }
}

export class HttpSemanticVerifier implements SemanticVerifier {
  constructor(
    private readonly endpoint: string,
    private readonly token?: string,
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  async verify(claim: Claim, evidence: Evidence[]): Promise<ClaimVerification> {
    const response = await this.fetcher(this.endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(this.token ? { authorization: `Bearer ${this.token}` } : {}),
      },
      body: JSON.stringify({ claim, evidence }),
    });
    if (!response.ok) throw new Error(`Semantic verifier returned HTTP ${response.status}`);
    return ClaimVerificationSchema.parse(await response.json());
  }
}

function quotationSupported(quotation: string, evidence: Evidence[]): boolean {
  const needle = normalize(quotation);
  return evidence.some((item) => normalize(item.passage).includes(needle));
}

function blockedVerification(
  claim: Claim,
  status: SupportStatus,
  reason: string,
): ClaimVerification {
  return {
    claimId: claim.id,
    status,
    evidenceIds: claim.evidenceIds,
    reasons: [reason],
  };
}

function evidenceAllowsClaim(
  registry: CompiledRegistry,
  evidence: Evidence,
  claimClass: Claim["claimClass"],
): boolean {
  if (registry.sources[evidence.sourceId]) {
    return sourceAllowsClaim(registry, evidence.sourceId, claimClass);
  }
  if (
    evidence.sourceClass !== "USER_SUPPLIED_UNTRUSTED" &&
    evidence.sourceClass !== "EXTERNAL_FACTUAL"
  ) {
    return false;
  }
  return registry.sourceClassPolicy.classes[evidence.sourceClass].allows.includes(claimClass);
}

export interface PublicationOptions {
  recognizedDisagreement?: boolean;
}

export async function runPublicationGate(
  registry: CompiledRegistry,
  claims: Claim[],
  evidence: Evidence[],
  verifier: SemanticVerifier,
  options: PublicationOptions = {},
): Promise<PublicationResult> {
  const evidenceById = new Map(evidence.map((item) => [item.id, item]));
  const verifications: ClaimVerification[] = [];
  const publishableClaims: Claim[] = [];
  const blockedClaims: Claim[] = [];
  const limitations: string[] = [];
  let requiresScholar = false;

  for (const claim of claims) {
    const supportingEvidence = claim.evidenceIds
      .map((id) => evidenceById.get(id))
      .filter((item): item is Evidence => item !== undefined);

    let verification: ClaimVerification;

    if (supportingEvidence.length !== claim.evidenceIds.length) {
      verification = blockedVerification(claim, "NOT_SUPPORTED", "One or more evidence IDs were not retrieved.");
    } else if (
      supportingEvidence.some((item) => !evidenceAllowsClaim(registry, item, claim.claimClass))
    ) {
      verification = blockedVerification(
        claim,
        "NOT_SUPPORTED",
        "At least one cited source is not permitted to support this claim class.",
      );
    } else if (claim.quotation && !quotationSupported(claim.quotation, supportingEvidence)) {
      verification = blockedVerification(
        claim,
        "NOT_SUPPORTED",
        "The quoted wording does not occur in the retrieved evidence.",
      );
    } else if (claim.claimClass === "practical-applicability" || claim.applicability === "personal") {
      requiresScholar = true;
      verification = blockedVerification(
        claim,
        "NOT_SUPPORTED",
        "Personal applicability requires qualified scholarly judgment under the active policy.",
      );
    } else {
      try {
        verification = await verifier.verify(claim, supportingEvidence);
      } catch (error) {
        verification = blockedVerification(
          claim,
          "NOT_SUPPORTED",
          `Semantic verification failed closed: ${error instanceof Error ? error.message : "unknown error"}`,
        );
      }
    }

    const parsed = ClaimVerificationSchema.parse(verification);
    verifications.push(parsed);
    if (parsed.status === "ENTAILED") publishableClaims.push(claim);
    else blockedClaims.push(claim);
  }

  if (requiresScholar) {
    limitations.push("One or more requested conclusions require qualified personal applicability judgment.");
  }
  if (blockedClaims.length > 0) {
    limitations.push("One or more candidate claims did not pass the publication gate.");
  }

  let status: PublicationResult["status"];
  if (requiresScholar) status = "SCHOLAR_REQUIRED";
  else if (options.recognizedDisagreement && publishableClaims.length > 0) status = "DISAGREEMENT";
  else if (publishableClaims.length === 0) status = "INSUFFICIENT_EVIDENCE";
  else if (blockedClaims.length > 0) status = "PARTIALLY_ANSWERED";
  else status = "ANSWERED";

  return PublicationResultSchema.parse({
    status,
    publishableClaims,
    blockedClaims,
    verifications,
    limitations,
  });
}
