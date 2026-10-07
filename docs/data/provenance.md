# Provenance

## Goal

Every evidence-backed result must retain enough provenance to identify where its supporting material came from and how it was classified.

## Evidence provenance

An evidence object should be able to identify:

- source ID;
- source registry revision;
- source class;
- origin/canonical URL;
- document identity;
- passage or location;
- language;
- retrieval time where relevant;
- relevant extraction/integrity metadata.

## User-source provenance

User-provided material remains identifiable as user-provided even after summarization or claim extraction.

Generation does not change provenance class.

## External factual provenance

External factual evidence remains distinguishable from Islamic authority evidence throughout the answer pipeline.

## Claim provenance

A claim references the evidence IDs that support it.

A final rendered citation is only a presentation of this relationship.

## Registry revision

The plugin does not require a database-backed source-version system.

A deterministic build/repository revision should be sufficient to identify which registry/policy state was active for a result.

## Future Engine integration

When Sunnah Engine supplies evidence, Engine provenance identifiers should be preserved through the plugin contract rather than flattened into a generic URL.

The plugin's evidence model should be capable of carrying stronger future provenance without breaking the host-facing workflow.
