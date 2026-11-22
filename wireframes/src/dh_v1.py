import sys; sys.path.insert(0, "/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf")
from kit import *
T = ["Home","Approvals","Projects","Messages","More"]
def C(h,t,d): return (h,t,d)
def TAG(t): return f'<span class="chip" style="padding:2px 6px">{t}</span>'

# ---------- BOARD 1: home and approvals ----------
home = [
 C(hdr("", "Design Head · Home", ("⌕","⎋")), "Header", "Search and Logout at the top right. Logout is also in Settings."),
 C('<div class="card"><div class="lbl">Waiting for you</div><div style="display:flex;justify-content:space-between"><div><div class="h1" style="font-size:20px">[4]</div><div class="muted">renders and quotations</div></div><div><div class="h1" style="font-size:20px">[2]</div><div class="muted">estimates</div></div><div><div class="h1" style="font-size:20px">[1]</div><div class="muted">extension</div></div></div></div>', "Awaiting approval counts", "Counts of items needing this head's decision. Tapping a count opens the Approvals queue filtered to it. Sample numbers in brackets."),
 C('<div class="lbl">Access requests<b>2</b></div><div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Sales Head asks to see Villa 4B</div><div class="muted">Reason given · Approve or decline</div></div>', "Access requests", "Requests to see a live project. Shown only where this head is on the project or can add people."),
 C('<div class="lbl">Team ratings this week</div><div style="display:flex;gap:6px"><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2" style="font-size:10px">[Arjun]</div><div class="muted">rating [ ]</div></div><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2" style="font-size:10px">[Meera]</div><div class="muted">rating [ ]</div></div></div>', "Team ratings", "Ratings of the design team for the week, from the Monday review. Sample names in brackets."),
 C('<div class="lbl">Meetings this week<b>All</b></div><div class="row"><span>Tue 24 · Villa 4B · site visit</span><span class="r">Confirmed</span></div><div class="row" style="border:none"><span>Wed 25 · Plot 2 · design</span><span class="r">Awaiting</span></div>', "Meetings this week", "Every meeting in the design department. This head is notified of each one."),
 C('<div class="lbl">Alerts</div><div class="row"><span>Design partner absent · cover suggested</span><span class="r">Review</span></div><div class="note-warn">Delivery problems list: held until the owner approves it (open item 16).</div>', "Alerts", "Absence cover alerts and failed deliveries. The delivery list is held, not built."),
 C(tabbar(T,"Home"), "Tab bar", "Home, Approvals, Projects, Messages, More. Approvals is this head's core queue; Meetings sit inside Messages, as for the design partner."),
]
approvals = [
 C(hdr("", "Approvals", ("⌕",)), "Header", "Search right."),
 C('<div style="display:flex;gap:4px"><span class="chip on">Renders [4]</span><span class="chip">Quotations [2]</span><span class="chip">Estimates [2]</span><span class="chip">Extensions [1]</span></div>', "Queue filters", "Filter by kind. The queue is one list, newest first, per kind."),
 C('<div class="card" style="padding:7px 8px"><div class="lbl">Render · Villa 4B · v5</div><div class="h2" style="font-size:9.5px">Kitchen, L-shape · from Arjun</div><div class="muted">Brief: moved hob to the window wall</div><div style="display:flex;gap:5px;margin-top:5px"><div class="btn pri" style="flex:1;height:24px;font-size:8px">Approve</div><div class="btn ghost" style="flex:1;height:24px;font-size:8px">Reject</div></div></div>', "Approval card", "What it is, the requester, a brief of change, approve and reject. Same card for every approval type."),
 C('<div class="card" style="padding:7px 8px"><div class="lbl">Quotation · Plot 2 · v3</div><div class="h2" style="font-size:9.5px">Total [₹ ——] · from Arjun</div><div class="muted">Amount and date shown on the card</div><div style="display:flex;gap:5px;margin-top:5px"><div class="btn pri" style="flex:1;height:24px;font-size:8px">Approve</div><div class="btn ghost" style="flex:1;height:24px;font-size:8px">Reject</div></div></div>', "Quotation card", "Total with Indian digit grouping. The client sees nothing until this approval."),
 C('<div class="card" style="padding:7px 8px"><div class="lbl">Design estimate · Flat 7</div><div class="h2" style="font-size:9.5px">Design time: [__] days · after token</div><div class="muted">Estimate given by the design partner</div><div class="btn pri" style="margin-top:5px;height:24px;font-size:8px">Review</div></div>', "Design estimate card", "Design time estimate, given after the token is paid. Approved by this head."),
 C('<div class="card" style="padding:7px 8px"><div class="lbl">Extension · Villa 4B design phase</div><div class="h2" style="font-size:9.5px">+[3] days requested · reason</div><div class="muted">Design-phase extension beyond the 15-day timer</div><div class="btn pri" style="margin-top:5px;height:24px;font-size:8px">Review</div></div>', "Extension card", "Design-phase extension beyond the 15-day stage timer. Reason shown with it."),
 C(tabbar(T,"Approvals"), "Tab bar", "Approvals active."),
]
approve_sheet = [
 C('<div class="h2">Render · Villa 4B · v5</div><div class="img" style="height:90px"><span>render, large · open full screen</span></div>', "File and version", "The file and its version, opened from the card. Previous versions one tap away."),
 C('<div class="muted">Brief: moved hob to the window wall. Prior: v4 · 12 Nov</div>', "Brief of change", "The short brief the designer wrote for this version."),
 C('<div class="inp">Reason · required if rejected</div><div style="display:flex;gap:6px"><div class="btn pri" style="flex:1">Approve</div><div class="btn ghost" style="flex:1">Reject</div></div>', "Approve or reject", "Reject needs a written reason. The reason goes to the designer and is logged. Nothing reaches the client until approved."),
 C('<div class="muted">Approve several at once: tick cards, then approve.</div>', "Approve several", "Batch approval for ticked cards, each still logged one by one."),
]

