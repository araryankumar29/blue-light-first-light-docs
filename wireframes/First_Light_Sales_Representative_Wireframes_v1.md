# First Light · Sales representative wireframes v1

Plain-text version of the wireframe set. Each board lists its phone screens with numbered components, and each requirement page lists the rules for those screens. Bracketed values such as [14] are placeholders.

_Version 1 · 22 November 2026 · for cross-check_

## First Light · Sales representative wireframes

Four boards and four requirement pages, sixteen phone screens, in the same standard components as the other role sets. The representative calls the leads assigned to them, records one outcome per call, books meetings, follows up stalled quotes, and after handover handles complaints and decides warranty cover.

Sources: sitemap pages for the sales representative (home-rep, queue, call-card, outcome, meeting-set, retry, callback, call-history, stalled, unresponsive, lead-card, closed-leads, project-home, access and history pages), the access matrix, and the specification's sales representative powers.

## Conflicts settled

| Item | What the sources say | Decision and why |
|---|---|---|
| Tab bar | Sitemap: Home, Leads, Calls, Meetings, More. | Home, Calls, Leads, Messages, More. Meetings sit in Messages with the calendar, as for the other staff. |
| Call outcomes | Spec and older documents: four. Sitemap outcome page: seven, settled. | Seven, as settled. The four-outcome text in three documents is to be corrected. |
| Duplicate phone numbers | Voice decision: entries with the same number are highlighted. Spec: groups use only eight options. | Both. Eight options build groups; a number with several entries is a highlight on the lead, shown to assigned reps. |
| Transcripts | Sitemap: open, held until architecture decision. | Held. Shown as a note, not built. |
| Complaints | Spec: rep handles and decides cover; Production Head assigns the Production Manager. | Kept as the spec describes. |

## Cross-check · what was verified

- Every screen maps to a sitemap page for the sales representative or to a power in the specification.

- A representative never approves or rejects a lead; they only call.

- Exactly one call outcome per call, from the seven settled outcomes.

- Messages only between 8 a.m. and 10 p.m.; outside it they wait until 8 a.m.

- Representatives see only the closed leads they worked on, and only the groups assigned to them.

- No rupee figures are shown except placeholders in brackets.

## Sales representative wireframes · 1 of 4 · Home, calls

The representative's day: the start-calling action, the queue, the call card with one required outcome, and the seven outcomes.

### Home

Calls today, follow-ups, weekly count, rating.

**Components**

1. **Header**: Title centre. Logout at top right, as on the other staff homes.
2. **My calls today, start action**: The one primary action on this screen. Shows calls made against today's limit.
3. **Follow-ups due**: Call-backs and stalled quotes due now or today. Each opens its lead card.
4. **Weekly count and rating**: Calls and meetings set this week, and this rep's own rating. Only their own figures.
5. **Tab bar**: Home, Calls, Leads, Messages, More. Meetings sit in Messages with the calendar. Sitemap bar differs; see decisions.

### Today's calls

Queue by group with leads left.

**Components**

1. **Header**: Title only.
2. **Group and leads left**: The group name, leads left, and the call window and limit set by the Sales Head.
3. **Start calling and skip**: Start opens the next lead's call card. Skip moves on without an outcome.
4. **Next leads**: Each lead shows its attempt count out of the limit.
5. **Tab bar**: Calls active.

### Call card

One lead, call and WhatsApp, required outcome.

**Components**

1. **Header**: Back to the queue.
2. **Client block**: Client name, number, city, source, budget and attempt count out of the limit.
3. **Call and WhatsApp**: Call dials the number. WhatsApp opens the company thread for this lead.
4. **Outcome field, required**: Exactly one outcome per call. Cannot save without one.
5. **Notes**: Optional. Kept on the lead's history.
6. **Save and next**: Saves the outcome and shows the next lead.

### Outcome

The seven outcomes, each with its next step.

**Components**

1. **Header**: Back to the queue.
2. **Background**: Call card behind the sheet.
3. **Outcome title**: Exactly one outcome per call. Seven outcomes (settled).
4. **Seven outcomes**: Meeting set · connected not a meeting · warm not now · not interested · not reached · indefinite delay · active but not responding.

