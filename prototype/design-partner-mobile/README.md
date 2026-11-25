# Design partner · Mobile app

The design partner's client-facing workspace for HOMESIC: Arjun's view of Villa 4B, Flat 7 and
the Sector 44 office. It follows the design-partner flow in the handover set: five tabs
**Home · Projects · Approvals · Meetings · More**, temporary pre-token projects, Design Head
approval, approving on the client's behalf, payment proof to the MD, and the 5% partner share.

Open `index.html`. No server, no build step, no install.

## What it covers

- **Sign in** — business email locked to `@homsic.com`, password, keep signed in for 15 days, no
  create-account link; demo `arjun@homsic.com` / `demo1234`.
- **Home** — live projects, temporary projects, what needs the partner, this week's meetings and
  the 5% ledger summary.
- **Projects** — live and temporary projects; project home with stage, days left, next date,
  client, team, pinned renders, approvals and stage timeline.
- **Token & handover** — a temporary project with the token due, 10% of the accepted estimate, a
  WhatsApp request and proof upload to the MD.
- **Approvals** — render and quotation versions, send to the Design Head, approve v5 in the
  client's name with their words and a timestamp, turn a client change into a priced add-on,
  restore a rejected version.
- **Estimate** — line items, add a line, Indian digit grouping, proxy HOMESIC PDF, send to the
  Design Head.
- **Meetings** — this week's meetings, accept/reject with a written reason, Google Meet link,
  transcript note.
- **More** — client payments, payment request and proof, 5% share and pay windows, messages,
  documents, leave, performance, settings and sign out.

## Proxy renders and documents

- `assets/renders/` — the same 13 proxy exteriors and kitchens used in the client app.
- `assets/docs/` — the six HOMESIC PDFs: three quotations (`HS-MVQU55NO` ₹3,72,099,
  `HS-MVML7W13` ₹2,60,946, `HS-MVQVPO4X` ₹2,62,773), the 13-page proposal, the Ashish Raj kitchen
  pitch and the estimator brief. Open from **More → Documents** or a quotation.
- These are proxy documents for layout testing, not Ms. Rao's contract. The project figures are
  kept on the client model: ₹4,00,000, ₹1,40,000 due 14 Dec, ₹1,60,000 remaining.

## Demo links

`?demo=home`, `?demo=projects`, `?demo=approvals`, `?demo=project`, `?demo=estimate`,
`?demo=docs`, `?demo=ledger`, `?demo=messages`, `?demo=meetings`, `?demo=meeting`,
`?demo=more`, `?demo=settings`.

## Limits

- No backend, database or real WhatsApp/Google Meet connection. State is in memory; a reload
  resets the demo.
- Uploads, the token request, the payment proof and the Design Head approvals are simulated.
- The QR is not in this app; the design partner forwards the proof the client sends on WhatsApp.
