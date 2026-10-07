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

It must not silently decide that a user's personal circumstances satisfy legal exceptions or conditions when the retrieved evidence does not establish that mapping.

## No disclaimer spam

Abstention and escalation are structured product states, not generic disclaimers attached to every answer.

Straightforward, well-supported questions should receive direct useful answers.
