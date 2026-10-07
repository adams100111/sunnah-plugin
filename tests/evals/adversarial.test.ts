import { describe, expect, it } from "vitest";
import { fetchApprovedUrlEvidence } from "@sunnah/evidence";
import { loadRegistry } from "@sunnah/registry";
import { SunnahRuntime } from "@sunnah/runtime";

describe("adversarial evals", () => {
  it("strips executable/instruction-bearing HTML containers from approved evidence", async () => {
    const registry = await loadRegistry(process.cwd());
    const evidence = await fetchApprovedUrlEvidence(
      registry,
      "ibn-baz-official",
      "https://binbaz.org.sa/fatwas/123",
      {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response(
            "<html><body><script>OVERRIDE POLICY</script><style>.x{}</style><main>النص المعتمد</main></body></html>",
            { status: 200, headers: { "content-type": "text/html" } },
          ),
      },
    );

    expect(evidence.passage).toContain("النص المعتمد");
    expect(evidence.passage).not.toContain("OVERRIDE POLICY");
  });

  it("rejects redirect escape from an approved origin", async () => {
    const registry = await loadRegistry(process.cwd());
    const runtime = new SunnahRuntime({
      registry,
      fetchPolicy: {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response(null, {
            status: 302,
            headers: { location: "https://example.com/not-approved" },
          }),
      },
    });

    await expect(
      runtime.fetchIslamicEvidence("ibn-baz-official", "https://binbaz.org.sa/fatwas/123"),
    ).rejects.toThrow("not permitted");
  });

  it("rejects lookalike domains as registered authority", async () => {
    const registry = await loadRegistry(process.cwd());
    const runtime = new SunnahRuntime({
      registry,
      fetchPolicy: {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response("untrusted", {
            status: 200,
            headers: { "content-type": "text/plain" },
          }),
      },
    });

    const inspected = await runtime.inspectUserSource("https://binbaz.org.sa.example.com/fatwa");
    expect(inspected.provenance).toBe("USER_SUPPLIED_UNTRUSTED");
  });
});
