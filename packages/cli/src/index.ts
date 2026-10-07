#!/usr/bin/env node
import { resolve } from "node:path";
import { Command } from "commander";
import { loadRegistry, sourcePack, validateRegistry, writeCompiledRegistry } from "@sunnah/registry";

const program = new Command();
program.name("sunnah").description("Sunnah Plugin maintainer CLI").version("0.1.0");
const rootFrom = (options: { root?: string }): string => resolve(options.root ?? process.cwd());

program
  .command("validate")
  .description("Validate registry, packs, and source policies")
  .option("--root <path>", "repository root")
  .action(async (options) => {
    const registry = await validateRegistry(rootFrom(options));
    console.log(
      `Registry valid: ${Object.keys(registry.sources).length} sources, ${Object.keys(registry.packs).length} packs, revision ${registry.revision}`,
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

program.command("policies").description("Validate source policies").option("--root <path>").action(async (options) => {
  const registry = await validateRegistry(rootFrom(options));
  console.log(`Policies valid: ${Object.keys(registry.sourceClassPolicy.classes).length} classes`);
});

await program.parseAsync();
