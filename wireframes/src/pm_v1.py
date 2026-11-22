import sys; sys.path.insert(0, "/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf")
from kit import *
def C(h,t,d): return (h,t,d)
def build(fname, title, cover_title, cover_para, cover_src, tabs, boards, reqs, decide_rows, checks, outfile):
    B = [board(*b) for b in boards]
    R = [req_board(*r) for r in reqs]
    DECIDE = ('<section class="board"><div class="bh"><h1>Conflicts settled in this pass</h1><p>Where the sitemap, the specification and the decisions disagree, the decision taken and why.</p></div>'
      '<table class="log"><tr><th style="width:16%">Item</th><th style="width:40%">What the sources say</th><th>Decision and why</th></tr>'
      + "".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (E(a),E(b),E(c)) for a,b,c in decide_rows)
      + "</table></section>")
    CHECK = '<section class="board"><div class="bh"><h1>Cross-check · what was verified</h1></div><div class="prose">' + "".join(f"<p>• {E(c)}</p>" for c in checks) + "</div></section>"
    COVER = f'''<section class="board"><div class="kicker">Version 1 · 22 November 2026 · for cross-check</div>
<h1 style="font-size:30pt;margin:6px 0 10px">{E(cover_title)}</h1>
<p class="prose" style="font-size:12pt;max-width:220mm">{E(cover_para)}</p>
<p class="prose" style="font-size:10.5pt;max-width:220mm">Sources: {E(cover_src)}</p></section>'''
    pages = [COVER, DECIDE, CHECK] + [x for pair in zip(B, R) for x in pair]
    out = f'<!doctype html><html><head><meta charset="utf-8"><title>{E(title)}</title><style>{CSS}</style></head><body>' + "".join(pages) + "</body></html>"
    html = f"/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf/{fname}.html"
    open(html,"w",encoding="utf-8").write(out)
    import subprocess
    subprocess.run(["python3","render2.py",html,f"/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf/{fname}.pdf"],check=True)
    print(fname, "done")

# ================= PRODUCTION MANAGER =================
PM_T = ["Home","Projects","Stock","Workspace","More"]
pm_home=[C(hdr("","Home",("⎋",)),"Header","Title centre. Logout top right."),
 C('<div class="card" style="padding:7px 8px"><div class="lbl">This week</div><div class="row"><span>Deliveries due</span><span class="r">[6]</span></div><div class="row" style="border:none"><span>Installations due</span><span class="r">[3]</span></div></div>',"This week","Deliveries and installations this week, from the schedule."),
 C('<div class="lbl">Material payments due<b>All</b></div><div class="row"><span>Plywood vendor · Villa 4B</span><span class="r">Due 26 Nov</span></div><div class="row" style="border:none"><span>Hardware · Flat 7</span><span class="r">Due 28 Nov</span></div>',"Payments due","Stock payments due this week, with the date."),
 C('<div class="note-warn">Double-booking: Crew R. Singh on Villa 4B and Flat 7 on 24 Nov.</div>',"Double-booking warning","Shown when a crew member or vehicle is booked twice on one day."),
 C(tabbar(PM_T,"Home"),"Tab bar","Home, Projects, Stock, Workspace, More. Stock is on the tab bar, as the sitemap requires."),]
pm_projects=[C(hdr("","My projects",("⌕",)),"Header","Search right."),
 C('<div class="row"><span>Villa 4B · Stage 7 · Production</span><span class="r">Live</span></div><div class="row" style="border:none"><span>Flat 7 · Stage 7 · Production</span><span class="r">Live</span></div>',"Assigned projects","Projects the MD assigned to this Production Manager, after the 50 percent payment."),
 C('<div class="note-warn">Sees everything on a live project. Projects assigned by the MD only.</div>',"Live project rule","Full visibility of a project once assigned."),
 C(tabbar(PM_T,"Projects"),"Tab bar","Projects active."),]
