# First Light · Design partner wireframes v2

Plain-text version of the wireframe set. Each board lists its phone screens with numbered components, and each requirement page lists the rules for those screens. Bracketed values such as [14] are placeholders.

_Version 2 · 22 November 2026 · supersedes v1_

## First Light · design partner wireframes

Five boards and five requirement pages, twenty phone screens in all, built on the same standard components as the client set. Every screen was checked against the sitemap and the registered decisions of 22 November before this version. Where the sources disagree, both are named and the screen is left open. Greyscale placeholders in square brackets; nothing here is visual design.

Sources: sitemap pages for the design partner (signin-staff, session, home-dp, meeting pages, project pages, design and quote pages, payments and ledger pages, reimbursement, change requests, performance), and the 22 November voice decisions. Each requirement page cites its sources.

## Conflicts settled

| Item | What the sources say | Decision and why |
|---|---|---|
| Staff tabs | Sitemap: Home, Projects, Approvals, Meetings, More. Decision: Home, Tasks, Projects, Messages, More. | Decision. Approvals sit on Home and in each project; Meetings from Home and Messages. |
| Meeting decline | Sitemap: decline needs a written reason. Decision: approve, change time, hand over. | All four: Approve, Request change, Hand over, Decline with reason. |
| Transcript | Sitemap: held until the plugin decision. Decision: transcript pop-up at Done with meeting. | Held. Not built until the architecture decision. |
| Performance measure | Sitemap: personal rating and weekly stages. Decision: approval turnaround charts. | Home charts: approval turnaround. Rating on a Performance page, outside this set. |
| Reimbursement route | Sitemap: MD approves and pays. Decision: Design Head, then MD. | Partners: Design Head, then MD. Other staff: MD directly. |
| Team group link | Decision: tap opens the WhatsApp group. Sitemap: groups via Meta Groups API; invite-link route to confirm. | Opens through the stored invite link. Build dependency on the WhatsApp spike. |
| Stakeholders | Decision did not say the source. | Project team first, then studio search. |
| Sign-in | Sitemap: company email and password, 15-day session. | Sitemap used. |

## Cross-check · what was verified before presenting

- Every screen was matched to a sitemap page, a registered decision, or both. Pages with no source are marked as new.

- Money: only the 5% share is stated as a figure, in four steps (1.5, 1.5, 1, 1). No amount is invented; all rupee amounts are placeholders.

- Pay windows are the 10th, 20th and 30th for partners (sitemap pay-window), not the 1st.

- The temporary project is visible to the partner only, and becomes permanent only when the token is confirmed.

- The transcript is not drawn as a built screen, because the sitemap holds it.

- Staff sign-in uses company email and the MD creates every account; there is no self-registration link.

- Uploads go to the Design Head first; nothing reaches the client directly.

- Stage numbers are placeholders from the tenant's stage list, not names.

## Conflicts settled

| Item | What the sources say | Decision and why |
|---|---|---|
| Staff tabs | Sitemap: Home, Projects, Approvals, Meetings, More. Decision: Home, Tasks, Projects, Messages, More. | Decision. Approvals sit on Home and inside each project, which keeps the bar to five. |
| Meeting decline | Sitemap: decline needs a written reason. Decision: approve, change time, hand over. | All four options. Decline keeps the written-reason rule, so a refusal is never silent. |
| Transcript | Sitemap: held until the plugin decision. Decision: transcript pop-up. | Held. Nothing built until the architecture decision, as the sitemap requires. |
| Performance measure | Sitemap: personal rating. Decision: approval turnaround charts. | Home charts measure approval turnaround. The rating sits on a Performance page, outside this set. |
| Reimbursement route | Sitemap: MD approves and pays. Decision: Design Head, then MD. | Partners go through the Design Head, then the MD. Other staff go to the MD directly. |
| Team group link | Decision: tap opens the WhatsApp group. Sitemap: invite-link route still to confirm. | Kept as decided, built on the stored invite link. If the spike fails, the row says 'Ask the MD for the link'. |
| Stakeholders | Decision did not say the source. | Project team first, then studio search. |
| Sign-in | Sitemap: company email and password, 15-day session. | Sitemap used. Decision said nothing on staff sign-in. |

