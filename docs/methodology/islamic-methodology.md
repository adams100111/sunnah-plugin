# Islamic Methodology

## Purpose

This document defines high-level methodological constraints for Sunnah Plugin.

It does not attempt to encode complete Islamic scholarship. Domain-specific rules live in the domain documents and may later be deepened through source-specific and madhhab-specific procedures.

## Foundational principle

Islamic disciplines are connected, but they are not interchangeable.

A domain procedure may provide qualified evidence or context to another procedure without assuming responsibility for conclusions outside its discipline.

Examples:

- hadith procedure may provide text, attribution, variants, grading metadata, and scholarly commentary;
- fiqh procedure determines legal use within the relevant juristic methodology;
- seerah procedure may provide historical context but must not automatically convert a historical report into legal proof;
- Arabic linguistic evidence may inform tafsir or fiqh without becoming the final interpretive or juristic conclusion.

## Distinct questions

The system should preserve distinctions between:

- What happened?
- Is the report authentically attributed?
- What does the text mean?
- How have scholars interpreted it?
- What legal ruling is transmitted?
- Which madhhab or scholar holds that position?
- Does the user's situation satisfy the conditions of that ruling?

These questions may participate in one execution graph, but they are not one undifferentiated reasoning task.

## Sunni disagreement

Recognized Sunni disagreement is represented explicitly.

The default system behavior is not to silently choose a Saudi, Hanbali, majority, or other position unless the user selected a lens or the question itself establishes the relevant institutional/methodological scope.

## Madhhabs

The four major Sunni madhhabs are methodology lenses:

- Hanafi;
- Maliki;
- Shafi'i;
- Hanbali.

The system must distinguish, where source material allows:

- statement directly attributed to an imam;
- narration from the imam;
- position within the madhhab;
- relied-upon position;
- later scholar preference.

These are not interchangeable claims.

## Scholars

A scholar lens means:

> retrieve and summarize positions actually established in that scholar's approved corpus.

It never means:

> predict what the scholar would probably say.

If no directly attributable position is found, the product states that no sufficiently attributable position was found in the active corpus/source scope.

## Hadith

Hadith collections are sources, not personalities.

The system should report attributed grading and recognized disagreement rather than creating its own unsourced authenticity judgment.

## Historical material

Narrative material should preserve evidence status, including distinctions such as:

- Qur'anic statement;
- authentic hadith;
- athar;
- disputed narration;
- early historical report;
- later historical report;
- Isra'iliyyat;
- scholarly interpretation.

Popular repetition does not promote a report's status.

## Minimal scholarly dependency graph

Only invoke the domains required by the question.

More procedures or more models do not imply a better answer.

The orchestration graph should follow the scholarly dependencies of the task rather than a fixed swarm topology.

## Methodology outside prompts

Where a methodological restriction can be represented deterministically, it belongs in runtime policy.

Skill instructions reinforce methodology but are not the sole trust boundary.
