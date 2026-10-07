# Product Vision

## Purpose

Sunnah Plugin is a portable Sunni Islamic knowledge capability for modern AI agents.

It exists to make general-purpose models useful for Islamic research and explanation without allowing model memory, arbitrary browsing, or polished language to masquerade as religious authority.

## Product thesis

LLMs are strong at understanding questions, decomposition, search assistance, comparison, summarization, translation, explanation, and natural-language composition.

They are not reliable independent sources of Islamic knowledge.

Sunnah Plugin therefore puts the LLM inside an evidence-controlled workflow rather than attempting to turn the LLM itself into a mufti or scholar.

## Standalone first, engine-ready later

Sunnah Plugin is independently useful.

It can retrieve and verify evidence from approved external sources through its own remote Evidence Runtime.

Sunnah Engine is a future optional backend that can provide a stronger internal corpus, structured scholarly data, and verified knowledge. The plugin should adopt that backend through the existing evidence contract rather than being rewritten.

## Intended users

The product should support:

- ordinary Muslims asking Islamic questions;
- users checking quotes, claims, hadith, or articles;
- students comparing recognized positions;
- researchers asking source-oriented questions;
- developers and organizations embedding the plugin into compatible agent hosts.

It is not designed to remove qualified scholars from questions that genuinely require qualified judgment.

## Product surfaces

The same capability should be installable through:

- Claude Web and Claude Code;
- ChatGPT Web and Codex;
- Gemini Web where custom remote MCP/skills are supported and Gemini CLI;
- compatible Agent Skills and MCP hosts.

Host-specific packaging is a distribution concern. Methodology, policies, schemas, and evidence behavior remain canonical.

## Success criteria

Sunnah Plugin succeeds when it can provide answers that are:

- useful without being timid;
- attributable;
- claim-grounded;
- explicit about disagreement;
- conservative about unsupported applicability;
- reproducible enough to audit;
- portable across major hosts;
- materially safer than a generic LLM asked the same question.

The product should make it easy to answer not only "what is the answer?" but also:

- where did it come from?
- why is this source allowed?
- who said it?
- what evidence supports this paraphrase?
- is this a madhhab position, a scholar statement, or an institutional fatwa?
- what remains unresolved?
