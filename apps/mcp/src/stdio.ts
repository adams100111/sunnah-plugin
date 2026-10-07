import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { createRuntime } from "./runtime.js";
import { createSunnahMcpServer } from "./server.js";

const runtime = await createRuntime();
serveStdio(() => createSunnahMcpServer(runtime));
