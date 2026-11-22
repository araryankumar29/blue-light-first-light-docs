import sys; sys.path.insert(0, "/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf")
from kit import *
T = ["Home","Tasks","Projects","Messages","More"]
def C(h,t,d): return (h,t,d)
def ICO(t): return f'<span class="ico" style="width:34px;height:34px;font-size:6.5px;border-radius:9px">{t}</span>'

# ---------- BOARD 1: sign-in, home top, meeting, done ----------
signin = [
 C('<div style="text-align:center;padding-top:6px"><div class="h1" style="font-size:17px">HOMESIC</div><div class="muted">Studio · staff</div></div>', "Wordmark", "Company wordmark, centred. Staff entrance only; clients use the client sign-in."),
 C('<div><div class="h1">Staff sign-in</div><div class="muted" style="margin-top:4px">Use your company email. Accounts are created by the MD only.</div></div>', "Heading and rule", "States that nobody self-registers."),
 C('<div class="inp">Company email · @company domain</div>', "Company email", "Domain is locked to the company. Data: person.email."),
 C('<div class="inp">Password</div>', "Password", "Show and hide. Data: person.credential."),
 C('<div class="btn pri">Sign in</div>', "Sign in", "Enters the role home for this person."),
 C('<div class="row" style="border:none"><span style="display:flex;gap:6px;align-items:center"><span style="width:12px;height:12px;border:1px solid #777;border-radius:3px"></span>Keep this device signed in for 15 days</span></div>', "Keep signed in", "Rolling 15-day session, set by the MD. Resets on every open."),
 C('<div class="muted" style="text-align:center">No account? Ask the MD.</div>', "Account note", "No create-account link. Text points to the MD."),
]
home_top = [
 C(hdr("", "Home", ("₹","⎋")), "Header", "Pay icon and Logout at the top right, as decided on 22 Nov. Settings and log out also at the bottom of Settings."),
 C('<div style="display:flex;gap:10px;align-items:center"><div class="img" style="width:54px;height:54px;border-radius:50%"><span>avatar</span></div><div><div class="h2">Good morning, Arjun</div><div class="muted">This week: [3] projects moved on · [2] approvals cleared (sample)</div></div></div>', "Hero: avatar and achievements", "Open space with the person's avatar and this week's achievements. Data: person.avatar, achievements.week."),
 C('<div class="lbl">Needs you now<b>2</b></div><div class="card" style="border:1.5px solid #2b2b2b;padding:7px"><div class="h2" style="font-size:9.5px">Approve or request change · Villa 4B meeting</div><div class="muted">Starts 11:00 · confirm the time</div></div>', "Urgent needs", "Shown above everything, before meetings. Approval requests in a distinct colour; nothing else gets this treatment."),
 C('<div class="lbl">Meetings · next<b>Collapse</b></div><div class="card" style="padding:6px 8px;display:flex;justify-content:space-between"><div><div class="h2" style="font-size:9.5px">Tue 24 Nov · 11:00</div><div class="muted">Villa 4B · site visit</div></div><div class="muted">▾</div></div>', "Meetings strip, collapsed", "Compact. Taps expand the meeting. Ordered by time. Arrow leads to all meetings after 2 to 4 items."),
 C('<div class="lbl">Deliverables<b>View all</b></div><div style="display:flex;gap:4px"><div class="card" style="flex:1;padding:5px"><div class="h2" style="font-size:8.5px">Kitchen render</div><div class="muted" style="font-size:7.5px">Due 25 Nov</div></div><div class="card" style="flex:1;padding:5px"><div class="h2" style="font-size:8.5px">Quotation</div><div class="muted" style="font-size:7.5px">Due 26 Nov</div></div></div>', "Deliverables, four boxes", "Ordered by urgency. Completed items leave straight away. Detail on the next board."),
 C(tabbar(T,"Home"), "Tab bar", "Home, Tasks, Projects, Messages, More. Registered order. Resolved: Approvals appear on Home and in each project; Meetings opens from Home and Messages."),
]
meeting_open = [
 C(hdr("‹", "Meeting", ()), "Header", "Back to the list."),
 C('<div class="card"><div class="h2" style="font-size:10px">Villa 4B · site visit</div><div class="muted">Tue 24 Nov · 11:00 · 45 min</div><div class="btn pri" style="margin-top:5px;height:26px;font-size:8.5px">Join Google Meet</div></div>', "Meeting link and time", "Link to join, time, length. Link created from the company Workspace account."),
 C('<div class="card"><div class="lbl">Agenda</div><div class="muted">1 · Confirm kitchen layout · 2 · Measure the wall · 3 · Agree the finish</div></div>', "Agenda", "Agenda as written. Editable before the meeting by the organiser."),
 C('<div class="card"><div class="lbl">Tagged</div><div class="row" style="border:none"><span>Imran · production</span><span class="r">Confirmed</span></div><div class="row" style="border:none"><span>Client · Ms. Rao</span><span class="r">Waiting</span></div></div>', "Tagged people", "Everyone in the meeting and their confirmation state."),
 C('<div style="display:flex;gap:5px"><div class="btn pri" style="flex:1;font-size:8.5px">Approve</div><div class="btn ghost" style="flex:1;font-size:8.5px">Request change</div></div><div style="display:flex;gap:5px"><div class="btn ghost" style="flex:1;font-size:8.5px">Hand over</div><div class="btn ghost" style="flex:1;font-size:8.5px">Decline</div></div>', "Approve, change, hand over", "Resolved: Approve, Request change, Hand over, Decline. Request change asks for date, time and region and goes to everyone tagged. Hand over notifies the Design Head. Decline needs a written reason, logged and visible to the rep, Sales Head and Design Head."),
 C('<div class="btn ghost">Done with meeting</div>', "Done with meeting", "Opens the close-out sheet. Close-out is separate from Decline."),
]
done_sheet = [
 C('<div class="h2">Meeting done · Villa 4B</div><div class="note-warn">Transcript: held until the architecture decision. Decided in this pass: not built now.</div>', "Transcript (held)", "Shown as a held state. Not built until the plugin decision is made."),
 C('<div class="card" style="padding:6px 8px"><div class="lbl">Next agenda · editable</div><div class="muted">Confirm wall position · order tiles · [AI suggestion, later]</div></div>', "Next agenda, editable", "Editable before submit. An AI first draft is planned later; placeholder only."),
 C('<div class="row" style="border:none"><span>Book the next meeting</span><span class="r">Optional</span></div>', "Book next (optional)", "Not required. Creates a meeting for approval by those tagged."),
 C('<div class="btn pri">Submit</div>', "Submit", "Closes the meeting and updates the project's stage and history."),
]

