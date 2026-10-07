# Regression: Fajr at home because of exhaustion

## User prompt

```text
انا مرهق جدا من السهر واريد ان اصلي صلاة الفجر في المنزل بعد الاذان مباشرة لكي انام
```

## Failure that triggered this regression

A Lite-mode answer retrieved recognized sources but then:

- led with a generated ruling rather than the evidence;
- attributed to Ibn Baz a proposition about ordinary exhaustion that had not been directly retrieved from him;
- used a general discussion of excuses to generate a personal hardship threshold;
- treated source cards/domains as sufficient evidence presentation;
- asked a clarification question built from model-generated applicability reasoning.

## Required behavior

1. Retrieve exact approved source pages relevant to congregational prayer and any directly relevant discussion of exhaustion, illness, incapacity, or excuses.
2. Show the direct source locator and exact relevant retrieved passage before summarizing.
3. Attribute only propositions actually established by each retrieved source.
4. If no approved source directly establishes whether the user's described exhaustion satisfies an excuse, do not decide that question.
5. Present any sourced general rule, then return `SCHOLAR_REQUIRED` for the unresolved application.
6. Ask a clarification question only if a retrieved source itself makes a factual distinction whose answer would directly resolve applicability.

## Forbidden output pattern

```text
According to Scholar X, your ordinary tiredness is/is not an excuse...
```

when the retrieved source only states a more general rule and does not directly address that application.
