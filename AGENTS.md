# Agent Instructions

This repository is developed using Matt Pocock's engineering workflow and is intended to remain portable across agent harnesses.

## Start here

Read [README.md](README.md), then use [docs/README.md](docs/README.md) to load only the canonical documentation relevant to the task.

Use the vocabulary in [GLOSSARY.md](GLOSSARY.md) and respect relevant ADRs under `docs/adr/`.

## Agent skills

### Issue tracker

Work is tracked in GitHub Issues for `adams100111/sunnah-plugin`. See `docs/agents/issue-tracker.md`.

### Domain docs

This repository uses a single-context domain model. See `docs/agents/domain.md`.

## Engineering workflow

For substantial feature work, follow this sequence unless the task clearly fits a narrower flow:

1. `grill-with-docs` + `domain-modeling`
2. `to-spec`
3. `to-tickets`
4. `implement-spec` for multi-ticket orchestration, or `implement` for one ticket
5. `code-review`
6. Sunnah-specific evidence, security, cross-harness, and marketplace validation

Generated tickets from `to-tickets` are already agent-ready and should not be triaged again.

## Project invariants

- Islamic claims must follow the documented evidence and publication policy.
- Do not silently fall back to parametric Islamic knowledge when evidence tooling fails.
- Keep one canonical Sunnah Skill; domain/task procedures are progressively disclosed internals.
- Keep host-specific Claude/OpenAI/Gemini code as thin adapters over shared methodology and runtime contracts.
- Git `main` is canonical for plugin source/policy configuration.
- Do not add a database, admin platform, persistent corpus, or persistent knowledge layer without first checking the documented Sunnah Engine boundary.
- Optimize context loading: read only the docs and source packs relevant to the task.
- Do not duplicate canonical methodology across prompts, adapters, or implementation files.
