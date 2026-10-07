# Sunnah Plugin Roadmap

This file preserves the product direction and staged delivery history that previously lived in the repository README.

## Product thesis

> **Language may be generated. Islamic knowledge must be sourced.**

Sunnah Plugin is a standalone portable Sunni Islamic knowledge plugin. It is not an autonomous mufti, scholar simulator, generic Islamic system prompt, or replacement for Sunnah Engine.

Its target domains include Qur'an, tafsir, hadith and hadith sciences, fiqh and usul, the four Sunni madhhabs, aqeedah, seerah, Islamic history, biographies, adhkar, worship, manners, fatwa retrieval/summarization, contemporary factual research, and quote/source/claim verification.

## Development method

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

## Production-v1 — complete

The first complete vertical slice shipped:

- canonical portable Agent Skill;
- Git-native registry and source packs;
- typed evidence/claim/publication contracts;
- canonical Qur'an retrieval;
- approved-source retrieval and source-native search;
- Publication Gate;
- remote MCP + stdio transport;
- user-source and external-fact boundaries;
- Claude/OpenAI/Gemini/generic packaging;
- Arabic/English, security, source-governance, and cross-host evals;
- frozen dependency graph;
- Docker deployment contract.

## Current phase — source breadth and deployment

Primary work now:

1. expand and audit high-value Sunni sources;
2. add retrieval/search adapters per source family;
3. add source-specific extraction tests and drift detection;
4. improve hadith, tafsir, madhhab, and fiqh-resolution coverage;
5. deploy the public HTTPS MCP runtime;
6. configure the independent semantic verifier;
7. produce real host packages against the deployed URL;
8. perform Claude/OpenAI/Gemini installation and marketplace workflows.

## Later phases

### Retrieval quality

- Arabic normalization and morphological search;
- source-aware query decomposition;
- hybrid lexical/semantic retrieval where justified;
- reranking;
- evidence sufficiency checks;
- latency/caching work that does not weaken provenance.

### Domain depth

- canonical hadith collection adapters;
- scholar-attributed grading;
- tafsir corpora;
- four-madhhab methodology/source profiles;
- usul-aware comparative workflows;
- Sudan/KSA jurisdiction/context profiles;
- contemporary institutional fatwa feeds.

### Sunnah Engine integration

Sunnah Engine may later provide large-scale corpus ingestion, persistent verified knowledge, scholarly graph relationships, knowledge promotion, scholar/admin workflows, and source dependency invalidation behind the same evidence contract.

---

## Historical repository overview

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

**Production-v1 code complete and merged to `main`.**

The portable skill, Git-native registry, approved-source search/retrieval, Publication Gate, remote MCP runtime, user-source/external-fact workflows, maintainer CLI, cross-host packaging, frozen dependency graph, and trust/security evals have passed the production-v1 release gate.

Operational publication is intentionally separate from code completion: public Claude, ChatGPT/OpenAI, and Gemini installation requires a deployed HTTPS MCP endpoint, runtime credentials, package generation using that endpoint, and each marketplace/account's external submission or installation workflow.

The initial live authority catalog is deliberately curated rather than pretending comprehensive coverage: canonical Qur'an access and Ibn Baz official fatwa search/fetch are configured first. Unsupported source coverage fails closed and can be expanded through the documented registry review process.

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


---

## Original staged roadmap

# Roadmap

## Strategy

Sunnah Plugin is intended to be a real production capability from its first release, not a disposable MVP.

The roadmap stages implementation risk; it does not weaken the target trust model.

## Stage 0 — Documentation and specification

Finish the durable product contract: vision, scope, principles, methodology, trust, source authority, domain contracts, portability, source/data model, technology direction, security, eval strategy, glossary, and ADRs.

Exit by running Matt Pocock's `to-spec` workflow from the completed design.

## Stage 1 — First complete vertical implementation

Ship the smallest complete production architecture:

- portable Sunnah Skill;
- remote HTTPS MCP server;
- Git-native Source Registry;
- strict YAML plus schema/semantic validation;
- at least one meaningful approved source path;
- compact evidence objects;
- claim/publication gate;
- Arabic/English behavior;
- maintainer CLI;
- Claude/OpenAI/Gemini packaging foundations;
- unit, contract, security, and eval CI.

The source catalog may begin narrow, but the architecture and trust path must be real.

## Stage 2 — Source and domain breadth

Expand approved coverage and domain procedures across Qur'an, hadith, tafsir, fiqh, aqeedah, seerah/history, fatwa, the four madhhabs, and selected scholar/institution lenses.

Add coverage evals with each expansion.

## Stage 3 — Retrieval quality and verification depth

Improve source adapters, query decomposition, ranking/reranking, semantic verifier quality, Arabic retrieval, evidence sufficiency, latency, and disposable caching.

Do not trade trust constraints for recall.

## Stage 4 — Public marketplace hardening

Complete Claude Marketplace, ChatGPT/Codex directory, Gemini extension/gallery or equivalent supported distribution, cross-host automation, installation documentation, security review, and deployment documentation.

## Stage 5 — Source Studio if justified

Build Source Studio only if manual YAML/PR workflows become a real contributor bottleneck.

It remains a Git editor and proposal surface.

## Stage 6 — Sunnah Engine integration

Introduce Sunnah Engine as an evidence backend once its corpus/retrieval capabilities outperform or complement direct-source adapters.

Preserve the existing evidence-facing contract.

## Continuous requirements

Every stage maintains provenance, deterministic policy, claim-level grounding, no counterfactual scholar simulation, disagreement preservation, abstention/escalation, Arabic/English support, cross-host portability, and security/adversarial testing.

