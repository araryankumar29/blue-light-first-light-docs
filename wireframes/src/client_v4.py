import sys; sys.path.insert(0, "/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf")
from kit import *
T = ["Home","Projects","Meetings","Messages","Catalogue"]
def C(h,t,d): return (h,t,d)
def WN(t): return f'<div class="note-warn">{t}</div>'

# ---------- BOARD 1 ----------
signin = [
 C('<div style="text-align:center;padding-top:6px"><div class="h1" style="font-size:17px">HOMESIC</div><div class="muted">First Light · client</div></div>',
   "Wordmark", "Company wordmark, centred, top of screen. No address, no tagline."),
 C('<div><div class="h1">Sign in with WhatsApp</div><div class="muted" style="margin-top:4px">We send a six-digit code to the number on your enquiry.</div></div>',
   "Heading and reason", "One line. States the rule: the number must match the one on the lead."),
 C('<div class="inp">+91 · number on your enquiry</div>',
   "Mobile number", "Must match the lead number. A different number shows: 'This number is not on your enquiry. Call the office.'"),
 C('<div class="btn pri">Send code</div>', "Send one-time code", "Sends the code from the company WhatsApp number. Disabled until the number is complete."),
 C('<div style="display:flex;gap:5px;justify-content:center">'+''.join('<span class="inp" style="width:26px;justify-content:center">%s</span>'%x for x in ["4","2","","","",""])+'</div><div class="muted" style="text-align:center;margin-top:4px">Resend available in 0:30</div>',
   "Six-digit code", "Boxes advance automatically. Resend unlocks after 30 seconds. OTP is required before the token payment and the invoice."),
 C('<div class="inp">Email (optional)</div><div class="muted">Asked after the code. You can skip it.</div>',
   "Optional email", "Asked after OTP. Skippable. Stored as empty if skipped."),
 C('<div class="row" style="border:none"><span style="display:flex;gap:6px;align-items:center"><span style="width:12px;height:12px;border:1px solid #777;border-radius:3px"></span>I agree to the Terms and Conditions</span></div>',
   "Terms agreement, every login", "Ticked on every sign-in, not once. Links to the Terms page. Records the version agreed and the time."),
 C('<div class="btn ghost">Continue with Google</div><div class="muted" style="margin-top:4px">Google still asks for the mobile number and OTP.</div>',
   "Alternative sign-in", "Optional link. The mobile and OTP step is never skipped, so every account has a verified number."),
]
home = [
 C(hdr("", "Ms. Rao · Villa 4B", ("₹","⚙")),
   "Header", "Logo left, client name centre, payment icon and settings icon right. Hides on scroll-down, returns on scroll-up."),
 C('<div class="img" style="height:120px"><span>Hero · pinned render (designer pins) · also the project avatar</span></div><div class="h2" style="margin-top:4px">Villa 4B · living and kitchen</div>',
   "Project hero", "Pinned render, or an upload. Tapping opens the project. The pinned image also sets the project avatar."),
 C('<div class="card" style="display:flex;justify-content:space-between;align-items:center"><div><div class="muted">Need help?</div><div class="h2" style="font-size:10px">Reach out to Neha, your sales representative</div></div><div class="btn ghost" style="height:24px;width:52px;font-size:8px">Call</div></div>',
   "Help line", "Names the assigned sales representative (decision, 22 Nov). 'Call the office' is kept on Messages as a second call option."),
 C('<div class="lbl">References<b>View more</b></div><div class="hrow"><div class="hcard"><div class="img" style="height:56px"><span>image</span></div><div class="t">Wardrobe, oak</div><div class="s">For this project</div></div><div class="hcard"><div class="img" style="height:56px"><span>image</span></div><div class="t">Sliding door</div><div class="s">For this project</div></div></div>',
   "References row", "Only ideas tied to this project. View more opens keyword chips and a search bar."),
 C('<div class="lbl">Catalogue<b>Browse</b></div><div class="hrow"><div class="hcard" style="flex-basis:96px"><div class="img" style="height:44px"><span>image</span></div><div class="t">Kitchens</div></div><div class="hcard" style="flex-basis:96px"><div class="img" style="height:44px"><span>image</span></div><div class="t">Wardrobes</div></div><div class="hcard" style="flex-basis:96px"><div class="img" style="height:44px"><span>image</span></div><div class="t">Doors</div></div></div>',
   "Catalogue row", "Horizontal, sized close to the stage cards. Tap opens the catalogue entry panel."),
 C('<div class="lbl">Your team</div><div class="avs"><div class="av"><i></i>Neha</div><div class="av"><i></i>Arjun</div><div class="av"><i></i>Meera</div><div class="av"><i></i>+2</div></div>',
   "Team profile images", "Tap opens the person's bio, projects and details."),
 C('<div class="card"><div class="muted">"They kept every date we were promised."</div><div class="muted" style="margin-top:3px">Ms. Rao · Villa 4B · kitchen</div></div>',
   "Testimonial", "One at a time. Doubles as a showcase of past projects."),
 C('<div class="lbl">How you pay · 4 steps</div><div style="display:flex;gap:4px"><div class="card" style="flex:1;padding:5px;text-align:center"><div class="h2">10%</div><div class="muted" style="font-size:7.5px">Token</div></div><div class="card" style="flex:1;padding:5px;text-align:center"><div class="h2">50%</div><div class="muted" style="font-size:7.5px">Mid</div></div><div class="card" style="flex:1;padding:5px;text-align:center"><div class="h2">35%</div><div class="muted" style="font-size:7.5px">Install</div></div><div class="card" style="flex:1;padding:5px;text-align:center"><div class="h2">5%</div><div class="muted" style="font-size:7.5px">Final</div></div></div>',
   "Payment procedure summary", "Four steps, 10 / 50 / 35 / 5, from the schedule for this project. Full detail is on Payments."),
 C(tabbar(T,"Home"), "Tab bar", "Home, Projects, Meetings, Messages, Catalogue. Decision of 22 Nov. The sitemap's client bar is not used."),
]
project = [
 C(hdr("‹", "Villa 4B", ("⚙",)), "Header with back", "Back to Home. Project name centre. Settings icon right."),
 C('<div style="display:flex;gap:9px;align-items:center"><div class="img" style="width:50px;height:50px;border-radius:12px"><span>avatar</span></div><div><div class="h2">Living and kitchen</div><div class="muted">Stage 6 of 14 · Design</div><div class="muted">9 days left in this stage</div></div></div>',
   "Project identity", "Stage in words plus one traffic-light dot. Client pauses are never yellow or red; they read Paused by client."),
 C('<div class="lbl">Stages<b>Scroll</b></div><div class="hrow"><div class="stg past"><span>Stage 5</span><span>✓ done</span></div><div class="stg now"><span>Stage 6</span><span>You are here</span></div><div class="stg fut"><span>Stage 7</span><span>Next</span></div></div>',
   "Stage row", "Opens scrolled to the current stage. Past: outline and tick. Current: filled. Future: dashed. Stage names come from the tenant's stage list."),
 C('<div class="card" style="background:#f6f6f5"><div class="h2" style="font-size:10px">What happens now</div><div class="muted" style="margin-top:3px">The studio is finishing the design. We send the final render and quotation for your approval.</div></div>',
   "Stage detail strip", "Changes when a stage card is tapped. One plain sentence on what the studio does and what the client does."),
 C('<div class="card" style="display:flex;justify-content:space-between;align-items:center"><div><div class="muted">Next meeting</div><div class="h2" style="font-size:10px">Tue 24 Nov · 11:00</div></div><div class="btn ghost" style="height:24px;width:60px;font-size:8px">Open</div></div>',
   "Next meeting", "Date and time. Opens the meeting view on Meetings."),
 C('<div class="card" style="display:flex;justify-content:space-between;align-items:center"><div><div class="muted">Payments</div><div class="h2" style="font-size:10px">Next due 14 Dec</div></div><div class="btn ghost" style="height:24px;width:60px;font-size:8px">View</div></div>',
   "Payment summary", "Shows the next due date. Amount and actions are on Payments. Money never appears without a due date."),
 C('<div class="lbl">Designs<b>View all</b></div><div style="display:flex;gap:6px"><div class="img" style="flex:1;height:58px"><span>render</span></div><div class="img" style="flex:1;height:58px"><span>render</span></div></div>',
   "Designs preview", "Two latest approved renders. View all opens the gallery. Unapproved files never appear."),
 C('<div class="lbl">Files</div><div class="row"><span>Quotation · v5</span><span class="r">PDF</span></div><div class="row" style="border:none"><span>Technical drawing · v5</span><span class="r">PDF</span></div>',
   "Files list", "Current approved files, each under its own name with its version. Older versions open from View previous files."),
 C(tabbar(T,"Projects"), "Tab bar", "Projects active."),
]
stage_sheet = [
 C('<div><div class="h2">Stage 6 · Design</div><div class="muted">Started 2 Nov · 9 days left</div></div>', "Stage name and dates", "Name, start date and days left. Source: stage timer."),
 C('<div class="img" style="height:70px"><span>one line illustration · same style for every stage</span></div>', "Illustration", "One simple drawing per stage, in the same style for all stages. Placeholder until supplied."),
 C('<div class="card" style="padding:6px 8px"><div class="muted">What we need from you</div><div class="h2" style="font-size:9.5px">Review the render and tell us what to change.</div></div>', "What the client must do", "One sentence on the client's action, or: Nothing from you right now."),
]

