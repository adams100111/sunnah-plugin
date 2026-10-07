#!/usr/bin/env node
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function ensure(command, args, label) {
  const result = spawnSync(command, args, {
    cwd: root,
    env: process.env,
    stdio: ["ignore", "ignore", "inherit"],
  });
  if (result.status !== 0) {
    console.error(`Sunnah local MCP bootstrap failed during ${label}.`);
    process.exit(result.status ?? 1);
  }
}

if (!existsSync(resolve(root, "node_modules/.pnpm"))) {
  ensure("corepack", ["pnpm", "install", "--frozen-lockfile"], "dependency installation");
}

if (!existsSync(resolve(root, "apps/mcp/dist/stdio.js"))) {
  ensure(pnpm, ["build"], "TypeScript build");
}

const child = spawn(process.execPath, ["apps/mcp/dist/stdio.js"], {
  cwd: root,
  env: { ...process.env, SUNNAH_REPO_ROOT: root },
  stdio: ["inherit", "inherit", "inherit"],
});

child.once("error", (error) => {
  console.error("Unable to start Sunnah local MCP:", error);
  process.exit(1);
});
child.once("exit", (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
