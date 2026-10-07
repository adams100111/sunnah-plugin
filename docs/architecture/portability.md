# Portability

## Requirement

Sunnah Plugin is a cross-host product, not a Claude-only, OpenAI-only, or Gemini-only integration.

Core trust behavior must be portable across supported web and agent surfaces.

## Canonical core

The following are shared:

- Sunnah Skill content;
- methodology references;
- source registry;
- source packs;
- policy model;
- MCP tool contracts;
- evidence schemas;
- publication gate semantics;
- eval fixtures.

Host-specific code must not fork these concepts.

## Host adapters

Host adapters may provide:

- manifest files;
- marketplace metadata;
- connection configuration;
- native citation rendering;
- optional hooks;
- host-specific commands;
- host-specific UI integration.

They may not redefine:

- what counts as authority;
- which claims require evidence;
- disagreement policy;
- publication states;
- evidence identity.

## Web-first constraint

The complete trusted path must not require:

- shell access;
- local filesystem access;
- local MCP process;
- hooks;
- a coding CLI.

These may improve local harnesses, but the full product must work through a hosted remote HTTPS MCP endpoint on supported web surfaces.

## Compatibility principle

The architecture targets the intersection of:

- Agent Skills-style on-demand instructions;
- MCP-compatible remote tools;
- structured tool responses.

Where a host lacks one feature, adapters may provide a compatibility path, but the evidence runtime remains the trust boundary.

## Degradation

A host that supports the skill but not the remote evidence runtime may offer only a reduced mode.

Reduced mode must not claim the same trust guarantees as full mode.

The product should prefer disabling authoritative Islamic answering over silently falling back to model memory.
