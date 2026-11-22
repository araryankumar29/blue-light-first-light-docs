# First Light · Design Head wireframes v1

Plain-text version of the wireframe set. Each board lists its phone screens with numbered components, and each requirement page lists the rules for those screens. Bracketed values such as [14] are placeholders.

_Version 1 · 22 November 2026 · for cross-check_

## First Light · Design Head wireframes

Five boards and five requirement pages, twenty phone screens, in the same standard components as the client and design partner sets. The Design Head's job is to approve what reaches the client, to monitor every project and meeting in the design department, and to look after the team. Conflicts between the sitemap, the access matrix and the specification are settled on the decisions page.

Sources: sitemap pages where the Design Head is listed (home-dh, design-approval, payment-reject, project-rating, client-id, weekly-review, directory, cover, leave-approve, log-scope, rejected-versions, quote pages, delivery-problems), the access matrix, and the specification's Design Head powers.

## Conflicts settled

| Item | What the sources say | Decision and why |
|---|---|---|
| Tab bar | Sitemap: Home, Projects, Approvals, Meetings, More. Access matrix agrees. | Home, Approvals, Projects, Messages, More. Meetings sit inside Messages with the calendar, as for the design partner. Keeps the bar to five and matches the staff pattern. |
| Client payments | Access matrix: no access. Payment reject page: the head receives rejections for client payments. | Read-only status on their projects, and rejections routed to them. Only the MD confirms payments (sitemap and spec agree). |
| Internal money | Access matrix: no access for the Design Head. Spec: heads are salaried. | Own pay, payslips and reimbursements only. Team pay stays with the MD. |
| Meetings | Sitemap: meeting list for the head. Spec: head notified of every meeting, tagged or not. | The head sees and is notified of every meeting, but approves only where tagged. |
| Technical files | Sitemap and spec agree: the Design Head does not approve them. | Kept out of the queue; visible on the project as read-only. |
| Move project | Spec: head can move any project at any time. Sitemap: not listed. | Included, with a reason and logging. Recorded as a spec power. |
| Access requests | Sitemap: anyone on the project approves. Spec: head approves on projects they are on. | Both. Anyone on a project can approve; the head can approve on any project they are on. |
| Delivery problems | Sitemap: open, awaiting owner approval (open item 16). | Held. A notice on Home only, nothing built. |
| Ratings | Sitemap: project rating reviewed Monday to Monday. Spec: heads see team and project ratings. | Shown on the Monday review and Team screens. Explained by stage history. |

## Cross-check · what was verified

- Every screen maps to a sitemap page for the Design Head or to a power in the specification (sources named on each requirement page).

- The Design Head approves renders, quotations, design estimates and extensions, and designers' leave. The Design Head does not approve technical files.

- Every approval card rejects only with a written reason; approvals are logged one by one, even when batched.

- The head cannot confirm a client payment; only the MD does.

- All rupee amounts are placeholders; the numbers in brackets are samples.

- Heads apply to the MD for their own leave; the MD does not take leave.

## Design Head wireframes · 1 of 5 · Home and approvals

Home is the monitoring view. Approvals is the queue: each card is approved or rejected with a reason, and nothing reaches the client until approved.

### Home

Waiting counts, access requests, team ratings, meetings, alerts.

**Components**

1. **Header**: Search and Logout at the top right. Logout is also in Settings.
2. **Awaiting approval counts**: Counts of items needing this head's decision. Tapping a count opens the Approvals queue filtered to it. Sample numbers in brackets.
3. **Access requests**: Requests to see a live project. Shown only where this head is on the project or can add people.
4. **Team ratings**: Ratings of the design team for the week, from the Monday review. Sample names in brackets.
5. **Meetings this week**: Every meeting in the design department. This head is notified of each one.
6. **Alerts**: Absence cover alerts and failed deliveries. The delivery list is held, not built.
7. **Tab bar**: Home, Approvals, Projects, Messages, More. Approvals is this head's core queue; Meetings sit inside Messages, as for the design partner.

