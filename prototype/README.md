# Prototype

Working prototypes of First Light, split by the surface they run on.

| Folder | What it is | State |
|---|---|---|
| `client app Desktop/` | The MD console — overview, projects, approvals, payments, people, activity, settings. Runs in a browser at 1440 × 900. | Built and clickable |
| `client app mobile/` | The phone surface. Same product, thumb-first. | Placeholder — not built yet |

## Opening the desktop prototype

Open `client app Desktop/md-app.html` in a browser. It needs no server and no install: the stylesheet, script and the five Manrope weights sit beside it, so it works offline and straight from disk.

It is a single page application with real state — approvals move, payments settle, filters and search work — but everything is in memory. Reloading resets the demo.

## What is real and what is not

Every number is generated from one seeded dataset of 55 projects and 30 people, so the screens agree with each other. Nothing is connected to a backend, a database, or WhatsApp. Settings that would normally write to the server announce that they are stubs. The PDF in `client app Desktop/sample-quotation.pdf` is a real one-page document, generated as a placeholder for file and receipt previews.
