# Samsara — Business Scope

| Field | Value |
|-------|--------|
| **Status** | `DRAFT` — pending your approval |
| **Version** | 0.1 |
| **Last updated** | 2026-05-19 |
| **Approver** | _[Your name]_ |
| **Approved date** | _—_ |

> **Gate:** Do not implement product features, user journeys, or technical build-out until this document’s status is `APPROVED`.  
> To approve: change **Status** to `APPROVED`, fill **Approver** and **Approved date**, then proceed to `docs/product/`.

---

## 1. Executive summary

**Samsara** is a private, harm-reduction companion for people who use psychedelics responsibly. It supports the full arc: **prepare with intention → stay grounded during → integrate after**. It is **not** medical care, therapy, substance sourcing, or emergency response.

**MVP business goal:** A small circle (starting with the founder) can complete one full journey cycle in the product and trust that data stays on-device unless they explicitly opt into cloud later.

**Monetization at MVP:** None.

---

## 2. Product definition

| Element | Definition |
|---------|------------|
| **Name** | Samsara |
| **Working tagline** | *Prepare. Ground. Integrate.* |
| **Category** | Personal harm-reduction & integration companion |
| **Primary user** | **Solo explorer** — plans occasional full journeys and wants structure + privacy |
| **Secondary user (v1)** | **Microdoser** — recurring low-dose protocols + spacing discipline |
| **Hero flow (MVP)** | Preparation → Trip mode → Journal |
| **Platform (v1 target)** | Web app; mobile-friendly; backend FastAPI + MongoDB when cloud ships |

### 2.1 Problem

- Preparation is often informal; intentions and safety checks are skipped.
- During experiences, people lack lightweight grounding tools in one place.
- Integration is fragmented across notes apps with no journey context.
- Dose spacing and tolerance are often guesswork.

### 2.2 Solution

A journey-shaped, **private** tool that:

1. Guides preparation (intention, safety, context).
2. Offers in-session grounding (timer, breathing, supportive prompts — not clinical treatment).
3. Captures insights and supports post-journey journaling and export.
4. *(v1)* Adds tolerance intelligence and microdose scheduling.

### 2.3 What Samsara is not

| Out of scope | Reason |
|--------------|--------|
| Telehealth / diagnosis / prescriptions | Regulatory and trust |
| Substance sourcing or “how to acquire” | Legal and platform risk |
| Replacement for sitter, therapist, or 911 | Safety boundary |
| Social network or public sharing by default | Privacy positioning |
| Guaranteed medical outcomes | Cannot promise efficacy |

---

## 3. Brand & positioning

### 3.1 Name rationale

**Samsara** evokes cycles, return, and transformation — aligned with preparation and integration without trivializing religious traditions. Marketing must be respectful; the product is **not** a religious offering.

### 3.2 Positioning statement

*For people who explore psychedelics responsibly, **Samsara** is a private journey companion that structures preparation, in-session grounding, and integration — unlike generic notes apps or anonymous forums, because it is built around the arc of a single journey and harm-reduction-first design.*

### 3.3 Tone of voice

- Calm, grounded, non-judgmental  
- Educational, not sensational  
- Clear disclaimers; never hype or encourage reckless use  

---

## 4. Target users

### 4.1 Primary — Solo explorer (MVP)

| Attribute | Detail |
|-----------|--------|
| **Goal** | Safer, more intentional journeys with lasting integration |
| **Behaviors** | Plans sessions weeks ahead; journals afterward; values privacy |
| **Success** | Completes prep wizard, uses trip tools if needed, writes/refines journal entry within 7 days |

### 4.2 Secondary — Microdoser (v1)

| Attribute | Detail |
|-----------|--------|
| **Goal** | Consistent protocol + tolerance-aware breaks |
| **Behaviors** | Fadiman/Stamets-style schedules; tracks spacing |
| **Success** | Generated schedule + informed break recommendation (API-backed in v1) |

---

## 5. Business goals & metrics

### 5.1 Phases

| Phase | Business goal | Success metrics (examples) |
|-------|---------------|----------------------------|
| **MVP** | Trustworthy personal tool for inner circle | 5+ users complete prep→trip→journal once; zero misleading medical claims |
| **v1** | Safe to share publicly | Privacy policy live; backup/restore trusted; optional accounts |
| **Vision** | Differentiated companion | Retention, optional paid tier only if cloud/AI costs justified |

