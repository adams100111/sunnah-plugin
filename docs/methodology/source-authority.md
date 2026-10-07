# Source Authority

## Purpose

Sunnah Plugin uses an explicit source authority model so retrieval quality and religious authority are not confused.

Semantic similarity answers "is this text relevant?" It does not answer "is this source allowed to establish this claim?"

## Initial source classes

The initial model distinguishes at least:

```text
CANONICAL
OFFICIAL_INSTITUTION
APPROVED_SCHOLAR_CORPUS
APPROVED_SCHOLARLY_SECONDARY
HISTORICAL_REPORT
EXTERNAL_FACTUAL
USER_SUPPLIED_UNTRUSTED
OPEN_WEB_DISCOVERY
```

These names may evolve before implementation, but the semantic distinctions are required.

## Meaning

### CANONICAL

Canonical religious text or canonical structured source material approved for exact rendering or authoritative lookup within its domain.

### OFFICIAL_INSTITUTION

Material published by an approved Islamic institution through an approved origin and document class.

### APPROVED_SCHOLAR_CORPUS

Material directly attributable to an approved scholar through an approved corpus/origin.

### APPROVED_SCHOLARLY_SECONDARY

Reviewed scholarly material useful for explanation, indexing, comparison, or context, subject to domain policy.

### HISTORICAL_REPORT

Narrative/historical material whose evidentiary role is explicitly narrower than canonical or legal authority.

### EXTERNAL_FACTUAL

Non-Islamic authority used to establish contemporary facts such as product mechanics, medicine, regulation, technology, or contractual behavior.

### USER_SUPPLIED_UNTRUSTED

Material supplied by the user that may be summarized or checked but does not automatically support Islamic claims.

### OPEN_WEB_DISCOVERY

Material discovered outside the approved registry. It may help locate candidate sources or external facts but is not Islamic authority by default.

## Registry governance

Authority classification is controlled by the Git-versioned Source Registry.

Users and host models may narrow the active source scope. They may not promote arbitrary material into trusted authority.

## Domain/path granularity

Approval is not only domain-level.

A source definition may constrain:

- hostname/origin;
- path patterns;
- document types;
- publisher/institution;
- scholar identity;
- language;
- translation status;
- content class;
- allowed claim capabilities.

A trusted host may contain content that is not authoritative for every task.

## No automatic authority promotion

Automation may:

- discover;
- fetch;
- fingerprint;
- classify;
- suggest registry changes.

It may not promote a new Islamic authority source solely from model judgment.

Promotion occurs through repository review and policy validation.
