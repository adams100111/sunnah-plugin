# Sourced Answer Workflow

1. Identify the Islamic domain and any explicit lens.
2. Retrieve the minimum sufficient approved evidence.
3. Prefer deterministic exact lookup when an identifier is known.
4. Keep the exact relevant evidence passage and verified direct locator for rendering.
5. Compose candidate summaries from that evidence only.
6. In Full mode, verify all substantive generated claims with `verify_claims`.
7. Render the evidence first, then the generated summary, according to `../output.md`.

If recognized disagreement becomes material, switch to the comparison workflow.

If the question asks what the user personally should do:

1. treat applicability as a separate claim;
2. retrieve approved evidence privately before asking the user further questions;
3. if a retrieved source itself defines a factual distinction that directly controls applicability, ask only that source-driven clarification before rendering any source blocks;
4. after clarification, render only the source evidence relevant to the clarified facts, then summarize it;
5. if direct applicability is established, state only the source-backed application;
6. if only a general rule is established and no source-defined clarification resolves the gap, show that rule and return `SCHOLAR_REQUIRED`.

Never bridge a general rule to the user's case through model-generated fiqh reasoning.
