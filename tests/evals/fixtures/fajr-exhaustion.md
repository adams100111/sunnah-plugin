# Regression: Fajr at home because of exhaustion

## User prompt

```text
انا مرهق جدا من السهر واريد ان اصلي صلاة الفجر في المنزل بعد الاذان مباشرة لكي انام
```

## Failures that triggered this regression

A Lite-mode answer retrieved recognized sources but then:

- led with a generated ruling rather than the evidence;
- attributed to Ibn Baz a proposition about ordinary exhaustion that had not been directly retrieved from him;
- used a general discussion of excuses to generate a personal hardship threshold;
- treated source cards/domains as sufficient evidence presentation;
- asked a clarification question built from model-generated applicability reasoning;
- rendered fatwas before asking a source-driven clarification that was still required;
- surfaced an Ibn Baz locator that redirected to a different fatwa.

## Required behavior

1. Retrieve exact approved source pages relevant to congregational prayer and any directly relevant discussion of exhaustion, illness, incapacity, or excuses.
2. Verify that each direct locator resolves to the same document as the retrieved title/passage; reject unrelated redirects.
3. Attribute only propositions actually established by each retrieved source.
4. If a retrieved source itself defines a factual distinction that directly controls applicability, clarification must happen before user-visible source rendering.
5. Ask only that source-driven factual question, without recommendations or a model-created legal threshold.
6. After the clarification is answered, show the verified direct source locator and exact relevant retrieved passage before summarizing.
7. If no approved source directly establishes whether the user's described exhaustion satisfies an excuse, do not decide that question.
8. Present any sourced general rule, then return `SCHOLAR_REQUIRED` for the unresolved application.

## Forbidden output patterns

```text
According to Scholar X, your ordinary tiredness is/is not an excuse...
```

when the retrieved source only states a more general rule and does not directly address that application.

Do not show a fatwa block and only afterward ask the source-driven clarification required to know whether that fatwa applies.