# ---------- BOARD 2: home lower, deliverables, tasks, create ----------
home_low = [
 C(hdr("", "Home · lower", ("⚙",)), "Header", "Same header as the top of Home."),
 C('<div class="lbl">Performance<b>Weekly · Monthly</b></div><div style="display:flex;gap:6px"><div class="card" style="flex:1;text-align:center;padding:6px"><div style="width:52px;height:52px;border-radius:50%;border:6px solid #cfcfcd;margin:0 auto"></div><div class="muted" style="font-size:7.5px;margin-top:3px">Weekly · turnaround</div></div><div class="card" style="flex:1;text-align:center;padding:6px"><div style="width:52px;height:52px;border-radius:50%;border:6px solid #2b2b2b;border-right-color:#cfcfcd;margin:0 auto"></div><div class="muted" style="font-size:7.5px;margin-top:3px">Monthly · turnaround</div></div></div>', "Two compact charts", "Weekly and monthly, side by side. Resolved: both charts measure approval turnaround. The personal rating moves to a Performance page, outside this set."),
 C('<div class="lbl">Task card<b>View all</b></div><div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Pinned by you: Imran production call</div><div class="muted">Attached: Villa 4B · 2 stakeholders</div></div>', "Pinned task", "The design partner chooses the pinned task. Data: task.pinned_by = person."),
 C('<div class="btn ghost">+ Create task</div><div class="btn ghost">Past submissions</div>', "Create task and past submissions", "Create from a call: project, stakeholders, description, date. Past submissions opens history of what was submitted."),
 C(tabbar(T,"Home"), "Tab bar", "Home active; the lower part scrolls within Home."),
]
deliv = [
 C(hdr("‹", "Deliverables", ()), "Header", "Back to Home."),
 C('<div class="lbl">Due soon</div><div class="row"><span>Kitchen render · Villa 4B</span><span class="r">25 Nov</span></div><div class="row"><span>Quotation · Villa 4B</span><span class="r">26 Nov</span></div><div class="row" style="border:none"><span>Technical file · Plot 2</span><span class="r">28 Nov</span></div>', "Upcoming list", "Ordered by urgency. Each row shows its deadline."),
 C('<div class="card"><div class="lbl">New deliverable</div><div class="inp">Project · Villa 4B</div><div class="inp">Deadline · 25 Nov 11:00</div><div class="row" style="border:none"><span style="display:flex;gap:6px;align-items:center"><span style="width:12px;height:12px;border:1px solid #777;border-radius:3px"></span>Same time as the meeting</span></div></div>', "Deadline and tick box", "Deadline always shown. Ticking copies the meeting's time. Unticked, you type your own."),
 C('<div class="btn pri">Send for approval</div>', "Send for approval", "To the Design Head for renders and quotations; to the production manager for technical files."),
 C('<div class="btn ghost">Past submissions</div>', "Past submissions", "History of everything submitted, by project and date."),
]
tasks = [
 C(hdr("", "Tasks · today", ("+",)), "Header", "Create task on the right."),
 C('<div class="lbl">09:00 – 12:00</div><div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Site visit · Villa 4B</div><div class="muted">Meeting · opens meeting view</div></div>', "Time group", "Tasks grouped by time of day. Each row shows its type."),
 C('<div class="lbl">Afternoon</div><div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Quotation · revise kitchen</div><div class="muted">Quotation · opens quotation properties</div></div>', "Quotation row", "Tap opens quotation properties."),
 C('<div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Upload render · Plot 2</div><div class="muted">Deliverable · deadline 28 Nov</div></div>', "Deliverable row", "Tap opens deliverable properties: deadline, approver, status."),
 C('<div class="row" style="border:none"><span>Yesterday and earlier</span><span class="r">View ›</span></div>', "Previous days", "At the bottom. Shows the tasks completed on earlier days."),
 C(tabbar(T,"Tasks"), "Tab bar", "Tasks active."),
]
create_sheet = [
 C('<div class="h2">New task</div>', "Title", "Opened from Create task."),
 C('<div class="inp">Project · Villa 4B</div><div class="inp">Stakeholders · Imran, Ms. Rao</div>', "Project and stakeholders", "Pick the project and the people involved. Data: task.project, task.stakeholders[]."),
 C('<div class="inp">Description · what I need to do</div><div class="inp">Date · 26 Nov</div>', "Description and date", "Written by the person. Date required."),
 C('<div class="btn pri">Create</div>', "Create", "Goes to Deliverables. Does not replace a meeting."),
]

