---
title: "Trace Validation & Model Based Testing: State of the Art"
description: ""
author: "Arne Vogel"
date: 2026-01-21T09:06:23+01:00
lastModified: ""
language: "en"
about: "no"
related: "no"
listed: "yes"
mathjax: "yes"
toc: "no"
customCSS: []
customJS: []
init: "no"
category: []
draft: false
---

Trace validation and model based testing allow us to keep a formal specification and an actual implementation of the specification in sync.
That is: we link the formal model and the implementation together such that we gain confidence that the implementation actually corresponds to the formal model.

Why do we need this?
Formal models give us great confidence in the safety and liveness properties of our algorithms that we check.
But when it comes to implementing the formal specification: did we actually implement the correct model?
Or is there some bug?
This is what we are trying to solve with trace validation and model based testing.

With **trace validation** the behavior of the implementation is observed and checked against the formal specification.

With **model based testing** we generate traces from the formal specification and check it against the implementation.

Just a note: some papers use different terminology for these concepts.




## Smart Casual Verification of the Confidential Consortium Framework
[https://www.usenix.org/system/files/nsdi25-howard.pdf](https://www.usenix.org/system/files/nsdi25-howard.pdf)

This work connects a TLA$^+$ specification with Confidential Consortium Framework (CCF).
I haven't looked into CCF deeply, but for now I will just assume its some unspecified implementation of the specification.
They collect traces from 13 manually written scenarios.
Fuzzing was investigated but discarded, as it did not generate interesting behavior.

For trace validation they constrain the generation of all possible behaviors of the specification with the concrete steps taken in the implementation.
E.g., if the implementation did X at step 0 then we force the specification also to do X in step 0.

Trace of the implementation:
* Step 0: `SendPrepare(value=42, node=A)`
* Step 1: `ReceivePrepare(value=42, node=B)`

Check against the specification, in the specification:
* Step 0: Only enable `SendPrepare` action, with `value=42, node=A`
* Step 1: Only enable `ReceivePrepare` action, with `value=42, node=B`

In the end they use this approach to validate new code changes.
So much so that they even mention the "CCFs CI pipeline" in the abstract.

## eXtreme Modelling in Practice
[https://arxiv.org/pdf/2006.00915](https://arxiv.org/pdf/2006.00915)

In this work the authors looked at using trace validation and model based testing for MongoDB.
They used TLA$^+$ for the specification.
They found that adding trace validation was not feasable for MongoDB as a whole.
The specification was too high level and they had problems adding the trace collection to the already existing code base.

They had more success with model based testing in a subset of the code base.

## Validating Traces of Distributed Programs Against TLA$^+$ Specifications
[https://arxiv.org/pdf/2404.16075](https://arxiv.org/pdf/2404.16075)

In this work they instructed Java programs to extract logs which are checked against TLA$^+$ specifications.

For the logging they have an API of `notifyChange(String var, List<String> patch, String op, List<Object> args)` and `log(String eventName, Object[] args, long clockValue)`.
With `notifyChange` changes to variables are tracked which are grouped together with calls of `log` (see Section 3).

They face the problem that while they have a trace it might be incomplete.
Variable updates might be missing.
So when checking if the trace is valid in the state space of the formal specification they could take multiple "routes" throug the state space.
So even though the trace might be valid, naively matching states to the state space might lead them to dead ends even if the trace is valid (see Fig. 4).

They constrain the state space with the values seen in the trace.
E.g., lets say `SendPrepare` has used `value=42` and `node=A` but we have only logged the `value`, not the `node`.
Then they constrain the `value` to `42` and leave the `node` open for any potential value in the state space explocation.
They then create the full state space and check if the maximum length of any path through the state space is at least the length of the seen trace.
If that is the case then the trace is valid.

