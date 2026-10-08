# English source-first example shape

Use this shape for substantive Islamic questions, including personal cases.

## Required behavior

- Retrieve approved Islamic Evidence first.
- For personal cases, if a retrieved source itself distinguishes factual states that control applicability, ask that source-driven clarification before showing the source blocks.
- Do not render fatwas or evidence blocks until that clarification is complete.
- After clarification, show the verified direct source locator and retrieved source-language passage before generated summary.
- Keep exact source text visibly separate from generated translation or paraphrase.
- Show each material Sunni position with its own evidence.
- Treat application to the user's circumstances as a separate substantive claim.
- State personal applicability only when retrieved evidence directly covers that application.
- Return `SCHOLAR_REQUIRED` when the evidence establishes a general rule but not the mapping to the user's case.

## Semantic shape after clarification

### Sources and retrieved passages

**Source:** [scholar/work/institution]  
**Direct locator:** [canonical URL or source identifier opened and verified to resolve to the same document]  
**Retrieved passage:** "[only text actually retrieved and safe to quote]"  
**Attribution level:** [direct statement / institutional fatwa / madhhab position / etc.]

Repeat for every material position.

### What the sources state

[Faithful generated summary of the displayed evidence. Add no missing Islamic proposition.]

### Recognized disagreement

[Only when directly evidenced. Do not synthesize a new middle position.]

### Applicability / limitation

If retrieved evidence directly covers the user's facts, summarize that source-backed application.

Otherwise:

**SCHOLAR_REQUIRED:** [state the unresolved applicability point without deciding it.]

Generated English translation must be labeled as generated translation and must never replace the original source text in provenance.
