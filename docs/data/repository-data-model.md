# Repository Data Model

## Goal

Repository state should be easy for humans and coding agents to inspect, diff, validate, and modify without introducing a database.

## Format ownership

Use:

```text
Markdown
→ methodology and agent guidance

strict YAML
→ human/agent-authored registry and policy configuration

Zod / JSON Schema
→ structural contracts

JSON / native typed objects
→ generated runtime representation and MCP interchange

external sources
→ actual Islamic source content
```

## Conceptual layout

```text
sources/
├── registry.yaml
└── packs/
    ├── quran-core.yaml
    ├── hadith-core.yaml
    └── ...

policies/
├── source-classes.yaml
├── publication.yaml
└── domains/
    ├── fiqh.yaml
    ├── hadith.yaml
    └── ...

schemas/
└── generated-or-published contracts
```

Exact paths are implementation details and may change in the spec.

## Registry index

The top-level registry should remain small.

Prefer references to focused source definitions/packs over one giant YAML document so agents can load only relevant files.

## Runtime build

Conceptually:

```text
YAML
  ↓
parse
  ↓
schema validation
  ↓
semantic validation
  ↓
normalization
  ↓
compiled registry
```

The compiled representation may exist only in memory or as a generated JSON build artifact.

## Large content

Do not store large source documents, fatwa bodies, or scraped corpora inside YAML configuration.

The plugin repository stores source identities and policy, not the corpus itself.

## Agent-context principle

Do not optimize only for bytes on disk.

Optimize for how much context an agent must load to make a correct change.
