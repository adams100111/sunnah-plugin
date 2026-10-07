# Gemini Distribution

## Targets

Sunnah Plugin should support Gemini through the strongest currently available portable surfaces, including:

- Gemini CLI extensions;
- bundled Agent Skills;
- MCP-backed tooling;
- Gemini web custom/remote integrations where supported by the user's account/surface.

## Gemini CLI

Gemini CLI extensions can bundle:

- Agent Skills;
- MCP servers/configuration;
- commands;
- hooks;
- policies;
- other extension assets.

The Sunnah adapter should reuse the canonical skill rather than creating a separate Gemini-specific methodology file.

## Policy engine

Gemini CLI host policies may be used as optional defense-in-depth.

Core religious source enforcement remains server-side so the same guarantees survive on hosts without Gemini's local policy engine.

## Web

Gemini web capabilities may vary by product/account as Google's extension and custom app surfaces evolve.

The requirement is to use remote MCP-compatible integration where available without changing the canonical evidence contract.

If a Gemini surface cannot support the full evidence runtime, it must not silently claim full trusted mode.

## Validation

Before declaring Gemini support, test:

- skill discovery/activation;
- remote evidence tool access;
- result-state preservation;
- no fallback to parametric Islamic answers when tools fail;
- Arabic and English behavior.
