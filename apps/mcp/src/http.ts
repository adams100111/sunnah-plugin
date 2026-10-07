import { serve } from "@hono/node-server";
import { createMcpHonoApp } from "@modelcontextprotocol/hono";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { createRuntime } from "./runtime.js";
import { createSunnahMcpServer } from "./server.js";

const runtime = await createRuntime();
const handler = createMcpHandler(() => createSunnahMcpServer(runtime));

const app = createMcpHonoApp();
app.get("/health", (c) => c.json({ ok: true, service: "sunnah-plugin" }));
app.all("/mcp", (c) =>
  handler.fetch(c.req.raw, { parsedBody: c.get("parsedBody") }),
);

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
serve({ fetch: app.fetch, port }, (info) => {
  console.log("Sunnah MCP listening on http://127.0.0.1:" + info.port + "/mcp");
});
