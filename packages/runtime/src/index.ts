import {
  fetchApprovedUrlEvidence,
  fetchQuranVerseEvidence,
  fetchUnregisteredUrlEvidence,
  searchApprovedSource,
  findRegisteredSourceForUrl,
  type FetchPolicy,
  type QuranFoundationCredentials,
} from "@sunnah/evidence";
import type { CompiledRegistry } from "@sunnah/registry";
import type { Claim, Evidence, PublicationResult, SearchCandidate } from "@sunnah/schemas";
import {
  ConservativeSemanticVerifier,
  HttpSemanticVerifier,
  runPublicationGate,
  type SemanticVerifier,
} from "@sunnah/verification";

export interface RuntimeOptions {
  registry: CompiledRegistry;
  quranCredentials?: QuranFoundationCredentials;
  semanticVerifier?: SemanticVerifier;
  fetchPolicy?: FetchPolicy;
}

export interface UserSourceInspection {
  provenance: "APPROVED_REGISTERED" | "USER_SUPPLIED_UNTRUSTED";
  registeredSourceId?: string;
  evidence: Evidence;
}

export class SunnahRuntime {
  constructor(private readonly options: RuntimeOptions) {}

  get registry(): CompiledRegistry {
    return this.options.registry;
  }

  async getQuranVerse(verseKey: string): Promise<Evidence> {
    const credentials = this.options.quranCredentials;
    if (!credentials) {
      throw new Error(
        "Quran Foundation credentials are not configured. Set QURAN_FOUNDATION_CLIENT_ID and QURAN_FOUNDATION_ACCESS_TOKEN.",
      );
    }
    return fetchQuranVerseEvidence(this.options.registry, verseKey, credentials);
  }

  async searchIslamicEvidence(
    query: string,
    sourceIds?: string[],
    limit = 5,
  ): Promise<SearchCandidate[]> {
    const ids =
      sourceIds ??
      Object.values(this.options.registry.sources)
        .filter((source) => source.status === "active" && source.retrieval.search)
        .map((source) => source.id);

    const results = await Promise.all(
      ids.map(async (sourceId) => {
        try {
          return await searchApprovedSource(
            this.options.registry,
            sourceId,
            query,
            limit,
            this.options.fetchPolicy,
          );
        } catch {
          return [];
        }
      }),
    );
    return results.flat().slice(0, Math.min(Math.max(limit, 1), 20));
  }

  async fetchIslamicEvidence(sourceId: string, url: string): Promise<Evidence> {
    return fetchApprovedUrlEvidence(
      this.options.registry,
      sourceId,
      url,
      this.options.fetchPolicy,
    );
  }

  async inspectUserSource(url: string): Promise<UserSourceInspection> {
    const parsed = new URL(url);
    const registered = findRegisteredSourceForUrl(this.options.registry, parsed);
    if (registered) {
      return {
        provenance: "APPROVED_REGISTERED",
        registeredSourceId: registered.id,
        evidence: await this.fetchIslamicEvidence(registered.id, url),
      };
    }
    return {
      provenance: "USER_SUPPLIED_UNTRUSTED",
      evidence: await fetchUnregisteredUrlEvidence(
        this.options.registry,
        url,
        "user",
        this.options.fetchPolicy,
      ),
    };
  }

  async fetchExternalFactSource(url: string): Promise<Evidence> {
    return fetchUnregisteredUrlEvidence(
      this.options.registry,
      url,
      "external-fact",
      this.options.fetchPolicy,
    );
  }

  async verifyClaims(
    claims: Claim[],
    evidence: Evidence[],
    recognizedDisagreement = false,
  ): Promise<PublicationResult> {
    return runPublicationGate(
      this.options.registry,
      claims,
      evidence,
      this.options.semanticVerifier ?? new ConservativeSemanticVerifier(),
      { recognizedDisagreement },
    );
  }

  async verifyQuotation(
    sourceId: string,
    url: string,
    quotation: string,
  ): Promise<{ evidence: Evidence; result: PublicationResult }> {
    const evidence = await this.fetchIslamicEvidence(sourceId, url);
    const result = await this.verifyClaims(
      [{
        id: "quotation",
        text: quotation,
        claimClass: "source-attribution",
        evidenceIds: [evidence.id],
        quotation,
        applicability: "general",
      }],
      [evidence],
    );
    return { evidence, result };
  }
}

export function semanticVerifierFromEnvironment(
  env: NodeJS.ProcessEnv = process.env,
): SemanticVerifier {
  const endpoint = env.SUNNAH_VERIFIER_URL;
  if (!endpoint) return new ConservativeSemanticVerifier();
  return new HttpSemanticVerifier(endpoint, env.SUNNAH_VERIFIER_TOKEN);
}
