import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("source-bounded attribution and personal applicability", () => {
  it("treats application to user facts as a separate claim", async () => {
    const output = await readFile("skills/sunnah/references/output.md", "utf8");
    const lite = await readFile("skills/sunnah/references/lite-mode.md", "utf8");
    const abstention = await readFile("docs/methodology/abstention-and-escalation.md", "utf8");

    expect(output).toContain("personal application as a separate proposition");
    expect(lite).toContain("general ruling and its application to the user's facts are separate propositions");
    expect(abstention).toContain("Personal applicability is a separate substantive claim");
  });

  it("fails closed instead of inventing juristic thresholds", async () => {
    const lite = await readFile("skills/sunnah/references/lite-mode.md", "utf8");
    const output = await readFile("skills/sunnah/references/output.md", "utf8");

    expect(lite).toContain("Do not infer that tiredness is illness");
    expect(lite).toContain("SCHOLAR_REQUIRED");
    expect(lite).toContain("retrieved source itself distinguishes factual states");
    expect(output).toContain("does not create a new model-derived legal test");
  });

  it("guards the Fajr exhaustion regression", async () => {
    const regression = await readFile("tests/evals/fixtures/fajr-exhaustion.md", "utf8");
    const arabic = await readFile("skills/sunnah/examples/answer-ar.md", "utf8");

    expect(regression).toContain("led with a generated ruling rather than the evidence");
    expect(regression).toContain("do not decide that question");
    expect(regression).toContain("SCHOLAR_REQUIRED");
    expect(arabic).toContain("المصادر والنصوص المسترجعة");
    expect(arabic).toContain("SCHOLAR_REQUIRED");
  });

  it("clarifies source-defined personal facts before rendering evidence to the user", async () => {
    const output = await readFile("skills/sunnah/references/output.md", "utf8");
    const lite = await readFile("skills/sunnah/references/lite-mode.md", "utf8");
    const regression = await readFile("tests/evals/fixtures/fajr-exhaustion.md", "utf8");

    expect(output).toContain("retrieve relevant evidence privately before asking");
    expect(output).toContain("do not render evidence blocks until clarification is complete");
    expect(lite).toContain("ask the source-driven clarification before showing the source blocks");
    expect(regression).toContain("clarification must happen before user-visible source rendering");
  });

  it("requires strict evidence-first answer sections in both languages", async () => {
    const arabic = await readFile("skills/sunnah/examples/answer-ar.md", "utf8");
    const english = await readFile("skills/sunnah/examples/answer-en.md", "utf8");

    expect(arabic.indexOf("المصادر والنصوص المسترجعة")).toBeLessThan(arabic.indexOf("خلاصة ما تقوله المصادر"));
    expect(english.indexOf("Sources and retrieved passages")).toBeLessThan(english.indexOf("What the sources state"));
    expect(english).toContain("Applicability / limitation");
  });
});
