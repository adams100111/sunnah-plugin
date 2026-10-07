# Retrieval

## Goal

Retrieve the smallest sufficient set of permitted evidence for the task without turning the plugin into a general-purpose web browser or a miniature Sunnah Engine.

## Two evidence universes

```text
Islamic authority retrieval
        +
external factual research
```

These paths remain distinct even when one answer needs both.

## Islamic authority retrieval

The runtime searches only origins and document classes permitted by the active Source Registry, Source Packs, domain policy, and lens.

Retrieval may use different mechanisms per source:

- official API;
- structured endpoint;
- source-native search;
- constrained web search;
- deterministic URL lookup;
- HTML extraction;
- later Sunnah Engine query.

All adapters normalize into the same evidence contract.

## External factual research

External factual research may use broader current sources when the question requires contemporary facts.

Its results remain typed as external factual evidence and cannot directly establish an Islamic ruling.

## Progressive retrieval

Prefer:

```text
query
→ compact candidates
→ rerank/filter
→ fetch selected passages
→ Evidence Bundle
```

Do not push full result pages or large source documents into model context by default.

## Query decomposition

The host model may create multiple retrieval queries when a question contains distinct claims or domains.

The runtime still applies policy independently to every query/result.

## Exact lookup

When the request contains a stable identifier, prefer deterministic lookup over semantic retrieval.

Examples:

- Qur'an surah/ayah;
- known fatwa identifier;
- known hadith/source identifier;
- configured canonical URL.

## Retrieval failure

Retrieval failure is not permission to answer from parametric memory.

The workflow should try policy-approved fallbacks and then return insufficiency or escalation.

## Caching

Lightweight disposable caches may be introduced for:

- source fetches;
- normalized extraction;
- search results;
- verifier results.

Cache does not create authority and may be discarded at any time.

Persistent verified knowledge remains Sunnah Engine territory.
