# Build and Install Distribution Packages

Sunnah Plugin keeps one canonical skill in `skills/sunnah/` and generates host packages only when a real deployed MCP endpoint is known.

## Build

After deploying the MCP server to a public HTTPS endpoint ending in `/mcp`:

```bash
pnpm build
pnpm --filter @sunnah/cli exec sunnah plugin build --mcp-url https://YOUR_REAL_HOST/mcp
```

Generated artifacts appear under `.generated/distribution/` for OpenAI, Claude, Gemini, and generic hosts. These generated copies are release artifacts, not canonical skill sources.

## OpenAI / ChatGPT / Codex

The OpenAI artifact contains portable Agent Plugins `plugin.json`, `mcp.json`, and the canonical `skills/` directory. Public submission requires a real reachable HTTPS MCP endpoint.

## Claude

The Claude artifact contains `.claude-plugin/plugin.json`, `.mcp.json`, and the canonical `skills/` directory. Claude Web uses the deployed remote connector; Claude Code/Desktop can use the same endpoint.

## Gemini

The Gemini artifact contains `gemini-extension.json` using `httpUrl` for Streamable HTTP and the canonical `skills/` directory.

## Generic hosts

The generic artifact contains the canonical skill and portable MCP declaration. Full trusted mode requires both skill loading and remote MCP access.
