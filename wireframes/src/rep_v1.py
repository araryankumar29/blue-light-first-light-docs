import sys; sys.path.insert(0, "/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf")
from kit import *
T = ["Home","Calls","Leads","Messages","More"]
def C(h,t,d): return (h,t,d)

# ---------- BOARD 1: home, queue, call card, outcome ----------
home = [
 C(hdr("", "Home", ("⎋",)), "Header", "Title centre. Logout at top right, as on the other staff homes."),
 C('<div class="card" style="border:1.5px solid #2b2b2b;padding:8px"><div class="lbl">My calls today</div><div class="h1" style="font-size:18px">[14] of [30]</div><div class="btn pri" style="margin-top:5px;height:26px;font-size:8.5px">Start calling</div></div>', "My calls today, start action", "The one primary action on this screen. Shows calls made against today's limit."),
 C('<div class="lbl">Follow-ups due<b>All</b></div><div class="row"><span>Sharma · call back 3 pm</span><span class="r">Due</span></div><div class="row" style="border:none"><span>Iyer · stalled quote, round 2</span><span class="r">Today</span></div>', "Follow-ups due", "Call-backs and stalled quotes due now or today. Each opens its lead card."),
 C('<div style="display:flex;gap:6px"><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2">[18]</div><div class="muted">this week</div></div><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2">[ ]</div><div class="muted">my rating</div></div></div>', "Weekly count and rating", "Calls and meetings set this week, and this rep's own rating. Only their own figures."),
 C(tabbar(T,"Home"), "Tab bar", "Home, Calls, Leads, Messages, More. Meetings sit in Messages with the calendar. Sitemap bar differs; see decisions."),
]
queue = [
 C(hdr("", "Today's calls", ()), "Header", "Title only."),
 C('<div class="card" style="padding:7px 8px"><div class="lbl">Group · Gurugram 2BHK leads</div><div class="h2" style="font-size:10px">[9] leads left in this group</div><div class="muted">Window 10:00 to 13:00 · limit [30] a day</div></div>', "Group and leads left", "The group name, leads left, and the call window and limit set by the Sales Head."),
 C('<div class="btn pri">Start calling</div><div class="btn ghost" style="margin-top:4px">Skip to the next lead</div>', "Start calling and skip", "Start opens the next lead's call card. Skip moves on without an outcome."),
 C('<div class="lbl">Up next</div><div class="row"><span>Sharma · Flat 4 · budget mid</span><span class="r">Attempt 1</span></div><div class="row" style="border:none"><span>Iyer · Villa 2 · budget high</span><span class="r">Attempt 2</span></div>', "Next leads", "Each lead shows its attempt count out of the limit."),
 C(tabbar(T,"Calls"), "Tab bar", "Calls active."),
]
callcard = [
 C(hdr("‹", "Call · Sharma", ()), "Header", "Back to the queue."),
 C('<div class="card"><div class="h2" style="font-size:10px">Sharma · +91 98xxx xxxxx</div><div class="muted">Gurugram · Source: calculator · Budget: mid</div><div class="muted">Attempt 1 of 3</div></div>', "Client block", "Client name, number, city, source, budget and attempt count out of the limit."),
 C('<div style="display:flex;gap:6px"><div class="btn pri" style="flex:1">Call</div><div class="btn ghost" style="flex:1">WhatsApp</div></div>', "Call and WhatsApp", "Call dials the number. WhatsApp opens the company thread for this lead."),
 C('<div class="lbl">Outcome · required</div><div class="inp">Choose one of seven</div>', "Outcome field, required", "Exactly one outcome per call. Cannot save without one."),
 C('<div class="inp">Notes · optional</div>', "Notes", "Optional. Kept on the lead's history."),
 C('<div class="btn ghost">Save and show next lead</div>', "Save and next", "Saves the outcome and shows the next lead."),
]
outcome_sheet = [
 C('<div class="h2">Call outcome</div><div class="muted">Choose one. The next step appears in one line.</div>', "Outcome title", "Exactly one outcome per call. Seven outcomes (settled)."),
 C('<div class="row"><span>Meeting set</span><span class="r">Next: date, time, designer</span></div><div class="row"><span>Connected, not yet a meeting</span><span class="r">Next: note</span></div><div class="row"><span>Warm, not now</span><span class="r">Next: future date</span></div><div class="row"><span>Not interested</span><span class="r">Cold archive</span></div><div class="row"><span>Not reached</span><span class="r">Retry cycle</span></div><div class="row"><span>Indefinite delay</span><span class="r">Unresponsive</span></div><div class="row" style="border:none"><span>Active but not responding</span><span class="r">Read, no reply</span></div>', "Seven outcomes", "Meeting set · connected not a meeting · warm not now · not interested · not reached · indefinite delay · active but not responding."),
]

