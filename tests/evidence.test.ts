import { describe, expect, it } from "vitest";
import {
  fetchApprovedUrlEvidence,
  fetchQuranVerseEvidence,
  isForbiddenAddress,
} from "@sunnah/evidence";
import { loadRegistry } from "@sunnah/registry";

describe("evidence retrieval", () => {
  it("rejects private and loopback addresses", () => {
    expect(isForbiddenAddress("127.0.0.1")).toBe(true);
    expect(isForbiddenAddress("10.0.0.5")).toBe(true);
    expect(isForbiddenAddress("192.168.1.1")).toBe(true);
    expect(isForbiddenAddress("8.8.8.8")).toBe(false);
  });

  it("normalizes approved HTML into compact evidence", async () => {
    const registry = await loadRegistry(process.cwd());
    const evidence = await fetchApprovedUrlEvidence(
      registry,
      "ibn-baz-official",
      "https://binbaz.org.sa/fatwas/123",
      {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response(
            "<html><body><script>ignore()</script><main>نص الفتوى</main></body></html>",
            { status: 200, headers: { "content-type": "text/html; charset=utf-8" } },
          ),
      },
    );
    expect(evidence.sourceId).toBe("ibn-baz-official");
    expect(evidence.passage).toContain("نص الفتوى");
    expect(evidence.passage).not.toContain("ignore()");
  });

  it("rejects approved-source redirects that change the source document identity", async () => {
    const registry = await loadRegistry(process.cwd());
    let request = 0;

    await expect(
      fetchApprovedUrlEvidence(
        registry,
        "ibn-baz-official",
        "https://binbaz.org.sa/fatwas/4507/exhaustion",
        {
          resolveHost: async () => ["8.8.8.8"],
          fetcher: async () => {
            request += 1;
            if (request === 1) {
              return new Response(null, {
                status: 302,
                headers: {
                  location: "https://binbaz.org.sa/fatwas/9999/unrelated",
                },
              });
            }
            return new Response("<main>فتوى أخرى غير مرتبطة</main>", {
              status: 200,
              headers: { "content-type": "text/html" },
            });
          },
        },
      ),
    ).rejects.toThrow("Redirect changed source document identity");
  });

  it("allows canonical slug redirects that preserve the source document identity", async () => {
    const registry = await loadRegistry(process.cwd());
    let request = 0;

    const evidence = await fetchApprovedUrlEvidence(
      registry,
      "ibn-baz-official",
      "https://binbaz.org.sa/fatwas/4507/old-slug",
      {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () => {
          request += 1;
          if (request === 1) {
            return new Response(null, {
              status: 302,
              headers: {
                location: "https://binbaz.org.sa/fatwas/4507/canonical-slug",
              },
            });
          }
          return new Response("<main>نفس الفتوى</main>", {
            status: 200,
            headers: { "content-type": "text/html" },
          });
        },
      },
    );

    expect(evidence.canonicalUrl).toBe("https://binbaz.org.sa/fatwas/4507/canonical-slug");
    expect(evidence.passage).toContain("نفس الفتوى");
  });

  it("retrieves canonical Quran text through the configured adapter", async () => {
    const registry = await loadRegistry(process.cwd());
    const evidence = await fetchQuranVerseEvidence(
      registry,
      "2:255",
      { clientId: "client", accessToken: "token" },
      async () =>
        Response.json({
          verse: {
            id: 262,
            verse_key: "2:255",
            text_uthmani: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ",
          },
        }),
    );
    expect(evidence.documentId).toBe("quran:2:255");
    expect(evidence.language).toBe("ar");
    expect(evidence.passage).toContain("اللَّهُ");
  });
});
