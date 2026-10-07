import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("deployment compose contract", () => {
  it("keeps the Dokploy compose environment synchronized with the deployment example", async () => {
    const compose = await readFile("deployment/docker-compose.yml", "utf8");
    const envExample = await readFile("deployment/.env.example", "utf8");

    const variables = [
      "QURAN_FOUNDATION_CLIENT_ID",
      "QURAN_FOUNDATION_ACCESS_TOKEN",
      "SUNNAH_VERIFIER_URL",
      "SUNNAH_VERIFIER_TOKEN",
      "SUNNAH_MCP_TOKEN",
      "SUNNAH_MAX_REQUEST_BYTES",
      "SUNNAH_REQUEST_TIMEOUT_MS",
      "SUNNAH_RATE_LIMIT_PER_MINUTE",
      "SUNNAH_RATE_LIMIT_MAX_KEYS",
    ];

    for (const variable of variables) {
      expect(compose).toContain(variable);
      expect(envExample).toContain(variable + "=");
    }

    expect(compose).toContain('expose:');
    expect(compose).toContain('"3000"');
    expect(compose).not.toContain("3000:3000");
    expect(compose).toContain("read_only: true");
    expect(compose).toContain("no-new-privileges:true");
    expect(compose).toContain("cap_drop:");
  });
});
