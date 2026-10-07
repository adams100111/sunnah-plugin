import { McpServer } from "@modelcontextprotocol/server";
import {
  ClaimSchema,
  EvidenceSchema,
  PublicationResultSchema,
} from "@sunnah/schemas";
import type { SunnahRuntime } from "@sunnah/runtime";
import { z } from "zod";

const QuranOutputSchema = z.object({ evidence: EvidenceSchema });
const EvidenceOutputSchema = z.object({ evidence: EvidenceSchema });
const VerificationOutputSchema = z.object({ result: PublicationResultSchema });
const QuotationOutputSchema = z.object({
  evidence: EvidenceSchema,
  result: PublicationResultSchema,
});

function result<T extends Record<string, unknown>>(value: T) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value) }],
    structuredContent: value,
  };
}

export function createSunnahMcpServer(runtime: SunnahRuntime): McpServer {
  const server = new McpServer(
    { name: "sunnah-plugin", version: "0.1.0" },
    { capabilities: { tools: {} } },
  );

  server.registerTool(
    "get_quran_verse",
    {
      title: "Get canonical Qur'an verse",
      description:
        "Retrieve a specific Qur'an verse by chapter:verse key from the configured canonical Quran Foundation source.",
      inputSchema: z.object({ verseKey: z.string().regex(/^\d{1,3}:\d{1,3}$/) }),
      outputSchema: QuranOutputSchema,
    },
    async ({ verseKey }) => result({ evidence: await runtime.getQuranVerse(verseKey) }),
  );

  server.registerTool(
    "fetch_islamic_evidence",
    {
      title: "Fetch approved Islamic evidence",
      description:
        "Fetch a specific HTTPS URL only when it matches an active approved source and path in the Source Registry.",
      inputSchema: z.object({ sourceId: z.string().min(1), url: z.url() }),
      outputSchema: EvidenceOutputSchema,
    },
    async ({ sourceId, url }) =>
      result({ evidence: await runtime.fetchIslamicEvidence(sourceId, url) }),
  );

  server.registerTool(
    "verify_claims",
    {
      title: "Verify candidate Islamic claims",
      description:
        "Run source eligibility, quotation integrity, applicability, and semantic-support checks. Only ENTAILED claims are publishable.",
      inputSchema: z.object({
        claims: z.array(ClaimSchema).min(1),
        evidence: z.array(EvidenceSchema).min(1),
        recognizedDisagreement: z.boolean().default(false),
      }),
      outputSchema: VerificationOutputSchema,
    },
    async ({ claims, evidence, recognizedDisagreement }) =>
      result({
        result: await runtime.verifyClaims(claims, evidence, recognizedDisagreement),
      }),
  );

  server.registerTool(
    "verify_quotation",
    {
      title: "Verify a quotation against an approved source",
      description:
        "Fetch an approved source URL and verify that the quoted wording is actually present and attributable to that source.",
      inputSchema: z.object({
        sourceId: z.string().min(1),
        url: z.url(),
        quotation: z.string().min(1),
      }),
      outputSchema: QuotationOutputSchema,
    },
    async ({ sourceId, url, quotation }) =>
      result(await runtime.verifyQuotation(sourceId, url, quotation)),
  );

  return server;
}