## Design partner wireframes · 1 of 5 · Sign-in, home, meeting

Standardized with the client set: same header, hero, cards, rows, tab bar. Staff tabs follow the decision of 22 Nov; conflicts are resolved on the decisions page.

### Staff sign-in

Company email, MD-created accounts.

**Components**

1. **Wordmark**: Company wordmark, centred. Staff entrance only; clients use the client sign-in.
2. **Heading and rule**: States that nobody self-registers.
3. **Company email**: Domain is locked to the company. Data: person.email.
4. **Password**: Show and hide. Data: person.credential.
5. **Sign in**: Enters the role home for this person.
6. **Keep signed in**: Rolling 15-day session, set by the MD. Resets on every open.
7. **Account note**: No create-account link. Text points to the MD.

### Home

Achievements, urgent needs, next meeting, deliverables.

**Components**

1. **Header**: Pay icon and Logout at the top right, as decided on 22 Nov. Settings and log out also at the bottom of Settings.
2. **Hero: avatar and achievements**: Open space with the person's avatar and this week's achievements. Data: person.avatar, achievements.week.
3. **Urgent needs**: Shown above everything, before meetings. Approval requests in a distinct colour; nothing else gets this treatment.
4. **Meetings strip, collapsed**: Compact. Taps expand the meeting. Ordered by time. Arrow leads to all meetings after 2 to 4 items.
5. **Deliverables, four boxes**: Ordered by urgency. Completed items leave straight away. Detail on the next board.
6. **Tab bar**: Home, Tasks, Projects, Messages, More. Registered order. Resolved: Approvals appear on Home and in each project; Meetings opens from Home and Messages.

### Meeting

Link, agenda, tagged people, approve, change, hand over.

**Components**

1. **Header**: Back to the list.
2. **Meeting link and time**: Link to join, time, length. Link created from the company Workspace account.
3. **Agenda**: Agenda as written. Editable before the meeting by the organiser.
4. **Tagged people**: Everyone in the meeting and their confirmation state.
5. **Approve, change, hand over**: Resolved: Approve, Request change, Hand over, Decline. Request change asks for date, time and region and goes to everyone tagged. Hand over notifies the Design Head. Decline needs a written reason, logged and visible to the rep, Sales Head and Design Head.
6. **Done with meeting**: Opens the close-out sheet. Close-out is separate from Decline.

### Done with meeting

Close-out sheet. Transcript held.

**Components**

1. **Header**: Back to the list.
2. **Background**: Meeting behind the sheet.
3. **Transcript (held)**: Shown as a held state. Not built until the plugin decision is made.
4. **Next agenda, editable**: Editable before submit. An AI first draft is planned later; placeholder only.
5. **Book next (optional)**: Not required. Creates a meeting for approval by those tagged.
6. **Submit**: Closes the meeting and updates the project's stage and history.

## Requirements · sign-in, home, meeting

What each screen must do, why, and where the rule comes from. The columns line up with the board opposite.

### Staff sign-in

Staff sign in with their company email and password. Accounts are created by the MD only; nobody self-registers, and there is no create-account link. The session lasts 15 days from the last open and is set by the MD. Changing the login ID ends every session on the account, and the person is told by WhatsApp.

**Rules and states**

- MD creates every account
- Domain locked to the company
- 15-day rolling session, MD sets it
- Login ID change ends all sessions

**Sources**

Sitemap signin-staff (Spec §22.1), session (Spec §22.3, §24). Registered 22 Nov does not cover staff sign-in.

### Home (top)

Home opens on the person's own dashboard. It leads with a short line of this week's achievements, so the day starts with something positive. Urgent needs come next, above meetings, and approval requests appear in a distinct colour. The next meeting sits in a compact strip that expands on tap. Deliverables and the performance charts are on the lower part of the same screen. Logout sits at the top right of Home, next to Pay.

**Rules and states**

- Urgent before meetings
- Approval requests in a distinct colour
- Compact meeting strip, expands on tap
- Pay and Logout at the top right of Home

**Sources**

Registered 22 Nov (home order). Sitemap home-dp lists temporary projects, live projects, deliverables, client requirements, payments due, ledger, rating.

