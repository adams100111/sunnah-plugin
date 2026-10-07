#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
import { Command } from "commander";
import {
  buildDistributions,
  validateGeneratedDistribution,
  validateSourcePackaging,
  type DistributionHost,
} from "@sunnah/packaging";
import {
  diffRegistries,
  loadRegistry,
  sourcePack,
  validateRegistry,
  writeCompiledRegistry,
  type CompiledRegistry,
} from "@sunnah/registry";

const program = new Command();
program.name("sunnah").description("Sunnah Plugin maintainer CLI").version("0.1.0");
const rootFrom = (options: { root?: string }): string => resolve(options.root ?? process.cwd());
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

async function run(command: string, args: string[], cwd: string): Promise<void> {
  await new Promise<void>((resolvePromise, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit", env: process.env });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${command} exited with ${code ?? signal ?? "unknown status"}`));
    });
  });
}

program
  .command("validate")
  .description("Validate registry, packs, source policies, skill, and host packaging")
  .option("--root <path>", "repository root")
  .action(async (options) => {
    const root = rootFrom(options);
    const registry = await validateRegistry(root);
    await validateSourcePackaging(root);
    console.log(
      `Repository valid: ${Object.keys(registry.sources).length} sources, ${Object.keys(registry.packs).length} packs, revision ${registry.revision}`,
    );
  });

const sources = program.command("sources").description("Inspect and validate sources");
sources.command("list").option("--root <path>").action(async (options) => {
  const registry = await loadRegistry(rootFrom(options));
  for (const source of Object.values(registry.sources)) {
    console.log(`${source.id}\t${source.sourceClass}\t${source.status}`);
  }
});
sources.command("validate").option("--root <path>").action(async (options) => {
  const registry = await validateRegistry(rootFrom(options));
  console.log(`Sources valid: ${Object.keys(registry.sources).length}`);
});
sources
  .command("build")
  .option("--root <path>")
  .option("--output <path>", "compiled output", ".generated/source-registry.json")
  .action(async (options) => console.log(await writeCompiledRegistry(rootFrom(options), options.output)));
sources
  .command("diff")
  .description("Compare current registry with a previously compiled registry")
  .option("--root <path>", "repository root")
  .option("--against <path>", "compiled registry to compare", ".generated/source-registry.json")
  .action(async (options) => {
    const root = rootFrom(options);
    const current = await loadRegistry(root);
    const previous = JSON.parse(
      await readFile(resolve(root, options.against), "utf8"),
    ) as CompiledRegistry;
    console.log(JSON.stringify(diffRegistries(current, previous), null, 2));
  });

const packs = program.command("packs").description("Inspect and validate source packs");
packs.command("list").option("--root <path>").action(async (options) => {
  const registry = await loadRegistry(rootFrom(options));
  for (const pack of Object.values(registry.packs)) {
    console.log(`${pack.id}\t${pack.sourceIds.length}\t${pack.description}`);
  }
});
packs.command("validate").option("--root <path>").action(async (options) => {
  const registry = await validateRegistry(rootFrom(options));
  for (const packId of Object.keys(registry.packs)) sourcePack(registry, packId);
  console.log(`Source packs valid: ${Object.keys(registry.packs).length}`);
});

program
  .command("policies")
  .description("Validate source policies")
  .option("--root <path>")
  .action(async (options) => {
    const registry = await validateRegistry(rootFrom(options));
    console.log(
      `Policies valid: ${Object.keys(registry.sourceClassPolicy.classes).length} classes`,
    );
  });

program
  .command("eval")
  .description("Run deterministic Sunnah evals")
  .option("--suite <name>", "one eval suite filename without .test.ts")
  .option("--root <path>", "repository root")
  .action(async (options) => {
    const root = rootFrom(options);
    const target = options.suite
      ? `tests/evals/${options.suite}.test.ts`
      : "tests/evals";
    await run(pnpm, ["exec", "vitest", "run", target], root);
  });

const plugin = program.command("plugin").description("Build and validate host plugin packages");
plugin
  .command("build")
  .requiredOption("--mcp-url <url>", "deployed HTTPS MCP URL ending in /mcp")
  .option("--root <path>", "repository root")
  .option("--output <path>", "distribution output", ".generated/distribution")
  .action(async (options) => {
    const root = rootFrom(options);
    const output = await buildDistributions({
      root,
      mcpUrl: options.mcpUrl,
      output: options.output,
    });
    await validateGeneratedDistribution(root, options.output);
    console.log(output);
  });

plugin
  .command("validate")
  .option("--host <host>", "openai, claude, gemini, or generic")
  .option("--root <path>", "repository root")
  .action(async (options) => {
    const host = options.host as DistributionHost | undefined;
    if (host && !["openai", "claude", "gemini", "generic"].includes(host)) {
      throw new Error(`Unknown host: ${host}`);
    }
    await validateSourcePackaging(rootFrom(options), host);
    console.log(
      host ? `Packaging valid for ${host}` : "Packaging valid for all source adapters",
    );
  });

const mcp = program.command("mcp").description("Develop and inspect the MCP runtime");
mcp
  .command("dev")
  .description("Build and run the local HTTP MCP server")
  .option("--root <path>", "repository root")
  .action(async (options) => {
    const root = rootFrom(options);
    await run(pnpm, ["--filter", "@sunnah/mcp", "build"], root);
    await run(process.execPath, ["apps/mcp/dist/http.js"], root);
  });
mcp
  .command("stdio")
  .description("Build and run the local stdio MCP server")
  .option("--root <path>", "repository root")
  .action(async (options) => {
    const root = rootFrom(options);
    await run(pnpm, ["--filter", "@sunnah/mcp", "build"], root);
    await run(process.execPath, ["apps/mcp/dist/stdio.js"], root);
  });

await program.parseAsync();