pm_project=[C(hdr("‹","Villa 4B",()),"Header","Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Stage 7 · Production</div><div class="muted">Approved design files and the signed quotation received</div></div>',"Project summary","Stage and what was handed over."),
 C('<div class="btn pri">Build BOQ</div><div class="btn ghost" style="margin-top:4px">Inventory</div><div class="btn ghost" style="margin-top:4px">Technical files</div>',"Project actions","Build the BOQ, check inventory, upload technical files."),
 C('<div class="row"><span>Installation date</span><span class="r">Set with client</span></div><div class="row" style="border:none"><span>Delivery</span><span class="r">[ ]</span></div>',"Dates","Delivery and installation dates, set with the client."),]
pm_techfiles=[C(hdr("‹","Technical files",()),"Header","Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Kitchen elevation · v2</div><div class="muted">Uploaded by the designer</div></div>',"Technical file","File received from the designer."),
 C('<div class="btn pri">Approve</div><div class="btn ghost" style="margin-top:4px">Send to client for verification</div>',"Approve, then client","The Production Manager approves; the Design Head does not."),
 C('<div class="note-warn">Client sees a file only after the Production Manager approves it.</div>',"Rule","No file reaches the client before the Production Manager approves."),]
boq_board=[C(hdr("‹","BOQ builder",()),"Header","Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Built from the approved quotation</div><div class="muted">Changes logged at every edit</div></div>',"BOQ source","Lines built from the approved quotation; the signed quotation travels with it."),
 C('<div class="row"><span>Laminate · 12 sheets · ₹ [ ]</span><span class="r">Edited</span></div><div class="row" style="border:none"><span>Hinges · 24 · ₹ [ ]</span><span class="r">From quote</span></div>',"Lines","Each line shows its source: from the quotation or edited."),
 C('<div class="btn ghost">Add a line</div><div class="btn ghost" style="margin-top:4px">See what changed the quotation</div>',"Add and compare","Manual lines; a view of what differs from the quotation."),]
boq_mat=[C(hdr("‹","Materials",()),"Header","Back."),
 C('<div class="lbl">Staged purchases</div><div class="row"><span>Stage 1 · carcass</span><span class="r">Ordered</span></div><div class="row" style="border:none"><span>Stage 2 · finish</span><span class="r">Not yet</span></div>',"Staged purchases","Material bought in stages against the BOQ."),
 C('<div class="btn pri">Raise expense request</div>',"Raise request","Request with project, amount and vendor. Goes to the Production Head."),
 C('<div class="note-warn">Approved requests come back here as a payment confirmation to acknowledge.</div>',"Acknowledge","The MD's payment confirmation returns to this screen."),]
boq_proj=[C(hdr("‹","Project inventory",()),"Header","Back."),
 C('<div class="lbl">Inventory · built from the BOQ</div><div class="row"><span>Laminates</span><span class="r">[ ] of [ ]</span></div><div class="row" style="border:none"><span>Hardware</span><span class="r">[ ] of [ ]</span></div>',"Inventory","Each project's inventory record, from the BOQ."),
 C('<div class="btn ghost">Adjust a quantity · reason</div>',"Adjust","A quantity change needs a reason."),
 C('<div class="note-warn">Shared with the Production Head and MD automatically.</div>',"Sharing","Automatic sharing with the Production Head and MD."),]
boq_ws=[C(hdr("‹","My workspace",()),"Header","Back."),
 C('<div class="lbl">Site tabs</div><div class="chips"><span class="chip on">Villa 4B</span><span class="chip">Flat 7</span><span class="chip">+ Site</span></div>',"Site tabs","One tab per site: its vendors and invoices."),
 C('<div class="lbl">General</div><div class="row"><span>Contacts</span><span class="r">›</span></div><div class="row" style="border:none"><span>Inventory register</span><span class="r">›</span></div>',"General tab","Contacts and the inventory register."),
 C('<div class="btn ghost">New table · type a category</div>',"Table builder","Type a category such as laminates; a ready table with starter rows."),]
PM1=("Production Manager wireframes · 1 of 4 · Home, projects, technical files",
 "The Production Manager's home shows the week, payments due and double-booking warnings. Projects are the ones the MD assigned after the 50 percent payment.",
 [col("Home","This week, payments due, double-booking.",pm_home),col("Projects","Assigned live projects only.",pm_projects),col("Project","Summary, actions and dates.",pm_project),col("Technical files","Approve, then send to client.",pm_techfiles)])
PM2=("Production Manager wireframes · 2 of 4 · BOQ, materials, inventory, workspace",
 "The BOQ is built from the approved quotation and can change at any time, with each change logged. Materials are bought in stages and expenses go to the Production Head.",
 [col("BOQ builder","Lines from the quote, edits logged.",boq_board),col("Materials","Staged purchases; expense requests.",boq_mat),col("Inventory","Built from the BOQ; shared automatically.",boq_proj),col("My workspace","Site tabs, general tab, table builder.",boq_ws)])
PM3_stock=[C(hdr("","Stock",("⌕",)),"Header","Search right."),
 C('<div class="lbl">Payments due this week</div><div class="row"><span>Plywood vendor · Villa 4B</span><span class="r">26 Nov</span></div><div class="row" style="border:none"><span>Hardware · Flat 7</span><span class="r">28 Nov</span></div>',"Payments due","Material payments due this week."),
 C('<div class="lbl">Stock by category</div><div class="chips"><span class="chip on">Laminates</span><span class="chip">Boards</span><span class="chip">Hardware</span><span class="chip">Lighting</span></div>',"Categories","Starter categories, to be customised."),
 C('<div class="btn ghost">Add stock in</div><div class="btn ghost" style="margin-top:4px">Flag a shortfall</div>',"Add and flag","Add stock received; flag a shortfall."),
 C(tabbar(PM_T,"Stock"),"Tab bar","Stock active."),]
vendors=[C(hdr("","Vendors",("⌕",)),"Header","Search right."),
 C('<div class="row"><span>Plywood supplier</span><span class="r">Catalogue</span></div><div class="row" style="border:none"><span>Hardware dealer</span><span class="r">Catalogue</span></div>',"Vendor list","The vendor list and catalogues."),
 C('<div class="btn ghost">Add vendor</div>',"Add vendor","New vendor record."),]
invoices=[C(hdr("‹","Vendor invoice",()),"Header","Back."),
 C('<div class="inp">Upload invoice</div><div class="inp">Tag to project · Villa 4B</div>',"Upload and tag","Tagging to a project gives the vendor an ID."),
 C('<div class="note-warn">A wrong tag is corrected here with a reason. The Production Head is told; the original stays in the log.</div>',"Correct a tag","Correction notifies the Production Head."),]
deliv=[C(hdr("","Deliveries",()),"Header","Title only."),
 C('<div class="row"><span>Tiles · Villa 4B · 25 Nov</span><span class="r">Expected</span></div><div class="row" style="border:none"><span>Laminate · Flat 7 · 24 Nov</span><span class="r">Received</span></div>',"Expected and received","Deliveries by receiving date."),
 C('<div class="btn ghost">Report short or damaged</div>',"Report a problem","A short or damaged delivery is reported here."),]
PM3=("Production Manager wireframes · 3 of 4 · Stock, vendors, invoices, deliveries",
 "Stock and vendor payments are on the tab bar. Invoices belong to both the vendor and the project, and corrections are logged.",
 [col("Stock","Payments due, categories, shortfalls.",PM3_stock),col("Vendors","Vendor list and catalogues.",vendors),col("Invoice","Upload, tag to project, correct.",invoices),col("Deliveries","Expected by date; report problems.",deliv)])
crew=[C(hdr("","Crew",("⌕",)),"Header","Search right."),
 C('<div class="row"><span>Ravi · masons</span><span class="r">Villa 4B</span></div><div class="row" style="border:none"><span>Suresh · carpenter</span><span class="r">Flat 7</span></div>',"Crew directory","Crew with skills and today's site."),
 C('<div class="btn ghost">Assign to project and date</div>',"Assign","Assign crew to a project and date."),
 C('<div class="note-warn">Crew and attendance are visible only to this Production Manager.</div>',"Visibility rule","Crew visibility is limited to the owning PM."),]
sched=[C(hdr("","Schedule",()),"Header","Title only."),
 C('<div class="lbl">This week</div><div class="row"><span>Mon · Delivery · Villa 4B</span><span class="r">Set</span></div><div class="row" style="border:none"><span>Wed · Installation · Flat 7</span><span class="r">With client</span></div>',"This week","Deliveries and installations this week."),
 C('<div class="btn ghost">Set installation with client</div><div class="btn ghost" style="margin-top:4px">Reschedule · reason</div>',"Set and reschedule","Dates are set with the client; reschedules need a reason."),
 C('<div class="note-warn">Double-booking warning shows on the date if a crew member or vehicle clashes.</div>',"Double-booking","Warning on the date itself."),]
dbl=[C(hdr("‹","Double-booking",()),"Header","Back."),
 C('<div class="card" style="border:1px solid #2b2b2b"><div class="h2" style="font-size:10px">Ravi is booked twice on 24 Nov</div><div class="muted">Villa 4B and Flat 7</div></div>',"Warning","Names the crew member or vehicle and the clashing project."),
 C('<div class="btn ghost">Go ahead anyway</div><div class="btn pri" style="margin-top:4px">Change the date</div>',"Choose","Go ahead anyway, or change the date."),]
pm_exp=[C(hdr("‹","Expense request",()),"Header","Back."),
 C('<div class="inp">Project · Villa 4B</div><div class="inp">Amount · ₹ [ ]</div><div class="inp">Vendor · reason</div>',"Request fields","Project, amount, vendor and reason."),
 C('<div class="btn pri">Submit to Production Head</div>',"Submit","Goes to the Production Head, then the MD."),
 C('<div class="lbl">Status</div><div class="row"><span>Raised</span><span class="r">✓</span></div><div class="row"><span>Checked by Production Head</span><span class="r">Pending</span></div><div class="row" style="border:none"><span>Paid by MD</span><span class="r">—</span></div>',"Status","Each step of the chain, visible to the PM."),]
PM4=("Production Manager wireframes · 4 of 4 · Crew, schedule, expenses",
 "Crew stays visible only to the Production Manager who owns it. Dates are set with the client, and expense requests follow the chain to the MD.",
 [col("Crew","Directory, assignments, owned crew only.",crew),col("Schedule","This week; installations with the client.",sched),col("Double-booking","Warning names crew and project.",dbl),col("Expense request","Raise; status through the chain.",pm_exp)])
RQ_PM1=("Requirements · home, projects, technical files",
 "The Production Manager runs factory and site work once the MD assigns a project after the 50 percent payment.",
 [req_col("Home","The home shows this week's deliveries and installations, material payments due, and any double-booking warning. A warning names the crew member or vehicle and the clashing project.",["Week at a glance","Payments due","Double-booking warning"],"Sitemap home-pm; spec §10 (double-booking warning)."),
  req_col("Projects","Projects are the ones the MD assigned to this Production Manager. Once assigned, the Production Manager sees everything on the live project.",["Assigned by the MD","Full visibility on a live project"],"Spec §10 and the production handover (MD assigns after 50 percent)."),
  req_col("Project","The project screen shows its stage, the approved design files and signed quotation received, and the dates. The Production Manager sets delivery and installation dates with the client.",["Stage and handover","Dates set with client"],"Spec §10; sitemap project-home."),
  req_col("Technical files","The Production Manager approves technical files from the designer, then they go to the client for verification. The Design Head does not approve technical files.",["PM approves","Design Head does not approve","Client verifies after PM"],"Sitemap technical-files (Design Head does not approve).")])
RQ_PM2=("Requirements · BOQ, materials, inventory, workspace",
 "The BOQ is the working list for the project. It can change at any time and every change is logged.",
 [req_col("BOQ builder","The BOQ is built from the approved quotation, and the signed quotation travels with it. The Production Manager can add lines, edit quantity or rate, and see what changed against the quotation. Every change is logged.",["Built from approved quote","Every change logged","Compare to quote"],"Sitemap boq; spec §10."),
  req_col("Materials","Materials are bought in stages. A purchase request carries project, amount and vendor, and goes to the Production Head, then the MD. The MD's payment confirmation returns to the Production Manager, who acknowledges it.",["Staged purchases","Expense chain to MD","Acknowledge payment"],"Spec §9 (production expense chain)."),
  req_col("Inventory","Each project has its own inventory, built from the BOQ. Adjusting a quantity needs a reason. It is shared automatically with the Production Head and MD.",["Built from BOQ","Adjust with reason","Shared automatically"],"Sitemap inventory."),
  req_col("My workspace","Each Production Manager has a standalone workspace: a tab per site with its vendors and invoices, a general tab with contacts and the inventory register, and a table builder that starts a category with starter rows.",["Site tabs","General tab","Table builder with starter rows"],"Spec §10 (Production Manager's own workspace).")])
RQ_PM3=("Requirements · stock, vendors, invoices, deliveries",
 "Stock and vendor payments are on the tab bar. Invoices belong to both the vendor and the project.",
 [req_col("Stock","Material payments due this week, stock by category, adding stock in, and flagging a shortfall.",["Payments due this week","Stock by category","Flag shortfall"],"Sitemap stock."),
  req_col("Vendors","The vendor list holds each vendor's catalogue. The Production Manager and Production Head both see vendor catalogues.",["Vendor list","Catalogues"],"Sitemap vendors; spec on the Production Head's vendor list."),
  req_col("Invoice","An invoice is uploaded and tagged to a project, which gives the vendor an ID. Each invoice belongs to the vendor record and the project. A wrong tag is corrected with a reason; the Production Head is notified and the original stays in the log.",["Tagged to project, gives vendor ID","Correction notifies Production Head","Original kept in log"],"Sitemap invoices."),
  req_col("Deliveries","Vendor deliveries follow the receiving date. The Production Manager marks a delivery received, or reports a short or damaged one.",["Expected by receiving date","Report short or damaged"],"Sitemap deliveries.")])
RQ_PM4=("Requirements · crew, schedule, expenses",
 "Crew, schedule and expenses are the Production Manager's day-to-day. Crew visibility is restricted to the owning manager.",
 [req_col("Crew","Each Production Manager keeps a crew directory with skills and availability, and assigns crew to projects and dates. Crew assignments and attendance are visible only to the owning Production Manager.",["Owned crew only","Assign by project and date"],"Sitemap crew; spec §10."),
  req_col("Schedule","This week's deliveries and installations sit on the home. Installation dates are set with the client; a reschedule needs a reason. A double-booking warning appears on the date.",["Set with client","Reschedule with reason","Double-booking on date"],"Sitemap schedule."),
  req_col("Double-booking","The platform warns when the same crew member or vehicle is on two projects on one day. The Production Manager can go ahead anyway or change the date.",["Named crew or vehicle","Go ahead or change date"],"Spec §10; sitemap double-booking."),
  req_col("Expense request","Expense requests and bills follow the same chain: the Production Manager raises it, the Production Head checks it, the MD pays and marks it approved, and the Production Manager acknowledges it. Expenses are visible only to those three roles.",["Chain: PM, PH, MD, PM","Visible only to three roles"],"Spec §9 (production expenses); sitemap production-expense.")])
PM_DECIDE=[
 ("Crew visibility","Spec: Production Head can open any PM's profile and see where each crew member is. Sitemap: crew assignments and attendance visible only to the owning PM.","Both. The Production Head sees where each crew member is through the PM's profile, as the spec says. Attendance detail stays with the owning PM."),
 ("Expense chain","Spec and sitemap agree: PM raises, PH checks and approves, MD pays, PM acknowledges. PM bills follow the same chain.","As written."),
 ("Tab bar","Sitemap: stock reachable from the tab bar; workspace is the PM's own.","Home, Projects, Stock, Workspace, More."),
 ("Technical files","Spec: PM approves; Design Head does not approve technical files.","As written."),
 ("Snags and quality checks","Sitemap: handled offline, no screen in this version.","No screen built. Shown as a note only."),
]
PM_CHECK=["Every screen maps to a Production Manager page in the sitemap or to a power in the specification.","Expenses are visible only to the Production Manager, the Production Head and the MD.","Crew and attendance are visible only to the owning Production Manager.","Stock is reachable from the tab bar.","The Design Head does not approve technical files.","Money fields show placeholders in brackets; no rupee figures are invented."]
build("pm_v1","First Light · Production Manager wireframes","First Light · Production Manager wireframes",
 "Four boards and four requirement pages, sixteen phone screens. The Production Manager runs factory and site work for each project the MD assigns: the BOQ, materials, inventory, vendors, invoices, deliveries, crew, the schedule, and expense requests that follow the approval chain.",
 "sitemap pages for the Production Manager, the access matrix and the specification's Production Manager powers (sections 9, 10, 13).",
 PM_T,
 [PM1,PM2,PM3,PM4],
 [RQ_PM1,RQ_PM2,RQ_PM3,RQ_PM4],
 PM_DECIDE, PM_CHECK, "pm")

# ================= PRODUCTION HEAD =================
PH_T=["Home","Approvals","Projects","Vendors","More"]
ph_home=[C(hdr("","Home",("⎋",)),"Header","Title centre. Logout top right."),
 C('<div style="display:flex;gap:6px"><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2">[4]</div><div class="muted">expenses to check</div></div><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2">[2]</div><div class="muted">estimates waiting</div></div></div>',"Waiting for you","Expenses to check and estimates to approve."),
 C('<div class="lbl">Production managers<b>All</b></div><div class="row"><span>Ravi · Villa 4B · on site</span><span class="r">Active</span></div><div class="row" style="border:none"><span>Anu · Flat 7 · at factory</span><span class="r">Active</span></div>',"Managers today","Each Production Manager and their project today."),
 C('<div class="row" style="border:none"><span>Delivery problems</span><span class="r">Held</span></div>',"Delivery problems","Held until the owner approves the screen (open item 16)."),
 C(tabbar(PH_T,"Home"),"Tab bar","Home, Approvals, Projects, Vendors, More."),]
ph_appr=[C(hdr("","Approvals",()),"Header","Title only."),
 C('<div class="lbl">Expenses to check</div><div class="row"><span>Villa 4B · materials · ₹ [ ]</span><span class="r">Check</span></div><div class="row" style="border:none"><span>Flat 7 · bill · ₹ [ ]</span><span class="r">Check</span></div>',"Expenses to check","Each production expense waits here before it reaches the MD."),
 C('<div class="lbl">Estimates</div><div class="row" style="border:none"><span>Production time · Villa 4B</span><span class="r">Approve</span></div>',"Estimates","Production and installation time estimates and revisions."),
 C('<div class="lbl">Leave</div><div class="row" style="border:none"><span>Anu · 2 days · 4 Dec</span><span class="r">Approve</span></div>',"Leave","Production leave is approved here."),
 C(tabbar(PH_T,"Approvals"),"Tab bar","Approvals active."),]
ph_exp=[C(hdr("‹","Expense check",()),"Header","Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Villa 4B · materials · ₹ [ ]</div><div class="muted">Raised by Ravi · 22 Nov</div></div>',"Expense","Who raised it, the project and the amount."),
 C('<div class="lbl">Supporting data</div><div class="btn ghost">Ask for supporting data</div>',"Supporting data","The Production Head can ask for supporting data before approving."),
 C('<div class="btn pri">Approve and forward to MD</div><div class="btn ghost" style="margin-top:4px">Return to manager</div>',"Approve or return","Approve and forward to the MD, or return to the manager."),]
ph_est=[C(hdr("‹","Estimate",()),"Header","Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Production time · Villa 4B</div><div class="muted">Submitted by Ravi</div></div>',"Estimate","Production or installation time estimate."),
 C('<div class="btn pri">Approve</div><div class="btn ghost" style="margin-top:4px">Ask for revision</div>',"Approve or revise","Approve, or ask for a revision."),]
ph_vendors=[C(hdr("","Vendors",("⌕",)),"Header","Search right."),
 C('<div class="row"><span>Plywood supplier</span><span class="r">Catalogue</span></div><div class="row" style="border:none"><span>Hardware dealer</span><span class="r">Catalogue</span></div>',"Company vendor list","The company's vendor list, with catalogues and price lists."),
 C('<div class="lbl">Invoices</div><div class="row" style="border:none"><span>Plywood supplier · invoice 214</span><span class="r">›</span></div>',"Invoices","Every vendor invoice, all projects."),
 C(tabbar(PH_T,"Vendors"),"Tab bar","Vendors active."),]
ph_proj=[C(hdr("","Projects",("⌕",)),"Header","Search right."),
 C('<div class="row"><span>Villa 4B · Ravi</span><span class="r">Live</span></div><div class="row" style="border:none"><span>Flat 7 · Anu</span><span class="r">Live</span></div>',"Production projects","Every project that reaches production."),
 C('<div class="btn ghost">Reshuffle manager</div>',"Reshuffle","Reassign which manager handles which project."),
 C(tabbar(PH_T,"Projects"),"Tab bar","Projects active."),]
ph_crew=[C(hdr("‹","Ravi · profile",()),"Header","Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Ravi · Production Manager</div><div class="muted">Projects and crew</div></div>',"Profile","Any manager's profile."),
 C('<div class="lbl">Where each crew member is</div><div class="row"><span>Suresh · carpenter</span><span class="r">Flat 7</span></div><div class="row" style="border:none"><span>Mohan · mason</span><span class="r">Villa 4B</span></div>',"Crew locations","Where each crew member is, on the profile."),
 C('<div class="note-warn">Attendance detail stays with the owning manager.</div>',"Attendance rule","Only the owning manager sees attendance detail."),]
ph_problems=[C(hdr("","Delivery problems",()),"Header","Title only. Held."),
 C('<div class="note-warn">Held: this screen waits for the owner to approve open item 16.</div>',"Held","Not built until approved."),]
ph_more=[C(hdr("‹","Settings",()),"Header","Back."),
 C('<div class="card"><div class="h2">Imran</div><div class="muted">Production Head · company email</div></div>',"Profile","Name, role, company email."),
 C('<div class="row"><span>Staff directory</span><span class="r">›</span></div><div class="row" style="border:none"><span>Monday review</span><span class="r">›</span></div>',"Directory and review","Staff directory and the Monday review."),
 C('<div class="btn ghost" style="margin-top:auto">Log out</div>',"Log out, alone at the bottom","Set apart from other items."),]
ph_cover=[C(hdr("","Cover scope",()),"Header","Title only."),
 C('<div class="row"><span>Ravi on leave 4 Dec</span><span class="r">Cover: Anu</span></div>',"Cover","Choose the cover when a manager is on leave."),
 C('<div class="btn pri">Confirm cover</div>',"Confirm","Each cover handover notifies the Production Head."),]
PH1=("Production Head wireframes · 1 of 4 · Home, approvals, expenses, estimates",
 "The Production Head checks every production expense before it reaches the MD, approves production estimates, and approves leave.",
 [col("Home","Waiting items, managers today, held screen.",ph_home),col("Approvals","Expenses, estimates, leave.",ph_appr),col("Expense check","Check, ask for data, forward.",ph_exp),col("Estimate","Approve or ask for revision.",ph_est)])
PH2=("Production Head wireframes · 2 of 4 · Vendors, projects, managers",
 "The Production Head maintains the vendor list, sees every project that reaches production, and can open any manager's profile.",
 [col("Vendors","Vendor list, catalogues, invoices.",ph_vendors),col("Projects","Every production project; reshuffle managers.",ph_proj),col("Manager profile","Projects, crew locations, attendance rule.",ph_crew),col("Settings","Profile, directory, review, log out.",ph_more)])
PH3=("Production Head wireframes · 3 of 4 · Cover, problems, review",
 "Cover scope is chosen when a manager is away. The delivery problems screen is held until the owner approves it.",
 [col("Cover scope","Pick cover for a manager's leave.",ph_cover),col("Delivery problems","Held until open item 16 is approved.",ph_problems),col("Monday review","Weekly review with the team.",[C(hdr("‹","Monday review",()),"Header","Back."),C('<div class="row"><span>Production on time</span><span class="r">[ ]%</span></div><div class="row" style="border:none"><span>Installations this week</span><span class="r">[ ]</span></div>',"Review figures","Weekly production figures."),C('<div class="btn ghost">Reshuffle workload</div>',"Reshuffle","Move workload between managers."),]),col("Log scope","What the Production Head can see in logs.",[C(hdr("‹","Log scope",()),"Header","Back."),C('<div class="row"><span>Production expenses</span><span class="r">Visible</span></div><div class="row" style="border:none"><span>Other departments</span><span class="r">Hidden</span></div>',"Log scope","What is visible in logs to this role.")])])
PH4=("Production Head wireframes · 4 of 4 · Your own work as a manager",
 "The specification notes the Production Head currently also works as a Production Manager. This board keeps that view, so it can be removed later without rebuilding the rest.",
 [col("Own projects","Projects the Production Head works on directly.",[C(hdr("","My projects",()),"Header","Title only."),C('<div class="note-warn">Currently combined with the Production Manager role. Kept separate here so it can be removed.</div>',"Interim note","Interim; remove when roles split."),C('<div class="row" style="border:none"><span>Villa 4B · own work</span><span class="r">Live</span></div>',"Own project","A project the Production Head works on.")]),col("Own BOQ","Same BOQ rules as the Production Manager.",[C(hdr("‹","BOQ",()),"Header","Back."),C('<div class="note-warn">Same rules as the Production Manager: built from the approved quote, every change logged.</div>',"Rule","The Production Manager's BOQ rules apply.")]),col("Own crew","Owned crew only.",[C(hdr("‹","My crew",()),"Header","Back."),C('<div class="note-warn">Owned crew only, as for any Production Manager.</div>',"Visibility","Owned crew visible to the owner.")]),col("Own expenses","Expense requests as a manager.",[C(hdr("‹","My expense",()),"Header","Back."),C('<div class="row"><span>Raised</span><span class="r">✓</span></div><div class="row" style="border:none"><span>Checked by Head</span><span class="r">Self</span></div>',"Chain","Own requests go to the Head's check and then the MD.")])])
RQ_PH1=("Requirements · approvals, expenses, estimates",
 "The Production Head is the check between the manager and the MD: every production expense passes through them, and they approve time estimates and leave.",
 [req_col("Home","The home shows expenses to check, estimates waiting, the managers working today, and the delivery problems screen (held).",["Waiting counts","Managers today","Delivery problems held"],"Sitemap home-ph; spec on the Production Head."),
  req_col("Approvals","Each production expense waits here before it reaches the MD. Production and installation time estimates and revisions are approved here, and so is production leave.",["Expenses first","Estimates and revisions","Leave approved here"],"Spec §9 (expense chain); spec on Production Head estimates and leave."),
  req_col("Expense check","The Production Head checks the expense for correctness and can ask for supporting data, then approves it and forwards it to the MD, or returns it to the manager.",["Check, ask for data","Approve and forward to MD"],"Spec §9 (steps 2 and 3)."),
  req_col("Estimate","The Production Head approves production or installation time estimates, or asks for a revision.",["Approve or revise"],"Spec on Production Head estimates.")])
RQ_PH2=("Requirements · vendors, projects, managers",
 "The Production Head oversees every production manager, and keeps the company's vendor list.",
 [req_col("Vendors","The company's vendor list holds every vendor's catalogue, price list and invoices. Every invoice is visible, across all projects.",["Vendor list and catalogues","All invoices"],"Spec on Production Head vendors (section 9 and vendors)."),
  req_col("Projects","The Production Head sees every project that reaches production, without being assigned to each one, and can reshuffle which manager handles which project.",["Every production project","Reshuffle manager"],"Spec on Production Head, workload and reshuffle."),
  req_col("Manager profile","The Production Head opens any manager's profile and sees where each crew member is. Attendance detail stays with the owning manager.",["Crew locations on profile","Attendance stays with owner"],"Spec §10 (crew location); sitemap crew. Decision recorded."),
  req_col("Settings","Settings holds the Production Head's profile, the staff directory, the Monday review and the log scope.",["Profile","Directory and review"],"Sitemap directory, weekly-review, log-scope.")])
RQ_PH3=("Requirements · cover, problems, review, log scope",
 "Cover and the review are the Production Head's management tools. The delivery problems screen is held.",
 [req_col("Cover scope","When a Production Manager is on leave, the Production Head chooses the cover. Each handover of cover notifies the Production Head.",["Choose cover on leave","Handover notifies Head"],"Spec on Production Head cover and Production Manager leave."),
  req_col("Delivery problems","The delivery problems list is held until the owner approves open item 16. It is not built or shown in this set.",["Held"],"Sitemap delivery-problems (awaiting owner approval)."),
  req_col("Monday review","The Monday review shows production figures and the workload per manager, and lets the Production Head reshuffle workload.",["Production figures","Reshuffle workload"],"Sitemap weekly-review."),
  req_col("Log scope","The Production Head sees production expenses in the logs and not other departments' logs.",["Production expenses visible","Other departments hidden"],"Sitemap log-scope.")])
RQ_PH4=("Requirements · the Production Head's own work",
 "The specification says the Production Head currently also acts as a Production Manager. This set keeps that view separate so it can be removed later.",
 [req_col("Own projects","While the roles are combined, the Production Head can work directly on projects, with the same rules as a manager.",["Interim","Same rules as manager"],"Spec, Production Head powers: currently also acts as a Production Manager."),
  req_col("Own BOQ and crew","The BOQ and crew rules are the same as for any Production Manager.",["BOQ rules","Owned crew only"],"Spec §10."),
  req_col("Own expenses","Own expense requests follow the chain: the Head checks, and the MD pays.",["Head check, then MD"],"Spec §9."),
  req_col("Removal","When the roles split, this board is removed. Nothing else in the set depends on it.",["Removable"],"Decision recorded below.")])
PH_DECIDE=[
 ("Combined role","Spec: Production Head currently also acts as a Production Manager.","Kept as an interim board, separate so it can be removed when roles split."),
 ("Crew visibility","Spec: Production Head sees where each crew member is. Sitemap: attendance visible only to owning PM.","Location through the profile, as the spec says. Attendance stays with the owning manager."),
 ("Delivery problems","Sitemap: awaiting owner approval (open item 16).","Held. Not built."),
 ("Expense chain","Spec: the Production Head checks every expense before the MD.","As written."),
 ("Tab bar","Sitemap production-head screens: Home, Approvals, Projects, Vendors.","Home, Approvals, Projects, Vendors, More."),
]
PH_CHECK=["Every expense passes the Production Head before the MD.","Crew attendance detail is not shown to the Production Head.","Delivery problems are held, not built.","The combined-role board is marked interim.","No rupee figures are invented; placeholders only."]
build("ph_v1","First Light · Production Head wireframes","First Light · Production Head wireframes",
 "Four boards and four requirement pages. The Production Head checks production expenses before the MD, approves estimates and leave, maintains the vendor list, oversees every production manager and chooses cover. The delivery problems screen is held. A fourth board covers the interim combined role.",
 "sitemap pages for the Production Head, the access matrix and the specification's Production Head powers (sections 9, 13).",
 PH_T,[PH1,PH2,PH3,PH4],[RQ_PH1,RQ_PH2,RQ_PH3,RQ_PH4],PH_DECIDE,PH_CHECK,"ph")

# ================= MARKETING HEAD =================
MH_T=["Home","Content","Funnel","Spend","More"]
mh_home=[C(hdr("","Home",("⎋",)),"Header","Title centre. Logout top right."),
 C('<div style="display:flex;gap:6px"><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2">[12]</div><div class="muted">posts this week</div></div><div class="card" style="flex:1;padding:6px;text-align:center"><div class="h2">[38]</div><div class="muted">leads passed on</div></div></div>',"This week","Posts scheduled and leads passed to the Sales Head."),
 C('<div class="lbl">Pipeline</div><div class="row"><span>Ideas</span><span class="r">[4]</span></div><div class="row"><span>Scheduled</span><span class="r">[9]</span></div><div class="row" style="border:none"><span>Published</span><span class="r">[12]</span></div>',"Pipeline counts","Content stages from idea to published."),
 C('<div class="btn pri">Add my own content</div>',"Add content","Add posts alongside what the system generates."),
 C(tabbar(MH_T,"Home"),"Tab bar","Home, Content, Funnel, Spend, More."),]
mh_brand=[C(hdr("‹","Brand template",()),"Header","Back."),
 C('<div class="lbl">Logo</div><div class="inp">Upload logo</div><div class="lbl">Colours</div><div class="chips"><span class="chip on">Ink</span><span class="chip">Cream</span><span class="chip">Lavender</span><span class="chip">Magenta</span></div>',"Logo and colours","Logo, colours and fonts for the studio."),
 C('<div class="lbl">Fonts</div><div class="row" style="border:none"><span>Heading · Text</span><span class="r">›</span></div>',"Fonts","Fonts for headings and text."),
 C('<div class="btn pri">Save new version</div><div class="btn ghost" style="margin-top:4px">Version history</div>',"Save and history","Every change is kept as a version and can be restored."),
 C('<div class="note-warn">The platform chooses the AI model. Not set here.</div>',"AI model","The Marketing Head does not choose the model."),]
mh_content=[C(hdr("","Content pipeline",("⌕",)),"Header","Search right."),
 C('<div class="row"><span>Reel · Villa 4B interior</span><span class="r">Scheduled</span></div><div class="row" style="border:none"><span>Carousel · kitchen ideas</span><span class="r">Idea</span></div>',"Content items","Each item with its stage."),
 C('<div class="btn ghost">Move to next stage</div>',"Move stage","Move an item from idea to published."),
 C('<div class="btn ghost" style="margin-top:4px">Hand leads to Sales Head</div>',"Hand leads","Leads filtered and passed to the Sales Head, who groups them."),
 C(tabbar(MH_T,"Content"),"Tab bar","Content active."),]
mh_post=[C(hdr("‹","Post",()),"Header","Back."),
 C('<div class="card"><div class="h2" style="font-size:10px">Reel · Villa 4B interior</div><div class="muted">Generated from the brand template</div></div>',"Post","Generated by the system from the template."),
 C('<div class="chips"><span class="chip on">Instagram</span><span class="chip">Facebook</span><span class="chip">WhatsApp</span></div>',"Channels","Pick the channels."),
 C('<div class="inp">Schedule · 25 Nov 18:00</div><div class="inp">Copy and media · edit</div>',"Schedule and edit","Schedule a date and edit copy and media."),
 C('<div class="btn pri">Publish or queue</div>',"Publish","Publish now or queue."),]
mh_comments=[C(hdr("","Comments and replies",()),"Header","Title only."),
 C('<div class="row"><span>Reply sent automatically · 2 comments</span><span class="r">Handled</span></div><div class="row" style="border:none"><span>Question about price</span><span class="r">Routed</span></div>',"Comments","The system handles comments; questions route to the Sales Head."),
 C('<div class="note-warn">Comments and replies are handled by the platform.</div>',"Automatic replies","Replies are automatic."),]
mh_funnel=[C(hdr("","Funnel",("⌕",)),"Header","Search right."),
 C('<div class="chips"><span class="chip on">Per post</span><span class="chip">Per channel</span></div>',"View","Funnel per post or per channel."),
 C('<div class="lbl">Reel · Villa 4B</div><div class="row"><span>Leads</span><span class="r">25 · 100%</span></div><div class="row"><span>Meetings</span><span class="r">15 · 60%</span></div><div class="row" style="border:none"><span>Converted</span><span class="r">3 · 12%</span></div>',"Funnel steps","Leads, meetings and converted clients, with percentages at each step."),
 C('<div class="note-warn">Counts only. Lead names and contact details are not shown here.</div>',"Count only","No personal lead details on the funnel."),
 C(tabbar(MH_T,"Funnel"),"Tab bar","Funnel active."),]
mh_chan=[C(hdr("‹","Channel funnel",()),"Header","Back."),
 C('<div class="row"><span>Instagram</span><span class="r">[ ] leads</span></div><div class="row" style="border:none"><span>Facebook</span><span class="r">[ ] leads</span></div>',"Channels","Funnel for each channel."),
 C('<div class="inp">Date range · 1 Nov to 22 Nov</div>',"Date range","Change the date range."),]
mh_spend=[C(hdr("","Spend requests",()),"Header","Title only."),
 C('<div class="row"><span>Ads · Instagram · ₹ [ ]</span><span class="r">Approved</span></div><div class="row"><span>Shoot · ₹ [ ]</span><span class="r">Raised</span></div><div class="row" style="border:none"><span>Print · ₹ [ ]</span><span class="r">Paid</span></div>',"Requests and status","Status: raised, approved, declined, paid."),
 C('<div class="btn pri">New request</div>',"New request","Raise a request."),
 C(tabbar(MH_T,"Spend"),"Tab bar","Spend active."),]
mh_newreq=[C(hdr("‹","New spend request",()),"Header","Back."),
 C('<div class="inp">Amount · ₹ [ ]</div><div class="inp">Channel</div><div class="inp">Purpose</div>',"Fields","Amount, channel and purpose."),
 C('<div class="btn pri">Submit to MD</div>',"Submit","Goes to the MD for approval."),]
mh_pkg=[C(hdr("‹","Finished packages",()),"Header","Back."),
 C('<div class="row"><span>Villa 4B · final files and brief</span><span class="r">Received</span></div><div class="row" style="border:none"><span>Flat 7 · final files and brief</span><span class="r">Received</span></div>',"Packages","Finished packages from the MD."),
 C('<div class="note-warn">Final files and the brief only. No client details.</div>',"No client details","Packages carry no client details."),
 C('<div class="btn ghost">Download</div>',"Download","Download a package."),]
mh_settings=[C(hdr("‹","Settings",()),"Header","Back."),
 C('<div class="card"><div class="h2">Meera</div><div class="muted">Marketing Head · company email</div></div>',"Profile","Name, role, company email."),
 C('<div class="lbl">My pay</div><div class="row" style="border:none"><span>Payslips and receipts</span><span class="r">›</span></div>',"My pay","Own pay only. Marketing Head is on salary."),
 C('<div class="btn ghost" style="margin-top:auto">Log out</div>',"Log out, alone at the bottom","Set apart from other items."),]
MH1=("Marketing Head wireframes · 1 of 4 · Home, brand, content",
 "The Marketing Head sets the brand template, chooses content types and supervises the pipeline. The platform generates the content and chooses the AI model.",
 [col("Home","This week, pipeline counts, add own content.",mh_home),col("Brand template","Logo, colours, fonts; versions kept.",mh_brand),col("Content","Items and stages; hand leads on.",mh_content),col("Post","Channels, schedule, publish.",mh_post)])
MH2=("Marketing Head wireframes · 2 of 4 · Comments, funnel, channels",
 "Comments are handled by the platform. The funnel shows counts at each step for each post and channel, with no personal lead details.",
 [col("Comments","Automatic replies; questions routed.",mh_comments),col("Funnel","Per post, with percentages.",mh_funnel),col("Channel funnel","Per channel; date range.",mh_chan),col("Spend","Requests and their status.",mh_spend)])
MH3=("Marketing Head wireframes · 3 of 4 · Spend and packages",
 "Spend requests go to the MD and keep their status visible at every step. Finished packages arrive with no client details.",
 [col("New spend request","Amount, channel, purpose.",mh_newreq),col("Finished packages","Final files and brief only.",mh_pkg),col("Settings","Profile, own pay, log out.",mh_settings),col("Content detail","A post's copy and media.",[C(hdr("‹","Post copy",()),"Header","Back."),C('<div class="inp">Copy · edit</div><div class="inp">Media · replace</div>',"Edit","Edit copy and media before scheduling.")])])
MH4=("Marketing Head wireframes · 4 of 4 · Scheduling and results",
 "The schedule is adjusted from the Marketing Head's own dashboard, and results come back from each channel.",
 [col("Schedule","Adjust timing per channel.",[C(hdr("‹","Schedule",()),"Header","Back."),C('<div class="row"><span>Instagram · reels</span><span class="r">Daily</span></div><div class="row" style="border:none"><span>Facebook · carousels</span><span class="r">Weekly</span></div>',"Rhythm","Timing per channel."),C('<div class="btn ghost">Adjust timing</div>',"Adjust","Adjust timing and template.")]),
  col("Results","Post performance.",[C(hdr("","Results",()),"Header","Title only."),C('<div class="row"><span>Reel · Villa 4B</span><span class="r">25 leads</span></div>',"Result row","Leads per post."),]),
  col("Template change","Template versions.",[C(hdr("‹","Template versions",()),"Header","Back."),C('<div class="row"><span>v4 · current</span><span class="r">Restore</span></div><div class="row" style="border:none"><span>v3</span><span class="r">Restore</span></div>',"Versions","Restore any version."),]),
  col("Log scope","What the Marketing Head sees.",[C(hdr("‹","Log scope",()),"Header","Back."),C('<div class="row"><span>Own spend requests</span><span class="r">Visible</span></div><div class="row" style="border:none"><span>Client details</span><span class="r">Hidden</span></div>',"Log scope","What is visible in logs."),])])
RQ_MH1=("Requirements · home, brand, content",
 "The Marketing Head sets up the studio's brand and supervises the pipeline. The platform chooses the AI model.",
 [req_col("Home","The home shows posts scheduled this week, the leads passed on, the pipeline counts, and a way to add the Marketing Head's own content.",["Posts and leads this week","Pipeline counts","Add own content"],"Sitemap home-mh; spec §15."),
  req_col("Brand template","The brand template holds the logo, colours and fonts. It can be edited at any time, and every change is saved as a version that can be restored. Brand data belongs to the company.",["Logo, colours, fonts","Every change a version","Restore earlier version"],"Sitemap brand-template; spec on the marketing pipeline."),
  req_col("Content","The content pipeline runs from idea to published. The Marketing Head adds his own content and moves items on. Leads from the channels are filtered and passed to the Sales Head.",["Stages to published","Own content","Leads to Sales Head"],"Sitemap content-pipeline; spec on the marketing pipeline."),
  req_col("Post","The system generates posts from the brand template and schedules them across the chosen channels. The Marketing Head chooses channels and times, edits copy and media, and publishes or queues.",["Generated from template","Channels and times chosen","Edit before publish"],"Sitemap posts.")])
RQ_MH2=("Requirements · comments, funnel, channels, spend",
 "The funnel counts each step of a post or channel. It shows no personal lead details.",
 [req_col("Comments","The platform answers comments and replies automatically. Questions that need a person are routed to the Sales Head.",["Automatic replies","Questions routed"],"Spec §15 and the marketing pipeline; sitemap posts."),
  req_col("Funnel","The funnel shows leads, meetings and converted clients for each post, with the percentage at each step. The Marketing Head can open a step, but sees counts only, not the leads' names or contacts.",["Per post","Percentages each step","Counts only, no personal details"],"Sitemap funnel; decision recorded below."),
  req_col("Channel funnel","The same funnel is shown per channel, with a date range the Marketing Head can change.",["Per channel","Date range"],"Sitemap funnel."),
  req_col("Spend","Spend requests carry amount, channel and purpose. The MD approves them. The Marketing Head sees the status at every step: raised, approved, declined, paid.",["Amount, channel, purpose","Status each step","MD approves"],"Spec §9 (marketing spend); sitemap spend-requests.")])
RQ_MH3=("Requirements · spend, packages, settings",
 "Finished packages arrive with no client details, and settings hold the Marketing Head's own items.",
 [req_col("New spend request","A request carries amount, channel and purpose, and goes to the MD for approval.",["Amount, channel, purpose","MD approves"],"Sitemap spend-requests."),
  req_col("Finished packages","The Marketing Head receives finished project packages from the MD: final files and the brief, with no client details.",["Final files and brief","No client details"],"Spec §15 and decision v7 (marketing sees no client details); sitemap project-packages."),
  req_col("Settings","Settings holds the Marketing Head's profile and own pay. Logout sits alone at the bottom.",["Own pay only"],"Sitemap session."),
  req_col("Content detail","A post's copy and media can be edited before it is scheduled.",["Edit copy and media"],"Sitemap posts.")])
RQ_MH4=("Requirements · scheduling, results, versions, log scope",
 "The Marketing Head adjusts schedules and template versions, reads results, and sees only their own items in logs.",
 [req_col("Schedule","Timing is set per channel, and the Marketing Head can adjust timing and the template.",["Timing per channel","Adjust timing and template"],"Spec §15 (adjusts schedule and template)."),
  req_col("Results","Post performance shows the leads each post brings, from the returned channel data.",["Leads per post"],"Spec §15; sitemap posts."),
  req_col("Template versions","Each saved version can be restored, with the version history visible.",["Restore any version"],"Sitemap brand-template."),
  req_col("Log scope","The Marketing Head sees logs for their own spend requests and content. Client details are not visible.",["Own items only","Client details hidden"],"Sitemap log-scope; spec §15 and v7 decision.")])
MH_DECIDE=[
 ("Client details","Spec v7 and sitemap: Marketing Head sees only final files and brief, no client details.","No client details on packages. Funnel shows counts only, no lead names or contacts."),
 ("AI model","Spec and sitemap: platform chooses the model; Marketing Head does not choose it.","Not shown as a choice anywhere in this set."),
 ("Spend approval","Spec: MD approves marketing spend; Marketing Head sees full status.","As written."),
 ("Tab bar","Sitemap marketing screens: Home, Brand, Posts, Funnel, Spend.","Home, Content, Funnel, Spend, More. Brand sits under Home and the template is reached from the content screen."),
]
MH_CHECK=["No client details appear on packages or the funnel.","The platform chooses the AI model; no screen lets the Marketing Head choose it.","Every spend request shows status at each step, and the MD approves it.","Brand changes are kept as versions and can be restored.","No rupee figures are invented; placeholders only."]
build("mh_v1","First Light · Marketing Head wireframes","First Light · Marketing Head wireframes",
 "Four boards and four requirement pages. The Marketing Head sets the brand template, supervises the content pipeline and the posts, reads the funnel per post and channel with no personal lead details, raises spend requests the MD approves, and receives finished project packages with no client details.",
 "sitemap pages for the Marketing Head, the access matrix and the specification's Marketing Head powers (section 15 and marketing decisions).",
 MH_T,[MH1,MH2,MH3,MH4],[RQ_MH1,RQ_MH2,RQ_MH3,RQ_MH4],MH_DECIDE,MH_CHECK,"mh")
