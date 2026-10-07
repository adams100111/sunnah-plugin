import { describe, expect, it } from "vitest";
import { loadRegistry } from "@sunnah/registry";
import { SunnahRuntime } from "@sunnah/runtime";
import { ConservativeSemanticVerifier } from "@sunnah/verification";

describe("user and external sources", () => {
  it("does not confuse a lookalike host with a registered source", async () => {
    const registry = await loadRegistry(process.cwd());
    const runtime = new SunnahRuntime({
      registry,
      fetchPolicy: {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response("<main>Claim from an unknown site</main>", {
            status: 200,
            headers: { "content-type": "text/html" },
          }),
      },
    });

    const inspected = await runtime.inspectUserSource("https://binbaz.org.sa.example.com/post");
    expect(inspected.provenance).toBe("USER_SUPPLIED_UNTRUSTED");
    expect(inspected.evidence.sourceClass).toBe("USER_SUPPLIED_UNTRUSTED");
  });

  it("keeps external facts separate from Islamic authority", async () => {
    const registry = await loadRegistry(process.cwd());
    const runtime = new SunnahRuntime({
      registry,
      semanticVerifier: new ConservativeSemanticVerifier(),
      fetchPolicy: {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response("The product charges a fixed monthly fee.", {
            status: 200,
            headers: { "content-type": "text/plain" },
          }),
      },
    });

    const evidence = await runtime.fetchExternalFactSource("https://example.com/product");
    const factual = await runtime.verifyClaims(
      [{
        id: "fact",
        text: "The product charges a fixed monthly fee.",
        claimClass: "external-fact",
        evidenceIds: [evidence.id],
        applicability: "general",
      }],
      [evidence],
    );
    expect(factual.status).toBe("ANSWERED");

    const religious = await runtime.verifyClaims(
      [{
        id: "religious",
        text: "The product is permissible.",
        claimClass: "scholar-position",
        evidenceIds: [evidence.id],
        applicability: "general",
      }],
      [evidence],
    );
    expect(religious.status).toBe("INSUFFICIENT_EVIDENCE");
  });

  it("rejects a redirect to a private destination", async () => {
    const registry = await loadRegistry(process.cwd());
    const runtime = new SunnahRuntime({
      registry,
      fetchPolicy: {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response(null, { status: 302, headers: { location: "https://127.0.0.1/secret" } }),
      },
    });

    await expect(runtime.inspectUserSource("https://example.com/start")).rejects.toThrow(
      "forbidden network address",
    );
  });
});