### Meeting

A meeting opens with its link, time, agenda and everyone tagged, each with their confirmation state. Approve or request a change. A change asks for a new date, time and region, and goes to everyone tagged, who must approve it. A meeting can be handed to someone else by tagging them; the Design Head is notified. Resolved: the sitemap's decline-with-reason is kept as one of the four options alongside approve, request change and hand over.

**Rules and states**

- Everyone tagged confirms a change
- Hand-over notifies the Design Head
- Rejection needs a written reason (sitemap)

**Sources**

Registered 22 Nov (approve, change, hand over). Sitemap meeting-accept (Spec §5): accept closes the deal; reject needs a reason. Resolved, see log.

### Done with meeting

Done with meeting closes the meeting. The transcript and the next agenda are shown in a pop-up. The transcript is held: the sitemap marks it open until the plugin decision is made, so no transcript screen is built. The agenda is editable, and an AI first draft is planned later. Booking the next meeting is optional and creates a meeting for approval.

**Rules and states**

- Transcript held until the architecture decision
- Agenda editable before submit
- Book next is optional

**Sources**

Sitemap meeting-transcript (Spec §23.4): open, not approved to build. Registered 22 Nov: transcript pop-up, editable agenda.

## Design partner wireframes · 2 of 5 · Home lower, deliverables, tasks

Performance, the pinned task, deliverables with their deadline rule, and the task list by time.

### Home · lower

Performance, pinned task, create task, past submissions.

**Components**

1. **Header**: Same header as the top of Home.
2. **Two compact charts**: Weekly and monthly, side by side. Resolved: both charts measure approval turnaround. The personal rating moves to a Performance page, outside this set.
3. **Pinned task**: The design partner chooses the pinned task. Data: task.pinned_by = person.
4. **Create task and past submissions**: Create from a call: project, stakeholders, description, date. Past submissions opens history of what was submitted.
5. **Tab bar**: Home active; the lower part scrolls within Home.

### Deliverables

Deadline and tick box. Send for approval.

**Components**

1. **Header**: Back to Home.
2. **Upcoming list**: Ordered by urgency. Each row shows its deadline.
3. **Deadline and tick box**: Deadline always shown. Ticking copies the meeting's time. Unticked, you type your own.
4. **Send for approval**: To the Design Head for renders and quotations; to the production manager for technical files.
5. **Past submissions**: History of everything submitted, by project and date.

### Tasks

Today by time, each row by its type.

**Components**

1. **Header**: Create task on the right.
2. **Time group**: Tasks grouped by time of day. Each row shows its type.
3. **Quotation row**: Tap opens quotation properties.
4. **Deliverable row**: Tap opens deliverable properties: deadline, approver, status.
5. **Previous days**: At the bottom. Shows the tasks completed on earlier days.
6. **Tab bar**: Tasks active.

### Create task

Sheet over Tasks. Project, stakeholders, description, date.

**Components**

1. **Header**: Create task on the right.
2. **Background**: Tasks behind the sheet.
3. **Title**: Opened from Create task.
4. **Project and stakeholders**: Pick the project and the people involved. Data: task.project, task.stakeholders[].
5. **Description and date**: Written by the person. Date required.
6. **Create**: Goes to Deliverables. Does not replace a meeting.

## Requirements · home lower, deliverables, tasks

Deliverables and tasks are the partner's daily work. Each deliverable needs a deadline and an approver.

### Home · lower

The lower part of Home carries two compact charts side by side, weekly and monthly, and the pinned task. The charts measure approval turnaround: how quickly the partner moves items forward. The sitemap page also shows a personal rating and a weekly count of completed stages. Resolved: the charts measure approval turnaround; the rating is on a Performance page outside this set. Create task and past submissions sit below the charts.

**Rules and states**

- Two charts, not long bars
- Charts measure approval turnaround
- Pinned task chosen by the partner

**Sources**

Registered 22 Nov (approval turnaround). Sitemap performance (Spec §14): rating and weekly count; a delay counts only when it holds a project back.

### Deliverables