# ---------- BOARD 2: meetings and projects ----------
meetings = [
 C(hdr("", "Meetings · all", ("⌕",)), "Header", "Title, search right."),
 C('<div class="lbl">This week · grouped by day</div><div class="row"><span>Tue 24 · 11:00 · Villa 4B</span><span class="r">Confirmed</span></div><div class="row"><span>Tue 24 · 15:00 · Flat 7</span><span class="r">Change asked</span></div><div class="row" style="border:none"><span>Wed 25 · 10:00 · Plot 2</span><span class="r">Awaiting</span></div>', "Week list", "Every design meeting, grouped by day. Each row shows its state."),
 C('<div class="card" style="padding:6px 8px"><div class="lbl">Change asked · Flat 7</div><div class="muted">Client asked for 16:00 · waiting for 1 of 3</div></div>', "Pending change", "Shows who has not yet confirmed a change request."),
 C('<div class="lbl">Filter</div><div class="chips"><span class="chip on">All</span><span class="chip">By designer</span><span class="chip">By project</span></div>', "Filters", "All, by designer, by project."),
 C(tabbar(T,"Messages"), "Tab bar", "Messages active; this list sits in Messages with the calendar."),
]
projects = [
 C(hdr("", "Projects · all", ("⌕",)), "Header", "Search right."),
 C('<div class="lbl">Traffic light</div><div style="display:flex;gap:5px"><span class="chip">● 12 on time</span><span class="chip">● 2 late</span><span class="chip">● 1 red</span></div>', "Status summary", "Counts by traffic light. Red is past 125% of planned time. Client pauses never count as yellow or red."),
 C('<div class="card" style="padding:6px 8px;display:flex;justify-content:space-between"><div><div class="h2" style="font-size:9.5px">Villa 4B · Stage 6</div><div class="muted">Arjun · 9 days left</div></div><div class="muted">●</div></div>', "Project row", "Name, stage, owner, days left, traffic light. Tap opens the project."),
 C('<div class="card" style="padding:6px 8px;display:flex;justify-content:space-between"><div><div class="h2" style="font-size:9.5px">Plot 2 · paused by client</div><div class="muted">Paused · timer held</div></div><div class="muted">○</div></div>', "Paused row", "Paused by client, shown as paused and never yellow or red."),
 C('<div class="lbl">Temporary projects<b>View</b></div><div class="muted">Before token. Visible to the designer and to this head.</div>', "Temporary projects", "Projects before the token. Visible to the design partner, Design Head and MD only."),
 C(tabbar(T,"Projects"), "Tab bar", "Projects active."),
]
dh_project = [
 C(hdr("‹", "Villa 4B", ("⋯",)), "Header with menu", "Back. Menu holds Move project and Share details."),
 C('<div class="img" style="height:70px"><span>pinned render · hero</span></div><div class="h2" style="margin-top:3px">Living and kitchen · Stage 6 of 14</div><div class="muted">Arjun · 9 days left · on track</div>', "Hero and owner", "Same project hero as the client and the designer, with the owner shown."),
 C('<div class="lbl">Approvals and history</div><div class="row"><span>Render v5 · waiting</span><span class="r">Open</span></div><div class="row" style="border:none"><span>Stage history · 14 entries</span><span class="r">Open</span></div>', "Approvals and history", "Pending approvals on this project, and the append-only stage history."),
 C('<div class="lbl">Payments · read only</div><div class="row"><span>Token 10% · confirmed by MD</span><span class="r">Paid</span></div><div class="row" style="border:none"><span>Mid 50% · due 14 Dec</span><span class="r">Due</span></div>', "Payments, read only", "This head sees payment status but cannot confirm payments. Only the MD confirms."),
 C('<div class="lbl">Team</div><div class="muted">Arjun (owner) · Imran (production) · Neha (sales) · you</div>', "Project team", "Everyone on the project, with the head's own place marked."),
 C('<div class="lbl">Access requests</div><div class="row"><span>Sales Head · request</span><span class="r">Approve</span></div>', "Access requests", "Approve or decline, and add a person to the project."),
 C(tabbar(T,"Projects"), "Tab bar", "Projects active."),
]
move_sheet = [
 C('<div class="h2">Move project</div><div class="muted">Move Villa 4B to another person at any time.</div>', "Move project", "Available to this head at any time. Logged with the old and new owner."),
 C('<div class="inp">New owner · [Meera]</div><div class="inp">Reason · required</div>', "New owner and reason", "Choose a person; a reason is required so the move is explained in the log."),
 C('<div class="btn pri">Move and notify</div>', "Move and notify", "Notifies the old and the new owner, and the client's team view updates."),
]
share_sheet = [
 C('<div class="h2">Share selected details</div>', "Share", "Share selected project details with anyone. Each share is logged."),
 C('<div class="inp">Who · name or number</div><div class="chips"><span class="chip on">Summary</span><span class="chip">Quotation</span><span class="chip">Stage</span></div>', "Who and what", "Pick the person and which details. Sharing is logged."),
 C('<div class="btn pri">Share</div>', "Send", "Sends through the company number."),
]

