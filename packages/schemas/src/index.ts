import { z } from "zod";

export const SourceClassSchema = z.enum([
  "CANONICAL",
  "OFFICIAL_INSTITUTION",
  "APPROVED_SCHOLAR_CORPUS",
  "APPROVED_SCHOLARLY_SECONDARY",
  "HISTORICAL_REPORT",
  "EXTERNAL_FACTUAL",
  "USER_SUPPLIED_UNTRUSTED",
  "OPEN_WEB_DISCOVERY",
]);

export const ClaimClassSchema = z.enum([
  "canonical-quotation",
  "source-attribution",
  "scholar-position",
  "madhhab-position",
  "fatwa-summary",
  "hadith-grading",
  "historical-report",
  "tafsir-statement",
  "comparative-synthesis",
  "external-fact",
  "practical-applicability",
]);

export const RetrievalTypeSchema = z.enum(["quran-foundation", "http-html"]);

export const AuthoritySchema = z
  .object({
    type: z.enum(["canonical", "institution", "scholar", "secondary", "historical", "external"]),
    id: z.string().min(1),
    name: z.string().min(1),
  })
  .strict();

export const OriginSchema = z
  .object({
    host: z.string().min(1),
    paths: z.array(z.string().min(1)).min(1),
  })
  .strict();

export const RetrievalSchema = z
  .object({
    type: RetrievalTypeSchema,
    baseUrl: z.url().optional(),
  })
  .strict();

export const SourceDefinitionSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    sourceClass: SourceClassSchema,
    authority: AuthoritySchema,
    origins: z.array(OriginSchema).min(1),
    supports: z.array(ClaimClassSchema).min(1),
    domains: z
      .array(z.enum(["quran", "hadith", "tafsir", "fiqh", "aqeedah", "seerah", "history", "fatwa", "external"]))
      .min(1),
    languages: z.array(z.string().min(2)).min(1),
    status: z.enum(["active", "disabled"]).default("active"),
    retrieval: RetrievalSchema,
  })
  .strict();

export const RegistryIndexSchema = z
  .object({
    version: z.literal(1),
    sources: z.array(z.object({ path: z.string().min(1) }).strict()),
    packs: z.array(z.object({ path: z.string().min(1) }).strict()),
    sourceClassPolicy: z.string().min(1),
  })
  .strict();

export const SourcePackSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    description: z.string().min(1),
    sourceIds: z.array(z.string().min(1)).min(1),
  })
  .strict();

export const SourceClassPolicySchema = z
  .object({
    version: z.literal(1),
    classes: z.record(
      SourceClassSchema,
      z.object({ allows: z.array(ClaimClassSchema) }).strict(),
    ),
  })
  .strict();

export type ClaimClass = z.infer<typeof ClaimClassSchema>;
export type RegistryIndex = z.infer<typeof RegistryIndexSchema>;
export type SourceClassPolicy = z.infer<typeof SourceClassPolicySchema>;
export type SourceDefinition = z.infer<typeof SourceDefinitionSchema>;
export type SourcePack = z.infer<typeof SourcePackSchema>;
