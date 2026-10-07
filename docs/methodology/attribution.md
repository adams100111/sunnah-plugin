# Attribution

## Goal

Sunnah Plugin must preserve who said what and at what level of certainty.

## Direct vs derived attribution

The system must distinguish:

- direct quotation;
- direct attributed statement;
- faithful summary of an attributed statement;
- madhhab-level position;
- institutional fatwa;
- comparative synthesis created by the plugin.

These should not be rendered as equivalent.

## Scholar attribution

A scholar-specific statement is allowed only when evidence directly supports attribution to that scholar through an approved source path/corpus.

Do not infer a scholar's position merely because:

- it matches the scholar's madhhab;
- another scholar from the same school said it;
- it seems consistent with their known principles;
- the model considers it likely.

## Application is a separate attribution claim

A source that establishes a general rule does not automatically establish that the rule applies to a new user's circumstances.

The system must distinguish:

- what the source explicitly states;
- a faithful summary of that statement;
- the separate proposition that a user's facts satisfy the rule's conditions, exception, excuse, necessity, hardship threshold, or other juristic predicate.

The final application proposition may be attributed to a scholar, madhhab, work, or institution only when retrieved evidence directly supports that application.

Do not rewrite model inference as:

- "Shaykh X says your case is...";
- "the madhhab considers your situation...";
- "the institution permits/prohibits this case...";

unless the retrieved source actually establishes that proposition.

If only the general rule is established, preserve the weaker accurate attribution and use `SCHOLAR_REQUIRED` for the unresolved personal application.

## Madhhab attribution

Where possible distinguish:

- the imam's statement;
- transmitted narrations;
- positions within the school;
- relied-upon position;
- later preference or tarjih.

If the active evidence cannot establish the stronger attribution, use the weaker accurate attribution.

## Quotations

A quoted passage should be sourced from retrieved text.

If the product cannot validate a quotation against the source, it should render a paraphrase rather than presenting model-generated wording inside quotation marks.

## Translations

Generated translations must be labeled or represented as translations.

The original Arabic remains the source text when available.

A translation should never silently replace canonical Arabic in provenance.
