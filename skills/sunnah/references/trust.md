# Trust and Publication

For every substantive Islamic claim:

1. Retrieve evidence from an approved source or canonical tool.
2. Keep evidence provenance and source identity intact.
3. Build the candidate claim with the exact evidence IDs that support it.
4. Call `verify_claims`.
5. Publish only claims returned as publishable/entailed.

Do not reinterpret `PARTIAL`, `CONTRADICTED`, or `NOT_SUPPORTED` as permission to answer anyway.

Result-state behavior:

- `ANSWERED`: answer directly from publishable claims.
- `PARTIALLY_ANSWERED`: answer only the supported part and state the missing part.
- `DISAGREEMENT`: present positions with attribution.
- `INSUFFICIENT_EVIDENCE`: explain what could not be established.
- `SCHOLAR_REQUIRED`: provide supported general information, then state which personal/applicability judgment remains for a qualified scholar.

Never use a numeric "religious confidence" score.

Arabic source text and generated translation are distinct. Do not put generated wording in quotation marks as if it were retrieved source text.