# ---------- BOARD 3: team and people ----------
team = [
 C(hdr("", "Team", ("⌕",)), "Header", "Title, search right."),
 C('<div class="lbl">Design team · 6</div><div class="row"><span>Arjun · design partner</span><span class="r">Load 3</span></div><div class="row"><span>Meera · design partner</span><span class="r">Load 2</span></div><div class="row" style="border:none"><span>Ravi · designer</span><span class="r">On leave</span></div>', "Team list", "Designers with role, current load and status. Shows leave."),
 C('<div class="lbl">Ratings · this week</div><div style="display:flex;gap:6px"><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2" style="font-size:10px">[ ]</div><div class="muted">Arjun</div></div><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2" style="font-size:10px">[ ]</div><div class="muted">Meera</div></div></div>', "Ratings", "Each person's rating for the week, from the Monday review."),
 C('<div class="lbl">Reporting line</div><div class="muted">Design Head → design partners and designers. Heads report to the MD.</div>', "Reporting line", "Shows where each person sits."),
 C(tabbar(T,"More"), "Tab bar", "Team is opened from More."),
]
person = [
 C(hdr("‹", "Arjun", ()), "Header", "Back to Team."),
 C('<div style="display:flex;gap:9px;align-items:center"><div class="img" style="width:50px;height:50px;border-radius:50%"><span>photo</span></div><div><div class="h2">Arjun · design partner</div><div class="muted">Salary limit set by the MD</div></div></div>', "Identity", "Photo, name, role. Salary limit is shown to the MD only."),
 C('<div class="lbl">Current load</div><div class="row"><span>Villa 4B · owner</span><span class="r">Stage 6</span></div><div class="row" style="border:none"><span>Plot 2 · owner</span><span class="r">Stage 3</span></div>', "Load", "Projects owned, with stage. Used when choosing cover or moving a project."),
 C('<div class="lbl">Rating history</div><div class="muted">Weekly rating and the stages that fed it. Opens the stage history.</div>', "Rating history", "Each week's rating with its drivers, so a rating can be explained."),
 C('<div class="btn ghost">Set cover</div>', "Set cover", "Choose cover when this person is on leave."),
]
leave = [
 C(hdr("‹", "Leave requests", ()), "Header", "Back to Team."),
 C('<div class="card" style="padding:7px 8px"><div class="lbl">Ravi · designer</div><div class="h2" style="font-size:9.5px">24 to 27 Nov · 4 days</div><div class="muted">Reason noted by the person</div></div>', "Leave card", "The person, dates, length and reason. Same approval card as other approvals."),
 C('<div class="btn pri">Approve</div><div class="btn ghost" style="margin-top:4px">Reject with reason</div>', "Approve or reject", "Approving asks for a cover scope. Reject needs a reason."),
]
cover_sheet = [
 C('<div class="h2">Cover scope · Ravi on leave</div>', "Cover scope title", "The cover is chosen by the head when a designer is on leave."),
 C('<div class="row"><span>Everything Ravi owns</span><span class="r">○</span></div><div class="row"><span>Selected projects and tasks</span><span class="r">●</span></div>', "Scope choice", "Everything the person owns, or selected projects and tasks."),
 C('<div class="muted">Crew linked to those projects moves with them and nothing else.</div>', "Crew rule", "Crew go with the project and nothing else. Stated on the sheet."),
 C('<div class="btn pri">Approve leave and notify cover</div>', "Approve and notify", "Approves the leave and tells the cover person."),
]
monday = [
 C(hdr("", "Monday review", ()), "Header", "Title only. Runs Monday to Monday."),
 C('<div class="lbl">Cards reviewed · [6] of [8]</div><div class="note-warn">Target: every card reviewed by Monday.</div>', "Review progress", "How many person cards are reviewed. Target 100%."),
 C('<div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Arjun · card</div><div class="muted">Stages done [ ] · rating [ ]</div><div class="btn ghost" style="margin-top:4px;height:22px;font-size:7.5px">Mark reviewed</div></div>', "Person card", "One card per person: stages completed, rating, and the drivers. Mark reviewed; add a note."),
 C('<div class="lbl">Not yet reviewed</div><div class="row" style="border:none"><span>Ravi</span><span class="r">Remind</span></div>', "Not yet reviewed", "Who is still open for the week."),
 C(tabbar(T,"More"), "Tab bar", "Opened from More."),
]

