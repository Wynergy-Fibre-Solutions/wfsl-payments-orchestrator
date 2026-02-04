WFSL Payments Orchestrator – Architecture Overview

Actors:
- Contributor
- GitHub
- CI (GitHub Actions)
- WFSL Payments Orchestrator
- External Bank (Assured Pay)

Flow:

Contributor
  └─ Pull Request (with task label)
       └─ GitHub Merge
            └─ CI emits ci-input.json
                 └─ Orchestrator validates policy
                      └─ Payment event registered
                           └─ Events batched
                                └─ Approved externally
                                     └─ Funds released

Security boundaries:
- No credentials stored
- No bank access
- No mutable payment records

Control boundaries:
- Eligibility is automated
- Approval is explicit
- Execution is external
