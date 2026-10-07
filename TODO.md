# TODO

This is the live implementation and operations backlog. Items are ordered by trust impact and dependency, not by cosmetic priority.

## P0 — Source foundation

- [ ] Run a source-admission review for every entry added in the foundation catalog and record reviewer/decision metadata once the registry schema supports it.
- [ ] Implement source-specific search adapters for Al-Ifta Saudi, Ibn Uthaymeen, Dorar, IIFA, Muslim World League Fiqh Council, IslamQA, Islamweb, CBOS Sharia corpus, and other admitted searchable sources.
- [ ] Add extraction fixtures for every active source so layout drift cannot silently change evidence.
- [ ] Add live-source smoke tests that run separately from deterministic CI and never gate local unit tests on internet availability.
- [ ] Add source health/drift monitoring: DNS/origin, redirect, content type, selector/extractor quality, and unexpected login/challenge pages.
- [ ] Add registry metadata for jurisdiction, methodology/lens, document type, translation status, freshness expectations, and source review notes.
- [ ] Add per-source path classes instead of broad path scopes where a site exposes mixed-authority content.
- [ ] Add first-class PDF evidence extraction for official fatwa/books with page-level provenance.
- [ ] Add source-level rate/crawl policy and robots/licensing notes.

## P0 — Sudan source admission

- [ ] Locate and independently verify the current official web origin for the Sudan Islamic Fiqh Academy (مجمع الفقه الإسلامي السوداني); do not promote mirrors.
- [ ] Acquire and register official Sudan Islamic Fiqh Academy fatwa books/resolutions once provenance is verified.
- [ ] Verify the current official Ministry of Religious Affairs and Endowments publication origin and determine which document classes carry religious authority.
- [ ] Add Sudanese Maliki scholarly corpora only with attributable editions/origins.
- [ ] Add contemporary Sudanese zakat, waqf, family-law, Hajj, and Islamic-finance institutional sources where their legal/religious remit is explicit.
- [ ] Build a Sudan jurisdiction/profile document describing when Sudan-specific institutional evidence is relevant versus general Sunni evidence.

## P0 — Saudi source admission

- [ ] Add source-native search for the General Presidency of Islamic Research and Ifta / Permanent Committee.
- [ ] Audit and register current Senior Scholars Council publication paths separately from general presidency pages.
- [ ] Add source-native search for the Ibn Uthaymeen Foundation.
- [ ] Add King Fahd Qur'an Complex text/translation endpoints where stable machine-readable access is available.
- [ ] Evaluate current official channels for the Grand Mosque/Prophet's Mosque Presidency and Ministry of Islamic Affairs; register only document classes with clear scholarly authority.
- [ ] Add current official publications for the Saudi Fiqh Association where relevant and distinguish association-reviewed secondary content from state fatwa authority.

## P1 — General Sunni breadth

- [ ] Add canonical/edition-aware hadith collection adapters rather than treating general web pages as canonical hadith.
- [ ] Add Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah and major supporting collections with stable IDs and edition metadata.
- [ ] Add named hadith-grading attribution sources and preserve grader disagreement.
- [ ] Add major Sunni tafsir corpora with work/author/edition identity.
- [x] Add four-madhhab primary/reference corpora and explicit Hanafi/Maliki/Shafi'i/Hanbali source packs.
- [ ] Deepen each madhhab pack with its usul al-fiqh corpus and explicit mu'tamad/attribution rules.
- [ ] Add seerah/history sources with historical-report confidence distinct from hadith authenticity.
- [ ] Add biography/tarajim and Arabic lexicon sources for attribution/context.
- [ ] Evaluate additional official Sunni fatwa institutions (e.g. Al-Azhar/Dar al-Ifta, other national fatwa bodies) as separate institutional lenses rather than blending them into one generic answer.

## P1 — Retrieval and evidence quality

- [ ] Add query decomposition and domain/lens-aware source-pack routing.
- [ ] Add Arabic normalization policy and tests.
- [ ] Add lexical/BM25 search for local/ingested indexes where direct source search is weak.
- [ ] Add semantic retrieval only where it improves recall without erasing source boundaries.
- [ ] Add reranking and evidence-sufficiency evaluation.
- [ ] Add passage-level extraction around matched search results instead of page-first evidence where supported.
- [ ] Add stable source document IDs independent of changing URLs where possible.
- [ ] Add canonical citation metadata: work, book/chapter, volume, page, hadith/ayah/fatwa ID.
- [ ] Add provenance hashes/snapshots for fetched evidence where licensing permits.

## P1 — Publication Gate / verifier

- [ ] Deploy an independent semantic verifier implementation.
- [ ] Add verifier timeout/retry/circuit-breaker policy.
- [ ] Add contradiction and qualification-loss eval suites.
- [ ] Add multi-evidence entailment tests.
- [ ] Add lens/applicability policy beyond the current personal/general distinction.
- [ ] Add structured disagreement objects rather than relying on a boolean flag.
- [ ] Add explicit `NO_DIRECT_POSITION_FOUND` behavior for scholar-attribution queries.

## P1 — Security and production operations

- [ ] Deploy remote MCP behind HTTPS with secrets managed by the hosting platform.
- [ ] Add trusted-proxy handling before using forwarded client IPs for rate limiting.
- [ ] Move production rate limiting to a distributed/edge store if horizontally scaled.
- [ ] Add structured OpenTelemetry traces and redacted security/audit logs.
- [ ] Add SLOs for retrieval latency, verifier latency, source failures, and abstention rates.
- [ ] Add dependency/security scanning and container image scanning.
- [ ] Add SBOM and signed release artifacts.
- [ ] Add backup/fallback strategy for critical canonical providers.

## P1 — Cross-host release

- [ ] Deploy the real public `/mcp` endpoint.
- [ ] Generate Claude/OpenAI/Gemini packages against the real endpoint.
- [ ] Smoke-test the plugin in Claude Web.
- [ ] Smoke-test the plugin in ChatGPT/OpenAI.
- [ ] Smoke-test the plugin in Gemini.
- [ ] Smoke-test Claude Code/Codex/Gemini CLI where supported.
- [ ] Complete external marketplace/directory submissions.
- [ ] Add release/version/changelog automation.

## P2 — Maintainer experience

- [ ] Add `sunnah sources doctor` for origin/path/search/extraction diagnostics.
- [ ] Add `sunnah sources propose` scaffolding.
- [ ] Add coverage reports by domain, jurisdiction, lens, language, and claim class.
- [ ] Add source-pack diff output suitable for PR review.
- [ ] Add registry JSON Schema export/editor integration.
- [ ] Add optional Source Studio only when Git/YAML becomes a demonstrated bottleneck.

## P2 — Sunnah Engine integration

- [ ] Define the remote evidence-backend interface shared by direct-source adapters and Sunnah Engine.
- [ ] Add Engine capability discovery/version negotiation.
- [ ] Add persistent verified knowledge lookup without weakening source provenance.
- [ ] Add dependency-driven invalidation metadata.
- [ ] Keep Plugin functional without Engine.

## Documentation

- [ ] Keep `README.md` as user/developer documentation, not a status dump.
- [ ] Keep `ROADMAP.md` for staged direction/history.
- [ ] Keep `TODO.md` actionable and remove completed work rather than letting it become archival prose.
- [ ] Keep `SOURCES.md` synchronized with registry/source packs.
- [ ] Document every new source's authority rationale, limitations, and supported claim classes.
