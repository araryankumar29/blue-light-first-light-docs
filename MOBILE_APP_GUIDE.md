# First Light · MD Mobile — complete build guide

Written so another session (or another person) can pick this up cold: what the app is, how it is
put together, every screen, every sheet, every action, and every place where something is a stub.

---

## 1. What this is

A single-page prototype of the Managing Director's mobile console for **Homesic**, a Delhi NCR
interior design firm. It is plain HTML, CSS and JavaScript. No framework, no build step, no server,
no database. Open `m-app.html` and it runs. All state is in memory; a reload resets it.

Files:

```
m-app.html    shell: loads fonts, css, data.js, m-app.js, error banner
m-app.css     the whole design system (554 lines)
data.js       the mobile model: seed, entities, derived helpers
m-app.js      views, sheets, actions, router (~112 KB)
fonts/        Manrope 400/500/600/700/800 woff2
sample-quotation.pdf   stand-in document used by the PDF previews
```

`m-app.html` must load `data.js` **before** `m-app.js`. The app assumes the globals `projects`,
`staff`, `approvals`, `proofs`, `salaries`, `meetings`, `activity`, `TODAY`, `MD` and the helpers
below already exist. The desktop build starts from the same seeded generator but keeps its own
inline copy of the model (section 12).

---

## 2. Data model (`data.js`)

Deterministic seed: an LCG starting at `20261122`, with `rnd/ri/pick/chance` helpers. `TODAY` is
fixed at `2026-11-22T09:41:00+05:30`. Re-running never changes the numbers.

| Entity | Shape | Notes |
|---|---|---|
| `projects` | 55 items: `id, name, client, city, value, stage(0-3), day, target, promised, forecast, slip, status, dp, pm, rep, team[], payments[], fileSets[], msgs[]` | stage 3 or status Closed = past |
| `payments` | per project: `stage, pct, amount, dueOn, paidOn, status` | status: `paid`, `due`, `overdue`, `proof` |
| `staff` | 30 items: `id, name, role, initials, tint[bg,fg], rating, wip, leave, status` | role drives department |
| `approvals` | 16+3: `id, type, title, sub, amount, ageH, projectId, person, status, payId` | types: Payment, Design, Expense, Salary, Reimbursement, Leave |
| `proofs` | 7 payment proofs: `id, projectId, stage, amount, at, ageH` | what the MD confirms |
| `salaries` | one per non-MD person: `id, person, amount, due, status` | amounts cycle 48k/62k/85k/1.1L/1.75L |
| `meetings` | `id, title, projectId, client, date, hour, minute, participants[{id,rsvp}], past, link, notes, transcript, files[]` | rsvp: accepted / declined / pending |
| `outGo` | money paid out: `{title, amount, to, at}` | created by pay-confirm / salary pay / transactions |
| `activity` | 40 entries: `id, at, who, initials, tint, kind, text` | feeds the activity log |

Derived helpers in `data.js`: `monthStats()`, `ladder()`, `pendingApprovals()`, `debtTotal()`,
`atRisk()`, `stagesGreen()`, `upMeetings()`, `pastMeetings()`, `meetingsOf(p)`, `mentions`,
`rsvpCount(m)`, `clientList()`, `deptOf()`, `metricsFor()`, `chart helpers weekBars/monthBars/dayBars`.

`lakh()` and `inr()` format Indian currency. `fmtDate()` gives `22 Nov`. `esc()` escapes HTML.

---

## 3. Navigation

Five bottom tabs, always visible, plus two header controls.

```
[ Dashboard ] [ Approvals ] [ Meetings ] [ Projects ] [ Performance ]
```

- **Header left:** back arrow, shown only on sub-screens (project, people, activity, settings,
  integrations, clients, sales, dept, finance).
- **Header right:** `₹` money button, then the avatar. The avatar opens the **More sheet**.
- Approvals tab shows a coral badge with the pending count. Meetings shows a badge with mentions.

