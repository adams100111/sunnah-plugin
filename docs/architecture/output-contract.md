# Output Contract

## Goal

The core result must be host-independent even when Claude, ChatGPT, Gemini, CLI, and API clients render it differently.

## Canonical result concepts

A result should represent:

- status;
- active domains;
- active lenses;
- answer content or renderable sections;
- claims;
- evidence references;
- disagreements;
- limitations;
- applicability/escalation state.

Conceptually:

```json
{
  "status": "ANSWERED",
  "domains": ["fiqh"],
  "lenses": [],
  "claims": [
    {
      "id": "cl_1",
      "text": "...",
      "evidence_ids": ["ev_4"],
      "support": "ENTAILED"
    }
  ],
  "disagreements": [],
  "limitations": []
}
```

This is illustrative, not the final wire schema.

## Result states

Required semantic states include:

```text
ANSWERED
PARTIALLY_ANSWERED
DISAGREEMENT
INSUFFICIENT_EVIDENCE
SCHOLAR_REQUIRED
```

## Source-first publication

A substantive Islamic answer is evidence-first, not citation-after-the-fact.

The semantic order is:

```text
source identity + direct locator
        ↓
exact relevant retrieved passage
        ↓
attribution level
        ↓
generated summary / translation / comparison
```

Generated language is presentation of Islamic Evidence. It is not an alternate origin for Islamic knowledge.

A host must not lead with a model-generated religious conclusion and then attach a source merely because the source is topically related.

## Claim-level evidence

Substantive Islamic claims reference evidence IDs, and the user-facing answer exposes the supporting evidence.

For each material position, the rendered answer should preserve:

- source/work/scholar/institution identity;
- direct canonical URL or source locator;
- relevant retrieved source-language passage when quotation integrity permits;
- attribution level;
- generated summary or translation as a distinct layer.

A domain name, favicon, generic source card, or search result is not a substitute for a direct source locator and the relevant retrieved material.

Host presentation may vary, but evidence must remain visibly upstream of generated Islamic summaries.

## Personal applicability

A general rule and its application to a user's circumstances are separate claims.

The plugin may state personal applicability only when permitted retrieved evidence directly establishes the relevant mapping. If the evidence establishes the general rule but the final application requires juristic judgment, the result is `SCHOLAR_REQUIRED`.

A model-generated inference cannot fill the applicability gap.

## Arabic and English

Arabic and English are first-class.

The contract must preserve:

- original-language source text;
- language metadata;
- generated translation separately from canonical source text;
- canonical Arabic for Qur'an/hadith where configured.

## No fake confidence

Do not expose a single religious truth probability.

Use explicit support and limitation fields instead.
