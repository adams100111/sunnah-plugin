import { describe, expect, it } from "vitest";
import { hasValidBearerToken } from "../apps/mcp/src/token-auth.js";

describe("remote MCP bearer token", () => {
  it("accepts the exact bearer token", () => {
    expect(hasValidBearerToken("Bearer secret-token", "secret-token")).toBe(true);
  });

  it("rejects missing, malformed, and incorrect tokens", () => {
    expect(hasValidBearerToken(undefined, "secret-token")).toBe(false);
    expect(hasValidBearerToken("secret-token", "secret-token")).toBe(false);
    expect(hasValidBearerToken("Bearer wrong", "secret-token")).toBe(false);
  });
});
