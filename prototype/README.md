# Prototype

Working prototypes of First Light, split by the surface they run on.

| Folder | What it is | State |
|---|---|---|
| `md console Desktop/` | The MD console — overview, projects, approvals, payments, people, activity, settings. Runs in a browser at 1440 × 900. | Built and clickable |
| `md console mobile/` | The phone surface. Same product, thumb-first at 390 × 844. | Built and clickable |

## Opening the desktop prototype

Open `md console Desktop/md-app.html` in a browser. It needs no server and no install: the
stylesheet, script and the five Manrope weights sit beside it, so it works offline and straight
from disk.

It is a single page application with real state — approvals move, payments settle, filters and
search work — but everything is in memory. Reloading resets the demo.

## Opening the mobile prototype

Open `md console mobile/m-app.html` in a browser. It is the same product rebuilt for a phone:
five tabs, bottom sheets, and a 390 × 844 layout that goes full-bleed below 480 px. It needs no
server and no install either.

The mobile README lists every demo deep link and the self-test:
[`md console mobile/README.md`](md%20console%20mobile/README.md). Open the self-test directly at
`md console mobile/m-app.html?selftest=1`.

The complete thirteen-section build guide is at
[`../MOBILE_APP_GUIDE.md`](../MOBILE_APP_GUIDE.md).

## What is real and what is not

Every number is generated from one seeded dataset of 55 projects and 30 people, so the screens
agree with each other. The mobile build keeps its model in `md console mobile/data.js`; the desktop
still carries its own inline copy of the same generator, so the two can drift (the guide's
section 12 says where). Nothing is connected to a backend, a database, or WhatsApp. Settings that
would normally write to the server announce that they are stubs. The PDF in
`md console Desktop/sample-quotation.pdf` (and its twin in `md console mobile/`) is a real one-page
document, generated as a placeholder for file and receipt previews.
