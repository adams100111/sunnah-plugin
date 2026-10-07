# Sunnah Engine Boundary

## Principle

Sunnah Plugin and Sunnah Engine are complementary products with different responsibilities.

Do not rebuild Sunnah Engine inside the plugin.

## Sunnah Plugin owns

- portable Agent Skill workflow;
- host packaging;
- Git-native source registry;
- Source Packs;
- evidence policies;
- remote MCP evidence interface;
- direct approved-source adapters;
- claim publication gate;
- cross-host behavior;
- plugin-specific evals;
- maintainer CLI.

## Sunnah Engine owns later

- large canonical corpus;
- source ingestion at scale;
- edition management;
- OCR workflows;
- structured scholarly data;
- persistent knowledge objects;
- dependency graphs;
- knowledge promotion;
- full invalidation/recomputation;
- scholar/admin operations;
- corpus-wide search infrastructure;
- persistent audit infrastructure.

## Today

```text
Sunnah Plugin
    ↓
Evidence Runtime
    ↓
approved external sources
```

## Later

```text
Sunnah Plugin
    ↓
same evidence-facing contract
    ↓
Sunnah Engine
```

Direct source adapters may remain useful as fallback or freshness paths, but Engine integration should not force a rewrite of the public skill.

## Boundary test

Before adding persistent infrastructure to the plugin, ask:

> Is this needed to enforce the plugin's portable evidence contract, or are we building a knowledge platform?

If the latter, the responsibility likely belongs in Sunnah Engine.
