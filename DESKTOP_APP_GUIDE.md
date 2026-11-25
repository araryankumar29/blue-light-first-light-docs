# First Light · MD Console — desktop build guide

Written so another session, or another person, can pick this up cold: what the desktop console is,
how it is put together, every screen, every overlay, every action, and every place where something
is a stub.

---

## 1. What this is

A single-page desktop prototype of the Managing Director's console for **Homesic**, a Delhi NCR
interior design firm. It runs at up to **1440 × 900** inside a browser, shrinking to the window, using plain HTML, CSS and
JavaScript. There is no framework, no build step, no server and no database. Open
`prototype/md console Desktop/md-app.html` and it runs.

All state is in memory. A reload resets every change. The console shares its model with the phone
build, so the two surfaces can be open side by side from disk and show the same projects, people,
payments, approvals, meetings and messages.

```
md console Desktop/
  md-app.html    shell: loads the CSS, the shared data.js, then md-app.js
  md-app.css     the design system: cards, tables, charts, calendar, modals
  md-app.js      views, routing, actions, computed helpers, self-test
  fonts/         Manrope 400/500/600/700/800 woff2
  sample-quotation.pdf   stand-in document used by PDF previews
```

`md-app.html` must load **`../md console mobile/data.js`** before `md-app.js`. The two prototype
folders therefore belong together.

---

## 2. One shared model (`data.js`)

The model lives at `prototype/md console mobile/data.js` and is loaded by both builds. It is
deterministic: an LCG seeded at `20261122`, with `TODAY` fixed at `2026-11-22T09:41:00+05:30`.
Reloading never changes the numbers.

| Entity | Shape | Notes |
|---|---|---|
| `projects` | 55 items: `id, name, client, city, value, stage(0-3), day, target, promised, forecast, slip, status, dp, pm, rep, team[], payments[], fileSets[], files[], msgs[], silence` | stage 3 or status Closed = past |
| `payments` | per project: `stage, pct, amount, dueOn, paidOn, status` | status: `paid`, `due`, `overdue`, `proof` |
| `staff` | 30 items: `id, name, role, initials, tint[bg,fg], rating, wip, leave, status, joined, email, phone` | role drives department |
| `approvals` | 19: `id, type, title, sub, amount, ageH, projectId, person, status, payId` | types: Payment, Design, Expense, Salary, Reimbursement, Leave |
| `proofs` | 7 payment proofs: `id, projectId, stage, amount, at, ageH` | what the MD confirms |
| `salaries` | one per non-MD person: `id, person, amount, due, status` | amounts cycle 48k/62k/85k/1.1L/1.75L |
| `meetings` | `id, title, projectId, projectName, client, date, hour, minute, duration, participants[{id,rsvp}], past, link, agenda, notes, transcript, files[]` | rsvp: accepted / declined / pending |
| `activity` | 40 entries: `id, at, who, initials, tint, kind, text` | feeds the activity calendar and log |

Shared derived helpers in `data.js`: `monthStats()`, `ladder()`, `pendingApprovals()`,
`debtTotal()`, `atRisk()`, `stagesGreen()`, `upMeetings()`, `pastMeetings()`, `meetingsOf(p)`,
`mentions`, `rsvpCount(m)`, `meetCode(s)`, `lakh()`, `inr()`, `fmtDate()`, `esc()`.

The desktop adds presentation-only helpers in `md-app.js`: `deptOf()`, `metricsFor()`, `perfRows()`,
`clientList()`, `weekBars()`, `monthBars()` and `isoDate()`. They read the shared model; they do not
own any data.

---

## 3. Shell and navigation

The app is a 1440 × 900 surface at most, shrinking to the browser window on a light canvas.

- **Left rail**, 76 px collapsed and 214 px on hover, with ten destinations: Overview, Approvals,
  Meetings, Projects, Performance, Money, Clients, People, Activity, Settings. The active item gets
  a white highlight and a coral edge; Approvals and Meetings carry live count badges.
- **Top bar**: greeting and date context, global search, approvals bell, and the account block.
  Clicking the account block opens the **More** menu.
