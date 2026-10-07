# Sunnah Plugin

**Sunnah Plugin** is a portable Sunni Islamic knowledge plugin for Claude, ChatGPT, Gemini, and other Agent Skills/MCP-compatible agent environments.

Its core rule is simple:

> **Language may be generated. Islamic knowledge must be sourced.**

Sunnah Plugin is designed to answer, explain, summarize, compare, research, and verify Islamic knowledge while preventing the host LLM from silently turning its own parametric memory into religious authority.

It is a standalone product. It does **not** require Sunnah Engine, but it is deliberately designed so Sunnah Engine can later become its stronger evidence backend without changing the user-facing contract.

## What it is

Sunnah Plugin combines:

- one portable public `sunnah` Agent Skill;
- progressively disclosed domain and workflow instructions;
- a hosted remote HTTPS MCP evidence runtime;
- a Git-native source registry and source packs;
- deterministic source and citation validation;
- claim-level evidence mapping;
- independent semantic support verification when needed;
- host-specific packaging for Claude, ChatGPT/OpenAI, Gemini, and compatible harnesses;
- an evaluation suite for trust, security, source selection, and cross-host behavior.

## What it is not

Sunnah Plugin is not:

- an "AI Sheikh";
- an autonomous mufti;
- a scholar simulator;
- a generic Islamic system prompt;
- a giant bundled Islamic corpus;
- an admin platform;
- a replacement for Sunnah Engine;
- a system that treats arbitrary web pages as Islamic authority.

## Scope

The target Sunni knowledge domains include:

- Qur'an;
- tafsir;
- hadith and hadith sciences;
- fiqh and usul al-fiqh;
- the four major Sunni madhhabs;
- aqeedah;
- seerah;
- Islamic history;
- biographies and tarajim;
- adhkar, worship, manners, and ethics;
- fatwa retrieval and faithful summarization;
- contemporary questions requiring external factual research;
- quote, source, and claim verification.

See [Scope](docs/vision/scope.md).

## Trust model

A substantive Islamic claim is publishable only when:

```text
permitted evidence exists
        +
source policy allows that evidence for the claim
        +
citation / quotation integrity passes
        +
the evidence actually supports the claim
```

The host model may compose language, but it cannot waive the publication gate.

When recognized Sunni scholarship differs, the default is to preserve and attribute the disagreement. Users may explicitly select lenses such as a madhhab, scholar corpus, or contemporary institution.

When the evidence does not justify applying a ruling to a user's specific circumstances, the plugin may return the sourced general rule while marking the case `SCHOLAR_REQUIRED`.

See [Trust Model](docs/methodology/trust-model.md), [Evidence Policy](docs/methodology/evidence-policy.md), and [Disagreement](docs/methodology/disagreement.md).

## Architecture

```text
User
  ↓
Claude / ChatGPT / Gemini / compatible host
  ↓
Sunnah Skill
  ↓
task + domain routing
  ↓
remote HTTPS MCP Evidence Runtime
  ├── source registry
  ├── source policy
  ├── approved retrieval
  ├── provenance
  ├── canonical text
  ├── deterministic validation
  └── semantic verifier where required
  ↓
compact Evidence Bundle
  ↓
host LLM synthesis
  ↓
claim extraction + Publication Gate
  ↓
Grounded Answer
```

The plugin's core trust guarantees must work on web surfaces. Local hooks, scripts, and CLI integrations are optional defense-in-depth.

See [Architecture Overview](docs/architecture/overview.md).

## Source model

Git is the source of truth for the plugin's source registry and policies.

```text
strict YAML
  ↓
schema validation
  ↓
semantic validation
  ↓
compiled runtime representation
  ↓
Evidence Runtime
```

The registry stores metadata and policy, not the Islamic corpus itself.

Changes are PR-first. A future **Source Studio** may provide a human-friendly editor, but it remains an interface over Git rather than a separate database or administration system.

See [Source Registry](docs/architecture/source-registry.md), [Source Packs](docs/architecture/source-packs.md), and [Repository Data Model](docs/data/repository-data-model.md).

## Portability

The canonical implementation is shared.

Host-specific manifests and adapters are thin distribution layers:

```text
                  canonical Sunnah implementation
                            │
              ┌─────────────┼─────────────┐
              │             │             │
            Claude        OpenAI        Gemini
              │             │             │
          Web + Code     Web + Codex   Web + CLI
```

A release is incomplete if its core trust guarantees only work in a local coding harness.

