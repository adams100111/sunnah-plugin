import { describe, expect, it } from "vitest";
import { loadRegistry } from "@sunnah/registry";
import type { Claim, Evidence } from "@sunnah/schemas";
import {
  ConservativeSemanticVerifier,
  runPublicationGate,
} from "@sunnah/verification";

const evidence = (overrides: Partial<Evidence> = {}): Evidence => ({
  id: "ev_1",
  sourceId: "ibn-baz-official",
  sourceClass: "APPROVED_SCHOLAR_CORPUS",
  authority: { type: "scholar", id: "abd-al-aziz-ibn-baz", name: "Abd al-Aziz ibn Baz" },
  documentId: "fatwa:123",
  canonicalUrl: "https://binbaz.org.sa/fatwas/123",
  passage: "The retrieved source states the general rule clearly.",
  language: "en",
  registryRevision: "test",
  retrievedAt: "2026-10-07T00:00:00.000Z",
  ...overrides,
});

const claim = (overrides: Partial<Claim> = {}): Claim => ({
  id: "cl_1",
  text: "The retrieved source states the general rule clearly.",
  claimClass: "scholar-position",
  evidenceIds: ["ev_1"],
  applicability: "general",
  ...overrides,
});

describe("publication gate", () => {
  it("publishes only a supported eligible claim", async () => {
    const registry = await loadRegistry(process.cwd());
    const result = await runPublicationGate(
      registry,
      [claim()],
      [evidence()],
      new ConservativeSemanticVerifier(),
    );
    expect(result.status).toBe("ANSWERED");
    expect(result.publishableClaims).toHaveLength(1);
  });

  it("blocks a real citation that does not support the paraphrase", async () => {
    const registry = await loadRegistry(process.cwd());
    const result = await runPublicationGate(
      registry,
      [claim({ text: "A different unsupported conclusion." })],
      [evidence()],
      new ConservativeSemanticVerifier(),
    );
    expect(result.status).toBe("INSUFFICIENT_EVIDENCE");
    expect(result.blockedClaims).toHaveLength(1);
  });

  it("blocks a quotation that is not present", async () => {
    const registry = await loadRegistry(process.cwd());
    const result = await runPublicationGate(
      registry,
      [claim({ quotation: "This quotation was never in the source." })],
      [evidence()],
      new ConservativeSemanticVerifier(),
    );
    expect(result.verifications[0]?.status).toBe("NOT_SUPPORTED");
  });

  it("escalates personal applicability", async () => {
    const registry = await loadRegistry(process.cwd());
    const result = await runPublicationGate(
      registry,
      [claim({ applicability: "personal" })],
      [evidence()],
      new ConservativeSemanticVerifier(),
    );
    expect(result.status).toBe("SCHOLAR_REQUIRED");
  });
});