- **Main view**: the routed screen. Long screens scroll inside the main area; the rail and top bar
  stay fixed.
- **Overlays**: a 560 px right drawer for people, and centered modals for transactions, meetings,
  files and everything else.

Hash routing:

`#/overview`, `#/approvals`, `#/comms`, `#/projects`, `#/project/PRJ-004`, `#/performance`,
`#/dept/Sales`, `#/finance`, `#/clients`, `#/people`, `#/activity`, `#/integrations`,
`#/settings`, `#/person/EMP-04`.

`applyHash()` parses the hash, sets `state.route` (and `state.dept` or `state.projectId`), then
calls `render()`. Every route is a plain function returning an HTML string.

---

## 4. Screens

### 4.1 Dashboard (`#/overview`)
The brief (numbers, risk, delay attribution, read-aloud), collected ring and sparkline, the book by
payment gate, decision debt, promises vs forecast, who caused the delay, next meeting, needs-you
counts (client/internal/leave), in-flight projects, and a four-metric trust strip.

### 4.2 Approvals (`#/approvals`)
Four payment-state tiles (In review, Overdue, Due, Received) that jump to the matching Payments
tab. Tabs for All, Payment, Design, Leave, Expense, Salary, Reimbursement and Decided. Each row
carries its type action: review and confirm a proof, open and approve a design, approve leave with
cover, pay an expense/salary/reimbursement, or approve/reject a generic item. New transaction and
All salaries sit in the header.

### 4.3 Meetings & Messages (`#/comms`)
Four tabs:
- **Upcoming** — a card per meeting with date/time, invited count and RSVP split; New meeting.
- **Messages** — every project group, with S/M/L density control and the last message; opens a thread.
- **Mentions** — every message that tagged the MD, with project and sender.
- **Past** — every recorded meeting, with notes; opens the meeting detail.

**New meeting** picks a project, title, date, time, agenda and participants; creation adds it to the
shared `meetings` array with pending RSVPs and a generated Meet link. **Meeting detail** shows the
Meet link, agenda, RSVP counts, invitee list with accept/pending/decline controls, and notes,
transcript and documents for past meetings. **Thread** shows the project group with a composer;
sending appends to `p.msgs` and reopens the thread at the new message.

### 4.4 Projects (`#/projects`)
Search, stage and status filters, sort by value/delay/name, and a dense table of 55 projects with
stage progress, status, value and next due. Every row opens the project page.

### 4.5 Project (`#/project/:id`)
Stage stepper and days, promised/forecast/silence, full team with Manage, payments ladder with
review and receipt actions, money card with ledger, WhatsApp card and thread, upcoming and past
meetings with New, file versions with render thumbnails and document rows, recent log, edit, pause
and close.

### 4.6 Performance (`#/performance`)
Four bands — Sales, Design, Production, Marketing — each with ranked people cards showing the
headline metric, live projects and earned value. "All ”¦" opens the department page.

### 4.7 Department (`#/dept/:dept`)
Collected/live/people tiles, a bar chart of the department's primary metric by person, a complete
table (name, three metrics, earned) and a load grid. Columns differ per department: Sales = leads,
calls, conversion; Design = renders, approval, revisions; Production = sites, slip days, snags;
Marketing = leads, cost per lead, content.

### 4.8 Money (`#/finance`)
Collected, paid out and salary due tiles; salary table with Pay and All salaries; New transaction;
earned by project; this month by week and by month charts; recent payments; full movement ledger
and period drill-downs.

### 4.9 Clients (`#/clients`)
53 clients with project count, city, collected, outstanding and lifetime value. A profile shows
lifetime value, collected, phone, city and every project, each opening the project page.

### 4.10 People (`#/people`)
Department and role filters, with each person's project count, headline metric, rating and status.
The profile drawer adds earned, salary, rating, department metrics, workload, projects, log in as,
leave, message and hibernate.

### 4.11 Activity (`#/activity`)
Month calendar with event dots and a day filter, plus kind, person and project filters. The log is
grouped by day; each entry opens a detail sheet with the brief and tagged people.