### 5.2 Non-goals (MVP)

- Revenue  
- App store launch  
- Clinical partnerships  
- Real-time human coaching  

---

## 6. Monetization (deferred)

| Model | When to reconsider |
|-------|-------------------|
| **Free / personal** | MVP and v1 default |
| **Freemium** | When encrypted cloud sync or AI trip support ships |
| **Subscription** | Only if ongoing API costs require it |
| **B2B (retreats)** | Separate legal/compliance review |

---

## 7. Release scope (MoSCoW)

### 7.1 MVP — Must have

| # | Capability | Business rationale |
|---|------------|-------------------|
| M1 | Home hub + navigation | Orientation |
| M2 | Preparation wizard (intention, substance awareness, safety, guidelines) | Core differentiator |
| M3 | Trip mode: timer, grounding, scripted support, insight capture | In-session safety |
| M4 | Journal: CRUD, filters, import trip insights | Integration loop |
| M5 | Export / backup (JSON) | Trust for local-first |
| M6 | Emergency resources on key screens | Harm reduction duty |
| M7 | Disclaimers (not medical advice) | Legal/trust |
| M8 | Honest privacy: **local-first**; no fake “cloud sync” toggle | Brand integrity |

### 7.2 MVP — Won’t have

- User accounts & login  
- MongoDB as required path (optional anonymous API only if team chooses API-first)  
- Real LLM trip chat  
- Microdose planner as hero (can remain legacy reference)  
- Tolerance API in product UI  
- Community, sharing, education CMS  

### 7.3 v1 — Should have

| # | Capability |
|---|------------|
| V1 | FastAPI backend + MongoDB for authenticated users |
| V2 | Registration / login (email or magic link — TBD at technical scope) |
| V3 | Sync prep, trips, journal to cloud (opt-in) |
| V4 | Tolerance calculator (port from legacy Flask) |
| V5 | Microdose schedules persisted server-side |
| V6 | Privacy policy + About Samsara pages |
| V7 | Production deploy (HTTPS) |

### 7.4 Vision — Could have

- AI grounding companion (strict guardrails, no dosing advice)  
- Journal theme analytics  
- Push reminders for microdose days  
- Native mobile app  

---

## 8. Legal, safety & trust (business requirements)

| Requirement | MVP | v1 |
|-------------|-----|-----|
| Prominent “not medical advice” | Yes | Yes |
| Emergency numbers (911, crisis text, Fireside, poison control) | Yes | Yes |
| No dosing prescriptions from the app | Yes | Yes |
| No sourcing content | Yes | Yes |
| Privacy policy | Short footer OK | Full page |
| Age/jurisdiction | User responsibility statement | Same |
| Trademark/domain check on “Samsara” | Recommended before marketing | Before paid ads |

---

## 9. Competitive context

| Alternative | Samsara wedge |
|-------------|---------------|
| Notes / Notion | Journey-native flows + trip mode |
| Forums | Private, structured, no noise |
| Standalone tolerance calculators | Embedded in full arc (v1) |
| Clinical apps | Faster to ship; not claiming treatment |

---

## 10. Legacy assets

Pre-restructure prototypes live under `legacy/`:

| Path | Role |
|------|------|
| `legacy/prototype-ui/` | Static “Mindful Journey” HTML/JS — UX reference, rebrand to Samsara |
| `legacy/flask-tolerance-calculator/` | Tolerance math — port to FastAPI in v1, do not extend Flask |

---

## 11. Decisions log (open items)

Record answers here when you approve or amend scope.

| ID | Question | Proposal | Your decision |
|----|----------|----------|---------------|
| D1 | MVP backend: local-only UI vs API from day one? | **Local-first UI**; API in v1 | |
| D2 | Tagline final? | *Prepare. Ground. Integrate.* | |
| D3 | Microdose in MVP? | **No** — v1 | |
| D4 | Tolerance API in MVP? | **No** — v1 | |
| D5 | Primary persona locked? | **Solo explorer** | |

---

## 12. Approval

To finalize business scope:

1. Review sections 1–11 and fill **Decisions log**.  
2. Set **Status** at top to `APPROVED`.  
3. Notify the team / AI agent to author `docs/product/USER_JOURNEY.md` and `USE_CASES.md`.

**Changelog**

| Version | Date | Change |
|---------|------|--------|
| 0.1 | 2026-05-19 | Initial draft from planning sessions |
