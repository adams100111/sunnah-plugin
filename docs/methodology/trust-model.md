# Trust Model

## Goal

Sunnah Plugin must earn trust through evidence, provenance, verification, and appropriate abstention rather than through model confidence, model size, or authoritative tone.

## Core invariants

1. No substantive Islamic claim may be presented as established without permitted supporting evidence.
2. No fabricated citation.
3. No fabricated attribution.
4. No counterfactual scholar simulation.
5. No model-generated Qur'anic text presented as canonical.
6. No model-generated hadith text presented as canonical.
7. Legitimate Sunni disagreement must not be silently erased.
8. Different madhhab positions must not be collapsed without an explicit comparison policy.
9. Direct attribution must be distinguished from inferred or school-level positions.
10. User-provided content is not trusted merely because it was submitted.
11. Open-web material is not automatically Islamic authority.
12. Retrieval failure may result in abstention.
13. Evidence insufficiency may result in abstention.
14. High-risk questions may require qualified scholarly escalation.
15. Model output may not override deterministic policy.
16. Evidence provenance must survive through the final result.
17. Core trust guarantees must work on web hosts without local execution.
18. User-facing Islamic answers must expose supporting evidence before generated synthesis.
19. Generated language may summarize Islamic knowledge but may not supply a missing Islamic proposition or applicability judgment.

## Generated language vs generated knowledge

The product permits generated:

- summaries;
- explanations;
- comparisons;
- translations;
- educational organization;
- narrative presentation.

The model is not permitted to become the origin of the underlying Islamic claim.

```text
approved evidence
    ↓
candidate claims
    ↓
verification where available
    ↓
visible source evidence
    ↓
generated summary / translation / comparison
```

The source evidence remains visible in the final answer. A citation attached to a model-generated conclusion is not sufficient when the cited material does not directly establish that conclusion.

## Publication gate

A substantive Islamic claim must pass all applicable checks:

```text
evidence exists
    +
source class is allowed
    +
source identity/provenance is valid
    +
quotation/citation integrity passes
    +
claim is supported by the evidence
```

Exact canonical lookups may be verified deterministically.

Generated paraphrases, summaries, comparisons, or synthesis require semantic support verification.

## Independent verification

When semantic verification is required, the full production path uses a verifier path distinct from the composing pass.

Self-review by the composing model may be used as additional defense-in-depth but is not the final publication gate.

## Trust is multidimensional

Do not reduce source trust to one numeric score.

Relevant dimensions may include:

- textual authenticity;
- attribution confidence;
- edition/source integrity;
- institutional authority;
- juristic relevance;
- madhhab relevance;
- historical reliability;
- hadith grading status;
- methodology compatibility;
- freshness.

## Failure philosophy

A polished unsupported answer is worse than a transparent incomplete answer.

Prefer:

- explicit uncertainty over invented certainty;
- attributed disagreement over synthetic consensus;
- missing answer over fabricated evidence;
- qualified escalation over unsupported personal ruling.