A deliverable has a project, a client, a task and a deadline. The deadline is always shown. A tick box copies the meeting's time; when unticked, the partner types their own. A deliverable goes to the Design Head for renders and quotations, and to the production manager for technical files. A completed deliverable leaves the four boxes at once. Past submissions show everything already sent.

**Rules and states**

- Deadline always shown
- Tick copies the meeting time
- Renders and quotations go to the Design Head
- Technical files go to the production manager

**Sources**

Registered 22 Nov (deliverables). Sitemap design-upload (App Flow §6), Spec §8, §23.3.

### Tasks

Tasks shows today's tasks grouped by time. Each row opens with the properties of its own type: a meeting shows meeting properties, a quotation shows quotation properties, a deliverable shows its deadline and approver. Previous days are reached from the bottom. A partner can create a task from a call, naming the project, stakeholders, description and date.

**Rules and states**

- Grouped by time
- Properties follow the type
- Previous days at the bottom

**Sources**

Registered 22 Nov (tasks page, create task).

### Create task

A task created from a call takes a project, the stakeholders, a written description and a date. Stakeholders are picked from the project's team first, then the wider studio; Resolved: the project team first, then anyone else in the studio by search. The task then appears in Deliverables.

**Rules and states**

- Project, stakeholders, description, date
- Created task lands in Deliverables
- Stakeholders: project team first, then search

**Sources**

Registered 22 Nov; source decided in this pass.

## Design partner wireframes · 3 of 5 · Projects, project, messages

The project view holds everything the client sees, plus upload, scheduling, change requests and the partner's own earnings.

### Projects

Ongoing four boxes, new leads row, other projects, past list.

**Components**

1. **Header**: Search right.
2. **Ongoing projects, four boxes**: Four to a view. The last slot becomes View all after six to eight projects.
3. **New leads row**: Temporary projects before the token. Visible to this partner only.
4. **Other projects, horizontal**: Shown as pairs or threes in a horizontal scroll.
5. **Past projects list**: Vertical list. View all after five to six.
6. **Tab bar**: Projects active.

### Project (partner)

Hero, stage row, approvals, upload, schedule, earnings, team.

**Components**

1. **Header**: Back to Projects. Name centre.
2. **Hero and stage**: Same hero as the client's. Traffic light and days left as on the client view.
3. **Stage row**: Same row as the client. Design partner can move the stage forward, which goes to approval.
4. **Approvals waiting**: Items this person must act on in this project.
5. **Tab bar**: Projects active. Everything the client sees is also here, plus the actions above.

### Project · lower

Change requests, earnings, team, tab bar.

**Components**

1. **Header**: Back to Projects. Name centre.
2. **Schedule a meeting**: Creates a meeting for those tagged to approve.
3. **Change requests**: Client requests since last visit. Turn one into an add-on with a price, then send for approval.
4. **Own earnings here**: The partner's share for this project. Amounts are placeholders until the ledger is confirmed.
5. **Project team**: Everyone on the project. Access requests from others come here to approve.
6. **Tab bar**: Projects active. Everything the client sees is also here, plus the actions above.

### Messages

Calendar, meetings, tags, team groups.

**Components**

1. **Header**: Title only.
2. **Calendar**: Your meetings on a calendar at the top. Data: meetings.for_person.
3. **Meeting cards, swipe**: Swipeable row ordered by time, with View all.
4. **Tags, given and received**: Where you are tagged in a project or task, and where you tagged someone. Ordered by time.
5. **Tagged WhatsApp conversations**: Team groups only, never client project groups. Tap opens the group in the WhatsApp app, through the invite link stored when the group was created. No link: 'Ask the MD for the link'.
6. **Tab bar**: Messages active.

## Requirements · projects, project view, messages

The project view is the client's view plus the partner's actions. Projects are listed by their state; messages cover team groups only.

### Projects

Projects lists the partner's work by state. Ongoing projects come first, four to a view, with View all after six to eight. New leads are temporary projects before the token; they are visible to this partner only. Other projects scroll sideways in pairs. Past projects are a vertical list, with View all after five to six.

**Rules and states**

- Ongoing: four boxes, View all after 6 to 8
- Leads visible to this partner only
- Past: list, View all after 5 to 6

**Sources**