# ---------- BOARD 2: follow-ups and meetings ----------
meeting = [
 C(hdr("‹", "Meeting set", ()), "Header", "Back to the call card."),
 C('<div class="inp">Date · 25 Nov</div><div class="inp">Time · 11:00</div>', "Date and time", "Date and time pickers."),
 C('<div class="inp">Design partner · Arjun</div>', "Design partner tag", "The design partner must approve the meeting."),
 C('<div class="inp">Comment · what the client wants</div>', "Comment", "Written for the design partner."),
 C('<div class="btn pri">Save and request approval</div><div class="muted" style="margin-top:3px">The Design Head is notified of every meeting.</div>', "Request approval", "Sends for the design partner's approval; the Design Head is notified."),
]
callback = [
 C(hdr("‹", "Call back", ()), "Header", "Back."),
 C('<div class="inp">Client gave · 26 Nov 15:00</div>', "Time the client gave", "The date and time the client offered."),
 C('<div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Book as a call tomorrow</div><div class="muted">Logged on the lead history</div></div>', "Booked call", "Booked as a call and logged."),
 C('<div class="btn ghost">Indefinite delay · no date</div>', "No date given", "Marks indefinite delay and moves the lead to the unresponsive archive."),
]
stalled = [
 C(hdr("", "Stalled quotes", ()), "Header", "Title only."),
 C('<div class="row"><span>Iyer · Villa 2 · silent 4 days · round 2</span><span class="r">Follow up</span></div><div class="row" style="border:none"><span>Sharma · Flat 4 · silent 3 days · round 1</span><span class="r">Follow up</span></div>', "Stalled list", "Days of silence and the round number. Lead stays live throughout."),
 C('<div class="chips"><span class="chip on">Catalogue</span><span class="chip">Sample work</span><span class="chip">Video</span><span class="chip">Call</span></div>', "Follow-up type", "Send a catalogue, sample work, a video or make a call."),
 C('<div class="btn ghost">Book a new meeting (after round 2)</div><div class="btn ghost" style="margin-top:4px">Mark not won (after round 3)</div>', "Meeting and not won", "A new meeting after round 2, on the same temporary project. Not won after round 3 moves it to closed leads."),
]
retry = [
 C(hdr("", "Retry cycle", ()), "Header", "Title only."),
 C('<div class="lbl">Pass one</div><div class="row"><span>Call</span><span class="r">now</span></div><div class="row"><span>Catalogue message</span><span class="r">now</span></div><div class="row"><span>Call</span><span class="r">+1 day</span></div><div class="row"><span>Testimonials message</span><span class="r">+3 hours</span></div><div class="row" style="border:none"><span>Call · sample videos</span><span class="r">+1 day</span></div>', "Pass one timeline", "Call, catalogues, call, testimonials three hours later, call, sample videos. The timing values are tenant settings."),
 C('<div class="card" style="padding:6px 8px"><div class="muted">Seven-day wait</div><div class="h2" style="font-size:10px">countdown · 5 days</div></div>', "Seven-day wait", "Countdown until the second pass."),
 C('<div class="note-warn">Messages go only between 8 a.m. and 10 p.m. Outside that, they wait until 8 a.m.</div>', "Send window", "Messages only in the window. Outside it they wait until 8 a.m."),
 C(tabbar(T,"Calls"), "Tab bar", "Calls active."),
]
unresp = [
 C(hdr("", "Unresponsive", ()), "Header", "Title only. Separate from closed leads and the cold archive."),
 C('<div class="row"><span>Mehta · 4 attempts · last 12 Nov</span><span class="r">Call again</span></div><div class="row" style="border:none"><span>Rao · 3 attempts · last 9 Nov</span><span class="r">Set return</span></div>', "My unresponsive leads", "Only this rep's leads, with attempts and the last contact. Cannot be deleted."),
 C('<div class="btn ghost">Set a return date</div><div class="btn ghost" style="margin-top:4px">Open the project brief</div>', "Return date", "A return date moves the lead to its own scheduled list."),
 C('<div class="lbl">Scheduled returns</div><div class="row" style="border:none"><span>Mehta · 28 Nov</span><span class="r">›</span></div>', "Scheduled returns", "The list of leads with a set return date."),
]

