# Qur'an Domain

## Responsibility

The Qur'an procedure handles canonical verse lookup, discovery, and source-grounded explanation workflows.

## Canonical text

Qur'anic Arabic displayed as source text must come from an approved canonical source representation.

Do not regenerate Qur'anic Arabic from model memory and present it as canonical.

## Retrieval

Support two different operations:

- **deterministic lookup** when surah/ayah is known;
- **discovery/search** when the user is looking for a verse by concept or wording.

Discovery may use lexical or semantic search, but final verse identity and text must resolve to canonical data.

## Translation

Translations are distinct from canonical Arabic.

A translation should carry:

- translator/source identity when retrieved from an approved translation;
- generated-translation status if produced by the model.

Generated translation must not be presented as a canonical published translation.

## Tafsir boundary

A verse lookup is not itself tafsir.

Interpretive claims require approved tafsir or other permitted explanatory evidence according to the active workflow.

## Citation

Prefer stable verse identifiers such as `2:255` or `18:60`, with source metadata handled by the evidence contract.