Registered 22 Nov (projects page). Sitemap temp-project (Spec §23.1): permanent only when the token is confirmed.

### Project (partner)

Inside a project the partner sees everything the client sees, from their side, and more. The stage row matches the client's and can be moved forward, which sends the change for approval. Approvals waiting on the partner sit at the top. The partner can upload deliverables and renders, schedule meetings, and see the change requests. Uploads go to the Design Head first; nothing reaches the client directly.

**Rules and states**

- Everything the client sees, plus actions
- Uploads go to the Design Head first
- Partner approves on the client's behalf by default

**Sources**

Sitemap project-home (UI/UX §5), design-upload (App Flow §6), on-behalf (Spec §23.3). Registered 22 Nov.

### Project · lower

The lower part of the project lists the change requests raised since the last visit, the partner's own earnings for this project, and the project team. Access requests from others come here, and anyone already on the project can approve them; every grant is logged.

**Rules and states**

- Change requests since last visit
- Own earnings for this project
- Access requests approved by anyone on the project

**Sources**

Sitemap change-requests (UI/UX §5), access-request (Spec §23.6). Registered 22 Nov.

### Messages (staff)

Messages is the staff messaging place. It shows a calendar of the partner's meetings, a swipeable row of meeting cards, tags given and received ordered by time, and the team groups the partner belongs to. Client project groups are not listed here; they stay inside each project. Opening a team group opens the WhatsApp app on the phone. Build risk: the group invite link must be confirmed in the WhatsApp spike.

**Rules and states**

- Team groups only
- Client groups stay inside each project
- Opens the WhatsApp app through the stored group link. Build dependency on the WhatsApp spike

**Sources**

Registered 22 Nov (staff messages). Sitemap project-group (Spec §26.4): Groups API created at handover; invitation-link route to confirm.

## Design partner wireframes · 4 of 5 · Pay

Earnings, the share by stage, payments to me, yearly history and reimbursements. Confirm a payment made to you, or dispute it.

### Pay

Header pay area: earnings, share, history, claims.

**Components**

1. **Header**: Pay opens from the Home header, not a tab. Settings and log out are on the Settings page.
2. **Earnings and hold**: Share earned and amounts on hold. Share is 5% per project, paid in four steps.
3. **Share by stage**: Paid in step with the client: 1.5 after the token, 1.5 after 50%, 1 after 35%, 1 at the end.
4. **Stage payments by project**: Due, paid and pending per project. Opens a statement.
5. **Payments made to me**: Each payment the company makes to you needs your approval. Dispute sends it back to the MD.
6. **Yearly financial history**: Total earnings from the company by year, since joining.
7. **Reimbursement claims**: Each claim shows its status. Tap opens its details.
8. **Tab bar**: Pay is opened from the header. Nothing highlighted; More shown as the home of settings and pay.

### Confirm payment

Sheet over Pay. Approve or dispute.

**Components**

1. **Header**: Pay opens from the Home header, not a tab. Settings and log out are on the Settings page.
2. **Background**: Pay behind the sheet.
3. **Payment being confirmed**: Amount, date and the pay window it belongs to.
4. **Approve**: Records your confirmation with a timestamp.
5. **Dispute**: Requires a written reason. Goes back to the MD, who checks, changes and sends it back for approval.

### New claim

Fields, several files and proofs, send for approval.

**Components**

1. **Header**: Back to Reimbursements.
2. **Claim fields**: Amount, region, when, description. Data: claim.amount, claim.region, claim.spent_on.
3. **Files and proofs**: Several files: receipts, tickets, payment proofs. Kept separately from the claim record.
4. **Send for approval**: Resolved: partner claims go to the Design Head, then the MD. Other staff claims go straight to the MD (sitemap).

### Claim detail

Each step, and send-back reasons.

**Components**

1. **Header**: Back to the list.
2. **Claim summary**: Amount, region, date, file count.
3. **Step timeline**: Shows each approver and where the claim sits. A send-back shows the reason.
4. **Send-back reason**: Visible on the claim. Data: claim.history[].

## Requirements · pay

Money is the most sensitive area. The partner sees their own money only, and every payment made to them needs their confirmation.

### Pay