See [Portability](docs/architecture/portability.md) and [Distribution](docs/distribution/README.md).

## Technology direction

The planned implementation stack is intentionally lightweight:

- TypeScript;
- Node.js;
- pnpm workspaces;
- MCP TypeScript SDK v2;
- Hono for the remote HTTP boundary;
- Zod for canonical runtime schemas and generated JSON Schema where needed;
- strict YAML for Git-authored registry and policy data;
- Vitest;
- Biome;
- GitHub Actions.

No database, ORM, heavy backend framework, or frontend is required for the core plugin.

See [Technology](docs/architecture/technology.md).

## Quick start

Requires Node.js 22.12+ (CI uses Node 24) and pnpm 10.

```bash
pnpm install
pnpm check
pnpm build
node apps/mcp/dist/http.js
```

The HTTP server exposes `/health` and the Streamable HTTP MCP endpoint at `/mcp`.
Copy `.env.example` into your deployment secret configuration; do not commit credentials.

For a containerized deployment:

```bash
docker build -t sunnah-plugin .
docker run --rm -p 3000:3000 --env-file .env sunnah-plugin
```

See [Build and Install Distribution Packages](docs/distribution/build-and-install.md) for host package generation.

## Developer and maintainer CLI

The first-class `sunnah` CLI is for contributors, agents, CI, and maintainers. It is **not** required by end users on Claude, ChatGPT, or Gemini Web.

Implemented command families include:

```text
sunnah validate
sunnah sources list
sunnah sources validate
sunnah sources build
sunnah sources diff
sunnah packs list
sunnah packs validate
sunnah policies
sunnah eval [--suite <name>]
sunnah plugin build --mcp-url https://HOST/mcp
sunnah plugin validate [--host claude|openai|gemini|generic]
sunnah mcp dev
sunnah mcp stdio
```

All commands wrap shared core libraries; validation logic is not duplicated across CLI, MCP, CI, or future Source Studio.

## Sunnah Engine boundary

Sunnah Plugin intentionally does **not** implement:

- large-scale corpus ingestion;
- persistent scholarly knowledge graphs;
- knowledge promotion workflows;
- scholar/admin operations;
- persistent derived knowledge;
- corpus-wide invalidation infrastructure.

Those belong to [Sunnah Engine](https://github.com/adams100111/sunnah-engine).

Today:

```text
Sunnah Plugin
  ↓
Evidence Runtime
  ↓
approved external sources
```

Later:

```text
Sunnah Plugin
  ↓
same evidence contract
  ↓
Sunnah Engine
```

## Development workflow

This repository follows Matt Pocock's engineering flow:

```text
grill-with-docs + domain-modeling
        ↓
to-spec
        ↓
to-tickets
        ↓
implement-spec
        ↓
code-review
        ↓
Islamic trust/security evals
        ↓
cross-host + marketplace validation
```

See [AGENTS.md](AGENTS.md).

## Current status

**Production-v1 implementation and release-hardening phase.**

The portable skill, Git-native registry, approved-source search/retrieval, Publication Gate, remote MCP runtime, user-source/external-fact workflows, maintainer CLI, cross-host packaging, and deterministic trust/security evals are implemented on the production-v1 integration line. Public marketplace publication still requires a deployed HTTPS MCP endpoint and each marketplace's external submission/review process.

## Documentation

Start with the [documentation map](docs/README.md).

Key documents:

- [Product Vision](docs/vision/product-vision.md)
- [Principles](docs/vision/principles.md)
- [Trust Model](docs/methodology/trust-model.md)
- [Islamic Methodology](docs/methodology/islamic-methodology.md)
- [Architecture Overview](docs/architecture/overview.md)
- [Portability](docs/architecture/portability.md)
- [MCP Evidence Runtime](docs/architecture/mcp-evidence-runtime.md)
- [Source Registry](docs/architecture/source-registry.md)
- [Claim Verification](docs/architecture/claim-verification.md)
- [Testing and Evals](docs/testing/eval-strategy.md)
- [Roadmap](docs/roadmap/stages.md)

## Guiding questions

Every important answer should make it possible to ask:

- Where did this information come from?
- Is that source permitted for this kind of claim?
- Who actually said it?
- Which methodology or lens does it belong to?
- Do recognized Sunni scholars disagree?
- Does the cited evidence actually support the claim?
- What is established, what is inferred, and what remains unresolved?
- Where must the system stop?

That is the product.
