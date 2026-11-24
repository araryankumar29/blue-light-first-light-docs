# Client app · Desktop

The MD console for First Light: the screen the managing director opens first, and everything behind it.

Open `md-app.html`. No server, no build step, works offline.

## Screens

| Screen | Route | What it holds |
|---|---|---|
| Overview | `#/overview` | The brief, collection ring and daily bars, the payment-gate ladder, decision debt, promises versus forecast, delay attribution, trust strip |
| Projects | `#/projects` | 55 projects, filter by stage and status, sort by value, delay or name, search |
| Project | `#/project/PRJ-004` | Stage and timer, payment ladder, team, money, six files, recent activity, edit form |
| Approvals | `#/approvals` | 16 items sorted by cost of delay: payments, leave, expenses, salary, reimbursements |
| Payments | `#/payments` | Awaiting confirmation, overdue, due, paid, and money paid out |
| People | `#/people` | 30 staff, profiles with rating, workload, leave, hibernate |
| Activity | `#/activity` | The append-only log, filtered by kind |
| Settings | `#/settings` | Tenant values as the specification defines them |

## What actually works

- **Approve** an item and it leaves the queue, decision debt drops, the log records it.
- **Reject** requires a written reason and sends it back.
- **Review & confirm** a client payment: the client's UPI screenshot, the gate, the amount, the due date, how long it has waited, what it unlocks, what was already received — then confirm, which marks the stage paid and opens the receipt.
- **Pay** an expense, salary or reimbursement: QR, payee, reference, screenshot upload, then the approved document. The payment lands under Payments → Paid out.
- **Leave**: choose the dates, then cover — one person or two, each with their own from and until dates.
- **Edit a project**: name, value, stage, promised date, and the three people on it.
- **Search** from any screen, grouped into projects, people and payments.
- **Read the brief aloud**, with a voice picker that prefers Indian English.

## Demo shortcuts

Append to the URL to open a specific state:

`?demo=review`, `?demo=pay`, `?demo=leave`, `?demo=file`, `?demo=edit`, `?demo=search`, `?demo=rail`

And `?selftest=1` runs 21 assertions against the live state — approve, reject, confirm, leave cover, search, QR, document preview, paid-out — and prints the result.

## What is not wired

No backend, no database, no WhatsApp. State lives in memory, so a reload resets everything. Settings changes and the message action are stubs that say so. The sample PDF is a placeholder document, not a real quotation.

## Files

```
md-app.html     the shell
md-app.css      the design system: tokens, cards, tables, modals
md-app.js       data, routing, views, actions
fonts/          Manrope 400–800, embedded so it renders offline
sample-quotation.pdf   placeholder document for file and receipt previews
```
