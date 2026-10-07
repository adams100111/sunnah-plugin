# Treat cross-host portability as a release requirement

Sunnah Plugin must preserve its core trusted experience across Claude Web, ChatGPT Web, Gemini Web where supported, and their corresponding agent/CLI harnesses. The canonical skill, evidence contracts, and hosted remote MCP runtime are shared; host-specific manifests, adapters, hooks, and rendering are compatibility layers rather than separate implementations. A release is not considered complete when its trust guarantees only work in one local harness.