# ---------- BOARD 2 ----------
payments = [
 C(hdr("‹", "Payments", ("⚙",)), "Header", "Back to Project. Same header as Home."),
 C('<div class="card"><div class="muted">You owe now</div><div class="h1" style="font-size:20px">₹ 1,40,000</div><div class="muted">Due <b style="color:#1b1b1b">14 Dec</b> · remaining balance ₹ 1,60,000</div></div>',
   "Owed now and due date", "The amount due now with its due date, then the remaining balance. Never an amount without a date."),
 C('<div class="card" style="border:1.5px solid #2b2b2b"><div class="lbl">Next payment<b>Due 14 Dec</b></div><div class="h2" style="margin-top:3px">Installation · 35%</div><div class="muted">[condition from the payment schedule]</div></div>',
   "Next payment card", "Stage, percentage, due date. Only this card carries the highlight."),
 C('<div style="display:flex;justify-content:space-between"><span class="ico">Invoice</span><span class="ico">Quotation</span><span class="ico">Receipts</span><span class="ico">Schedule</span></div><div class="muted" style="margin-top:3px">Four icons, decided: Invoice, Quotation, Receipts, Schedule.</div>',
   "Document icons", "Invoice opens a PDF pop-up. Quotation opens the current quotation and zooms. Receipts lists confirmed payments. Schedule opens the four-stage split."),
 C('<div class="btn pri">Pay now</div>', "Pay now", "Opens the QR sheet. Pay by UPI using the QR or the payee details."),
 C('<div class="btn ghost">Submit proof</div>', "Submit proof", "Opens the screenshot upload. The client uploads in the app; it goes straight to the MD. The design partner sees status and does not forward files."),
 C('<div class="lbl">Schedule<b>All payments</b></div><div class="row"><span>Token 10%</span><span class="r">Paid · receipt</span></div><div class="row"><span>Mid 50%</span><span class="r">Paid · receipt</span></div><div class="row" style="border:none"><span>Installation 35%</span><span class="r">14 Dec</span></div>',
   "Schedule list", "Four stages: 10 / 50 / 35 / 5. Paid rows link to their receipt; upcoming rows show their due date."),
 C('<div class="row" style="border:none"><span>Final 5% · after handover</span><span class="r">Receipts</span></div>', "Receipts and balance", "Each confirmed payment has a receipt showing the amount received and the balance left."),
 C(tabbar(T,"Projects"), "Tab bar", "Payments is opened from the header, so no tab is highlighted."),
]
paysheet = [
 C('<div class="h2">Pay ₹ 1,40,000 · Installation 35%</div><div class="muted">Due 14 Dec</div>', "Amount and due date", "Both shown together, every time."),
 C('<div class="qr"></div><div class="muted" style="text-align:center">Scan with any UPI app, or download the QR.</div>', "QR code", "Downloadable and scannable. Company QR for the project's payment account."),
 C('<div class="card" style="padding:6px 8px"><div class="muted">Pay to</div><div class="h2" style="font-size:9.5px">HOMESIC</div></div>', "Payee details", "Payee HOMESIC, UPI reference. Resolved: HOMESIC, as in the logo and the decision."),
 C('<div class="btn pri">I have paid · submit proof</div>', "Next step", "Moves to the proof upload."),
]
proof = [
 C(hdr("‹", "Submit proof", ()), "Header", "Back to Payments."),
 C('<div class="h1" style="font-size:14px">Send your payment screenshot</div><div class="muted">We check it and confirm here and in WhatsApp.</div>', "Heading and reason", "One line on the next step."),
 C('<div class="img" style="height:190px;border:1.5px dashed #9a9a9a;background:#f2f2f1"><span>tap to add screenshot · one image</span></div>', "Screenshot picker", "One image, JPG or PNG."),
 C('<div class="card" style="padding:6px 8px"><div class="muted">Amount paid · date</div><div class="h2">₹ 1,40,000 · 14 Dec</div></div>', "Amount and date", "Client confirms the amount they paid. Pre-filled from the next payment."),
 C('<div class="btn pri">Send for confirmation</div>', "Send", "Disabled until a screenshot is attached."),
 C('<div class="card" style="background:#f6f6f5"><div class="h2" style="font-size:10px">Waiting for confirmation</div><div class="muted">States: waiting · confirmed · rejected (with reason, resend).</div></div>', "Status", "Shows the state until the MD confirms. Confirmed triggers the receipt."),
]
messages = [
 C(hdr("", "Messages", ()), "Header", "Title only."),
 C('<div class="lbl">Your team</div><div style="display:flex;gap:8px"><div class="card" style="flex:1;padding:6px"><div class="h2" style="font-size:9px">Design partner</div><div class="muted">Arjun</div><div class="btn ghost" style="height:20px;font-size:7.5px;margin-top:3px">Call</div></div><div class="card" style="flex:1;padding:6px"><div class="h2" style="font-size:9px">Production manager</div><div class="muted">Imran</div><div class="btn ghost" style="height:20px;font-size:7.5px;margin-top:3px">Call</div></div></div>',
   "Team contacts", "Design partner and production manager, each with Call. Sits above the WhatsApp window."),
 C('<div class="btn ghost">Ask them to call you</div><div class="chips"><span class="chip on">1 to 3 hours</span><span class="chip">3 to 6 hours</span><span class="chip">Within a day</span></div>', "Ask them to call you", "Time slots: 1 to 3 hours, 3 to 6 hours, within a day."),
 C('<div class="card"><div class="lbl">Next meeting<b>Change time</b></div><div class="h2" style="font-size:10px;margin-top:3px">Tue 24 Nov · 11:00 · Google Meet</div><div class="muted">Arjun, Imran and you</div></div>', "Meeting card", "Shows time, link and everyone tagged. Change time opens the sheet."),
 C('<div class="note-warn">Not yet in the project group. Messages go to your number. Join the group with the invitation link.</div>', "Join state", "Shown until the client joins the project group. Invitation sent in an approved template."),
 C('<div style="display:flex;flex-direction:column;gap:5px"><div class="bub">Drawings for the kitchen are up. Please review.</div><div class="bub me">Looks good. Can we move the sink?</div></div>', "Project WhatsApp window", "Once joined: the project group thread, sent through the company number."),
 C('<div class="inp">Write a message…</div>', "Message input", "Sends into the group or to the client's number, depending on the join state."),
 C(tabbar(T,"Messages"), "Tab bar", "Messages active."),
]
meetsheet = [
 C('<div class="h2">Change meeting time</div><div class="inp">New date · 25 Nov</div><div class="inp">New time · 15:00</div>', "New date and time", "Two fields. The request goes to everyone tagged."),
 C('<div class="muted">Everyone tagged must confirm before the new time is final. Status: waiting for 2 of 3.</div>', "Approval rule", "Each tagged person confirms. The client gets a confirmation notice when the time is final."),
 C('<div class="btn pri">Send request</div>', "Send request", "Creates the pending request."),
]

