# Claude Distribution

## Targets

Sunnah Plugin should target:

- Claude Web plugin/connectors surfaces where applicable;
- Claude Code plugin installation;
- remote MCP connectivity.

## Packaging principle

Claude-specific packaging is an adapter over the canonical Sunnah Skill and Evidence Runtime.

Do not fork the methodology into a separate Claude prompt.

## Claude Code

The repository may include Claude plugin metadata and optional local enhancements such as commands or hooks.

Those enhancements are defense-in-depth only.

The trusted core must continue to work without them through the remote MCP service.

## Claude Web

The web experience must use the hosted evidence path and must not require:

- local shell;
- local MCP process;
- repository checkout;
- hook execution.

## Marketplace

The public distribution goal is a Claude Marketplace listing once the plugin satisfies trust, security, and cross-host release gates.

Marketplace metadata should describe the capability accurately:

- grounded Sunni Islamic knowledge;
- evidence-based answers;
- source verification;
- no claim of autonomous mufti authority.

## Validation

Before release, verify:

- skill discovery/activation;
- remote MCP connection;
- evidence tools;
- result rendering;
- citation/source accessibility;
- abstention/disagreement behavior;
- Arabic and English behavior.
