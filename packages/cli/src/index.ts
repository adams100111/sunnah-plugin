#!/usr/bin/env node
import { resolve } from "node:path";
import { Command } from "commander";
import {
  buildDistributions,
  validateGeneratedDistribution,
  validateSourcePackaging,
  type DistributionHost,
} from "@sunnah/packaging";
import { loadRegistry, sourcePack, validateRegistry, writeCompiledRegistry } from "@sunnah/registry";

const program = new Command();
program.name("sunnah").description("Sunnah Plugin maintainer CLI").version("0.1.0");
const rootFrom = (options: { root?: string }): string => resolve(options.root ?? process.cwd());

program
  .command("validate")
  .description("Validate registry, packs, source policies, skill, and host packaging")
  .option("--root <path>", "repository root")
  .action(async (options) => {
    const root = rootFrom(options);
    const registry = await validateRegistry(root);
    await validateSourcePackaging(root);
    console.log(
      "Repository valid: " +
        Object.keys(registry.sources).length +
        " sources, " +
        Object.keys(registry.packs).length +
        " packs, revision " +
        registry.revision,
    );
  });

const sources = program.command("sources").description("Inspect and validate sources");
sources.command("list").option("--root <path>").action(async (options) => {
  const registry = await loadRegistry(rootFrom(options));
  for (const source of Object.values(registry.sources)) {
    console.log(source.id + "\t" + source.sourceClass + "\t" + source.status);
  }
});
sources.command("validate").option("--root <path>").action(async (options) => {
  const registry = await validateRegistry(rootFrom(options));
  console.log("Sources valid: " + Object.keys(registry.sources).length);
});
sources
  .command("build")
  .option("--root <path>")
  .option("--output <path>", "compiled output", ".generated/source-registry.json")
  .action(async (options) => console.log(await writeCompiledRegistry(rootFrom(options), options.output)));

const packs = program.command("packs").description("Inspect and validate source packs");
packs.command("list").option("--root <path>").action(async (options) => {
  const registry = await loadRegistry(rootFrom(options));
  for (const pack of Object.values(registry.packs)) {
    console.log(pack.id + "\t" + pack.sourceIds.length + "\t" + pack.description);
  }
});
packs.command("validate").option("--root <path>").action(async (options) => {
  const registry = await validateRegistry(rootFrom(options));
  for (const packId of Object.keys(registry.packs)) sourcePack(registry, packId);
  console.log("Source packs valid: " + Object.keys(registry.packs).length);
});

program.command("policies").description("Validate source policies").option("--root <path>").action(async (options) => {
  const registry = await validateRegistry(rootFrom(options));
  console.log("Policies valid: " + Object.keys(registry.sourceClassPolicy.classes).length + " classes");
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
      throw new Error("Unknown host: " + host);
    }
    await validateSourcePackaging(rootFrom(options), host);
    console.log(host ? "Packaging valid for " + host : "Packaging valid for all source adapters");
  });

await program.parseAsync();