# ---------- BOARD 3 ----------
catalogue = [
 C(hdr("", "Catalogue", ("⌕",)), "Header", "Search on the right, title centre."),
 C('<div class="inp">Search kitchens, wardrobes, doors…</div>', "Search", "Full-catalogue search. Opened from Home or the bottom bar."),
 C('<div class="chips"><span class="chip on">All</span><span class="chip">Kitchen</span><span class="chip">Wardrobe</span><span class="chip">Doors</span></div>', "Keyword chips", "One active at a time. Built from the catalogue's tags."),
 C('<div class="lbl">Residential<b>Scroll</b></div><div class="hrow"><div class="hcard" style="flex-basis:118px"><div class="img" style="height:70px"><span>image</span></div><div class="t">Modular kitchen</div><div class="s">[material note]</div></div><div class="hcard" style="flex-basis:118px"><div class="img" style="height:70px"><span>image</span></div><div class="t">Walk-in wardrobe</div><div class="s">[material note]</div></div></div>', "Horizontal row", "Decent-sized cards in a row, one row per section. Not an endless list."),
 C('<div class="lbl">Kitchens<b>Scroll</b></div><div class="hrow"><div class="hcard" style="flex-basis:118px"><div class="img" style="height:70px"><span>image</span></div><div class="t">L-shape</div><div class="s">[material note]</div></div><div class="hcard" style="flex-basis:118px"><div class="img" style="height:70px"><span>image</span></div><div class="t">Island</div><div class="s">[material note]</div></div></div>', "Next section", "Each section is its own row, fed from the catalogue library."),
 C(tabbar(T,"Catalogue"), "Tab bar", "Catalogue active."),
]
entry_sheet = [
 C('<div class="img" style="height:110px"><span>image · full width · full-screen icon top right</span></div>', "Image and full-screen", "Large image. The full-screen icon opens it full screen."),
 C('<div class="h2">Modular kitchen, L-shape</div><div class="muted">[production lead time from catalogue]</div>', "Title and lead time", "Lead time is a placeholder until the catalogue supplies it."),
 C('<div style="display:flex;gap:8px"><div class="btn ghost" style="flex:1">WhatsApp</div><div class="btn ghost" style="flex:1">Share</div></div>', "WhatsApp and Share", "Open to anyone, including people not yet registered. An idea sent by an unregistered person goes to sales as a lead."),
]
designs = [
 C(hdr("‹", "Designs", ("↓",)), "Header", "Back to Project. Download the current set."),
 C('<div class="lbl">Version 5 · current</div><div style="display:grid;grid-template-columns:1.4fr 1fr;gap:5px"><div class="img" style="height:124px;grid-row:span 2"><span>render 1 · large</span></div><div class="img" style="height:60px"><span>render 2</span></div><div class="img" style="height:60px"><span>render 3</span></div><div class="img" style="height:60px;grid-column:span 2"><span>render 4 · wide</span></div></div>', "Renders grid", "Mixed sizes. Each opens and downloads. Only approved renders."),
 C('<div class="lbl">History</div><div style="display:flex;gap:4px"><span class="chip on" style="padding:2px 6px">V5</span><span class="chip" style="padding:2px 6px">V4</span><span class="chip" style="padding:2px 6px">V3</span><span class="chip" style="padding:2px 6px">V2</span><span class="chip" style="padding:2px 6px">V1</span></div>', "Version chips", "Small chips, newest first. Each chip opens that version's set, view-only, with its date."),
 C(tabbar(T,"Projects"), "Tab bar", "Designs opens from the project, so Projects is active."),
]
settings = [
 C(hdr("‹", "Settings", ()), "Header", "Back. Opened from the header settings icon."),
 C('<div class="card"><div class="h2">Ms. Rao</div><div class="muted">+91 98xxx xxxxx · verified</div><div class="row" style="border:none;padding:4px 0 0"><span>Email</span><span class="r">Add (optional)</span></div></div>', "Profile", "Name, verified WhatsApp number, optional email."),
 C('<div class="lbl">Devices and sessions</div><div class="row"><span>Chrome · Mumbai</span><span class="r">This device</span></div><div class="row" style="border:none"><span>iPhone · Pune</span><span class="r">Sign out</span></div>', "Devices and sessions", "Signed-in devices. Sign out one at a time."),
 C('<div class="row" style="border-top:1px solid #e6e6e4"><span>Terms and conditions</span><span class="r">›</span></div>', "Terms", "Opens the Terms page, any time, with the version agreed at sign-in."),
 C('<div class="btn ghost" style="margin-top:auto">Log out</div>', "Log out, alone at the bottom", "Set apart so it is not tapped by mistake. No notification switches on this page."),
 C(tabbar(T,"Home"), "Tab bar", "Settings opens from the header, so no tab is highlighted."),
]

