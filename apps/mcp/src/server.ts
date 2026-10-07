import { McpServer } from "@modelcontextprotocol/server";
import { ClaimSchema, EvidenceSchema, PublicationResultSchema } from "@sunnah/schemas";
import type { SunnahRuntime } from "@sunnah/runtime";
import { z } from "zod";

const EvidenceOutputSchema = z.object({ evidence: EvidenceSchema });
const VerificationOutputSchema = z.object({ result: PublicationResultSchema });
const QuotationOutputSchema = z.object({
  evidence: EvidenceSchema,
  result: PublicationResultSchema,
});
const UserSourceOutputSchema = z.object({
  provenance: z.enum(["APPROVED_REGISTERED", "USER_SUPPLIED_UNTRUSTED"]),
  registeredSourceId: z.string().optional(),
  evidence: EvidenceSchema,
});

function result<T extends object>(value: T) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(value) }],
    structuredContent: value as Record<string, unknown>,
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
      description: "Retrieve a specific Qur'an verse by chapter:verse key from the configured canonical source.",
      inputSchema: z.object({ verseKey: z.string().regex(/^\d{1,3}:\d{1,3}$/) }),
      outputSchema: EvidenceOutputSchema,
    },
    async ({ verseKey }) => result({ evidence: await runtime.getQuranVerse(verseKey) }),
  );

  server.registerTool(
    "fetch_islamic_evidence",
    {
      title: "Fetch approved Islamic evidence",
      description: "Fetch a specific HTTPS URL only when it matches an active approved source/path.",
      inputSchema: z.object({ sourceId: z.string().min(1), url: z.url() }),
      outputSchema: EvidenceOutputSchema,
    },
    async ({ sourceId, url }) => result({ evidence: await runtime.fetchIslamicEvidence(sourceId, url) }),
  );

  server.registerTool(
    "inspect_user_source",
    {
      title: "Inspect a user-provided source",
      description: "Safely fetch a user URL and classify it as registered approved evidence or untrusted user-supplied material.",
      inputSchema: z.object({ url: z.url() }),
      outputSchema: UserSourceOutputSchema,
    },
    async ({ url }) => result(await runtime.inspectUserSource(url)),
  );

  server.registerTool(
    "fetch_external_fact_source",
    {
      title: "Fetch external factual evidence",
      description: "Safely fetch a public HTTPS source as external factual evidence. This evidence cannot establish Islamic authority claims.",
      inputSchema: z.object({ url: z.url() }),
      outputSchema: EvidenceOutputSchema,
    },
    async ({ url }) => result({ evidence: await runtime.fetchExternalFactSource(url) }),
  );

  server.registerTool(
    "verify_claims",
    {
      title: "Verify candidate Islamic claims",
      description: "Run source eligibility, quotation integrity, applicability, and semantic-support checks.",
      inputSchema: z.object({
        claims: z.array(ClaimSchema).min(1),
        evidence: z.array(EvidenceSchema).min(1),
        recognizedDisagreement: z.boolean().default(false),
      }),
      outputSchema: VerificationOutputSchema,
    },
    async ({ claims, evidence, recognizedDisagreement }) =>
      result({ result: await runtime.verifyClaims(claims, evidence, recognizedDisagreement) }),
  );

  server.registerTool(
    "verify_quotation",
    {
      title: "Verify a quotation against an approved source",
      description: "Fetch an approved source URL and verify that the quoted wording is present and attributable.",
      inputSchema: z.object({
        sourceId: z.string().min(1),
        url: z.url(),
        quotation: z.string().min(1),
      }),
      outputSchema: QuotationOutputSchema,
    },
    async ({ sourceId, url, quotation }) => result(await runtime.verifyQuotation(sourceId, url, quotation)),
  );

  return server;
}
