# Blue Light: First Light documents

The document set for **First Light**, version 1 of **Blue Light** — the business platform for interior and design firms, run by each firm under its own brand. This repository is a read-only mirror of the signed handover set: business specification, architecture decisions, backend schema, tenant settings, app flow, goals, implementation plan and design briefs. It also carries the clickable MD console prototypes in `prototype/`.

## Start here

- **People:** [First_Light_Specification_v19.pdf](First_Light_Specification_v19.pdf) — the full business and workflow specification. It is the source of truth for business behaviour.
- **AI agents working on the build:** [BLUE_LIGHT_AI_CONTEXT_v19.md](BLUE_LIGHT_AI_CONTEXT_v19.md) — the condensed brief, including the operating rules in section 22.
- **One file, everything:** [BLUE_LIGHT_ALL_SPECIFICATIONS_v19.md](BLUE_LIGHT_ALL_SPECIFICATIONS_v19.md) — the context brief (Part A) and the full specification (Part B) in a single Markdown file.

## Prototype

The MD console exists as two clickable prototypes. Both open from disk with no server, no build step and no install, and both load the same seeded model, `prototype/md console mobile/data.js`.

| Surface | Open | Guide |
|---|---|---|
| Desktop, 1440 × 900 | [`prototype/md console Desktop/md-app.html`](prototype/md%20console%20Desktop/md-app.html) | [DESKTOP_APP_GUIDE.md](DESKTOP_APP_GUIDE.md) |
| Mobile, 390 × 844 | [`prototype/md console mobile/m-app.html`](prototype/md%20console%20mobile/m-app.html) | [MOBILE_APP_GUIDE.md](MOBILE_APP_GUIDE.md) |

Both builds have a self-test: `?selftest=1`. The prototype README lists every demo deep link:
[`prototype/README.md`](prototype/README.md).

## What is in the set

| Document | Version | Date | What it settles |
|---|---|---|---|
| [First_Light_Specification_v19.pdf](First_Light_Specification_v19.pdf) | 19 | 2026-11-22 | Business and workflow behaviour, roles, money, stages, guardrails (21 pages) |
| [First_Light_Architecture_v20.pdf](First_Light_Architecture_v20.pdf) | 20 | 2026-11-18 | Technical choices: stack, providers, hosting, alert retries, verified provider facts |
| [First_Light_Backend_Schema_v4.pdf](First_Light_Backend_Schema_v4.pdf) | 4 | 2026-11-22 | Tables, fields, enums and the row-level security summary for the first migration |
| [First_Light_Tenant_Settings_v8.pdf](First_Light_Tenant_Settings_v8.pdf) | 8 | 2026-11-22 | Every value a tenant can change, its default and who may change it |
| [First_Light_App_Flow_v15.pdf](First_Light_App_Flow_v15.pdf) | 15 | 2026-11-22 | Step-by-step flow for every role, with specification section references |
| [First_Light_PRD_Goals_v3.pdf](First_Light_PRD_Goals_v3.pdf) | 3 | 2026-11-22 | Product goal, users, ten success metrics and their starting targets |
| [First_Light_Implementation_Plan_v1.pdf](First_Light_Implementation_Plan_v1.pdf) | 1 | 2026-11-22 | Pre-code tasks, spikes, ten build phases and acceptance checks |
| [First_Light_UI_UX_Brief_v1.pdf](First_Light_UI_UX_Brief_v1.pdf) | 1 | 2026-11-22 | Screens, navigation by role, shared components, accessibility |
| [First_Light_Visual_Direction_v1.pdf](First_Light_Visual_Direction_v1.pdf) | 1 | 2026-11-22 | Proposed palette, type, shape and spacing, derived from the owner's references |
| [First_Light_Mobile_Design_Brief_v1.html](First_Light_Mobile_Design_Brief_v1.html) | 1 | 2026-11-22 | Phone-first layout, sizes, typography, colour and three key wireframes |
| [First_Light_Alert_Retry_Addendum_v0_3.pdf](First_Light_Alert_Retry_Addendum_v0_3.pdf) | 0.3 | 2026-11-22 | Changes to the alert retry rules: messaging window, retry wait, Delivery Problems |
| [First_Light_Spike_Findings_v1.pdf](First_Light_Spike_Findings_v1.pdf) | 1 | 2026-11-22 | What Meta's documentation says about groups and template editing, before live tests |
| [BLUE_LIGHT_AI_CONTEXT_v19.md](BLUE_LIGHT_AI_CONTEXT_v19.md) | 19 | 2026-11-22 | Condensed brief for AI readers, plus the build guardrails |
| [BLUE_LIGHT_ALL_SPECIFICATIONS_v19.md](BLUE_LIGHT_ALL_SPECIFICATIONS_v19.md) | 19 | 2026-11-22 | The brief and the full specification combined into one file |

## How to read it

1. Read the specification's section 26 first. It holds the decisions of 2026-11-22 that later documents build on.
2. Treat the specification as the source of truth for *what the business does*, and the architecture document as the source of truth for *how it is built*. Where the two appear to disagree, report it rather than choosing silently.
3. Items marked **OPEN** are not decided and must not be built.
4. Each document states its own version and date in its header. The version in the file name above is the one that shipped; where a header still names an older source version, the file version governs.

## Note on this repository

Every document file here is byte-identical to the corresponding file in the signed handover folder. The handover bundle `Blue_Light_Final_Handover.zip` is not included because it contains only these same files in an archive. The `prototype/` folder and the two build guides are working additions, not part of the signed handover set.
