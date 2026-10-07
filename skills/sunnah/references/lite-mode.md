# Lite Mode

Lite mode exists so the Sunnah Skill remains useful when the Sunnah MCP server is unavailable.

Lite mode is **not equivalent to Full mode**. It does not have the deterministic server-side Source Registry, source-pack enforcement, or Publication Gate.

## Preconditions

Use Lite mode only when the host provides a retrieval capability such as web search, URL fetch, or attached-file reading.

If the host cannot retrieve evidence, do not answer substantive Islamic claims from model memory.

## Source restriction

Prefer original/official origins represented by the Sunnah source catalog.

High-value examples include:

- Qur'an Foundation / King Fahd Qur'an Complex for Qur'an-related source material;
- Saudi General Presidency of Islamic Research and Ifta;
- official Ibn Baz and Ibn Uthaymeen corpora;
- International Islamic Fiqh Academy;
- Muslim World League Islamic Fiqh Council;
- Egypt Dar al-Ifta;
- Al-Azhar Global Fatwa Center;
- Dorar al-Sunniyyah as scholarly/reference evidence;
- named primary works for the Hanafi, Maliki, Shafi'i, and Hanbali schools through a verifiable digital edition.

Do not promote mirrors, anonymous sites, forum posts, social-media snippets, or arbitrary search results into Islamic authority.

## Answer rule

For every substantive Islamic proposition:

1. retrieve the exact source page/document, not merely a search result or source domain;
2. identify who or what actually states the proposition;
3. show a direct canonical URL or source locator;
4. show the relevant retrieved passage when quotation integrity permits;
5. only then faithfully summarize, translate, compare, or organize it;
6. keep generated wording no broader than the retrieved evidence;
7. preserve material disagreement with evidence per position;
8. distinguish a named work/scholar statement from a madhhab-level or institutional position.

A favicon, domain label, generic source card, or search-result citation is not sufficient evidence presentation.

Follow `output.md` for the visible answer structure.

Do not say or imply that `verify_claims` or the Sunnah Publication Gate ran.

## Canonical quotations

Do not reproduce Qur'anic or hadith source text from memory.

Only quote canonical text that was actually retrieved from a trustworthy source in the current task.

## Personal applicability

A general ruling and its application to the user's facts are separate propositions.

State personal applicability only when the retrieved approved source directly covers the relevant facts or directly establishes the mapping.

Do not infer that tiredness is illness, inconvenience is hardship, risk is necessity, or any other user fact satisfies a juristic exception merely from a general rule.

If the source establishes only the general rule:

1. show its direct source locator and relevant retrieved passage;
2. summarize that general rule faithfully;
3. identify the unresolved personal applicability point;
4. return `SCHOLAR_REQUIRED`.

Ask a clarification question only when a retrieved source itself distinguishes factual states that control the answer. Do not create a model-derived legal threshold and interview the user against it.

## Transition to Full mode

If Sunnah MCP becomes available during the session, prefer Full mode for subsequent substantive work and use the server-side verification path.
