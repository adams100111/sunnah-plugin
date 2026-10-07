# Source Admission and Review

## Goal

Keep source authority explicit and reviewable without building a source-management application inside Sunnah Plugin.

## Repository-native process

A new authority source moves through ordinary Git work:

```text
research/discovery
    ↓
proposed Source Registry change
    ↓
validation
    ↓
pull request
    ↓
review
    ↓
merge to main
    ↓
active registry state
```

These are repository states, not records in an application workflow database.

## Admission questions

A source proposal should answer, as applicable:

- Who owns or publishes the source?
- Is the attribution verifiable?
- Is this the original/official origin or a mirror?
- What document classes on this origin are in scope?
- Which Islamic domains can this source support?
- Which claim classes can it support?
- Is it primary, institutional, scholar-authored, secondary, or historical?
- What languages and translations are present?
- Are translations official, attributed, or generated?
- Are there user-generated areas that must be excluded?
- Is current/freshness behavior relevant?
- What retrieval mechanism is reliable?
- What known limitations should policy preserve?

## Review responsibility

The repository does not need an RBAC/admin-role system for source admission.

GitHub review permissions are sufficient technically.

However, a change that assigns religious authority or methodology semantics should receive appropriate qualified review before merge when that classification is not merely a mechanical fact.

Technical maintainers may validate origin, extraction, schema, and security without pretending those checks alone settle scholarly authority.

## No automatic promotion

Automation may prepare a source proposal and evidence for review.

It may not merge a new Islamic authority classification solely because an LLM considered the source reliable.

## Coverage discipline

New sources should be evaluated for how they affect coverage.

Do not expand one lens merely because it is easy to scrape while leaving the product to imply balanced Sunni coverage.

The CLI/eval tooling should make major coverage gaps visible.

## Removal or downgrade

A source can be removed or downgraded through the same Git review process.

The plugin's own lightweight caches are disposable and should respect the new registry state after deployment.

Deep dependency invalidation of persistent derived Islamic knowledge belongs to Sunnah Engine.
