# Source Studio

## Status

**Designed-for-later; not part of the first implementation.**

## Purpose

Source Studio is a lightweight optional UI for humans who do not want to edit source-registry YAML directly.

It is not an admin platform and does not own persistent source state.

## Source of truth

```text
Source Studio
    ↓
proposed Git change
    ↓
PR
    ↓
CI + review
    ↓
main
```

The repository remains authoritative.

## Capabilities

A future UI may provide:

- browse sources;
- inspect Source Packs;
- filter by domain/lens/authority;
- create/edit a source definition;
- validate configuration;
- preview diffs;
- show policy errors;
- show simple coverage reports;
- open a GitHub PR;
- optionally direct-sync for authorized maintainers.

## Publishing default

Opening a PR is the default for everyone, including maintainers.

Direct commit/sync is an explicit privileged path.

## Shared core

Source Studio must call the same registry and validation libraries as:

- CLI;
- CI;
- MCP runtime.

Do not implement a second validation model in the frontend.

## Technology

React is a likely fit because the repository is TypeScript-first, but no frontend technology is required by the first implementation.

A simple HTML/JS interface remains viable if it satisfies the eventual UX.