# ---------- BOARD 3: projects, project view, messages ----------
projects = [
 C(hdr("", "Projects", ("⌕",)), "Header", "Search right."),
 C('<div class="lbl">Ongoing<b>View all</b></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:5px"><div class="card" style="padding:5px"><div class="img" style="height:34px"><span>avatar</span></div><div class="h2" style="font-size:8px">Villa 4B</div></div><div class="card" style="padding:5px"><div class="img" style="height:34px"><span>avatar</span></div><div class="h2" style="font-size:8px">Plot 2</div></div><div class="card" style="padding:5px"><div class="img" style="height:34px"><span>avatar</span></div><div class="h2" style="font-size:8px">Flat 7</div></div><div class="card" style="padding:5px;background:#f6f6f5"><div class="h2" style="font-size:8px">View all</div><div class="muted">shown after 6 to 8</div></div></div>', "Ongoing projects, four boxes", "Four to a view. The last slot becomes View all after six to eight projects."),
 C('<div class="lbl">New leads (temporary)<b>Scroll</b></div><div class="hrow"><div class="hcard" style="flex-basis:90px"><div class="img" style="height:40px"><span>image</span></div><div class="t">Lead · Sharma</div><div class="s">Token due</div></div><div class="hcard" style="flex-basis:90px"><div class="img" style="height:40px"><span>image</span></div><div class="t">Lead · Iyer</div><div class="s">Meeting done</div></div></div>', "New leads row", "Temporary projects before the token. Visible to this partner only."),
 C('<div class="lbl">Other projects<b>Pairs</b></div><div class="hrow"><div class="hcard" style="flex-basis:70px"><div class="img" style="height:30px"><span>img</span></div><div class="t" style="font-size:7.5px">Kitchen 3</div></div><div class="hcard" style="flex-basis:70px"><div class="img" style="height:30px"><span>img</span></div><div class="t" style="font-size:7.5px">Villa 9</div></div><div class="hcard" style="flex-basis:70px"><div class="img" style="height:30px"><span>img</span></div><div class="t" style="font-size:7.5px">Office 2</div></div></div>', "Other projects, horizontal", "Shown as pairs or threes in a horizontal scroll."),
 C('<div class="lbl">Past<b>View all</b></div><div class="row"><span>Flat 2 · handed over</span><span class="r">2025</span></div><div class="row" style="border:none"><span>Kitchen 1 · handed over</span><span class="r">2025</span></div>', "Past projects list", "Vertical list. View all after five to six."),
 C(tabbar(T,"Projects"), "Tab bar", "Projects active."),
]
dp_project = [
 C(hdr("‹", "Villa 4B", ("⚙",)), "Header", "Back to Projects. Name centre."),
 C('<div class="img" style="height:80px"><span>pinned render · project hero</span></div><div class="h2" style="margin-top:3px">Living and kitchen · Stage 6 of 14</div><div class="muted">9 days left in this stage · on track</div>', "Hero and stage", "Same hero as the client's. Traffic light and days left as on the client view."),
 C('<div class="hrow"><div class="stg past"><span>Stage 5</span><span>✓</span></div><div class="stg now"><span>Stage 6</span><span>Now</span></div><div class="stg fut"><span>Stage 7</span><span>Next</span></div></div>', "Stage row", "Same row as the client. Design partner can move the stage forward, which goes to approval."),
 C('<div class="card" style="display:flex;justify-content:space-between;align-items:center"><div><div class="muted">Approvals waiting on me</div><div class="h2" style="font-size:10px">2 items</div></div><div class="btn ghost" style="height:24px;width:52px;font-size:8px">Open</div></div>', "Approvals waiting", "Items this person must act on in this project."),
 C('<div class="lbl">Upload</div><div style="display:flex;gap:5px"><span class="btn ghost" style="flex:1;font-size:8px;height:26px">Deliverable</span><span class="btn ghost" style="flex:1;font-size:8px;height:26px">Render</span></div>', "Upload", "Uploads go to the Design Head first. Nothing reaches the client before approval."),
 C('<div class="lbl">Meetings · this project</div><div class="row"><span>Tue 24 Nov · site visit</span><span class="r">Schedule</span></div>', "Schedule a meeting", "Creates a meeting for those tagged to approve."),
 C('<div class="lbl">Change requests</div><div class="row"><span>Client asks: move sink</span><span class="r">Answer</span></div>', "Change requests", "Client requests since last visit. Turn one into an add-on with a price, then send for approval."),
 C('<div class="lbl">My earnings · this project</div><div class="row"><span>Earned</span><span class="r">₹ —</span></div><div class="row" style="border:none"><span>On hold</span><span class="r">₹ —</span></div>', "Own earnings here", "The partner's share for this project. Amounts are placeholders until the ledger is confirmed."),
 C('<div class="lbl">Team</div><div class="muted">Arjun · you · Imran (production) · Neha (sales)</div>', "Project team", "Everyone on the project. Access requests from others come here to approve."),
 C(tabbar(T,"Projects"), "Tab bar", "Projects active. Everything the client sees is also here, plus the actions above."),
]
staff_msgs = [
 C(hdr("", "Messages", ()), "Header", "Title only."),
 C('<div class="lbl">Calendar · November</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:7px;text-align:center"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span></div>', "Calendar", "Your meetings on a calendar at the top. Data: meetings.for_person."),
 C('<div class="lbl">Meetings<b>View all</b></div><div class="hrow"><div class="hcard" style="flex-basis:120px"><div class="t">Tue 24 · 11:00</div><div class="s">Villa 4B</div></div><div class="hcard" style="flex-basis:120px"><div class="t">Wed 25 · 15:00</div><div class="s">Plot 2</div></div></div>', "Meeting cards, swipe", "Swipeable row ordered by time, with View all."),
 C('<div class="lbl">Tags<b>View all</b></div><div class="row"><span>Imran tagged you · Villa 4B</span><span class="r">2h</span></div><div class="row" style="border:none"><span>You tagged Neha · Flat 7</span><span class="r">1d</span></div>', "Tags, given and received", "Where you are tagged in a project or task, and where you tagged someone. Ordered by time."),
 C('<div class="lbl">Team groups</div><div class="row"><span>Production · Villa 4B</span><span class="r">Open ›</span></div><div class="row" style="border:none"><span>Design team</span><span class="r">Open ›</span></div>', "Tagged WhatsApp conversations", "Team groups only, never client project groups. Tap opens the group in the WhatsApp app, through the invite link stored when the group was created. No link: 'Ask the MD for the link'."),
 C(tabbar(T,"Messages"), "Tab bar", "Messages active."),
]