# ---------- BOARD 4 ----------
public = [
 C('<div style="display:flex;justify-content:space-between;align-items:center"><span class="h2">HOMESIC</span><span class="btn ghost" style="height:22px;width:58px;font-size:7.5px">Log in</span></div>', "Public header", "Logo and log in. Visible to anyone."),
 C('<div class="img" style="height:170px;background:#dedede"><span>3D object · hover turns it · sculpture or fountain</span></div>', "Hero showpiece", "A 3D object at the studio entrance. Hover turns it to show facets of the company. Placeholder until the 3D asset exists."),
 C('<div class="h1" style="font-size:13px">Your home, designed and built without the running around.</div><div class="muted">Quotation, payment and handover, on your phone and in Google Meet.</div>', "Headline", "One sentence, plain. States what is hassle-free. Copy to be approved."),
 C('<div class="lbl">How we work</div><div style="display:flex;gap:4px"><div class="card" style="flex:1;padding:5px;text-align:center"><div class="muted" style="font-size:7.5px">Quote</div></div><div class="card" style="flex:1;padding:5px;text-align:center"><div class="muted" style="font-size:7.5px">Pay</div></div><div class="card" style="flex:1;padding:5px;text-align:center"><div class="muted" style="font-size:7.5px">Hand over</div></div></div>', "How we work, few stages", "A short layer, not all 14 stages. Persuasive, not technical."),
 C('<div class="lbl">Start here</div><div class="btn pri">Book a call</div><div class="btn ghost">Visit the studio</div><div class="btn ghost">Try my budget</div>', "Reception choices", "Three choices: book a call or online meeting, visit the studio, or try a budget while waiting (estimator comes later)."),
 C('<div class="lbl">Gallery · buffet</div><div class="hrow"><div class="hcard" style="flex-basis:100px"><div class="img" style="height:50px"><span>work</span></div><div class="t">Residential</div></div><div class="hcard" style="flex-basis:100px"><div class="img" style="height:50px"><span>work</span></div><div class="t">Kitchens</div></div></div>', "Gallery row", "Works spread out, not a forced path. Each opens a catalogue entry panel."),
 C('<div class="note-warn">Enter the studio · designer entrance (client side of the software). Entering here never assigns a staff role.</div>', "Designer entrance", "Clearly placed below the hero. Labelled for the client side only."),
 C('<div class="inp">Your WhatsApp number</div><div class="btn pri">Get in touch</div>', "Lead capture", "Leaving a number anywhere creates a lead. Multiple entries from one number are grouped for sales."),
]
team = [
 C(hdr("‹", "Team", ()), "Header", "Back to Home."),
 C('<div style="display:flex;gap:10px;align-items:center"><div class="img" style="width:64px;height:64px;border-radius:50%"><span>photo</span></div><div><div class="h2">Arjun</div><div class="muted">Design partner</div></div></div>', "Profile identity", "Photo, name and role. Photo uploaded by the studio."),
 C('<div class="card"><div class="lbl">Bio</div><div class="muted">[short bio supplied by the team member]</div></div>', "Bio", "Written by the person, reviewed by the studio."),
 C('<div class="lbl">Projects</div><div class="row"><span>Villa 4B · this project</span><span class="r">Current</span></div><div class="row" style="border:none"><span>[past project]</span><span class="r">[year]</span></div>', "Projects", "This project first, then past work with the year."),
 C('<div class="card"><div class="muted">"[testimonial for this person]"</div><div class="muted" style="margin-top:3px">[client name · project]</div></div>', "Testimonials", "Client testimonials that name this person."),
 C(tabbar(T,"Home"), "Tab bar", "Opened from Home, so no tab is highlighted."),
]
meetings = [
 C(hdr("", "Meetings", ()), "Header", "Title only."),
 C('<div class="card"><div class="lbl">Next · Tue 24 Nov, 11:00</div><div class="h2" style="font-size:10px;margin-top:3px">Google Meet · link on your phone</div><div class="muted">Arjun, Imran, you</div><div class="btn pri" style="margin-top:5px;height:26px;font-size:8.5px">Join</div></div>', "Next meeting", "Link, time and everyone tagged. Join opens Google Meet."),
 C('<div class="btn ghost">Request a new time</div>', "Request change", "Opens the change sheet on Messages. Everyone tagged must confirm."),
 C('<div class="lbl">Past</div><div class="row"><span>Site visit · 12 Nov</span><span class="r">Done</span></div><div class="row" style="border:none"><span>Survey · 4 Nov</span><span class="r">Done</span></div>', "Past meetings", "Completed meetings only, with their dates."),
 C(tabbar(T,"Meetings"), "Tab bar", "Meetings active."),
]
terms = [
 C(hdr("‹", "Terms", ()), "Header", "Back. Opened from sign-in or Settings."),
 C('<div class="h2">Terms and conditions</div><div class="muted">Version [x] · effective [date]</div>', "Title and version", "Version and date. The version agreed at sign-in is stored with each client."),
 C('<div class="card"><div class="muted">[Full terms text. To be drafted and approved. Not written yet.]</div></div>', "Terms text", "Full text, scrollable. Wording is not drafted and is not part of this pass."),
 C('<div class="btn pri">I agree</div>', "Agree", "Shown when opened from sign-in. Hidden when opened from Settings."),
]

