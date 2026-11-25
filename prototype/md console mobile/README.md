# MD console · mobile

The phone build of the First Light MD console: the Managing Director's view of a Delhi NCR
interior firm — delivery health, approvals, payments, meetings, projects, people and performance —
designed thumb-first at 390 × 844.

Plain HTML, CSS and JavaScript. No framework, no build step, no server, no install. Open
`m-app.html` and it runs. At 480 px and narrower the app goes full-bleed; on a desktop it sits in a
390 × 844 phone frame. Everything is in memory, so a reload resets the demo.

## Open it

Open `m-app.html` in a browser. Keep the folder together: the CSS, the fonts, `data.js` and
`sample-quotation.pdf` are loaded beside it, and `data.js` must load before `m-app.js`.

## Demo links

Append a query string to `m-app.html` to land on a specific state:

| Link | What it shows |
|---|---|
| `m-app.html?demo=more` | More sheet over the dashboard |
| `m-app.html?demo=list` | Full client-approvals list |
| `m-app.html?demo=files` | Project files sheet (three versions) |
| `m-app.html?demo=file` | One file's detail sheet |
| `m-app.html?demo=meeting` | New meeting sheet |
| `m-app.html?demo=meeting-detail` | First upcoming meeting's detail |
| `m-app.html?demo=thread` | Project WhatsApp thread |
| `m-app.html?demo=team` | Project team sheet |
| `m-app.html?demo=salary` | Salary sheet |
| `m-app.html?demo=tx` | New transaction sheet |
| `m-app.html?demo=past` | Projects tab, Past filter |
| `m-app.html?demo=comms` | Meetings & Messages tab |
| `m-app.html?demo=approvals` | Approvals tab, client and internal bands open |
| `m-app.html?demo=payments` | Approvals → Payments, first receipt open |
| `m-app.html?demo=integr` | Connections screen |

Hash routes also work: `#/home`, `#/approvals`, `#/comms`, `#/projects`, `#/project/PRJ-001`,
`#/performance`, `#/dept`, `#/clients`, `#/finance`, `#/people`, `#/activity`, `#/settings`,
`#/integrations`.

## Self-test

Open `m-app.html?selftest=1`. It runs 13 assertions — team add/remove and workload, meeting
creation, the generated Meet link, pending RSVPs, message and meeting scoping, approvals in three
bands, and the four payment states — then prints a pass/fail card. The in-page error handler shows a
toast if any view throws, which is the fastest way to diagnose a blank screen.

## Files

```
m-app.html              shell: fonts, CSS, data.js then m-app.js, error toast
m-app.css               the design system
m-app.js                views, sheets, actions, router
data.js                 seed, entities and derived helpers (must load first)
fonts/                  Manrope 400/500/600/700/800 woff2
sample-quotation.pdf    stand-in document used by the PDF previews
```

## What is real and what is not

The screens run against one deterministic seeded model: 55 projects, 30 people, 53 clients, and
their payments, approvals, meetings and messages. Nothing is connected to a backend, a database or
WhatsApp. WhatsApp threads, Meet links, RSVP responses, payment QR codes and uploaded files are
local demonstrations; the Connections screen states this in the product. The desktop build loads this
same `data.js`, so both surfaces show one model. The desktop build lives in
[`../md%20console%20Desktop/`](../md%20console%20Desktop/) and its guide is
[`../../DESKTOP_APP_GUIDE.md`](../../DESKTOP_APP_GUIDE.md).

The complete build guide — data model, every screen, every sheet, every action, and every stub —
is [`../../MOBILE_APP_GUIDE.md`](../../MOBILE_APP_GUIDE.md).