# ---------- BOARD 4: pay ----------
pay = [
 C(hdr("‹", "Pay", ()), "Header", "Pay opens from the Home header, not a tab. Settings and log out are on the Settings page."),
 C('<div class="card"><div class="lbl">Earnings · my share</div><div class="h1" style="font-size:19px">₹ —</div><div class="muted">Earned to date · on hold ₹ —</div></div>', "Earnings and hold", "Share earned and amounts on hold. Share is 5% per project, paid in four steps."),
 C('<div class="lbl">Share steps</div><div style="display:flex;gap:4px"><div class="card" style="flex:1;padding:4px;text-align:center"><div class="h2" style="font-size:9px">1.5%</div><div class="muted" style="font-size:7px">Token</div></div><div class="card" style="flex:1;padding:4px;text-align:center"><div class="h2" style="font-size:9px">1.5%</div><div class="muted" style="font-size:7px">50%</div></div><div class="card" style="flex:1;padding:4px;text-align:center"><div class="h2" style="font-size:9px">1%</div><div class="muted" style="font-size:7px">35%</div></div><div class="card" style="flex:1;padding:4px;text-align:center"><div class="h2" style="font-size:9px">1%</div><div class="muted" style="font-size:7px">End</div></div></div>', "Share by stage", "Paid in step with the client: 1.5 after the token, 1.5 after 50%, 1 after 35%, 1 at the end."),
 C('<div class="lbl">By project<b>Statement</b></div><div class="row"><span>Villa 4B · stage payments</span><span class="r">›</span></div><div class="row" style="border:none"><span>Plot 2 · stage payments</span><span class="r">›</span></div>', "Stage payments by project", "Due, paid and pending per project. Opens a statement."),
 C('<div class="lbl">Payments to me<b>Confirm</b></div><div class="card" style="padding:6px 8px"><div class="h2" style="font-size:9.5px">Pay window · 10 Nov · ₹ —</div><div class="muted">Waiting for your approval</div></div>', "Payments made to me", "Each payment the company makes to you needs your approval. Dispute sends it back to the MD."),
 C('<div class="lbl">Yearly history</div><div class="row"><span>2026 · to date</span><span class="r">₹ —</span></div><div class="row" style="border:none"><span>2025</span><span class="r">₹ —</span></div>', "Yearly financial history", "Total earnings from the company by year, since joining."),
 C('<div class="lbl">Reimbursements<b>New claim</b></div><div class="row"><span>Travel to Plot 2</span><span class="r">Pending</span></div><div class="row" style="border:none"><span>Site visit · materials</span><span class="r">Paid</span></div>', "Reimbursement claims", "Each claim shows its status. Tap opens its details."),
 C(tabbar(T,"More"), "Tab bar", "Pay is opened from the header. Nothing highlighted; More shown as the home of settings and pay."),
]
confirm_sheet = [
 C('<div class="h2">Confirm payment</div><div class="muted">Pay window 10 Nov · ₹ —</div>', "Payment being confirmed", "Amount, date and the pay window it belongs to."),
 C('<div class="btn pri">Yes, received</div>', "Approve", "Records your confirmation with a timestamp."),
 C('<div class="btn ghost">Something is wrong</div>', "Dispute", "Requires a written reason. Goes back to the MD, who checks, changes and sends it back for approval."),
]