def board_cols(cols): return cols

B1 = board("Client wireframes · 1 of 4 · Entry, Home, Project",
 "Standardized components: header, hero, cards, rows, tab bar. Numbers match the guide under each phone. Sheets are numbered on the phone too.",
 [col("Sign-in","WhatsApp and OTP. Number must match the lead.", signin),
  col("Home","Front desk. Hero is the project. Four-step payment summary.", home),
  col("Project","Stage row opens at the current stage.", project),
  col("Stage detail","Pop-up sheet over Project.", project[:1]+[C('<div class="muted">Project screen, dimmed.</div>',"Background","Project behind the sheet.")], sheet=stage_sheet)])
B2 = board("Client wireframes · 2 of 4 · Money and messages",
 "Payments show what is owed, when, and how to pay. Messages show the team, calls, the meeting and the group's join state.",
 [col("Payments","Owed now, next due, actions, schedule, receipts.", payments),
  col("Pay now","QR sheet over Payments.", payments[:1]+[C('<div class="muted">Payments, dimmed.</div>',"Background","Payments behind the sheet.")], sheet=paysheet),
  col("Submit proof","Screenshot to confirm. Status until confirmed.", proof),
  col("Messages","Team, calls, meeting, group. Change time sheet below.", messages, sheet=meetsheet)])