# ---------- BOARD 4: money, leads, logs ----------
pay_reject = [
 C(hdr("‹", "Payment rejected", ()), "Header", "Back to Alerts."),
 C('<div class="card"><div class="lbl">Client payment · Villa 4B</div><div class="h2" style="font-size:10px">Mid 50% · proof rejected by MD</div><div class="muted">Reason: amount does not match the screenshot</div></div>', "Rejection", "The rejection and the MD's reason. Routed to this head because the head owns the client payment."),
 C('<div class="inp">Your reason or fix · required</div>', "Reason", "Write the fix or the reason. Required."),
 C('<div class="lbl">Tag people involved</div><div class="chips"><span class="chip on">Arjun</span><span class="chip">Neha</span></div>', "Tag people", "Tag the people who must act. A tagged person sees this rejection and this project only."),
 C('<div class="btn pri">Send to MD</div>', "Send", "Work can pass both ways along the chain. The MD confirms payments; the head does not."),
]
closed = [
 C(hdr("", "Closed leads", ("⌕",)), "Header", "Search right."),
 C('<div class="lbl">Quoted, token never paid</div><div class="row"><span>Sharma · Flat 4</span><span class="r">Reassign</span></div><div class="row" style="border:none"><span>Iyer · Villa 2</span><span class="r">Reassign</span></div>', "Closed-leads file", "Leads that were quoted but never paid the token, kept apart from live projects. This head sees all of them."),
 C('<div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Rejected lead · Iyer</div><div class="muted">Rejected by design partner · reason shown</div><div class="btn pri" style="margin-top:4px;height:22px;font-size:7.5px">Reassign</div></div>', "Rejected lead reassign", "A rejected lead can be reassigned by this head, directly or through the sales representative."),
 C('<div class="lbl">Client record</div><div class="muted">Search by client ID or number. Each record holds every meeting, transcript, file and action. A returning client gets a new project.</div>', "Client record", "One ID per client. Old projects are never linked to new ones."),
]
logs = [
 C(hdr("", "Logs", ()), "Header", "Title only."),
 C('<div class="chips"><span class="chip on">Own actions</span><span class="chip">Team</span></div>', "Scope", "Own actions, or the team's logs. The full correction log is for the MD only."),
 C('<div class="row"><span>Approved render v4 · Arjun</span><span class="r">20 Nov</span></div><div class="row"><span>Access granted · Sales Head · Villa 4B</span><span class="r">21 Nov</span></div><div class="row" style="border:none"><span>Project moved · Plot 2</span><span class="r">22 Nov</span></div>', "Log entries", "Append-only, newest first. Nothing here can be edited or deleted."),
 C(tabbar(T,"More"), "Tab bar", "Opened from More."),
]
rejected = [
 C(hdr("‹", "Rejected versions", ()), "Header", "Back."),
 C('<div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Quotation v2 · Plot 2</div><div class="muted">Rejected 18 Nov · reason: scope unclear</div><div class="btn ghost" style="margin-top:4px;height:22px;font-size:7.5px">Restore as new version</div></div>', "Rejected version", "Stays visible to the team with its reason. The client never sees it."),
]

