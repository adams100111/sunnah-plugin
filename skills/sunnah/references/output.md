# Source-First Output Contract

For every substantive Islamic answer, the visible answer must be downstream of retrieved Islamic Evidence.

The semantic order is:

```text
SOURCE
→ EXACT RETRIEVED PASSAGE
→ ATTRIBUTION
→ GENERATED SUMMARY / TRANSLATION / COMPARISON
```

Never lead with a model-generated religious conclusion and attach citations afterward.

## Personal-case pre-render phase

When the user asks about their own circumstances and a retrieved source itself distinguishes factual states that control applicability:

1. retrieve relevant evidence privately before asking;
2. identify only the source-defined factual distinction that remains unresolved;
3. ask that clarification question before any user-visible source block;
4. do not render evidence blocks until clarification is complete;
5. after the clarification, render the applicable source evidence first and summarize it faithfully.

Do not reveal a fatwa dump before asking a source-driven clarification that is required to know which retrieved passage is relevant.

If resolving the facts still requires juristic judgment rather than a factual distinction explicitly defined by the retrieved source, do not continue interviewing the user. Render the sourced general material and return `SCHOLAR_REQUIRED`.

## Required answer shape

For a substantive answer that is ready to render, use this semantic order:

1. **Sources and retrieved passages** — one evidence block per material position.
2. **What the sources state** — faithful generated summary only after the evidence.
3. **Recognized disagreement** — only when material and directly evidenced.
4. **Applicability / limitation** — only when the user asks about a personal case or a limitation affects the answer.

Use natural headings in the user's language, but preserve this order. Do not place a generated ruling, recommendation, or personal conclusion before the evidence section.

## Evidence blocks

Before any generated summary of a substantive Islamic proposition, show the evidence that supports it.

Each evidence block must include:

- the source/work/scholar/institution identity;
- a direct canonical URL or source locator, not merely a domain name, favicon, or generic source card;
- the relevant retrieved passage in its source language when quotation integrity permits;
- the attribution level actually established by the evidence.

If exact quotation integrity cannot be established, do not invent a quotation. Show the source locator and describe the retrieved material without quotation marks.

## Generated language

Generated language may:

- faithfully summarize;
- faithfully translate;
- organize retrieved evidence;
- compare source-backed positions.

Generated language may not supply a missing Islamic proposition.

Keep generated wording visibly separate from exact source text. Never present generated Arabic, translation, paraphrase, or synthesis inside quotation marks as though it were retrieved source text.

## Attribution

A summary may say that a source states a proposition only when the retrieved evidence directly supports that attribution.

Treat personal application as a separate proposition. A source that states a general rule does not, by itself, support saying that the rule applies to the user's new facts.

Do not convert:

- a general principle into a scholar-specific answer to a new case;
- a statement by one scholar into a madhhab position;
- a school-level statement into a direct imam attribution;
- a model inference into an institutional fatwa.

When the evidence supports only a weaker attribution, render the weaker accurate attribution.

## Disagreement

For recognized disagreement, present each position with its own evidence block before comparing them.

Generated comparison may identify documented agreement or disagreement, but it may not create a synthetic middle position or rank positions without retrieved authority for that ranking.

## Personal applicability

Do not infer that a user's circumstances satisfy a legal condition, exception, excuse, necessity, hardship threshold, or similar juristic predicate unless retrieved evidence directly establishes that mapping.

If the evidence establishes a general rule but not its application to the user's facts:

1. show the sourced general rule;
2. state the unresolved applicability point;
3. return `SCHOLAR_REQUIRED`.

A clarification question is allowed only when a retrieved source itself distinguishes factual states that control applicability. The question collects the source-required fact; it does not create a new model-derived legal test.

## Result states

- `ANSWERED`: the requested proposition is directly source-supported.
- `PARTIALLY_ANSWERED`: publish only the source-supported portion.
- `DISAGREEMENT`: show each attributed position with its evidence.
- `INSUFFICIENT_EVIDENCE`: say what could not be established.
- `SCHOLAR_REQUIRED`: show the sourced general material and identify the personal/applicability judgment that remains outside the plugin's authority.

## Full and Lite modes

Full mode still runs the Publication Gate. Passing verification does not remove the requirement to show the supporting evidence to the user.

Lite mode cannot claim that `verify_claims` or the server-side Publication Gate ran. It must still follow this source-first rendering contract using host-native retrieval.
