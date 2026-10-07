# Architecture Overview

## Goal

Sunnah Plugin is a portable agent capability with one shared trust model and multiple host packaging layers.

The architecture deliberately separates:

- workflow guidance;
- evidence access;
- policy enforcement;
- semantic verification;
- host rendering.

## Core flow

```text
User
  ↓
Host (Claude / ChatGPT / Gemini / compatible harness)
  ↓
Sunnah Skill
  ↓
task + domain routing
  ↓
Evidence Runtime (remote HTTPS MCP)
  ├── Source Registry
  ├── source policy
  ├── retrieval adapters
  ├── provenance
  ├── canonical-text retrieval
  ├── deterministic validation
  └── semantic verification
  ↓
Evidence Bundle
  ↓
host LLM composition
  ↓
candidate claims
  ↓
Publication Gate
  ↓
Grounded Answer
```

## Responsibilities

### Sunnah Skill

Defines:

- when the plugin should activate;
- task routing;
- domain routing;
- which references to load;
- when to call evidence tools;
- how to handle insufficiency/disagreement;
- the expected answer contract.

The skill does not determine source authority on its own.

### Evidence Runtime

Enforces:

- which source origins are permitted;
- which source classes may support which claim classes;
- provenance;
- canonical source retrieval;
- citation and quotation integrity;
- semantic claim-support verification where required;
- compact evidence responses.

### Host model

May:

- understand the user's request;
- decompose the task;
- select relevant tools;
- synthesize retrieved evidence;
- explain;
- compare;
- translate;
- compose the final natural-language answer.

It may not:

- invent source authority;
- bypass the registry;
- waive the publication gate;
- attribute unsupported positions;
- promote untrusted input.

## Minimal execution graph

The system should invoke only the procedures needed for the question.

Examples:

```text
Verify quotation
→ identify target attribution
→ search approved corpus
→ fetch passage
→ compare quotation
→ result
```

```text
Comparative fiqh
→ identify issue
→ activate requested/default lenses
→ retrieve each lens independently
→ compare evidence
→ preserve disagreement
→ publication gate
```

```text
Contemporary product question
→ external factual research
→ structure material facts
→ retrieve Islamic evidence
→ applicability check
→ answer or scholar-required
```

## No agent swarm requirement

"Agentic" does not imply many autonomous agents.

Technical roles may be implemented by:

- deterministic code;
- one shared model call;
- a separate verifier model;
- host-native reasoning;
- future specialized models.

Architecture is defined by responsibilities and trust boundaries, not process count.
