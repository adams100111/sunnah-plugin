import { describe, expect, it } from "vitest";
import {
  fetchApprovedUrlEvidence,
  safeFetchPublicText,
} from "@sunnah/evidence";
import { loadRegistry } from "@sunnah/registry";

describe("network security contract", () => {
  it("keeps injected test transports behind the same private-address preflight", async () => {
    await expect(
      safeFetchPublicText(new URL("https://example.com"), {
        resolveHost: async () => ["127.0.0.1"],
        fetcher: async () =>
          new Response("should never be reached", {
            status: 200,
            headers: { "content-type": "text/plain" },
          }),
      }),
    ).rejects.toThrow("forbidden network address");
  });

  it("revalidates every approved-source redirect against source paths", async () => {
    const registry = await loadRegistry(process.cwd());
    await expect(
      fetchApprovedUrlEvidence(
        registry,
        "ibn-baz-official",
        "https://binbaz.org.sa/fatwas/123",
        {
          resolveHost: async () => ["8.8.8.8"],
          fetcher: async () =>
            new Response(null, {
              status: 302,
              headers: { location: "https://binbaz.org.sa/search?q=redirect" },
            }),
        },
      ),
    ).rejects.toThrow("not permitted");
  });
});
