# First Light - application sitemap

Every page in the application, what each page is for, who can open it, and what options sit on it. Built from the 14-document set of 22 November 2026, so every page carries the section it comes from.

| | |
|---|---|
| **Version** | 1.0, 22 November 2026 |
| **Areas** | 20 |
| **Pages** | 156 |
| **Options listed** | 597 |
| **Front ends** | 2 - staff app and client portal |
| **Roles** | 9 named roles, plus all staff and clients |
| **Sources** | Specification v19, App Flow v15, Architecture v20, Backend Schema v4, UI/UX Brief v1, Mobile Design Brief v1, Visual Direction v1, Tenant Settings v8, PRD v3, Implementation Plan v1, Spike Findings v1, Alert Retry Addendum v0.3, AI Context v19 |

## How to read this

| Term | Meaning |
|---|---|
| **Area** | A functional group of pages, such as Leads or Production. 20 areas in all. |
| **Page** | One screen a person can open. 156 in all. |
| **Option** | A control on that page: an action, a field, a section, a state or a rule the page enforces. 597 listed. |
| **Entry** | How the person reaches the page. |
| **Status** | Specified, partly specified, open, or out of scope. Only the first is safe to build. |
| **Source** | The document section that defines the page. |
| **Proposed path** | A suggested URL. It is not in the documents; it is here so a developer has something to name routes after. |

Options are listed in the order they would appear on the screen, top to bottom. Where a rule governs an option, it is written under Rules rather than repeated on every line.

---

## 0. Shell and navigation

Two front ends share one tenant. Staff work in a phone-first app with a fixed top bar and a bottom tab bar of four items plus More. Clients work in a portal with its own four tabs. Both use one column, 16 px side margins, and no horizontal scrolling.

| Role | Tabs, left to right |
|---|---|
| **MD** | Home · Approvals · Payments · Projects · More |
| **Sales Head** | Home · Leads · Calls · Meetings · More |
| **Sales representative** | Home · Leads · Calls · Meetings · More |
| **Design Head** | Home · Projects · Approvals · Meetings · More |
| **Design partner** | Home · Projects · Approvals · Meetings · More |
| **Production Head** | Home · Schedule · Stock · Crew · More |
| **Production Manager** | Home · Schedule · Stock · Crew · More |
| **Marketing Head** | Home · Posts · Spend · Brand · More |
| **Client** | Project · Files · Payments · Messages · More |

> **Conflict to settle before build.** The UI/UX Brief (section 4) gives a different bar for the same roles: the MD has no Home and gains Staff, sales gains Groups and Team instead of Calls and Meetings, the design partner gets Requests, and production gets Expenses. Only one of the two can be built. This document follows the Mobile Design Brief, because it is the build-facing one and it is the newer statement of the same date. Lead groups, Staff, Requests and Expenses currently have no tab under that bar.

Global rules that apply on every page:

- Money is shown in rupees with Indian digit grouping, always with the amount due or paid beside it, never alone.
- Dates read as day, month, year.
- A traffic light always carries a word; colour is never the only signal.
- Every action by anyone, including the MD, writes an append-only log entry.
- WhatsApp messages are sent only between 8 a.m. and 10 p.m.
- One primary action per page; secondary actions sit beside it.

---

## 1. Entry & access

Two front doors on one tenant. Staff sign in with a business email on the company domain. Clients sign in with the mobile number the lead was created with. The session is remembered for 15 days from the last visit and resets on every open.

**Who:** All staff, Client  ·  **Source:** Spec §22 · App Flow §1  ·  **Pages:** 5

### Staff sign-in

| | |
|---|---|
| **ID** | `signin-staff` |
| **Entry** | Launch, logged out |
| **Who** | All staff |
| **Status** | Specified |
| **Source** | Spec §22.1 |
| **Proposed path** | `/entry-access/staff-sign-in` |

**Purpose.** Email on the Miles Web company domain. The MD creates every account; nobody self-registers. 15-day rolling session, editable by the MD.

**Options.**

- Business email field, domain locked to the company
- Password field with show/hide
- Sign in
- Keep this device signed in for 15 days
- No create-account link; text tells the person to ask the MD

**Shows.**

- Company logo and name
- One error line under the field that failed

**Rules.**

- The MD creates every account, nobody self-registers
- The session resets on every open
- Changing the login ID ends all sessions

### Client sign-in — mobile + OTP

| | |
|---|---|
| **ID** | `signin-client` |
| **Entry** | Portal launch or invite link, logged out |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Spec §22.2 |
| **Proposed path** | `/entry-access/client-sign-in-mobile-otp` |

**Purpose.** Number must match the lead number. One-time code is the main method; Google can be linked as an option. OTP is required before the token payment and the invoice.

**Options.**

- Mobile number field, must match the number on the lead
- Send one-time code
- Six-digit code field with resend timer
- Continue with Google (optional link)
- Sign in

**Shows.**

- Their project name once recognised

**Rules.**

- OTP is required before the token payment and the invoice
- Nobody signs in on a client's behalf
- The client is never required to use the portal

### Session & device control

| | |
|---|---|
| **ID** | `session` |
| **Entry** | More ▸ Security, or the MD's staff record |
| **Who** | MD, All staff |
| **Status** | Specified |
| **Source** | Spec §22.3 · §24 |
| **Proposed path** | `/entry-access/session-device-control` |

**Purpose.** The MD can end any session at once, for a lost device or a leaver. Changing the login ID ends every session on that account. The person is signed out and gets a WhatsApp message saying so.

**Options.**

- List of active sessions with device, place and last seen
- End this session
- End all sessions for an account (MD only)
- End session on login-ID change, automatic

**Rules.**

- The person is signed out and gets a WhatsApp message saying so
- Every ending is logged

### Notifications (in-app)

| | |
|---|---|
| **ID** | `notifications` |
| **Entry** | Top bar, bell |
| **Who** | Everyone |
| **Status** | Partly specified |
| **Source** | UI/UX §5 |
| **Proposed path** | `/entry-access/notifications-in-app` |

**Purpose.** In-app list. Access-change notices land here and never on WhatsApp. No tab is allocated to it in either navigation brief.

**Options.**

- List, newest first
- Filter by kind: approvals, access changes, alerts
- Mark as read
- Open the item the notice is about

**Shows.**

- Access-change notices: who was given access to what, and by whom

**Rules.**

- Access changes appear here and never on WhatsApp

### Account states

| | |
|---|---|
| **ID** | `account-state` |
| **Entry** | Staff record ▸ Status |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §24 |
| **Proposed path** | `/entry-access/account-states` |

**Purpose.** Active, hibernated, deleted. Deleting removes only the login: projects stay and the name is labelled former staff. Hibernation can be reactivated.

**Options.**

- Status chip: active, hibernated, deleted
- Filter the staff list by status
- Reactivate a hibernated account (MD)

**Rules.**

- Deleting removes the login only; papers stay and the name reads former staff
- Hibernation keeps the account for reactivation

---

## 2. Home & dashboards

Every role opens on a default layout of charts. Each person can change their own charts and the choice follows them across devices. Charts are semicircle gauges and simple charts, always with the value written as words beside them.

**Who:** Everyone  ·  **Source:** Spec §15, §26.7 · UI/UX §4  ·  **Pages:** 11

### MD home

| | |
|---|---|
| **ID** | `home-md` |
| **Entry** | Home |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §26.7 |
| **Proposed path** | `/home-dashboards/md-home` |

**Purpose.** Payments received against due, team performance, pipeline funnel, delivery problems. Also a count of failed alerts.

**Options.**

- Hero card: payments received against due this month
- Pipeline funnel
- Team performance list
- Delivery problems card with a count, opens the list
- Approve shortcut to the approvals queue
- Customise my charts

**Shows.**

- Payments received against due
- Team performance
- Pipeline funnel
- Delivery problems

**Rules.**

- Every chart carries its value as words
- A miss on a target is a line on a chart, never an alert

### Sales Head home

| | |
|---|---|
| **ID** | `home-sh` |
| **Entry** | Home |
| **Who** | Sales Head |
| **Status** | Specified |
| **Source** | Spec §26.7 |
| **Proposed path** | `/home-dashboards/sales-head-home` |

**Purpose.** Lead sources, conversion funnel, call outcomes, team and project ratings.

**Options.**

- Lead sources chart
- Conversion funnel by step
- Call outcomes chart
- Team and project ratings
- Open leads, groups or team

**Shows.**

- Lead sources
- Conversion funnel
- Call outcomes
- Team and project ratings

### Sales rep home

| | |
|---|---|
| **ID** | `home-rep` |
| **Entry** | Home |
| **Who** | Sales rep |
| **Status** | Specified |
| **Source** | Spec §26.7 |
| **Proposed path** | `/home-dashboards/sales-rep-home` |

**Purpose.** My calls today, my follow-ups due, my weekly count, my rating.

**Options.**

- My calls today, with a start-calling action
- My follow-ups due
- My weekly count
- My rating

### Design Head home

| | |
|---|---|
| **ID** | `home-dh` |
| **Entry** | Home |
| **Who** | Design Head |
| **Status** | Specified |
| **Source** | Spec §26.7 |
| **Proposed path** | `/home-dashboards/design-head-home` |

**Purpose.** Renders and quotations awaiting approval, meetings this week, team and project ratings, estimates pending.

**Options.**

- Renders and quotations awaiting approval, opens the queue
- Meetings this week
- Team and project ratings
- Design estimates pending

### Design partner home

| | |
|---|---|
| **ID** | `home-dp` |
| **Entry** | Home |
| **Who** | Design partner |
| **Status** | Specified |
| **Source** | Spec §26.7 |
| **Proposed path** | `/home-dashboards/design-partner-home` |

**Purpose.** Temporary projects before the token, live projects with stage and days left, next deliverables, new client requirements and add-ons, time left on each design phase, payments due to me, my ledger, my rating.

**Options.**

- Temporary projects before the token
- Live projects with stage and days left
- Next deliverables due
- New client requirements and add-ons since my last visit
- Payments due to me and my ledger
- My rating

**Rules.**

- A project here before the token is visible to this partner only

### Production Head home

| | |
|---|---|
| **ID** | `home-ph` |
| **Entry** | Home |
| **Who** | Production Head |
| **Status** | Specified |
| **Source** | Spec §26.7 |
| **Proposed path** | `/home-dashboards/production-head-home` |

**Purpose.** Projects reaching production, expenses awaiting approval, crew on site, vendor spend.

**Options.**

- Projects reaching production
- Expenses awaiting my approval
- Crew on site today
- Vendor spend

### Production Manager home

| | |
|---|---|
| **ID** | `home-pm` |
| **Entry** | Home |
| **Who** | Production Mgr |
| **Status** | Specified |
| **Source** | Spec §26.7 |
| **Proposed path** | `/home-dashboards/production-manager-home` |

**Purpose.** Deliveries and installations this week, material payments due, crew attendance, my rating.

**Options.**

- Deliveries and installations this week
- Material payments due
- Crew attendance today
- My rating

### Marketing Head home

| | |
|---|---|
| **ID** | `home-mh` |
| **Entry** | Home |
| **Who** | Marketing Head |
| **Status** | Specified |
| **Source** | Spec §26.7 |
| **Proposed path** | `/home-dashboards/marketing-head-home` |

**Purpose.** Funnel per post, channel performance, spend requests and status, brand template status.

**Options.**

- Funnel per post
- Channel performance
- Spend requests and their status
- Brand template status

### Client home

| | |
|---|---|
| **ID** | `home-cl` |
| **Entry** | Project (first tab) |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Mobile §7 |
| **Proposed path** | `/home-dashboards/client-home` |

**Purpose.** Their project: stage, days left, next date, approved files, payment due with a pay-or-upload action, call-the-office.

**Options.**

- Project stage with a traffic light and a word
- Days left on the current stage
- Next date
- Payment due, with a pay or upload-proof action
- Approved files, pinned first
- Call the office

**Rules.**

- Only approved files appear
- No amount without its due date

### Choose my charts

| | |
|---|---|
| **ID** | `chart-library` |
| **Entry** | Settings ▸ My dashboard, or the pencil on Home |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §15 |
| **Proposed path** | `/home-dashboards/choose-my-charts` |

**Purpose.** Each person picks charts from a wide set. Saved to the account, follows the person across devices. The MD can change the role defaults.

**Options.**

- Chart picker grouped by kind: money, pipeline, people, stages
- Add chart, remove chart, reorder
- Preview at phone width
- Save to my account
- Reset to the role default

**Rules.**

- Choices follow the person across devices
- The MD sets the role defaults

### Targets & success metrics

| | |
|---|---|
| **ID** | `targets` |
| **Entry** | Settings ▸ Targets |
| **Who** | MD |
| **Status** | Specified |
| **Source** | PRD §4 |
| **Proposed path** | `/home-dashboards/targets-success-metrics` |

**Purpose.** Ten starting targets, each with a definition and an owner. Dashboard lines only: a miss signals review and never blocks work or sends an alert.

**Options.**

- Table of ten metrics with definition, owner and target
- Edit a target (MD)
- Show the metric on the owner's dashboard

