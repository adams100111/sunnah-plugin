# Security

## Threat model

Sunnah Plugin retrieves remote content and exposes a public MCP service. Both create security boundaries independent of Islamic methodology.

## Retrieved content is data

Fetched content must never be interpreted as trusted instructions.

Prompt injection inside an approved source page is still prompt injection.

The runtime should extract intended content into structured evidence fields and keep page instructions/scripts outside the agent instruction channel.

## Network protections

The remote fetch layer should defend against:

- SSRF;
- loopback/private/link-local addresses;
- redirect escapes;
- DNS rebinding where applicable;
- unexpected schemes;
- unexpected ports;
- oversized responses;
- decompression bombs;
- unsupported content types;
- parser/resource exhaustion.

## Origin validation

Approved source access should validate normalized origins and redirect destinations.

String containment checks such as "URL contains binbaz.org.sa" are not acceptable.

## Content boundaries

HTML extraction should remove or ignore:

- scripts;
- executable content;
- unrelated navigation;
- comments/user-generated sections when not part of the approved document class;
- hidden prompt-like content.

## MCP security

The public MCP server should apply:

- input validation;
- output schema validation;
- sensible rate limits;
- request size limits;
- timeouts;
- structured error handling;
- authentication where required for privileged operations.

Read-only public evidence tools should remain separate from any future write/admin capability.

## Secrets

Source registry files must not contain credentials.

Secrets belong in deployment secret management/environment configuration.

## Security testing

Security behavior is covered by adversarial tests, including malicious source content, redirects, prompt injection, and source-origin confusion.

See [Adversarial Tests](../testing/adversarial-tests.md).
