# 0001. FastAPI and MongoDB for Samsara backend

- **Status:** proposed (pending business scope approval)
- **Date:** 2026-05-19
- **Context:** Legacy tolerance service used Flask. Greenfield backend should support modules, OpenAPI, and flexible document storage for journal and journey data.
- **Decision:** Use **FastAPI** for the API layer and **MongoDB** (via Motor) for persistent user data in v1+. MVP remains local-first on the client.
- **Consequences:**
  - Replace `legacy/flask-tolerance-calculator/` with a tolerance module in FastAPI; do not maintain Flask.
  - Frontend stack remains TBD; use OpenAPI codegen when chosen.
  - Requires Docker/local Mongo for v1 dev; MVP can ship without DB.
