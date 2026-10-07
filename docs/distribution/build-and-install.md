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


## Run the MCP server

Local HTTP development:

```bash
pnpm build
node apps/mcp/dist/http.js
```

or:

```bash
pnpm build
node packages/cli/dist/index.js mcp dev
```

The server exposes:

- `GET /health`
- `/mcp` for Streamable HTTP MCP

Production deployments should configure the values documented in `.env.example`, terminate TLS at the platform/edge or container ingress, and keep the public MCP URL stable.

## Docker

The root `Dockerfile` is provider-neutral:

```bash
docker build -t sunnah-plugin .
docker run --rm -p 3000:3000 --env-file .env sunnah-plugin
```

Use the resulting public HTTPS `/mcp` endpoint when building marketplace artifacts.


## Runtime modes

### Skill-only

The canonical skill does not require MCP to load. If MCP is absent, it enters Lite mode and may use host-native retrieval according to `skills/sunnah/references/lite-mode.md`. It must not claim server-side Publication Gate verification.

### Local marketplace / harness installation

The repository now includes:

- root portable `mcp.json`
- `.codex-plugin/plugin.json`
- `.mcp.json`
- `scripts/local-mcp-bootstrap.mjs`
- local stdio MCP implementation at `apps/mcp/src/stdio.ts`

Supported local clients that install the repository/plugin can spawn the stdio MCP directly. OpenAI documents bundled stdio MCP for Codex/ChatGPT desktop local marketplaces, while Gemini CLI extensions support `command` + `args` stdio MCP servers. Claude-compatible local plugin clients can use the same root `.mcp.json`.

The bootstrap requires Node.js 22.12+ and Corepack/pnpm availability. On first launch it installs the exact locked dependency graph and builds the runtime if the built files are absent.

This local package is **not** the ChatGPT Web public-plugin transport. ChatGPT Web requires a remote HTTPS MCP endpoint for full mode.

### Private remote token

For a private deployment:

```text
SUNNAH_MCP_TOKEN=<long-random-secret>
```

The server then requires:

```http
Authorization: Bearer <token>
```

on `/mcp`. Keep the token out of Git/plugin archives.

Claude remote connectors support configuring a fixed request header. Local OpenAI/Codex MCP configurations can source bearer tokens from environment variables. ChatGPT Web's current plugin authentication flow should not be assumed to support an arbitrary private fixed bearer secret; use no-auth for a private/non-sensitive endpoint or standards-compliant OAuth when ChatGPT Web authentication is required.