**Rules.**

- Targets never block work and never send an alert

---

## 3. Leads & groups

Every enquiry enters as a lead with its source recorded, and all of them go to the Sales Head. The AI sorts leads into groups using eight fixed options only, then the Sales Head assigns a group to a representative with call windows and limits. He keeps full control: pull, reassign, hold or regroup at any time.

**Who:** Sales Head, Sales rep, MD  ·  **Source:** Spec §3, §6, §26.2 · App Flow §2  ·  **Pages:** 11

### Lead intake

| | |
|---|---|
| **ID** | `intake` |
| **Entry** | Leads ▸ New |
| **Who** | Sales Head |
| **Status** | Specified |
| **Source** | Spec §3 |
| **Proposed path** | `/leads-groups/lead-intake` |

**Purpose.** Leads arrive from the calculator now, later from campaigns and estimate tools. Each records its source; a calculator quotation travels with the lead.

**Options.**

- List of arriving leads with source and time
- Open a lead
- Filter by source: calculator, campaign, website

**Shows.**

- Calculator quotation, if one travelled with the lead

**Rules.**

- Every lead records its source
- All leads go to the Sales Head

### Lead inbox — every lead

| | |
|---|---|
| **ID** | `inbox` |
| **Entry** | Leads |
| **Who** | Sales Head |
| **Status** | Specified |
| **Source** | Spec §3 |
| **Proposed path** | `/leads-groups/lead-inbox-every-lead` |

**Purpose.** One list of all new leads before grouping. Nothing is lost between intake, the call and the meeting.

**Options.**

- Search by client ID, name or number
- Filter by source, status, age
- Sort newest or oldest
- Open lead card
- Select several and put them in a group

### Lead card

| | |
|---|---|
| **ID** | `lead-card` |
| **Entry** | Any lead row |
| **Who** | Sales Head, Sales rep, Design Head, Design partner |
| **Status** | Specified |
| **Source** | Spec §4, §7 |
| **Proposed path** | `/leads-groups/lead-card` |

**Purpose.** Client details from the first lead, full call and meeting history, transcripts, calculator quote, and every staff action under the client ID.

**Options.**

- Header: name, number, city, source, budget, age
- Call from here
- WhatsApp from here
- Move to another group or representative
- Hold the lead
- Open the project, if one exists
- Open the full history and log
- Copy the client ID

**Shows.**

- Every call, meeting and transcript
- Calculator quote
- Files
- The group it sits in

### Lead groups — AI grouping

| | |
|---|---|
| **ID** | `groups` |
| **Entry** | Leads ▸ Groups (Sales Head) |
| **Who** | Sales Head |
| **Status** | Specified |
| **Source** | Spec §3 |
| **Proposed path** | `/leads-groups/lead-groups-ai-grouping` |

**Purpose.** A group is defined only by the eight fixed options. No free keyword, ever. A group can be split into smaller parts using the same options.

**Options.**

- Group list with lead count and age
- New group
- Split a group
- Rename a group
- Assign to a representative
- Open the group

**Rules.**

- A group is defined only by the eight fixed options

### Group builder — the eight options

| | |
|---|---|
| **ID** | `group-builder` |
| **Entry** | Groups ▸ New, or Split |
| **Who** | Sales Head |
| **Status** | Specified |
| **Source** | Spec §3 |
| **Proposed path** | `/leads-groups/group-builder-the-eight-options` |

**Purpose.** State or city, project type, budget range, timeline, lead source, property type, client status, lead age. These eight and no others.

> The fixed list is a hard constraint in the spec, not a default.

**Options.**

- State or city selector
- Project type selector
- Budget range selector
- Timeline selector
- Lead source selector
- Property type selector
- Client status selector
- Lead age selector
- Live count of matching leads
- Save group

**Rules.**

- These eight options and no free keyword
- A group can be split again using the same eight

### Assign a group

| | |
|---|---|
| **ID** | `assign` |
| **Entry** | Groups ▸ Assign |
| **Who** | Sales Head |
| **Status** | Specified |
| **Source** | App Flow §2 |
| **Proposed path** | `/leads-groups/assign-a-group` |

**Purpose.** Assign a group to a sales representative and set the call windows and the call limit for that group.

**Options.**

- Pick the representative
- Call window start and end
- Call limit per day
- Note to the representative
- Assign and notify

### Pull · reassign · hold · regroup

| | |
|---|---|
| **ID** | `group-actions` |
| **Entry** | Group row, long press or More |
| **Who** | Sales Head |
| **Status** | Specified |
| **Source** | App Flow §2 |
| **Proposed path** | `/leads-groups/pull-reassign-hold-regroup` |

**Purpose.** The Sales Head can take a lead back, give it to someone else, park it, or move it into another group at any time.

**Options.**

- Pull a lead back to the Sales Head
- Reassign to another representative
- Hold
- Move to another group
- Reason, optional

**Rules.**

- The Sales Head keeps full control at any time

### Closed-leads file

| | |
|---|---|
| **ID** | `closed-leads` |
| **Entry** | Leads ▸ Closed |
| **Who** | Sales Head, MD, Design Head, Design partner, Sales rep |
| **Status** | Specified |
| **Source** | Spec §23.1 |
| **Proposed path** | `/leads-groups/closed-leads-file` |

**Purpose.** Quoted leads that never paid the token. Kept apart from live projects. Heads and the MD see all; design partners and reps see only the ones they worked on.

**Options.**

- List with outcome, owner and date
- Filter by owner or outcome
- Open the client record
- Bring a lead back (head or MD)

**Rules.**

- Heads and the MD see all; a design partner or representative sees only the ones they worked on

### Unresponsive archive

| | |
|---|---|
| **ID** | `unresponsive` |
| **Entry** | Leads ▸ Unresponsive, or Calls ▸ Archive |
| **Who** | Sales rep, Sales Head, MD |
| **Status** | Specified |
| **Source** | Spec §26.2 |
| **Proposed path** | `/leads-groups/unresponsive-archive` |

**Purpose.** Separate from closed leads and from the cold archive. A rep sees their own; the Sales Head and MD see all. Reps can call again or set a return date with a separate button, which moves the lead to its own scheduled list.

> A lead returns on the scheduled date with the project brief.

**Options.**

- My unresponsive leads, with attempts and last contact
- Call again now
- Set a return date
- Open the project brief for the return
- Scheduled returns list

**Rules.**

- Separate from closed leads and the cold archive
- A representative cannot delete them
- A return date moves the lead into its own scheduled list

### Stalled quotes

| | |
|---|---|
| **ID** | `stalled` |
| **Entry** | Leads ▸ Stalled quotes |
| **Who** | Sales rep, Sales Head |
| **Status** | Specified |
| **Source** | Spec §26.2 · Settings §5 |
| **Proposed path** | `/leads-groups/stalled-quotes` |

**Purpose.** A client holding a quote who keeps stalling. Follow up after 3 days of silence, up to 3 rounds, a new meeting after round 2 on the same temporary project, then not won after round 3. The lead stays live throughout.

**Options.**

- List with days of silence and round number
- Add a follow-up: catalogue, sample work, video or call
- Book a new meeting after round 2
- Mark not won after round 3 and move to closed leads

**Rules.**

- Follow up after 3 days of silence, up to 3 rounds; values change in tenant settings

### Cold archive

| | |
|---|---|
| **ID** | `cold` |
| **Entry** | Leads ▸ Archive ▸ Cold |
| **Who** | Sales Head |
| **Status** | Specified |
| **Source** | Spec §6 |
| **Proposed path** | `/leads-groups/cold-archive` |

**Purpose.** Not interested leads are archived as cold under their client ID, so a returning client is found by ID with the whole history ready.

**Options.**

- List of cold leads by client ID
- Open the client record and full history

**Rules.**

- A returning client is found by ID and gets a new project, never a linked one

---

## 4. Calls & retry

The representative works a queue and records exactly one outcome after each call. A lead that is not reached enters the retry cycle: three calls and three WhatsApp messages, a seven-day wait, a second pass, then the unresponsive archive.

**Who:** Sales rep, Sales Head  ·  **Source:** Spec §4, §26.2 · App Flow §3  ·  **Pages:** 7

### Today's calls

| | |
|---|---|
| **ID** | `queue` |
| **Entry** | Calls |
| **Who** | Sales rep |
| **Status** | Specified |
| **Source** | Mobile §7 |
| **Proposed path** | `/calls-retry/today-s-calls` |

**Purpose.** The day's queue with the group name and how many leads are left. One primary action: save and show the next lead.

**Options.**

- Today's list with group name and leads left
- Start calling
- Skip to the next lead
- Open the lead card

### Call card

| | |
|---|---|
| **ID** | `call-card` |
| **Entry** | Calls ▸ lead |
| **Who** | Sales rep |
| **Status** | Specified |
| **Source** | Mobile §7 |
| **Proposed path** | `/calls-retry/call-card` |

**Purpose.** Client, source, budget, attempt count out of the limit, and the required outcome field. Notes are optional.

**Options.**

- Client, number, city
- Source, budget, attempt count of the limit
- Call button and WhatsApp button
- Outcome field, required
- Notes, optional
- Save and show next lead

### Call outcome form

| | |
|---|---|
| **ID** | `outcome` |
| **Entry** | Call card ▸ Outcome |
| **Who** | Sales rep |
| **Status** | Partly specified |
| **Source** | Spec §26.2 · App Flow §3 |
| **Proposed path** | `/calls-retry/call-outcome-form` |

**Purpose.** The seven settled outcomes: meeting set, connected but no meeting, warm not now, not interested, not reached, indefinite delay, active but not responding. Choosing one reveals the next step.

> App Flow v15, the AI brief and the UI/UX brief still say four outcomes. The seven were settled in change request 1, Part A. This form must ship with seven.

**Options.**

- Meeting set: date, time, design partner tag, comment
- Connected, not yet a meeting
- Warm, not now: future date
- Not interested: moves to the cold archive
- Not reached: enters the retry cycle
- Indefinite delay: client postponed with no date
- Active but not responding: read, no reply

**Rules.**

- Exactly one outcome per call
- Choosing an outcome reveals the next step in one line
- The settled decision is seven outcomes, though three documents still say four

### Meeting set

| | |
|---|---|
| **ID** | `meeting-set` |
| **Entry** | Outcome ▸ Meeting set |
| **Who** | Sales rep |
| **Status** | Specified |
| **Source** | App Flow §3 |
| **Proposed path** | `/calls-retry/meeting-set` |

**Purpose.** Choose a date and time, tag a design partner, add a comment. The design partner must approve it and the Design Head is notified.

**Options.**

- Date picker
- Time picker
- Design partner picker
- Comment
- Save and request approval

**Rules.**

- The design partner must approve
- The Design Head is notified of every meeting

### Retry cycle view

| | |
|---|---|
| **ID** | `retry` |
| **Entry** | Call card ▸ Retry, or a lead marked not reached |
| **Who** | Sales rep, Sales Head |
| **Status** | Specified |
| **Source** | Spec §26.2 |
| **Proposed path** | `/calls-retry/retry-cycle-view` |

**Purpose.** Pass one: call, catalogues; call, three hours later testimonials; call, sample videos. Then a seven-day wait. Pass two repeats it once, then the unresponsive archive. Every message sits inside 8 a.m. to 10 p.m.

**Options.**

- First pass timeline: call, catalogues, call, testimonials 3 hours later, call, videos
- Seven-day wait, shown as a countdown
- Second pass
- Send the next message now
- Move to the unresponsive archive

**Rules.**

- Messages only between 8 a.m. and 10 p.m.; outside the window they wait until 8 a.m.
- Hours and days are tenant settings

### Call-back and delay

| | |
|---|---|
| **ID** | `callback` |
| **Entry** | Outcome ▸ warm or call-back |
| **Who** | Sales rep |
| **Status** | Specified |
| **Source** | App Flow §3 |
| **Proposed path** | `/calls-retry/call-back-and-delay` |

**Purpose.** A time given by the client is booked as a call the next day and logged. A postponement with no date marks the lead indefinite delay and moves it to the archive.

**Options.**

- Date and time given by the client
- Book as a call tomorrow
- Mark indefinite delay

### Call & contact history

| | |
|---|---|
| **ID** | `call-history` |
| **Entry** | Lead card ▸ History |
| **Who** | Sales rep, Sales Head, Design partner |
| **Status** | Specified |
| **Source** | Spec §4 |
| **Proposed path** | `/calls-retry/call-contact-history` |

**Purpose.** Every call, meeting and transcript kept in the client's history, with the end note and AI comments stored separately for each meeting.

**Options.**

- Timeline of calls, messages, meetings and notes, newest first
- Open a meeting, its end note and AI comments kept separately
- View-only

---

## 5. Meetings

A meeting is agreed on a call, approved by the design partner, and given a Google Meet link automatically from one company Workspace account. Nobody logs in to create it.

**Who:** Sales rep, Design partner, Design Head, Client  ·  **Source:** Spec §26.11 · App Flow §17  ·  **Pages:** 6

### Meeting booking