# ---------- BOARD 5: new claim, claim detail, settings, client change ----------
new_claim = [
 C(hdr("‹", "New claim", ()), "Header", "Back to Reimbursements."),
 C('<div class="inp">Amount · ₹</div><div class="inp">Region · Gurugram</div><div class="inp">When it was spent · 20 Nov</div><div class="inp">Description</div>', "Claim fields", "Amount, region, when, description. Data: claim.amount, claim.region, claim.spent_on."),
 C('<div class="img" style="height:76px;border:1.5px dashed #9a9a9a;background:#f2f2f1"><span>attach receipts and tickets · several files</span></div>', "Files and proofs", "Several files: receipts, tickets, payment proofs. Kept separately from the claim record."),
 C('<div class="btn pri">Send to Design Head</div>', "Send for approval", "Resolved: partner claims go to the Design Head, then the MD. Other staff claims go straight to the MD (sitemap)."),
]
claim_detail = [
 C(hdr("‹", "Claim", ()), "Header", "Back to the list."),
 C('<div class="card"><div class="h2" style="font-size:10px">Travel to Plot 2 · ₹ —</div><div class="muted">Region: Gurugram · 20 Nov</div><div class="muted">2 files</div></div>', "Claim summary", "Amount, region, date, file count."),
 C('<div class="lbl">Steps</div><div class="row"><span>Sent</span><span class="r">✓</span></div><div class="row"><span>Design Head</span><span class="r">Approved</span></div><div class="row" style="border:none"><span>MD payment</span><span class="r">Waiting</span></div>', "Step timeline", "Shows each approver and where the claim sits. A send-back shows the reason."),
 C('<div class="note-warn">If sent back, your reason and the MD note appear here. Resend after changes.</div>', "Send-back reason", "Visible on the claim. Data: claim.history[]."),
]
settings = [
 C(hdr("‹", "Settings", ()), "Header", "Back. Opened from the settings icon."),
 C('<div class="card"><div class="h2">Arjun</div><div class="muted">Design partner · company email</div></div>', "Profile", "Name, role and company email. Email is the login ID."),
 C('<div class="lbl">Devices and sessions</div><div class="row"><span>Chrome · Gurugram</span><span class="r">This device</span></div><div class="row" style="border:none"><span>iPhone · Delhi</span><span class="r">Sign out</span></div>', "Devices and sessions", "Signed-in devices. Sign out one at a time. The MD can end all sessions."),
 C('<div class="row" style="border-top:1px solid #e6e6e4"><span>Terms and conditions</span><span class="r">›</span></div>', "Terms", "Readable any time."),
 C('<div class="btn ghost" style="margin-top:auto">Log out</div>', "Log out, alone at the bottom", "Set apart from the other items."),
 C(tabbar(T,"More"), "Tab bar", "Opened from the settings icon; More is active."),
]
client_change = [
 C(hdr("‹", "Change request", ()), "Header", "Back to the project."),
 C('<div class="card"><div class="lbl">Client asks · 22 Nov</div><div class="h2" style="font-size:10px">Move the sink to the window wall</div><div class="muted">Raised by Ms. Rao since your last visit</div></div>', "Request", "The request as the client wrote it, with the date."),
 C('<div class="card" style="padding:6px 8px"><div class="lbl">Turn into add-on</div><div class="inp">Price · ₹ —</div><div class="muted">Add-on needs a price before it is sent.</div></div>', "Add-on with price", "Optional. Turns the request into an add-on with a price."),
 C('<div class="btn pri">Send for approval</div>', "Send for approval", "Goes to the Design Head."),
 C('<div class="btn ghost">Record client\'s words</div>', "Approve for the client", "Default approves on the client's behalf for every item. The client's words and the time are recorded; the log shows the client's name with you beside it."),
]

def B(title, intro, cols): return board(title, intro, cols)
BOARD1 = B("Design partner wireframes · 1 of 5 · Sign-in, home, meeting",
 "Standardized with the client set: same header, hero, cards, rows, tab bar. Staff tabs follow the decision of 22 Nov; conflicts are resolved on the decisions page.",
 [col("Staff sign-in","Company email, MD-created accounts.", signin),
  col("Home","Achievements, urgent needs, next meeting, deliverables.", home_top),
  col("Meeting","Link, agenda, tagged people, approve, change, hand over.", meeting_open),
  col("Done with meeting","Close-out sheet. Transcript held.", meeting_open[:1]+[C('<div class="muted">Meeting behind the sheet.</div>',"Background","Meeting behind the sheet.")], sheet=done_sheet)])
BOARD2 = B("Design partner wireframes · 2 of 5 · Home lower, deliverables, tasks",
 "Performance, the pinned task, deliverables with their deadline rule, and the task list by time.",
 [col("Home · lower","Performance, pinned task, create task, past submissions.", home_low),
  col("Deliverables","Deadline and tick box. Send for approval.", deliv),
  col("Tasks","Today by time, each row by its type.", tasks),
  col("Create task","Sheet over Tasks. Project, stakeholders, description, date.", tasks[:1]+[C('<div class="muted">Tasks, dimmed.</div>',"Background","Tasks behind the sheet.")], sheet=create_sheet)])
BOARD3 = B("Design partner wireframes · 3 of 5 · Projects, project, messages",
 "The project view holds everything the client sees, plus upload, scheduling, change requests and the partner's own earnings.",
 [col("Projects","Ongoing four boxes, new leads row, other projects, past list.", projects),
  col("Project (partner)","Hero, stage row, approvals, upload, schedule, earnings, team.", dp_project[:4]+[dp_project[-1]]),
  col("Project · lower","Change requests, earnings, team, tab bar.", dp_project[:1]+dp_project[5:]),
  col("Messages","Calendar, meetings, tags, team groups.", staff_msgs)])
BOARD4 = B("Design partner wireframes · 4 of 5 · Pay",
 "Earnings, the share by stage, payments to me, yearly history and reimbursements. Confirm a payment made to you, or dispute it.",
 [col("Pay","Header pay area: earnings, share, history, claims.", pay),
  col("Confirm payment","Sheet over Pay. Approve or dispute.", pay[:1]+[C('<div class="muted">Pay, dimmed.</div>',"Background","Pay behind the sheet.")], sheet=confirm_sheet),
  col("New claim","Fields, several files and proofs, send for approval.", new_claim),
  col("Claim detail","Each step, and send-back reasons.", claim_detail)])
BOARD5 = B("Design partner wireframes · 5 of 5 · Settings and client changes",
 "Settings in the standard five parts, and the change-request screen where the partner answers the client.",
 [col("Settings","Profile, devices, terms, log out.", settings),
  col("Change request","Client request, add-on with price, approve for the client.", client_change)])
