import { describe, expect, it } from "vitest";
import { loadRegistry } from "@sunnah/registry";
import { SunnahRuntime } from "@sunnah/runtime";
import { ConservativeSemanticVerifier } from "@sunnah/verification";

describe("runtime seam", () => {
  it("runs retrieval and publication through one host-independent contract", async () => {
    const registry = await loadRegistry(process.cwd());
    const runtime = new SunnahRuntime({
      registry,
      semanticVerifier: new ConservativeSemanticVerifier(),
      fetchPolicy: {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response("<main>الصلاة واجبة في وقتها</main>", {
            status: 200,
            headers: { "content-type": "text/html" },
          }),
      },
    });

    const evidence = await runtime.fetchIslamicEvidence(
      "ibn-baz-official",
      "https://binbaz.org.sa/fatwas/123",
    );
    const result = await runtime.verifyClaims(
      [
        {
          id: "cl_1",
          text: "الصلاة واجبة في وقتها",
          claimClass: "scholar-position",
          evidenceIds: [evidence.id],
          applicability: "general",
        },
      ],
      [evidence],
    );

    expect(result.status).toBe("ANSWERED");
    expect(result.publishableClaims).toHaveLength(1);
  });
});
