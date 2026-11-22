import sys; sys.path.insert(0, "/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf")
from kit import *
T = ["Home","Leads","Calls","Approvals","Messages"]
def C(h,t,d): return (h,t,d)

# ---------- BOARD 1: home, intake, inbox, groups ----------
home = [
 C(hdr("", "Home", ("⎋",)), "Header", "Title centre. Logout at top right, as on the other staff homes."),
 C('<div style="display:flex;gap:6px"><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2">[14]</div><div class="muted">new today</div></div><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2">[6]</div><div class="muted">ungrouped</div></div></div>', "Today's intake", "New leads today and leads still waiting for a group."),
 C('<div class="lbl">Team today<b>All</b></div><div class="row"><span>Neha · 18 calls · 2 meetings</span><span class="r">Active</span></div><div class="row" style="border:none"><span>Ravi · 9 calls · 0 meetings</span><span class="r">Low</span></div>', "Team calls and meetings", "Each representative's calls and meetings today, from the call logs."),
 C('<div class="lbl">Lead sources · this week</div><div class="row"><span>Calculator</span><span class="r">[32]</span></div><div class="row" style="border:none"><span>Social</span><span class="r">[21]</span></div>', "Sources", "How many leads each source brings this week."),
 C('<div class="btn ghost">Monday review</div>', "Monday review", "Weekly sales report and workload review."),
 C(tabbar(T,"Home"), "Tab bar", "Home, Leads, Calls, Approvals, Messages. Meetings sit in Messages with the calendar."),
]
intake = [
 C(hdr("‹", "Lead intake", ()), "Header", "Back."),
 C('<div class="lbl">Where leads arrive</div><div class="row"><span>Calculator</span><span class="r">Automatic</span></div><div class="row"><span>Social campaign forms</span><span class="r">Automatic</span></div><div class="row" style="border:none"><span>Walk-in or referral</span><span class="r">Entered by Sales Head</span></div>', "Sources", "Every lead enters here, from forms or entered by hand."),
 C('<div class="note-warn">Every lead reaches the Sales Head, whatever its source. Nothing is routed past this step.</div>', "Rule: all leads reach Sales Head", "Every incoming lead lands here first."),
]
inbox = [
 C(hdr("", "Every lead", ("⌕",)), "Header", "Search right."),
 C('<div class="chips"><span class="chip on">All</span><span class="chip">Ungrouped</span><span class="chip">On hold</span><span class="chip">Pulled</span></div>', "Filters", "Filter by status: all, ungrouped, on hold, pulled."),
 C('<div class="row"><span>Sharma · Gurugram · calculator</span><span class="r">Ungrouped</span></div><div class="row"><span>Iyer · Noida · social</span><span class="r">Grouped</span></div><div class="row" style="border:none"><span>Rao · Delhi · social</span><span class="r">Ungrouped</span></div>', "Lead list", "Each lead with city, source and group status."),
 C('<div class="card" style="padding:6px 8px;border:1px solid #2b2b2b"><div class="h2" style="font-size:9.5px">Same number · 2 entries</div><div class="muted">Highlighted for the Sales Head. Shown with each entry and its date.</div></div>', "Duplicate-number highlight", "Phone numbers with more than one entry are highlighted, whatever their status."),
 C(tabbar(T,"Leads"), "Tab bar", "Leads active."),
]
groups = [
 C(hdr("‹", "Groups", ()), "Header", "Back."),
 C('<div class="lbl">AI grouping · fixed options</div><div class="muted">Choose one of the eight. No free keyword.</div>', "Grouping rule", "Eight fixed options; no free-text keyword."),
 C('<div class="chips"><span class="chip on">2BHK Gurugram</span><span class="chip">3BHK Gurugram</span><span class="chip">Kitchen</span><span class="chip">Wardrobe</span><span class="chip">Renovation</span><span class="chip">Commercial</span><span class="chip">Villa</span><span class="chip">Other</span></div>', "The eight options", "Eight fixed groups. Shown as chips for the Sales Head to pick."),
 C('<div class="row"><span>2BHK Gurugram</span><span class="r">[9] leads</span></div><div class="row" style="border:none"><span>Kitchen</span><span class="r">[4] leads</span></div>', "Group counts", "Leads in each group."),
]
assign = [
 C(hdr("‹", "Assign group", ()), "Header", "Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">2BHK Gurugram · [9] leads</div><div class="muted">Pick one or more representatives</div></div>', "Group", "The group and its lead count."),
 C('<div class="chips"><span class="chip on">Neha</span><span class="chip on">Ravi</span><span class="chip">Anu</span></div>', "Representatives", "Pick one or several. Each is notified."),
 C('<div class="btn pri">Assign and notify</div><div class="muted" style="margin-top:3px">Each representative gets the group when assigned.</div>', "Assign", "Each assigned representative is notified."),
]
actions = [
 C(hdr("‹", "Group actions", ()), "Header", "Back."),
 C('<div class="btn ghost">Pull this group back</div><div class="btn ghost" style="margin-top:4px">Reassign to another representative</div><div class="btn ghost" style="margin-top:4px">Hold for review</div><div class="btn ghost" style="margin-top:4px">Regroup</div>', "Four actions", "Pull, reassign, hold or regroup. Any time, for any group in sales."),
 C('<div class="note-warn">Reps cannot approve or reject leads. Only the Sales Head acts on groups.</div>', "Rule", "Reps do not change groups."),
]
cold = [
 C(hdr("", "Cold archive", ()), "Header", "Title only."),
 C('<div class="row"><span>Mehta · not interested · 14 Nov</span><span class="r">View</span></div><div class="row" style="border:none"><span>Rao · not interested · 9 Nov</span><span class="r">View</span></div>', "Cold leads", "Leads marked not interested. Viewable; reviewed by the Sales Head."),
]

# ---------- BOARD 2: calls, retry, unresponsive ----------
calls = [
 C(hdr("", "Team calls", ()), "Header", "Title only."),
 C('<div class="row"><span>Neha · 18 calls today</span><span class="r">›</span></div><div class="row" style="border:none"><span>Ravi · 9 calls today</span><span class="r">›</span></div>', "Team calls by person", "Each representative's calls today; tap for their list."),
 C('<div class="lbl">Outcomes today</div><div class="row"><span>Meeting set</span><span class="r">[4]</span></div><div class="row"><span>Connected, not yet a meeting</span><span class="r">[6]</span></div><div class="row"><span>Warm, not now</span><span class="r">[3]</span></div><div class="row"><span>Not interested</span><span class="r">[2]</span></div><div class="row"><span>Not reached</span><span class="r">[5]</span></div><div class="row"><span>Indefinite delay</span><span class="r">[1]</span></div><div class="row" style="border:none"><span>Active but not responding</span><span class="r">[2]</span></div>', "Seven outcomes", "Counts for each of the seven settled outcomes."),
 C(tabbar(T,"Calls"), "Tab bar", "Calls active."),
]
callsdetail = [
 C(hdr("‹", "Neha · calls", ()), "Header", "Back to team calls."),
 C('<div class="lbl">Calls and meetings</div><div class="row"><span>Sharma · meeting set · 25 Nov</span><span class="r">10:20</span></div><div class="row" style="border:none"><span>Iyer · warm, not now</span><span class="r">10:05</span></div>', "Representative's log", "Calls and meetings, newest first."),
 C('<div class="lbl">Future calls</div><div class="row" style="border:none"><span>Mehta · call back · 26 Nov 15:00</span><span class="r">›</span></div>', "Future calls", "Scheduled calls for this representative."),
 C('<div class="note-warn">Transcripts held until the architecture decision. Not shown.</div>', "Transcripts (held)", "Shown as held, not built."),
]
retry = [
 C(hdr("", "Retry cycle · all", ()), "Header", "Title only."),
 C('<div class="lbl">In retry · pass one</div><div class="row"><span>Rao · 2 of 3 calls</span><span class="r">Day 2</span></div><div class="row" style="border:none"><span>Shah · 1 of 3 calls</span><span class="r">Day 1</span></div>', "Retry progress", "Leads in pass one, with calls made of three."),
 C('<div class="lbl">Waiting · seven-day wait</div><div class="row" style="border:none"><span>Gupta · pass two starts in 3 days</span><span class="r">Wait</span></div>', "Seven-day wait", "Leads waiting before pass two."),
 C('<div class="note-warn">Messages go only between 8 a.m. and 10 p.m.</div>', "Send window", "Same rule as the representative's view."),
 C('<div class="btn ghost">Archive as unresponsive</div>', "Archive", "Leads past pass two move to the unresponsive archive."),
]
unresp = [
 C(hdr("", "Unresponsive", ()), "Header", "Title only."),
 C('<div class="row"><span>Mehta · 6 attempts · Neha</span><span class="r">View</span></div><div class="row" style="border:none"><span>Kumar · 6 attempts · Ravi</span><span class="r">View</span></div>', "Unresponsive list", "All reps' unresponsive leads. Cannot be deleted."),
 C('<div class="btn ghost">Set a return date</div>', "Return date", "A return date moves the lead to its own scheduled list."),
]
approvalsstub = [] 

# ---------- BOARD 3: approvals, client, project, weekly ----------
approvals = [
 C(hdr("", "Approvals", ()), "Header", "Title only."),
 C('<div class="lbl">Leave requests · sales reps</div><div class="row"><span>Ravi · 4 days · 12 Dec</span><span class="r">Approve</span></div><div class="row" style="border:none"><span>Anu · 1 day · 3 Dec</span><span class="r">Approve</span></div>', "Leave requests", "Approve or decline sales representatives' leave. Heads apply to the MD; reps apply here."),
 C('<div class="lbl">Meeting approvals</div><div class="row" style="border:none"><span>Neha · Sharma · 25 Nov 11:00</span><span class="r">Review</span></div>', "Meeting approvals", "Meetings set by reps for the design partner's approval are visible here too."),
 C('<div class="lbl">Access requests</div><div class="row" style="border:none"><span>Villa 4B · live project</span><span class="r">Request</span></div>', "Project access", "Live projects are seen only with a request; a request is granted by the owner."),
 C(tabbar(T,"Approvals"), "Tab bar", "Approvals active."),
]
client = [
 C(hdr("‹", "Client ID", ()), "Header", "Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Client ID · [ID]</div><div class="muted">Search by ID, name or number.</div></div>', "Client ID", "One ID per client."),
 C('<div class="note-warn">A returning client gets a new project. Old projects are never linked to new ones.</div>', "Returning client rule", "New project, never linked."),
 C('<div class="lbl">Timeline</div><div class="row"><span>Call · warm, not now</span><span class="r">2 Nov</span></div><div class="row" style="border:none"><span>Meeting · site visit</span><span class="r">12 Nov</span></div>', "Timeline", "Calls, meetings and notes, newest first."),
]
projrate = [
 C(hdr("‹", "Project rating", ()), "Header", "Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Villa 4B · Stage 6 · Design</div><div class="muted">Rated by the design partner and the client</div></div>', "Project", "The project and its stage."),
 C('<div class="lbl">Ratings</div><div class="row"><span>Design partner · Arjun</span><span class="r">[ ]</span></div><div class="row" style="border:none"><span>Client</span><span class="r">[ ]</span></div>', "Ratings", "Ratings the Sales Head sees for team and projects."),
 C('<div class="note-warn">A live project is not opened here. Use an access request to see it.</div>', "Live project rule", "No live project opened without a request."),
]
weekly = [
 C(hdr("‹", "Monday review", ()), "Header", "Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Sales report · week of 16 Nov</div><div class="muted">Weekly, every Monday</div></div>', "Weekly report", "The weekly sales report."),
 C('<div class="lbl">Conversion at each step</div><div class="row"><span>Lead to call</span><span class="r">[ ]%</span></div><div class="row"><span>Call to meeting</span><span class="r">[ ]%</span></div><div class="row" style="border:none"><span>Meeting to design partner approval</span><span class="r">[ ]%</span></div>', "Conversion", "Conversion at each step, from the lead to the approved meeting."),
 C('<div class="lbl">Workload</div><div class="row" style="border:none"><span>Reshuffle groups</span><span class="r">Open</span></div>', "Workload", "Review and move groups between representatives."),
]
settings = [
 C(hdr("‹", "Settings", ()), "Header", "Back."),
 C('<div class="card"><div class="h2">Priya</div><div class="muted">Sales Head · company email</div></div>', "Profile", "Name, role, company email (login ID)."),
 C('<div class="lbl">My pay</div><div class="row"><span>Payslips and receipts</span><span class="r">›</span></div>', "My pay", "Own pay only. Sales Head is on salary."),
 C('<div class="row"><span>Staff directory</span><span class="r">›</span></div><div class="row" style="border:none"><span>Log scope</span><span class="r">›</span></div>', "Directory and log scope", "Staff directory; what this role can see in logs."),
 C('<div class="btn ghost" style="margin-top:auto">Log out</div>', "Log out, alone at the bottom", "Set apart from the other items."),
]

B = board
BOARD1 = B("Sales Head wireframes · 1 of 4 · Home, intake, leads, groups",
 "Every lead reaches the Sales Head. They read the inbox, group leads with the eight fixed options, and assign each group to one or more representatives.",
 [col("Home","Today's intake, team calls and meetings, sources.", home),
  col("Intake","Every lead arrives here; nothing skips it.", intake),
  col("Every lead","Inbox, filters, duplicate-number highlight.", inbox),
  col("Groups","Eight fixed options; counts per group.", groups)])
BOARD2 = B("Sales Head wireframes · 2 of 4 · Assign, act, archive",
 "Assigning a group notifies each representative. The Sales Head can pull, reassign, hold or regroup at any time, and archives cold and unresponsive leads separately.",
 [col("Assign group","Pick representatives; each is notified.", assign),
  col("Group actions","Pull, reassign, hold, regroup.", actions),
  col("Cold archive","Not interested leads; viewable.", cold),
  col("Team calls","Seven outcomes, each with a count.", calls)])
BOARD3 = B("Sales Head wireframes · 3 of 4 · Calls, retry, unresponsive",
 "The Sales Head sees each representative's calls, meetings, archive and future calls, and the retry cycle across the whole team.",
 [col("Rep's calls","One representative's log and future calls.", callsdetail),
  col("Retry cycle","Pass one, seven-day wait, archive.", retry),
  col("Unresponsive","All reps' unresponsive leads; return dates.", unresp),
  col("Approvals","Leave, meeting approvals, project access requests.", approvals)])
BOARD4 = B("Sales Head wireframes · 4 of 4 · Clients, ratings, review, settings",
 "Client history by ID, project ratings, the Monday sales review and the settings the Sales Head needs.",
 [col("Client ID","One ID; returning clients start new.", client),
  col("Project rating","Ratings only; live project needs a request.", projrate),
  col("Monday review","Weekly report, conversion, workload.", weekly),
  col("Settings","Profile, own pay, directory, log scope, log out.", settings)])

RQ1 = req_board("Requirements · home, intake, leads, groups",
 "The Sales Head is the single entry point for leads in sales. Nothing is assigned to a representative until the Sales Head groups it.",
 [req_col("Home",
  "The home shows today's new leads, the leads still ungrouped, each representative's calls and meetings, the sources the leads came from, and a link to the Monday review.",
  ["New and ungrouped counts","Team calls and meetings","Sources this week"],
  "Sitemap home-sh. Specification: Sales Head sees lead sources and a weekly sales report."),
  req_col("Intake",
  "Every incoming lead reaches the Sales Head first, whatever its source. Calculator and social forms arrive automatically; walk-in and referral leads are entered by the Sales Head.",
  ["Every lead reaches Sales Head","Automatic and manual entry"],
  "Sitemap intake (Specification: Sales Head receives every incoming lead)."),
  req_col("Every lead",
  "The inbox lists every lead with city, source and group status, and can filter to ungrouped, on hold or pulled. A phone number with more than one entry is highlighted with each entry and its date, whatever the status.",
  ["Filters by status","Duplicate-number highlight, all leads"],
  "Sitemap inbox. Decision of 22 Nov: duplicates highlighted."),
  req_col("Groups",
  "Grouping uses eight fixed options only, chosen from the list. No free keyword is possible. Each group shows its lead count.",
  ["Eight fixed options","No free keyword"],
  "Sitemap groups, group-builder (Specification §3: the eight fixed options)."),
 ])
RQ2 = req_board("Requirements · assign, act, archive",
 "The Sales Head assigns groups and keeps full control of the leads in sales.",
 [req_col("Assign group",
  "The Sales Head picks one or more representatives for a group. Each assigned representative is notified and sees the group once it is assigned.",
  ["One or more representatives","Each assigned rep notified"],
  "Sitemap assign. Decision: multiple reps each notified."),
  req_col("Group actions",
  "The Sales Head can pull a group back, reassign it to another representative, hold it for review or regroup it, at any time. Representatives cannot change groups.",
  ["Pull, reassign, hold, regroup","Any time, any group in sales"],
  "Sitemap group-actions (Specification: full control over leads in sales)."),
  req_col("Cold archive",
  "Leads marked not interested go to the cold archive. The Sales Head can view them and review them. Cold leads are not deleted.",
  ["Viewable","Not deleted"],
  "Sitemap cold; call outcome 'not interested' (settled seven outcomes)."),
  req_col("Team calls",
  "The team calls screen shows each representative's calls, and the count of each of the seven settled outcomes. Tapping a representative opens their log.",
  ["Seven outcomes with counts","Tap to a representative's log"],
  "Specification: Sales Head can see every representative's calls. Decision: seven outcomes."),
 ])
RQ3 = req_board("Requirements · calls, retry, unresponsive",
 "The Sales Head sees every representative's calls, meetings, archive and future calls. Transcripts are held.",
 [req_col("Rep's calls",
  "Each representative's calls and meetings are listed newest first, with their future calls. The Sales Head can open any of them.",
  ["Calls, meetings, future calls","Newest first"],
  "Specification: Sales Head sees calls, meetings, archive, transcripts and future calls. Transcripts held (decision)."),
  req_col("Retry cycle",
  "The Sales Head sees the retry cycle across the team: leads in pass one, leads in the seven-day wait, and the archive step. Messages only go between 8 a.m. and 10 p.m.",
  ["Pass one progress","Seven-day wait","8 a.m. to 10 p.m. only"],
  "Sitemap retry; the same timings as the representative's view."),
  req_col("Unresponsive",
  "All representatives' unresponsive leads are listed with attempts and the representative. The Sales Head can set a return date. Unresponsive leads cannot be deleted.",
  ["All reps listed","Set return date","Not deleted"],
  "Sitemap unresponsive (Specification: unresponsive archive)."),
  req_col("Approvals",
  "Approvals gathers sales representatives' leave, meetings waiting for the design partner's approval, and access requests for a live project. The Sales Head approves leave; a live project is seen only once access is granted.",
  ["Leave for reps","Meeting approvals","Live project only by access request"],
  "Specification: Sales Head approves reps' leave; sees a live project only by requesting access."),
 ])
RQ4 = req_board("Requirements · clients, ratings, review, settings",
 "The Sales Head reviews clients, project ratings and the weekly sales report, and manages their own settings.",
 [req_col("Client ID",
  "Each client has one ID with all calls, meetings and notes. A returning client gets a new project, and old projects are never linked to new ones.",
  ["One ID per client","Returning client: new project"],
  "Sitemap client-id."),
  req_col("Project rating",
  "The Sales Head sees the ratings of their team and of the projects. A live project is not opened here; the Sales Head requests access first.",
  ["Team and project ratings","Live project only by request"],
  "Sitemap project-rating. Specification: sees ratings of the team and projects."),
  req_col("Monday review",
  "Every Monday the Sales Head sees the weekly sales report: conversion at each step from lead to approved meeting, and the workload per representative. Groups can be reshuffled from here.",
  ["Weekly report","Conversion each step","Reshuffle workload"],
  "Sitemap weekly-review. Specification: weekly sales report and workload reshuffle."),
  req_col("Settings",
  "Settings holds the Sales Head's own profile, pay, the staff directory and what each role can see in logs. Logout sits alone at the bottom.",
  ["Own pay only","Directory and log scope"],
  "Sitemap directory, log-scope, session."),
 ])

DECIDE_ROWS = [
 ("Call outcomes", "Specification and older documents: four. Sitemap outcome form: seven, settled.", "Seven. Four-outcome wording in three documents is to be corrected."),
 ("Call visibility", "Specification: Sales Head sees every representative's calls, meetings, archive, transcripts and future calls. Access matrix marks Meetings as not visible.", "Calls, meetings, archive and future calls are visible, as the specification says. Transcripts are held until the architecture decision. The matrix is to be corrected."),
 ("Live projects", "Specification and matrix: Sales Head sees a live project only by requesting access.", "Access request, as written. Nothing opens without it."),
 ("Duplicate numbers", "Decision of 22 Nov: duplicates highlighted. Specification: eight fixed options only.", "Both. Eight options build groups; duplicate numbers are a highlight for the Sales Head and the assigned representatives."),
 ("Tab bar", "Sitemap: Leads, Calls, Meetings, Communication. Design Head set: Home, Approvals, Projects, Messages, More.", "Home, Leads, Calls, Approvals, Messages. Meetings sit in Messages, as for the other staff."),
]
DECIDE = ('<section class="board"><div class="bh"><h1>Conflicts settled in this pass</h1><p>Where the sitemap, the specification and the decisions disagree, the decision taken and why.</p></div>'
  '<table class="log"><tr><th style="width:16%">Item</th><th style="width:40%">What the sources say</th><th>Decision and why</th></tr>'
  + "".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (E(a), E(b), E(c)) for a,b,c in DECIDE_ROWS)
  + "</table></section>")
CHECK = [
 "Every screen maps to a Sales Head page in the sitemap or to a Sales Head power in the specification.",
 "The Sales Head is the only role that receives every lead; no screen routes a lead around it.",
 "Groups use only the eight fixed options; no free-text keyword.",
 "Seven settled call outcomes appear in the team counts.",
 "A live project is opened only through an access request.",
 "Messages only between 8 a.m. and 10 p.m.",
 "No rupee figures are shown; counts and percentages are placeholders in brackets.",
]
CHECKPAGE = '<section class="board"><div class="bh"><h1>Cross-check · what was verified</h1></div><div class="prose">' + "".join(f"<p>• {E(c)}</p>" for c in CHECK) + "</div></section>"
COVER = '''<section class="board"><div class="kicker">Version 1 · 22 November 2026 · for cross-check</div>
<h1 style="font-size:30pt;margin:6px 0 10px">First Light · Sales Head wireframes</h1>
<p class="prose" style="font-size:12pt;max-width:220mm">Four boards and four requirement pages, sixteen phone screens, in the same standard components as the other role sets. The Sales Head receives every lead, groups it with the eight fixed options, assigns groups to representatives, watches the team's calls and retry cycle, approves leave, and reviews the weekly sales report.</p>
<p class="prose" style="font-size:10.5pt;max-width:220mm">Sources: sitemap pages for the Sales Head (home-sh, intake, inbox, groups, group-builder, assign, group-actions, cold, project-rating, client-id, leave-approve, directory, weekly-review, log-scope), the access matrix, and the specification's Sales Head powers.</p></section>'''
pages = [COVER, DECIDE, CHECKPAGE, BOARD1, RQ1, BOARD2, RQ2, BOARD3, RQ3, BOARD4, RQ4]
out = f'<!doctype html><html><head><meta charset="utf-8"><title>First Light · Sales Head wireframes v1</title><style>{CSS}</style></head><body>' + "".join(pages) + "</body></html>"
open("/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf/sh_v1.html","w",encoding="utf-8").write(out)
print("sh html", len(out))