| | |
|---|---|
| **ID** | `meeting-book` |
| **Entry** | Lead card ▸ Book meeting |
| **Who** | Sales rep, Design partner |
| **Status** | Specified |
| **Source** | App Flow §3 |
| **Proposed path** | `/meetings/meeting-booking` |

**Purpose.** Date and time, tagged design partner, comment. The booking is what creates the temporary project once the design partner approves.

**Options.**

- Date and time
- Tag a design partner
- Comment
- Send for design partner approval

### Design partner accept / reject

| | |
|---|---|
| **ID** | `meeting-accept` |
| **Entry** | Design partner ▸ Requests |
| **Who** | Design partner |
| **Status** | Specified |
| **Source** | Spec §5 |
| **Proposed path** | `/meetings/design-partner-accept-reject` |

**Purpose.** Accept to close the deal. Reject only with a written reason, which is logged and visible to the rep, the Sales Head and the Design Head.

**Options.**

- Meeting details and client history
- Accept
- Reject with a written reason, required

**Rules.**

- A rejection reason is visible to the representative, the Sales Head and the Design Head, and is logged
- Accepting creates the temporary project

### Google Meet link

| | |
|---|---|
| **ID** | `meeting-link` |
| **Entry** | Meeting detail, or the group thread |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §26.11 |
| **Proposed path** | `/meetings/google-meet-link` |

**Purpose.** Created when a time is agreed. Posted to the project group if the client is in it, otherwise sent to the client's private number with a one-tap WhatsApp button.

**Options.**

- Join with Google Meet
- Send to the project group
- Send to the client's number with one tap
- Copy the link

**Rules.**

- Created automatically from one company Workspace account; nobody logs in
- Posted to the group if the client is in it, otherwise to the private number

### Meeting reminder

| | |
|---|---|
| **ID** | `meeting-reminder` |
| **Entry** | Automatic |
| **Who** | Sales rep, Client |
| **Status** | Specified |
| **Source** | Settings §13 |
| **Proposed path** | `/meetings/meeting-reminder` |

**Purpose.** A pre-written, approved template sent automatically from the company number.

**Options.**

- Reminder sent as an approved template
- Edit the reminder text (needs template approval)

### Transcript & notes

| | |
|---|---|
| **ID** | `meeting-transcript` |
| **Entry** | Meeting detail ▸ Transcript |
| **Who** | Sales rep, Design partner, Design Head |
| **Status** | Open - not approved to build |
| **Source** | Spec §23.4 |
| **Proposed path** | `/meetings/transcript-notes` |

**Purpose.** Meetbook or a similar plugin supplies the transcript and approval proof. Held until the architecture decision, so no screen is built yet.

**Options.**

- Transcript and approval proof, from the plugin
- Attach to the client history

**Rules.**

- Held until the architecture decision, so no screen is built

### Meetings this week

| | |
|---|---|
| **ID** | `meeting-list` |
| **Entry** | Meetings |
| **Who** | Design Head, Design partner, Sales rep |
| **Status** | Specified |
| **Source** | UI/UX §4 |
| **Proposed path** | `/meetings/meetings-this-week` |

**Purpose.** The week's meetings for the person, reachable from the tab bar for sales and design roles.

**Options.**

- This week, grouped by day
- Open a meeting
- Filter by role of the person in the meeting

---

## 6. Projects

A project starts temporary, visible only to the design partner, and becomes permanent when the token is paid. It carries its stage, timer, files, team and history, and only the people on it can see it.

**Who:** MD, Design Head, Design partner, Production Mgr, Production Head, Sales rep, Sales Head, Client  ·  **Source:** Spec §7, §23 · App Flow §5, §9  ·  **Pages:** 10

### Temporary project (pre-token)

| | |
|---|---|
| **ID** | `temp-project` |
| **Entry** | Projects ▸ Temporary |
| **Who** | Design partner, Design Head, MD |
| **Status** | Specified |
| **Source** | Spec §23.1 |
| **Proposed path** | `/projects/temporary-project-pre-token` |

**Purpose.** Created when the first meeting is approved. Visible to the design partner. Becomes permanent only when the token is paid.

**Options.**

- Temporary badge and the token that is due
- Client details and meeting history
- Upload a render or quotation
- Request the token payment
- Open the project brief

**Rules.**

- Visible to the design partner only
- Becomes permanent only when the token is confirmed

### Token & handover

| | |
|---|---|
| **ID** | `token` |
| **Entry** | Temporary project ▸ Token |
| **Who** | Design partner, MD, Client |
| **Status** | Specified |
| **Source** | Spec §23.1, §23.5 |
| **Proposed path** | `/projects/token-handover` |

**Purpose.** The token is 10% of the accepted estimate. The client pays by UPI and sends proof; the MD confirms; only then does the project become permanent.

**Options.**

- Amount due, calculated as 10% of the accepted estimate
- Send the payment request
- Upload the proof the client sent on WhatsApp
- Status: awaiting proof, with MD, rejected
- Receipt, once confirmed

**Rules.**

- Only the MD confirms
- The project moves forward only after confirmation

### Project team

| | |
|---|---|
| **ID** | `project-team` |
| **Entry** | Project ▸ Team |
| **Who** | MD, Design Head, Design partner |
| **Status** | Specified |
| **Source** | Spec §7 |
| **Proposed path** | `/projects/project-team` |

**Purpose.** Design partner, Design Head, booking representative and the company WhatsApp number. Anyone added to the project is added to its group by the software.

**Options.**

- Member list with role on the project
- Add a person, which also adds them to the group
- Remove a person, logged
- See the company WhatsApp number used

**Shows.**

- Design partner
- Design Head
- Booking representative
- Company number

### Project home / stage board

| | |
|---|---|
| **ID** | `project-home` |
| **Entry** | Projects ▸ project, or the client's Project tab |
| **Who** | MD, Design Head, Design partner, Production Mgr, Production Head, Sales rep, Client |
| **Status** | Specified |
| **Source** | UI/UX §5 |
| **Proposed path** | `/projects/project-home-stage-board` |

**Purpose.** Current stage, traffic light with a word, days left, next date, files and payments. One primary action per screen.

**Options.**

- Stage with traffic light and word
- Days left on the stage timer
- Next date
- Files, pinned first
- Payments due and paid
- Approvals waiting on me
- Project menu: team, access, pause, log

**Rules.**

- A client-caused pause reads paused by client and never yellow or red

### Stage timeline

| | |
|---|---|
| **ID** | `stage-timeline` |
| **Entry** | Project ▸ Stage history |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §21.2 |
| **Proposed path** | `/projects/stage-timeline` |

**Purpose.** Append-only log of every stage change, read-only, newest first, open to everyone on the project. A client-caused pause shows as paused by client and never yellow or red.

**Options.**

- Append-only list, newest first
- Filter by stage
- Open the entry behind a stage change

**Rules.**

- Read-only for everyone on the project
- Nothing can be edited or deleted

### Access request

| | |
|---|---|
| **ID** | `access-request` |
| **Entry** | A live project the Sales Head is not on |
| **Who** | Sales Head, MD, Design Head, Design partner, Sales rep |
| **Status** | Specified |
| **Source** | Spec §23.6 |
| **Proposed path** | `/projects/access-request` |

**Purpose.** The Sales Head sees a live project only by requesting access. Anyone already on the project can approve and add people. Requests and grants are logged.

**Options.**

- Request access from a representative, design partner, MD or Design Head
- Add a line saying why
- Approve a request and add the person (anyone on the project)
- Decline with a reason

**Rules.**

- Every request and grant is logged
- History requests were removed in v8

### Paused by client

| | |
|---|---|
| **ID** | `paused` |
| **Entry** | Project ▸ Status |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §6 |
| **Proposed path** | `/projects/paused-by-client` |

**Purpose.** A client who pays the token and then stops is paused at the current stage. Nothing is closed and files stay readable until it resumes.

**Options.**

- Pause with a reason and who caused it
- Resume
- Paused by client badge, timer held

**Rules.**

- Nothing closes while paused; files and history stay readable

### Closed project

| | |
|---|---|
| **ID** | `closed-project` |
| **Entry** | Projects ▸ Closed |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/projects/closed-project` |

**Purpose.** Finished projects stay in the client dashboard. The MD can write over a closed project, for example to record a refund. Human-only and logged.

**Options.**

- Read the closed record and its files
- Write over the record, for example a refund (MD only)
- Reason for the write-over

**Rules.**

- Human-only and logged
- The original entry stays visible

### Project rating

| | |
|---|---|
| **ID** | `project-rating` |
| **Entry** | Project ▸ Rating |
| **Who** | MD, Design Head, Production Head, Sales Head |
| **Status** | Specified |
| **Source** | Spec §14 |
| **Proposed path** | `/projects/project-rating` |

**Purpose.** Each project carries its own rating, reviewed on the Monday-to-Monday cycle.

**Options.**

- Rating for this week with the drivers
- Open the stage history that fed it

**Rules.**

- Reviewed Monday to Monday

### Client ID & returning clients

| | |
|---|---|
| **ID** | `client-id` |
| **Entry** | Search by client ID |
| **Who** | Sales Head, MD, Design Head |
| **Status** | Specified |
| **Source** | Spec §6 |
| **Proposed path** | `/projects/client-id-returning-clients` |

**Purpose.** Every client has one ID holding all meetings, transcripts, files and actions. A returning client gets a new, separate project: old projects are never linked to new ones.

**Options.**

- Search by ID or number
- Client record with every meeting, transcript, file and action
- Create a new project for a returning client

**Rules.**

- Old projects are never linked to new ones
- Blacklisting is handled outside the platform

---

## 7. Design & approvals

The design partner uploads renders and quotations and nothing reaches the client until the Design Head approves. Technical files go to the Production Manager instead. Every version is kept and every approval is logged in the client's name.

**Who:** Design partner, Design Head, Production Mgr, Client  ·  **Source:** Spec §8, §21.1, §23.3 · App Flow §6  ·  **Pages:** 8

### Upload renders & quotations

| | |
|---|---|
| **ID** | `design-upload` |
| **Entry** | Project ▸ Design ▸ Upload |
| **Who** | Design partner |
| **Status** | Specified |
| **Source** | App Flow §6 |
| **Proposed path** | `/design-approvals/upload-renders-quotations` |

**Purpose.** Uploads go to the Design Head first. Nothing is delivered to the client directly.

**Options.**

- Choose file, render or quotation
- Short brief of what changed in this version
- Send to the Design Head
- Save as draft

**Rules.**

- Nothing reaches the client before Design Head approval
- Each upload keeps its own version history

### Design Head approval queue

| | |
|---|---|
| **ID** | `design-approval` |
| **Entry** | Approvals tab (Design Head) |
| **Who** | Design Head |
| **Status** | Specified |
| **Source** | Spec §8 |
| **Proposed path** | `/design-approvals/design-head-approval-queue` |

**Purpose.** Renders and quotations awaiting approval, each as an approval card with approve and reject-with-reason. Only after approval does the file reach the client, through the company number.

**Options.**

- Queue of renders and quotations awaiting approval
- Approval card: what, amount or date, requester
- Approve
- Reject with a reason, required
- Open the file and its previous versions
- Approve several at once

**Rules.**

- Only after approval does the file reach the client, through the company number

### Technical files

| | |
|---|---|
| **ID** | `technical-files` |
| **Entry** | Project ▸ Design ▸ Technical |
| **Who** | Production Mgr, Design Head |
| **Status** | Specified |
| **Source** | Spec §8 |
| **Proposed path** | `/design-approvals/technical-files` |

**Purpose.** Technical files go to the Production Manager, who approves them, then to the client for verification. The Design Head does not approve technical files.

**Options.**

- Upload a technical file
- Approve (Production Manager)
- Send to the client for verification

**Rules.**

- The Design Head does not approve technical files

### Version history & brief of change

| | |
|---|---|
| **ID** | `versions` |
| **Entry** | Any file ▸ Versions |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §21.1 |
| **Proposed path** | `/design-approvals/version-history-brief-of-change` |

**Purpose.** Every file keeps its own version history with a short brief of what changed in each version. Older versions are view-only and sit in a dated section the client opens on purpose.

**Options.**

- Latest version, always shown first
- Dated history, opened on purpose
- Brief of change per version
- Download the current version
- Open an old version, view-only

**Rules.**

- The client sees approved versions only
- Rejected versions stay with the team, with the reason

### Pinned files

| | |
|---|---|
| **ID** | `pinned` |
| **Entry** | File ▸ Pin |
| **Who** | Design partner, Client |
| **Status** | Specified |
| **Source** | Spec §21.1 |
| **Proposed path** | `/design-approvals/pinned-files` |

**Purpose.** The design partner pins the files that sit at the front of the client dashboard. The latest version of each file always shows.

**Options.**

- Pin to the client dashboard
- Unpin
- Reorder pinned files

### Approve on the client's behalf

| | |
|---|---|
| **ID** | `on-behalf` |
| **Entry** | Approval card ▸ Approve for the client |
| **Who** | Design partner |
| **Status** | Specified |
| **Source** | Spec §23.3 |
| **Proposed path** | `/design-approvals/approve-on-the-client-s-behalf` |

**Purpose.** The design partner approves for the client by default on every item. When the client agrees by call, WhatsApp or Meet, the partner records the client's words and a timestamp, and the log shows the client's name with the partner beside it.

**Options.**

- Record the client's words
- Timestamp, added automatically
- Approve in the client's name
- See who approved and alongside which partner

**Rules.**

- The design partner approves for the client by default on every item
- The log shows the client's name with the partner beside it

### Client-requested changes & add-ons

| | |
|---|---|
| **ID** | `change-requests` |
| **Entry** | Project ▸ Changes and add-ons |
| **Who** | Design partner, Design Head |
| **Status** | Specified |
| **Source** | UI/UX §5 |
| **Proposed path** | `/design-approvals/client-requested-changes-add-ons` |

**Purpose.** Change requests and add-ons raised since the person's last visit, surfaced on the design partner home.

**Options.**

- List of client requests raised since the last visit
- Open a request
- Turn a request into an add-on with a price
- Send for approval

### Rejected versions

| | |
|---|---|
| **ID** | `rejected-versions` |
| **Entry** | File ▸ Rejected |
| **Who** | Design Head, Design partner, MD |
| **Status** | Specified |
| **Source** | Spec §21.1 |
| **Proposed path** | `/design-approvals/rejected-versions` |

**Purpose.** Rejected versions stay visible to the team with the reason attached. The client never sees them.

**Options.**

- Rejected versions with the reason
- Restore as a new version

**Rules.**

- The client never sees a rejected version

---

## 8. Quotations

The first quotation is an estimate and can be revised at any time. Every revision is versioned, approved by the tagged person and logged, and the signed quotation is locked.

**Who:** Design partner, Design Head, MD, Client  ·  **Source:** Spec §9  ·  **Pages:** 5

### Estimate

| | |
|---|---|
| **ID** | `quote-estimate` |
| **Entry** | Project ▸ Quotations ▸ New |
| **Who** | Design partner, Design Head |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/quotations/estimate` |

