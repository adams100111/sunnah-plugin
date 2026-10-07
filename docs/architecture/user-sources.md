# User-Provided Sources

## Principle

```text
ALLOW USER TO SUBMIT
        ≠
TRUST USER-SUBMITTED SOURCE
```

## Supported workflows

A user may provide a URL or document and ask the plugin to:

- summarize it;
- extract its Islamic claims;
- verify a quotation;
- check attribution;
- compare it with approved sources;
- identify unsupported or contradicted claims.

## Classification

A submitted source is resolved against the Source Registry.

Possible outcomes include:

- approved registered origin/document class;
- registered origin but unapproved document class;
- external factual source;
- unknown/untrusted source.

## Summarization

The plugin may summarize an untrusted document as a description of what that document says.

The summary must not be promoted into Islamic authority.

## Verification mode

For questions such as "is this ruling correct?", the plugin should:

```text
user source
→ extract claims
→ retrieve approved Islamic evidence
→ compare
→ SUPPORTED / CONTRADICTED / UNRESOLVED-style result
```

The exact result enum will be finalized in the spec.

## Provenance

Derived material keeps the user-source provenance label.

Generation does not promote trust.