### Approvals

Queue by kind: renders, quotations, estimates, extensions.

**Components**

1. **Header**: Search right.
2. **Queue filters**: Filter by kind. The queue is one list, newest first, per kind.
3. **Approval card**: What it is, the requester, a brief of change, approve and reject. Same card for every approval type.
4. **Quotation card**: Total with Indian digit grouping. The client sees nothing until this approval.
5. **Design estimate card**: Design time estimate, given after the token is paid. Approved by this head.
6. **Extension card**: Design-phase extension beyond the 15-day stage timer. Reason shown with it.
7. **Tab bar**: Approvals active.

### Approve sheet

Open a card: file, brief, reason, approve several.

**Components**

1. **Header**: Search right.
2. **Background**: Queue behind the sheet.
3. **File and version**: The file and its version, opened from the card. Previous versions one tap away.
4. **Brief of change**: The short brief the designer wrote for this version.
5. **Approve or reject**: Reject needs a written reason. The reason goes to the designer and is logged. Nothing reaches the client until approved.
6. **Approve several**: Batch approval for ticked cards, each still logged one by one.

### Approval cards

Same card for every approval type.

**Components**

1. **Header**: Search right.
2. **Approval card**: What it is, the requester, a brief of change, approve and reject. Same card for every approval type.
3. **Quotation card**: Total with Indian digit grouping. The client sees nothing until this approval.

## Requirements · home and approvals

The head's daily queue. The home monitors; the approvals decide. Nothing reaches the client before this head approves a render or a quotation.

### Home

The Design Head home is a monitor, not a to-do list alone. It shows what waits for this head (renders and quotations, estimates, extensions), access requests, the week's team ratings, every meeting in the department, and alerts such as a design partner's absence. The delivery-problems list is shown as held, because the owner has not yet approved it.

**Rules and states**

- Counts open the filtered queue
- Team ratings from the Monday review
- Delivery problems held (open item 16)

**Sources**

Sitemap home-dh (Spec §26.7), alerts (UI/UX §9). Spec: design partner absence alerts the Design Head.

### Approvals

Every approval is one card, the same component for renders, quotations, estimates, extensions and leave. A card shows what it is, who asked, the amount or date where relevant, and a brief of change. Approve or reject; a rejection needs a written reason that goes to the designer and is logged. The head can approve several at once, but each approval is still logged on its own.

**Rules and states**

- One card for every approval type
- Reject needs a written reason
- Batch approve still logs each item

**Sources**

Sitemap design-approval (Spec §8), approvals pattern (Spec §8). Spec §8: nothing reaches the client before Design Head approval.

### Approve sheet

Opening a card shows the file and its version, the brief of change, and the previous versions one tap away. The head approves or rejects. An approved render or quotation then reaches the client through the company number. A rejected version stays visible to the team with its reason and never reaches the client.

**Rules and states**

- Previous versions one tap away
- Approval reaches the client via company number
- Rejected: team only, with reason

**Sources**

Sitemap design-approval (open the file and its previous versions), rejected-versions (Spec §21.1).

### Approval cards

Estimates and extensions are approvals too. The design time estimate is given by the designer after the token is paid and is approved here. A design-phase extension beyond the 15-day stage timer is approved here, with its reason on the card. Technical files are not in this queue: the Production Manager approves them, and this head does not.

**Rules and states**

- Estimates after token, approved here
- Extension beyond 15 days, with reason
- Technical files are not approved here

**Sources**

Specification: design estimates and extensions are approved by the Design Head. Sitemap technical-files: the Design Head does not approve technical files.

## Design Head wireframes · 2 of 5 · Meetings and projects

Monitor every meeting and every project from one place. A project can be moved to another person or shared, and every action is logged.

### Meetings

All design meetings, pending changes, filters.

**Components**

