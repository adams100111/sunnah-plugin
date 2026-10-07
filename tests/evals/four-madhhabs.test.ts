import { describe, expect, it } from "vitest";
import { loadRegistry, sourcePack } from "@sunnah/registry";

const expected = {
  "madhhab-hanafi": "hanafi",
  "madhhab-maliki": "maliki",
  "madhhab-shafii": "shafii",
  "madhhab-hanbali": "hanbali",
} as const;

describe("four madhhab source foundation", () => {
  it("loads four explicit work-based madhhab packs", async () => {
    const registry = await loadRegistry(process.cwd());

    for (const [packId, madhhab] of Object.entries(expected)) {
      const sources = sourcePack(registry, packId);
      expect(sources.length).toBeGreaterThanOrEqual(3);
      for (const source of sources) {
        expect(source.sourceClass).toBe("APPROVED_PRIMARY_WORK");
        expect(source.authority.type).toBe("work");
        expect(source.work?.madhhab).toBe(madhhab);
        expect(source.work?.accessProvider).toBe("Usul.ai");
        expect(source.supports).toContain("madhhab-position");
      }
    }
  });

  it("does not grant fatwa-summary authority to primary works", async () => {
    const registry = await loadRegistry(process.cwd());
    for (const packId of Object.keys(expected)) {
      for (const source of sourcePack(registry, packId)) {
        expect(source.supports).not.toContain("fatwa-summary");
      }
    }
  });
});