B3 = board("Client wireframes · 3 of 4 · Discover, designs, settings",
 "Catalogue is the browsing library. The entry panel holds the share actions. Designs show approved versions by chip. Settings are kept short.",
 [col("Catalogue","Search, chips and horizontal sections.", catalogue),
  col("Catalogue entry","Panel over the catalogue.", catalogue[:1]+[C('<div class="muted">Catalogue behind the panel.</div>',"Background","Catalogue visible under the panel.")], sheet=entry_sheet),
  col("Designs","Mixed grid of approved renders, with version chips.", designs),
  col("Settings","Profile, devices, terms, log out.", settings)])
B4 = board("Client wireframes · 4 of 4 · Public site, team, meetings, terms",
 "Screens not on the first three boards: the public site before login, the team profile, the meetings page and the Terms page.",
 [col("Public site","Hero showpiece, reception choices, gallery, designer entrance.", public),
  col("Team profile","Opened from the team row on Home.", team),
  col("Meetings","Next meeting and past meetings.", meetings),
  col("Terms","Full text and version. Agree at sign-in.", terms)])

# ---------- REQUIREMENTS ----------
R1 = req_board("Requirements · entry, home, project",
 "What each screen must do, why, and where the rule comes from. Read with the board opposite; the columns line up.",
 [req_col("Sign-in",
  "A client signs in with the WhatsApp number on their enquiry. The company WhatsApp number sends a six-digit code. The number must match the lead, so a stranger cannot take over an enquiry. Email is optional and asked after the code; it can be skipped. Google can be linked, but it still asks for the mobile number and an OTP, so every account has a verified number. The Terms tick appears on every sign-in and is stored with its version and time. Staff never use this screen.",
  ["Number must match the lead; mismatch goes to the office","OTP is required before the token payment and invoice","Nobody signs in on a client's behalf","The client is never required to use the portal"],
  "Sitemap signin-client (Spec §22.2). Registered 22 Nov: email optional, Terms on every login."),
  req_col("Home",
  "Home is the front desk for one project. It should tell the client the studio is working and what they can do next, in one screen. The hero is the pinned render chosen by the design team, and it also sets the project avatar. A single help line names the assigned sales representative. Sitemap says 'Call the office'; the decision says the representative's name. Both are kept until settled. References show only ideas linked to this project. The lower part holds the catalogue row, team, testimonials and the four-step payment summary. Home shows no amount without its due date.",
  ["Only approved files appear","Hero is pinned by the designer","No amount without a due date","Payment summary has four steps: 10 / 50 / 35 / 5"],
  "Sitemap home-cl (Mobile §7). Registered 22 Nov: hero, references, catalogue row, team, testimonials, payment summary."),
  req_col("Project",
  "The Project page shows where the work is. The stage row opens at the current stage, never at the first one. Each stage carries a traffic light with a word: green on time, yellow or red when late (red past 125% of planned time). A client-caused pause reads Paused by client and is never yellow or red. The page also shows the next meeting, the next due payment, two approved renders with View all, and the current approved files. Stage names come from the tenant's list; the numbers shown here are placeholders.",
  ["Stage row scrolls to the current stage on open","Client pause is never yellow or red","Files pinned first; only approved versions","One primary action per screen"],
  "Sitemap portal-home, stage-timeline, paused (Spec §6, §21.2). Registered 22 Nov: stage cards and detail strip."),
  req_col("Stage detail",
  "A tapped stage opens a short sheet near the card, not a new page. It names the stage and its dates, shows one simple illustration in the same style as every other stage, and says in one sentence what the client must do. If nothing is needed from the client, it says so. Internal notes, costs and staff notes never appear here.",
  ["Pop-up near the card, not a page","One illustration per stage, same style","Client action in one sentence, or 'nothing from you'"],
  "Registered 22 Nov (stage detail sheet). Illustrations are not yet supplied."),
 ])