1. **Header**: Title, search right.
2. **Week list**: Every design meeting, grouped by day. Each row shows its state.
3. **Pending change**: Shows who has not yet confirmed a change request.
4. **Filters**: All, by designer, by project.
5. **Tab bar**: Messages active; this list sits in Messages with the calendar.

### Projects

Traffic light summary, rows, paused, temporary projects.

**Components**

1. **Header**: Search right.
2. **Status summary**: Counts by traffic light. Red is past 125% of planned time. Client pauses never count as yellow or red.
3. **Project row**: Name, stage, owner, days left, traffic light. Tap opens the project.
4. **Paused row**: Paused by client, shown as paused and never yellow or red.
5. **Temporary projects**: Projects before the token. Visible to the design partner, Design Head and MD only.
6. **Tab bar**: Projects active.

### Project (head)

Hero, approvals, read-only payments, team, access.

**Components**

1. **Header with menu**: Back. Menu holds Move project and Share details.
2. **Hero and owner**: Same project hero as the client and the designer, with the owner shown.
3. **Approvals and history**: Pending approvals on this project, and the append-only stage history.
4. **Payments, read only**: This head sees payment status but cannot confirm payments. Only the MD confirms.
5. **Project team**: Everyone on the project, with the head's own place marked.
6. **Access requests**: Approve or decline, and add a person to the project.
7. **Tab bar**: Projects active.

### Move project

Sheet to move ownership, with a reason.

**Components**

1. **Header with menu**: Back. Menu holds Move project and Share details.
2. **Background**: Project behind the sheet.
3. **Move project**: Available to this head at any time. Logged with the old and new owner.
4. **New owner and reason**: Choose a person; a reason is required so the move is explained in the log.
5. **Move and notify**: Notifies the old and the new owner, and the client's team view updates.

## Requirements · meetings and projects

This head sees every project and every client meeting, and is notified of every meeting, even when not tagged. The monitoring must be complete without the head needing to ask.

### Meetings

The head sees every meeting in the design department in one list, grouped by day, with each meeting's state. A pending change request shows who has not yet confirmed. The head is notified of every meeting, even when not tagged. Meetings sit inside Messages with the calendar, as they do for the design partner.

**Rules and states**

- All meetings, grouped by day
- Notified of every meeting, tagged or not
- Pending change shows who is missing

**Sources**

Specification: the Design Head is notified of every meeting. Sitemap meeting-list (Design Head). Decision: Meetings sit inside Messages.

### Projects

All projects are listed with a traffic-light summary. Red is past 125% of planned time. A client pause shows as paused and never as yellow or red. Temporary projects before the token are visible to the designer, the Design Head and the MD only.

**Rules and states**

- Traffic light: red past 125%
- Paused by client is never yellow or red
- Temporary projects: designer, head, MD only

**Sources**

Sitemap project-home, paused, temp-project (Spec §6, §23.1). Traffic light: red past 125% of planned time, per the stage timer rules.

### Project (head)

Inside a project this head sees everything on it: the approvals waiting, the stage history, the payment status (read only), the team, and access requests. The head can see payments but cannot confirm them; only the MD confirms a payment. Anyone already on a project can approve an access request, and this head can approve on any project they are on and add anyone to it. Every grant is logged.

**Rules and states**

- Payments read only; MD confirms
- Access: anyone on project approves; logged
- Head approves access on projects they are on

**Sources**

Sitemap access-request (Spec §23.6), payment rules (Spec §9).

### Move project

The Design Head can move any project to a different person at any time. A reason is required and the move is logged with the old and new owner. The old and new owners are notified. This power is in the specification only; the sitemap does not list it, so it is added here and recorded in the decisions page.

**Rules and states**

- Move at any time, reason required
- Logged with old and new owner
- Power from spec; not in the sitemap

**Sources**

Spec §26.7 (move any project to a different person at any time). Not in sitemap; decision: included.

## Design Head wireframes · 3 of 5 · Team and leave

The team, each person's load and rating, leave with cover, and the Monday review of every card.

