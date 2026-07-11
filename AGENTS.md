# Samsara — AI agent guide

Minimal context for efficient sessions. **Do not load entire repo** — use paths below.

## 1. Read order

1. [docs/README.md](docs/README.md) — phase gate & index  
2. [docs/business/SCOPE.md](docs/business/SCOPE.md) — **source of truth** for what to build  
3. Only if `SCOPE.md` status is `APPROVED`: [docs/product/](docs/product/)  
4. Only if building code: [docs/architecture/STACK.md](docs/architecture/STACK.md)

## 2. Phase gate (mandatory)

| `SCOPE.md` status | Allowed work |
|-------------------|--------------|
| `DRAFT` | Docs, scope edits, restructure — **no feature implementation** |
| `APPROVED` | Author USER_JOURNEY + USE_CASES, then architecture, then code |

## 3. Repository layout

```
├── docs/           # All planning & ADRs — start here
├── backend/        # FastAPI (empty until post-approval)
├── frontend/       # App (empty until post-approval)
├── legacy/         # Old prototypes — reference only, do not extend
├── scripts/        # Tooling
└── AGENTS.md       # This file
```

## 4. Product facts

- **Name:** Samsara  
- **Tagline:** Prepare. Ground. Integrate.  
- **MVP:** Prep → Trip → Journal, local-first, harm reduction  
- **Not:** medical advice, sourcing, social network, emergency replacement  

## 5. Code conventions (when implementation starts)

- **Backend:** FastAPI, `app/modules/<domain>/`, Pydantic schemas, async Motor for MongoDB  
- **Frontend:** TBD; generate API client from OpenAPI  
- **Legacy:** Do not add features under `legacy/` — port or rewrite in `backend/` / `frontend/`  
- **Docs:** Update ADR in `docs/adr/` for significant technical decisions  
- **Commits:** Small, scoped; match module names  

## 6. Memory efficiency

- Prefer editing the **single canonical doc** (e.g. SCOPE.md) over duplicating in READMEs  
- Do not paste full legacy files into context — cite paths  
- Keep new files focused; split when a doc exceeds ~300 lines  

## 7. Safety copy

Any user-facing feature about substances must include disclaimers consistent with [docs/business/SCOPE.md](docs/business/SCOPE.md) §8.
