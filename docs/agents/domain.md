# Domain Documentation

## Layout

This repository uses a **single-context** domain model.

Canonical domain vocabulary lives in:

- `GLOSSARY.md` at the repository root, when present.

Durable architecture decisions live in:

- `docs/adr/`

## Agent rules

Before changing behavior or architecture:

1. Read the relevant entries in `GLOSSARY.md`, if the file exists.
2. Read ADRs relevant to the area being changed.
3. Use the project's canonical vocabulary in specs, tickets, code, tests, and documentation.
4. If a term is ambiguous or overloaded, resolve the vocabulary before encoding it in implementation.
5. Record an ADR only when a decision is hard to reverse, surprising without context, and the result of a genuine trade-off.

## Boundaries

`GLOSSARY.md` is a glossary, not:

- a specification;
- a roadmap;
- an implementation plan;
- an ADR collection;
- a scratchpad.

Implementation details belong in specs, tickets, code, or ADRs as appropriate.
