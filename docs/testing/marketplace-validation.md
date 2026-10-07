# Marketplace Validation

## Goal

Marketplace packaging is part of release engineering.

## Claude

Validate the Claude plugin package, skill resources, remote MCP configuration, marketplace metadata, supported web behavior, Claude Code installation behavior, and absence of accidental local-only dependencies.

## OpenAI

Validate the plugin package, canonical skill packaging, remote MCP connection, ChatGPT web invocation, Codex availability, shared directory metadata, and web compatibility.

## Gemini

Validate the Gemini extension manifest where used, Agent Skill discovery, MCP configuration, CLI installation/update path, web/custom integration path where supported, and that host policies remain optional defense-in-depth.

## Generic package validation

Check that canonical files are not duplicated unnecessarily, host adapters reference shared resources, no secrets are packaged, links/metadata resolve, and release identifiers are consistent.

## Release evidence

A release should retain CI-visible proof that package validation ran successfully for each declared supported host.
