# Client app · Desktop

The desktop client portal for HOMESIC: Ms. Rao's view of Villa 4B. It is the same client app as
`../client-app-mobile/`, rebuilt for a desktop at 1440 × 900 with the MD console's visual language.

Open `index.html`. No server, no build step, no install.

## Screens

| Screen | Route / demo | What it holds |
|---|---|---|
| Sign in | default | Split sign-in: lead number, OTP, optional email, Terms version |
| Home | `?demo=home` | Pinned render, stage, next meeting, payment due, next steps, designs, files, schedule, team, references |
| Project | `?demo=project` | 14-stage tracker, current stage detail, next actions, stage history, team |
| Designs and files | `?demo=designs` | Version 5 current, older versions view-only with dates and change briefs, renders, quotations, drawings, invoices, receipts |
| Payments | `?demo=payments` | ₹1,40,000 due 14 Dec, ₹1,60,000 balance, four-step schedule, documents, receipts, pay and proof |
| Meetings | `?demo=meetings` | Next Google Meet, change request with tagged confirmations, past meetings |
| Messages | `?demo=messages` | Studio thread, project group invitation, team, office, composer |
| Catalogue | `?demo=catalogue` | Search, room filters, package grid, item detail, share, enquiry |
| Settings | `?demo=settings` | Profile, email, office, warranty, terms, devices, log out |
| Warranty | `?demo=warranty` | 10 years from handover, not active yet |
| Terms | `?demo=terms` | Version 1, agreed timestamp |

Overlay demos: `?demo=pay`, `?demo=proof`, `?demo=change`, `?demo=item`, `?demo=doc`,
`?demo=signin`.

## Working behaviours

- Sign in with the number on the enquiry (demo `9810095028`), OTP `123456`, optional email.
- Pay: QR, payee, reference, amount and due date; the real code is a studio-app handoff.
- Proof: one screenshot, waiting, rejected with reason and resend, then confirmed; only the MD confirms.
- Change a meeting time; the three tagged people confirm one by one.
- Join the project group from the invitation; the studio thread still works before joining.
- Version switch v1–v5; v5 renders and files, older documents are view-only and open at their own version.
- Catalogue filters and search; package detail; enquiry lands in the studio thread.
- Settings: add or change email, devices, office contact, warranty and terms.

## Self-test

`?selftest=1` runs 15 checks: payment figures, four split steps, version 5 current, v4 view-only,
three v5 renders, home due date, designs/payments/meetings/messages/catalogue/settings/warranty
views and the quote document.

## Files

```
index.html    shell
app.css       MD desktop styles plus the client screens
app.js        views, sign-in, actions, overlays, self-test
data.js       the client model (project, stages, payments, files, renders, team, catalogue, proxy docs)
fonts/        Manrope 400–800
assets/renders/   13 proxy exteriors and kitchens
assets/docs/      6 proxy HOMESIC quotations/proposals/PDFs
```

The style is the MD console's: dark rail, canvas `#EEEFF5`, white cards, cobalt primary,
coral/mint/amber statuses and Manrope. No client flow or content was taken from the MD app.

## Proxy renders and documents

The hero, version 5 renders and catalogue use 13 sample exterior and kitchen images from
`assets/renders/`. `assets/docs/` holds the three HOMESIC quotations, the 13-page proposal, the
Ashish Raj kitchen pitch and the estimator UI brief. They open as PDFs from **Designs → HOMESIC
documents**. They are proxy documents for layout testing, not Ms. Rao's contract; the project
figures remain ₹4,00,000, ₹1,40,000 due 14 Dec and ₹1,60,000 remaining.

Date and time fields use native calendar and clock inputs: **Request a new time** has date,
time and a live `Thu 26 Nov · 4:30 PM` preview; **Payment proof** has a calendar date field.

## Limits

- No backend, database or real WhatsApp/Google Meet connection; state is in memory.
- The QR is a demo pattern; the group link is a placeholder; team confirmations are simulated.
- Downloads are represented by a message in this prototype.
