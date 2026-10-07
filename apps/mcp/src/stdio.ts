import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { createRuntime } from "./runtime.js";
import { createSunnahMcpServer } from "./server.js";

const runtime = await createRuntime();
const server = createSunnahMcpServer(runtime);
await server.connect(new StdioServerTransport());