Pay opens from the header and shows the partner's earnings and the amount on hold, then the share by stage, the statement per project, the payments made to them, the yearly history, and their reimbursement claims. The share is 5% per project, paid in four steps: 1.5 after the token, 1.5 after the 50% payment, 1 after the 35% payment, and 1 at the end. The partner's ledger is shown in pay windows.

**Rules and states**

- Share: 1.5 / 1.5 / 1 / 1
- Pay windows: the 10th, 20th and 30th for partners
- Own money only

**Sources**

Sitemap dp-ledger (Spec §14), pay-window (Settings §8), ledger (Spec §9). Registered 22 Nov: earnings, hold, history.

### Confirm payment

Each payment made to the partner needs their confirmation. They can approve it, which records a timestamp, or query it with a written reason. A dispute goes back to the MD, who checks it, makes changes and sends it back for approval. Once approved, the payment is logged into the partner's financial history.

**Rules and states**

- Approve or dispute each payment
- Dispute needs a reason
- MD re-sends for approval
- Approved payments logged to history

**Sources**

Registered 22 Nov (payment confirmation). Sitemap payslip (Spec §14): receiver approves; query the amount.

### New claim

A reimbursement claim records the amount, the region, when it was spent, and a description. It takes several files: receipts, tickets and payment proofs. Receipts are kept separately from the claim. Resolved: partner claims go to the Design Head, then the MD (decision of 22 Nov). Other staff claims go straight to the MD (sitemap). Both routes are shown.

**Rules and states**

- Several files and proofs
- Receipts kept separately
- Partners: Design Head, then MD

**Sources**

Registered 22 Nov (claims route). Sitemap reimbursement (Spec §9): MD approves and pays; receipts kept separately.

### Claim detail

A claim's detail shows its amount, region, date and files, then each step: sent, approved by the Design Head, paid by the MD. If a claim is sent back, the reason and the note appear on it, and the partner resends after changes. Every step is logged.

**Rules and states**

- Each step visible
- Send-back reason shown
- Resend after changes

**Sources**

Registered 22 Nov (claim detail pop-up). Sitemap reimbursement: approve and pay (MD).

## Design partner wireframes · 5 of 5 · Settings and client changes

Settings in the standard five parts, and the change-request screen where the partner answers the client.

### Settings

Profile, devices, terms, log out.

**Components**

1. **Header**: Back. Opened from the settings icon.
2. **Profile**: Name, role and company email. Email is the login ID.
3. **Devices and sessions**: Signed-in devices. Sign out one at a time. The MD can end all sessions.
4. **Terms**: Readable any time.
5. **Log out, alone at the bottom**: Set apart from the other items.
6. **Tab bar**: Opened from the settings icon; More is active.

### Change request

Client request, add-on with price, approve for the client.

**Components**

1. **Header**: Back to the project.
2. **Request**: The request as the client wrote it, with the date.
3. **Add-on with price**: Optional. Turns the request into an add-on with a price.
4. **Send for approval**: Goes to the Design Head.
5. **Approve for the client**: Default approves on the client's behalf for every item. The client's words and the time are recorded; the log shows the client's name with you beside it.

## Requirements · settings and client changes

Settings in the standard five parts, and the change-request screen where the partner answers a client.

### Settings

Settings keeps the partner's profile, devices and sessions, Terms and log out. The company email is the login ID. The MD can end any session at once, and the person is signed out and told by WhatsApp. Logout sits alone at the bottom.

**Rules and states**

- Company email is the login ID
- Devices: sign out one at a time
- MD can end all sessions

**Sources**

Sitemap session (Spec §22.3, §24). Registered 22 Nov: staff settings, same structure.

### Change request

A change request is a client's request since the partner's last visit. The partner can turn it into an add-on with a price, then send it for approval to the Design Head. The partner can also approve for the client by default; when the client agrees by call, WhatsApp or Meet, the partner records the client's words and a timestamp. The log shows the client's name with the partner beside it.

**Rules and states**

- Add-on needs a price before approval
- Approve on the client's behalf, recorded
- Log shows the client's name and the partner

**Sources**

Sitemap change-requests (UI/UX §5), on-behalf (Spec §23.3).
