# MD console · Desktop

The desktop MD console for First Light: the screen the managing director opens first, and every
surface behind it. Runs at up to 1440 × 900 and shrinks to fit the browser window, from disk, with no server and no install.

It loads the same model as the phone build, `../md console mobile/data.js`, so the two surfaces
never disagree about a project, a payment, a meeting or a person.

Open `md-app.html`.

## Screens

| Screen | Route | What it holds |
|---|---|---|
| Dashboard | `#/overview` | The brief, collection ring and daily bars, payment-gate ladder, decision debt, promises vs forecast, delay attribution, next meeting, needs-you and in-flight cards, trust strip |
| Approvals | `#/approvals` | Client, design, internal, leave and payroll queues; four payment-state tiles; decided items; new transaction; all salaries |
| Meetings & Messages | `#/comms` | Upcoming and past meetings, messages by project, mentions; meeting create/detail, RSVP toggles, threads |
| Projects | `#/projects` | 55 projects, filter by stage and status, sort by value, delay or name, search |
| Project | `#/project/PRJ-004` | Stage and timer, full team with Manage, payments ladder, money ledger, WhatsApp thread, meetings, files by version, recent log, edit/pause/close |
| Performance | `#/performance` | Sales, Design, Production and Marketing bands, ranked people cards, department drill-down |
| Department | `#/dept/Sales` | Collected/live/people tiles, metric chart, complete table, load rail |
| Money | `#/finance` | Collected, paid out, salary due; salary table and all salaries; new transaction; earned by project; week/month charts; movement ledger; recent |
| Clients | `#/clients` | 53 clients with projects, city, collected and outstanding; client profile with lifetime value and project links |
| People | `#/people` | 30 staff, department and role filters, headline metric, workload; profile with earned, salary, performance and login-as |
| Activity | `#/activity` | Month calendar with event dots, kind/person/project/day filters, grouped log; entry detail |
| Connections | `#/integrations` | WhatsApp Business, Google Meet and meeting responses — exactly what is connected and what each needs |
| Settings | `#/settings` | Tenant values, reading voice, connections and demo reset |

## What actually works

- **Approve** an item and it leaves the queue, decision debt drops, the log records it.
- **Reject** requires a written reason and sends it back.
- **Review & confirm** a client payment: screenshot, gate, amount, due date, waiting time, what it
  unlocks, what was already received — then confirm, which marks the stage paid and opens the receipt.
- **Pay** an expense, salary, reimbursement or new transaction: QR, payee, reference, screenshot
  upload, then the approved document. It lands under Payments → Paid out and the money ledger.
- **Design approvals** open the render document and approve or reject from there.
- **Leave**: choose the dates, then cover — one person or two, each with their own from and until.
- **Meetings**: book one, open its Meet link, toggle accept/decline/pending per invitee, read notes
  and transcripts for past meetings.
- **Messages**: read a project group, send a message, see mentions, open WhatsApp.
- **Projects**: edit name, value, stage, promised date and people; add or remove team members;
  browse file versions; pause or close.
- **Performance**: open a person from any band, drill into a department, chart the headline metric.
- **Money**: pay a salary, open all salaries, raise a transaction, inspect a project ledger, a
  period or the full movement ledger.
- **Clients**: open a profile, see lifetime value and jump into any of their projects.
- **People**: filter by department, open a profile, log in as a teammate, hibernate or put on leave.
- **Activity**: filter by kind, person, project or day; open any entry.
- **Search** from any screen, grouped into projects, people and payments.
- **Read the brief aloud**, with a voice picker that prefers Indian English.

## Demo shortcuts

Append to the URL to open a specific state:

| Link | Shows |
|---|---|
| `?demo=review` | Payment review with the UPI proof |
| `?demo=pay` | Pay portal with QR and screenshot upload |
| `?demo=leave` | Leave approval with cover rows |
| `?demo=file` | One file with its version history |
| `?demo=files` | The project files sheet, current version |
| `?demo=edit` | Edit project |
| `?demo=meeting` | New meeting |
| `?demo=meeting-detail` | The next meeting's detail with RSVP controls |
| `?demo=thread` | A project WhatsApp thread |
| `?demo=team` | Project team management |
| `?demo=salary` | Salary sheet |
| `?demo=salary-all` | All salaries |
| `?demo=tx` | New transaction |
| `?demo=client` | A client profile |
| `?demo=design` | A design approval with the document |
| `?demo=more` | The account menu |
| `?demo=login-as` | Log in as a teammate |
| `?demo=search` | Global search with results |
| `?demo=rail` | The nav rail held open |

And `?selftest=1` runs 48 assertions against the live state — approve, reject, confirm, leave cover,
meetings, RSVP, messages, team add/remove, file versions, performance, departments, salary payment,
transactions, clients, login-as, activity, search, QR, documents and paid-out — then prints the
result card.

## What is not wired

No backend, no database, no WhatsApp. State lives in memory, so a reload resets everything.
Settings changes are stubs that say so. WhatsApp threads and Meet links are local demonstrations.
The sample PDF is a placeholder document, not a real quotation.

## Files

```
md-app.html     the shell
md-app.css      the design system: tokens, cards, tables, charts, calendar, modals
md-app.js       data-aware views, routing, actions, self-test
fonts/          Manrope 400–800, so it renders offline
sample-quotation.pdf   placeholder document for file and receipt previews
```

The model is **not** in this folder. `md-app.html` loads `../md console mobile/data.js` before
`md-app.js`, so keep the two prototype folders together. The full build guide is
[`../../DESKTOP_APP_GUIDE.md`](../../DESKTOP_APP_GUIDE.md); the phone build is documented in
[`../../MOBILE_APP_GUIDE.md`](../../MOBILE_APP_GUIDE.md).