**Purpose.** The opening quotation. The client is not shown it until the Design Head approves it.

**Options.**

- Line items with description, quantity, rate
- Add a line, duplicate a line, remove a line
- Total with Indian digit grouping
- Send for Design Head approval

**Rules.**

- The first quotation is an estimate and can be revised

### Revision

| | |
|---|---|
| **ID** | `quote-revision` |
| **Entry** | Quotation ▸ Revise |
| **Who** | Design partner |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/quotations/revision` |

**Purpose.** Revise at any time. Quotations are versioned and never overwritten; each revision needs the tagged person's approval and is logged.

**Options.**

- Copy of the last version to edit
- Change quantities or rates
- Brief of what changed
- Send for approval by the tagged person
- Compare with the previous version

**Rules.**

- Versioned and never overwritten
- Every revision is logged

### Approved quotation

| | |
|---|---|
| **ID** | `quote-approved` |
| **Entry** | Quotation ▸ Approved |
| **Who** | Design partner, Design Head, MD |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/quotations/approved-quotation` |

**Purpose.** The payment split is always computed on the latest accepted quotation, minus what has already been paid.

**Options.**

- Accepted version with its date
- See the payment split computed on it
- Supersede with a new revision

**Rules.**

- The split is always computed on the latest accepted quotation, minus what is paid

### Signed quotation

| | |
|---|---|
| **ID** | `quote-signed` |
| **Entry** | Project ▸ Quotations ▸ Signed |
| **Who** | Production Mgr, MD |
| **Status** | Specified |
| **Source** | Spec §21.2 |
| **Proposed path** | `/quotations/signed-quotation` |

**Purpose.** Locked and versioned, and it travels to production with the approved design files.

**Options.**

- Signed copy, locked
- Download
- Attach to production

**Rules.**

- Locked and versioned
- Travels to production with the approved design files

### Calculator quotation

| | |
|---|---|
| **ID** | `quote-calculator` |
| **Entry** | Lead card ▸ Calculator quote |
| **Who** | Sales Head, Sales rep |
| **Status** | Specified |
| **Source** | Spec §3 |
| **Proposed path** | `/quotations/calculator-quotation` |

**Purpose.** If a calculator quotation exists it travels with the lead. The calculator logic belongs to Blue Light Codex and is not changed.

**Options.**

- Read the calculator quotation that came with the lead
- Copy the figures into a quotation

**Rules.**

- The calculator logic belongs to Blue Light Codex and is not changed

---

## 9. Client payments

The split is 10% token, 50% before production, 35% near completion and 5% at handover, each stage calculated on the latest accepted quotation. Only the MD confirms a payment. There is no backup approver.

**Who:** MD, Design partner, Client  ·  **Source:** Spec §9, §23.5, §23.7, §26.1 · App Flow §7  ·  **Pages:** 10

### Payment schedule

| | |
|---|---|
| **ID** | `split` |
| **Entry** | Project ▸ Payments ▸ Schedule |
| **Who** | MD, Design partner, Client |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/client-payments/payment-schedule` |

**Purpose.** 10 / 50 / 35 / 5 by default, set by the MD per project or company-wide. A company-wide change applies to new projects only and needs confirmation, a password and notifications.

**Options.**

- Four stages with percentage and amount
- Edit the split for this project
- Apply a company-wide split (new projects only)
- Confirm with password and notifications
- See what is paid against each stage

**Rules.**

- Default 10 / 50 / 35 / 5 on the latest accepted quotation
- A company-wide change needs confirmation, a password and notifications

### Payment request to client

| | |
|---|---|
| **ID** | `payment-request` |
| **Entry** | Project ▸ Payments ▸ Request |
| **Who** | Design partner, Client |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/client-payments/payment-request-to-client` |

**Purpose.** The client receives a request for the amount due and pays by UPI.

**Options.**

- Amount due and due date
- Send the request on WhatsApp
- Copy the UPI details
- Mark as sent

### Proof upload

| | |
|---|---|
| **ID** | `proof` |
| **Entry** | Project ▸ Payments ▸ Proof |
| **Who** | Client, Design partner |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/client-payments/proof-upload` |

**Purpose.** The client sends proof on WhatsApp. The design partner forwards it to the MD. Nobody copies files across by hand.

**Options.**

- Upload the proof image from WhatsApp
- Attach the amount the client says they paid
- Forward to the MD
- See the status: with the MD, rejected, confirmed

### MD confirmation queue

| | |
|---|---|
| **ID** | `confirm` |
| **Entry** | Payments ▸ Awaiting confirmation (MD) |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §23.5 |
| **Proposed path** | `/client-payments/md-confirmation-queue` |

**Purpose.** The MD checks every proof against the amount and confirms or rejects it. Every confirmation, flag and rejection is logged. Payment confirmation is never voice-approved.

**Options.**

- Queue of proofs with client, project and stage
- Open the proof image full size
- Amount field, prefilled and editable
- Confirm receipt
- Flag or reject with a reason
- See the running reconciliation for the project

**Rules.**

- Only the MD confirms; there is no backup approver
- Payment confirmation is never voice-approved
- Every confirmation, flag and rejection is logged

### Optional proof reader

| | |
|---|---|
| **ID** | `proof-reader` |
| **Entry** | Payment confirmation card |
| **Who** | MD |
| **Status** | Partly specified |
| **Source** | Spec §23.7 |
| **Proposed path** | `/client-payments/optional-proof-reader` |

**Purpose.** The reader may suggest the amount from the proof image. It is optional and checks nothing. No metric or screen may imply the software confirmed a payment.

**Options.**

- Suggested amount from the proof image, marked as a suggestion
- Accept the suggestion into the amount field
- Ignore it

**Rules.**

- Optional and checks nothing
- No screen may imply the software confirmed a payment

### Reject with reason

| | |
|---|---|
| **ID** | `payment-reject` |
| **Entry** | Payment ▸ Reject |
| **Who** | MD, Design Head |
| **Status** | Specified |
| **Source** | Spec §26.1 |
| **Proposed path** | `/client-payments/reject-with-reason` |

**Purpose.** The rejection goes to the department head who owns the project: the Design Head for a client payment. He fixes it himself or tags the people involved. A tagged person sees the rejection and that project only.

**Options.**

- Reason field, required
- Send the rejection to the department head who owns the project
- Tag the people involved

**Shows.**

- Only the tagged person sees the rejection and the related project

**Rules.**

- For a client payment the owning head is the Design Head
- Work can pass both ways along the chain

### Resubmission

| | |
|---|---|
| **ID** | `payment-resubmit` |
| **Entry** | Rejected payment ▸ Resubmit |
| **Who** | Client, Design partner, MD |
| **Status** | Specified |
| **Source** | Spec §26.1 |
| **Proposed path** | `/client-payments/resubmission` |

**Purpose.** The client resubmits a corrected proof and the stage waits until the MD confirms it.

**Options.**

- Upload the corrected proof
- Send back to the MD
- Stage held until the MD confirms

### Automatic receipt

| | |
|---|---|
| **ID** | `receipt` |
| **Entry** | Payment ▸ Receipt (client) |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/client-payments/automatic-receipt` |

**Purpose.** On confirmation the design partner is notified on WhatsApp and the client receives a receipt showing the amount received and the remaining balance.

**Options.**

- Receipt with amount received and remaining balance
- Download or share

**Rules.**

- Sent automatically on confirmation
- The design partner is told on WhatsApp at the same time

### Ledger & reconciliation

| | |
|---|---|
| **ID** | `ledger` |
| **Entry** | Project ▸ Payments ▸ Ledger |
| **Who** | MD, Design partner |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/client-payments/ledger-reconciliation` |

**Purpose.** The worked reconciliation example on a 2,00,000 quote is the authority. Money is stored in paise and rounded only at the final step, with the reconciliation shown.

**Options.**

- Stage by stage: due, paid, balance
- Reconciliation against the quotation example
- Correction entry linked to the original

**Rules.**

- Money is stored in paise and rounded only at the final step

### Locked payments & corrections

| | |
|---|---|
| **ID** | `payment-lock` |
| **Entry** | Payment ▸ Correction |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §9, §16 |
| **Proposed path** | `/client-payments/locked-payments-corrections` |

**Purpose.** A received payment is locked and immutable. A correction is a new logged entry, and the MD is notified whenever a correction touches a payment.

**Options.**

- Locked payment, read-only
- New correcting entry with a reason
- Notify the MD when a correction touches a payment

**Rules.**

- A received payment is immutable
- The original stays visible

---

## 10. Internal money

Pay, share, expenses and spend all run through the MD. Every request is raised by one role, checked by a head, and paid and approved by the MD with a logged acknowledgement back to the requester.

**Who:** MD, Production Head, Production Mgr, Design partner, Marketing Head  ·  **Source:** Spec §9, §14 · App Flow §13  ·  **Pages:** 7

### Design partner ledger & 5% share

| | |
|---|---|
| **ID** | `dp-ledger` |
| **Entry** | Money ▸ Design partners |
| **Who** | Design partner, MD |
| **Status** | Specified |
| **Source** | Spec §14 |
| **Proposed path** | `/internal-money/design-partner-ledger-5-share` |

**Purpose.** The 5% share is paid in step with the client: 1.5% after the token, 1.5% after the 50%, 1% after the 35%, 1% at the end. The ledger shows what the company owes each partner in each pay window.

**Options.**

- Per partner: share earned, paid, pending
- Pay window breakdown: 10th, 20th, 30th
- Open a partner's statement
- Mark a share as paid

**Rules.**

- 1.5% after the token, 1.5% after 50%, 1% after 35%, 1% at the end

### Pay windows

| | |
|---|---|
| **ID** | `pay-window` |
| **Entry** | Money ▸ Pay windows |
| **Who** | MD, Design partner |
| **Status** | Specified |
| **Source** | Settings §8 |
| **Proposed path** | `/internal-money/pay-windows` |

**Purpose.** Design partners are paid on the 10th, 20th and 30th. Salaried staff are paid on the 30th, and the MD may pay off-schedule.

**Options.**

- Calendar of the three partner dates and the salary date
- Pay off-schedule (MD)
- See what falls in each window

### Salary — default, limit, per-payment

| | |
|---|---|
| **ID** | `salary` |
| **Entry** | Money ▸ Salary |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §14 |
| **Proposed path** | `/internal-money/salary-default-limit-per-payment` |

**Purpose.** The MD sets each person's default amount and one visible limit, and may change the amount for a single payment before sending it for approval.

**Options.**

- Per person: default amount and visible limit
- Change the default
- Change the amount for one payment only
- Send to the person for approval

**Rules.**

- The receiver approves with a payslip or receipt
- The person sees their limit and the amount paid each time

### Payslip approval

| | |
|---|---|
| **ID** | `payslip` |
| **Entry** | My pay, or the salary row |
| **Who** | MD, All staff |
| **Status** | Specified |
| **Source** | Spec §14 |
| **Proposed path** | `/internal-money/payslip-approval` |

**Purpose.** The receiver approves with a payslip or receipt. Payslips are visible only to the receiver and the MD.

**Options.**

- Payslip or receipt attached
- Approve and acknowledge
- Query the amount

**Rules.**

- Visible only to the receiver and the MD

### Reimbursements

| | |
|---|---|
| **ID** | `reimbursement` |
| **Entry** | More ▸ Reimbursements |
| **Who** | All staff, MD |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/internal-money/reimbursements` |

