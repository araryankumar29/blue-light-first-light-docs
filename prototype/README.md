# Prototype

Working prototypes of First Light, split by the surface they run on and by audience. They are built,
clickable, and run from disk with no server or install.

| Folder | What it is | State |
|---|---|---|
| `md console Desktop/` | The MD console at up to 1440 × 900: dashboard, approvals, meetings, projects, performance, money, clients, people, activity, connections, settings. | Built and clickable |
| `md console mobile/` | The same product rebuilt thumb-first at 390 × 844: five tabs, bottom sheets, and every flow from the desktop. | Built and clickable |
| `client-app/` | One client link: chooses mobile or desktop and links both. | Built and clickable |
| `client-app-desktop/` | The client portal at 1440 × 900: home, project, designs, payments, meetings, messages, catalogue, settings. | Built and clickable |
| `client-app-mobile/` | The client portal at 390 × 844, in the MD visual language. | Built and clickable |

The two MD builds load the same model, `md console mobile/data.js`. Change the seed, an entity or a
derived helper there once and both surfaces follow. The client apps have their own model and a copy
of the proxy renders and HOMESIC PDFs.

## Opening the desktop prototype

Open `md console Desktop/md-app.html` in a browser. It needs no server and no install: the
stylesheet, script, fonts and shared `data.js` are one folder away. It is a single page application
with real state — approvals move, payments settle, meetings are booked, RSVPs change, teams are
edited, filters and search work — but everything is in memory. Reloading resets the demo.

Every screen, overlay, action, demo link and the 48-assertion self-test are documented in
[`../DESKTOP_APP_GUIDE.md`](../DESKTOP_APP_GUIDE.md). The desktop README has the short version:
[`md console Desktop/README.md`](md%20console%20Desktop/README.md).

## Opening the mobile prototype

Open `md console mobile/m-app.html` in a browser. It is the same product rebuilt for a phone:
five tabs, bottom sheets, and a 390 × 844 layout that goes full-bleed below 480 px.

The mobile README lists every demo deep link and the self-test:
[`md console mobile/README.md`](md%20console%20mobile/README.md). Open the self-test directly at
`md console mobile/m-app.html?selftest=1`.

The complete thirteen-section mobile build guide is at
[`../MOBILE_APP_GUIDE.md`](../MOBILE_APP_GUIDE.md).

## Opening the client app

The client app has one link: open `client-app/index.html`. On a phone it leads with the mobile app;
on a wide screen it leads with the desktop app; both are also shown as cards.

- `client-app-mobile/index.html` — 390 × 844 client portal.
- `client-app-desktop/index.html` — 1440 × 900 client portal, with a `?selftest=1` 15-check self-test.
- Client desktop demo deep links: `?demo=home`, `?demo=project`, `?demo=designs`, `?demo=payments`,
  `?demo=meetings`, `?demo=messages`, `?demo=catalogue`, `?demo=settings`, `?demo=warranty`,
  `?demo=terms`; overlays `?demo=pay`, `?demo=proof`, `?demo=change`, `?demo=item`, `?demo=doc`.

The client apps carry 13 proxy renders and 6 real HOMESIC PDFs (three quotations, a proposal, the
Ashish Raj kitchen pitch and the estimator brief). They open from **Designs → HOMESIC documents**
in both surfaces. The PDFs are proxies for layout testing, not Ms. Rao's contract.

## What is real and what is not

Every MD number is generated from one seeded dataset of 55 projects and 30 people, so the MD screens
agree with each other across both builds. The client app uses the Villa 4B project model and keeps
the client figures consistent across both surfaces. Nothing is connected to a backend, a database,
or WhatsApp. Settings that would normally write to the server announce that they are stubs. The PDF
in `md console Desktop/sample-quotation.pdf` (and its twin in `md console mobile/`) is a real one-page
document, generated as a placeholder for file and receipt previews.
