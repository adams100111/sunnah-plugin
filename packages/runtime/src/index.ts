import {
  fetchApprovedUrlEvidence,
  fetchQuranVerseEvidence,
  type FetchPolicy,
  type QuranFoundationCredentials,
} from "@sunnah/evidence";
import type { CompiledRegistry } from "@sunnah/registry";
import type { Claim, Evidence, PublicationResult } from "@sunnah/schemas";
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

  async fetchIslamicEvidence(sourceId: string, url: string): Promise<Evidence> {
    return fetchApprovedUrlEvidence(
      this.options.registry,
      sourceId,
      url,
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
      [
        {
          id: "quotation",
          text: quotation,
          claimClass: "source-attribution",
          evidenceIds: [evidence.id],
          quotation,
          applicability: "general",
        },
      ],
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