### 4.12 Connections (`#/integrations`)
WhatsApp Business, Google Meet and meeting responses, each marked Not connected or Local demo with
the exact credentials or scopes needed.

### 4.13 Settings (`#/settings`)
Messaging window, client split, three stage durations, session length, reading voice, a link to
Connections and a demo reset.

---

## 5. Overlays

All modals use `openModal(html, variant)`; the variants are default (440 px), `wide` (600 px),
`doc` (document preview) and `thread` (580 px chat). `closeModal()` hides both modal and overlay.
The person drawer uses `openDrawer()`/`closeDrawer()`.

| Overlay | Opened by | Contents |
|---|---|---|
| Payment review | Payment approval, payment row | UPI proof, gate, amount, due, waiting time, contract, unlocks, earlier receipts; reject or confirm |
| Pay portal | Expense/Salary/Reimbursement approval, salary pay, new transaction pay | QR, payee, UPI, reference, screenshot upload, raise/check/approve metadata; I have paid |
| Leave | Leave approval | From/To, cover rows (person, scope, from/until, remove), approve with cover |
| Design review | Design approval | Render document, waiting time, reject or approve & send |
| Document | Receipt, file, bill | Page mock of a quotation or receipt, Open the PDF |
| Edit project | Project header | Name, value, stage, promised date, design partner, production manager, sales rep |
| Team | Project team card | Current team with remove, add select, Done |
| Person drawer | People, performance, activity links | Earned, salary, rating, dept metrics, workload, projects, login-as, leave, message, hibernate |
| Meeting create | New meeting | Project, title, date, time, agenda, participant checkboxes |
| Meeting detail | Meeting cards, past rows, project page | Meet link, agenda, RSVP counts, per-invitee controls, notes, transcript, files |
| Thread | Messages, WhatsApp card | Bubbles in/out, composer, Send, Open in WhatsApp |
| Salary | Salary rows | Amount, pay-on date, status, Save changes, Pay now |
| All salaries | Salary card, approvals | Every salary with status and Pay |
| New transaction | Approvals, Money, top-level | Payee, amount, category, note, send for approval or pay now |
| Files | Project files card | Version tabs, render thumbnails, quotation/invoice rows, Open PDF |
| File | File rows, thumbnails | Render or document, version history, Open file |
| Client | Client rows | Lifetime value, collected, phone, city, project links |
| More | Account block | People, Clients, Activity, Connections, Settings, read brief, log in as, log out |
| Login as | More, person drawer | Ten teammates; switching changes the acting user without permissions |
| Project ledger | Money card, earned by project | Payment history and documents for one project |
| Period | Week/month chart | Payments behind a period |
| Movement | Recent, Money | Full in/out ledger |

---

## 6. Actions

One delegated click listener on `document`. Every interactive element carries `data-act`; some also
carry `data-id`, `data-v`, `data-to`, `data-set`, `data-person`, `data-mid`, `data-kind` or
`data-mode`.

```
route open-project back-projects open-person close-drawer close-modal more login-as-sheet
login-as sign-out edit-project save-project pause close-project
approval-tab payment-tab payment-tile design-review design-approve approve reject reject-confirm
leave-flow leave-person leave-add-cover leave-remove-cover leave-confirm
review-payment review-confirm review-reject confirm confirm-confirm pay-portal pay-upload pay-confirm
comm-tab msg-size meeting new-meeting create-meeting rsvp thread send-thread open-wa
dept salary salary-all salary-save salary-pay new-tx tx-create money-project period movement
files file team team-add team-remove team-done client cal-day activity act-clear
filter-stage filter-status sort person-role people-dept activity-kind
message hibernate silence edit-setting reset listen open-doc
```

The event handler is grouped by task; route and project switches close any open modal or drawer
first. Escape closes overlays; `/` focuses global search.

---

## 7. State and routing

```js
const state = {
  route, search, stageFilter, statusFilter, sort,
  approvalTab, paymentTab, personRole, peopleDept,
  activityKind, actProject, actPerson, actDay,
  commTab, msgSize, dept, clientSearch,
  drawer, drawerId, projectId, actingAs
};
```

