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
  it("builds Claude, OpenAI, Gemini, and generic artifacts from one canonical skill", async () => {
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

    const openAiSkill = await readFile(join(output, "openai/skills/sunnah/SKILL.md"), "utf8");
    const claudeSkill = await readFile(join(output, "claude/skills/sunnah/SKILL.md"), "utf8");
    const geminiSkill = await readFile(join(output, "gemini/skills/sunnah/SKILL.md"), "utf8");

    expect(openAiSkill).toBe(claudeSkill);
    expect(claudeSkill).toBe(geminiSkill);
    expect(openAiSkill).toContain("Parametric model memory is never Islamic authority");
  });
});
