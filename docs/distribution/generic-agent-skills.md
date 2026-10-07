# Generic Agent Skills and MCP Hosts

## Goal

The canonical Sunnah Skill should remain useful beyond first-party Claude/OpenAI/Gemini packaging.

## Portable foundation

The portable capability consists of:

- Agent Skill instructions/resources;
- remote HTTPS MCP Evidence Runtime;
- host-independent structured contracts.

## Full mode

A generic host provides full Sunnah behavior when it supports:

1. activation/use of the Sunnah Skill or equivalent instruction bundle;
2. remote MCP tools;
3. structured tool inputs/outputs.

## Reduced mode

A host that can load only the skill but cannot access the Evidence Runtime cannot provide the same authoritative Islamic answer path.

Reduced mode may support:

- explaining how to use Sunnah;
- preparing queries;
- non-authoritative workflow assistance.

It must not silently answer substantive Islamic questions from model memory under the Sunnah trust label.

## Local enhancements

Hosts may optionally provide:

- local commands;
- hooks;
- filesystem resources;
- policy engines.

These are compatibility or DX enhancements, not core trust dependencies.
