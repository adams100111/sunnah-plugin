# Sunnah Plugin

Sunnah Plugin is a portable, citation-first Sunni Islamic knowledge plugin for Claude, ChatGPT/OpenAI, Gemini, Codex, Claude Code, and other Agent Skills/MCP-compatible hosts.

> **Language may be generated. Islamic knowledge must be sourced.**

The plugin gives a host model access to approved Islamic evidence and a deterministic Publication Gate. The host may explain, summarize, compare, and translate retrieved material, but it may not silently turn parametric model memory into religious authority.

## Capabilities

Sunnah Plugin currently provides:

- one canonical `sunnah` Agent Skill with progressive domain/workflow guidance;
- a remote Streamable HTTP MCP server and local stdio development transport;
- a Git-native Source Registry and source packs;
- exact Qur'an retrieval through the configured canonical provider;
- approved-source search and direct evidence retrieval;
- user-URL inspection without automatic trust promotion;
- external-factual evidence separated from Islamic-authority evidence;
- claim-level source eligibility, quotation integrity, applicability, and semantic-support checks;
- explicit `ANSWERED`, `PARTIALLY_ANSWERED`, `DISAGREEMENT`, `INSUFFICIENT_EVIDENCE`, and `SCHOLAR_REQUIRED` states;
- Claude, OpenAI, Gemini, and generic Agent Skills/MCP distribution generation;
- adversarial, source-governance, Arabic/English, context-bound, and cross-host evals.

## Trust boundary

A substantive Islamic claim is publishable only when:

```text
permitted evidence exists
        +
the source is permitted for that claim class
        +
quotation/citation integrity passes
        +
the evidence actually supports the claim
```

Important invariants:

1. Parametric model memory is never Islamic authority.
2. Qur'an and hadith quotations must come from retrieved/stored text, not model reconstruction.
3. A real citation does not make an unsupported interpretation valid.
4. User-provided URLs are data, not automatically trusted authority.
5. External factual sources can establish facts about the world; they cannot establish a religious ruling.
6. Recognized Sunni disagreement is attributed and preserved rather than silently collapsed.
7. A scholar is never simulated. If no attributable position is found, the plugin says so.
8. Personal applicability may require `SCHOLAR_REQUIRED` even when a general rule is well sourced.
9. Retrieval or verification failure fails closed.

See [Trust Model](docs/methodology/trust-model.md), [Evidence Policy](docs/methodology/evidence-policy.md), and [Claim Verification](docs/architecture/claim-verification.md).

## Source system

Sources are declarative YAML under `sources/`. A source entry defines identity, authority type, origin/path scope, supported claim classes, domains, languages, status, and retrieval configuration.

The first curated catalog is grouped into:

- **General Sunni** — cross-regional Sunni reference and research sources;
- **Saudi Arabia** — official Saudi institutions and named scholar corpora;
- **Sudan** — verified Sudanese official Sharia/Islamic-finance and religious-service sources;
- **Four madhhabs** — explicit Hanafi, Maliki, Shafi'i, and Hanbali primary/reference work packs.

See [SOURCES.md](SOURCES.md) for the current catalog and admission notes.

Source breadth does not imply equal authority. An official collective fiqh academy, a named scholar's official foundation, a hadith research database, and a general Q&A site are intentionally classified differently.

## Architecture

```text
User
  ↓
Host model
  ↓
Sunnah Skill
  ↓
MCP Evidence Runtime
  ├── source registry / source packs
  ├── exact lookup / approved search / approved fetch
  ├── provenance and authority metadata
  └── external-fact and user-source isolation
  ↓
Evidence Bundle
  ↓
Host synthesis
  ↓
Publication Gate
  ├── source eligibility
  ├── quotation integrity
  ├── applicability
  └── semantic support
  ↓
Grounded answer / disagreement / abstention / scholar escalation
```

## Quick start

Requires Node.js 22.12+ and pnpm 10.

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build
node apps/mcp/dist/http.js
```

The server exposes:

- `GET /health`
- `/mcp` — Streamable HTTP MCP endpoint

For Docker:

```bash
docker build -t sunnah-plugin .
docker run --rm -p 3000:3000 --env-file .env sunnah-plugin
```

Copy `.env.example` into your deployment secret configuration. Do not commit credentials.

## Semantic verification modes

Without `SUNNAH_VERIFIER_URL`, the runtime uses a conservative fail-closed verifier and only accepts direct normalized textual support.

For production-quality paraphrase and multi-source synthesis, configure an independent verifier service:

```text
SUNNAH_VERIFIER_URL=https://YOUR_VERIFIER/verify
SUNNAH_VERIFIER_TOKEN=...
```

The verifier contract is provider-neutral. See [Claim Verification](docs/architecture/claim-verification.md).

## Maintainer CLI

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

## Repository map

```text
skills/sunnah/          canonical public Agent Skill
sources/                source registry, entries, and packs
policies/               deterministic source-class policy
packages/schemas/       shared contracts
packages/registry/      registry loading/validation
packages/evidence/      retrieval and evidence normalization
packages/verification/  Publication Gate and semantic-verifier contract
packages/runtime/       application orchestration
packages/packaging/     cross-host package generation
packages/cli/           maintainer CLI
apps/mcp/               HTTP + stdio MCP server
tests/                  unit, contract, security, and eval suites
docs/                   detailed methodology and architecture
```

## Documentation

Start with [docs/README.md](docs/README.md).

Also see:

- [SOURCES.md](SOURCES.md) — current source catalog and admission status
- [TODO.md](TODO.md) — actionable implementation/source/publication backlog
- [ROADMAP.md](ROADMAP.md) — product history, staged roadmap, and release direction
- [Source Admission](docs/methodology/source-admission.md)
- [Source Registry](docs/architecture/source-registry.md)
- [Distribution](docs/distribution/README.md)
- [Testing and Evals](docs/testing/eval-strategy.md)

## Sunnah Engine boundary

Sunnah Plugin stays lightweight and retrieval-oriented. Large-scale corpus ingestion, persistent scholarly knowledge graphs, knowledge promotion, scholar/admin workflows, and deep dependency invalidation belong to [Sunnah Engine](https://github.com/adams100111/sunnah-engine).

The evidence contract is intentionally stable so Sunnah Engine can later replace or augment direct-source adapters without changing the public skill.

## Status

Production-v1 code is merged and green. The next phase is **source breadth + operational deployment**.

The plugin is not claiming comprehensive Sunni coverage yet. Unsupported source coverage must fail closed until it is admitted through the registry and backed by retrieval/eval coverage.