**Purpose.** Anyone claims for site visits and travel with amount, region and timing. The MD approves and pays. Receipts are kept separately.

**Options.**

- Amount
- Region
- When it was spent
- Attach the receipt
- Submit
- Approve and pay (MD)

**Rules.**

- Receipts are kept separately

### Production expenses

| | |
|---|---|
| **ID** | `production-expense` |
| **Entry** | Expenses (Production Head), or the PM's request |
| **Who** | Production Mgr, Production Head, MD |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/internal-money/production-expenses` |

**Purpose.** The PM raises it, the Production Head checks and approves, the MD pays and marks it approved, and the PM acknowledges. Visible only to those three roles.

**Options.**

- Request with amount, vendor and reason
- Approve as Production Head
- Pay and mark approved (MD)
- Acknowledge receipt (PM)

**Rules.**

- Visible only to the PM, the Production Head and the MD
- The same chain applies to PM bills

### Marketing spend

| | |
|---|---|
| **ID** | `marketing-spend` |
| **Entry** | Spend (Marketing Head) |
| **Who** | Marketing Head, MD |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/internal-money/marketing-spend` |

**Purpose.** The Marketing Head raises it and sees the full status: approved, declined or paid. The MD approves.

**Options.**

- Request with amount, channel and purpose
- Status: raised, approved, declined, paid
- Approve (MD)
- See the reason on a decline

---

## 11. Production & inventory

Once the 50% is confirmed the MD assigns a Production Manager, who builds the BOQ from the approved quotation and runs materials, vendors, crew and dates. Each PM keeps a standalone workspace that travels with him.

**Who:** Production Mgr, Production Head, MD  ·  **Source:** Spec §10, §13, §21.3 · App Flow §8  ·  **Pages:** 14

### BOQ builder

| | |
|---|---|
| **ID** | `boq` |
| **Entry** | Project ▸ BOQ |
| **Who** | Production Mgr |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/boq-builder` |

**Purpose.** Built from the approved quotation. It can be changed at any time and every change is logged. The signed quotation travels with the project.

**Options.**

- Lines built from the approved quotation
- Add a line manually
- Edit quantity or rate, logged
- See what changed the quotation against the BOQ
- Attach the signed quotation for reference

**Rules.**

- The BOQ can change at any time and every change is logged
- Only the PM builds it, once the MD assigns them

### Material lines

| | |
|---|---|
| **ID** | `materials` |
| **Entry** | BOQ ▸ line |
| **Who** | Production Mgr |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/material-lines` |

**Purpose.** Each line carries quantity, rate, payment date and receiving date, tracked separately: either can come first.

**Options.**

- Quantity
- Rate
- Payment date
- Receiving date
- Mark as paid
- Mark as received

**Rules.**

- Payment and receiving dates are tracked separately; either can come first

### Staged purchases

| | |
|---|---|
| **ID** | `boq-stages` |
| **Entry** | BOQ ▸ Stages |
| **Who** | Production Mgr |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/staged-purchases` |

**Purpose.** Purchases can be staged with buy and receive dates per stage, and the BOQ can be filtered by stage.

**Options.**

- Buy and receive dates per stage
- Filter the BOQ by stage
- See what is bought or arrived in each stage

### Project inventory

| | |
|---|---|
| **ID** | `inventory` |
| **Entry** | Project ▸ Inventory |
| **Who** | Production Mgr, Production Head, MD |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/project-inventory` |

**Purpose.** Each project has its own inventory record built from the BOQ, shared with the Production Head and the MD.

**Options.**

- Inventory built from the BOQ
- Adjust a quantity with a reason
- Share with the Production Head and MD, automatic

### PM workspace

| | |
|---|---|
| **ID** | `pm-workspace` |
| **Entry** | More ▸ My workspace |
| **Who** | Production Mgr |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/pm-workspace` |

**Purpose.** Standalone: site tabs, a general tab, a table builder and a crew directory. Starter categories are laminates, plywood and boards, hardware, worktops and backsplash, lighting, adhesives and consumables.

**Options.**

- Site tabs, one per site
- General tab across sites
- Table builder for custom columns
- Crew directory
- Starter categories: laminates, plywood and boards, hardware, worktops and backsplash, lighting, adhesives and consumables

**Rules.**

- Each PM keeps a standalone workspace that travels with him

### Stock & material payments due

| | |
|---|---|
| **ID** | `stock` |
| **Entry** | Stock (Production Manager) |
| **Who** | Production Mgr |
| **Status** | Specified |
| **Source** | Spec §26.7 |
| **Proposed path** | `/production-inventory/stock-material-payments-due` |

**Purpose.** Material payments due on the Production Manager home, with stock reachable from the tab bar.

**Options.**

- Material payments due this week
- Stock by category
- Add stock in
- Flag a shortfall

### Vendor list & catalogues

| | |
|---|---|
| **ID** | `vendors` |
| **Entry** | More ▸ Vendors |
| **Who** | Production Mgr, Production Head |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/vendor-list-catalogues` |

**Purpose.** The Production Head maintains the vendor list and sees every vendor catalogue and price list. Rates are tracked for comparison.

**Options.**

- Vendor list with catalogues and price lists
- Add a vendor (Production Head)
- Compare rates across vendors
- Open a vendor's invoices

### Vendor invoices

| | |
|---|---|
| **ID** | `invoices` |
| **Entry** | Project ▸ Invoices, or Vendors ▸ invoices |
| **Who** | Production Mgr, Production Head |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/vendor-invoices` |

**Purpose.** A vendor gets an ID when an invoice is tagged to a project. Each invoice belongs to both the vendor record and the project. A wrong tag is corrected by the PM and the Production Head is notified.

**Options.**

- Upload an invoice
- Tag it to a project, which gives the vendor an ID
- Correct a wrong tag with a reason
- See the rate history

**Rules.**

- Each invoice belongs to both the vendor record and the project
- A correction notifies the Production Head; the original stays in the log

### Deliveries & receiving

| | |
|---|---|
| **ID** | `deliveries` |
| **Entry** | Project ▸ Deliveries |
| **Who** | Production Mgr |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/deliveries-receiving` |

**Purpose.** Vendor deliveries follow the receiving date. Installation trips follow the crew assignments.

**Options.**

- Expected deliveries by receiving date
- Mark a delivery received
- Report a short or damaged delivery

### Delivery & installation schedule

| | |
|---|---|
| **ID** | `schedule` |
| **Entry** | Schedule tab |
| **Who** | Production Mgr, Production Head |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/delivery-installation-schedule` |

**Purpose.** The PM sets delivery and installation dates with the client. This week's deliveries and installations sit on the home screen.

**Options.**

- This week's deliveries and installations
- Set an installation date with the client
- Reschedule with a reason
- See the double-booking warning on a date

### Crew directory & assignments

| | |
|---|---|
| **ID** | `crew` |
| **Entry** | Crew tab |
| **Who** | Production Mgr, Production Head |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/crew-directory-assignments` |

**Purpose.** Crew assignments and attendance are visible only to the PM who owns that crew. The Production Head can open any PM's profile and see where each crew member is.

**Options.**

- Crew directory with skills and availability
- Assign crew to a project and date
- See who is on which site today
- Open a PM's crew profile (Production Head)

**Rules.**

- Crew assignments and attendance are visible only to the PM who owns that crew

### Crew attendance

| | |
|---|---|
| **ID** | `attendance` |
| **Entry** | Crew ▸ Attendance |
| **Who** | Production Mgr, Production Head |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/crew-attendance` |

**Purpose.** Tracked inside the platform. There are no fixed check-in or check-out times, because the company is remote.

**Options.**

- Mark present, absent or half day
- Day and week view
- Export for pay

**Rules.**

- No fixed check-in or check-out times, the company is remote

### Double-booking warning

| | |
|---|---|
| **ID** | `double-booking` |
| **Entry** | Automatic, on assignment |
| **Who** | Production Mgr |
| **Status** | Specified |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/double-booking-warning` |

**Purpose.** The platform warns the PM when the same crew member or vehicle is booked on two projects on one day.

**Options.**

- Warning naming the crew member or vehicle and the clashing project
- Go ahead anyway
- Change the date

### Snags & quality checks

| | |
|---|---|
| **ID** | `snags` |
| **Entry** | None |
| **Who** | Production Mgr |
| **Status** | Out of scope |
| **Source** | Spec §10 |
| **Proposed path** | `/production-inventory/snags-quality-checks` |

**Purpose.** Handled offline. The platform does not track them in this version, so there is no screen.

**Rules.**

- Handled offline; no screen in this version

---

## 12. Client portal

A client sees only their own project, in one calm column. Everything is approved before it appears, and money never shows an amount without a due date.

**Who:** Client  ·  **Source:** Spec §21.1, §23.2 · Mobile §7  ·  **Pages:** 7

### Project home

| | |
|---|---|
| **ID** | `portal-home` |
| **Entry** | Project tab |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Mobile §7 |
| **Proposed path** | `/client-portal/project-home` |

**Purpose.** Stage and days left, next date, payment due with one pay-or-upload action, and the last approved files.

**Options.**

- Stage with traffic light and word
- Days left
- Next date and what happens
- Payment due with pay or upload proof
- Approved files, pinned first
- Call the office

### Files

| | |
|---|---|
| **ID** | `portal-files` |
| **Entry** | Files tab |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Spec §21.1 |
| **Proposed path** | `/client-portal/files` |

**Purpose.** Approved versions only, pinned first. Current versions download; older versions open in a dated history and are view-only.

**Options.**

- Approved files, pinned first
- Download the current version
- Open the dated history of an earlier version
- See the brief of what changed

**Rules.**

- Old versions are view-only
- Nothing unapproved ever appears

### Payments & receipts

