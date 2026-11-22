# First Light · Sales Head wireframes v1

Plain-text version of the wireframe set. Each board lists its phone screens with numbered components, and each requirement page lists the rules for those screens. Bracketed values such as [14] are placeholders.

_Version 1 · 22 November 2026 · for cross-check_

## First Light · Sales Head wireframes

Four boards and four requirement pages, sixteen phone screens, in the same standard components as the other role sets. The Sales Head receives every lead, groups it with the eight fixed options, assigns groups to representatives, watches the team's calls and retry cycle, approves leave, and reviews the weekly sales report.

Sources: sitemap pages for the Sales Head (home-sh, intake, inbox, groups, group-builder, assign, group-actions, cold, project-rating, client-id, leave-approve, directory, weekly-review, log-scope), the access matrix, and the specification's Sales Head powers.

## Conflicts settled

| Item | What the sources say | Decision and why |
|---|---|---|
| Call outcomes | Specification and older documents: four. Sitemap outcome form: seven, settled. | Seven. Four-outcome wording in three documents is to be corrected. |
| Call visibility | Specification: Sales Head sees every representative's calls, meetings, archive, transcripts and future calls. Access matrix marks Meetings as not visible. | Calls, meetings, archive and future calls are visible, as the specification says. Transcripts are held until the architecture decision. The matrix is to be corrected. |
| Live projects | Specification and matrix: Sales Head sees a live project only by requesting access. | Access request, as written. Nothing opens without it. |
| Duplicate numbers | Decision of 22 Nov: duplicates highlighted. Specification: eight fixed options only. | Both. Eight options build groups; duplicate numbers are a highlight for the Sales Head and the assigned representatives. |
| Tab bar | Sitemap: Leads, Calls, Meetings, Communication. Design Head set: Home, Approvals, Projects, Messages, More. | Home, Leads, Calls, Approvals, Messages. Meetings sit in Messages, as for the other staff. |

## Cross-check · what was verified

- Every screen maps to a Sales Head page in the sitemap or to a Sales Head power in the specification.

- The Sales Head is the only role that receives every lead; no screen routes a lead around it.

- Groups use only the eight fixed options; no free-text keyword.

- Seven settled call outcomes appear in the team counts.

- A live project is opened only through an access request.

- Messages only between 8 a.m. and 10 p.m.

- No rupee figures are shown; counts and percentages are placeholders in brackets.

## Sales Head wireframes · 1 of 4 · Home, intake, leads, groups

Every lead reaches the Sales Head. They read the inbox, group leads with the eight fixed options, and assign each group to one or more representatives.

### Home

Today's intake, team calls and meetings, sources.

**Components**

1. **Header**: Title centre. Logout at top right, as on the other staff homes.
2. **Today's intake**: New leads today and leads still waiting for a group.
3. **Team calls and meetings**: Each representative's calls and meetings today, from the call logs.
4. **Sources**: How many leads each source brings this week.
5. **Monday review**: Weekly sales report and workload review.
6. **Tab bar**: Home, Leads, Calls, Approvals, Messages. Meetings sit in Messages with the calendar.

### Intake

Every lead arrives here; nothing skips it.

**Components**

1. **Header**: Back.
2. **Sources**: Every lead enters here, from forms or entered by hand.
3. **Rule: all leads reach Sales Head**: Every incoming lead lands here first.

### Every lead

Inbox, filters, duplicate-number highlight.

**Components**

1. **Header**: Search right.
2. **Filters**: Filter by status: all, ungrouped, on hold, pulled.
3. **Lead list**: Each lead with city, source and group status.
4. **Duplicate-number highlight**: Phone numbers with more than one entry are highlighted, whatever their status.
5. **Tab bar**: Leads active.

### Groups

Eight fixed options; counts per group.

**Components**

1. **Header**: Back.
2. **Grouping rule**: Eight fixed options; no free-text keyword.
3. **The eight options**: Eight fixed groups. Shown as chips for the Sales Head to pick.
4. **Group counts**: Leads in each group.

## Requirements · home, intake, leads, groups

The Sales Head is the single entry point for leads in sales. Nothing is assigned to a representative until the Sales Head groups it.

### Home

The home shows today's new leads, the leads still ungrouped, each representative's calls and meetings, the sources the leads came from, and a link to the Monday review.

**Rules and states**

- New and ungrouped counts
- Team calls and meetings
- Sources this week

