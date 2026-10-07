# Sourced Answer Workflow

1. Identify the Islamic domain and any explicit lens.
2. Retrieve the minimum sufficient approved evidence.
3. Prefer deterministic exact lookup when an identifier is known.
4. Compose candidate claims from that evidence only.
5. Verify all substantive claims with `verify_claims`.
6. Render only publishable claims.

If recognized disagreement becomes material, switch to the comparison workflow.

If the question asks what the user personally should do and applicability is not established by the sources, return the supported general rule and `SCHOLAR_REQUIRED`.
