# First Light — site map

The application structure for First Light, drawn from the fourteen documents in this repository. It answers three questions for every role: **which pages exist, what each page is for, and what options sit on it.**

Built 22 November 2026 from Specification v19, App Flow v15, Architecture v20, Backend Schema v4, UI/UX Brief v1, Mobile Design Brief v1, Visual Direction v1, Tenant Settings v8, PRD v3, Implementation Plan v1, Spike Findings v1, Alert Retry Addendum v0.3 and AI Context v19.

**20 areas · 156 pages · 597 options · 9 roles · 2 front ends** (staff app and client portal).

---

## The role PDFs

One per role. Each is the same three parts:

1. **The flow** — open app, sign in, home, then a column per tab. Every box is a page, every bullet an option named in the specification. Page 1.
2. **The register** — every page that role can reach, with its entry point, source section and options. The complete list behind the flow.
3. **The whole map** — the entire application in one tree, that role's pages in colour and everyone else's faded, so a person can see where their work sits.

| File | Role | Pages reachable |
|---|---|---|
| `01_MD.pdf` | Managing Director — the only chair; confirms every payment, approves all spend, sets the rules | 156 |
| `02_Sales_Head.pdf` | Sales Head — receives every lead, groups and assigns | 45 |
| `03_Sales_rep.pdf` | Sales representative — calls the queue, records outcomes, books meetings | 41 |
| `04_Design_Head.pdf` | Design Head — nothing reaches the client until this desk approves it | 46 |
| `05_Design_partner.pdf` | Design partner — closes the deal, owns the client through design, 5% share | 50 |
| `06_Production_Head.pdf` | Production Head — checks production spend, owns vendors and crew cover | 38 |
| `07_Production_Manager.pdf` | Production Manager — BOQ, materials, vendors, crew, delivery and installation | 41 |
| `08_Marketing_Head.pdf` | Marketing Head — brand template, content pipeline, funnel per post | 31 |
| `09_Client.pdf` | Client — their own project only, in one calm column | 23 |

## The combined PDF

`00_Combined_master.pdf` — five pages, for review rather than daily use:

1. **Cover** — what the set contains.
2. **One client, end to end** — the 15 steps every project passes, with the gate that opens each one. Four gates move money.
3. **What has to be decided first** — the nine contradictions found in the documents. Three change the shape of the screens.
4. **Who can reach what** — roles against areas, including the Sales Head's request-only access to a live project.
5. **The whole application** — all 20 areas and 156 pages in one tree.

---

## The data behind it

| File | What it is |
|---|---|
| `First_Light_Sitemap.md` | The written master. Every page with its entry point, who can open it, its purpose, its options, its rules and its source section. |
| `First_Light_Sitemap.xlsx` | The same data as sheets: **Pages** (156), **Options** (597), **Access**, **Journey**, **Gaps**. Filter it when scoping or building. |
| `First_Light_Site_Map.html` | Interactive version. One self-contained file, opens in any browser, no server. Click an area, then a page. Filter by role, search, and read the nine gaps. |
| `First_Light_Site_Map.svg` | The whole map as one poster. Drags into Figma as editable text and frames. |

## Reading the colours

A dot beside a page is its status:

- **Green** — specified. The documents define it; safe to build.
- **Amber** — partly specified, or two documents disagree about it.
- **Red** — open. Named but not decided; do not build yet.
- **Grey** — out of scope for First Light.

## Notes

- The **proposed paths** in the register are suggestions, not requirements. They exist so a developer has route names to start from.
- The flows follow the **Mobile Design Brief** tab bars. The UI/UX Brief gives a different bar for the same eight roles; only one can be built. This is gap 2 in the combined PDF.
- The call-outcome form is drawn with **seven** outcomes, the settled decision. Three documents still say four. This is gap 1.
- Every page and option here traces to a numbered section of a document in this repository. Where a document is silent, the page is marked open rather than filled in.
