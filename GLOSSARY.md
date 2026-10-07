# Sunnah Plugin

Sunnah Plugin is the portable agent-facing Sunni Islamic knowledge product. It can operate independently today and later use Sunnah Engine as a stronger evidence backend without changing its user-facing contract.

## Language

**Sunnah Plugin**:
The portable, installable Islamic agent/plugin product that delivers grounded Sunni Islamic answers across supported agent harnesses and web surfaces.
_Avoid_: Sunnah Agentic Plugin, AI Sheikh, Mufti Bot

**Sunnah Engine**:
The separate long-term Islamic knowledge infrastructure that may later provide corpus, retrieval, verification, and derived knowledge services to Sunnah Plugin.
_Avoid_: Plugin backend, plugin database

**Sunnah Skill**:
The single public Agent Skill through which users invoke Sunnah Plugin. It routes internally to task and domain procedures instead of exposing many overlapping public skills.
_Avoid_: Fiqh skill, Hadith skill, scholar skill

**Evidence Runtime**:
The hosted remote HTTPS MCP service that controls approved source access, provenance, canonical evidence retrieval, deterministic validation, policy enforcement, and independent semantic verification where required.
_Avoid_: Browser, scraper, generic MCP

**Source Registry**:
The Git-versioned declarative catalog that defines approved source identities, origins, authority metadata, capabilities, and policy bindings.
_Avoid_: Source database, admin database, URL allowlist

**Source Pack**:
A versionable named grouping of source definitions used by a lens, domain policy, test suite, or release configuration.
_Avoid_: Corpus, arbitrary URL list

**Source Studio**:
A future optional UI for viewing, editing, validating, and proposing Git-backed source-registry changes. Git remains authoritative.
_Avoid_: Admin panel, source database

**Islamic Evidence**:
Retrieved source material that the active source policy permits to support an Islamic claim.
_Avoid_: Search result, model knowledge

**External Factual Evidence**:
Non-Islamic factual material used to establish contemporary facts needed by an Islamic question, without itself carrying Islamic authority.
_Avoid_: Islamic evidence

**Lens**:
A named scholarly or methodological scope that constrains retrieval and attribution, such as a madhhab, scholar corpus, or contemporary institution.
_Avoid_: Persona, simulated scholar, role-play agent

**Domain Procedure**:
A progressively loaded workflow for a specific Islamic discipline or task inside the single public Sunnah skill.
_Avoid_: Public sub-skill, scholar agent

**Claim**:
A proposition in a candidate answer that can be evaluated against evidence. Substantive Islamic claims require permitted supporting evidence before publication.
_Avoid_: Sentence

**Evidence Bundle**:
The compact set of retrieved evidence objects selected to support one answer or verification task.
_Avoid_: Search dump, full context

**Publication Gate**:
The mandatory verification boundary a substantive Islamic claim must pass before it can appear in a user-facing answer.
_Avoid_: Self-check, confidence score

**Grounded Answer**:
A user-facing answer whose substantive Islamic claims are supported by permitted evidence and whose attribution and disagreement state are preserved.
_Avoid_: Fatwa issued by the plugin

**Scholar Required**:
A terminal answer state used when the system is not permitted to infer a safe answer from the available evidence and qualified scholarly judgment is required.
_Avoid_: Model refusal, low confidence

**Host Adapter**:
Thin packaging or presentation logic for a specific host such as Claude, ChatGPT/OpenAI, Gemini, or another Agent Skills/MCP-compatible harness.
_Avoid_: Separate implementation

**Canonical Registry State**:
The source-registry and policy state merged into the repository's main branch. All UIs and contributor workflows propose changes to this state rather than replacing it.
_Avoid_: Admin state
