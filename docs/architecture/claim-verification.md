# Claim Verification

## Goal

The plugin must distinguish between:

```text
a source exists
```

and:

```text
the source supports this claim
```

## Candidate claims

After grounded synthesis, substantive propositions should be represented as candidate claims.

Conceptually:

```json
{
  "id": "cl_7",
  "text": "...",
  "evidence_ids": ["ev_12"],
  "claim_class": "scholar-position"
}
```

## Verification layers

### Deterministic verification

Use deterministic checks for:

- evidence ID exists;
- source is active;
- source class is allowed;
- canonical URL/origin matches;
- quoted text occurs in retrieved canonical passage;
- required fields/provenance exist;
- selected lens allows the source.

### Semantic verification

Use semantic verification for:

- paraphrase entailment;
- whether a summary proposition is fully supported;
- whether qualifications were lost;
- whether comparison wording overstates evidence;
- whether a conclusion contradicts cited passages.

## Independent verifier

When semantic verification is required, the production path should use a verification path independent from the composition pass.

The verifier may return states such as:

```text
ENTAILED
PARTIAL
CONTRADICTED
NOT_SUPPORTED
```

The exact enum is an implementation detail; policy behavior is not.

## Publication behavior

- `ENTAILED` may publish.
- `PARTIAL` must be narrowed, qualified, or omitted.
- `CONTRADICTED` must not publish as written.
- `NOT_SUPPORTED` must not publish.

The host model cannot override this result by claiming confidence.

## Verification is not truth scoring

Do not expose a pseudo-precise religious confidence number such as `0.94`.

Prefer explicit dimensions and states:

- evidence coverage;
- authority class;
- support status;
- unresolved disagreement;
- applicability status.


## Deployment modes

The runtime deliberately separates the Publication Gate from any one model provider.

### Conservative mode

When `SUNNAH_VERIFIER_URL` is not configured, the runtime uses the built-in conservative verifier. It only marks a claim `ENTAILED` when the normalized claim text is directly present in its cited evidence.

This mode is useful for:

- exact quotations;
- deterministic source assertions;
- reproducible local tests;
- fail-closed operation when no semantic verifier is deployed.

It intentionally blocks ordinary paraphrase/synthesis that cannot be proven by direct containment.

### Independent semantic-verifier mode

For production-quality paraphrase, summarization, and multi-source synthesis, deploy an independent verifier service and set:

```text
SUNNAH_VERIFIER_URL=https://VERIFIER/verify
SUNNAH_VERIFIER_TOKEN=...
```

The runtime sends an HTTP POST with:

```json
{
  "claim": { "...": "ClaimSchema" },
  "evidence": [{ "...": "EvidenceSchema" }]
}
```

The verifier response must satisfy `ClaimVerificationSchema` and return one of the support states documented above.

The verifier is independent from the host answer-composition pass. If it fails, times out upstream, returns a malformed object, or cannot establish support, the Publication Gate fails closed.

Sunnah Plugin does not require a specific commercial model or provider for this service. A future Sunnah Engine verifier can implement the same contract.