# ---------- BOARD 5: settings and own pay ----------
settings = [
 C(hdr("‹", "Settings", ()), "Header", "Back. Opened from the header."),
 C('<div class="card"><div class="h2">Design Head</div><div class="muted">Company email · salaried</div></div>', "Profile", "Name, role, company email (the login ID)."),
 C('<div class="lbl">My pay</div><div class="row"><span>Payslips and receipts</span><span class="r">›</span></div><div class="row" style="border:none"><span>My reimbursements</span><span class="r">›</span></div>', "My pay", "Only this head's own pay and claims. Team pay is not shown here."),
 C('<div class="lbl">Devices and sessions</div><div class="row"><span>Chrome · Gurugram</span><span class="r">This device</span></div>', "Devices", "Sign out one at a time. The MD can end all sessions."),
 C('<div class="row"><span>Terms and conditions</span><span class="r">›</span></div>', "Terms", "Readable any time."),
 C('<div class="btn ghost" style="margin-top:auto">Log out</div>', "Log out, alone at the bottom", "Set apart from the other items."),
 C(tabbar(T,"More"), "Tab bar", "Opened from the header; More active."),
]

def B(t,i,cols): return board(t,i,cols)
BOARD1 = B("Design Head wireframes · 1 of 5 · Home and approvals",
 "Home is the monitoring view. Approvals is the queue: each card is approved or rejected with a reason, and nothing reaches the client until approved.",
 [col("Home","Waiting counts, access requests, team ratings, meetings, alerts.", home),
  col("Approvals","Queue by kind: renders, quotations, estimates, extensions.", approvals),
  col("Approve sheet","Open a card: file, brief, reason, approve several.", approvals[:1]+[C('<div class="muted">Queue, dimmed.</div>',"Background","Queue behind the sheet.")], sheet=approve_sheet),
  col("Approval cards","Same card for every approval type.", approvals[:1]+approvals[2:4])])
BOARD2 = B("Design Head wireframes · 2 of 5 · Meetings and projects",
 "Monitor every meeting and every project from one place. A project can be moved to another person or shared, and every action is logged.",
 [col("Meetings","All design meetings, pending changes, filters.", meetings),
  col("Projects","Traffic light summary, rows, paused, temporary projects.", projects),
  col("Project (head)","Hero, approvals, read-only payments, team, access.", dh_project),
  col("Move project","Sheet to move ownership, with a reason.", dh_project[:1]+[C('<div class="muted">Project, dimmed.</div>',"Background","Project behind the sheet.")], sheet=move_sheet)])
BOARD3 = B("Design Head wireframes · 3 of 5 · Team and leave",
 "The team, each person's load and rating, leave with cover, and the Monday review of every card.",
 [col("Team","Designers, load, leave, ratings.", team),
  col("Person","Load, rating history, set cover.", person),
  col("Leave","Approve leave; choose cover scope.", leave, sheet=cover_sheet),
  col("Monday review","Cards reviewed by Monday; target every card.", monday)])
BOARD4 = B("Design Head wireframes · 4 of 5 · Payments, leads, logs",
 "Payment rejections that belong to this head, the closed-leads file, the client record, logs and rejected versions.",
 [col("Payment rejected","Reply and tag people; MD confirms payments.", pay_reject),
  col("Closed leads","Quoted, never paid. Reassign rejected leads.", closed),
  col("Logs","Own actions and team logs, append-only.", logs),
  col("Rejected versions","Visible to the team with the reason; never to the client.", rejected)])
