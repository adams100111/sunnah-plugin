import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { parseDocument } from "yaml";
import {
  RegistryIndexSchema,
  SourceClassPolicySchema,
  SourceDefinitionSchema,
  SourcePackSchema,
  type ClaimClass,
  type RegistryIndex,
  type SourceClassPolicy,
  type SourceDefinition,
  type SourcePack,
} from "@sunnah/schemas";

export interface CompiledRegistry {
  revision: string;
  sources: Record<string, SourceDefinition>;
  packs: Record<string, SourcePack>;
  sourceClassPolicy: SourceClassPolicy;
}

async function readStrictYaml(path: string): Promise<unknown> {
  const text = await readFile(path, "utf8");
  const document = parseDocument(text, { schema: "core", merge: false });
  if (document.errors.length > 0) {
    throw new Error(`${path}: ${document.errors.map((error) => error.message).join("; ")}`);
  }
  return document.toJS({ maxAliasCount: 0 });
}

async function parseFile<T>(
  root: string,
  relativePath: string,
  parser: { parse(value: unknown): T },
): Promise<T> {
  return parser.parse(await readStrictYaml(resolve(root, relativePath)));
}

export async function loadRegistry(root: string): Promise<CompiledRegistry> {
  const index = await parseFile<RegistryIndex>(root, "sources/registry.yaml", RegistryIndexSchema);
  const sources = new Map<string, SourceDefinition>();

  for (const reference of index.sources) {
    const source = await parseFile(root, reference.path, SourceDefinitionSchema);
    if (sources.has(source.id)) throw new Error(`Duplicate source id: ${source.id}`);
    sources.set(source.id, source);
  }

  const packs = new Map<string, SourcePack>();
  for (const reference of index.packs) {
    const pack = await parseFile(root, reference.path, SourcePackSchema);
    if (packs.has(pack.id)) throw new Error(`Duplicate source pack id: ${pack.id}`);
    for (const sourceId of pack.sourceIds) {
      if (!sources.has(sourceId)) {
        throw new Error(`Pack ${pack.id} references unknown source ${sourceId}`);
      }
    }
    packs.set(pack.id, pack);
  }

  const sourceClassPolicy = await parseFile(
    root,
    index.sourceClassPolicy,
    SourceClassPolicySchema,
  );

  for (const source of sources.values()) {
    const allowed = new Set(sourceClassPolicy.classes[source.sourceClass].allows);
    for (const claimClass of source.supports) {
      if (!allowed.has(claimClass)) {
        throw new Error(
          `Source ${source.id} declares ${claimClass}, forbidden for ${source.sourceClass}`,
        );
      }
    }
    for (const origin of source.origins) {
      if (origin.host.includes("/") || origin.host.includes(":")) {
        throw new Error(`Source ${source.id} has invalid origin host: ${origin.host}`);
      }
      for (const pattern of origin.paths) {
        if (!pattern.startsWith("/")) {
          throw new Error(`Source ${source.id} path must start with '/': ${pattern}`);
        }
      }
    }
  }

  const compiled = {
    sources: Object.fromEntries([...sources.entries()].sort(([a], [b]) => a.localeCompare(b))),
    packs: Object.fromEntries([...packs.entries()].sort(([a], [b]) => a.localeCompare(b))),
    sourceClassPolicy,
  };
  const revision = createHash("sha256").update(JSON.stringify(compiled)).digest("hex").slice(0, 16);
  return { revision, ...compiled };
}

export const validateRegistry = loadRegistry;

export async function writeCompiledRegistry(
  root: string,
  outputPath = ".generated/source-registry.json",
): Promise<string> {
  const registry = await loadRegistry(root);
  const path = resolve(root, outputPath);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(registry, null, 2)}\n`, "utf8");
  return path;
}

export function sourcePack(registry: CompiledRegistry, packId: string): SourceDefinition[] {
  const pack = registry.packs[packId];
  if (!pack) throw new Error(`Unknown source pack: ${packId}`);
  return pack.sourceIds.map((sourceId) => {
    const source = registry.sources[sourceId];
    if (!source) throw new Error(`Pack ${packId} references missing source ${sourceId}`);
    return source;
  });
}

export function sourceAllowsClaim(
  registry: CompiledRegistry,
  sourceId: string,
  claimClass: ClaimClass,
): boolean {
  const source = registry.sources[sourceId];
  if (!source || source.status !== "active") return false;
  return (
    source.supports.includes(claimClass) &&
    registry.sourceClassPolicy.classes[source.sourceClass].allows.includes(claimClass)
  );
}

export interface RegistryDiff {
  addedSources: string[];
  removedSources: string[];
  changedSources: string[];
  addedPacks: string[];
  removedPacks: string[];
  changedPacks: string[];
  policyChanged: boolean;
}

function changedRecord<T>(current: T | undefined, previous: T | undefined): boolean {
  return JSON.stringify(current) !== JSON.stringify(previous);
}

export function diffRegistries(
  current: CompiledRegistry,
  previous: CompiledRegistry,
): RegistryDiff {
  const currentSourceIds = new Set(Object.keys(current.sources));
  const previousSourceIds = new Set(Object.keys(previous.sources));
  const currentPackIds = new Set(Object.keys(current.packs));
  const previousPackIds = new Set(Object.keys(previous.packs));

  return {
    addedSources: [...currentSourceIds].filter((id) => !previousSourceIds.has(id)).sort(),
    removedSources: [...previousSourceIds].filter((id) => !currentSourceIds.has(id)).sort(),
    changedSources: [...currentSourceIds]
      .filter((id) => previousSourceIds.has(id) && changedRecord(current.sources[id], previous.sources[id]))
      .sort(),
    addedPacks: [...currentPackIds].filter((id) => !previousPackIds.has(id)).sort(),
    removedPacks: [...previousPackIds].filter((id) => !currentPackIds.has(id)).sort(),
    changedPacks: [...currentPackIds]
      .filter((id) => previousPackIds.has(id) && changedRecord(current.packs[id], previous.packs[id]))
      .sort(),
    policyChanged: changedRecord(current.sourceClassPolicy, previous.sourceClassPolicy),
  };
}
