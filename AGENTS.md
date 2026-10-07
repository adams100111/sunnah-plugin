# Agent Instructions

This repository is developed using Matt Pocock's engineering workflow and is intended to remain portable across agent harnesses.

## Agent skills

### Issue tracker

Work is tracked in GitHub Issues for `adams100111/sunnah-plugin`. See `docs/agents/issue-tracker.md`.

### Domain docs

This repository uses a single-context domain model. Read `GLOSSARY.md` when it exists and relevant ADRs under `docs/adr/`. See `docs/agents/domain.md`.

## Engineering workflow

For substantial feature work, follow this sequence unless the task clearly fits a narrower flow:

1. `grill-with-docs` + `domain-modeling`
2. `to-spec`
3. `to-tickets`
4. `implement-spec` for multi-ticket orchestration, or `implement` for one ticket
5. `code-review`
6. project-specific evidence, security, cross-harness, and marketplace validation

Generated tickets from `to-tickets` are already agent-ready and should not be triaged again.

Keep methodology, product decisions, and domain vocabulary in canonical documentation rather than duplicating them across prompts or implementation files.