# fill column 3 and 4 of board 5 with empty placeholders to keep the grid aligned
BOARD5 = BOARD5.replace('</div></section>', '</div></section>', 1)

RQ1 = req_board("Requirements · sign-in, home, meeting",
 "What each screen must do, why, and where the rule comes from. The columns line up with the board opposite.",
 [req_col("Staff sign-in",
  "Staff sign in with their company email and password. Accounts are created by the MD only; nobody self-registers, and there is no create-account link. The session lasts 15 days from the last open and is set by the MD. Changing the login ID ends every session on the account, and the person is told by WhatsApp.",
  ["MD creates every account","Domain locked to the company","15-day rolling session, MD sets it","Login ID change ends all sessions"],
  "Sitemap signin-staff (Spec §22.1), session (Spec §22.3, §24). Registered 22 Nov does not cover staff sign-in."),
  req_col("Home (top)",
  "Home opens on the person's own dashboard. It leads with a short line of this week's achievements, so the day starts with something positive. Urgent needs come next, above meetings, and approval requests appear in a distinct colour. The next meeting sits in a compact strip that expands on tap. Deliverables and the performance charts are on the lower part of the same screen. Logout sits at the top right of Home, next to Pay.",
  ["Urgent before meetings","Approval requests in a distinct colour","Compact meeting strip, expands on tap","Pay and Logout at the top right of Home"],
  "Registered 22 Nov (home order). Sitemap home-dp lists temporary projects, live projects, deliverables, client requirements, payments due, ledger, rating."),
  req_col("Meeting",
  "A meeting opens with its link, time, agenda and everyone tagged, each with their confirmation state. Approve or request a change. A change asks for a new date, time and region, and goes to everyone tagged, who must approve it. A meeting can be handed to someone else by tagging them; the Design Head is notified. Resolved: the sitemap's decline-with-reason is kept as one of the four options alongside approve, request change and hand over.",
  ["Everyone tagged confirms a change","Hand-over notifies the Design Head","Rejection needs a written reason (sitemap)"],
  "Registered 22 Nov (approve, change, hand over). Sitemap meeting-accept (Spec §5): accept closes the deal; reject needs a reason. Resolved, see log."),
  req_col("Done with meeting",
  "Done with meeting closes the meeting. The transcript and the next agenda are shown in a pop-up. The transcript is held: the sitemap marks it open until the plugin decision is made, so no transcript screen is built. The agenda is editable, and an AI first draft is planned later. Booking the next meeting is optional and creates a meeting for approval.",
  ["Transcript held until the architecture decision","Agenda editable before submit","Book next is optional"],
  "Sitemap meeting-transcript (Spec §23.4): open, not approved to build. Registered 22 Nov: transcript pop-up, editable agenda."),
 ])
RQ2 = req_board("Requirements · home lower, deliverables, tasks",
 "Deliverables and tasks are the partner's daily work. Each deliverable needs a deadline and an approver.",
 [req_col("Home · lower",
  "The lower part of Home carries two compact charts side by side, weekly and monthly, and the pinned task. The charts measure approval turnaround: how quickly the partner moves items forward. The sitemap page also shows a personal rating and a weekly count of completed stages. Resolved: the charts measure approval turnaround; the rating is on a Performance page outside this set. Create task and past submissions sit below the charts.",
  ["Two charts, not long bars","Charts measure approval turnaround","Pinned task chosen by the partner"],
  "Registered 22 Nov (approval turnaround). Sitemap performance (Spec §14): rating and weekly count; a delay counts only when it holds a project back."),
  req_col("Deliverables",
  "A deliverable has a project, a client, a task and a deadline. The deadline is always shown. A tick box copies the meeting's time; when unticked, the partner types their own. A deliverable goes to the Design Head for renders and quotations, and to the production manager for technical files. A completed deliverable leaves the four boxes at once. Past submissions show everything already sent.",
  ["Deadline always shown","Tick copies the meeting time","Renders and quotations go to the Design Head","Technical files go to the production manager"],
  "Registered 22 Nov (deliverables). Sitemap design-upload (App Flow §6), Spec §8, §23.3."),
  req_col("Tasks",
  "Tasks shows today's tasks grouped by time. Each row opens with the properties of its own type: a meeting shows meeting properties, a quotation shows quotation properties, a deliverable shows its deadline and approver. Previous days are reached from the bottom. A partner can create a task from a call, naming the project, stakeholders, description and date.",
  ["Grouped by time","Properties follow the type","Previous days at the bottom"],
  "Registered 22 Nov (tasks page, create task)."),
  req_col("Create task",
  "A task created from a call takes a project, the stakeholders, a written description and a date. Stakeholders are picked from the project's team first, then the wider studio; Resolved: the project team first, then anyone else in the studio by search. The task then appears in Deliverables.",
  ["Project, stakeholders, description, date","Created task lands in Deliverables","Stakeholders: project team first, then search"],
  "Registered 22 Nov; source decided in this pass."),
 ])