**Sources**

Sitemap home-sh. Specification: Sales Head sees lead sources and a weekly sales report.

### Intake

Every incoming lead reaches the Sales Head first, whatever its source. Calculator and social forms arrive automatically; walk-in and referral leads are entered by the Sales Head.

**Rules and states**

- Every lead reaches Sales Head
- Automatic and manual entry

**Sources**

Sitemap intake (Specification: Sales Head receives every incoming lead).

### Every lead

The inbox lists every lead with city, source and group status, and can filter to ungrouped, on hold or pulled. A phone number with more than one entry is highlighted with each entry and its date, whatever the status.

**Rules and states**

- Filters by status
- Duplicate-number highlight, all leads

**Sources**

Sitemap inbox. Decision of 22 Nov: duplicates highlighted.

### Groups

Grouping uses eight fixed options only, chosen from the list. No free keyword is possible. Each group shows its lead count.

**Rules and states**

- Eight fixed options
- No free keyword

**Sources**

Sitemap groups, group-builder (Specification §3: the eight fixed options).

## Sales Head wireframes · 2 of 4 · Assign, act, archive

Assigning a group notifies each representative. The Sales Head can pull, reassign, hold or regroup at any time, and archives cold and unresponsive leads separately.

### Assign group

Pick representatives; each is notified.

**Components**

1. **Header**: Back.
2. **Group**: The group and its lead count.
3. **Representatives**: Pick one or several. Each is notified.
4. **Assign**: Each assigned representative is notified.

### Group actions

Pull, reassign, hold, regroup.

**Components**

1. **Header**: Back.
2. **Four actions**: Pull, reassign, hold or regroup. Any time, for any group in sales.
3. **Rule**: Reps do not change groups.

### Cold archive

Not interested leads; viewable.

**Components**

1. **Header**: Title only.
2. **Cold leads**: Leads marked not interested. Viewable; reviewed by the Sales Head.

### Team calls

Seven outcomes, each with a count.

**Components**

1. **Header**: Title only.
2. **Team calls by person**: Each representative's calls today; tap for their list.
3. **Seven outcomes**: Counts for each of the seven settled outcomes.
4. **Tab bar**: Calls active.

## Requirements · assign, act, archive

The Sales Head assigns groups and keeps full control of the leads in sales.

### Assign group

The Sales Head picks one or more representatives for a group. Each assigned representative is notified and sees the group once it is assigned.

**Rules and states**

- One or more representatives
- Each assigned rep notified

**Sources**

Sitemap assign. Decision: multiple reps each notified.

### Group actions

The Sales Head can pull a group back, reassign it to another representative, hold it for review or regroup it, at any time. Representatives cannot change groups.

**Rules and states**

- Pull, reassign, hold, regroup
- Any time, any group in sales

**Sources**

Sitemap group-actions (Specification: full control over leads in sales).

### Cold archive

Leads marked not interested go to the cold archive. The Sales Head can view them and review them. Cold leads are not deleted.

**Rules and states**

- Viewable
- Not deleted

**Sources**

Sitemap cold; call outcome 'not interested' (settled seven outcomes).

### Team calls

The team calls screen shows each representative's calls, and the count of each of the seven settled outcomes. Tapping a representative opens their log.

**Rules and states**

- Seven outcomes with counts
- Tap to a representative's log

**Sources**

Specification: Sales Head can see every representative's calls. Decision: seven outcomes.

## Sales Head wireframes · 3 of 4 · Calls, retry, unresponsive

The Sales Head sees each representative's calls, meetings, archive and future calls, and the retry cycle across the whole team.

### Rep's calls

One representative's log and future calls.

**Components**

1. **Header**: Back to team calls.
2. **Representative's log**: Calls and meetings, newest first.
3. **Future calls**: Scheduled calls for this representative.
4. **Transcripts (held)**: Shown as held, not built.

### Retry cycle

Pass one, seven-day wait, archive.

**Components**

1. **Header**: Title only.
2. **Retry progress**: Leads in pass one, with calls made of three.
3. **Seven-day wait**: Leads waiting before pass two.
4. **Send window**: Same rule as the representative's view.
5. **Archive**: Leads past pass two move to the unresponsive archive.

### Unresponsive

All reps' unresponsive leads; return dates.

**Components**

1. **Header**: Title only.
2. **Unresponsive list**: All reps' unresponsive leads. Cannot be deleted.
3. **Return date**: A return date moves the lead to its own scheduled list.

