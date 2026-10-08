import { createHash } from "node:crypto";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { guardedFetch } from "guarded-fetch";
import type { CompiledRegistry } from "@sunnah/registry";
import {
  EvidenceSchema,
  SearchCandidateSchema,
  type Evidence,
  type SearchCandidate,
  type SourceDefinition,
} from "@sunnah/schemas";

export type FetchLike = typeof fetch;
export type ResolveHost = (hostname: string) => Promise<string[]>;

export interface QuranFoundationCredentials {
  clientId: string;
  accessToken: string;
}

export interface FetchPolicy {
  maxBytes?: number;
  maxRedirects?: number;
  resolveHost?: ResolveHost;
  fetcher?: FetchLike;
}

const defaultResolveHost: ResolveHost = async (hostname) => {
  const results = await lookup(hostname, { all: true, verbatim: true });
  return results.map((result) => result.address);
};

function isForbiddenIpv4(address: string): boolean {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part))) return true;
  const [a, b] = parts as [number, number, number, number];
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
}

function isForbiddenIpv6(address: string): boolean {
  const value = address.toLowerCase();
  if (value === "::" || value === "::1") return true;
  if (value.startsWith("fc") || value.startsWith("fd")) return true;
  if (/^fe[89ab]/.test(value)) return true;
  if (value.startsWith("::ffff:")) {
    const mapped = value.slice("::ffff:".length);
    return isIP(mapped) === 4 ? isForbiddenIpv4(mapped) : true;
  }
  return false;
}

export function isForbiddenAddress(address: string): boolean {
  const version = isIP(address);
  if (version === 4) return isForbiddenIpv4(address);
  if (version === 6) return isForbiddenIpv6(address);
  return true;
}

function pathMatches(pattern: string, pathname: string): boolean {
  if (pattern.endsWith("/**")) return pathname.startsWith(pattern.slice(0, -2));
  return pathname === pattern;
}

export function sourcePermitsUrl(source: SourceDefinition, url: URL): boolean {
  if (url.protocol !== "https:") return false;
  return source.origins.some(
    (origin) =>
      url.hostname === origin.host &&
      origin.paths.some((pattern) => pathMatches(pattern, url.pathname)),
  );
}

export function findRegisteredSourceForUrl(
  registry: CompiledRegistry,
  url: URL,
): SourceDefinition | undefined {
  return Object.values(registry.sources).find(
    (source) => source.status === "active" && sourcePermitsUrl(source, url),
  );
}

function normalizeDocumentPath(pathname: string): string {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}

function sourceDocumentIdentity(source: SourceDefinition, url: URL): string | undefined {
  const prefixes = source.retrieval.search?.resultPathPrefixes ?? [];
  for (const prefix of prefixes) {
    if (!url.pathname.startsWith(prefix)) continue;
    const remainder = url.pathname.slice(prefix.length).replace(/^\/+/, "");
    const firstSegment = remainder.split("/")[0];
    if (firstSegment) return `${prefix}:${firstSegment}`;
  }
  return undefined;
}

function assertSameSourceDocument(
  source: SourceDefinition,
  requestedUrl: URL,
  resolvedUrl: URL,
): void {
  if (requestedUrl.href === resolvedUrl.href) return;

  const requestedIdentity = sourceDocumentIdentity(source, requestedUrl);
  const resolvedIdentity = sourceDocumentIdentity(source, resolvedUrl);
  if (requestedIdentity && resolvedIdentity && requestedIdentity === resolvedIdentity) return;

  if (
    !requestedIdentity &&
    !resolvedIdentity &&
    requestedUrl.hostname === resolvedUrl.hostname &&
    normalizeDocumentPath(requestedUrl.pathname) === normalizeDocumentPath(resolvedUrl.pathname) &&
    requestedUrl.search === resolvedUrl.search
  ) {
    return;
  }

  throw new Error("Redirect changed source document identity");
}


async function assertPublicDestination(url: URL, resolveHost: ResolveHost): Promise<void> {
  if (url.protocol !== "https:") throw new Error("Only HTTPS URLs are allowed");
  const literalVersion = isIP(url.hostname);
  const addresses = literalVersion > 0 ? [url.hostname] : await resolveHost(url.hostname);
  if (addresses.length === 0) throw new Error("Host did not resolve");
  if (addresses.some(isForbiddenAddress)) {
    throw new Error("URL resolves to a forbidden network address");
  }
}

async function readLimitedBody(response: Response, maxBytes: number): Promise<string> {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > maxBytes) {
      await reader.cancel();
      throw new Error(`Response exceeds maximum size of ${maxBytes} bytes`);
    }
    chunks.push(value);
  }
  const output = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(output);
}