BOARD5 = B("Design Head wireframes · 5 of 5 · Settings",
 "Settings in the standard five parts, with own pay only.",
 [col("Settings","Profile, own pay, devices, terms, log out.", settings)])

RQ1 = req_board("Requirements · home and approvals",
 "The head's daily queue. The home monitors; the approvals decide. Nothing reaches the client before this head approves a render or a quotation.",
 [req_col("Home",
  "The Design Head home is a monitor, not a to-do list alone. It shows what waits for this head (renders and quotations, estimates, extensions), access requests, the week's team ratings, every meeting in the department, and alerts such as a design partner's absence. The delivery-problems list is shown as held, because the owner has not yet approved it.",
  ["Counts open the filtered queue","Team ratings from the Monday review","Delivery problems held (open item 16)"],
  "Sitemap home-dh (Spec §26.7), alerts (UI/UX §9). Spec: design partner absence alerts the Design Head."),
  req_col("Approvals",
  "Every approval is one card, the same component for renders, quotations, estimates, extensions and leave. A card shows what it is, who asked, the amount or date where relevant, and a brief of change. Approve or reject; a rejection needs a written reason that goes to the designer and is logged. The head can approve several at once, but each approval is still logged on its own.",
  ["One card for every approval type","Reject needs a written reason","Batch approve still logs each item"],
  "Sitemap design-approval (Spec §8), approvals pattern (Spec §8). Spec §8: nothing reaches the client before Design Head approval."),
  req_col("Approve sheet",
  "Opening a card shows the file and its version, the brief of change, and the previous versions one tap away. The head approves or rejects. An approved render or quotation then reaches the client through the company number. A rejected version stays visible to the team with its reason and never reaches the client.",
  ["Previous versions one tap away","Approval reaches the client via company number","Rejected: team only, with reason"],
  "Sitemap design-approval (open the file and its previous versions), rejected-versions (Spec §21.1)."),
  req_col("Approval cards",
  "Estimates and extensions are approvals too. The design time estimate is given by the designer after the token is paid and is approved here. A design-phase extension beyond the 15-day stage timer is approved here, with its reason on the card. Technical files are not in this queue: the Production Manager approves them, and this head does not.",
  ["Estimates after token, approved here","Extension beyond 15 days, with reason","Technical files are not approved here"],
  "Specification: design estimates and extensions are approved by the Design Head. Sitemap technical-files: the Design Head does not approve technical files."),
 ])
RQ2 = req_board("Requirements · meetings and projects",
 "This head sees every project and every client meeting, and is notified of every meeting, even when not tagged. The monitoring must be complete without the head needing to ask.",
 [req_col("Meetings",
  "The head sees every meeting in the design department in one list, grouped by day, with each meeting's state. A pending change request shows who has not yet confirmed. The head is notified of every meeting, even when not tagged. Meetings sit inside Messages with the calendar, as they do for the design partner.",
  ["All meetings, grouped by day","Notified of every meeting, tagged or not","Pending change shows who is missing"],
  "Specification: the Design Head is notified of every meeting. Sitemap meeting-list (Design Head). Decision: Meetings sit inside Messages."),
  req_col("Projects",
  "All projects are listed with a traffic-light summary. Red is past 125% of planned time. A client pause shows as paused and never as yellow or red. Temporary projects before the token are visible to the designer, the Design Head and the MD only.",
  ["Traffic light: red past 125%","Paused by client is never yellow or red","Temporary projects: designer, head, MD only"],
  "Sitemap project-home, paused, temp-project (Spec §6, §23.1). Traffic light: red past 125% of planned time, per the stage timer rules."),
  req_col("Project (head)",
  "Inside a project this head sees everything on it: the approvals waiting, the stage history, the payment status (read only), the team, and access requests. The head can see payments but cannot confirm them; only the MD confirms a payment. Anyone already on a project can approve an access request, and this head can approve on any project they are on and add anyone to it. Every grant is logged.",
  ["Payments read only; MD confirms","Access: anyone on project approves; logged","Head approves access on projects they are on"],
  "Sitemap access-request (Spec §23.6), payment rules (Spec §9)."),
  req_col("Move project",
  "The Design Head can move any project to a different person at any time. A reason is required and the move is logged with the old and new owner. The old and new owners are notified. This power is in the specification only; the sitemap does not list it, so it is added here and recorded in the decisions page.",
  ["Move at any time, reason required","Logged with old and new owner","Power from spec; not in the sitemap"],
  "Spec §26.7 (move any project to a different person at any time). Not in sitemap; decision: included."),
 ])