R2 = req_board("Requirements · money and messages",
 "Payments are the most sensitive screens. Money is always shown with its due date, and only the MD confirms a payment.",
 [req_col("Payments",
  "Payments states what is owed and when, in one place. The top shows the amount due now with its due date and the balance left. The next payment card carries the only highlight. The schedule is 10, 50, 35 and 5 per cent of the latest accepted quotation, set by the MD for each project. Confirmed payments show a receipt with the amount received and the balance left. Receipts and Schedule fill the other two icons. The sitemap already lists receipts and the payment schedule as client pages.",
  ["No amount without a due date","Payment is confirmed only by the MD, never by the app","Receipt sent on confirmation","Company-wide schedule changes apply to new projects only"],
  "Sitemap portal-payments, split, receipt (Spec §9). Registered 22 Nov: owed, next, icons, Pay now."),
  req_col("Pay now",
  "Pay now shows a QR code that can be downloaded or scanned in any UPI app, with the payee and the reference beside it. The sitemap says Pay by UPI; the QR is the way to do that. The client then moves to submitting proof. The payee is HOMESIC, the spelling in the logo and the decision. HOMSIC in some documents is treated as a typo to correct.",
  ["Amount shown with its due date","Payee HOMESIC","Next step: submit proof"],
  "Sitemap portal-payments (Pay by UPI), payment-request. Registered 22 Nov: QR code."),
  req_col("Submit proof",
  "The client attaches one screenshot, confirms the amount and date, and sends it. The stage waits until the MD confirms. The client sees the state at all times: waiting, confirmed, or rejected with a reason and a resend route. On confirmation the update is posted to the project group and shown across the app.",
  ["One image, JPG or PNG","Stage held until the MD confirms","Rejected: reason shown, client resends","Confirmed: receipt and WhatsApp notice"],
  "Sitemap proof, payment-resubmit (Spec §9, §26.1). Resolved: the in-app route follows the 22 Nov decision. The sitemap step where the design partner forwards proof by hand is dropped, because the sitemap itself says nobody copies files across by hand."),
  req_col("Messages",
  "Messages is the single place to speak to the team. Above the WhatsApp window, the design partner and production manager each have a call option, and Ask them to call you offers time slots: 1 to 3 hours, 3 to 6 hours, or within a day. Until the client joins the project group, messages go to their own number; the join uses an invitation link sent in an approved template, because Meta does not allow adding participants directly. The meeting card shows the next meeting. A change request is final only when everyone tagged confirms.",
  ["Join state shown until the client joins the group","Invitation link is the only route in","Meeting change needs every tagged person to confirm"],
  "Sitemap portal-messages, group-invite, meeting-link (Spec §26.4, §26.11, §26.13). Registered 22 Nov: contacts, call slots, change request."),
  req_col("Change time",
  "Change time asks for a new date and time. The request goes to everyone tagged in the meeting. The status shows how many have confirmed. The client receives a confirmation notice when the new time is final.",
  ["Everyone tagged confirms","Status shows waiting for N of M","Confirmation notice to the client"],
  "Registered 22 Nov (meeting change). Sitemap meeting-reminder, meeting-link for the link and reminder rules."),
 ])
R3 = req_board("Requirements · discover, designs, settings",
 "Browsing and the file history. Every version is kept; the client sees only what is approved.",
 [req_col("Catalogue",
  "The catalogue is the full design library. It has search, keyword chips and horizontal sections, not an endless list. Sections are rows sized like the stage cards. It is reached from the bottom bar, or from search on Home. The sitemap has no client catalogue page, so this is a new screen from the 22 November decisions.",
  ["Horizontal rows, one per section","Search and chips always visible","Tap opens the entry panel"],
  "Registered 22 Nov. Not in the sitemap; a gap to add."),
  req_col("Catalogue entry",
  "The entry opens as a panel over the catalogue, with a full-screen icon. WhatsApp and Share are available to everyone, including people not yet registered. An idea sent over WhatsApp by an unregistered person goes to sales as a lead. The lead time is a placeholder until the catalogue supplies it.",
  ["Panel, not a new page","Share open to everyone","Unregistered share becomes a lead"],
  "Registered 22 Nov (catalogue entry; lead grouping rule)."),
  req_col("Designs",
  "Renders show in a mixed grid, large and small, each opening and downloading. Every new round gives all its documents the same version number: renders, quotation, invoice and DN PDF all move to version 5 together, each keeping its own name. Older versions are shown as small chips, newest first, and open view-only with their date. Rejected versions stay with the team and are not shown here.",
  ["Approved versions only","One version number per round","Older versions view-only, dated","Rejected versions never shown to the client"],
  "Sitemap versions, pinned, portal-files (Spec §21.1). Registered 22 Nov: version rule and history chips."),
  req_col("Settings",
  "Settings is kept to what a client needs: profile (name, verified WhatsApp number, optional email), devices and sessions with sign-out, and the Terms. Log out sits alone at the bottom. There are no on or off switches for WhatsApp, payment or meeting messages, because those carry the project's record and stay on for every client. The sitemap has no client settings page, so this is a new screen.",
  ["No notification switches","Terms viewable any time","Log out set apart at the bottom"],
  "Registered 22 Nov. Sitemap has no client settings page; a gap to add."),
 ])
R4 = req_board("Requirements · public site, team, meetings, terms",
 "The four screens that complete the client's path, from first visit to the Terms.",
 [req_col("Public site",
  "The public front door is for anyone. The hero is a 3D object at the studio entrance that turns on hover to show facets of the company. Scrolling brings the reception: the story, testimonials and the choice of booking a call, visiting the studio or trying a budget. A short how-we-work layer shows a few stages, not all fourteen. The designer entrance sits below the hero and is labelled for the client side; entering there never assigns a staff role. Leaving a number anywhere creates a lead.",
  ["Entrance is for clients only","No staff role from this entrance","Lead created from any number entry"],
  "Registered 22 Nov. Not in the sitemap; a gap to add."),
  req_col("Team profile",
  "Opened from the team row on Home. It shows the person's photo, name and role, a short bio written by the person and reviewed by the studio, the projects they worked on (this project first), and testimonials that name them.",
  ["Photo and bio supplied by the studio","This project listed first"],
  "Registered 22 Nov. Not in the sitemap; a gap to add."),
  req_col("Meetings",
  "The meetings page lists the next meeting with its link, time and everyone tagged, and the completed meetings with dates. A change request opens the change sheet. Join opens Google Meet. The link is created from one company account, and it is posted to the project group if the client is in it, or sent to their number otherwise.",
  ["Link from one company account; nobody logs in","Posted to the group, or to the client's number"],
  "Sitemap meeting-link (Spec §26.11). Registered 22 Nov: change request."),
  req_col("Terms",
  "The Terms page is readable at any time. It shows the version agreed at sign-in. The full wording has not been drafted and is not part of this pass; it is a placeholder.",
  ["Version and date shown","Agree button only from sign-in","Wording to be drafted"],
  "Registered 22 Nov (Terms on every login). Wording not yet drafted."),
 ])

