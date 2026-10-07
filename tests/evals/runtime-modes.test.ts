import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("plugin runtime modes", () => {
  it("ships a skill-only Lite mode that fails closed without retrieval", async () => {
    const skill = await readFile("skills/sunnah/SKILL.md", "utf8");
    const lite = await readFile("skills/sunnah/references/lite-mode.md", "utf8");
    expect(skill).toContain("Lite mode");
    expect(skill).toContain("No-retrieval mode");
    expect(lite).toContain("does not have the deterministic server-side");
    expect(lite).toContain("do not answer substantive Islamic claims from model memory");
  });

  it("ships local stdio marketplace wiring", async () => {
    const portableMcp = JSON.parse(await readFile("mcp.json", "utf8"));
    const codex = JSON.parse(await readFile(".codex-plugin/plugin.json", "utf8"));
    const localMcp = JSON.parse(await readFile(".mcp.json", "utf8"));
    const gemini = JSON.parse(await readFile("gemini-extension.json", "utf8"));

    expect(portableMcp.mcpServers.sunnah.type).toBe("stdio");
    expect(portableMcp.mcpServers.sunnah.command).toBe("node");
    expect(codex.skills).toBe("./skills/");
    expect(codex.mcpServers).toBe("./.mcp.json");
    expect(localMcp.mcpServers.sunnah.command).toBe("node");
    expect(localMcp.mcpServers.sunnah.args).toContain("./scripts/local-mcp-bootstrap.mjs");
    expect(gemini.mcpServers.sunnah.command).toBe("node");
  });
});