Hash routing: `#/home`, `#/approvals`, `#/comms`, `#/projects`, `#/project/PRJ-004`,
`#/performance`, `#/dept`, `#/clients`, `#/finance`, `#/people`, `#/activity`, `#/settings`,
`#/integrations`. `route(r, id)` sets state, writes the hash and re-renders. `#/more` redirects to home.

---

## 4. Screens

### 4.1 Dashboard (`md.tab = 'home'`)
1. **Delivery health** card — stacked bar of live projects: on track / past target / need action,
   with a legend and counts. Below it, "Where the work sits": four bars by stage with counts.
2. **Greeting** — circular blue speaker button, "Hi Arya — good morning", and one assistant line
   built by `goodNews()`: collected this month, projects on plan, next meeting.
3. **Next meeting** card — title, client, invited count, tapping opens the meeting sheet.
4. **Collected** card — big figure, ring at 46%, 22-bar sparkline, outstanding line.
5. **Decision debt** — dark card, total blocked, opens Approvals.
6. **Needs you** — three rows (client / internal / leave) with counts, each opens Approvals.
7. **In flight** — top 3 at-risk projects as cards.

### 4.2 Approvals (`#/approvals`)
Bands, each with a **"All …"** button that opens the full list in a sheet:
Client approvals · Internal approvals · Leave · Payroll · Payments to receive (four state tiles:
In review, Overdue, Due, Received — tapping a tile opens that list) · Payments to make ·
Other transactions · Decided. A **+ New transaction** button sits at the top.

Cards show a coloured type chip, project or person, amount, and age in hours.

### 4.3 Meetings & Messages (`#/comms`)
- **Upcoming** — horizontal cards: date, time, title, client, invited count, RSVP split. Plus a
  "New meeting" card and a primary button.
- **Messages** — S/M/L size control, then conversation cards (WhatsApp dot, last message, time).
- **Mentions** — every message that tagged the MD, with project.
- **Past meetings** — list rows with date, time, client.

### 4.4 Projects (`#/projects`)
Search field, chips `All · Active · Past · Design · Production · Installation`, counts line
("50 active · 5 past · ₹18.69 Cr"), then project cards. Each card: name, status chip, stage and day,
progress bar. Past projects are shown under the **Past** chip and behind a "Past projects → View all"
card at the end of the list.

### 4.5 Project (`#/project/:id`)
Stage card (big day count, stepper, stage labels) → three stats (days left, promised, forecast) →
**Team** row with avatars and Manage → **WhatsApp** card → **Meetings** (next + past) →
**Files** (three tiles: Renders / Quotations / Invoices, render thumbs, version rows) →
**Payments** ladder with Review buttons on proofs → Edit / Pause / Close.

### 4.6 Performance (`#/performance`)
Four bands — Sales, Design, Production, Marketing — each a rail of people cards with their
headline metric and a **View all**. View all opens the department page.

### 4.7 Department page (`#/dept`)
Collected / live / people tiles; a bar chart of the department's primary metric; a **complete table**
(name, three metrics, earned); and a load rail. Columns differ per department:
Sales = leads, calls, conversion · Design = renders, approval, revisions ·
Production = sites, slip days, snags · Marketing = leads, cost per lead, content.

### 4.8 Money (`#/finance`)
Month tiles (collected, paid out, salary due) → Salary rail → Move money (+ New transaction) →
Earned by project → This month by week → By month → Money movement (7-day in/out chart) → Recent.

### 4.9 Clients (`#/clients`)
Client rows: initials, name, project count, city, lifetime value. Tapping opens the client sheet
with phone, city, value, a short brief, and links to each project.

### 4.10 People (`#/people`)
Department chips (All, Sales, Design, Production, Leadership, Support), then every person with role,
project count and their headline metric. Tap opens the person sheet.

