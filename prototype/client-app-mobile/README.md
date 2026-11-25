# First Light · Client app · Mobile UI prototype

A clickable prototype of the mobile client app for HOMESIC (Ms. Rao, Villa 4B).

Open `index.html` in any browser. No server, no build step, no install. It is one HTML file plus
the five Manrope files in `fonts/`, the proxy renders in `assets/renders/` and the proxy PDFs in
`assets/docs/`.

The visual language is the MD console's: Manrope 400–800, the `#EEEFF5` canvas, white cards,
cobalt `#2E4BF2` primary actions, coral/mint/amber statuses, 16 px card radii, the same chip and
bottom-tab treatment, and the same 390 px phone frame on wider screens. The client flows are the
client app's; the visual language is the MD console's.

## What it covers

- **Sign-in** — the number on the enquiry, six-digit code, resend, optional email after the code, Terms accepted every login with version and time stored, and a clear mismatch state that points to the office.
- **Home** — pinned render, sales representative, project-specific references, stage health, next meeting and payment, the 10 / 50 / 35 / 5 summary, catalogue row, team and client stories.
- **Projects** — the 14-stage strip opening at the current stage, stage detail sheets, the next meeting, payment due with its date, version 5 approved renders and current files.
- **Designs and files** — version 5 current, earlier versions view-only with dates and a short change brief; approved renders, quotations, drawings, invoices and receipts.
- **Payments** — ₹1,40,000 due 14 Dec against a ₹4,00,000 quotation, ₹1,60,000 remaining, four-step schedule, quotation and invoice documents, UPI sheet, proof upload with waiting/rejected/resend states, and receipts with the balance after each payment.
- **Messages** — the design partner and production manager, call windows, the office line, the project-group invitation, the private thread before joining and the group composer after.
- **Meetings** — next and past meetings, a Meet link, everyone tagged, and a change request that needs every tagged person to confirm.
- **Catalogue** — search, wrapping keyword chips and horizontal sections per room, with an entry panel that can be shared and can become a lead.
- **Settings** — profile, verified number, optional email, devices, office contact, warranty status, Terms version, and log out set apart.
- **Public site** — the entrance object, three reception choices, a short process, work gallery, designer profile and lead capture.

## Proxy renders and documents

- `assets/renders/` — 13 sample exteriors and kitchens used as proxy renders in the hero, version 5
  and the catalogue. They are not HOMESIC project photography.
- `assets/docs/` — six real HOMESIC files copied for the prototype: three quotations
  (`HS-MVQU55NO` ₹3,72,099, `HS-MVML7W13` ₹2,60,946, `HS-MVQVPO4X` ₹2,62,773), the 13-page
  proposal, the Ashish Raj kitchen pitch, and the estimator UI brief. They open as PDFs from
  **Designs → HOMESIC documents**.
- These are proxy documents for layout testing, not Ms. Rao's contract. The project figures stay
  on ₹4,00,000, ₹1,40,000 due 14 Dec and ₹1,60,000 remaining.

## Source alignment

This pass follows the handover documents, especially `wireframes/First_Light_Client_Wireframes_v4.md` and the client sections of the site map and specification:

- The client bottom bar is **Home · Projects · Meetings · Messages · Catalogue** (the 22 November decision), not the older Project / Files / Payments / Messages bar.
- Payment proof is uploaded **in the app, straight to the MD**; the design partner does not forward it.
- The payment figures are the corrected v4 figures: **₹4,00,000 quotation, ₹1,40,000 due 14 Dec, ₹1,60,000 balance**.
- All files in a round carry the same version number; version 5 is current, older versions are view-only.
- Money never appears without its due date. Only the MD confirms a payment.
- Contact details use the brochure numbers: **+91 85270 25058**, **+91 82104 54320**, **care@homsic.com**.
- The HOMESIC spelling is used, not HOMSIC.

## Prototype limits

- Phone calls and downloads are shown as copyable numbers and messages; they need the installed app.
- The WhatsApp group link is a placeholder.
- The payment QR is a demo pattern, not a live UPI code.
- Team confirmations for a meeting change are simulated.
- The sales representative, project references, catalogue lead times and prices are sample content.
- `S.email`, `S.joined`, the proof state and the meeting change live in memory only; a reload resets the demo.
