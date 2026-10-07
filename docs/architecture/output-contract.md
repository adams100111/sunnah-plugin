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

## Claim-level evidence

Substantive Islamic claims reference evidence IDs.

The host adapter may render these as:

- inline citations;
- footnotes;
- source cards;
- expandable evidence;
- numbered links.

Presentation changes; evidence identity does not.

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
