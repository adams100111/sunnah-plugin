# Technology

## Baseline stack

The planned first implementation uses:

- **TypeScript** as the canonical implementation language;
- **Node.js** as the baseline server/runtime target;
- **pnpm workspaces** for repository package management;
- **MCP TypeScript SDK v2** for the remote MCP server;
- **Hono** for the thin HTTP transport/application boundary;
- **Zod** for runtime schemas and TypeScript inference;
- **JSON Schema** generated/exposed where protocol or tooling boundaries benefit from it;
- **strict YAML** for human/agent-authored registry and policy configuration;
- **Vitest** for tests;
- **Biome** for formatting/linting;
- **GitHub Actions** for CI.

## Why TypeScript

TypeScript provides one implementation language across:

- MCP runtime;
- schemas;
- validation;
- CLI;
- source-registry tooling;
- plugin manifests/tooling;
- future Source Studio;
- test/eval harnesses.

This reduces translation layers and makes shared contracts easier to enforce.

## Why a thin server

The remote runtime is not a conventional application backend.

Its primary responsibilities are:

```text
MCP request
→ policy
→ approved retrieval
→ provenance
→ validation
→ structured response
```

A heavy framework such as NestJS, Next.js, Laravel, or FastAPI is unnecessary for this responsibility set.

## No application database initially

The plugin starts without:

- PostgreSQL;
- SQLite;
- ORM;
- persistent knowledge store.

Git-backed configuration and approved external evidence are sufficient for the plugin boundary.

If persistent corpus/knowledge behavior becomes necessary, first evaluate whether the responsibility belongs in Sunnah Engine.

## Schema ownership

Prefer one canonical schema definition rather than manually synchronizing TypeScript types, runtime validators, and JSON Schema.

Target pattern:

```text
Zod schema
  ├── TypeScript type inference
  └── JSON Schema export where needed
```

## Deployment

The server must be deployable as a public HTTPS MCP endpoint.

The initial implementation should remain hosting-provider-neutral.

Hosting-specific optimizations may be introduced later without changing the evidence contract.

## Status

This is the selected implementation direction for the first implementation spec. Exact package versions and small-library choices should be resolved during implementation against current documentation.
