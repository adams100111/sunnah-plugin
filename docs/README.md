# Documentation

This directory contains the canonical product, methodology, architecture, distribution, data, testing, and roadmap documentation for Sunnah Plugin.

The repository README is intentionally an entry point. Detailed rules belong here so agents can load only the context relevant to their task.

## Documentation rules

1. Each concept has one canonical document.
2. Other documents link to canonical rules instead of copying them.
3. Islamic methodology and trust constraints outrank implementation convenience.
4. Distinguish target architecture from currently implemented behavior.
5. Do not encode religious authority rules only in prompts.
6. Host adapters may vary; the core trust contract may not.
7. Sunnah Plugin must not absorb Sunnah Engine responsibilities merely because a feature is convenient to add locally.
8. Record ADRs only for hard-to-reverse, surprising decisions reached through a real trade-off.

## Map

### Vision

- [Product Vision](vision/product-vision.md)
- [Scope](vision/scope.md)
- [Principles](vision/principles.md)

### Methodology

- [Islamic Methodology](methodology/islamic-methodology.md)
- [Four Madhhab Source Model](methodology/four-madhhabs.md)
- [Trust Model](methodology/trust-model.md)
- [Source Authority](methodology/source-authority.md)
- [Source Admission and Review](methodology/source-admission.md)
- [Evidence Policy](methodology/evidence-policy.md)
- [Attribution](methodology/attribution.md)
- [Disagreement](methodology/disagreement.md)
- [Abstention and Escalation](methodology/abstention-and-escalation.md)
- [External Facts](methodology/external-facts.md)

### Architecture

- [Overview](architecture/overview.md)
- [Technology](architecture/technology.md)
- [Portability](architecture/portability.md)
- [Skill Architecture](architecture/skill-architecture.md)
- [MCP Evidence Runtime](architecture/mcp-evidence-runtime.md)
- [Retrieval](architecture/retrieval.md)
- [Claim Verification and Semantic Verifier](architecture/claim-verification.md)
- [Source Registry](architecture/source-registry.md)
- [Source Packs](architecture/source-packs.md)
- [User-Provided Sources](architecture/user-sources.md)
- [Output Contract](architecture/output-contract.md)
- [Security](architecture/security.md)
- [Maintainer CLI](architecture/cli.md)
- [Sunnah Engine Boundary](architecture/sunnah-engine-boundary.md)
- [Source Studio](architecture/source-studio.md)

### Domains

- [Qur'an](domains/quran.md)
- [Hadith](domains/hadith.md)
- [Tafsir](domains/tafsir.md)
- [Fiqh](domains/fiqh.md)
- [Aqeedah](domains/aqeedah.md)
- [Seerah](domains/seerah.md)
- [History](domains/history.md)
- [Fatwa](domains/fatwa.md)

### Distribution

- [Distribution Overview](distribution/README.md)
- [Claude](distribution/claude.md)
- [ChatGPT and OpenAI](distribution/chatgpt-openai.md)
- [Gemini](distribution/gemini.md)
- [Generic Agent Skills and MCP Hosts](distribution/generic-agent-skills.md)

### Data

- [Repository Data Model](data/repository-data-model.md)
- [YAML Conventions](data/yaml-conventions.md)
- [Schemas](data/schemas.md)
- [Provenance](data/provenance.md)

### Testing

- [Evaluation Strategy](testing/eval-strategy.md)
- [Adversarial Tests](testing/adversarial-tests.md)
- [Cross-Harness Tests](testing/cross-harness-tests.md)
- [Marketplace Validation](testing/marketplace-validation.md)

### Roadmap

- [Stages](roadmap/stages.md)

### Agent workflow

- [Issue Tracker](agents/issue-tracker.md)
- [Domain Documentation](agents/domain.md)

### Architecture decisions

ADRs live under [adr/](adr/).
