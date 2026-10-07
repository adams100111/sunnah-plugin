import { serve } from "@hono/node-server";
import { getConnInfo } from "@hono/node-server/conninfo";
import { createMcpHonoApp } from "@modelcontextprotocol/hono";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { bodyLimit } from "hono/body-limit";
import { timeout } from "hono/timeout";
import { createRuntime } from "./runtime.js";
import { createSunnahMcpServer } from "./server.js";

const runtime = await createRuntime();
const handler = createMcpHandler(() => createSunnahMcpServer(runtime));

const app = createMcpHonoApp();
const maxBodyBytes = Number.parseInt(process.env.SUNNAH_MAX_REQUEST_BYTES ?? "262144", 10);
const requestTimeoutMs = Number.parseInt(process.env.SUNNAH_REQUEST_TIMEOUT_MS ?? "60000", 10);
const rateLimit = Number.parseInt(process.env.SUNNAH_RATE_LIMIT_PER_MINUTE ?? "120", 10);
const windows = new Map<string, { startedAt: number; count: number }>();

app.get("/health", (c) => c.json({ ok: true, service: "sunnah-plugin" }));

app.use(
  "/mcp",
  bodyLimit({
    maxSize: maxBodyBytes,
    onError: (c) => c.json({ error: "request_too_large" }, 413),
  }),
);
app.use("/mcp", timeout(requestTimeoutMs));
app.use("/mcp", async (c, next) => {
  const key = getConnInfo(c).remote.address ?? "unknown";
  const now = Date.now();
  const current = windows.get(key);
  const windowState =
    !current || now - current.startedAt >= 60_000
      ? { startedAt: now, count: 0 }
      : current;
  windowState.count += 1;
  windows.set(key, windowState);

  if (windowState.count > rateLimit) {
    c.header("Retry-After", "60");
    return c.json({ error: "rate_limit_exceeded" }, 429);
  }

  if (windows.size > 10_000) {
    for (const [address, value] of windows) {
      if (now - value.startedAt >= 60_000) windows.delete(address);
    }
  }

  await next();
});

app.onError((error, c) => {
  console.error("MCP request failed", error);
  return c.json({ error: "internal_error" }, 500);
});

app.all("/mcp", (c) => handler.fetch(c.req.raw));

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const server = serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Sunnah MCP listening on http://127.0.0.1:${info.port}/mcp`);
});

for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.once(signal, () => {
    server.close(() => process.exit(0));
  });
}