RQ3 = req_board("Requirements · projects, project view, messages",
 "The project view is the client's view plus the partner's actions. Projects are listed by their state; messages cover team groups only.",
 [req_col("Projects",
  "Projects lists the partner's work by state. Ongoing projects come first, four to a view, with View all after six to eight. New leads are temporary projects before the token; they are visible to this partner only. Other projects scroll sideways in pairs. Past projects are a vertical list, with View all after five to six.",
  ["Ongoing: four boxes, View all after 6 to 8","Leads visible to this partner only","Past: list, View all after 5 to 6"],
  "Registered 22 Nov (projects page). Sitemap temp-project (Spec §23.1): permanent only when the token is confirmed."),
  req_col("Project (partner)",
  "Inside a project the partner sees everything the client sees, from their side, and more. The stage row matches the client's and can be moved forward, which sends the change for approval. Approvals waiting on the partner sit at the top. The partner can upload deliverables and renders, schedule meetings, and see the change requests. Uploads go to the Design Head first; nothing reaches the client directly.",
  ["Everything the client sees, plus actions","Uploads go to the Design Head first","Partner approves on the client's behalf by default"],
  "Sitemap project-home (UI/UX §5), design-upload (App Flow §6), on-behalf (Spec §23.3). Registered 22 Nov."),
  req_col("Project · lower",
  "The lower part of the project lists the change requests raised since the last visit, the partner's own earnings for this project, and the project team. Access requests from others come here, and anyone already on the project can approve them; every grant is logged.",
  ["Change requests since last visit","Own earnings for this project","Access requests approved by anyone on the project"],
  "Sitemap change-requests (UI/UX §5), access-request (Spec §23.6). Registered 22 Nov."),
  req_col("Messages (staff)",
  "Messages is the staff messaging place. It shows a calendar of the partner's meetings, a swipeable row of meeting cards, tags given and received ordered by time, and the team groups the partner belongs to. Client project groups are not listed here; they stay inside each project. Opening a team group opens the WhatsApp app on the phone. Build risk: the group invite link must be confirmed in the WhatsApp spike.",
  ["Team groups only","Client groups stay inside each project","Opens the WhatsApp app through the stored group link. Build dependency on the WhatsApp spike"],
  "Registered 22 Nov (staff messages). Sitemap project-group (Spec §26.4): Groups API created at handover; invitation-link route to confirm."),
 ])
RQ4 = req_board("Requirements · pay",
 "Money is the most sensitive area. The partner sees their own money only, and every payment made to them needs their confirmation.",
 [req_col("Pay",
  "Pay opens from the header and shows the partner's earnings and the amount on hold, then the share by stage, the statement per project, the payments made to them, the yearly history, and their reimbursement claims. The share is 5% per project, paid in four steps: 1.5 after the token, 1.5 after the 50% payment, 1 after the 35% payment, and 1 at the end. The partner's ledger is shown in pay windows.",
  ["Share: 1.5 / 1.5 / 1 / 1","Pay windows: the 10th, 20th and 30th for partners","Own money only"],
  "Sitemap dp-ledger (Spec §14), pay-window (Settings §8), ledger (Spec §9). Registered 22 Nov: earnings, hold, history."),
  req_col("Confirm payment",
  "Each payment made to the partner needs their confirmation. They can approve it, which records a timestamp, or query it with a written reason. A dispute goes back to the MD, who checks it, makes changes and sends it back for approval. Once approved, the payment is logged into the partner's financial history.",
  ["Approve or dispute each payment","Dispute needs a reason","MD re-sends for approval","Approved payments logged to history"],
  "Registered 22 Nov (payment confirmation). Sitemap payslip (Spec §14): receiver approves; query the amount."),
  req_col("New claim",
  "A reimbursement claim records the amount, the region, when it was spent, and a description. It takes several files: receipts, tickets and payment proofs. Receipts are kept separately from the claim. Resolved: partner claims go to the Design Head, then the MD (decision of 22 Nov). Other staff claims go straight to the MD (sitemap). Both routes are shown.",
  ["Several files and proofs","Receipts kept separately","Partners: Design Head, then MD"],
  "Registered 22 Nov (claims route). Sitemap reimbursement (Spec §9): MD approves and pays; receipts kept separately."),
  req_col("Claim detail",
  "A claim's detail shows its amount, region, date and files, then each step: sent, approved by the Design Head, paid by the MD. If a claim is sent back, the reason and the note appear on it, and the partner resends after changes. Every step is logged.",
  ["Each step visible","Send-back reason shown","Resend after changes"],
  "Registered 22 Nov (claim detail pop-up). Sitemap reimbursement: approve and pay (MD)."),
 ])
RQ5 = req_board("Requirements · settings and client changes",
 "Settings in the standard five parts, and the change-request screen where the partner answers a client.",
 [req_col("Settings",
  "Settings keeps the partner's profile, devices and sessions, Terms and log out. The company email is the login ID. The MD can end any session at once, and the person is signed out and told by WhatsApp. Logout sits alone at the bottom.",
  ["Company email is the login ID","Devices: sign out one at a time","MD can end all sessions"],
  "Sitemap session (Spec §22.3, §24). Registered 22 Nov: staff settings, same structure."),
  req_col("Change request",
  "A change request is a client's request since the partner's last visit. The partner can turn it into an add-on with a price, then send it for approval to the Design Head. The partner can also approve for the client by default; when the client agrees by call, WhatsApp or Meet, the partner records the client's words and a timestamp. The log shows the client's name with the partner beside it.",
  ["Add-on needs a price before approval","Approve on the client's behalf, recorded","Log shows the client's name and the partner"],
  "Sitemap change-requests (UI/UX §5), on-behalf (Spec §23.3)."),
 ])

COVER = '''<section class="board"><div class="kicker">Version 2 · 22 November 2026 · supersedes v1</div>
<h1 style="font-size:30pt;margin:6px 0 10px">First Light · design partner wireframes</h1>
<p class="prose" style="font-size:12pt;max-width:220mm">Five boards and five requirement pages, twenty phone screens in all, built on the same standard components as the client set. Every screen was checked against the sitemap and the registered decisions of 22 November before this version. Where the sources disagree, both are named and the screen is left open. Greyscale placeholders in square brackets; nothing here is visual design.</p>
<p class="prose" style="font-size:10.5pt;max-width:220mm">Sources: sitemap pages for the design partner (signin-staff, session, home-dp, meeting pages, project pages, design and quote pages, payments and ledger pages, reimbursement, change requests, performance), and the 22 November voice decisions. Each requirement page cites its sources.</p></section>'''