| | |
|---|---|
| **ID** | `portal-payments` |
| **Entry** | Payments tab |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/client-portal/payments-receipts` |

**Purpose.** Amount due with its due date, the pay or proof-upload action, and every receipt with the remaining balance.

**Options.**

- Amount due with its due date
- Pay by UPI
- Upload the payment proof
- Receipts with the remaining balance

**Rules.**

- No amount is shown without its due date
- Payment is confirmed only by the MD, never by the app

### Messages

| | |
|---|---|
| **ID** | `portal-messages` |
| **Entry** | Messages tab |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Spec §11 |
| **Proposed path** | `/client-portal/messages` |

**Purpose.** The conversation with the company number, including the project group once they join it.

**Options.**

- Conversation with the company number
- Project group thread once joined
- Join the project group from the invitation

**Rules.**

- Until the client joins the group, messages go to their private number

### Warranty status

| | |
|---|---|
| **ID** | `portal-warranty` |
| **Entry** | More ▸ Warranty |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Spec §11 |
| **Proposed path** | `/client-portal/warranty-status` |

**Purpose.** 10 years from handover, which is the final payment. A covered claim goes to the PM; an uncovered one gets a written reason.

**Options.**

- Warranty status and end date
- Raise a claim
- Read the written reason for an uncovered claim

**Rules.**

- Ten years from handover, which is the final payment
- The sales representative decides coverage

### Feedback at close

| | |
|---|---|
| **ID** | `portal-feedback` |
| **Entry** | WhatsApp at project close |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Spec §11 |
| **Proposed path** | `/client-portal/feedback-at-close` |

**Purpose.** At project close the system asks for feedback on WhatsApp with review links.

**Options.**

- Feedback request with review links
- Open the review link

### Contact the office

| | |
|---|---|
| **ID** | `portal-contact` |
| **Entry** | More, or the call row on Home |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Mobile §7 |
| **Proposed path** | `/client-portal/contact-the-office` |

**Purpose.** One tap to call the office number. The client is never required to use the portal at all.

**Options.**

- Call the office
- WhatsApp the office

**Rules.**

- The client is never required to use the portal

---

## 13. Communication

One company WhatsApp number carries every client message and file. Staff never copy files across by hand. Groups run on a separate company number, and every automatic message is an approved template sent inside the 8 a.m. to 10 p.m. window.

**Who:** Everyone  ·  **Source:** Spec §26.4, §26.8, §26.12, §26.14 · App Flow §17, §18  ·  **Pages:** 7

### Company WhatsApp number

| | |
|---|---|
| **ID** | `company-number` |
| **Entry** | Settings ▸ WhatsApp |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §11 |
| **Proposed path** | `/communication/company-whatsapp-number` |

**Purpose.** The only channel for alerts and file delivery to clients. Twilio carries the messages.

**Options.**

- See which number carries client messages
- See which provider carries which message

**Rules.**

- One number carries all client messages and file deliveries
- Twilio carries the messages; groups use a separate number

### Project WhatsApp group

| | |
|---|---|
| **ID** | `project-group` |
| **Entry** | Project ▸ WhatsApp group |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §26.4 |
| **Proposed path** | `/communication/project-whatsapp-group` |

**Purpose.** Created at handover with the representative, the design partner, the Design Head and the company number. Created through Meta's Groups API; messages go on Twilio.

**Options.**

- Group status: created, client joined
- Send the invitation again
- See participants and who added them

**Rules.**

- Created at handover with the representative, design partner, Design Head and company number
- Created through Meta Groups API, messages on Twilio
- Anyone added to the project is added to its group by the software

### Group invitation

| | |
|---|---|
| **ID** | `group-invite` |
| **Entry** | WhatsApp, from the company number |
| **Who** | Client |
| **Status** | Specified |
| **Source** | Spec §26.4, §26.13 |
| **Proposed path** | `/communication/group-invitation` |

**Purpose.** Participants cannot be added directly per Meta's documentation, so the client receives an approved template with an invitation link. Until they join, messages go to their private number.

**Options.**

- Invitation link in an approved template
- Resend the invitation

**Rules.**

- Participants cannot be added directly per Meta documentation
- The invitation link is the only route in

### Pre-written message library

| | |
|---|---|
| **ID** | `message-library` |
| **Entry** | More ▸ Messages ▸ Library (MD), editable by anyone |
| **Who** | MD, All staff |
| **Status** | Specified |
| **Source** | Spec §26.12 |
| **Proposed path** | `/communication/pre-written-message-library` |

**Purpose.** Eight situations: first contact, meeting link, meeting reminder, catalogue, testimonial, sample videos, request for a call time, group invitation. Client name and project details fill in automatically. Anyone may edit the text; a change needs template approval again.

**Options.**

- Eight situations, each with its text
- Edit the text
- Send for template approval after an edit
- See which template a message uses
- Preview with a real client filled in

**Shows.**

- First contact, meeting link, meeting reminder, catalogue, testimonial, sample videos, call-time request, group invitation

**Rules.**

- Client name and project details fill in automatically
- A changed message needs template approval before it is used

### One-off messages

| | |
|---|---|
| **ID** | `one-off-message` |
| **Entry** | Lead or client ▸ Message |
| **Who** | MD, All staff |
| **Status** | Specified |
| **Source** | Spec §26.14 |
| **Proposed path** | `/communication/one-off-messages` |

**Purpose.** Free text from the company number only within 24 hours of the client's last message, and editable right before sending. Outside that window an approved template is required. A manual send from the person's own WhatsApp is free and untracked.

**Options.**

- Free-text box, only within 24 hours of the client's last message
- Send from the company number
- Send from my own WhatsApp, untracked
- Blocked state outside the window, template required

**Rules.**

- Manual sends from a personal WhatsApp are free and not tracked

### Templates & content SIDs

| | |
|---|---|
| **ID** | `templates` |
| **Entry** | More ▸ Messages ▸ Templates |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §26.12 |
| **Proposed path** | `/communication/templates-content-sids` |

**Purpose.** Every pre-written message is an approved template sent by content SID, supervised by the MD.

**Options.**

- List of approved templates with content SID
- Approval state per template
- Open a template for editing

### 8 a.m. to 10 p.m. window

| | |
|---|---|
| **ID** | `messaging-window` |
| **Entry** | Settings ▸ Messaging |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §26.8 |
| **Proposed path** | `/communication/8-a-m-to-10-p-m-window` |

**Purpose.** Every WhatsApp message, automatic or manual, sits inside the window. A retry that falls outside waits until 8 a.m. Pre-token stage timing counts hours only inside the window.

**Options.**

- Window start and end
- Behaviour for a retry that falls outside
- Save

**Rules.**

- Every message, automatic or manual, sits inside 8 a.m. to 10 p.m.
- A retry outside waits until 8 a.m.

---

## 14. Alerts & delivery

Core alerts are WhatsApp only, sent as approved templates, with no phone calls. A failed alert is retried on a fixed schedule, and when attempts run out it lands in Delivery Problems.

**Who:** MD, Design Head, Production Head, Sales Head  ·  **Source:** Spec §12, §26.3 · Architecture d7, d8  ·  **Pages:** 4

### Alert classes

| | |
|---|---|
| **ID** | `alert-classes` |
| **Entry** | Settings ▸ Alerts ▸ Classes |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §6 |
| **Proposed path** | `/alerts-delivery/alert-classes` |

**Purpose.** Time-critical, standard, digest and exit notice, each with its own attempts, gaps and window. The exit notice is a single attempt and is not changeable.

**Options.**

- Class list with attempts, gaps and window
- Edit a class (MD)
- Locked exit notice

**Rules.**

- Exit notice is one attempt and not changeable

### Retry schedule

| | |
|---|---|
| **ID** | `alert-retry` |
| **Entry** | Settings ▸ Alerts ▸ Retry |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §6 |
| **Proposed path** | `/alerts-delivery/retry-schedule` |

**Purpose.** Gaps with plus or minus 20 percent jitter, changeable by the MD. A read receipt never stops the scheduled second message in a different style.

**Options.**

- Gaps per attempt
- Jitter plus or minus 20 percent
- Window for each class
- Save and log the change

**Rules.**

- A read receipt never stops the scheduled second message

### Delivery Problems list

| | |
|---|---|
| **ID** | `delivery-problems` |
| **Entry** | Home card, or More ▸ Delivery problems |
| **Who** | MD, Design Head, Production Head |
| **Status** | Open - not approved to build |
| **Source** | UI/UX §9 |
| **Proposed path** | `/alerts-delivery/delivery-problems-list` |

**Purpose.** Failed alerts with recipient, alert, attempts and last reason. Proposal is one list, newest first, filtrable by class, with a single Mark as handled action. Awaiting owner approval (open item 16).

**Options.**

- One list, newest first
- Filter by alert class
- Row detail: recipient, alert, attempts, last reason
- Mark as handled, which writes a log entry

**Rules.**

- Only the MD and the named role can mark a problem handled
- Screen is proposed, not yet approved

### Alert delivery metric

| | |
|---|---|
| **ID** | `alert-metric` |
| **Entry** | Home ▸ Alerts |
| **Who** | MD |
| **Status** | Specified |
| **Source** | PRD §4 |
| **Proposed path** | `/alerts-delivery/alert-delivery-metric` |

**Purpose.** Share of alerts delivered after retries: 98 percent, with zero Delivery Problems open at week end. Delivery counts, not reads.

**Options.**

- Delivery share after retries
- Open problems still open at week end

**Rules.**

- Counts delivery, not reads

---

## 15. People, leave & performance

Leave runs up the chain to the approver, cover is scoped by the head, and performance is reviewed Monday to Monday. The MD onboards every account and decides what happens to a leaver's login.

**Who:** MD, Sales Head, Design Head, Production Head, All staff  ·  **Source:** Spec §13, §14, §24 · App Flow §12, §14  ·  **Pages:** 12

### Apply for leave

| | |
|---|---|
| **ID** | `leave-apply` |
| **Entry** | More ▸ Leave ▸ Apply |
| **Who** | All staff |
| **Status** | Specified |
| **Source** | Spec §13 |
| **Proposed path** | `/people-leave-performance/apply-for-leave` |

**Purpose.** Reps apply to the Sales Head, designers to the Design Head, production staff to the Production Head, and heads to the MD. The MD does not take leave. Overlapping leave is not blocked.

**Options.**

- From and to dates
- Reason, optional
- Who approves, shown read-only
- Submit
- Cancel a pending request

**Rules.**

- Reps apply to the Sales Head, designers to the Design Head, production to the Production Head, heads to the MD
- The MD does not take leave
- Overlapping leave is not blocked

### Leave approvals

| | |
|---|---|
| **ID** | `leave-approve` |
| **Entry** | Approvals ▸ Leave |
| **Who** | MD, Sales Head, Design Head, Production Head |
| **Status** | Specified |
| **Source** | Spec §13 |
| **Proposed path** | `/people-leave-performance/leave-approvals` |

**Purpose.** An approval card in the approver's queue, the same component as design and payment approvals.

**Options.**

- Queue of requests with the person and dates
- Approve
- Reject with a reason
- Choose the cover scope on approval

### Cover scope

| | |
|---|---|
| **ID** | `cover` |
| **Entry** | Leave approval ▸ Cover |
| **Who** | MD, Sales Head, Design Head, Production Head |
| **Status** | Specified |
| **Source** | Spec §13 |
| **Proposed path** | `/people-leave-performance/cover-scope` |

**Purpose.** The head chooses everything the absent person owns, or selected projects and tasks. Crew linked to those projects move with them and nothing else.

**Options.**

- Everything the person owns
- Selected projects and tasks
- Crew linked to those projects moves with them
- Notify the cover person

**Rules.**

- Crew go with the project and nothing else
- The absent person can view all of his projects at any time

### Return & handover

| | |
|---|---|
| **ID** | `return` |
| **Entry** | More ▸ Leave ▸ I am back |
| **Who** | All staff, MD |
| **Status** | Specified |
| **Source** | App Flow §12 |
| **Proposed path** | `/people-leave-performance/return-handover` |

**Purpose.** The absent person marks themselves back, the cover person hands the projects and crew back, and the head is notified.

**Options.**

- Mark myself back
- Cover person confirms handover of projects and crew
- Head is notified

### Staff directory

| | |
|---|---|
| **ID** | `directory` |
| **Entry** | More ▸ Staff |
| **Who** | MD, Sales Head, Design Head, Production Head |
| **Status** | Specified |
| **Source** | UI/UX §4 |
| **Proposed path** | `/people-leave-performance/staff-directory` |

**Purpose.** Every person with their role, reporting line, salary limit and current rating.

**Options.**

- List with role, reporting line, status
- Open a person's profile
- Filter by department or status
- See a person's rating and current load

### Onboard staff

| | |
|---|---|
| **ID** | `onboard` |
| **Entry** | Staff ▸ Add |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §22.1 |
| **Proposed path** | `/people-leave-performance/onboard-staff` |

**Purpose.** The MD creates every account. Nobody self-registers.

**Options.**

- Name, business email, role, reporting line
- Default salary and limit
- Create the account
- Send the first sign-in details

### Salary settings

| | |
|---|---|
| **ID** | `salary-settings` |
| **Entry** | Staff ▸ person ▸ Pay |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §14 |
| **Proposed path** | `/people-leave-performance/salary-settings` |

**Purpose.** Each person's default amount and one visible limit, changeable at any time.

**Options.**

- Default amount
- Visible limit
- Save, logged

### Performance & ratings

| | |
|---|---|
| **ID** | `performance` |
| **Entry** | More ▸ My performance |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §14 |
| **Proposed path** | `/people-leave-performance/performance-ratings` |

**Purpose.** Each person sees their own rating and weekly count of completed stages. Heads see their team and projects. The MD sees everyone on one page.

**Options.**

- My rating and my weekly count of completed stages
- My stage history behind the rating
- Team view for a head

**Rules.**

- A delay counts against a person only when it holds a project back

### Monday review

| | |
|---|---|
| **ID** | `weekly-review` |
| **Entry** | More ▸ Reviews (heads, MD) |
| **Who** | MD, Sales Head, Design Head, Production Head |
| **Status** | Specified |
| **Source** | PRD §4 |
| **Proposed path** | `/people-leave-performance/monday-review` |

**Purpose.** Performance runs Monday to Monday with Monday as the review day. The target is 100 percent of staff cards reviewed by Monday.

**Options.**

- Cards for the team, one per person
- Mark reviewed
- Add a note
- See who is not yet reviewed

**Rules.**

- Monday to Monday; the target is every card reviewed by Monday

### Leaver flow

| | |
|---|---|
| **ID** | `leaver` |
| **Entry** | Staff ▸ person ▸ Leave the company |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §24 |
| **Proposed path** | `/people-leave-performance/leaver-flow` |

**Purpose.** Reassign open projects first, then download the data and delete, or hibernate. The old owner keeps read access to project history only. Notifications and WhatsApp stop at once, with one final message.

**Options.**

- Reassign open projects first
- Download the person's data
- Delete the account
- Hibernate the account

**Rules.**

- Deleting removes the login only; the name stays as former staff
- Notifications and WhatsApp stop at once, with one final message

### Hibernated & deleted accounts

| | |
|---|---|
| **ID** | `hibernated` |
| **Entry** | Staff ▸ Inactive |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §24 |
| **Proposed path** | `/people-leave-performance/hibernated-deleted-accounts` |

**Purpose.** One list. A department head requests access to one hibernated account at a time; the MD approves and removes it, and the head is notified either way.

**Options.**

- List of hibernated and deleted accounts
- Request access to one account (head)
- Approve or remove access, one person at a time (MD)

**Rules.**

- The head is notified when access is given or removed

### Access-change notices

| | |
|---|---|
| **ID** | `access-notice` |
| **Entry** | Notifications |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §24 |
| **Proposed path** | `/people-leave-performance/access-change-notices` |

**Purpose.** Department heads get these inside the app only, never on WhatsApp, and they appear in the activity log.

**Options.**

- Notice with who was given access, to what, and by whom
- Open the person or project

**Rules.**

- In the app only, never on WhatsApp
- Appears in the activity log

---

## 16. Marketing

The Marketing Head sets the brand template, runs the content pipeline, and reads a funnel for every post and channel. Finished projects arrive as a package with the final files and brief and no client details.

**Who:** Marketing Head, MD  ·  **Source:** Spec §15, §21.5 · App Flow §13  ·  **Pages:** 7

### Brand template

| | |
|---|---|
| **ID** | `brand-template` |
| **Entry** | Brand tab |
| **Who** | Marketing Head |
| **Status** | Specified |
| **Source** | Spec §15 |
| **Proposed path** | `/marketing/brand-template` |

**Purpose.** Logo, colours and fonts. Editable at any time, with every change kept as a version. The platform chooses the AI model.

**Options.**

- Logo upload
- Colours
- Fonts
- Save a new version
- Restore an earlier version
- See the version history

**Rules.**

- Every change is kept as a version
- The platform chooses the AI model

### Posts & scheduling

| | |
|---|---|
| **ID** | `posts` |
| **Entry** | Posts tab |
| **Who** | Marketing Head |
| **Status** | Specified |
| **Source** | Spec §15 |
| **Proposed path** | `/marketing/posts-scheduling` |

**Purpose.** The system generates and schedules posts across the chosen channels, handles comments and replies, and returns responses and lead data.

**Options.**

- Generate a post from the brand template
- Choose channels
- Schedule a date and time
- Edit copy and media
- See comments and replies
- Publish or queue

### Post history & performance

| | |
|---|---|
| **ID** | `post-history` |
| **Entry** | Posts ▸ History |
| **Who** | Marketing Head |
| **Status** | Specified |
| **Source** | Spec §21.5 |
| **Proposed path** | `/marketing/post-history-performance` |

**Purpose.** Each published post is kept with its performance numbers.

**Options.**

- Published posts with their numbers
- Open a post and its funnel
- Reuse a post as a draft

### Funnel per post and channel

| | |
|---|---|
| **ID** | `funnel` |
| **Entry** | Posts ▸ Funnel, or Home |
| **Who** | Marketing Head, MD |
| **Status** | Specified |
| **Source** | Spec §15 |
| **Proposed path** | `/marketing/funnel-per-post-and-channel` |

**Purpose.** Leads, meetings and converted clients with the percentage at each step, per post and per channel.

**Options.**

- Funnel per post: leads, meetings, converted, with percentages
- Funnel per channel
- Change the date range
- Open the leads behind a step

### Content pipeline

| | |
|---|---|
| **ID** | `content-pipeline` |
| **Entry** | Posts ▸ Pipeline |
| **Who** | Marketing Head |
| **Status** | Specified |
| **Source** | Spec §15 |
| **Proposed path** | `/marketing/content-pipeline` |

**Purpose.** The Marketing Head supervises the pipeline and adds his own content. Leads are passed to the Sales Head, who groups them.

**Options.**

- Stages of content from idea to published
- Add my own content
- Move an item to the next stage
- Hand leads to the Sales Head

### Spend requests

| | |
|---|---|
| **ID** | `spend-requests` |
| **Entry** | Spend tab |
| **Who** | Marketing Head, MD |
| **Status** | Specified |
| **Source** | Spec §9 |
| **Proposed path** | `/marketing/spend-requests` |

**Purpose.** Raised by the Marketing Head, approved by the MD, with the status visible at every step.

**Options.**

- Request with amount, channel and purpose
- Submit
- See status: raised, approved, declined, paid
- Approve (MD)

### Finished project packages

| | |
|---|---|
| **ID** | `project-packages` |
| **Entry** | More ▸ Project packages |
| **Who** | Marketing Head |
| **Status** | Specified |
| **Source** | Spec §15 |
| **Proposed path** | `/marketing/finished-project-packages` |

**Purpose.** Final files and the brief only, with no client details, shared by the MD when a project finishes.

**Options.**

- Finished package with final files and the brief
- Download
- Approve use of a package

**Rules.**

- No client details in a package
- The MD shares access

---

## 17. Logs & audit

Everything that happens is logged, including the MD's own actions. Entries are fixed once written. A mistake is corrected by a new entry that points at the original, which stays visible.

**Who:** Everyone, MD  ·  **Source:** Spec §16  ·  **Pages:** 4

### Activity log

| | |
|---|---|
| **ID** | `activity-log` |
| **Entry** | More ▸ Activity, or a project's log |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §16 |
| **Proposed path** | `/logs-audit/activity-log` |

**Purpose.** Each person sees their own actions, heads see their teams, the MD sees everything. Append-only, newest first.

**Options.**

- Append-only list, newest first
- Filter by person, object or date
- Open an entry with its before and after values
- Export

**Rules.**

- Nothing can be edited or deleted
- Each person sees their own; heads see their team; the MD sees all

### Corrections

| | |
|---|---|
| **ID** | `corrections` |
| **Entry** | Log entry ▸ Correct |
| **Who** | Everyone |
| **Status** | Specified |
| **Source** | Spec §16 |
| **Proposed path** | `/logs-audit/corrections` |

**Purpose.** A new entry with the reason optional. Nothing is overwritten silently and nothing is deleted.

**Options.**

- New correcting entry
- Reason, optional
- Link to the original entry
- See both entries side by side

**Rules.**

- The original stays visible
- Nothing is overwritten silently

### Payment correction notice

| | |
|---|---|
| **ID** | `payment-correction` |
| **Entry** | Automatic notice to the MD |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Spec §16 |
| **Proposed path** | `/logs-audit/payment-correction-notice` |

**Purpose.** Corrections notify nobody automatically, except that the MD is notified whenever a correction touches a payment.

**Options.**

- Notice naming the payment, the correction and who made it
- Open the payment

**Rules.**

- The only correction that notifies anyone automatically

### Who sees which log

| | |
|---|---|
| **ID** | `log-scope` |
| **Entry** | Settings ▸ Log visibility |
| **Who** | MD, Sales Head, Design Head, Production Head |
| **Status** | Specified |
| **Source** | Spec §16 |
| **Proposed path** | `/logs-audit/who-sees-which-log` |

**Purpose.** Own actions, team logs, or the full correction log. The log integrity target is zero edits or deletes.

**Options.**

- Own actions
- Team logs, for a head
- Full correction log, for the MD

**Rules.**

- Log integrity target is zero edits or deletes

---

## 18. Tenant settings

Every value a company can change lives here with its default, who may change it and what gets logged. Each tenant holds its own copy. Nothing here is hard-coded.

**Who:** MD  ·  **Source:** Settings §3 to §13  ·  **Pages:** 13

### Messaging & timing

| | |
|---|---|
| **ID** | `set-messaging` |
| **Entry** | Settings ▸ Messaging |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §3 |
| **Proposed path** | `/tenant-settings/messaging-timing` |

**Purpose.** Window start 8 a.m., window end 10 p.m., pre-token stage timing in hours, retries outside the window wait until the start.

**Options.**

- Window start time
- Window end time
- Pre-token stage timing in hours, inside the window
- What happens to a retry outside the window
- Save, logged with old and new value

**Rules.**

- Changes apply to new items; running items keep the value they started with

### Call retry cycle & archive

| | |
|---|---|
| **ID** | `set-retry` |
| **Entry** | Settings ▸ Call retry |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §4 |
| **Proposed path** | `/tenant-settings/call-retry-cycle-archive` |

**Purpose.** Three hours to the follow-up message, one day to the next-day call, seven days to the next pass, two passes before the archive. Return dates are the rep's, with no default.

**Options.**

- Hours to the follow-up message
- Days between the day-one and next-day call
- Days before the next pass
- Number of passes before the archive
- Catalogue, testimonial and video content
- Save

**Rules.**

- Return date for an unresponsive lead is the representative's, with no default

### Stalled quotes

| | |
|---|---|
| **ID** | `set-stalled` |
| **Entry** | Settings ▸ Stalled quotes |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §5 |
| **Proposed path** | `/tenant-settings/stalled-quotes` |

**Purpose.** Three days of silence, three rounds, a new meeting after round two, not won after round three.

**Options.**

- Days of silence before a follow-up
- Follow-up rounds
- Round after which a new meeting is booked
- Round after which the lead is not won
- Save

### Alert retries

| | |
|---|---|
| **ID** | `set-alerts` |
| **Entry** | Settings ▸ Alerts |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §6 |
| **Proposed path** | `/tenant-settings/alert-retries` |

**Purpose.** Attempts, gaps, windows and jitter per class. The exit notice is not changeable.

**Options.**

- Attempts per class
- Gaps per attempt
- Jitter
- Window per class
- Save

**Rules.**

- The exit notice is not changeable

### WhatsApp group & meetings

| | |
|---|---|
| **ID** | `set-whatsapp` |
| **Entry** | Settings ▸ WhatsApp and meetings |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §7 |
| **Proposed path** | `/tenant-settings/whatsapp-group-meetings` |

**Purpose.** Invitation link is the only join route and cannot be changed. Invitation template, Meet links and the Workspace account are set here. Groups use a separate company number.

**Options.**

- Invitation template
- Google Meet link creation on or off
- Google Workspace account used
- Group number (separate company number, decided)
- Direct add of the client to the group, not possible and not changeable

**Rules.**

- The invitation link is the only join route and cannot be changed

### Payments & pay

| | |
|---|---|
| **ID** | `set-payments` |
| **Entry** | Settings ▸ Payments and pay |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §8 |
| **Proposed path** | `/tenant-settings/payments-pay` |

**Purpose.** Client split 10/50/35/5, design partner share 1.5/1.5/1/1, salary date, partner pay dates and each person's limit.

**Options.**

- Client split percentages, four stages
- Design partner share per client payment
- Salary pay date
- Partner pay dates
- Salary limit per person
- Save; a company-wide change needs a password and notifications

### Stages & performance

| | |
|---|---|
| **ID** | `set-stages` |
| **Entry** | Settings ▸ Stages |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §9 |
| **Proposed path** | `/tenant-settings/stages-performance` |

**Purpose.** Design 15 days from the token, production 45 from the 50 percent, installation 5 from the 35 percent, the yellow and red thresholds, and the Monday-to-Monday cycle.

**Options.**

- Design days from the token
- Production days from the 50%
- Installation days from the 35%
- Yellow threshold
- Red threshold
- Performance cycle
- Save

### Warranty & sessions

| | |
|---|---|
| **ID** | `set-warranty` |
| **Entry** | Settings ▸ Warranty and sessions |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §10 |
| **Proposed path** | `/tenant-settings/warranty-sessions` |

**Purpose.** Warranty 10 years from handover, sign-in session 15 days rolling, per person, and the MD can end any session.

**Options.**

- Warranty period in years
- Sign-in session window in days
- End any session now
- Save

### Dashboard defaults

| | |
|---|---|
| **ID** | `set-dashboards` |
| **Entry** | Settings ▸ Dashboards |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §11 |
| **Proposed path** | `/tenant-settings/dashboard-defaults` |

**Purpose.** The default charts per role, changeable by the MD. Each person still picks their own.

**Options.**

- Default charts per role
- Add or remove a default chart for a role
- Preview as that role
- Save

### Targets

| | |
|---|---|
| **ID** | `set-targets` |
| **Entry** | Settings ▸ Targets |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §12 |
| **Proposed path** | `/tenant-settings/targets` |

**Purpose.** The ten starting targets. Dashboard lines only; they never block work.

**Options.**

- Ten metrics with their target values
- Save
- Restore the starting targets

### Pre-written messages

| | |
|---|---|
| **ID** | `set-messages` |
| **Entry** | Settings ▸ Pre-written messages |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §13 |
| **Proposed path** | `/tenant-settings/pre-written-messages` |

**Purpose.** The library of eight situations and their approval state.

**Options.**

- Library of eight situations
- Edit text
- Approval state per message
- Send for template approval

### Change history

| | |
|---|---|
| **ID** | `set-history` |
| **Entry** | Settings ▸ Change history |
| **Who** | MD |
| **Status** | Specified |
| **Source** | Settings §2 |
| **Proposed path** | `/tenant-settings/change-history` |

**Purpose.** Who changed what, when, from which value to which, and why. Changes apply to new items only unless the owner says otherwise.

**Options.**

- List of changes: who, when, old value, new value, reason
- Filter by setting
- Open a change

**Rules.**

- Every change is logged with its reason

### Company-wide change guard

| | |
|---|---|
| **ID** | `set-guard` |
| **Entry** | Any company-wide change |
| **Who** | MD |
| **Status** | Partly specified |
| **Source** | Settings §2 |
| **Proposed path** | `/tenant-settings/company-wide-change-guard` |

**Purpose.** A company-wide change applies to new projects only and needs confirmation, a password and notifications. The spec names the rules but not the screen.

**Options.**

- Confirmation step
- Password entry
- Notifications to affected people
- Applies to new projects only

**Rules.**

- The spec names the rules but not the screen

---

## 19. Optional plugins

Three optional features a firm can switch off. The core platform works fully without any of them, and defaults for a new tenant are still open.

**Who:** MD, All staff  ·  **Source:** Spec §12 · AI brief §21  ·  **Pages:** 3
  ·  **Status:** Open - not approved to build

### Call agent

| | |
|---|---|
| **ID** | `call-agent` |
| **Entry** | Settings ▸ Plugins |
| **Who** | All staff |
| **Status** | Open - not approved to build |
| **Source** | Spec §12 |
| **Proposed path** | `/optional-plugins/call-agent` |

**Purpose.** Staff only, never clients. Reminders, check-ins and decision prompts. Every reply becomes a pending action a person confirms on screen. Payment confirmation is never voice-approved.

**Options.**

- Switch on or off for the firm
- Choose staff who may use it
- Review pending actions it proposes
- Confirm or dismiss a pending action

**Rules.**

- Staff only, never clients
- It never approves, rejects, pays or deletes
- Payment confirmation is never voice-approved

### Overseer

| | |
|---|---|
| **ID** | `overseer` |
| **Entry** | More ▸ Ask (MD) |
| **Who** | MD |
| **Status** | Open - not approved to build |
| **Source** | Spec §12 |
| **Proposed path** | `/optional-plugins/overseer` |

**Purpose.** A company-wide AI that answers across the business under the same access rules. Built after the core and off unless a firm opts in.

**Options.**

- Ask a question across the business
- Read the answer with its sources
- Switch on or off

**Rules.**

- Respects the same access rules as the person asking
- Off by default unless a firm opts in

### Transcript & approval proof

| | |
|---|---|
| **ID** | `transcript-plugin` |
| **Entry** | Settings ▸ Plugins |
| **Who** | Everyone |
| **Status** | Open - not approved to build |
| **Source** | Spec §23.4 |
| **Proposed path** | `/optional-plugins/transcript-approval-proof` |

**Purpose.** Meetbook or a similar tool. Held until the architecture decision, so no screen is defined.

**Options.**

- Choose a provider: Meetbook or similar
- Switch on or off

**Rules.**

- Held until the architecture decision

---

## 20. Not in First Light

Named in the documents as out of scope or deliberately removed. Listed so nobody builds them by mistake, and so the gaps are visible rather than silent.

**Who:** MD  ·  **Source:** PRD §6 · Spec §17  ·  **Pages:** 5
  ·  **Status:** Out of scope

### Bank statement matching

| | |
|---|---|
| **ID** | `bank-match` |
| **Entry** | None |
| **Who** | MD |
| **Status** | Out of scope |
| **Source** | PRD §6 |
| **Proposed path** | `/not-in-first-light/bank-statement-matching` |

**Purpose.** Out of scope for this version.

**Rules.**

- Out of scope for this version

### Office expense categories & limits

| | |
|---|---|
| **ID** | `office-expense` |
| **Entry** | None |
| **Who** | MD |
| **Status** | Out of scope |
| **Source** | PRD §6 |
| **Proposed path** | `/not-in-first-light/office-expense-categories-limits` |

**Purpose.** Out of scope. Reimbursements exist; office spend does not.

**Rules.**

- Out of scope; reimbursements exist, office spend does not

### Blacklisting

| | |
|---|---|
| **ID** | `blacklist` |
| **Entry** | None |
| **Who** | MD |
| **Status** | Out of scope |
| **Source** | Spec §6 |
| **Proposed path** | `/not-in-first-light/blacklisting` |

**Purpose.** Handled outside the platform.

**Rules.**

- Handled outside the platform

### History requests

| | |
|---|---|
| **ID** | `history-request` |
| **Entry** | None |
| **Who** | MD |
| **Status** | Out of scope |
| **Source** | Spec §17 |
| **Proposed path** | `/not-in-first-light/history-requests` |

**Purpose.** Removed in v8. A new request for history is not part of the flow.

**Rules.**

- Removed in v8

### Platform / tenant admin console

| | |
|---|---|
| **ID** | `platform-admin` |
| **Entry** | None |
| **Who** | MD |
| **Status** | Out of scope |
| **Source** | Not specified |
| **Proposed path** | `/not-in-first-light/platform-tenant-admin-console` |

**Purpose.** The aggregator model implies Shukra onboards tenants and rents the platform, but no document defines that console. Recorded as a gap, not a design.

> This is the largest structural hole in the set. Nothing in the 14 documents describes how a firm is created, billed or branded on the platform.

**Rules.**

- No document defines a tenant or platform console. Recorded as a gap, not a design.

---

## Access matrix

A filled dot means the role reaches that area through its navigation or its stated duties. **req** means access only by asking someone already on the project. A dash means the client never sees it.

| Area | MD | Sales Head | Sales rep | Design Head | Design partner | Production Head | Production Mgr | Marketing Head | Client |
|---|---|---|---|---|---|---|---|---|---|
| Entry & access | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Home & dashboards | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Leads & groups | ● | ● | ● | · | · | · | · | · | · |
| Calls & retry | ● | ● | ● | · | · | · | · | · | · |
| Meetings | ● | · | ● | ● | ● | · | · | · | ● |
| Projects | ● | req | ● | ● | ● | ● | ● | · | ● |
| Design & approvals | ● | · | · | ● | ● | · | ● | · | ● |
| Quotations | ● | · | · | ● | ● | · | · | · | ● |
| Client payments | ● | · | · | · | ● | · | · | · | ● |
| Internal money | ● | · | · | · | ● | ● | ● | ● | · |
| Production & inventory | ● | · | · | · | · | ● | ● | · | · |
| Client portal | ● | · | · | · | · | · | · | · | ● |
| Communication | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Alerts & delivery | ● | ● | · | ● | · | ● | · | · | · |
| People, leave & performance | ● | ● | ● | ● | ● | ● | ● | ● | — |
| Marketing | ● | · | · | · | · | · | · | ● | · |
| Logs & audit | ● | ● | ● | ● | ● | ● | ● | ● | ● |
| Tenant settings | ● | · | · | · | · | · | · | · | · |
| Optional plugins | ● | ● | ● | ● | ● | ● | ● | ● | — |
| Not in First Light | ● | · | · | · | · | · | · | · | · |

---

## One client, end to end

The 15 steps the documents describe, with the gate that must pass before the next one opens. Four of the gates move money.

| # | Step | Gate | Who | Source |
|---|---|---|---|---|
| 1 | Enquiry arrives | Source recorded | Sales Head | Spec §3 |
| 2 | AI groups the lead | Eight fixed options | AI, confirmed by Sales Head | Spec §3 |
| 3 | Group assigned | Call window and limit set | Sales Head | App Flow §2 |
| 4 | Call and outcome | One of seven outcomes | Sales rep | Spec §4, §26.2 |
| 5 | Retry cycle | Two passes, then archive | System and rep | Spec §26.2 |
| 6 | Meeting set | Design partner approves | Sales rep | App Flow §3, §17 |
| 7 | Temporary project | First meeting approved | Design partner | Spec §23.1 |
| 8 | Token — 10% | Payment gate | Client pays, MD confirms | Spec §9, §23.5 |
| 9 | Design phase | 15-day stage timer | Design partner, Design Head | Spec §8 |
| 10 | 50% before production | Payment gate | Client, MD | Spec §9, §10 |
| 11 | Production | 45-day stage timer | Production Manager | Spec §10 |
| 12 | 35% near completion | Payment gate | Client, MD | Spec §9 |
| 13 | Installation | 5-day stage timer | Production Manager | Spec §10 |
| 14 | Handover — final 5% | Warranty starts | Client, MD | Spec §11, §26.4 |
| 15 | Warranty and feedback | Covered or written reason | Sales rep, Production Head | Spec §11 |

---

## What the documents leave unresolved

Found while mapping. These are observations from the documents, not decisions. Each changes the shape of this sitemap.

### Structural - Call outcomes: four in the documents, seven in the decision

*Where:* App Flow v15 §3 · AI brief §6 · UI/UX §5 vs change request 1, Part A

The App Flow, the AI context brief and the UI/UX brief all still describe four outcomes, and the UI/UX brief specifies a form with four. The settled decision is seven. A site map cannot place a single form until this is resolved, so the map shows the seven and flags the form as partial.

*Affects:* Affects: Calls, dashboards, metrics, QA tests.

### Structural - Two different bottom tab bars for the same eight roles

*Where:* UI/UX Brief §4 vs Mobile Design Brief §6

The UI/UX brief gives the MD Approvals, Payments, Projects, Staff, More with no Home. The Mobile brief gives Home, Approvals, Payments, Projects, More and drops Staff. Sales is Leads, Groups, Team versus Home, Leads, Calls, Meetings. Design partner is Projects, Requests, Payments versus Home, Projects, Approvals, Meetings. Production Head is Projects, Expenses, Crew versus Home, Schedule, Stock, Crew. At most one of these can be built.

*Affects:* Affects: every screen's reachability, and the Groups, Staff, Requests and Expenses modules, which have no tab in the newer brief.

### Major - Two visual directions in one document set

*Where:* Visual Direction v1 §2 vs Mobile Design Brief §5

Visual Direction proposes deep slate #1F2A36, powder blue #3E6E8C, blush #F2A49A and peach #F6C7AE. The Mobile Design Brief, which says it uses the company brand for this build, proposes ink #3A3158, cream #F6F2E8, lavender #D8CBEE and blush #F6B1BC, with Playfair Display and Poppins. The UI/UX brief still calls visual style open. This map uses the Mobile brief's palette.

*Affects:* Affects: every screen, and the token layer.

### Structural - No platform or tenant admin console anywhere in the set

*Where:* Missing from all 14 documents

The model is an aggregator: Shukra owns the platform and rents it to firms, each under its own brand. Tenant settings exist inside a tenant, but nothing describes creating a tenant, provisioning its number or Workspace account, billing the rent, or platform-level support. This is a whole application with no site map, no screens and no schema.

*Affects:* Affects: onboarding, billing, and the per-tenant brand decision (M19).

### Major - Modules with no home in the navigation

*Where:* UI/UX §4 vs Mobile §6

Four modules have a tab in one brief and none in the other: Lead groups (Sales Head), Staff (MD), Requests (design partner, undefined label), and Expenses (Production Head). If the Mobile brief wins, each of these has to live under More, which contradicts the brief's own rule that nothing is hidden behind a menu.

*Affects:* Affects: Leads, People, Internal money, Projects.

### Major - Delivery Problems screen is still a proposal

*Where:* UI/UX §9, open item 16

The screen the MD and department heads need when alerts fail is drafted but not approved, and the design partner absence alert wording is still a draft. The map shows the screen as open rather than specified.

*Affects:* Affects: Alerts, MD home, alert delivery metric.

### Minor - Notifications has no entry point

*Where:* UI/UX §5

The brief says access-change notices sit in an in-app notifications list and never on WhatsApp, but neither navigation brief allocates a tab, bell or row for it. As mapped, the list is unreachable.

*Affects:* Affects: Entry & access, People.

### Minor - Plugin screens are named but not designed

*Where:* Spec §12, §23.4

The call agent, the overseer and the transcript plugin are described in prose with no screens, and the call agent's pending-actions review is central to how it is supposed to stay safe. Defaults for a new tenant are also undecided.

*Affects:* Affects: Plugins, Meetings.

### Minor - Performance review has charts but no screen

*Where:* Spec §14 vs UI/UX §5

Ratings appear on dashboards and in the metrics, but no brief defines the person-level performance screen, the weekly count of completed stages, or where a head records the Monday review. The map places them under People as an inferred screen.

*Affects:* Affects: People, dashboards.

---

## Page inventory at a glance

| # | Area | Pages | Who |
|---|---|---|---|
| 1 | Entry & access | 5 | All staff, Client |
| 2 | Home & dashboards | 11 | Everyone |
| 3 | Leads & groups | 11 | Sales Head, Sales rep, MD |
| 4 | Calls & retry | 7 | Sales rep, Sales Head |
| 5 | Meetings | 6 | Sales rep, Design partner, Design Head, Client |
| 6 | Projects | 10 | MD, Design Head, Design partner, Production Mgr, Production Head, Sales rep, Sales Head, Client |
| 7 | Design & approvals | 8 | Design partner, Design Head, Production Mgr, Client |
| 8 | Quotations | 5 | Design partner, Design Head, MD, Client |
| 9 | Client payments | 10 | MD, Design partner, Client |
| 10 | Internal money | 7 | MD, Production Head, Production Mgr, Design partner, Marketing Head |
| 11 | Production & inventory | 14 | Production Mgr, Production Head, MD |
| 12 | Client portal | 7 | Client |
| 13 | Communication | 7 | Everyone |
| 14 | Alerts & delivery | 4 | MD, Design Head, Production Head, Sales Head |
| 15 | People, leave & performance | 12 | MD, Sales Head, Design Head, Production Head, All staff |
| 16 | Marketing | 7 | Marketing Head, MD |
| 17 | Logs & audit | 4 | Everyone, MD |
| 18 | Tenant settings | 13 | MD |
| 19 | Optional plugins | 3 | MD, All staff |
| 20 | Not in First Light | 5 | MD |
| | **Total** | **156** | |

*Version 1.0 - 22 November 2026. Generated from `first-light-sitemap/` - edit `data.js` or the `enrich*.js` files and rebuild, do not hand-edit this file.*
