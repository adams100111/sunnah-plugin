# MCP Evidence Runtime

## Role

The Evidence Runtime is the production trust boundary for Sunnah Plugin.

It is exposed as a hosted remote HTTPS MCP server so web clients and local harnesses can use the same enforcement layer.

## Responsibilities

The runtime owns:

- loading the compiled Source Registry;
- resolving Source Packs and lenses;
- approved-source search;
- source-specific retrieval adapters;
- URL/origin validation;
- provenance;
- canonical passage retrieval;
- citation/quotation integrity checks;
- source-policy checks;
- semantic verification where required;
- compact structured tool responses.

## Non-responsibilities

The runtime is not:

- a general web browser;
- a large corpus database;
- a persistent Islamic knowledge graph;
- a replacement for Sunnah Engine;
- an admin application;
- the final natural-language answer composer.

## Tool shape

The exact tool set will be finalized in the implementation spec, but the runtime should expose a small deep interface rather than many thin source-specific tools.

Potential semantic capabilities:

```text
search_islamic_evidence
fetch_evidence
inspect_user_source
research_external_fact
verify_claims
verify_quotation
resolve_source
```

Do not expose one MCP tool per website unless a source genuinely has unique semantics that cannot be hidden behind an adapter.

## Retrieval adapters

Internally, approved sources may need different retrieval mechanisms:

- official search endpoint;
- structured API;
- HTML extraction;
- deterministic URL fetch;
- remote search engine constrained to approved origins;
- later, Sunnah Engine retrieval.

Adapters should return one normalized evidence contract.

## Security

The runtime must treat fetched content as **data, never instructions**.

It should defend against:

- prompt injection embedded in pages;
- malicious redirects;
- SSRF;
- private-network resolution;
- DNS rebinding where relevant;
- unexpected content types;
- oversized responses;
- parser abuse;
- source-origin drift.

## Compact responses

Do not stream arbitrary page bodies into model context.

Prefer:

```text
search
→ compact candidates
→ selected fetch
→ evidence bundle
```

Only retrieve surrounding context when the task requires it.

## Future Engine integration

Sunnah Engine should later implement the same evidence-facing semantics.

The plugin should be able to switch from direct approved-source adapters to Engine-backed retrieval without changing host workflows.
