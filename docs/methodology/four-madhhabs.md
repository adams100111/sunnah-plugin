# Four Madhhab Source Model

## Purpose

Sunnah Plugin models the Hanafi, Maliki, Shafi'i, and Hanbali schools as **methodological lenses backed by attributable works**, not as model personalities.

## Primary-work identity

Classical fiqh works use `APPROVED_PRIMARY_WORK`.

The source record separates:

- logical work identity;
- author;
- madhhab;
- work kind;
- digital access provider;
- edition note;
- allowed origin/path.

The access provider is not promoted into juristic authority.

## Attribution levels

A retrieved passage may support:

1. **work attribution** — “Al-Marghinani states in *Al-Hidaya* …”
2. **author attribution** — when the text directly supports it;
3. **madhhab-context position** — when the work and passage establish that context;
4. **mu'tamad / relied-upon madhhab position** — only when the evidence explicitly establishes that stronger status.

The runtime/skill must not collapse (1)-(4).

## Baseline packs

- `madhhab-hanafi`
- `madhhab-maliki`
- `madhhab-shafii`
- `madhhab-hanbali`

The baseline works are documented in `SOURCES.md`.

## Cross-madhhab comparison

A comparative fiqh answer should retrieve each requested school independently, then compare attributed positions. Retrieval count must never act as a vote.

If one pack lacks sufficient evidence, report incomplete coverage instead of inferring the school position from another madhhab or from model memory.
