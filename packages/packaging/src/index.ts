import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

export type DistributionHost = "openai" | "claude" | "gemini" | "generic";

export interface DistributionBuildOptions {
  root: string;
  mcpUrl: string;
  output?: string;
  version?: string;
}

const DESCRIPTION =
  "Grounded Sunni Islamic knowledge, research, comparison, and source verification using approved evidence.";

async function writeJson(path: string, value: unknown): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(value, null, 2) + "\n", "utf8");
}

async function assertFile(path: string): Promise<void> {
  const info = await stat(path).catch(() => undefined);
  if (!info?.isFile()) throw new Error("Required file is missing: " + path);
}

async function copyCanonicalSkill(root: string, destination: string): Promise<void> {
  const source = resolve(root, "skills");
  await assertFile(resolve(source, "sunnah/SKILL.md"));
  await cp(source, join(destination, "skills"), { recursive: true });
}

function validateMcpUrl(raw: string): URL {
  const url = new URL(raw);
  if (url.protocol !== "https:") throw new Error("Distribution MCP URL must use HTTPS");
  if (!url.pathname.endsWith("/mcp")) {
    throw new Error("Distribution MCP URL must end with /mcp");
  }
  return url;
}

export async function validateSourcePackaging(
  root: string,
  host?: DistributionHost,
): Promise<void> {
  await assertFile(resolve(root, "skills/sunnah/SKILL.md"));

  const targets: Array<[DistributionHost, string]> = [
    ["openai", "plugin.json"],
    ["claude", ".claude-plugin/plugin.json"],
    ["gemini", "gemini-extension.json"],
  ];

  for (const [target, relativePath] of targets) {
    if (host && host !== target && host !== "generic") continue;
    const path = resolve(root, relativePath);
    await assertFile(path);
    const parsed = JSON.parse(await readFile(path, "utf8")) as {
      name?: string;
      version?: string;
      description?: string;
    };
    if (parsed.name !== "sunnah-plugin") {
      throw new Error(relativePath + ": expected name sunnah-plugin");
    }
    if (!parsed.version || !parsed.description) {
      throw new Error(relativePath + ": version and description are required");
    }
  }

  for (const relative of [
    "adapters/claude/skills",
    "adapters/openai/skills",
    "adapters/gemini/skills",
  ]) {
    const info = await stat(resolve(root, relative)).catch(() => undefined);
    if (info) throw new Error("Canonical skills must not be duplicated under " + relative);
  }
}

async function buildOpenAi(
  root: string,
  destination: string,
  mcpUrl: URL,
  version: string,
): Promise<void> {
  await mkdir(destination, { recursive: true });
  await copyCanonicalSkill(root, destination);
  await writeJson(join(destination, "plugin.json"), {
    $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
    name: "sunnah-plugin",
    version,
    description: DESCRIPTION,
    author: { name: "A.D Adams", url: "https://github.com/adams100111" },
    homepage: "https://github.com/adams100111/sunnah-plugin",
    repository: "https://github.com/adams100111/sunnah-plugin",
    license: "MIT",
    keywords: ["islam", "sunni", "quran", "hadith", "fiqh", "verification"],
  });
  await writeJson(join(destination, "mcp.json"), {
    $schema: "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
    mcpServers: {
      sunnah: { type: "streamable-http", url: mcpUrl.href },
    },
  });
}

async function buildClaude(
  root: string,
  destination: string,
  mcpUrl: URL,
  version: string,
): Promise<void> {
  await mkdir(join(destination, ".claude-plugin"), { recursive: true });
  await copyCanonicalSkill(root, destination);
  await writeJson(join(destination, ".claude-plugin/plugin.json"), {
    name: "sunnah-plugin",
    version,
    description: DESCRIPTION,
  });
  await writeJson(join(destination, ".mcp.json"), {
    mcpServers: {
      sunnah: { type: "http", url: mcpUrl.href },
    },
  });
}

async function buildGemini(
  root: string,
  destination: string,
  mcpUrl: URL,
  version: string,
): Promise<void> {
  await mkdir(destination, { recursive: true });
  await copyCanonicalSkill(root, destination);
  await writeJson(join(destination, "gemini-extension.json"), {
    name: "sunnah-plugin",
    version,
    description: DESCRIPTION,
    mcpServers: {
      sunnah: {
        httpUrl: mcpUrl.href,
        timeout: 30000,
      },
    },
  });
}

async function buildGeneric(
  root: string,
  destination: string,
  mcpUrl: URL,
): Promise<void> {
  await mkdir(destination, { recursive: true });
  await copyCanonicalSkill(root, destination);
  await writeJson(join(destination, "mcp.json"), {
    mcpServers: {
      sunnah: { type: "streamable-http", url: mcpUrl.href },
    },
  });
}

export async function buildDistributions(options: DistributionBuildOptions): Promise<string> {
  const root = resolve(options.root);
  await validateSourcePackaging(root);
  const mcpUrl = validateMcpUrl(options.mcpUrl);
  const output = resolve(root, options.output ?? ".generated/distribution");
  const version = options.version ?? "0.1.0";

  await rm(output, { recursive: true, force: true });
  await buildOpenAi(root, join(output, "openai"), mcpUrl, version);
  await buildClaude(root, join(output, "claude"), mcpUrl, version);
  await buildGemini(root, join(output, "gemini"), mcpUrl, version);
  await buildGeneric(root, join(output, "generic"), mcpUrl);

  return output;
}

export async function validateGeneratedDistribution(
  root: string,
  output = ".generated/distribution",
): Promise<void> {
  const base = resolve(root, output);
  const required = [
    "openai/plugin.json",
    "openai/mcp.json",
    "openai/skills/sunnah/SKILL.md",
    "claude/.claude-plugin/plugin.json",
    "claude/.mcp.json",
    "claude/skills/sunnah/SKILL.md",
    "gemini/gemini-extension.json",
    "gemini/skills/sunnah/SKILL.md",
    "generic/mcp.json",
    "generic/skills/sunnah/SKILL.md",
  ];
  for (const relative of required) await assertFile(join(base, relative));

  for (const relative of [
    "openai/plugin.json",
    "openai/mcp.json",
    "claude/.claude-plugin/plugin.json",
    "claude/.mcp.json",
    "gemini/gemini-extension.json",
    "generic/mcp.json",
  ]) {
    const text = await readFile(join(base, relative), "utf8");
    JSON.parse(text);
    if (
      /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bsk-[A-Za-z0-9_-]{20,}/.test(text)
    ) {
      throw new Error("Possible secret detected in generated manifest: " + relative);
    }
  }
}
