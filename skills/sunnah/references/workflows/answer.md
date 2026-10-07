# Sourced Answer Workflow

1. Identify the Islamic domain and any explicit lens.
2. Retrieve the minimum sufficient approved evidence.
3. Prefer deterministic exact lookup when an identifier is known.
4. Keep the exact relevant evidence passage and direct locator for rendering.
5. Compose candidate summaries from that evidence only.
6. In Full mode, verify all substantive generated claims with `verify_claims`.
7. Render the evidence first, then the generated summary, according to `../output.md`.

If recognized disagreement becomes material, switch to the comparison workflow.

If the question asks what the user personally should do and applicability is not established by the sources, return the supported general rule and `SCHOLAR_REQUIRED`.
