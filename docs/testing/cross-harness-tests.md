# Cross-Harness Tests

## Purpose

The plugin's core semantics must not depend on one host model or packaging format.

## Test matrix

At release time, test supported versions and surfaces of Claude Web, Claude Code, ChatGPT Web, Codex, Gemini CLI, Gemini Web/custom integration where supported, and at least one generic Agent Skills/MCP path when practical.

## Shared scenarios

Use the same semantic fixtures across hosts:

- straightforward sourced answer;
- source retrieval failure;
- recognized disagreement;
- false quote verification;
- user-provided untrusted article;
- personalized ruling that requires escalation;
- Arabic question;
- mixed Arabic/English;
- hostile instructions embedded in retrieved content.

## Assertions

Assert semantic behavior rather than exact prose:

- correct result state;
- required evidence tools called;
- no unapproved source used;
- expected evidence IDs/source classes present;
- unsupported claim not published;
- disagreement preserved;
- escalation triggered when expected.

## Host-specific rendering

Do not fail tests because one host uses footnotes and another uses source cards.

Presentation adapters may differ as long as they preserve canonical evidence and result semantics.

## Degraded mode

If a host cannot access the remote Evidence Runtime, verify that it does not silently fall back to authoritative-looking parametric Islamic answers.