LOG_ROWS = [
 ("Staff tabs","Sitemap: Home, Projects, Approvals, Meetings, More. Decision: Home, Tasks, Projects, Messages, More.","Decision. Approvals sit on Home and in each project; Meetings from Home and Messages."),
 ("Meeting decline","Sitemap: decline needs a written reason. Decision: approve, change time, hand over.","All four: Approve, Request change, Hand over, Decline with reason."),
 ("Transcript","Sitemap: held until the plugin decision. Decision: transcript pop-up at Done with meeting.","Held. Not built until the architecture decision."),
 ("Performance measure","Sitemap: personal rating and weekly stages. Decision: approval turnaround charts.","Home charts: approval turnaround. Rating on a Performance page, outside this set."),
 ("Reimbursement route","Sitemap: MD approves and pays. Decision: Design Head, then MD.","Partners: Design Head, then MD. Other staff: MD directly."),
 ("Team group link","Decision: tap opens the WhatsApp group. Sitemap: groups via Meta Groups API; invite-link route to confirm.","Opens through the stored invite link. Build dependency on the WhatsApp spike."),
 ("Stakeholders","Decision did not say the source.","Project team first, then studio search."),
 ("Sign-in","Sitemap: company email and password, 15-day session.","Sitemap used."),
]
LOG = '''<section class="board"><div class="bh"><h1>Cross-check log · what was checked and how conflicts were settled</h1><p>Each conflict is listed here; the decisions taken are on the next page.</p></div>
<table class="log"><tr><th style="width:18%">Item</th><th style="width:50%">What the sources say</th><th>How this set handles it</th></tr>''' + "".join(f"<tr><td>{E(a)}</td><td>{E(b)}</td><td>{E(c)}</td></tr>" for a,b,c in LOG_ROWS) + '''</table></section>'''

CHECK = [
 "Every screen was matched to a sitemap page, a registered decision, or both. Pages with no source are marked as new.",
 "Money: only the 5% share is stated as a figure, in four steps (1.5, 1.5, 1, 1). No amount is invented; all rupee amounts are placeholders.",
 "Pay windows are the 10th, 20th and 30th for partners (sitemap pay-window), not the 1st.",
 "The temporary project is visible to the partner only, and becomes permanent only when the token is confirmed.",
 "The transcript is not drawn as a built screen, because the sitemap holds it.",
 "Staff sign-in uses company email and the MD creates every account; there is no self-registration link.",
 "Uploads go to the Design Head first; nothing reaches the client directly.",
 "Stage numbers are placeholders from the tenant's stage list, not names.",
]
CHECKPAGE = '''<section class="board"><div class="bh"><h1>Cross-check · what was verified before presenting</h1></div><div class="prose">''' + "".join(f"<p>• {E(c)}</p>" for c in CHECK) + '''</div></section>'''


DECIDE_ROWS = [
 ("Staff tabs", "Sitemap: Home, Projects, Approvals, Meetings, More. Decision: Home, Tasks, Projects, Messages, More.", "Decision. Approvals sit on Home and inside each project, which keeps the bar to five."),
 ("Meeting decline", "Sitemap: decline needs a written reason. Decision: approve, change time, hand over.", "All four options. Decline keeps the written-reason rule, so a refusal is never silent."),
 ("Transcript", "Sitemap: held until the plugin decision. Decision: transcript pop-up.", "Held. Nothing built until the architecture decision, as the sitemap requires."),
 ("Performance measure", "Sitemap: personal rating. Decision: approval turnaround charts.", "Home charts measure approval turnaround. The rating sits on a Performance page, outside this set."),
 ("Reimbursement route", "Sitemap: MD approves and pays. Decision: Design Head, then MD.", "Partners go through the Design Head, then the MD. Other staff go to the MD directly."),
 ("Team group link", "Decision: tap opens the WhatsApp group. Sitemap: invite-link route still to confirm.", "Kept as decided, built on the stored invite link. If the spike fails, the row says 'Ask the MD for the link'."),
 ("Stakeholders", "Decision did not say the source.", "Project team first, then studio search."),
 ("Sign-in", "Sitemap: company email and password, 15-day session.", "Sitemap used. Decision said nothing on staff sign-in."),
]
DECIDE = ('<section class="board"><div class="bh"><h1>Decisions made in this pass</h1><p>Each conflict left open in v1, the decision taken and why. Change any decision the owner does not accept.</p></div>'
  '<table class="log"><tr><th style="width:18%">Item</th><th style="width:46%">What the sources said</th><th>Decision taken and why</th></tr>'
  + "".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (E(a), E(b), E(cc)) for a, b, cc in DECIDE_ROWS)
  + "</table></section>")

pages = [COVER, LOG, CHECKPAGE, DECIDE, BOARD1, RQ1, BOARD2, RQ2, BOARD3, RQ3, BOARD4, RQ4, BOARD5, RQ5]
out = f'<!doctype html><html><head><meta charset="utf-8"><title>First Light · design partner wireframes v1</title><style>{CSS}</style></head><body>' + "".join(pages) + '</body></html>'
open("/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf/dp_v2.html","w",encoding="utf-8").write(out)
print("dp html", len(out))