# ---------- COVER AND LOG ----------
COVER = '''<section class="board"><div class="kicker">Version 4 · 22 November 2026 · supersedes v3</div>
<h1 style="font-size:30pt;margin:6px 0 10px">First Light · client wireframes</h1>
<p class="prose" style="font-size:12pt;max-width:220mm">Four boards and four requirement pages, twelve phone screens in all, in the same standard components as the design partner set. This version corrects the errors found in the second cross-check and settles every conflict that was open in v3, with the reason beside each decision. Nothing here is visual design: grey and white, placeholders marked in square brackets.</p>
<p class="prose" style="font-size:10.5pt;max-width:220mm">Sources checked: the sitemap of 22 November (client pages and shared pages), the registered decisions of the 22 November voice sessions, and the cross-check document. Each requirement page names its sources.</p></section>'''

LOG_ROWS = [
 ("Help line", "Sitemap: Call the office. Decision: sales representative by name.", "Representative by name, as decided on 22 Nov. Office call kept on Messages."),
 ("Proof route", "Sitemap: client sends on WhatsApp, partner forwards. Decision: in-app upload to MD.", "In-app upload straight to the MD. Hand forwarding removed."),
 ("Client bottom bar", "Sitemap: Project, Files, Payments, Messages, More. Decision: Home, Projects, Meetings, Messages, Catalogue.", "Decision used."),
 ("Studio name", "HOMESIC in logo and decision; HOMSIC in some documents.", "HOMESIC. HOMSIC treated as a typo to correct in the documents."),
 ("Owed-now amount (v2)", "Showed Rs 2,40,000 owed now, though token and mid were paid.", "Rs 1,40,000 due 14 Dec; remaining Rs 1,60,000 (fixed in v3, rechecked in v4)."),
 ("Payment steps (v2)", "Home showed three steps; the schedule has four.", "Four steps, 10 / 50 / 35 / 5 (rechecked)."),
 ("Quotation version (v2)", "Quotation v4 while Designs showed Version 5.", "All files of a round at the same version (rechecked)."),
 ("Invented copy (v2)", "Typical 3 to 4 weeks; Due before handover; HOMESIC Interiors.", "Placeholders in square brackets; payee is HOMESIC."),
 ("Fold lines (v3)", "Home and Project run past one screen.", "Fold line on every screen; lower items are numbered and in the guide."),
]
LOG = '''<section class="board"><div class="bh"><h1>Cross-check log · corrections in v3 and v4</h1><p>Each correction, what was wrong, and what changed.</p></div>
<table class="log"><tr><th style="width:18%">Item</th><th style="width:44%">Found in v2</th><th>Corrected in v3</th></tr>''' + "".join(f"<tr><td>{E(a)}</td><td>{E(b)}</td><td>{E(c)}</td></tr>" for a,b,c in LOG_ROWS) + '''</table></section>'''

CONF_ROWS = [
 ("Proof route", "Sitemap: client sends on WhatsApp, partner forwards to the MD. Decision: client uploads in the app.", "In-app to the MD. Hand forwarding is error-prone, and the sitemap itself says nobody copies files across by hand."),
 ("Help line", "Sitemap: Call the office. Decision: the assigned sales representative by name.", "Representative by name. The office stays one tap away on Messages."),
 ("Client bottom bar", "Sitemap: Project, Files, Payments, Messages, More. Decision: Home, Projects, Meetings, Messages, Catalogue.", "Decision. It matches the sections the client asked to reach each time."),
 ("Studio name", "HOMESIC in the logo and decision; HOMSIC in some documents.", "HOMESIC. The logo is the brand's authority."),
 ("Team and client sections", "Not in the sitemap for the client.", "Kept as new screens; to be added to the site map at the next update."),
]
CONFPAGE = ('<section class="board"><div class="bh"><h1>Decisions made in this pass</h1><p>Each conflict left open in v3, the decision taken and why. Change any decision the owner does not accept.</p></div>'
  '<table class="log"><tr><th style="width:18%">Item</th><th style="width:46%">What the sources said</th><th>Decision taken and why</th></tr>'
  + "".join("<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (E(a), E(b), E(cc)) for a, b, cc in CONF_ROWS)
  + "</table></section>")

HTML_PAGES = [COVER, LOG, CONFPAGE, B1, R1, B2, R2, B3, R3, B4, R4]
out = f'<!doctype html><html><head><meta charset="utf-8"><title>First Light · client wireframes v3</title><style>{CSS}</style></head><body>' + "".join(HTML_PAGES) + '</body></html>'
open("/tmp/claude-0/-home-claude/9dfa13db-9cf1-58e6-8cac-2cf4775f2be6/scratchpad/wf/client_v4.html","w",encoding="utf-8").write(out)
print("client html", len(out))