### Approvals

Leave, meeting approvals, project access requests.

**Components**

1. **Header**: Title only.
2. **Leave requests**: Approve or decline sales representatives' leave. Heads apply to the MD; reps apply here.
3. **Meeting approvals**: Meetings set by reps for the design partner's approval are visible here too.
4. **Project access**: Live projects are seen only with a request; a request is granted by the owner.
5. **Tab bar**: Approvals active.

## Requirements · calls, retry, unresponsive

The Sales Head sees every representative's calls, meetings, archive and future calls. Transcripts are held.

### Rep's calls

Each representative's calls and meetings are listed newest first, with their future calls. The Sales Head can open any of them.

**Rules and states**

- Calls, meetings, future calls
- Newest first

**Sources**

Specification: Sales Head sees calls, meetings, archive, transcripts and future calls. Transcripts held (decision).

### Retry cycle

The Sales Head sees the retry cycle across the team: leads in pass one, leads in the seven-day wait, and the archive step. Messages only go between 8 a.m. and 10 p.m.

**Rules and states**

- Pass one progress
- Seven-day wait
- 8 a.m. to 10 p.m. only

**Sources**

Sitemap retry; the same timings as the representative's view.

### Unresponsive

All representatives' unresponsive leads are listed with attempts and the representative. The Sales Head can set a return date. Unresponsive leads cannot be deleted.

**Rules and states**

- All reps listed
- Set return date
- Not deleted

**Sources**

Sitemap unresponsive (Specification: unresponsive archive).

### Approvals

Approvals gathers sales representatives' leave, meetings waiting for the design partner's approval, and access requests for a live project. The Sales Head approves leave; a live project is seen only once access is granted.

**Rules and states**

- Leave for reps
- Meeting approvals
- Live project only by access request

**Sources**

Specification: Sales Head approves reps' leave; sees a live project only by requesting access.

## Sales Head wireframes · 4 of 4 · Clients, ratings, review, settings

Client history by ID, project ratings, the Monday sales review and the settings the Sales Head needs.

### Client ID

One ID; returning clients start new.

**Components**

1. **Header**: Back.
2. **Client ID**: One ID per client.
3. **Returning client rule**: New project, never linked.
4. **Timeline**: Calls, meetings and notes, newest first.

### Project rating

Ratings only; live project needs a request.

**Components**

1. **Header**: Back.
2. **Project**: The project and its stage.
3. **Ratings**: Ratings the Sales Head sees for team and projects.
4. **Live project rule**: No live project opened without a request.

### Monday review

Weekly report, conversion, workload.

**Components**

1. **Header**: Back.
2. **Weekly report**: The weekly sales report.
3. **Conversion**: Conversion at each step, from the lead to the approved meeting.
4. **Workload**: Review and move groups between representatives.

### Settings

Profile, own pay, directory, log scope, log out.

**Components**

1. **Header**: Back.
2. **Profile**: Name, role, company email (login ID).
3. **My pay**: Own pay only. Sales Head is on salary.
4. **Directory and log scope**: Staff directory; what this role can see in logs.
5. **Log out, alone at the bottom**: Set apart from the other items.

## Requirements · clients, ratings, review, settings

The Sales Head reviews clients, project ratings and the weekly sales report, and manages their own settings.

### Client ID

Each client has one ID with all calls, meetings and notes. A returning client gets a new project, and old projects are never linked to new ones.

**Rules and states**

- One ID per client
- Returning client: new project

**Sources**

Sitemap client-id.

### Project rating

The Sales Head sees the ratings of their team and of the projects. A live project is not opened here; the Sales Head requests access first.

**Rules and states**

- Team and project ratings
- Live project only by request

**Sources**

Sitemap project-rating. Specification: sees ratings of the team and projects.

### Monday review

Every Monday the Sales Head sees the weekly sales report: conversion at each step from lead to approved meeting, and the workload per representative. Groups can be reshuffled from here.

**Rules and states**

- Weekly report
- Conversion each step
- Reshuffle workload

**Sources**

Sitemap weekly-review. Specification: weekly sales report and workload reshuffle.

### Settings

Settings holds the Sales Head's own profile, pay, the staff directory and what each role can see in logs. Logout sits alone at the bottom.

**Rules and states**

- Own pay only
- Directory and log scope

**Sources**

Sitemap directory, log-scope, session.