RQ3 = req_board("Requirements · team and leave",
 "The head is responsible for the design team: their load, their ratings, their leave, and the weekly review.",
 [req_col("Team",
  "The team list shows each designer with their role, current load and status, including who is on leave. Ratings are shown for the week. The Design Head sees their team's and their projects' ratings. Designers apply to this head for leave; the head does not take leave, because heads apply to the MD.",
  ["Load and leave visible","Ratings: team and projects","Heads apply to the MD for leave"],
  "Spec §14 (heads' view of ratings), §13 (leave: designers apply to the Design Head; heads apply to the MD). Sitemap directory (UI/UX §4)."),
  req_col("Person",
  "A person's profile shows their projects and stage, their load, and their rating history. Each rating can be opened to the stage history that fed it, so a rating is always explainable. Salary limits are shown to the MD only.",
  ["Rating explained by stage history","Salary limit: MD only"],
  "Sitemap performance (Spec §14 · stage history), directory (salary limit). Spec §14: a delay counts only when it holds a project back."),
  req_col("Leave",
  "A designer's leave arrives as an approval card. The head approves or rejects with a reason. On approval the head chooses the cover scope: everything the person owns, or selected projects and tasks. Crew linked to those projects move with them and nothing else. The cover person is notified.",
  ["Same approval card","Cover: everything, or selected projects","Crew move with projects only"],
  "Sitemap leave-approve, cover (Spec §13). Crew rules are in Spec §10."),
  req_col("Monday review",
  "Performance runs Monday to Monday, and Monday is the review day. Each person has a card showing stages completed, rating and drivers. The head marks each card reviewed and can add a note. The target is every card reviewed by Monday, and the screen lists who is still open.",
  ["Monday to Monday cycle","Target: every card reviewed by Monday","Lists who is still open"],
  "Sitemap weekly-review (PRD §4), performance. Spec §14: Monday to Monday."),
 ])
RQ4 = req_board("Requirements · payments, leads, logs",
 "What this head sees about money, leads and the record. The head reads and routes; the MD confirms money.",
 [req_col("Payment rejected",
  "A client payment rejected by the MD goes to the department head who owns the project. For a client payment that is this Design Head. The head writes a reason or the fix, and tags the people involved. A tagged person sees that rejection and that project only. Work can pass both ways between the head and the MD.",
  ["Routed to the owning head","Tagged people see this project only","Head does not confirm payments"],
  "Sitemap payment-reject (Spec §26.1). Spec: MD confirms payments; conflict resolved: head routes, MD confirms."),
  req_col("Closed leads",
  "Leads that were quoted but never paid the token move to the closed-leads file, kept apart from live projects. The Design Head sees all closed leads. A rejected lead can be reassigned by this head, directly or through the sales representative. The client record is one ID with every meeting, transcript, file and action; a returning client starts a new project.",
  ["Head sees all closed leads","Rejected lead reassigned by head","Client record: one ID, new project for returners"],
  "Sitemap closed-leads, client-id (Spec §6). Specification: the head reassigns a rejected lead."),
  req_col("Logs",
  "A head sees their own actions and their team's logs. The full correction log is for the MD only. Logs are append-only: nothing can be edited or deleted, which is the log's integrity target.",
  ["Own and team logs only","Full correction log: MD only","Append-only; zero edits or deletes"],
  "Sitemap log-scope (Spec §16)."),
  req_col("Rejected versions",
  "A rejected version stays visible to the design team with its reason attached, and can be restored as a new version. The client never sees a rejected version.",
  ["Team only, with reason","Restore as new version","Client never sees it"],
  "Sitemap rejected-versions (Spec §21.1)."),
 ])
RQ5 = req_board("Requirements · settings",
 "The head's own settings and pay. Team pay is not part of this head's view.",
 [req_col("Settings",
  "Settings keeps the head's profile (company email is the login ID), their own payslips and reimbursements, devices and sessions, Terms and log out. Team pay is not shown here. Logout sits alone at the bottom.",
  ["Own pay and claims only","Company email is the login ID","Devices: sign out one at a time"],
  "Sitemap session (Spec §22.3, §24), reimbursement (Spec §9), payslip (Spec §14). Spec §14: heads are salaried."),
 ])

