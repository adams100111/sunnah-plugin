# Distribution

## Goal

Ship one canonical Sunnah implementation across major agent hosts without duplicating methodology or trust logic.

## Supported targets

Primary targets:

- Claude Web and Claude Code;
- ChatGPT Web and Codex;
- Gemini Web where supported and Gemini CLI;
- compatible Agent Skills and MCP hosts.

## Shared core

All targets share:

- Sunnah Skill;
- methodology references;
- source/policy semantics;
- remote HTTPS MCP Evidence Runtime;
- schemas;
- evals.

## Host-specific layers

Per-host packaging may include:

- manifest;
- marketplace metadata;
- connection setup;
- optional hooks/commands;
- native citation rendering;
- optional UI integrations.

These adapters must remain thin.

## Release rule

A release is not considered complete if its core trust guarantees only work in one local coding harness.

At minimum, release validation must prove the full remote evidence path on the supported web surfaces and compatibility on the corresponding coding harnesses.

## Capability drift

Host platforms evolve quickly.

Host-specific documentation should be updated independently when marketplace, manifest, or installation requirements change.

The canonical trust architecture should not depend on a proprietary packaging detail.