async function fetchTextWithGuard(
  initialUrl: URL,
  policy: FetchPolicy,
  permits: (url: URL) => boolean,
  allowedHosts?: string[],
): Promise<{ url: URL; contentType: string; text: string }> {
  const maxBytes = policy.maxBytes ?? 2_000_000;
  const maxRedirects = policy.maxRedirects ?? 3;
  const injectedTransport = policy.fetcher !== undefined || policy.resolveHost !== undefined;
  const fetcher = policy.fetcher ?? fetch;
  const resolveHost = policy.resolveHost ?? defaultResolveHost;
  let url = initialUrl;

  for (let redirects = 0; redirects <= maxRedirects; redirects += 1) {
    if (!permits(url)) throw new Error("URL is not permitted by the active fetch policy");

    let response: Response;
    if (injectedTransport) {
      await assertPublicDestination(url, resolveHost);
      response = await fetcher(url, {
        redirect: "manual",
        headers: { "user-agent": "sunnah-plugin/0.1" },
      });
    } else {
      response = await guardedFetch(url, {
        httpsOnly: true,
        ...(allowedHosts ? { allowedHosts } : {}),
        followRedirects: false,
        maxRedirects: 0,
        timeoutMs: 10_000,
        headers: { "user-agent": "sunnah-plugin/0.1" },
        opaqueErrors: true,
      });
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("Redirect response is missing Location");
      if (redirects === maxRedirects) throw new Error("Too many redirects");
      url = new URL(location, url);
      continue;
    }
    if (!response.ok) throw new Error(`Source returned HTTP ${response.status}`);

    const contentType = (response.headers.get("content-type") ?? "").split(";")[0]?.trim() ?? "";
    if (!["text/html", "text/plain", "application/json"].includes(contentType)) {
      throw new Error(`Unsupported content type: ${contentType || "unknown"}`);
    }
    return { url, contentType, text: await readLimitedBody(response, maxBytes) };
  }
  throw new Error("Unable to fetch source");
}

export async function safeFetchText(
  initialUrl: URL,
  source: SourceDefinition,
  policy: FetchPolicy = {},
): Promise<{ url: URL; contentType: string; text: string }> {
  return fetchTextWithGuard(
    initialUrl,
    policy,
    (url) => sourcePermitsUrl(source, url),
    source.origins.map((origin) => origin.host),
  );
}

export async function safeFetchPublicText(
  initialUrl: URL,
  policy: FetchPolicy = {},
): Promise<{ url: URL; contentType: string; text: string }> {
  return fetchTextWithGuard(initialUrl, policy, (url) => url.protocol === "https:");
}

function decodeHtmlEntities(value: string): string {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function preferredHtmlRegion(html: string): string {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (main) return main;
  const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1];
  return article ?? html;
}

export function htmlToEvidenceText(html: string): string {
  return decodeHtmlEntities(
    preferredHtmlRegion(html)
      .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}


function extractSearchCandidates(
  html: string,
  baseUrl: URL,
  source: SourceDefinition,
  limit: number,
): SearchCandidate[] {
  const prefixes = source.retrieval.search?.resultPathPrefixes ?? [];
  const candidates: SearchCandidate[] = [];
  const seen = new Set<string>();
  const anchors = html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi);

  for (const match of anchors) {
    const href = match[1];
    const rawTitle = match[2];
    if (!href || !rawTitle) continue;

    let url: URL;
    try {
      url = new URL(href, baseUrl);
    } catch {
      continue;
    }
    if (!sourcePermitsUrl(source, url)) continue;
    if (!prefixes.some((prefix) => url.pathname.startsWith(prefix))) continue;
    if (seen.has(url.href)) continue;

    const title = htmlToEvidenceText(rawTitle);
    if (title.length < 3) continue;
    seen.add(url.href);
    candidates.push(SearchCandidateSchema.parse({ sourceId: source.id, title, url: url.href }));
    if (candidates.length >= limit) break;
  }

  return candidates;
}

export async function searchApprovedSource(
  registry: CompiledRegistry,
  sourceId: string,
  query: string,
  limit = 5,
  options: FetchPolicy = {},
): Promise<SearchCandidate[]> {
  const source = registry.sources[sourceId];
  if (source?.status !== "active") throw new Error(`Unknown or inactive source: ${sourceId}`);
  const search = source.retrieval.search;
  const baseUrl = source.retrieval.baseUrl;
  if (!search || !baseUrl) throw new Error(`Source ${sourceId} does not provide configured search`);

  const url = new URL(search.path, baseUrl);
  url.searchParams.set(search.queryParam, query);
  for (const [key, value] of Object.entries(search.params)) url.searchParams.set(key, value);

  const result = await safeFetchText(url, source, options);
  if (result.contentType !== "text/html") {
    throw new Error(`Source ${sourceId} search must return HTML`);
  }
  return extractSearchCandidates(result.text, result.url, source, Math.min(Math.max(limit, 1), 20));
}

function evidenceId(sourceId: string, documentId: string, passage: string): string {
  return `ev_${createHash("sha256")
    .update(`${sourceId}\0${documentId}\0${passage}`)
    .digest("hex")
    .slice(0, 20)}`;
}

const MAX_EVIDENCE_CHARS = 40_000;

function textForEvidence(contentType: string, text: string): string {
  return contentType === "text/html" ? htmlToEvidenceText(text) : text.trim();
}

