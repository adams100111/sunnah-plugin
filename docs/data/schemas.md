# Schemas

## Principle

The plugin should maintain one canonical runtime schema definition per concept and derive other forms where practical.

## Preferred ownership

Target pattern:

```text
Zod schema
  ├── TypeScript inferred type
  ├── runtime validation
  └── JSON Schema representation where needed
```

Avoid independently hand-maintaining equivalent:

- TypeScript interfaces;
- Zod validators;
- JSON Schema files.

## Core schema families

The implementation is expected to need contracts for:

- source definitions;
- Source Packs;
- domain/source policies;
- retrieval query;
- evidence object;
- claim;
- verification result;
- final result/output;
- user-source inspection.

## MCP boundaries

Every MCP input and output must be validated.

Malformed or policy-incomplete objects should fail at the boundary instead of entering the reasoning workflow.

## LLM context

Large JSON Schemas should not normally be injected into model context.

The host model should receive concise tool descriptions and structured responses; runtime validation remains server-side.

## Versioning

Breaking schema changes require explicit compatibility handling across:

- MCP server;
- host adapters;
- eval fixtures;
- CLI;
- future Source Studio.

Do not introduce a schema-versioning system before the first actual compatibility requirement appears.
