import { describe, expect, it } from "vitest";
import { loadRegistry, sourceAllowsClaim, sourcePack } from "@sunnah/registry";

describe("source registry", () => {
  it("loads the repository registry and resolves packs", async () => {
    const registry = await loadRegistry(process.cwd());
    expect(registry.sources["quran-foundation"]?.sourceClass).toBe("CANONICAL");
    expect(sourcePack(registry, "quran-core").map((source) => source.id)).toEqual([
      "quran-foundation",
    ]);
    expect(sourceAllowsClaim(registry, "quran-foundation", "canonical-quotation")).toBe(true);
    expect(sourceAllowsClaim(registry, "quran-foundation", "fatwa-summary")).toBe(false);
  });
});
