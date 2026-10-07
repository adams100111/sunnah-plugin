# Deploy Sunnah MCP with Dokploy

This directory is the production Compose entry point for the hosted Sunnah MCP runtime.

The intended deployment is deliberately small:

```text
GitHub repository
      ↓
Dokploy Compose
      ↓
one Sunnah MCP container
      ↓
Dokploy-managed Traefik / TLS
      ↓
https://YOUR_DOMAIN/mcp
```

No database, Redis, persistent volume, worker, or separate reverse-proxy container is required.

## Files

- `docker-compose.yml` — production Compose service.
- `.env.example` — every variable consumed by the Compose deployment.
- root `../Dockerfile` — canonical image build.

## 1. Create the Compose service in Dokploy

In Dokploy:

1. Create or open the target project/environment.
2. Add a **Compose** service.
3. Choose the GitHub/Git repository `adams100111/sunnah-plugin`.
4. Use branch `main`.
5. Set the Compose path to:

   ```text
   ./deployment/docker-compose.yml
   ```

6. Save the service.

The Compose file uses `build.context: ..`, so it builds the repository's canonical root `Dockerfile`.

## 2. Configure environment variables

Copy the variables from `.env.example` into Dokploy's environment-variable editor.

Dokploy writes Compose variables into the deployment `.env`; this Compose file references every runtime variable explicitly so they are also injected into the container.

### Private MCP token

For a private deployment, set:

```text
SUNNAH_MCP_TOKEN=<strong-random-secret>
```

Generate one with:

```bash
openssl rand -hex 32
```

When this variable is non-empty, every request to `/mcp` must include:

```http
Authorization: Bearer <SUNNAH_MCP_TOKEN>
```

`/health` intentionally remains unauthenticated for health checks.

Do not commit the real token.

### Qur'an credentials

Set both values when canonical Qur'an lookup through Quran Foundation is required:

```text
QURAN_FOUNDATION_CLIENT_ID=
QURAN_FOUNDATION_ACCESS_TOKEN=
```

The runtime can start without them, but Quran Foundation-backed functionality will not be available.

### Semantic verifier

Optional:

```text
SUNNAH_VERIFIER_URL=
SUNNAH_VERIFIER_TOKEN=
```

When unset, the runtime uses the built-in conservative verifier. This is fail-closed and suitable for direct textual support, but it intentionally rejects richer paraphrase/synthesis that requires semantic entailment.

### Runtime limits

The supplied defaults are the application defaults:

```text
SUNNAH_MAX_REQUEST_BYTES=262144
SUNNAH_REQUEST_TIMEOUT_MS=60000
SUNNAH_RATE_LIMIT_PER_MINUTE=120
SUNNAH_RATE_LIMIT_MAX_KEYS=10000
```

For a private single-user deployment, the defaults are conservative enough to start with.

## 3. Deploy

Deploy the Compose service.

The application listens internally on port `3000`.

The Compose file uses `expose: 3000` rather than publishing a host port. This is intentional: Dokploy/Traefik should be the public ingress.

The container also runs with:

- read-only root filesystem;
- all Linux capabilities dropped;
- `no-new-privileges`;
- writable tmpfs only at `/tmp`;
- restart policy `unless-stopped`;
- the Dockerfile health check.

## 4. Add the domain in Dokploy

Use Dokploy's **Domains** tab for the Compose service instead of adding Traefik labels manually.

Configure:

```text
Service: sunnah-mcp
Container port: 3000
Domain: mcp.YOUR_DOMAIN
HTTPS: enabled
```

Point the domain's DNS A/AAAA record to the VPS as required by your DNS setup.

Dokploy injects the Traefik routing labels during deployment, so the repository Compose file stays hosting-provider-neutral.

After changing a Compose domain in Dokploy, redeploy the service so Traefik receives the updated labels.

## 5. Verify the deployment

Health:

```bash
curl -fsS https://mcp.YOUR_DOMAIN/health
```

Expected:

```json
{"ok":true,"service":"sunnah-plugin"}
```

If `SUNNAH_MCP_TOKEN` is configured, an unauthenticated MCP request should be rejected:

```bash
curl -i -X POST https://mcp.YOUR_DOMAIN/mcp
```

Expected status:

```text
HTTP/2 401
```

A client must then connect with:

```text
Authorization: Bearer <your token>
```

## 6. Use the endpoint

Your production MCP URL is:

```text
https://mcp.YOUR_DOMAIN/mcp
```

Use that URL when generating remote host packages or configuring web clients.

For example:

```bash
pnpm --filter @sunnah/cli exec sunnah plugin build \
  --mcp-url https://mcp.YOUR_DOMAIN/mcp
```

### Claude Web

For your private deployment, configure the remote connector with the MCP URL and a fixed `Authorization` header containing the bearer token.

### Local harnesses

Local Claude Code, Codex, Gemini CLI, and compatible harnesses do not need this hosted endpoint. The plugin ships a local stdio MCP mode.

### ChatGPT Web

Do not assume a private fixed bearer header is portable to ChatGPT Web. Use the plugin's Lite mode, an unauthenticated read-only remote endpoint, or OAuth if full authenticated remote mode is required there.

## Local Compose smoke test

From the repository root:

```bash
cp deployment/.env.example deployment/.env
docker compose -f deployment/docker-compose.yml config
docker compose -f deployment/docker-compose.yml up --build
```

Then:

```bash
curl http://127.0.0.1:3000/health
```

For local testing only, Compose does not publish port 3000 by design. If you want to curl it from the host, temporarily add a local override file with `ports: ["3000:3000"]` rather than changing the production Compose file.

## Updating

The normal update path is:

```text
merge to main
→ Dokploy detects/pulls the new revision
→ redeploy Compose
→ new image is built
→ health check passes
```

No source-registry synchronization step is required: registry, policies, skill files, and runtime code ship together in the image.
