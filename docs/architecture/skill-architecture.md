# Skill Architecture

## One public skill

Sunnah Plugin exposes one canonical user-facing skill:

```text
sunnah
```

Do not begin with separate public skills for fiqh, hadith, tafsir, seerah, scholars, or madhhabs.

Overlapping public skills create routing ambiguity and unnecessary discovery context.

## Progressive disclosure

The root `SKILL.md` should remain compact.

It should contain:

- activation description;
- core non-negotiable invariants;
- task routing;
- domain routing;
- references to load;
- MCP/tool usage expectations;
- final output requirements.

Detailed procedures live in supporting references.

Conceptual layout:

```text
skills/sunnah/
├── SKILL.md
├── references/
│   ├── methodology/
│   ├── domains/
│   └── workflows/
└── examples/
```

## Task procedures

Potential workflows include:

- answer;
- summarize;
- research;
- verify-claim;
- verify-quote;
- compare;
- inspect-user-source.

These are internal procedures, not separate marketplace skills.

## Domain procedures

Potential domains include:

- Qur'an;
- hadith;
- tafsir;
- fiqh;
- aqeedah;
- seerah;
- history;
- fatwa.

Only procedures relevant to the current question should enter model context.

## Skill vs runtime

The skill answers:

> What workflow should the agent follow?

The runtime answers:

> What evidence can the agent access, and what is allowed to pass?

Never use the skill as the sole enforcement layer for source authority or claim publication.

## Prompt design

Prefer explicit invariant language:

```text
MUST use permitted retrieved evidence for substantive Islamic claims.
MUST NOT rely on parametric memory as Islamic authority.
MUST preserve recognized disagreement.
MUST stop when publication policy fails.
```

Avoid long chain-of-thought prescriptions, artificial multi-agent rituals, and excessive step-by-step reasoning instructions.

Constrain inputs, evidence, permissions, and outputs; let capable host models reason within those boundaries.