## Requirements · home, calls

The representative calls leads and records one outcome per call. They never approve or reject a lead; they only call.

### Home

The representative's home shows today's calls against the day's limit, with one primary action, Start calling. It shows follow-ups due, this week's count of calls and meetings, and their own rating. It shows only their own figures.

**Rules and states**

- One primary action: start calling
- Own figures only
- Limit set by the Sales Head

**Sources**

Sitemap home-rep (Spec §26.7). Spec: sales representatives call; they never approve or reject leads.

### Today's calls

The queue shows the group being worked, how many leads are left, and the call window and daily limit set by the Sales Head. Start calling opens the next lead. Skip moves on without recording an outcome, and the lead stays in the queue.

**Rules and states**

- Window and limit from the Sales Head
- Skip records nothing
- Leads left shown per group

**Sources**

Sitemap queue (Mobile §7). Window and daily limit values: tenant settings, to confirm.

### Call card

The call card shows the client, number, city, source, budget and the attempt count out of the limit. Call and WhatsApp are one tap each. The outcome is required: the rep cannot save a call without choosing one of the seven outcomes. Notes are optional and stay on the lead's history.

**Rules and states**

- Exactly one outcome per call
- Attempt count out of limit
- Notes optional

**Sources**

Sitemap call-card (Mobile §7), outcome (Spec §26.2). Decision: seven outcomes, settled.

### Outcome

The seven outcomes are: meeting set, connected but not yet a meeting, warm but not now, not interested, not reached, indefinite delay, and active but not responding. Choosing one reveals the next step in one line. Not interested moves the lead to the cold archive; not reached enters the retry cycle; indefinite delay moves it to the unresponsive archive.

**Rules and states**

- Seven outcomes, one per call
- Next step in one line
- Not interested: cold archive; not reached: retry

**Sources**

Sitemap outcome (Spec §26.2, App Flow §3). The sitemap and the decision both say seven; three documents still say four and are to be corrected.

## Sales representative wireframes · 2 of 4 · Follow-ups and meetings

Meetings, call-backs, stalled quotes and the retry cycle, each with its own timing rule.

### Meeting set

Date, time, designer tag, comment; approval requested.

**Components**

1. **Header**: Back to the call card.
2. **Date and time**: Date and time pickers.
3. **Design partner tag**: The design partner must approve the meeting.
4. **Comment**: Written for the design partner.
5. **Request approval**: Sends for the design partner's approval; the Design Head is notified.

### Call back

Time the client gave; booked as a call tomorrow.

**Components**

1. **Header**: Back.
2. **Time the client gave**: The date and time the client offered.
3. **Booked call**: Booked as a call and logged.
4. **No date given**: Marks indefinite delay and moves the lead to the unresponsive archive.

### Stalled quotes

Follow-ups after silence; round limits.

**Components**

1. **Header**: Title only.
2. **Stalled list**: Days of silence and the round number. Lead stays live throughout.
3. **Follow-up type**: Send a catalogue, sample work, a video or make a call.
4. **Meeting and not won**: A new meeting after round 2, on the same temporary project. Not won after round 3 moves it to closed leads.

### Retry and unresponsive

Retry passes, send window, return dates.

**Components**

1. **Header**: Title only.
2. **Pass one timeline**: Call, catalogues, call, testimonials three hours later, call, sample videos. The timing values are tenant settings.
3. **Seven-day wait**: Countdown until the second pass.
4. **Send window**: Messages only in the window. Outside it they wait until 8 a.m.
5. **Tab bar**: Calls active.

## Requirements · follow-ups and meetings

Each follow-up has its own timing rule. The client's time is kept; the rep does not invent one.

### Meeting set

A rep sets a meeting with a date, time, design partner tag and comment, and requests the design partner's approval. The design partner must approve it, and the Design Head is notified of every meeting. A meeting is what creates the temporary project once the design partner approves.

**Rules and states**

