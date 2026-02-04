# WFSL Payments Orchestrator v2

Deterministic payments governance for validated work.

This repository contains proprietary infrastructure owned by
Wynergy Fibre Solutions Ltd, designed to automate payment eligibility,
audit, and compliance for contractor and engineering environments.

---

## What this system does

The WFSL Payments Orchestrator converts **validated work** into
**payment-ready events** under strict policy control.

It enforces:
- deterministic task classification
- rate governance
- payment caps
- duplicate prevention
- evidence-backed audit trails

No funds are moved by this system.
All execution is delegated to external banking platforms.

---

## Why it exists

Traditional payroll and contractor payment flows rely on:
- manual approval
- trust-based classification
- post-hoc reconciliation

This system removes ambiguity by enforcing policy at source.

If work is not:
- merged
- labelled
- verified
- compliant

…it is not payable.

---

## High-level flow

1. Contributor opens a pull request
2. Exactly one `task:*` label is applied
3. PR is merged to `main`
4. CI emits an immutable payment artefact
5. Orchestrator validates policy and registers the event
6. Events are batched for Assured Pay execution
7. Payment approval occurs once, externally

---

## What this is NOT

- Not a payroll system
- Not a bank integration
- Not a consumer fintech product
- Not open-source software

This is governance infrastructure.

---

## Who this is for

- Telecoms operators
- Infrastructure contractors
- Regulated engineering firms
- Organisations with audit or compliance obligations
- Companies managing distributed technical contributors

---

## Governance guarantees

- Deterministic behaviour
- Append-only registers
- Signed commits
- CI-enforced policy
- Evidence-linked payment eligibility
- Clear separation of duties

---

## Licensing

This repository is licensed under the
**Wynergy Fibre Solutions Ltd Enterprise Licence**.

Public visibility is provided for transparency and evaluation.
Commercial use, deployment, or integration requires a licence
from Wynergy Fibre Solutions Ltd.

See `LICENCE.md` for full terms.
