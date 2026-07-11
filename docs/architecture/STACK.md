# Technical stack — Samsara (draft)

| Field | Value |
|-------|--------|
| **Status** | `DRAFT` — finalize after business scope **and** product docs approved |
| **Blocked by** | [business/SCOPE.md](../business/SCOPE.md), then product docs |

---

## Planned direction (not implemented)

| Layer | Choice | Notes |
|-------|--------|-------|
| API | **FastAPI** | Replaces legacy Flask tolerance service |
| Database | **MongoDB** | v1+ for authenticated sync |
| Frontend | **TBD** (likely React + Vite) | Legacy static UI in `legacy/prototype-ui/` |
| Auth | **TBD** | v1 — JWT/session |
| MVP data | **Local-first** (IndexedDB / localStorage) | Per business scope |

## Module map (preview)

See business scope §7; detailed architecture doc will be added post-approval as `docs/architecture/OVERVIEW.md`.

| Module | Phase |
|--------|-------|
| M0 Platform | Foundation |
| M1 Identity | v1 |
| M2 Preparation | MVP |
| M3 Trip session | MVP |
| M4 Journal | MVP |
| M5 Tolerance | v1 |
| M6 Microdose | v1 |
| M7 Safety | MVP |

**Do not scaffold `backend/` or `frontend/` application code until product use cases are approved.**