`render()` rebuilds the shell and dispatches to the view for `state.route`; several filters rerender
only `#view` to avoid rebuilding the shell. `actingAs` changes the greeting and the account block,
and is deliberately not an authorisation system.

---

## 8. Search and speech

- **Global search** in the top bar groups matches into Projects, People and Payments. `paintSearch(q)`
  renders the panel; `/` focuses the input; clicking outside closes it.
- **Speech** uses `speechSynthesis`. `pickBestVoice()` prefers Indian English female voices, then
  any English voice, and `speechText()` expands `₹1.19 Cr` into spoken rupees/crore phrasing. The
  brief speaker and the Settings voice picker share the selected voice.

---

## 9. Integrations — what is real

| Thing | Truth |
|---|---|
| WhatsApp | Not connected. Threads are seeded per project. The composer appends locally; Open in WhatsApp opens web.whatsapp.com. |
| Google Meet | Not connected. Links are generated in Meet's format from the project id, not real rooms. |
| Invitations | Not sent. New meetings record participants as pending. |
| RSVP | Stored on the meeting record. The controls are a local demonstration. |
| Payment QR | Generated SVG from a hash of the reference, not a UPI intent. |
| Files | Generated mock artefacts per project and version. No upload, no storage. |

The Connections screen states the same in the product.

---

## 10. Running and testing

- Open `md-app.html` in a browser. The app caps at 1440 × 900 and shrinks to the window; 1280 px wide is comfortable.
- `?selftest=1` runs **48 assertions** against the live state: approve, reject, confirm, decision
  debt, leave cover, meeting creation, Meet link, RSVP, message append, team add/remove and workload,
  file versions, performance, department, finance, clients, connections, login-as, activity, project
  page, approval tiles, design review, salary payment, new transaction, search, QR and document
  preview. It prints a pass/fail card.
- Demo deep links: `?demo=review`, `pay`, `leave`, `file`, `files`, `edit`, `meeting`,
  `meeting-detail`, `thread`, `team`, `salary`, `salary-all`, `tx`, `client`, `design`, `more`,
  `login-as`, `search`, `rail`.
- `window.onerror` prepends a red bar with the message and source line.

---

## 11. Design system

Manrope, 400–800. Canvas `#EEEFF5`, surface `#fff`, ink `#15162B`, ink2 `#5A5D74`, ink3 `#6E7288`,
line `#E6E7F0`, rail `#17162A`. Cobalt `#2E4BF2`, coral `#F26A5B`, mint `#1F9D6B`, amber `#C98A14`,
lavender `#B9B3F2`, each with a soft tint. Cards use 18 px radii and a soft shadow; tables are dense
with 10–13 px text; the rail is dark and expands on hover. Charts are CSS bars, not images.

---

## 12. Parity with the mobile build

Both builds render the same model and expose the same operations: dashboard, approvals and every
approval type, payments, meetings and RSVP, messages and mentions, projects and files, performance
and departments, money and payroll, clients, people and login-as, activity, connections, settings,
search, speech, deep links and a self-test.

The surfaces differ where a desktop should differ:

- Mobile uses five bottom tabs and bottom sheets; desktop uses a ten-item rail, full-width tables
  and modals, and keeps people in a right drawer.
- Desktop adds global search, denser tables, side-by-side charts, a project ledger and period /
  movement drill-downs.
- Mobile keeps the S/M/L message-card control; desktop keeps it too, but as a density control over
  the messages grid.
- The desktop self-test is 48 assertions; the mobile self-test is 13.

There is no second model and no sync step: both load the same `data.js`.

---

## 13. Extending this

1. Add data in `data.js`, never inline in a view. Both surfaces see it at once.
2. Add a route by extending `ROUTES`, `applyHash()` and the dispatch in `render()`.
3. Add an interaction as a `data-act` branch in the single delegated listener.
4. Keep overlays to `openModal(html, variant)` and close with `data-act="close-modal"`.
5. Keep lists scoped to their parent: a project may only show its own messages, meetings and files.
6. Run `?selftest=1` after every change; a blank screen plus the red error bar means a view threw.
