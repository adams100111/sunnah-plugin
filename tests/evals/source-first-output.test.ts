import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("source-first answer contract", () => {
  it("requires evidence before generated Islamic synthesis", async () => {
    const skill = await readFile("skills/sunnah/SKILL.md", "utf8");
    const output = await readFile("skills/sunnah/references/output.md", "utf8");

    expect(skill).toContain("references/output.md");
    expect(skill).toContain("Render substantive Islamic answers source-first");
    expect(output).toContain("SOURCE");
    expect(output).toContain("EXACT RETRIEVED PASSAGE");
    expect(output).toContain("ATTRIBUTION");
    expect(output).toContain("GENERATED SUMMARY");
    expect(output).toContain("Never lead with a model-generated religious conclusion");
  });

  it("requires direct source locators and rejects citation-card substitutes in Lite mode", async () => {
    const lite = await readFile("skills/sunnah/references/lite-mode.md", "utf8");

    expect(lite).toContain("exact source page/document");
    expect(lite).toContain("direct canonical URL or source locator");
    expect(lite).toContain("relevant retrieved passage");
    expect(lite).toContain("favicon");
    expect(lite).toContain("not sufficient evidence presentation");
  });

  it("keeps Full mode verification separate from evidence presentation", async () => {
    const output = await readFile("skills/sunnah/references/output.md", "utf8");
    const docs = await readFile("docs/architecture/output-contract.md", "utf8");

    expect(output).toContain("Passing verification does not remove the requirement");
    expect(docs).toContain("evidence-first, not citation-after-the-fact");
  });
});