DECIDE_ROWS = [
 ("Tab bar", "Sitemap: Home, Projects, Approvals, Meetings, More. Access matrix agrees.", "Home, Approvals, Projects, Messages, More. Meetings sit inside Messages with the calendar, as for the design partner. Keeps the bar to five and matches the staff pattern."),
 ("Client payments", "Access matrix: no access. Payment reject page: the head receives rejections for client payments.", "Read-only status on their projects, and rejections routed to them. Only the MD confirms payments (sitemap and spec agree)."),
 ("Internal money", "Access matrix: no access for the Design Head. Spec: heads are salaried.", "Own pay, payslips and reimbursements only. Team pay stays with the MD."),
 ("Meetings", "Sitemap: meeting list for the head. Spec: head notified of every meeting, tagged or not.", "The head sees and is notified of every meeting, but approves only where tagged."),
 ("Technical files", "Sitemap and spec agree: the Design Head does not approve them.", "Kept out of the queue; visible on the project as read-only."),
 ("Move project", "Spec: head can move any project at any time. Sitemap: not listed.", "Included, with a reason and logging. Recorded as a spec power."),
 ("Access requests", "Sitemap: anyone on the project approves. Spec: head approves on projects they are on.", "Both. Anyone on a project can approve; the head can approve on any project they are on."),
 ("Delivery problems", "Sitemap: open, awaiting owner approval (open item 16).", "Held. A notice on Home only, nothing built."),
 ("Ratings", "Sitemap: project rating reviewed Monday to Monday. Spec: heads see team and project ratings.", "Shown on the Monday review and Team screens. Explained by stage history."),
]
DECIDE = ('<section class="board"><div class="bh"><h1>Conflicts settled in this pass</h1><p>Where the sitemap, the access matrix and the specification disagree, the decision taken and why.</p></div>'
  '<table class="log"><tr><th style="width:16%">Item</th><th style="width:40%">What the sources say</th><th>Decision and why</th></tr>'
  + "".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (E(a), E(b), E(c)) for a,b,c in DECIDE_ROWS)
  + "</table></section>")

CHECK = [
 "Every screen maps to a sitemap page for the Design Head or to a power in the specification (sources named on each requirement page).",
 "The Design Head approves renders, quotations, design estimates and extensions, and designers' leave. The Design Head does not approve technical files.",
 "Every approval card rejects only with a written reason; approvals are logged one by one, even when batched.",
 "The head cannot confirm a client payment; only the MD does.",
 "All rupee amounts are placeholders; the numbers in brackets are samples.",
 "Heads apply to the MD for their own leave; the MD does not take leave.",
]
CHECKPAGE = '<section class="board"><div class="bh"><h1>Cross-check · what was verified</h1></div><div class="prose">' + "".join(f"<p>• {E(c)}</p>" for c in CHECK) + "</div></section>"
COVER = '''<section class="board"><div class="kicker">Version 1 · 22 November 2026 · for cross-check</div>
<h1 style="font-size:30pt;margin:6px 0 10px">First Light · Design Head wireframes</h1>
<p class="prose" style="font-size:12pt;max-width:220mm">Five boards and five requirement pages, twenty phone screens, in the same standard components as the client and design partner sets. The Design Head's job is to approve what reaches the client, to monitor every project and meeting in the design department, and to look after the team. Conflicts between the sitemap, the access matrix and the specification are settled on the decisions page.</p>
<p class="prose" style="font-size:10.5pt;max-width:220mm">Sources: sitemap pages where the Design Head is listed (home-dh, design-approval, payment-reject, project-rating, client-id, weekly-review, directory, cover, leave-approve, log-scope, rejected-versions, quote pages, delivery-problems), the access matrix, and the specification's Design Head powers.</p></section>'''
pages = [COVER, DECIDE, CHECKPAGE, BOARD1, RQ1, BOARD2, RQ2, BOARD3, RQ3, BOARD4, RQ4, BOARD5, RQ5]
out = f'<!doctype html><html><head><meta charset="utf-8"><title>First Light · Design Head wireframes v1</title><style>{CSS}</style></head><body>' + "".join(pages) + "</body></html>"
open("/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf/dh_v1.html","w",encoding="utf-8").write(out)
print("dh html", len(out))
