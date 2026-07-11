# Samsara documentation index

**Read this file first** — keeps AI and human context small and ordered.

## Current phase

| Phase | Document | Status |
|-------|----------|--------|
| **1. Business** | [business/SCOPE.md](./business/SCOPE.md) | `DRAFT` — **approve before continuing** |
| 2. Product | [product/USER_JOURNEY.md](./product/USER_JOURNEY.md) | Blocked until scope approved |
| 2. Product | [product/USE_CASES.md](./product/USE_CASES.md) | Blocked until scope approved |
| 3. Architecture | [architecture/STACK.md](./architecture/STACK.md) | Draft decisions only |
| 4. Build | `backend/`, `frontend/` | Not started |

## Quick facts (memory-efficient)

- **Product:** Samsara — harm-reduction journey companion  
- **MVP flow:** Prepare → Trip → Journal (local-first)  
- **Stack (planned v1):** FastAPI, MongoDB, frontend TBD  
- **Legacy:** `legacy/prototype-ui`, `legacy/flask-tolerance-calculator`  
- **AI entrypoint:** [../AGENTS.md](../AGENTS.md)

## Rules

1. Do not expand `docs/product/` or scaffold app code until `SCOPE.md` status is `APPROVED`.  
2. Prefer updating the single source doc for each concern (avoid duplicating scope in READMEs).  
3. ADRs go in `docs/adr/` as `NNNN-short-title.md` when technical choices are finalized.