# ---------- BOARD 3: leads, lead card, project, client history ----------
leads = [
 C(hdr("", "My leads", ("⌕",)), "Header", "Search right."),
 C('<div class="lbl">Assigned groups</div><div class="row"><span>Gurugram 2BHK leads</span><span class="r">[9] left</span></div><div class="row" style="border:none"><span>Kitchen enquiries</span><span class="r">[4] left</span></div>', "Assigned groups", "Only the groups the Sales Head has assigned to this rep."),
 C('<div class="card" style="padding:6px 8px;border:1px solid #2b2b2b"><div class="h2" style="font-size:9.5px">Same number · 3 entries</div><div class="muted">Estimator · Social · Catalogue · Grouped by number</div></div>', "Duplicate-number highlight", "Leads sharing a phone number are highlighted with each entry and its date. Shown only if assigned to this rep."),
 C('<div class="lbl">Closed leads · mine</div><div class="muted">Only the closed leads this rep worked on.</div>', "Closed leads, mine", "Sees only the closed leads they worked on."),
 C(tabbar(T,"Leads"), "Tab bar", "Leads active."),
]
leadcard = [
 C(hdr("‹", "Lead · Sharma", ()), "Header", "Back to Leads."),
 C('<div class="card"><div class="h2" style="font-size:10px">Sharma · Flat 4 · Gurugram</div><div class="muted">Source: calculator · budget mid · timeline 3 months</div></div>', "Lead facts", "Client, city, source, budget, timeline. Calculator quotation travels with the lead."),
 C('<div class="lbl">Calculator quotation</div><div class="muted">Read-only figures from the calculator. Copy into a quotation if needed.</div>', "Calculator quotation", "Read-only. The calculator logic is not changed."),
 C('<div class="lbl">History</div><div class="row"><span>Call · attempt 1</span><span class="r">10:20</span></div><div class="row" style="border:none"><span>Meeting set · 25 Nov</span><span class="r">Pending</span></div>', "History", "Calls, meetings and notes, newest first."),
 C('<div class="btn pri">Call</div>', "Call", "Opens the call card."),
]
project = [
 C(hdr("‹", "Villa 4B", ()), "Header", "Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Stage 6 · Design · Arjun</div><div class="muted">Full visibility of this project after the meeting</div></div>', "Project summary", "The rep keeps full visibility of the whole project, not only parts of it."),
 C('<div class="note-warn">Steps in if communication breaks down or the client goes quiet. Shown as a note on the project.</div>', "Quiet client", "Used when the client goes silent. A note shows the last contact."),
 C('<div class="lbl">Client calls and meetings</div><div class="row"><span>Site visit · 24 Nov</span><span class="r">Confirmed</span></div><div class="row" style="border:none"><span>Call · 20 Nov</span><span class="r">Done</span></div>', "Project history", "Calls, meetings and notes on this project."),
 C('<div class="lbl">Transcripts</div><div class="note-warn">Held until the architecture decision. Not built.</div>', "Transcripts (held)", "Shown as held. Not built, as the sitemap requires."),
]
clienthist = [
 C(hdr("‹", "Client history", ()), "Header", "Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Client ID · [ID]</div><div class="muted">Returning client? Search by ID or number.</div></div>', "Client ID", "One ID per client. Search by ID, name or number."),
 C('<div class="lbl">Timeline · newest first</div><div class="row"><span>Call · outcome: warm, not now</span><span class="r">2 Nov</span></div><div class="row" style="border:none"><span>Meeting · site visit</span><span class="r">12 Nov</span></div>', "Timeline", "Every call, meeting and note. View-only for a returning client."),
 C('<div class="note-warn">A returning client gets a new project. Old projects are never linked to new ones.</div>', "Returning client rule", "New project, never linked to the old one."),
]

# ---------- BOARD 4: care, messages, leave, settings ----------
complaint = [
 C(hdr("‹", "Complaint", ()), "Header", "Back. Raised after handover."),
 C('<div class="card"><div class="h2" style="font-size:10px">Villa 4B · cracked tile</div><div class="muted">Raised 20 Nov · respond within 24 to 48 hours</div></div>', "Complaint", "What the client reported and when. Response due in 24 to 48 hours."),
 C('<div class="inp">What the client says · required</div>', "Problem", "Gather the request and the problem first."),
 C('<div class="lbl">Decide</div><div class="chips"><span class="chip on">Covered</span><span class="chip">Not covered</span></div>', "Covered or not", "The rep decides whether the claim is covered (10-year warranty from handover)."),
 C('<div class="inp">Written reason · required if not covered</div>', "Written reason", "An uncovered claim gets a written reason. Covered goes to the Production Head."),
 C('<div class="btn pri">Send</div>', "Send", "Covered: goes to the Production Head, who assigns a Production Manager."),
]
messages = [
 C(hdr("", "Messages", ()), "Header", "Title only."),
 C('<div class="lbl">Calendar · November</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:7px;text-align:center"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span></div>', "Calendar", "My meetings on a calendar: the meetings I set and those I am tagged in."),
 C('<div class="lbl">Meetings<b>View all</b></div><div class="hrow"><div class="hcard" style="flex-basis:120px"><div class="t">Tue 24 · 11:00</div><div class="s">Villa 4B</div></div><div class="hcard" style="flex-basis:120px"><div class="t">Wed 25 · 15:00</div><div class="s">Flat 7</div></div></div>', "Meeting cards", "Swipeable, ordered by time, View all."),
 C('<div class="lbl">Tagged conversations</div><div class="row"><span>Team · Gurugram leads</span><span class="r">Open ›</span></div><div class="row" style="border:none"><span>Client · Villa 4B group</span><span class="r">Open ›</span></div>', "Conversations", "Team groups and project groups where I am tagged. Tap opens the group."),
 C(tabbar(T,"Messages"), "Tab bar", "Messages active."),
]
leave = [
 C(hdr("", "My leave", ()), "Header", "Title only."),
 C('<div class="card"><div class="h2" style="font-size:10px">Apply for leave</div><div class="muted">Applied to the Sales Head. Sales reps do not apply to the MD.</div><div class="btn pri" style="margin-top:5px;height:26px;font-size:8.5px">New request</div></div>', "Apply", "Leave requests go to the Sales Head."),
 C('<div class="row" style="border:none"><span>Requested 4 days · 12 Dec</span><span class="r">Waiting</span></div>', "My requests", "Status of each request."),
]
settings = [
 C(hdr("‹", "Settings", ()), "Header", "Back."),
 C('<div class="card"><div class="h2">Neha</div><div class="muted">Sales representative · company email</div></div>', "Profile", "Name, role, company email (login ID)."),
 C('<div class="lbl">My pay</div><div class="row"><span>Payslips and receipts</span><span class="r">›</span></div><div class="row" style="border:none"><span>My reimbursements</span><span class="r">›</span></div>', "My pay", "Own pay and claims only."),
 C('<div class="lbl">Devices and sessions</div><div class="row"><span>Chrome · Delhi</span><span class="r">This device</span></div>', "Devices", "Sign out one at a time."),
 C('<div class="row"><span>Terms and conditions</span><span class="r">›</span></div>', "Terms", "Readable any time."),
 C('<div class="btn ghost" style="margin-top:auto">Log out</div>', "Log out, alone at the bottom", "Set apart from the other items."),
 C(tabbar(T,"More"), "Tab bar", "Opened from the header; More active."),
]

B = board
BOARD1 = B("Sales representative wireframes · 1 of 4 · Home, calls",
 "The representative's day: the start-calling action, the queue, the call card with one required outcome, and the seven outcomes.",
 [col("Home","Calls today, follow-ups, weekly count, rating.", home),
  col("Today's calls","Queue by group with leads left.", queue),
  col("Call card","One lead, call and WhatsApp, required outcome.", callcard),
  col("Outcome","The seven outcomes, each with its next step.", callcard[:1]+[C('<div class="muted">Call card, dimmed.</div>',"Background","Call card behind the sheet.")], sheet=outcome_sheet)])
BOARD2 = B("Sales representative wireframes · 2 of 4 · Follow-ups and meetings",
 "Meetings, call-backs, stalled quotes and the retry cycle, each with its own timing rule.",
 [col("Meeting set","Date, time, designer tag, comment; approval requested.", meeting),
  col("Call back","Time the client gave; booked as a call tomorrow.", callback),
  col("Stalled quotes","Follow-ups after silence; round limits.", stalled),
  col("Retry and unresponsive","Retry passes, send window, return dates.", retry)])
BOARD3 = B("Sales representative wireframes · 3 of 4 · Leads and project",
 "The leads assigned to this rep, the lead card, the project after the meeting, and the client's history.",
 [col("My leads","Assigned groups, duplicate-number highlight, closed leads (mine).", leads),
  col("Lead card","Facts, calculator quotation, history, call.", leadcard),
  col("Project","Full visibility after the meeting; quiet-client note.", project),
  col("Client history","One ID; returning clients start a new project.", clienthist)])
BOARD4 = B("Sales representative wireframes · 4 of 4 · Care, messages, leave, settings",
 "After handover the representative handles complaints and decides warranty cover; messages and leave round out the screens.",
 [col("Complaint","Respond within 24 to 48 hours; covered or not.", complaint),
  col("Messages","Calendar, meetings, tagged conversations.", messages),
  col("My leave","Requests go to the Sales Head.", leave),
  col("Settings","Profile, own pay, devices, terms, log out.", settings)])

RQ1 = req_board("Requirements · home, calls",
 "The representative calls leads and records one outcome per call. They never approve or reject a lead; they only call.",
 [req_col("Home",
  "The representative's home shows today's calls against the day's limit, with one primary action, Start calling. It shows follow-ups due, this week's count of calls and meetings, and their own rating. It shows only their own figures.",
  ["One primary action: start calling","Own figures only","Limit set by the Sales Head"],
  "Sitemap home-rep (Spec §26.7). Spec: sales representatives call; they never approve or reject leads."),
  req_col("Today's calls",
  "The queue shows the group being worked, how many leads are left, and the call window and daily limit set by the Sales Head. Start calling opens the next lead. Skip moves on without recording an outcome, and the lead stays in the queue.",
  ["Window and limit from the Sales Head","Skip records nothing","Leads left shown per group"],
  "Sitemap queue (Mobile §7). Window and daily limit values: tenant settings, to confirm."),
  req_col("Call card",
  "The call card shows the client, number, city, source, budget and the attempt count out of the limit. Call and WhatsApp are one tap each. The outcome is required: the rep cannot save a call without choosing one of the seven outcomes. Notes are optional and stay on the lead's history.",
  ["Exactly one outcome per call","Attempt count out of limit","Notes optional"],
  "Sitemap call-card (Mobile §7), outcome (Spec §26.2). Decision: seven outcomes, settled."),
  req_col("Outcome",
  "The seven outcomes are: meeting set, connected but not yet a meeting, warm but not now, not interested, not reached, indefinite delay, and active but not responding. Choosing one reveals the next step in one line. Not interested moves the lead to the cold archive; not reached enters the retry cycle; indefinite delay moves it to the unresponsive archive.",
  ["Seven outcomes, one per call","Next step in one line","Not interested: cold archive; not reached: retry"],
  "Sitemap outcome (Spec §26.2, App Flow §3). The sitemap and the decision both say seven; three documents still say four and are to be corrected."),
 ])
RQ2 = req_board("Requirements · follow-ups and meetings",
 "Each follow-up has its own timing rule. The client's time is kept; the rep does not invent one.",
 [req_col("Meeting set",
  "A rep sets a meeting with a date, time, design partner tag and comment, and requests the design partner's approval. The design partner must approve it, and the Design Head is notified of every meeting. A meeting is what creates the temporary project once the design partner approves.",
  ["Design partner must approve","Design Head notified of every meeting","Approval creates the temporary project"],
  "Sitemap meeting-set, meeting-book (App Flow §3), temp-project (Spec §23.1)."),
  req_col("Call back",
  "A time the client gives is booked as a call the next day and logged. A postponement with no date marks the lead as indefinite delay and moves it to the unresponsive archive.",
  ["Client's time kept, booked next day","No date: indefinite delay, archived"],
  "Sitemap callback (App Flow §3)."),
  req_col("Stalled quotes",
  "A client holding a quote who keeps stalling is followed up after three days of silence, up to three rounds. A new meeting after round two stays on the same temporary project. After round three the lead is marked not won and moves to the closed-leads file. The lead stays live throughout. The three days and the rounds are tenant settings.",
  ["Three days silence; three rounds","New meeting after round 2, same temp project","Not won after round 3; closed leads"],
  "Sitemap stalled (Spec §26.2)."),
  req_col("Retry and unresponsive",
  "The retry cycle makes a first pass of calls and messages: a call, catalogues, a call, testimonials three hours later, a call, then sample videos. After a seven-day wait a second pass repeats once, then the lead moves to the unresponsive archive. Messages go only between 8 a.m. and 10 p.m.; outside that they wait until 8 a.m. A rep can call again or set a return date, which moves the lead to its own scheduled list. A rep cannot delete an unresponsive lead.",
  ["8 a.m. to 10 p.m. only","Two passes, then unresponsive archive","Rep cannot delete"],
  "Sitemap retry, unresponsive (Spec §26.2). Messaging window: Spec §26.8."),
 ])
RQ3 = req_board("Requirements · leads and project",
 "The representative works only the leads the Sales Head assigns, and keeps full visibility of a project after the meeting.",
 [req_col("My leads",
  "The representative sees only the groups the Sales Head assigned to them. A phone number with more than one entry is highlighted with each entry and its date. The highlight shows only if one of those entries is assigned to this rep. The closed leads they see are only those they worked on.",
  ["Assigned groups only","Duplicate-number highlight, if assigned","Closed leads: only the ones they worked"],
  "Sitemap lead-card, closed-leads (Spec §3, §23.1). Decision of 22 Nov: duplicates highlighted, shown to assigned reps."),
  req_col("Lead card",
  "The lead card shows the client, city, source, budget and timeline. The calculator quotation travels with the lead and is read-only; the rep can copy its figures into a quotation. History lists calls, meetings and notes, newest first.",
  ["Calculator quotation read-only","History newest first"],
  "Sitemap lead-card (Spec §3). Calculator logic belongs to the calculator and is not changed."),
  req_col("Project",
  "After the meeting the representative stays on the project with full visibility of the whole project, not only parts of it. They step in to help if communication breaks down or the client goes quiet, and a note on the project shows the last contact. Transcripts are held until the architecture decision.",
  ["Full visibility after the meeting","Steps in when the client goes quiet","Transcripts held"],
  "Spec: sales representative keeps full visibility (project team section). Sitemap meeting-transcript: open, not built."),
  req_col("Client history",
  "Each client has one ID with every call, meeting and note. A returning client gets a new project, and old projects are never linked to new ones. The rep can search by ID, name or number.",
  ["One ID per client","Returning client: new project, never linked"],
  "Sitemap client-id (Spec §6)."),
 ])
RQ4 = req_board("Requirements · care, messages, leave, settings",
 "After handover the representative answers complaints and decides warranty cover. Messages, leave and settings are the same as the other staff screens.",
 [req_col("Complaint",
  "A complaint is raised by the representative after handover. The representative gathers the request and the problem and responds to the client within 24 to 48 hours. They decide whether the claim is covered under the 10-year warranty that starts at handover. An uncovered claim gets a written reason. A covered claim goes to the Production Head, who assigns a Production Manager.",
  ["Respond within 24 to 48 hours","Rep decides cover; written reason if not","Covered: Production Head assigns"],
  "Spec §11 and §6 (complaints, warranty), specification warranty rules (10 years from handover, decided in v7)."),
  req_col("Messages",
  "Messages shows the representative's calendar of meetings, a swipeable list of meeting cards, and the conversations where they are tagged. Tapping a conversation opens the group.",
  ["Calendar and meeting cards","Tagged conversations"],
  "Decision of 22 Nov (staff messages pattern)."),
  req_col("My leave",
  "A representative applies for leave to the Sales Head. The MD does not handle sales leave.",
  ["Applied to the Sales Head"],
  "Spec: sales representatives apply to the Sales Head; heads apply to the MD."),
  req_col("Settings",
  "Settings keeps the profile, the representative's own pay and claims, devices, terms and log out. Logout sits alone at the bottom.",
  ["Own pay only","Company email is the login ID"],
  "Sitemap session (Spec §22.3), payslip (Spec §14)."),
 ])

DECIDE_ROWS = [
 ("Tab bar", "Sitemap: Home, Leads, Calls, Meetings, More.", "Home, Calls, Leads, Messages, More. Meetings sit in Messages with the calendar, as for the other staff."),
 ("Call outcomes", "Spec and older documents: four. Sitemap outcome page: seven, settled.", "Seven, as settled. The four-outcome text in three documents is to be corrected."),
 ("Duplicate phone numbers", "Voice decision: entries with the same number are highlighted. Spec: groups use only eight options.", "Both. Eight options build groups; a number with several entries is a highlight on the lead, shown to assigned reps."),
 ("Transcripts", "Sitemap: open, held until architecture decision.", "Held. Shown as a note, not built."),
 ("Complaints", "Spec: rep handles and decides cover; Production Head assigns the Production Manager.", "Kept as the spec describes."),
]
DECIDE = ('<section class="board"><div class="bh"><h1>Conflicts settled in this pass</h1><p>Where the sitemap, the specification and the decisions disagree, the decision taken and why.</p></div>'
  '<table class="log"><tr><th style="width:16%">Item</th><th style="width:40%">What the sources say</th><th>Decision and why</th></tr>'
  + "".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (E(a), E(b), E(c)) for a,b,c in DECIDE_ROWS)
  + "</table></section>")
CHECK = [
 "Every screen maps to a sitemap page for the sales representative or to a power in the specification.",
 "A representative never approves or rejects a lead; they only call.",
 "Exactly one call outcome per call, from the seven settled outcomes.",
 "Messages only between 8 a.m. and 10 p.m.; outside it they wait until 8 a.m.",
 "Representatives see only the closed leads they worked on, and only the groups assigned to them.",
 "No rupee figures are shown except placeholders in brackets.",
]
CHECKPAGE = '<section class="board"><div class="bh"><h1>Cross-check · what was verified</h1></div><div class="prose">' + "".join(f"<p>• {E(c)}</p>" for c in CHECK) + "</div></section>"
COVER = '''<section class="board"><div class="kicker">Version 1 · 22 November 2026 · for cross-check</div>
<h1 style="font-size:30pt;margin:6px 0 10px">First Light · Sales representative wireframes</h1>
<p class="prose" style="font-size:12pt;max-width:220mm">Four boards and four requirement pages, sixteen phone screens, in the same standard components as the other role sets. The representative calls the leads assigned to them, records one outcome per call, books meetings, follows up stalled quotes, and after handover handles complaints and decides warranty cover.</p>
<p class="prose" style="font-size:10.5pt;max-width:220mm">Sources: sitemap pages for the sales representative (home-rep, queue, call-card, outcome, meeting-set, retry, callback, call-history, stalled, unresponsive, lead-card, closed-leads, project-home, access and history pages), the access matrix, and the specification's sales representative powers.</p></section>'''
pages = [COVER, DECIDE, CHECKPAGE, BOARD1, RQ1, BOARD2, RQ2, BOARD3, RQ3, BOARD4, RQ4]
out = f'<!doctype html><html><head><meta charset="utf-8"><title>First Light · Sales representative wireframes v1</title><style>{CSS}</style></head><body>' + "".join(pages) + "</body></html>"
open("/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf/rep_v1.html","w",encoding="utf-8").write(out)
print("rep html", len(out))
