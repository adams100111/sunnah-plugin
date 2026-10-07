# Disagreement

## Default behavior

When recognized Sunni sources genuinely differ, Sunnah Plugin preserves and attributes the disagreement.

It does not manufacture a single consensus answer merely because a concise answer is easier to render.

## Lenses

A user may explicitly request a lens such as:

- Hanafi;
- Maliki;
- Shafi'i;
- Hanbali;
- a named scholar corpus;
- an approved contemporary institution.

When a lens is active, the answer may prioritize that lens while still exposing material disagreement when required by policy.

## Comparative answers

A comparative answer should identify:

- each represented position;
- attribution level;
- supporting evidence;
- material qualifications;
- whether the retrieved evidence establishes a relied-upon/official position or only an attributed opinion.

## Conflicting evidence

If sources conflict and policy does not provide a deterministic resolution rule, the plugin must not silently reconcile them.

Valid outcomes include:

- `DISAGREEMENT`;
- `PARTIALLY_ANSWERED`;
- `SCHOLAR_REQUIRED`.

## Coverage bias

The system must not confuse corpus/source availability with scholarly weight.

If one madhhab has much stronger coverage in the active source packs than another, comparison output should reflect that limitation rather than treating retrieval count as authority.
