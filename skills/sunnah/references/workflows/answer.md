# Sourced Answer Workflow

1. Identify the Islamic domain and any explicit lens.
2. Retrieve the minimum sufficient approved evidence.
3. Prefer deterministic exact lookup when an identifier is known.
4. Keep the exact relevant evidence passage and direct locator for rendering.
5. Compose candidate summaries from that evidence only.
6. In Full mode, verify all substantive generated claims with `verify_claims`.
7. Render the evidence first, then the generated summary, according to `../output.md`.

If recognized disagreement becomes material, switch to the comparison workflow.

If the question asks what the user personally should do:

1. treat applicability as a separate claim;
2. search for approved evidence that directly covers the relevant facts;
3. if direct applicability is established, show that evidence before summarizing it;
4. if only a general rule is established, show that rule and return `SCHOLAR_REQUIRED`;
5. ask a clarification question only when retrieved evidence itself defines the factual distinction being asked about.

Never bridge a general rule to the user's case through model-generated fiqh reasoning.
