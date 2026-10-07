# Evaluation Strategy

## Goal

Sunnah Plugin is not production-ready merely because its tools run.

The eval suite must measure whether the system selects appropriate evidence, preserves scholarly distinctions, verifies claims correctly, and stops when it should.

## Evaluation layers

### Deterministic unit tests

Cover YAML parsing, schema validation, semantic validation, registry resolution, Source Pack expansion, URL/origin rules, claim-policy eligibility, quotation integrity, and result-state transitions.

### MCP contract tests

Cover tool input/output validation, stable evidence identity, error behavior, timeout/failure semantics, and trust-boundary shape.

### Retrieval fixtures

Use known approved-source fixtures to test exact lookup, constrained source search, passage extraction, attribution, language handling, and document-class filtering.

### Islamic behavior evals

Test end-to-end scenarios for Qur'an, hadith, tafsir, fiqh, comparative madhhab questions, aqeedah, seerah/history, fatwa, user-source verification, and contemporary external-fact questions.

### Publication-gate evals

Verify that unsupported claims are removed or narrowed, partial support is not rendered as full certainty, contradictory evidence blocks the claim, citations point to retrieved evidence, and quotations match retrieved text.

### Source-governance evals

Test whether the system selected the right kind of source. Examples include a fiqh conclusion supported only by history material, a hadith-grading claim supported only by a generic article, a current institutional question missing its configured official source, or user material accidentally gaining authority.

### Cross-host evals

The same semantic scenarios should run against supported host adapters to detect behavior drift between Claude, OpenAI, Gemini, and generic harnesses.

## Languages

Arabic and English are first-class eval dimensions.

Include Arabic-to-Arabic, English-to-English, mixed-language, Arabic-source-to-English-explanation, and canonical Arabic quotation preservation cases.

## Golden cases

Maintain a carefully reviewed set of stable examples that represent expected behavior.

Golden cases complement, rather than replace, broader adversarial and property-style testing.

## Human review

High-value eval cases should eventually receive qualified scholarly review.

The plugin may begin with carefully source-grounded fixtures, but broad claims of religious correctness should not rest solely on automated scores.

## Release gate

A release requires deterministic tests, MCP contracts, critical trust evals, adversarial security tests, and supported-host smoke tests to pass.

Numeric thresholds should be introduced from measured baseline data rather than invented before the first eval dataset exists.
