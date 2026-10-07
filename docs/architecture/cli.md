# Maintainer CLI

## Purpose

The `sunnah` CLI is a developer, maintainer, CI, and agentic-development surface.

It is not required for normal Claude, ChatGPT, or Gemini Web users.

## Design rule

Commands are thin adapters over shared core packages.

Never implement registry, policy, or verification logic only inside the CLI.

## Planned command families

### Sources

```text
sunnah sources list
sunnah sources show <id>
sunnah sources validate
sunnah sources build
sunnah sources diff
```

### Source Packs

```text
sunnah packs list
sunnah packs validate
```

### Policies

```text
sunnah policies validate
```

### Evals

```text
sunnah eval
sunnah eval --suite <name>
```

### Plugin validation

```text
sunnah plugin validate
sunnah plugin validate --host claude
sunnah plugin validate --host openai
sunnah plugin validate --host gemini
```

### MCP development

```text
sunnah mcp dev
sunnah mcp inspect
```

Exact command names are subject to the implementation spec.

## Repository scripts

The repository should expose simple package scripts for common agent workflows:

```text
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm typecheck
pnpm validate
pnpm eval
pnpm check
```

`pnpm check` should be the normal fast quality gate.

## Future Source Studio

Source Studio should call the same shared functions used by these commands rather than shelling out to CLI processes in production.
