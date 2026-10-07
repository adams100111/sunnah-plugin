import { describe, expect, it } from "vitest";
import { searchApprovedSource } from "@sunnah/evidence";
import { loadRegistry } from "@sunnah/registry";
import { SunnahRuntime } from "@sunnah/runtime";

const searchHtml = `
<html><body>
  <a href="/categories/1">Category</a>
  <a href="/fatwas/100/example-one"><h2>حكم المسألة الأولى</h2></a>
  <a href="https://binbaz.org.sa/fatwas/101/example-two">حكم المسألة الثانية</a>
  <a href="https://evil.example/fatwas/999">Untrusted</a>
</body></html>`;

describe("approved source search", () => {
  it("returns only configured result paths from the approved origin", async () => {
    const registry = await loadRegistry(process.cwd());
    const candidates = await searchApprovedSource(
      registry,
      "ibn-baz-official",
      "الصلاة",
      5,
      {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async (input) => {
          const url = new URL(input.toString());
          expect(url.pathname).toBe("/search");
          expect(url.searchParams.get("q")).toBe("الصلاة");
          expect(url.searchParams.get("type")).toBe("fatwa");
          return new Response(searchHtml, {
            status: 200,
            headers: { "content-type": "text/html" },
          });
        },
      },
    );

    expect(candidates.map((candidate) => candidate.url)).toEqual([
      "https://binbaz.org.sa/fatwas/100/example-one",
      "https://binbaz.org.sa/fatwas/101/example-two",
    ]);
  });

  it("makes natural-language approved-source discovery available through runtime", async () => {
    const registry = await loadRegistry(process.cwd());
    const runtime = new SunnahRuntime({
      registry,
      fetchPolicy: {
        resolveHost: async () => ["8.8.8.8"],
        fetcher: async () =>
          new Response(searchHtml, {
            status: 200,
            headers: { "content-type": "text/html" },
          }),
      },
    });

    const candidates = await runtime.searchIslamicEvidence("الصلاة");
    expect(candidates).toHaveLength(2);
    expect(candidates.every((candidate) => candidate.sourceId === "ibn-baz-official")).toBe(true);
  });
});