function compactEvidenceText(
  contentType: string,
  text: string,
): { fullPassage: string; passage: string; truncated: boolean } {
  const fullPassage = textForEvidence(contentType, text);
  if (fullPassage.length <= MAX_EVIDENCE_CHARS) {
    return { fullPassage, passage: fullPassage, truncated: false };
  }
  return {
    fullPassage,
    passage: fullPassage.slice(0, MAX_EVIDENCE_CHARS),
    truncated: true,
  };
}

export async function fetchApprovedUrlEvidence(
  registry: CompiledRegistry,
  sourceId: string,
  rawUrl: string,
  options: FetchPolicy = {},
): Promise<Evidence> {
  const source = registry.sources[sourceId];
  if (!source || source.status !== "active") {
    throw new Error(`Unknown or inactive source: ${sourceId}`);
  }
  const requestedUrl = new URL(rawUrl);
  const result = await safeFetchText(requestedUrl, source, options);
  assertSameSourceDocument(source, requestedUrl, result.url);
  const { fullPassage, passage, truncated } = compactEvidenceText(
    result.contentType,
    result.text,
  );
  if (!passage) throw new Error("Retrieved source contains no usable text");

  return EvidenceSchema.parse({
    id: evidenceId(source.id, result.url.href, fullPassage),
    sourceId: source.id,
    sourceClass: source.sourceClass,
    authority: source.authority,
    documentId: result.url.href,
    canonicalUrl: result.url.href,
    passage,
    ...(truncated ? { truncated: true as const } : {}),
    language: source.languages[0] ?? "und",
    registryRevision: registry.revision,
    retrievedAt: new Date().toISOString(),
  });
}

export async function fetchUnregisteredUrlEvidence(
  registry: CompiledRegistry,
  rawUrl: string,
  kind: "user" | "external-fact",
  options: FetchPolicy = {},
): Promise<Evidence> {
  const result = await safeFetchPublicText(new URL(rawUrl), options);
  const { fullPassage, passage, truncated } = compactEvidenceText(
    result.contentType,
    result.text,
  );
  if (!passage) throw new Error("Retrieved source contains no usable text");
  const prefix = kind === "user" ? "user" : "external";
  const sourceClass = kind === "user" ? "USER_SUPPLIED_UNTRUSTED" : "EXTERNAL_FACTUAL";

  return EvidenceSchema.parse({
    id: evidenceId(`${prefix}:${result.url.hostname}`, result.url.href, fullPassage),
    sourceId: `${prefix}:${result.url.hostname}`,
    sourceClass,
    authority: {
      type: "external",
      id: result.url.hostname,
      name: result.url.hostname,
    },
    documentId: result.url.href,
    canonicalUrl: result.url.href,
    passage,
    ...(truncated ? { truncated: true as const } : {}),
    language: "und",
    registryRevision: registry.revision,
    retrievedAt: new Date().toISOString(),
  });
}

export async function fetchQuranVerseEvidence(
  registry: CompiledRegistry,
  verseKey: string,
  credentials: QuranFoundationCredentials,
  fetcher: FetchLike = fetch,
): Promise<Evidence> {
  if (!/^\d{1,3}:\d{1,3}$/.test(verseKey)) {
    throw new Error("Verse key must use chapter:verse format");
  }
  if (!credentials.clientId || !credentials.accessToken) {
    throw new Error("Quran Foundation credentials are required");
  }

  const source = registry.sources["quran-foundation"];
  if (!source || source.status !== "active" || source.retrieval.type !== "quran-foundation") {
    throw new Error("Quran Foundation source is not active");
  }
  const baseUrl = source.retrieval.baseUrl;
  if (!baseUrl) throw new Error("Quran Foundation base URL is not configured");

  const url = new URL(`${baseUrl}/verses/by_key/${encodeURIComponent(verseKey)}`);
  url.searchParams.set("language", "en");
  url.searchParams.set("words", "false");
  url.searchParams.set("fields", "text_uthmani");

  const headers = {
    "x-client-id": credentials.clientId,
    "x-auth-token": credentials.accessToken,
    "user-agent": "sunnah-plugin/0.1",
  };
  const response =
    fetcher === fetch
      ? await guardedFetch(url, {
          httpsOnly: true,
          allowedHosts: [url.hostname],
          timeoutMs: 10_000,
          headers,
          opaqueErrors: true,
        })
      : await fetcher(url, { headers });
  if (!response.ok) throw new Error(`Quran Foundation returned HTTP ${response.status}`);

  const payload = (await response.json()) as {
    verse?: { id?: number; verse_key?: string; text_uthmani?: string };
  };
  const verse = payload.verse;
  if (!verse?.verse_key || !verse.text_uthmani) {
    throw new Error("Quran Foundation response is missing verse text");
  }

  return EvidenceSchema.parse({
    id: `ev_quran_${verse.verse_key.replace(":", "_")}`,
    sourceId: source.id,
    sourceClass: source.sourceClass,
    authority: source.authority,
    documentId: `quran:${verse.verse_key}`,
    canonicalUrl: url.href,
    passage: verse.text_uthmani,
    language: "ar",
    registryRevision: registry.revision,
    retrievedAt: new Date().toISOString(),
    location: { verseKey: verse.verse_key, label: `Qur'an ${verse.verse_key}` },
  });
}
