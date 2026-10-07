# ChatGPT and OpenAI Distribution

## Targets

Sunnah Plugin should target:

- ChatGPT web plugin surfaces;
- ChatGPT Work/plugin testing surfaces where applicable;
- Codex;
- OpenAI's shared plugin directory.

## Packaging

The OpenAI adapter packages:

- the canonical Sunnah Skill;
- remote MCP configuration;
- marketplace metadata;
- optional surface-specific capabilities.

The skill and runtime are not OpenAI-specific implementations.

## Remote MCP

The production server is a public HTTPS MCP endpoint.

Local-only MCP or shell scripts cannot be required for the ChatGPT web experience.

## Universal listing

OpenAI's plugin model supports shared discovery across supported ChatGPT and Codex surfaces.

The project should publish one canonical OpenAI listing rather than maintaining separate product identities for ChatGPT and Codex.

## Optional UI

A custom MCP UI is not required for the first plugin release.

If a later Source Studio or evidence inspector benefits from MCP Apps-compatible UI, it should remain optional and must not change the evidence contract.

## Validation

Before release, verify:

- skill activation;
- remote MCP connection;
- structured tool inputs/outputs;
- citations/source rendering;
- result states;
- web behavior without local dependencies;
- Codex compatibility;
- Arabic and English behavior.
