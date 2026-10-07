# Roadmap

## Strategy

Sunnah Plugin is intended to be a real production capability from its first release, not a disposable MVP.

The roadmap stages implementation risk; it does not weaken the target trust model.

## Stage 0 — Documentation and specification

Finish the durable product contract: vision, scope, principles, methodology, trust, source authority, domain contracts, portability, source/data model, technology direction, security, eval strategy, glossary, and ADRs.

Exit by running Matt Pocock's `to-spec` workflow from the completed design.

## Stage 1 — First complete vertical implementation

Ship the smallest complete production architecture:

- portable Sunnah Skill;
- remote HTTPS MCP server;
- Git-native Source Registry;
- strict YAML plus schema/semantic validation;
- at least one meaningful approved source path;
- compact evidence objects;
- claim/publication gate;
- Arabic/English behavior;
- maintainer CLI;
- Claude/OpenAI/Gemini packaging foundations;
- unit, contract, security, and eval CI.

The source catalog may begin narrow, but the architecture and trust path must be real.

## Stage 2 — Source and domain breadth

Expand approved coverage and domain procedures across Qur'an, hadith, tafsir, fiqh, aqeedah, seerah/history, fatwa, the four madhhabs, and selected scholar/institution lenses.

Add coverage evals with each expansion.

## Stage 3 — Retrieval quality and verification depth

Improve source adapters, query decomposition, ranking/reranking, semantic verifier quality, Arabic retrieval, evidence sufficiency, latency, and disposable caching.

Do not trade trust constraints for recall.

## Stage 4 — Public marketplace hardening

Complete Claude Marketplace, ChatGPT/Codex directory, Gemini extension/gallery or equivalent supported distribution, cross-host automation, installation documentation, security review, and deployment documentation.

## Stage 5 — Source Studio if justified

Build Source Studio only if manual YAML/PR workflows become a real contributor bottleneck.

It remains a Git editor and proposal surface.

## Stage 6 — Sunnah Engine integration

Introduce Sunnah Engine as an evidence backend once its corpus/retrieval capabilities outperform or complement direct-source adapters.

Preserve the existing evidence-facing contract.

## Continuous requirements

Every stage maintains provenance, deterministic policy, claim-level grounding, no counterfactual scholar simulation, disagreement preservation, abstention/escalation, Arabic/English support, cross-host portability, and security/adversarial testing.
