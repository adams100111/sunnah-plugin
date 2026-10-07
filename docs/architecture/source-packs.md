# Source Packs

## Purpose

A Source Pack is a named, versionable grouping of source definitions used to make policy and testing reproducible.

Examples:

```text
quran-core
hadith-core
saudi-official
ibn-baz-official
hanbali-core
```

These are conceptual names, not a finalized initial catalog.

## Why packs

Packs allow the system to express:

- which sources are active for a lens;
- which set an eval expects;
- which sources a deployment enables;
- which source group was used to produce an answer trace.

They are more stable and reviewable than arbitrary arrays of URLs embedded in prompts.

## Composition

A pack may reference approved source IDs and other allowed configuration, but must not redefine authority semantics that belong to the Source Registry or policy layer.

## Versioning

Git history provides the primary version history.

Where answer traces or releases require an explicit pack version, the build may emit a deterministic registry/pack revision identifier derived from the repository state.

Avoid inventing a separate mutable version database.

## Scope narrowing

A user or organization may select a narrower approved pack/lens.

They may not use pack configuration to promote an unapproved source class into Islamic authority.
