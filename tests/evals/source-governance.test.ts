import { describe, expect, it } from "vitest";
import { loadRegistry } from "@sunnah/registry";
import { SunnahRuntime } from "@sunnah/runtime";
import { ConservativeSemanticVerifier } from "@sunnah/verification";

describe("source-governance evals", () => {
  it("never lets user-supplied evidence establish a scholar position", async () => {
    const registry = await loadRegistry(process.cwd());
    const runtime = new SunnahRuntime({
      registry,
      semanticVerifier: new ConservativeSemanticVerifier(),
      fetchPolicy: {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response("Ibn Baz said this ruling is obligatory.", {
            status: 200,
            headers: { "content-type": "text/plain" },
          }),
      },
    });

    const inspected = await runtime.inspectUserSource("https://example.com/article");
    const result = await runtime.verifyClaims(
      [{
        id: "claim",
        text: "Ibn Baz said this ruling is obligatory.",
        claimClass: "scholar-position",
        evidenceIds: [inspected.evidence.id],
        applicability: "general",
      }],
      [inspected.evidence],
    );

    expect(inspected.evidence.sourceClass).toBe("USER_SUPPLIED_UNTRUSTED");
    expect(result.status).toBe("INSUFFICIENT_EVIDENCE");
    expect(result.publishableClaims).toHaveLength(0);
  });

  it("allows an external fact without promoting it to Islamic authority", async () => {
    const registry = await loadRegistry(process.cwd());
    const runtime = new SunnahRuntime({
      registry,
      semanticVerifier: new ConservativeSemanticVerifier(),
      fetchPolicy: {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response("The service charges a fixed fee.", {
            status: 200,
            headers: { "content-type": "text/plain" },
          }),
      },
    });

    const evidence = await runtime.fetchExternalFactSource("https://example.com/product");
    const factual = await runtime.verifyClaims(
      [{
        id: "fact",
        text: "The service charges a fixed fee.",
        claimClass: "external-fact",
        evidenceIds: [evidence.id],
        applicability: "general",
      }],
      [evidence],
    );
    const religious = await runtime.verifyClaims(
      [{
        id: "religious",
        text: "The service is permissible.",
        claimClass: "scholar-position",
        evidenceIds: [evidence.id],
        applicability: "general",
      }],
      [evidence],
    );

    expect(factual.status).toBe("ANSWERED");
    expect(religious.status).toBe("INSUFFICIENT_EVIDENCE");
  });
});
