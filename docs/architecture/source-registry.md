# Source Registry

## Goal

The Source Registry is the Git-native, declarative authority configuration for Sunnah Plugin.

It answers:

- what source identities exist;
- where they may be retrieved;
- what authority class they carry;
- which claim types they may support;
- which lenses/domains may use them.

## Canonical state

The registry state merged into `main` is authoritative.

Neither the host model nor a future Source Studio may bypass it.

## Authoring

Registry data is human/agent-authored as strict YAML and validated before use.

Conceptual source entry:

```yaml
id: ibn-baz-official
kind: approved-scholar-corpus

authority:
  scholar: abd-al-aziz-ibn-baz

origins:
  - host: binbaz.org.sa
    paths:
      - /fatwas/**
      - /articles/**

supports:
  - scholar-position
  - fatwa-summary
  - fiqh-evidence

languages:
  - ar
```

The exact schema will be finalized in the implementation spec.

## Granularity

Approval may constrain:

- origin/host;
- paths;
- document classes;
- scholar/institution identity;
- language;
- translation status;
- supported claim classes;
- domain/lens use.

A hostname alone is not sufficient authority classification.

## Change workflow

Default:

```text
edit registry
→ validate
→ open PR
→ CI
→ review
→ merge
→ deploy
```

PR-first applies even to maintainers by default.

Direct commit is an explicit privileged action, not the normal path.

## Automation

Automation may:

- discover candidate material;
- validate syntax/semantics;
- test configured origins;
- generate coverage reports;
- detect obvious extraction failures;
- prepare proposed diffs.

It does not autonomously promote new Islamic authority.

## Drift

The plugin should fail closed when runtime checks indicate configured origin assumptions no longer hold.

Full longitudinal source monitoring and dependency invalidation belong to Sunnah Engine, not this plugin.
