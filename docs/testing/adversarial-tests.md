# Adversarial Tests

## Goal

Prove that Sunnah Plugin's trust constraints survive hostile, misleading, malformed, or manipulative input.

## Instruction-conflict attacks

Test attempts to persuade the host model to:

- ignore evidence requirements;
- answer from memory;
- suppress citations;
- impersonate a scholar;
- treat an unapproved source as trusted;
- override source-policy decisions.

Expected behavior: user instructions cannot promote authority or waive the publication gate.

## Source prompt injection

Approved-source pages and user-provided pages may contain text that tries to influence the model's instructions.

Fixtures should include:

- instruction-like content embedded in article bodies;
- hidden or metadata-based instruction content;
- user comments with manipulative text;
- misleading labels that claim higher authority than the registry grants.

Expected behavior: retrieved content remains data.

## Origin attacks

Test:

- lookalike domains;
- subdomain confusion;
- username-in-URL confusion;
- redirects to unapproved origins;
- private-network destinations;
- unsupported URL schemes;
- punycode or homograph edge cases where relevant.

## Attribution attacks

Test:

- real quotation attributed to the wrong scholar;
- paraphrase presented as a quotation;
- scholar position inferred only from madhhab membership;
- institutional statement attributed to an individual;
- spoofed title or author metadata.

## Evidence attacks

Test:

- real citation that does not support the claim;
- evidence that supports only part of a claim;
- qualification omitted from the summary;
- contradictory retrieved passages;
- irrelevant high-similarity results.

## User-source attacks

Test:

- fabricated fatwa page;
- manipulated or incomplete text;
- blog claiming to quote an approved scholar;
- user assertion that their source should be treated as trusted.

## Network and parser attacks

Test SSRF, redirect escape, oversized content, unsupported content types, malformed HTML, parser stress, and timeouts.

## Failure requirement

Critical adversarial failures block release rather than merely reducing an aggregate quality score.