- Design partner must approve
- Design Head notified of every meeting
- Approval creates the temporary project

**Sources**

Sitemap meeting-set, meeting-book (App Flow §3), temp-project (Spec §23.1).

### Call back

A time the client gives is booked as a call the next day and logged. A postponement with no date marks the lead as indefinite delay and moves it to the unresponsive archive.

**Rules and states**

- Client's time kept, booked next day
- No date: indefinite delay, archived

**Sources**

Sitemap callback (App Flow §3).

### Stalled quotes

A client holding a quote who keeps stalling is followed up after three days of silence, up to three rounds. A new meeting after round two stays on the same temporary project. After round three the lead is marked not won and moves to the closed-leads file. The lead stays live throughout. The three days and the rounds are tenant settings.

**Rules and states**

- Three days silence; three rounds
- New meeting after round 2, same temp project
- Not won after round 3; closed leads

**Sources**

Sitemap stalled (Spec §26.2).

### Retry and unresponsive

The retry cycle makes a first pass of calls and messages: a call, catalogues, a call, testimonials three hours later, a call, then sample videos. After a seven-day wait a second pass repeats once, then the lead moves to the unresponsive archive. Messages go only between 8 a.m. and 10 p.m.; outside that they wait until 8 a.m. A rep can call again or set a return date, which moves the lead to its own scheduled list. A rep cannot delete an unresponsive lead.

**Rules and states**

- 8 a.m. to 10 p.m. only
- Two passes, then unresponsive archive
- Rep cannot delete

**Sources**

Sitemap retry, unresponsive (Spec §26.2). Messaging window: Spec §26.8.

## Sales representative wireframes · 3 of 4 · Leads and project

The leads assigned to this rep, the lead card, the project after the meeting, and the client's history.

### My leads

Assigned groups, duplicate-number highlight, closed leads (mine).

**Components**

1. **Header**: Search right.
2. **Assigned groups**: Only the groups the Sales Head has assigned to this rep.
3. **Duplicate-number highlight**: Leads sharing a phone number are highlighted with each entry and its date. Shown only if assigned to this rep.
4. **Closed leads, mine**: Sees only the closed leads they worked on.
5. **Tab bar**: Leads active.

### Lead card

Facts, calculator quotation, history, call.

**Components**

1. **Header**: Back to Leads.
2. **Lead facts**: Client, city, source, budget, timeline. Calculator quotation travels with the lead.
3. **Calculator quotation**: Read-only. The calculator logic is not changed.
4. **History**: Calls, meetings and notes, newest first.
5. **Call**: Opens the call card.

### Project

Full visibility after the meeting; quiet-client note.

**Components**

1. **Header**: Back.
2. **Project summary**: The rep keeps full visibility of the whole project, not only parts of it.
3. **Quiet client**: Used when the client goes silent. A note shows the last contact.
4. **Project history**: Calls, meetings and notes on this project.
5. **Transcripts (held)**: Shown as held. Not built, as the sitemap requires.

### Client history

One ID; returning clients start a new project.

**Components**

1. **Header**: Back.
2. **Client ID**: One ID per client. Search by ID, name or number.
3. **Timeline**: Every call, meeting and note. View-only for a returning client.
4. **Returning client rule**: New project, never linked to the old one.

## Requirements · leads and project

The representative works only the leads the Sales Head assigns, and keeps full visibility of a project after the meeting.

### My leads

The representative sees only the groups the Sales Head assigned to them. A phone number with more than one entry is highlighted with each entry and its date. The highlight shows only if one of those entries is assigned to this rep. The closed leads they see are only those they worked on.

**Rules and states**

- Assigned groups only
- Duplicate-number highlight, if assigned
- Closed leads: only the ones they worked

**Sources**

Sitemap lead-card, closed-leads (Spec §3, §23.1). Decision of 22 Nov: duplicates highlighted, shown to assigned reps.

### Lead card

The lead card shows the client, city, source, budget and timeline. The calculator quotation travels with the lead and is read-only; the rep can copy its figures into a quotation. History lists calls, meetings and notes, newest first.