### 4.11 Activity (`#/activity`)
A month calendar (real grid, dots on days with events, today filled), two filters (project, person),
then entries grouped by day with a weekday header and the time on each row. Tapping an entry opens
the activity sheet.

### 4.12 Settings (`#/settings`)
Tenant values (messaging window, client split, stage durations, session) and the reading-voice picker.

### 4.13 Connections (`#/integrations`)
Three rows: WhatsApp Business, Google Meet, Meeting responses — each marked Not connected with the
exact credentials or scopes needed. This is the honest status page.

---

## 5. Sheets — every overlay, in detail

All overlays are bottom sheets: `openSheet(html)` fills `#sheet`, shows `#shade`, adds `.on`.
`closeSheet()` reverses it. Escape closes.

| Sheet | Opened by | Contents and actions |
|---|---|---|
| **Payment review** | a Payment approval, or Review on a project payment | UPI proof card (amount, reference, sent date, status Success), screenshot caption, gate, due, waiting hours, **attach block** (screenshot.jpg + bill.pdf), Reject / Confirm receipt |
| **Pay portal** | Expense / Salary / Reimbursement approval | QR SVG, to/UPI/ref, upload drop zone, attach block, category, approved by, View bill / I have paid |
| **Leave** | Leave approval | From / To dates, cover rows (person, scope, from, until), + Add another person, Approve with this cover |
| **Design approval** | Design approval | Document page mock, waiting hours, Reject / Approve & send |
| **Document** | file tiles, View bill | Page mock of a quotation, Open the PDF, Done |
| **Edit project** | project Edit | Name, value, stage, promised date, Save |
| **Team** | project Team | Each member with Replace and ✕, + Add team member, Done |
| **Person** | People list | Earned / salary / rating, department metrics, workload, project list with status, Log in as / Hibernate |
| **Meeting create** | New meeting | Subject, client picker, participants (chips with ✕, + Add people), date, hour/minute/AM-PM, agenda, Create meeting |
| **Meeting detail** | meeting rows | Project, Meet link, agenda, accepted/declined/pending counts, invited list with RSVP chips and a toggle, past: notes, transcript, documents |
| **Thread** | WhatsApp card, Messages | Header with Open, message bubbles in/out with sender and time, composer, Send |
| **Salary** | Salary cards | Monthly amount, pay-on date, status, projects, Save changes / Pay now |
| **All salaries** | All salaries | Every person with amount, status and a Pay button |
| **New transaction** | + New transaction | Payee picker, amount, category (Salary / Expense / Reimbursement / Vendor / Advance), note, Send for approval or Pay now |
| **Pay flow** | Salary Pay, reimbursements | QR, to/UPI/ref, upload, attach block, category, Slip / I have paid |
| **List** | every band's "All …" | The full vertical list for that category |
| **Activity** | activity rows | The entry, a one-line brief, people tagged |
| **Client** | client rows | Phone, city, value, brief, project links |
| **Project money** | Earned by project | Payment history and documents for one project |
| **Period** | week/month bars | The payments behind that period |
| **Movement** | Money movement | Full in/out ledger |
| **Login as** | More | Eight teammates, Sign out, Cancel |
| **More** | avatar | Profile, Company (People, Clients, Activity), System (Connections, Settings), Account (Log in as, Log out) |
| **Pickers** | everywhere | `pickOne(title, items, current, cb)` and `pickMany(title, items, selected, cb)` with a tick state and a Done (n) counter |

---

## 6. Actions

One delegated click listener on `document`. Every interactive element carries `data-act`; some also
carry `data-id`, `data-v`, `data-k`, `data-t`, `data-set`, `data-project`.

```
go-tab back close project activity act-project act-person act-clear cal-day
ap-tab comm-tab acc stage tags filter size dept
approval review review-confirm review-reject approve-approval reject-approval
pay-confirm payflow-done salary salary-all salary-save salary-pay
leave-confirm add-cover doc edit save pause close-proj
new-tx pick-payee tx-create
team team-add team-remove team-replace
pick-one pick-toggle pick-done pick-client clear-client pick-people unpart
new-meeting create-meeting meeting rsvp
thread send open-wa open-wa-group
files file
person hibernate message upload listen
login-as-sheet login-as sign-out more-sheet list movement period money-project client
```

