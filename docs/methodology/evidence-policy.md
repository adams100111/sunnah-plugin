# Evidence Policy

## Purpose

Evidence policy determines whether retrieved material is permitted to support a particular claim.

Retrieval relevance and evidence eligibility are separate concerns.

## Evidence object

A compact evidence object should carry enough information to establish:

- evidence identity;
- source identity;
- document identity;
- source class;
- authority attribution;
- canonical URL or source locator;
- passage text;
- location within source where available;
- language;
- provenance/integrity metadata.

The host model should receive evidence objects rather than arbitrary HTML where practical.

## Claim classes

The exact taxonomy will be finalized in implementation, but policies should distinguish claim categories such as:

- canonical quotation;
- source attribution;
- scholar position;
- madhhab position;
- fatwa summary;
- hadith grading attribution;
- historical report;
- tafsir statement;
- comparative synthesis;
- external factual claim;
- practical applicability.

## Eligibility

Evidence is eligible only when:

1. the source is active under the current registry state;
2. the source class permits the claim type;
3. the requested lens/domain permits the source;
4. provenance checks pass;
5. the passage can be tied to the identified source/document;
6. any required freshness constraints pass.

## Exact text

Canonical Qur'anic text and canonical hadith/source quotations should come from retrieved approved data rather than model memory.

Displayed quotation integrity should be checked deterministically where possible.

## Summaries

A summary may contain generated language.

Each substantive proposition in that summary must map to supporting evidence.

The existence of a relevant source is not enough; the paraphrase must be semantically supported.

## Evidence sufficiency

The runtime or workflow should be able to conclude:

- sufficient;
- partially sufficient;
- conflicting;
- insufficient.

Insufficient evidence is a valid terminal state.

## User-provided documents

User-provided material may be:

- summarized;
- analyzed;
- claim-extracted;
- cross-checked.

Its claims do not gain authority through summarization.

```text
UNTRUSTED SOURCE
      ↓
generated summary
      ↓
UNTRUSTED-DERIVED CONTENT
```

## External facts

External factual evidence can establish facts about the world.

It cannot establish an Islamic ruling.

See [External Facts](external-facts.md).
