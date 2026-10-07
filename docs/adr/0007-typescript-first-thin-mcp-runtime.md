# Use a TypeScript-first thin MCP runtime

The first Sunnah Plugin implementation uses TypeScript on Node.js with pnpm workspaces, the stable MCP TypeScript SDK v2 line, a thin Hono HTTP boundary, shared runtime schemas, and a first-class maintainer CLI. This keeps MCP, validation, CLI, host packaging, tests, and future Source Studio in one typed ecosystem while deliberately avoiding a database or heavy application framework inside the plugin.