`window.__payDone` holds the callback for the shared pay flow, so a paid salary or reimbursement can
run its own side effect after the payment screen is confirmed.

---

## 7. State

```js
const md = { tab, apOpen{}, payOpen{}, commTab, msgSize, pid, q, stage, dept,
             meetingDraft, thread, actProject, actPerson, actDay, actingAs, tagOnly };
```

`render()` rebuilds the shell and calls `paint()`, which dispatches on `md.tab`. Rings animate after
paint via `requestAnimationFrame`.

---

## 8. Speech

`speechSynthesis`. `bestVoice()` prefers `en-IN` female voices, then any `en`, never `hi` first.
`speechText()` expands `₹1.19 Cr` into "1 crore 19 lakh rupees" phrasing. The speaker on the greeting
and the Settings picker both use it.

---

## 9. Integrations — what is real and what is not

| Thing | Truth |
|---|---|
| WhatsApp | Not connected. Threads are seeded per project. Composer appends locally and says "queued". "Open in WhatsApp" opens web.whatsapp.com. |
| Google Meet | Not connected. Links are generated in Meet's format from the project id, not real rooms. |
| Invitations | Not sent. Meeting creation records participants as pending. |
| RSVP | Stored on the meeting record. The toggle in the meeting sheet is for demonstration. |
| Payment QR | Generated SVG from a hash of the reference, not a real UPI intent. |
| Files | Generated mock artefacts per project and version. No upload, no storage. |

Connections screen states all of this in the product itself.

---

## 10. Running and testing

- Open `m-app.html`. At 480 px and narrower it goes full-bleed; above that it sits in a 390 × 844
  phone frame.
- `?selftest=1` runs 13 assertions (team add/remove and workload, meeting creation, Meet link,
  pending counts, project scoping of messages and meetings, approval bands, payment states) and
  prints a pass/fail card.
- Demo deep links: `?demo=more|list|files|file|salary|tx|meeting|meeting-detail|thread|team|past|comms|approvals|payments|integr`.
  The mobile README has the table of what each one opens.
- `window.onerror` shows a toast with the message, which is how blank screens get diagnosed.

---

## 11. Design system

Manrope, 400–800. Canvas `#EEEFF5`, surface `#fff`, ink `#15162B`, ink2 `#5A5D74`, ink3 `#6E7288`,
line `#E6E7F0`. Cobalt `#2E4BF2`, coral `#F26A5B`, mint `#1F9D6B`, amber `#C98A14`, each with a soft
tint for chips. Radii 18–20 for cards, 12–14 for rows, 99 for pills. Type scale: 8.5–9.5 labels,
10.5–12.5 body, 13–15 titles, 24–30 figures. 16px page margins, 22px between bands, 10px between cards.

---

## 12. Known gaps

- Nothing persists. Reload resets every change.
- No authentication; "Log in as" records a name but does not change permissions.
- Notifications badge counts are derived, not a real queue.
- Files, payments and meetings are seeded, so numbers will not reconcile with a real ledger.
- The desktop console keeps its own inline copy of the model. `data.js` is the mobile source of
  truth; the two start from the same seed but can drift.

---

## 13. If you are extending this

1. Add data in `data.js`, never inline in a view.
2. Add a route by extending the `md.tab` dispatch in `paint()`.
3. Add an interaction as a new `data-act` case in the single delegated listener.
4. Keep the pay flow shared: `payFlow(title, to, amount, ref, done)`.
5. Keep lists scoped to their parent: a project may only show its own messages, meetings and files.
6. Run `?selftest=1` after every change; a blank body plus an error toast means a view threw.