**Rules and states**

- Calculator quotation read-only
- History newest first

**Sources**

Sitemap lead-card (Spec §3). Calculator logic belongs to the calculator and is not changed.

### Project

After the meeting the representative stays on the project with full visibility of the whole project, not only parts of it. They step in to help if communication breaks down or the client goes quiet, and a note on the project shows the last contact. Transcripts are held until the architecture decision.

**Rules and states**

- Full visibility after the meeting
- Steps in when the client goes quiet
- Transcripts held

**Sources**

Spec: sales representative keeps full visibility (project team section). Sitemap meeting-transcript: open, not built.

### Client history

Each client has one ID with every call, meeting and note. A returning client gets a new project, and old projects are never linked to new ones. The rep can search by ID, name or number.

**Rules and states**

- One ID per client
- Returning client: new project, never linked

**Sources**

Sitemap client-id (Spec §6).

## Sales representative wireframes · 4 of 4 · Care, messages, leave, settings

After handover the representative handles complaints and decides warranty cover; messages and leave round out the screens.

### Complaint

Respond within 24 to 48 hours; covered or not.

**Components**

1. **Header**: Back. Raised after handover.
2. **Complaint**: What the client reported and when. Response due in 24 to 48 hours.
3. **Problem**: Gather the request and the problem first.
4. **Covered or not**: The rep decides whether the claim is covered (10-year warranty from handover).
5. **Written reason**: An uncovered claim gets a written reason. Covered goes to the Production Head.
6. **Send**: Covered: goes to the Production Head, who assigns a Production Manager.

### Messages

Calendar, meetings, tagged conversations.

**Components**

1. **Header**: Title only.
2. **Calendar**: My meetings on a calendar: the meetings I set and those I am tagged in.
3. **Meeting cards**: Swipeable, ordered by time, View all.
4. **Conversations**: Team groups and project groups where I am tagged. Tap opens the group.
5. **Tab bar**: Messages active.

### My leave

Requests go to the Sales Head.

**Components**

1. **Header**: Title only.
2. **Apply**: Leave requests go to the Sales Head.
3. **My requests**: Status of each request.

### Settings

Profile, own pay, devices, terms, log out.

**Components**

1. **Header**: Back.
2. **Profile**: Name, role, company email (login ID).
3. **My pay**: Own pay and claims only.
4. **Devices**: Sign out one at a time.
5. **Terms**: Readable any time.
6. **Log out, alone at the bottom**: Set apart from the other items.
7. **Tab bar**: Opened from the header; More active.

## Requirements · care, messages, leave, settings

After handover the representative answers complaints and decides warranty cover. Messages, leave and settings are the same as the other staff screens.

### Complaint

A complaint is raised by the representative after handover. The representative gathers the request and the problem and responds to the client within 24 to 48 hours. They decide whether the claim is covered under the 10-year warranty that starts at handover. An uncovered claim gets a written reason. A covered claim goes to the Production Head, who assigns a Production Manager.

**Rules and states**

- Respond within 24 to 48 hours
- Rep decides cover; written reason if not
- Covered: Production Head assigns

**Sources**

Spec §11 and §6 (complaints, warranty), specification warranty rules (10 years from handover, decided in v7).

### Messages

Messages shows the representative's calendar of meetings, a swipeable list of meeting cards, and the conversations where they are tagged. Tapping a conversation opens the group.

**Rules and states**

- Calendar and meeting cards
- Tagged conversations

**Sources**

Decision of 22 Nov (staff messages pattern).

### My leave

A representative applies for leave to the Sales Head. The MD does not handle sales leave.

**Rules and states**

- Applied to the Sales Head

**Sources**

Spec: sales representatives apply to the Sales Head; heads apply to the MD.

### Settings

Settings keeps the profile, the representative's own pay and claims, devices, terms and log out. Logout sits alone at the bottom.

**Rules and states**

- Own pay only
- Company email is the login ID

**Sources**

Sitemap session (Spec §22.3), payslip (Spec §14).
