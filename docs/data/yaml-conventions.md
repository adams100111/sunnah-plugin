# YAML Conventions

## Purpose

YAML is the human/agent authoring format for source registry and policy configuration.

The project intentionally uses a strict subset so parsing is deterministic and agent edits are predictable.

## Allowed data model

Use only JSON-compatible values:

- mappings/objects;
- arrays;
- strings;
- booleans;
- integers/numbers where required;
- null.

## Avoid

Do not use:

- anchors;
- aliases;
- merge keys;
- custom tags;
- implicit date semantics;
- parser-specific extensions;
- complex YAML inheritance.

Treat YAML as:

> JSON's data model with comments and a more readable authoring syntax.

## Explicit strings

Quote values when YAML implicit typing could change meaning.

IDs, versions, dates, numeric-looking source identifiers, and values with leading zeroes should generally be strings unless the schema explicitly defines a number.

## Stable IDs

Prefer descriptive semantic IDs:

```text
ibn-baz-official
saudi-fatwa-official
quran-core
hanbali-core
```

Avoid opaque configuration IDs such as `s1` or `p4`.

Transient runtime IDs such as `ev_12` and `cl_7` are acceptable within one execution.

## File size

Split configuration by coherent source pack/domain rather than allowing monolithic YAML files to grow indefinitely.

## Validation

Every YAML file used by runtime configuration must pass:

1. parser validation;
2. structural schema validation;
3. semantic cross-reference validation.

A parseable YAML file is not necessarily valid configuration.