### Team

Designers, load, leave, ratings.

**Components**

1. **Header**: Title, search right.
2. **Team list**: Designers with role, current load and status. Shows leave.
3. **Ratings**: Each person's rating for the week, from the Monday review.
4. **Reporting line**: Shows where each person sits.
5. **Tab bar**: Team is opened from More.

### Person

Load, rating history, set cover.

**Components**

1. **Header**: Back to Team.
2. **Identity**: Photo, name, role. Salary limit is shown to the MD only.
3. **Load**: Projects owned, with stage. Used when choosing cover or moving a project.
4. **Rating history**: Each week's rating with its drivers, so a rating can be explained.
5. **Set cover**: Choose cover when this person is on leave.

### Leave

Approve leave; choose cover scope.

**Components**

1. **Header**: Back to Team.
2. **Leave card**: The person, dates, length and reason. Same approval card as other approvals.
3. **Approve or reject**: Approving asks for a cover scope. Reject needs a reason.
4. **Cover scope title**: The cover is chosen by the head when a designer is on leave.
5. **Scope choice**: Everything the person owns, or selected projects and tasks.
6. **Crew rule**: Crew go with the project and nothing else. Stated on the sheet.
7. **Approve and notify**: Approves the leave and tells the cover person.

### Monday review

Cards reviewed by Monday; target every card.

**Components**

1. **Header**: Title only. Runs Monday to Monday.
2. **Review progress**: How many person cards are reviewed. Target 100%.
3. **Person card**: One card per person: stages completed, rating, and the drivers. Mark reviewed; add a note.
4. **Not yet reviewed**: Who is still open for the week.
5. **Tab bar**: Opened from More.

## Requirements · team and leave

The head is responsible for the design team: their load, their ratings, their leave, and the weekly review.

### Team

The team list shows each designer with their role, current load and status, including who is on leave. Ratings are shown for the week. The Design Head sees their team's and their projects' ratings. Designers apply to this head for leave; the head does not take leave, because heads apply to the MD.

**Rules and states**

- Load and leave visible
- Ratings: team and projects
- Heads apply to the MD for leave

**Sources**

