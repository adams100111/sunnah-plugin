import { resolve } from "node:path";
import { loadRegistry } from "@sunnah/registry";
import { semanticVerifierFromEnvironment, SunnahRuntime } from "@sunnah/runtime";

export async function createRuntime(): Promise<SunnahRuntime> {
  const root = resolve(process.env.SUNNAH_REPO_ROOT ?? process.cwd());
  const registry = await loadRegistry(root);
  const clientId = process.env.QURAN_FOUNDATION_CLIENT_ID;
  const accessToken = process.env.QURAN_FOUNDATION_ACCESS_TOKEN;
  return new SunnahRuntime({
    registry,
    ...(clientId && accessToken
      ? { quranCredentials: { clientId, accessToken } }
      : {}),
    semanticVerifier: semanticVerifierFromEnvironment(),
  });
}
