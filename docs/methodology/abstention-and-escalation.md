# Abstention and Escalation

## Purpose

A trustworthy system must know when not to complete the final inferential step.

## Result states

The canonical result model should support at least:

```text
ANSWERED
PARTIALLY_ANSWERED
DISAGREEMENT
INSUFFICIENT_EVIDENCE
SCHOLAR_REQUIRED
```

Exact names may change, but the distinctions must survive.

## Insufficient evidence

Use when the system cannot retrieve enough permitted evidence to support the requested claim.

The response should state what was found and what remains unsupported where useful.

## Scholar required

Use when:

- the general rule is retrievable but applying it to the user's circumstances requires qualified judgment;
- material facts are missing or contested;
- recognized evidence conflicts in a way the active policy cannot resolve;
- the question falls into a policy-defined high-risk category;
- the required inferential step would exceed the plugin's authority boundary.

## Personal applicability

The system may provide sourced general rules and positions.

Personal applicability is a separate substantive claim. The system may state that a rule applies to the user's circumstances only when permitted retrieved evidence directly establishes the relevant mapping.

A general source about illness, hardship, travel, necessity, fear, incapacity, or another exception does not authorize the model to decide that the user's described condition satisfies that exception.

When the mapping is not directly established:

1. present the sourced general rule and exact evidence;
2. name the unresolved applicability question without answering it;
3. return `SCHOLAR_REQUIRED`.

## Clarification questions

Clarification is evidence-driven, not a model-created juristic interview.

A clarification question is permitted only after retrieval when a source itself distinguishes factual states that materially control the answer. The question may collect that factual distinction.

The model must not invent a new legal threshold, severity scale, exception test, or recommendation and then question the user against it.

If resolving the facts would still require qualified juristic judgment, stop at `SCHOLAR_REQUIRED`.

## No disclaimer spam

Abstention and escalation are structured product states, not generic disclaimers attached to every answer.

Straightforward, well-supported questions should receive direct useful answers.
