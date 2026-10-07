import { describe, expect, it } from "vitest";
import { fetchApprovedUrlEvidence } from "@sunnah/evidence";
import { loadRegistry } from "@sunnah/registry";

describe("evidence context bounds", () => {
  it("prefers main content over navigation and caps retrieved evidence context", async () => {
    const registry = await loadRegistry(process.cwd());
    const body = "ن".repeat(50_000);
    const evidence = await fetchApprovedUrlEvidence(
      registry,
      "ibn-baz-official",
      "https://binbaz.org.sa/fatwas/123",
      {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response(
            `<html><body><nav>navigation noise</nav><main>${body}</main><footer>footer noise</footer></body></html>`,
            { status: 200, headers: { "content-type": "text/html" } },
          ),
      },
    );

    expect(evidence.passage).toHaveLength(40_000);
    expect(evidence.truncated).toBe(true);
    expect(evidence.passage).not.toContain("navigation noise");
    expect(evidence.passage).not.toContain("footer noise");
  });

  it("does not mark small evidence as truncated", async () => {
    const registry = await loadRegistry(process.cwd());
    const evidence = await fetchApprovedUrlEvidence(
      registry,
      "ibn-baz-official",
      "https://binbaz.org.sa/fatwas/124",
      {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response("<main>نص قصير</main>", {
            status: 200,
            headers: { "content-type": "text/html" },
          }),
      },
    );

    expect(evidence.truncated).toBeUndefined();
  });
});
