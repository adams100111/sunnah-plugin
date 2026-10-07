import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildDistributions,
  validateGeneratedDistribution,
  validateSourcePackaging,
} from "@sunnah/packaging";

describe("cross-host packaging evals", () => {
  it("builds Claude, OpenAI, Gemini, and generic artifacts from one canonical skill tree", async () => {
    const root = process.cwd();
    await validateSourcePackaging(root);

    const output = await mkdtemp(join(tmpdir(), "sunnah-dist-"));
    await buildDistributions({
      root,
      output,
      mcpUrl: "https://sunnah.example.test/mcp",
      version: "0.1.0-test",
    });
    await validateGeneratedDistribution(root, output);

    const hosts = ["openai", "claude", "gemini", "generic"] as const;
    const canonicalFiles = [
      "SKILL.md",
      "references/output.md",
      "references/trust.md",
      "references/lite-mode.md",
      "references/workflows/answer.md",
      "references/workflows/compare.md",
      "examples/answer-ar.md",
      "examples/answer-en.md",
    ];

    for (const relative of canonicalFiles) {
      const source = await readFile(join(root, "skills/sunnah", relative), "utf8");
      for (const host of hosts) {
        const packaged = await readFile(
          join(output, host, "skills/sunnah", relative),
          "utf8",
        );
        expect(packaged).toBe(source);
      }
    }

    const openAiSkill = await readFile(join(output, "openai/skills/sunnah/SKILL.md"), "utf8");
    const outputContract = await readFile(
      join(output, "openai/skills/sunnah/references/output.md"),
      "utf8",
    );

    expect(openAiSkill).toContain("Parametric model memory is never Islamic authority");
    expect(openAiSkill).toContain("Render substantive Islamic answers source-first");
    expect(outputContract).toContain("EXACT RETRIEVED PASSAGE");
    expect(outputContract).toContain("SCHOLAR_REQUIRED");
  });
});