Spec §14 (heads' view of ratings), §13 (leave: designers apply to the Design Head; heads apply to the MD). Sitemap directory (UI/UX §4).

### Person

A person's profile shows their projects and stage, their load, and their rating history. Each rating can be opened to the stage history that fed it, so a rating is always explainable. Salary limits are shown to the MD only.

**Rules and states**

- Rating explained by stage history
- Salary limit: MD only

**Sources**

Sitemap performance (Spec §14 · stage history), directory (salary limit). Spec §14: a delay counts only when it holds a project back.

### Leave

A designer's leave arrives as an approval card. The head approves or rejects with a reason. On approval the head chooses the cover scope: everything the person owns, or selected projects and tasks. Crew linked to those projects move with them and nothing else. The cover person is notified.

**Rules and states**

- Same approval card
- Cover: everything, or selected projects
- Crew move with projects only

**Sources**

Sitemap leave-approve, cover (Spec §13). Crew rules are in Spec §10.

### Monday review

Performance runs Monday to Monday, and Monday is the review day. Each person has a card showing stages completed, rating and drivers. The head marks each card reviewed and can add a note. The target is every card reviewed by Monday, and the screen lists who is still open.

**Rules and states**

- Monday to Monday cycle
- Target: every card reviewed by Monday
- Lists who is still open

**Sources**

Sitemap weekly-review (PRD §4), performance. Spec §14: Monday to Monday.

## Design Head wireframes · 4 of 5 · Payments, leads, logs

Payment rejections that belong to this head, the closed-leads file, the client record, logs and rejected versions.

### Payment rejected

Reply and tag people; MD confirms payments.

**Components**

1. **Header**: Back to Alerts.
2. **Rejection**: The rejection and the MD's reason. Routed to this head because the head owns the client payment.
3. **Reason**: Write the fix or the reason. Required.
4. **Tag people**: Tag the people who must act. A tagged person sees this rejection and this project only.
5. **Send**: Work can pass both ways along the chain. The MD confirms payments; the head does not.

### Closed leads

Quoted, never paid. Reassign rejected leads.

**Components**

1. **Header**: Search right.
2. **Closed-leads file**: Leads that were quoted but never paid the token, kept apart from live projects. This head sees all of them.
3. **Rejected lead reassign**: A rejected lead can be reassigned by this head, directly or through the sales representative.
4. **Client record**: One ID per client. Old projects are never linked to new ones.

### Logs

Own actions and team logs, append-only.

**Components**

1. **Header**: Title only.
2. **Scope**: Own actions, or the team's logs. The full correction log is for the MD only.
3. **Log entries**: Append-only, newest first. Nothing here can be edited or deleted.
4. **Tab bar**: Opened from More.

### Rejected versions

Visible to the team with the reason; never to the client.

**Components**

1. **Header**: Back.
2. **Rejected version**: Stays visible to the team with its reason. The client never sees it.

## Requirements · payments, leads, logs

What this head sees about money, leads and the record. The head reads and routes; the MD confirms money.

### Payment rejected

A client payment rejected by the MD goes to the department head who owns the project. For a client payment that is this Design Head. The head writes a reason or the fix, and tags the people involved. A tagged person sees that rejection and that project only. Work can pass both ways between the head and the MD.

**Rules and states**

- Routed to the owning head
- Tagged people see this project only
- Head does not confirm payments

**Sources**

Sitemap payment-reject (Spec §26.1). Spec: MD confirms payments; conflict resolved: head routes, MD confirms.

### Closed leads

Leads that were quoted but never paid the token move to the closed-leads file, kept apart from live projects. The Design Head sees all closed leads. A rejected lead can be reassigned by this head, directly or through the sales representative. The client record is one ID with every meeting, transcript, file and action; a returning client starts a new project.

**Rules and states**

- Head sees all closed leads
- Rejected lead reassigned by head
- Client record: one ID, new project for returners

**Sources**

Sitemap closed-leads, client-id (Spec §6). Specification: the head reassigns a rejected lead.

### Logs

A head sees their own actions and their team's logs. The full correction log is for the MD only. Logs are append-only: nothing can be edited or deleted, which is the log's integrity target.

**Rules and states**

- Own and team logs only
- Full correction log: MD only
- Append-only; zero edits or deletes

**Sources**

Sitemap log-scope (Spec §16).

### Rejected versions

A rejected version stays visible to the design team with its reason attached, and can be restored as a new version. The client never sees a rejected version.

**Rules and states**

- Team only, with reason
- Restore as new version
- Client never sees it

**Sources**

Sitemap rejected-versions (Spec §21.1).

## Design Head wireframes · 5 of 5 · Settings

Settings in the standard five parts, with own pay only.

### Settings

Profile, own pay, devices, terms, log out.

**Components**

1. **Header**: Back. Opened from the header.
2. **Profile**: Name, role, company email (the login ID).
3. **My pay**: Only this head's own pay and claims. Team pay is not shown here.
4. **Devices**: Sign out one at a time. The MD can end all sessions.
5. **Terms**: Readable any time.
6. **Log out, alone at the bottom**: Set apart from the other items.
7. **Tab bar**: Opened from the header; More active.

## Requirements · settings

The head's own settings and pay. Team pay is not part of this head's view.

### Settings

Settings keeps the head's profile (company email is the login ID), their own payslips and reimbursements, devices and sessions, Terms and log out. Team pay is not shown here. Logout sits alone at the bottom.

**Rules and states**

- Own pay and claims only
- Company email is the login ID
- Devices: sign out one at a time

**Sources**

Sitemap session (Spec §22.3, §24), reimbursement (Spec §9), payslip (Spec §14). Spec §14: heads are salaried.
