# Blue Light: All Specifications (version 19)

This single file holds every specification for Blue Light. It has two parts:

- **Part A: AI Context Brief.** A condensed reference for AI models. Read it first.
- **Part B: Full Business and Workflow Specification (version 19).** The complete detail, in full wording. If Part A and Part B differ, Part B wins.

Related documents, all current: architecture decisions version 20, app flow version 15, tenant settings version 8, backend schema version 4, goals and success metrics version 3, alert retry rules version 0.1 with addendum 0.3.

---

# Part A: AI Context Brief

**File type:** AI context brief (a Markdown reference file that an AI model reads before helping with Blue Light). It is not the legal or product spec.
**Source:** First Light Business and Workflow Specification, version 19. If this brief and the spec ever disagree, the spec wins. Report the conflict and do not resolve it yourself.

---

## 1. What you are working with

Blue Light is a complete business platform for interior and design firms. It runs the whole business in one place: leads, sales calls and meetings, client records, design approval, quotations, a staged payment schedule, production and inventory, client communication over WhatsApp, marketing, reporting, leave and performance. Every action is logged.

**First Light** is the first version of Blue Light. It follows an aggregator model: a firm rents the platform under its own brand and runs its own business on it. Shukra owns the platform and the code and rents it out. Rental and branding belong to First Light. The rest of the product belongs to Blue Light.

The platform is configurable. Business rules such as payment splits, stage names, pay dates and alert timings are settings each firm's owner can change. They are not hard-coded.

---

## 2. How you must work

- **Ask before you decide.** If a requirement is not covered here or in the spec, ask. Never fill a gap with a default.
- **Items marked OPEN are not built.** They appear as placeholders only.
- **Do not add features** that the spec does not describe.
- **Present options with trade-offs** for any technical choice (queue, sign-in strategy, database, hosting). State your recommendation, then wait for an answer.
- **Report back** what changed, what you checked, and what remains open.
- **Speak plainly.** Use lists only when the content is a list.

---

## 3. Glossary

- **Lead:** an enquiry from the calculator, a campaign or an estimate tool. Each lead records its source.
- **Lead group:** leads sorted by the AI using the eight fixed options (section 5).
- **Temporary project:** the project record created when a design partner's meeting is approved. It becomes permanent only when the token is paid.
- **Permanent project:** a project whose token has been paid.
- **Token:** the first payment, 10% of the accepted estimate.
- **Pending action:** an AI suggestion that a person must confirm on screen before anything is written.
- **Closed-leads file:** a separate store of quoted leads that never paid the token.
- **Pinned file:** a client file the design partner chooses to keep at the front of the client's dashboard.
- **BOQ:** bill of quantities, the material list for a project.
- **Stage:** one step of a project, timed against a target.
- **Traffic light:** the green, yellow or red rating for a stage or person.
- **Cover:** another person temporarily working on someone's projects during leave.
- **Hibernation:** an account that is switched off but can be reactivated.
- **Plugin:** an optional feature a firm can switch off. The call agent, the overseer and the transcript and proof plugin (Meetbook or similar) are plugins.

---

## 4. Roles and what each one does

**MD (Managing Director).** The supervising chair. The only person who makes company-wide decisions. Approves all payments and confirms client payments. Sets each person's default salary and one visible limit per person, and can change either at any time. At each salary payment he can change the amount for that payment and send it for the person's approval. Sets company rules and settings. Reads all logs and all corrections. Sees everyone's performance on one page. Onboards staff, and handles leavers (section 13). Can end any session at once. Can write over a closed project, for example to record a refund. Does not take leave. Sees a live view of who is working and who is on leave.

**Sales Head.** Receives every lead. Groups leads using the eight fixed options. Assigns groups to sales representatives. Has full control over leads in sales: pull, reassign, hold or regroup. Sees lead sources, conversion at each step, and a weekly sales report. Sees a live project only by requesting access (section 12). Approves sales representatives' leave.

**Sales representative.** Calls assigned leads and records one of four outcomes. Never approves or rejects leads. Stays on a project after the meeting with full visibility of it. Steps in when communication breaks down or the client goes quiet. Handles complaints and warranty claims after handover, and decides whether a claim is covered. Sees only the closed leads they worked on (section 12).

**Design Head.** Sees every project and every client meeting. Approves renders and quotations before they reach the client, and approves design time estimates and design-phase extensions. Approves designers' leave and chooses the cover scope. Can reassign a rejected lead and move any project to another person at any time. Can approve access requests to a project he is on, and add anyone to it.

**Design partner.** Receives a lead group, calls the client and closes the deal. Creates the project after the first meeting is approved, as a temporary project (section 12). Sees everything on the project from the first lead, including full client details. Owns the client through the design phase. Approves on the client's behalf inside the software, for every item. Records the client's agreement with their words and a timestamp. Pins the files that appear at the front of the client's dashboard. Does not approve payments. Earns 5% of the final quotation, paid as the client pays. Is not on salary.

**Production Head.** Oversees all Production Managers. Sees every project that reaches production. Maintains the vendor list and sees all vendor catalogues, price lists and invoices. Checks production expenses before they reach the MD. Approves production and installation time estimates. Chooses the cover scope when a Production Manager is on leave. Can move any project to another person at any time.

**Production Manager.** Runs factory and site work. Sees everything on a live project. Builds the BOQ and manages material purchases. Keeps his own inventory workspace, vendor list and crew directory. Assigns crew to projects and tracks their attendance. Sees which labourer is on which site. Warned by the platform when the same crew or vehicle is booked on two projects on one day. Raises expense requests and bills. Sets delivery and installation dates with the client. Handles quality checks and snags offline. Handles warranty replacements. Fixed salary set by the MD.

**Marketing Head.** Sets the brand template and content types. Edits the brand template at any time, and every change is kept as a version. The platform chooses the AI model. Supervises the marketing pipeline, including a funnel for each post and channel. Adds his own content. Raises marketing spend requests and sees their full status: approved, declined and paid. Receives finished project packages with the final files and the brief only, and no client details. Is on salary.

**Client.** Sees only their own project. Talks mainly through WhatsApp and phone calls, using the company number. Can view the project in the client portal, see dates, download current files and pay by UPI. Can act for themselves in the portal if they choose, and is never required to. Signs in with the phone number the lead was created with, using OTP. Receives an automatic receipt when the MD confirms a payment. Receives a written reason when a warranty claim is not covered. Never sees other clients, internal costs or vendor details.

**Access rule.** Every person sees only what their role allows. The MD sees everything. Every action by anyone, including the MD, is logged.

---

## 5. Lead intake and grouping

- Leads arrive from the calculator now, and later from campaigns and estimate tools.
- All leads go to the Sales Head.
- The AI groups leads using only these eight fixed options: state or city; project type; budget ranges; timeline; lead source; property type; client status; lead age.
- The Sales Head cannot type a free keyword. A group can be split into smaller parts at any time, using the same options.
- A calculator quotation, if one exists, travels with the lead.

---

## 6. Sales calls and outcomes

- The Sales Head assigns groups and sets time windows and call limits per representative.
- After each call, the representative records one of four outcomes:
  1. **Meeting set.** Chooses a date and time, tags a design partner, adds a comment. The design partner must approve. The Design Head is notified of every meeting.
  2. **Could not connect.** Retried in later sessions, up to a company limit.
  3. **Warm, not now.** A future date is chosen. The lead returns that day. The system checks daily for postponed calls.
  4. **Not interested.** Archived as a cold lead.
- Every call, meeting and transcript is kept in the client's history, with the end note and AI comments kept separately for each meeting.
- A design partner who rejects a lead group must give a written reason. The reason is visible to the representative, the Sales Head and the Design Head.
- The Sales Head or Design Head reassigns a rejected lead.

---

## 7. Client IDs, archive and returning clients

- Every client gets a unique ID. All their data, meetings, transcripts, files and staff actions sit under it.
- Rejected or cold clients are archived under their ID. If they return, the team finds them by ID and the full history is ready.
- A client who pays the token and then stops is paused at the current stage. Nothing is closed. Work can resume later.
- Blacklisting is handled outside the platform.
- Each site is its own project. A returning client gets a new, separate project. Old projects are not linked to new ones.

---

## 8. Temporary projects, permanent projects and closed leads

- When a design partner's meeting is approved, a **temporary project** is created, visible to the design partner.
- It becomes **permanent only when the token amount is paid**.
- Leads that were quoted but never paid the token move to the **closed-leads file**, kept apart from live projects.
- Closed-leads visibility: the Sales Head, the MD and the Design Head see all closed leads. Design partners and sales representatives see only the closed leads they worked on.

---

## 9. Design, quotations and approvals

- Design partners upload renders and quotations. An upload goes first to the Design Head for approval. Only after approval does it reach the client, through the company WhatsApp number.
- Technical files go to the Production Manager for approval, then to the client for verification. The Design Head does not approve technical files.
- The first quotation is an estimate. It can be revised at any time. Each revision is approved by the tagged person and logged. Quotations are versioned and never overwritten.
- **Approvals on the client's behalf.** The design partner approves for the client by default, for all items. No approval type needs the client directly. When the client agrees by phone call, WhatsApp or Google Meet, the design partner records the client's words and a timestamp, and the approval is logged in the client's name with the design partner's name beside it.
- Design time estimates are given by the design partner after the token is paid and approved by the Design Head. Production and installation estimates are set by the Production Manager and approved by the Production Head.

---

## 10. Payments

- **Split.** The default split is 10% token, 50% before production, 35% near completion, and 5% at handover. Each stage is calculated on the latest accepted quotation, minus what has already been paid. The MD sets the split. He can change it for one project, or for all projects, which applies only to new projects and needs multiple confirmations, a password and notifications.
- **Reconciliation example.** Quote 2,00,000: 10% paid, 20,000. Revised to 2,50,000: 50% gives 1,25,000, so 1,45,000 paid in total. Revised to 2,40,000: 35% of that is 84,000, so 2,29,000 paid in total. Revised to 3,00,000: the balance is 71,000. The final balance is never negative in practice.
- **Flow.** The client receives a payment request and pays by UPI. The client sends proof on WhatsApp. The design partner forwards it to the MD. The MD confirms receipt against the proof image and the amount. The project moves forward only after confirmation.
- **On confirmation.** The design partner is notified on WhatsApp automatically. The client receives an automatic receipt showing the amount received and the remaining balance.
- **Who confirms.** Only the MD confirms payments. There is no backup approver. If the MD is unavailable, payments wait. The design partner never approves payments. Payment confirmation is never voice-approved.
- **Locking.** A received payment is locked. Corrections are new logged entries.
- **Production expenses.** Visible only to the Production Manager, Production Head and MD. The chain is: Production Manager raises the request; Production Head checks and approves it; MD pays and marks it approved; confirmation goes back to the Production Manager, who acknowledges it. Production Manager bills follow the same chain.
- **Marketing spend.** Marketing Head raises it; MD approves.
- **Reimbursements.** Anyone can claim for site visits, travel and similar costs. The MD approves and pays.
- **Invoices** carry the company's GST number. The platform gives no legal or tax advice.
- **Not in the platform for now:** bank statement matching, office expense categories and spending limits.

---

## 11. Design partner payout and pay

- The 5% design partner share is paid in step with the client's payments: 1.5% after the token, 1.5% after the 50% payment (running total 3%), 1% after the 35% payment (running total 4%), and the remaining 1% at the final payment (total 5%).
- Design partners are paid on the 10th, 20th and 30th of each month. Salaried staff are paid on the 30th.
- The MD sets each person's default salary once. He decides per person, each time, who is paid, when and how much. He can change the amount for a single payment, then sends it to the person for approval. The person sees their limit and is told the amount paid each time.
- Salaries go out with a payslip or receipt, which the receiver approves.
- The design partner ledger shows what the company owes each partner in each pay window. Partners submit a monthly financial report.
- Attendance is tracked inside the platform. There are no fixed check-in or check-out times, because the company is remote.

---

## 12. Access to live projects

- The design partner, Production Manager, Design Head, MD and sales representative who booked the meeting can see the project as described in section 4.
- The Sales Head sees a live project only by requesting access. The request can go to a sales representative, design partner, MD or Design Head.
- Anyone already on a project can approve an access request, and can add anyone to the project. Anyone on a project can grant access to anyone.
- Access is logged.

---

## 13. Production, inventory and crew

- The MD assigns a Production Manager once the client has paid the 50%. The approved design files and the signed quotation go with the project.
- The Production Manager builds the BOQ from the approved quotation. The BOQ can be changed at any time, and every change is logged.
- Each material line has a quantity, a rate, a payment date and a receiving date. These are tracked separately, and either can come first.
- Purchases can be staged, with buy and receive dates for each stage. The BOQ can be filtered by stage.
- Each project has its own inventory record, built from the BOQ. The project inventory is shared with the Production Head and the MD.
- Each Production Manager has a standalone workspace with site tabs, a general tab, a table builder and a crew directory. Starter categories are laminates, plywood and boards, hardware, worktops and backsplash, lighting, and adhesives and consumables.
- Crew assignments and attendance are visible only to the Production Manager who owns that crew. The Production Head can open any Production Manager's profile and see where each crew member is.
- The platform warns the Production Manager when the same crew or vehicle is booked on two projects on one day.
- Vendors receive an ID when an invoice is tagged to a project. Each vendor invoice belongs to both the vendor record and the project. Rates are tracked for comparison.
- If an invoice is tagged to the wrong project, the Production Manager corrects it. The original stays in the log, and the Production Head is notified.
- Vendor deliveries follow the receiving date. Installation trips follow the crew assignments.
- Snags and quality issues are handled offline and are not tracked by the platform.

---

## 14. Client communication, complaints and warranty

- Clients communicate mainly through WhatsApp and phone calls. The client portal is for clients who want it.
- One company WhatsApp number carries all client messages and file deliveries. Staff never copy files across by hand.
- Each project has a WhatsApp group. The AI transcribes it into the project record.
- Point of contact by stage: the sales representative first; then the design partner through the design phase; then the Production Manager for production questions. The sales representative steps back in if the client goes quiet. The system introduces each new contact to the client automatically.
- Complaints go from the sales representative to the Production Head, who assigns a Production Manager. The sales representative responds within 24 to 48 hours.
- **Warranty.** The period is 10 years, starting at handover, which is also when the final payment is made. The sales representative decides whether a claim is covered. An uncovered claim gets a written reason. A covered claim is handled by the Production Manager. Exclusions come from the company warranty policy PDF, which has not yet been shared.
- At project close, the system asks the client for feedback over WhatsApp, with review links.

---

## 15. Files

- The **project record** is the central container. Files are grouped inside it by stage and type. Each file keeps its own version history. Nothing is deleted.
- **Client files.** Only approved versions are visible to the client. The design partner pins the files he wants at the front of the dashboard. The latest version of each file always shows. Old versions sit in a separate history section, grouped by date, which the client opens on purpose. Each version carries a short brief of what changed. Old versions are view-only. Current versions can be downloaded. Rejected versions stay visible to the team with the reason, and the client never sees them. Finished projects stay in the client's dashboard.
- **Project files.** The BOQ and the signed quotation sit inside the project record. The signed quotation is locked and versioned. The stage history is a separate append-only log that everyone on the project can open. When a project is paused, its files and stage history stay readable, and nothing changes until it resumes.
- **Production files.** Each Production Manager's workspace (stock, vendors, crew) stays with him. Projects link to the parts that belong to them.
- **Company files.** One folder managed by the MD. Payslips are visible only to the receiver and the MD. Reimbursement receipts are kept separately.
- **Marketing files.** The brand template sits in the Marketing Head's workspace, with every change kept as a version. Each published post is kept under post history with its performance numbers. Finished project packages stay in the project record. The MD shares access to them.

---

## 16. Logins, sessions and access to the software

- **Staff sign-in:** business email on the company domain, hosted with Miles Web. The MD creates every staff account. Nobody self-registers.
- **Client sign-in:** mobile number and one-time code (OTP). The number is mandatory and must match the lead's number. Google sign-in can be linked as an option. The number and OTP remain the main method. OTP is required before the token payment and the invoice.
- **Sessions:** remembered on the device, including after the app or browser is closed. The window is 15 days from the last visit and resets each time the person opens the app. It applies to staff and clients alike. The window is an editable setting that the MD controls.
- **Ending sessions:** logging out ends the session on that device. Changing the login ID ends all sessions for that account. The MD can end any session at once, for a lost device or a leaver. The person is signed out and receives a WhatsApp message saying so.
- **Clients never log in on the client's behalf.** Nobody logs in as a client. The project runs without the client's login.

---

## 17. Leave, cover and leaving staff

- Sales representatives apply to the Sales Head. Designers apply to the Design Head. Production staff apply to the Production Head. Heads apply to the MD. The MD does not take leave.
- Overlapping leave is not blocked.
- **Cover.** The head of the department chooses the cover scope: all of the absent person's projects, or selected projects or tasks. The crew linked to those projects or tasks go to the cover person too, and nothing else. The cover person gets working access. The absent person can view all of his projects at any time.
- **Return from leave.** The absent person marks himself back. The system asks the cover person for a handover. The cover person hands back the projects and crew. The department head is notified.
- Any head can move any project to another person at any time.
- **Leaving staff.** The MD can reassign that person's open projects before deciding. The old owner keeps read access to the project history only. The MD then either downloads the person's data and deletes the account, or hibernates the account.
- **Deleting** removes only the login. Projects are kept, and the person's name stays on everything they were tagged to, labelled "former staff".
- **Hibernation** keeps the account for reactivation. A hibernated account shows as inactive until the MD reactivates it.
- The MD sees one list of all hibernated and deleted accounts. Department heads request access to one person's hibernated account from the MD. The MD approves one person at a time, and the approval lasts until the MD removes it. The department head is notified when access is given or removed.
- When someone leaves, is deleted or is hibernated, their notifications and WhatsApp access stop straight away. They receive one final WhatsApp message and nothing more. Department heads receive access-change notices inside the app only.
- Access changes are logged and appear in the activity log.

---

## 18. Stages, timers and performance

- **Stage durations:** design 15 days, from the token; production 45 days, from the 50% payment; installation 5 days, from the 35% payment.
- Stages before the token (sales and quotation steps) are timed in hours, within a 8 a.m. to 10 p.m. window. Work outside that window is allowed, is recorded separately, and is not charged to the stage timer.
- A delay caused by the client pauses the timer.
- Each stage has a step timer that records how long it took and who held it.
- **Traffic light, per stage:** green within the expected duration; yellow when the stage passes its target; red when it passes 125% of its target.
- A delay caused by the client never turns a stage yellow or red. The stage shows that it was paused by the client.
- A delay counts against a person only when it holds a project back.
- **Performance** runs on a Monday-to-Monday cycle. Monday is the review day. Saturday and Sunday are the peak working days. Performance is reviewed weekly.
- Each person sees their own rating and their weekly count of completed stages. Heads see their team's and projects' ratings. Each project has its own rating. The MD sees everyone's rating on one page.

---

## 19. Marketing and dashboards

- The Marketing Head sets the brand template: logo, colours, fonts. The platform chooses the AI model.
- The system generates and schedules posts across chosen channels, handles comments and replies, and returns responses and lead data.
- Leads are passed to the Sales Head, who groups them.
- The Marketing Head sees a funnel for each post and channel: leads, meetings and converted clients, with the percentage at each step.
- The Sales Head sees lead sources, conversion at each step, meetings set, which marketing schemes perform best, and a weekly sales report.
- **Dashboards** are richer than simple views but easy to read, with clear charts and semicircle gauges. Each person chooses their own charts from a wide set. Each role has a default layout. Choices are saved to the account and follow the person across devices.
- Creative options are kept light. The focus is the pipeline and its reporting.

---

## 20. Logging and corrections

- Everything that happens in the software is logged, including the MD's actions.
- Logs are fixed once written and cannot be edited or deleted.
- A wrong entry is corrected by a new correcting entry. The original stays visible. A reason is optional.
- Corrections notify no one automatically, except that the MD is notified when a correction touches a payment.
- Each person sees their own actions in the log. Department heads see logs and corrections for their own teams. The MD sees all logs and the full correction log.
- Nothing is overwritten silently.

---

## 21. Alerts and optional plugins

- **Core alerts use WhatsApp only.** When something new arrives for a person, the platform sends a WhatsApp message. If the item sits too long, a second WhatsApp message in a different style follows. No phone calls are placed for alerts.
- **Call agent (optional plugin).** Staff only, never clients. Handles reminders, daily check-ins and decision prompts. Every reply becomes a pending action that a person confirms on screen. Payment confirmation is never voice-approved. A firm can switch it off.
- **Overseer (optional plugin).** A company-wide AI that answers questions across the business, respecting the same access rules. Built after the core. Defaults to off for any firm that does not opt in.
- **Transcript and approval-proof plugin (optional).** Meetbook or a similar tool may supply meeting transcripts and approval proof. Held until the architecture decision.
- The core platform works fully without any plugin.

---

## 22. Build guardrails (for AI agents that plan, review or build the software)

- The spec is the source of truth for business behaviour. The architecture document is the source of truth for technical choices.
- Ask before deciding on any infrastructure choice. Record each answer with its date and reason in the architecture document.
- Read the current official documentation for any library before writing code that uses it. Do not rely on memory for API signatures.
- Use the design tokens and component conventions for Blue Light. Brand data (logo, colours, fonts) belongs to each tenant. Never hard-code a tenant's brand.
- Any schema change, migration, data deletion, bulk update or payment-record change needs explicit human approval before it runs. Never run a destructive action against production, or as a side effect of another task. Report unused data; do not remove it.
- Payment confirmation is human-only. Refunds are recorded by the MD writing over a closed project, which is human-only and logged.
- Enforce role-based access in the database (row-level security) and in the server API, never only in the interface. Treat any query that returns another client's data, staff-only costs or vendor details to a client as a defect.
- Store money as integers in paise. Compute the payment split on the latest accepted quotation. Round only at the final step, and show the reconciliation. A received payment is immutable.
- Every state change writes an append-only audit entry with the actor, time, object, and before and after values.
- Write tests covering: stage gates, the payment split and reconciliation example, quotation revisions, approval routes, role-based access for every role, the four call outcomes, the traffic light thresholds, and the client-delay exclusion. Tests run in continuous integration, and a failing test blocks the change.
- Every pull request gets an automated AI review and a human review. An AI reviewer may recommend changes but may not approve or merge.
- Every release passes through staging first. Schema changes are applied to staging and verified there.
- Production runs error monitoring from the first release. Monitoring may propose a fix as a pull request. A human approves it before deployment.
- AI agents act only through pending actions. They never approve, reject, pay, refund or delete on their own.
- Do not add features, dependencies or services without recording the reason in the architecture document.

---

## 23. Open items: do not build

Items here are not decided. Do not build them until the owner decides.

- Decided: groups use a separate company WhatsApp number; Twilio carries other messages from the main number. Verify before build: whether a direct add works on the group number (architecture 17).
- Delivery Problems screen and design partner absence alert wording: for the UI/UX brief.
- Warranty exclusions (company policy PDF); Meetbook plugin; call agent and overseer defaults; provider prices and limits; archive retention period.

## 24. Where the source documents are

- Business and workflow spec: First Light Business and Workflow Specification, version 19. Sections 1 to 25.
- Build guardrails for AI agents: section 20 of the spec and section 22 of this brief.
- Calculator and 14-stage prototype: Blue Light Codex v1.0 (First Light), the reference for the calculator logic and the prototype. Do not change them unless asked.

## 25. Decisions of 2026-11-22 (summary)

These are merged in full in spec section 26. Summary for AI readers:

- Messaging window: 8 a.m. to 10 p.m. for all WhatsApp messages and pre-token stage timing.
- Rejected payment: the MD rejects with a reason; the owning department head takes charge, fixes it or tags the people involved; tagged people see the rejection and the related project only.
- Call retry: a first pass (call, WhatsApp with catalogues, call, WhatsApp with testimonials, call, WhatsApp with videos), a 7-day wait, a second pass, then the unresponsive archive. The unresponsive archive is separate from closed leads. Representatives can call again; they can set a return date.
- Stalled quote: after 3 days of silence, up to 3 follow-up rounds, a new meeting after round 2, then "not won" after round 3.
- Project WhatsApp group: created at handover with representative, design partner, Design Head and company number; the client joins by invitation link; Meta's documentation states participants cannot be added manually. Twilio carries messages; group creation goes through Meta's Groups API directly.
- Google Meet: created automatically from one company Google Workspace account when a meeting time is agreed; posted to the group, or sent to the client's number with a one-tap button.
- Pre-written messages: a company library, filled with the client's details; all sent automatically from the company number as approved templates by content SID; anyone may edit the text, and a change needs template approval again.
- Design partner absence: Design Head alerted; suggestions split by region and workload.
- Project visibility: anyone on a project can see its status and history.
- Alert retries: option B (architecture 7 and 8), with the Delivery Problems list.

- Tenant settings: every changeable value and its default is in First_Light_Tenant_Settings_v1.
- Decided 2026-11-22 (second round): retries outside 8 a.m. to 10 p.m. wait until 8 a.m.; rejected proofs are resubmitted and the stage waits for MD confirmation; adding a client to the project group without asking is acceptable.
- Tenant settings: version 2 is in First_Light_Tenant_Settings_v2.
- Tenant settings: version 3 is in First_Light_Tenant_Settings_v3.
- Tenant settings: version 4 is in First_Light_Tenant_Settings_v4.
- Tenant settings: version 7 is in First_Light_Tenant_Settings_v8.
- Invitation-only joining is confirmed by the owner (2026-11-22). Provider facts: see architecture version 15, section 'Verified provider facts'.
- One-off messages: free text from the company number only within 24 hours of the client's last message, editable before sending; or a manual send from the person's own WhatsApp (free, untracked).


---

# Part B: Full Business and Workflow Specification

**Version 19**

**What this document is.** This is the business and workflow specification for First Light, the first version of the product. First Light is part of Blue Light, which is the complete interior-design platform. Blue Light is the full product: leads, quotations, design, payments, production, marketing and client communication for interior and design firms. First Light is the first version of that product, built as an aggregator. In First Light, a firm rents the platform under its own brand and runs its own business on it. The rest of Blue Light, such as later versions and add-on modules, is out of scope here.

The document describes what the platform must do and why. It does not describe code. Section 20 contains operating rules written for AI agents that will plan, review or build the software. Items marked OPEN are not yet decided.

## What changed in v19

- **One-off messages (26.14):** both options kept, owner decision 2026-11-22.

## What changed in v18

- **All pre-written messages are sent automatically** from the company number when their trigger occurs. No manual send (owner, 2026-11-22). Every one is an approved WhatsApp template.

## What changed in v17

- **Invitation-only joining confirmed by the owner (2026-11-22).** Clients join a project group by invitation link only.

## What changed in v16

- **Direct add is not possible** (Meta's documentation: participants cannot be added manually). The invitation link is the only route. The owner should confirm (26.4).
- **Session timeouts** (inactivity timeout and time-box) are Pro-plan features on Supabase. The 15-day rolling session needs the Pro plan.

## What changed in v15

- **Groups use a separate company WhatsApp number** (decided by the owner, 2026-11-22). Twilio carries all other messages and alerts from the main number.

## What changed in v14

- **Number check (architecture 17):** Twilio advises a separate number for two-way use, so the group number is recommended to be separate. Owner to decide.

## What changed in v13

- **WhatsApp routes decided:** Twilio carries all messages and alerts. Group creation and membership go through Meta's Groups API directly, on the company's number. Decided by the owner, 2026-11-22.
- **To verify:** that one company number can serve both Twilio and the direct Cloud API connection for groups.

## What changed in v12

- **Group joining (26.4):** the software tries a direct add first, and sends an invitation link if that fails. Decided 2026-11-22.
- **Group creation route:** Twilio does not create native WhatsApp groups. Group creation needs Meta's Groups API or a provider that supports groups. **To decide** (architecture decision 17, open item 6).
- **Google Meet account:** a Google Workspace account on the company domain. Confirmed 2026-11-22.

## What changed in v11

- **Project WhatsApp group (26.4):** the client joins by invitation link. Direct adding is not possible through the platform, so the automatic-add setting is withdrawn. **To confirm.**
- **Google Meet links (26.11, new):** created automatically from one company Google Workspace account on the company domain.
- **Pre-written messages (26.12, new):** a company library, with the client's name and project details filled in automatically. Anyone may edit a message before sending.
- **Content SID (26.3):** every automatic message is an approved template sent by its content SID.

## What changed in v10

- **Rejected payment:** a corrected proof is resubmitted by the client, and the stage waits until the MD confirms it (section 26.1). Decided 2026-11-22.
- **Retries outside the messaging window:** they wait until 8 a.m. and are not dropped (section 26.3). Decided 2026-11-22.
- **Client added to the project WhatsApp group** without asking first: accepted (section 26.4). Decided 2026-11-22.
- **Tenant settings** written as a separate document (section 26.10).

## What changed in v9

- **Merged from the app flow (v4).** Section 26 holds every rule agreed on 2026-11-22: rejected-payment routing, the call-retry cycle, the unresponsive archive, the WhatsApp group at handover, design partner absence, project visibility, default dashboards and the messaging window.
- **Alert retries settled** (architecture decisions 7 and 8, option B). Sections 12 and 17 updated.
- **Messaging window changed everywhere to 8 a.m. to 10 p.m.** (section 26.8). It replaces 8 a.m. to 10 p.m. wherever it appeared.
- **Could-not-connect** now points to the retry cycle (section 26.2), replacing "a limit set by the company".

## What changed in v8.3

- **Payment proof reading is optional (section 23.7 rewritten).** A general AI vision model may suggest the amount from the proof. It is an aid, not a check. The MD checks every proof. Nothing is marked as checked by the software.
- **Backend runtime** is recorded as open in the architecture document (Node.js or Supabase functions). The spec does not depend on it.

## What changed in v8.1

- **Payment proof matching (new section 23.7).** The software reads the amount from the payment proof and compares it with the amount due. A mismatch is highlighted to the MD. The MD can confirm, or flag and reject with a reason. Every match, mismatch, flag and rejection is logged.

## What changed in v8


v8 is the final version. It corrects three points from the v7 review, records the answers given since, and keeps every other decision.

- **Temporary project.** A temporary project is created when the design partner's meeting is approved. It becomes permanent only when the token is paid (sections 7 and 23.1).
- **Transcript and proof plugin.** The "AI supervisor layer" is no longer a separate term. The transcript and approval-proof plugin (Meetbook or similar) is one optional plugin, alongside the call agent and the overseer.
- **Design partner and client.** The design partner approves on the client's behalf inside the software and never enters the client's portal. Nobody logs in as a client on the client's behalf.
- **Live project access.** The Production Manager sees everything on a live project. The Sales Head sees a live project only by requesting access, and anyone on the project can grant it (section 23.6).

All points from the v7 review and the to-confirm list are now settled (section 17).

## What changed from v6

v7 merges the v6 specification with the file "Decisions Not Yet in v6" and one new decision on the Marketing Head. Nothing from v6 was removed unless a newer decision replaced it. Six places where a new decision and an older line clashed were confirmed with you by voice and are recorded in section 25.

- **Clients and approvals.** The client can act for themselves in the portal if they choose, but is never required to. They sign in with the same phone number the lead was created with. The design partner approves on the client's behalf by default, and can approve everything. No approval type needs the client directly. Nobody logs in as a client on the client's behalf.
- **Payments.** When the MD confirms a payment, the client now also receives an automatic receipt.
- **Production Manager access.** He sees the latest project brief, the address and other current details, and no history by default. He requests history. The design partner approves; if the design partner is unavailable, the Design Head approves. (Superseded in v8: see section 23.6.)
- **Logs and corrections.** Logs are fixed once written. A correction is a new entry, with an optional reason. Corrections notify no one, except the MD when a correction touches a payment. Who sees which logs and corrections is now defined (sections 16 and 24).
- **Leaving staff.** The MD either downloads the person's data and deletes the account, or hibernates it. Rules for reassignment, former-staff labels, the list of hibernated and deleted accounts, and department-head access are in section 24.
- **Access changes.** Notifications for access changes do not go on WhatsApp for department heads, who get them inside the app. The person leaving gets one final WhatsApp message and then nothing more. When someone leaves, is deleted or is hibernated, their notifications and WhatsApp access stop straight away.
- **Salary.** The MD sets a default salary once. At each payment he can change the amount, then sends it to the person for approval. He decides per person, each time, who is paid, when and how much.
- **Double-booking.** The platform warns the Production Manager when the same crew or vehicle is booked on two projects on one day.
- **Warranty.** The 10-year period starts at handover, which is also when the final payment is made. Exclusions will come from the company's warranty policy PDF.
- **Dashboards.** Sales, marketing and head dashboards are richer than simple views but easy to read, with charts and semicircle gauges. Each person chooses their own charts, each role has a default layout, and choices follow the person across devices.
- **Marketing Head.** He sees only the final files and the brief, with no client details. This closes the open item.
- **Plugins.** Meetbook, a meeting-transcription tool, may later supply transcripts and approval proof as an optional plugin. Held until the architecture session.
- **Open items** are updated in section 17.

## What changed from v5 (kept from v6)

The title and scope name First Light as the first version within Blue Light. Lead grouping is limited to eight fixed options, with no free keyword grouping. Production Manager pay is a fixed salary plus submitted bills. The MD sets each person's salary limit. Company policy is remote work with no fixed check-in. Warranty and claims are defined. The Marketing Head's project scope is defined. Stage durations, the working window, the performance rating and the leave-cover rules are defined. The call agent and overseer are optional plugins, and alerts use WhatsApp only.

## 1. Purpose and key objective

Blue Light is a platform for interior and design businesses. Its aim is to give a small firm or solo designer the operating power of a full team: leads, quotations, design, payments, production, marketing and client communication in one place.

First Light is the first version of Blue Light, and it follows an aggregator model. A business that runs its own brand and marketplace rents First Light under its own name, with its own payment style and its own rules. Shukra owns the platform and the code, and rents it out. This is the landlord model: Shukra owns the land, and each business rents space on it.

The two names are kept apart. Blue Light is the whole product. First Light is the first version being built now.

The reason for the aggregator model: the platform must be configurable. Business rules such as payment splits, stage names, pay dates and alert timings live in settings that each tenant's owner can change, not in hard-coded logic.

Other reasons behind the design:

- Small firms run on WhatsApp and Excel. The platform must replace that chaos without asking clients to become software experts.
- Clients prefer WhatsApp and phone calls. The studio software is for staff; the client portal is for the small share of clients who want it.
- Every action must be traceable, so disputes are settled from the log, not from memory.
- Money is never silently edited. Corrections are logged entries, never overwrites.
- Projects run for months, so some rules can stay loose, such as overlapping leave.
- The software should stay light. Each part is simple and loosely connected, and can be extended later.
- Optional features, such as the AI call agent and the overseer, are plugins that a firm can switch off.

## 2. Roles and their functions

**MD (Managing Director).** The supervising chair and the only person who makes company-wide decisions. Approves all payments, including production expenses, marketing spend, refunds, reimbursements and Production Manager bills. Confirms client payments received. Sets each person's salary amount, with one limit per person that the person can see, and can change it at any time. At each salary payment he can change the amount for that payment, then sends it to the person for approval, and decides per person, each time, who is paid, when and how much (section 14). Sets company rules and settings, with guardrails. Overrides where needed, with a logged reason. Reads the full log and the full correction log. Is notified when a correction touches a payment. Sees each person's pay and performance, and the company's overall position. Sees vendors and project costs. Sees every person's performance rating on one page. Onboards new staff and creates their accounts. When staff leave, downloads their data and deletes the account, or puts it into hibernation; sees one list of all hibernated and deleted accounts; approves department heads' requests for access to a hibernated account (section 24). Can end any session at once. Can write over a closed project, for example to record a refund. Receives a daily briefing and sets check-in timings per role. Does not take leave. Receives the final warning on meetings. Sends salaries with payslips. Can share finished projects with the Marketing Head.

**Sales Head.** Receives every incoming lead. Groups leads, using the fixed options in section 3. Assigns groups to sales representatives. Has full control over leads in sales: can pull, reassign, hold or regroup at any time. Sees where leads come from, how many each source brings, and conversion at each step. Receives a weekly sales report. Sees the ratings of his team and projects. Reviews sales representatives' reports and reshuffles workload. Sees a live project only by requesting access (section 23.6). Can see every representative's calls, meetings, archive, transcripts and future calls. Approves sales representatives' leave. Is on salary.

**Sales representative.** Calls assigned leads, records one of the four call outcomes, sets meetings and reschedules calls. Does not approve or reject leads. Stays on a project after the meeting, with full visibility of it. Steps in to help the client if communication breaks down or the client goes quiet. Handles complaints and warranty claims after handover (section 11). Decides whether a warranty claim is covered. Takes leave by applying to the Sales Head. Is on salary.

**Design Head.** Sees every project and every client meeting, and receives meeting notifications even when not selected. Oversees all designers and their data. Approves design partners' renders and quotations before they reach the client. Does not need to approve technical files. Approves design time estimates and revisions, and design-phase extensions. Approves designers' leave, and chooses the cover scope when a designer is on leave. Can reassign a rejected lead. Can share selected project details with anyone. Can move any project to a different person at any time. Can approve access requests to a project he is on, and add anyone to it (section 23.6). Sees his team's and projects' ratings. Makes decisions within the design department. Is on salary.

**Design partner (designer).** Receives a lead group, calls the client, and closes the deal. Creates the project after the first meeting is approved. Owns the client for the design phase, and stays in the chat for design matters through production. Sees everything on the project from the first lead, including full client details. Approves on the client's behalf by default, for all items, and records the client's agreement with their words and a timestamp (section 23.3). Does not approve payments. Can approve access requests to a project he is on, and add anyone to it (section 23.6). Gives a time estimate for the design phase after the token is paid. Uploads renders and quotations, which go to the Design Head for approval first. Creates technical files for production, which go to the Production Manager first (section 8). Can add junior designers from settings, which is occasional. Joins site delivery and installation when the client needs them there. Takes leave by applying to the Design Head. Is not on salary. Earns 5% of the final quotation, paid as the client pays (section 14).

**Production Head.** Oversees all Production Managers. Sees every project that reaches production, without being assigned to each one. Oversees workload and site reports, and can reshuffle which Production Manager handles which project. Maintains the company's vendor list and sees every vendor's catalogue, price list and invoices. Sees every Production Manager's profile, including where each crew member is. Checks every production expense request and approves it before it goes to the MD (section 9). Approves production and installation time estimates and revisions. Chooses the cover scope when a Production Manager is on leave. Can move any project to a different person at any time. Sees his team's and projects' ratings. Currently also acts as a Production Manager. Approves production leave. Is on salary. Receives urgent production issues and is notified of every handover of cover.

**Production Manager.** Runs factory and site work for the project assigned by the MD. Receives the project, the approved design files and the signed quotation. Sees everything on a live project (section 23.6). Builds the bill of quantities for each project and manages its material purchases (section 10). Keeps his own inventory workspace, vendor list and crew directory. Assigns crew to projects, and tracks their attendance and schedules. Sees at any time which labourer is on which site. Is warned when the same crew or vehicle is booked on two projects on one day (section 10). Raises expense requests for materials and site costs. Is on a fixed salary, and can submit bills for purchases and vendor costs, which follow the same approval chain as production expenses. Sets delivery and installation dates together with the client. Handles quality checks and any snags offline. Handles warranty replacements by pulling part details from the project, having the part made, and sending someone to fit it. Requests technical files from the designer and approves them before they go to the client. Reports progress and raises issues to the design partner. Takes leave by applying to the Production Head. Pay: a fixed salary set by the MD.

**Marketing Head.** Sets up the brand template, chooses the content types, and supervises the marketing pipeline and its results. Does not choose the AI model; the platform sets it. Adjusts the schedule and template where needed. Has his own dashboard, including a funnel for each post and channel: leads, meetings and converted clients. Can add his own content alongside what the system generates. Raises marketing spend requests, which the MD approves. Receives finished project packages from the MD (section 15). Sees only the final files and the brief of a finished project, with no client details. Is on salary.

**Client.** Sees only their own project. Communicates mainly through WhatsApp and phone calls, with a company number. Can log in to a dashboard to see everything they receive on WhatsApp, including installation dates. Can act for themselves in the client portal if they choose, but is never required to. When they do, they sign in with the same phone number the lead was created with. Receives a written reason when a warranty claim is not covered. Receives an automatic receipt when the MD confirms a payment. Never sees staff names other than the point of contact at each stage, and never sees other clients, internal costs or vendor details.

**Access principle.** Every person sees only what their role allows. The MD sees everything. Every change by anyone, including the MD, is logged. A person can see their own actions in the log. Department heads see logs and corrections for their own teams.

## 3. Lead intake and grouping

Leads arrive from the calculator now, and later from marketing campaigns and estimate tools placed across different sites. All leads go to the Sales Head. Each lead records its source.

The Sales Head does not sort leads by hand. The AI groups them using only these eight fixed options:

1. State or city
2. Project type
3. Budget (with set ranges, for example under 5 lakh, 5 to 15 lakh, and above 15 lakh)
4. Timeline: how soon the client wants the work finished
5. Lead source: social media, referral, calculator or website
6. Property type: flat, villa, office or shop
7. Client status: new, repeat or referred
8. Lead age: days since the enquiry

The Sales Head cannot type a free keyword for the AI to group by. A group can be split into smaller parts at any time, using these options.

If a calculator quotation exists, it travels with the lead as an attachment.

The Sales Head has full control over leads in sales. He can pull a lead back, reassign it, hold it, or regroup it at any point.

## 4. Sales call workflow

The Sales Head assigns a group to a sales representative. The Sales Head sets the time windows and call limits per representative, for example a number of calls per period. The representative sees their own calls made and successful calls. The Sales Head receives reports after each schedule and can reshuffle workload based on them.

After a call, the representative chooses one of four outcomes:

1. **Successful, set a meeting.** The representative chooses a date and time, tags a design partner, adds a comment, and may tag other people, including the Design Head. The design partner must approve. The Design Head is notified of every meeting. Approved meetings appear live on the design partner's dashboard, without a push notification.
2. **Could not connect.** The lead enters the retry cycle (section 26.2).
3. **Warm, not now.** The representative picks a future date on a calendar. On that day the lead returns to the representative. The system checks every day for postponed calls and brings them forward.
4. **Not interested.** The lead goes to the archive as a cold lead.

Every call, meeting and transcript is stored in the client's history. The history shows the transcript, the end note and AI-generated comments, kept separately for each meeting.

## 5. Designer acceptance, rejection and reassignment

A design partner receives a lead group and accepts or rejects it. A rejection requires a written reason. The reason is visible to the sales representative, the Sales Head and the Design Head, and it is logged.

The Sales Head or the Design Head reassigns the rejected lead, either directly or through the sales representative. Sales representatives do not approve or reject leads; they only call.

## 6. Client IDs, archive and returning clients

Every client receives a unique ID. Their data, meetings, transcripts, files and every staff action concerning them are kept together under that ID. Client records live in the platform. Signing of agreements happens outside it.

If a client rejects the quotation or goes cold, the client and all their data are archived under the ID. If the client returns, the team looks them up by ID and the full history is ready.

If a client pays the token and then stops partway, the project is paused at its current stage. It can be picked up later, with all work so far kept. A paused project is not closed.

Blacklisting a client is handled outside the platform and is not recorded in it.

Who manages a client's data, and which files go where, is OPEN (see section 17).

## 7. Project creation and who is on the project

A temporary project is created when the design partner approves the first meeting. It becomes permanent only when the token amount is paid (section 23.1). From then on, every stakeholder works on the same project through their own window, with their own access and views.

The project team at creation is:

- The design partner
- The Design Head
- The sales representative who booked the meeting
- The company WhatsApp number

Everyone stays on the project through production. The sales representative keeps full visibility of the whole project, not only parts of it.

The Design Head can share selected details with anyone. The MD and design partners can share details too. Anyone with authority over a detail may share it, and each share is logged.

Each site is its own project. A client with two sites has two projects.

## 8. Design uploads, technical files and approvals

**Renders and quotations.** Design partners upload renders and quotations. An upload does not go directly to the client. It first goes to the Design Head, who reviews and approves it. Only after approval does it reach the client, through the company WhatsApp number.

**Technical files.** Designers create technical files for production, which are not always CAD. The flow is:

1. The design partner creates the technical file.
2. It goes to the Production Manager, who can also request a specific file from the designer.
3. Once the Production Manager approves it, it goes to the client for verification.

The Design Head does not need to approve technical files. Technical files are held in the project record.

## 9. Quotations, payments and expenses

**Quotation.** The first quotation is an estimate, based on the client's description and the design partner's first proposal. It can change at any time, for example after measurement, design changes or client requests. Each revision needs approval from the tagged person, and every approval is logged. Quotations are versioned and never overwritten.

**Payment split.** The default split is 10 / 50 / 35 / 5, applied to the latest accepted quotation. The MD sets the split. He can change it for one project or for all. A company-wide change applies only to new projects, and requires multiple confirmations, a password and notifications.

**Payment stages.**

- 10% token, paid on the first accepted estimate.
- Design phase, with measurements and refinements. The quotation may change several times.
- 50% of the revised quotation, paid before production.
- 35% near completion, calculated on the latest quotation minus what has already been paid.
- Handover. The final payment is the latest total minus everything already paid. The 5% is the expected share only when nothing changed.

**Reconciliation example.** Quote 2,00,000: 10% paid, 20,000. Revised to 2,50,000: 50% gives 1,25,000, so 1,45,000 paid in total. Revised to 2,40,000: 35% of that is 84,000, so 2,29,000 paid in total. Revised to 3,00,000: the balance is 71,000.

The final balance is never negative in practice. If it ever appeared negative, it would signal an error to investigate, not a refund.

**Client payments.** The client receives a payment request and pays by UPI. The client sends proof on WhatsApp. The design partner forwards it to the MD. The MD confirms when the payment has been received. The confirmation is logged against the proof image and the amount. When the MD confirms, the design partner is notified on WhatsApp automatically, and the client receives an automatic receipt showing the amount received and the remaining balance on the project. The design partner does not approve payments. How the payment is collected is handled by the design partner and the team, outside the platform. The platform only records that it is done (see also section 23.5).

**Payment confirmation.** Only the MD confirms payments. There is no backup approver. If the MD is unavailable, payments wait. A rejected proof is routed as in section 26.1.

**Locking.** A received payment is locked. Nobody can edit it silently, including the MD. Any correction is a logged entry. The MD is notified when a correction touches a payment.

**Production expenses.** Only the Production Manager, Production Head and MD see these. Clients and design partners never see them. The chain is:

1. The Production Manager raises the expense request, with the project and amount.
2. The Production Head checks it for correctness and can ask for supporting data.
3. The Production Head approves it and forwards it to the MD.
4. The MD makes the payment and marks it approved.
5. The payment confirmation goes back to the Production Manager, who acknowledges it.

Production Manager bills for purchases and vendor costs follow this same chain.

Approved requests are batched. The MD receives a list of approved requests, at the end of the day or whenever he chooses. The Production Head receives every production payment that has to be made.

**Salaries.** The MD sets each person's salary amount in the platform, once, as the default. He can set one limit per person, which that person can see, and he can change it at any time. When he pays, he can change the amount for that payment, then sends it to the person for approval. The MD decides per person, each time, who is paid, when, and how much (see section 14).

**Marketing spend.** The Marketing Head raises marketing spend requests, and the MD approves them. The Marketing Head sees the full status of each request he raises: approved, declined and paid. Details of what is provided are set when marketing setup is discussed (section 15).

**Reimbursements.** Anyone can apply for reimbursement for site visits, travel and similar costs. The request carries the amount, the region and the timings. The MD reviews, approves and pays it. Reimbursements sit alongside salary for everyone.

**Invoicing.** The platform produces invoices that carry the company's GST number. The firm does not need the platform to give legal or tax advice.

**Expense categories.** Only production expenses, marketing spend, Production Manager bills and reimbursements exist for now. Office expense categories and spending limits are excluded for now, and bank statement matching is left out of the platform. Each may be revisited later.

## 10. Production and inventory

**Production handover.** The MD assigns a Production Manager to each project once the client has paid the 50%. The Production Head oversees all Production Managers. The approved design files go to the Production Manager, along with the signed quotation. The handover happens when the 50% is confirmed. The Production Manager sees everything on a live project (section 23.6).

**Bill of quantities (BOQ).** The Production Manager builds the BOQ from the approved quotation. He checks it against the design and works out the cost of each material. The BOQ sits in the project's inventory record. It can be changed at any time, and every change is logged.

**Material lines.** Each material line carries:

- Quantity and rate, recorded as purchases happen.
- A payment date: when the company pays the supplier.
- A receiving date: when the material arrives at the site or factory.

Payment and receiving can happen in either order, so each is tracked separately. The Production Manager can set an alarm for each date.

**Stage buying.** A purchase can be split into stages. Each stage has its own buy and receive dates. The BOQ can be filtered by stage to see what needs buying at each point.

**Sharing.** The project inventory record is shared with the Production Head and the MD, who review project costs and use it when approving payments.

**Production Manager's own workspace.** Each Production Manager has a separate, standalone workspace, loosely linked to the rest of the platform. It holds:

- Site tabs: one tab per site, covering that site's vendors and the invoices they have issued.
- General tab: contacts, other details, and the inventory register.
- Table builder: the Production Manager types a category, such as laminates, and gets a ready table with a basic pre-added list. He can add his own rows.

Starter categories, pre-added and to be customised later: laminates; plywood and boards; hardware (handles, hinges, channels); worktops and backsplash; lighting; adhesives and consumables.

**Crew directory and attendance.** Each Production Manager keeps his own directory of crew and labour, tracks their attendance and schedules, and assigns them to projects. He can see at any time which labourer is on which site. Labour assignments and attendance are visible only to the Production Manager who owns that crew. The Production Head can open any Production Manager's profile and see where each crew member is (section 13).

**Per-project inventory.** Each project has its own separate record of the materials used on it. It is not linked into the sales, design or client side.

**Vendors.** The Production Head maintains the company's vendor list and sees every vendor's catalogue, price list and invoices. Production Managers can add vendors too. Each vendor receives an ID when an invoice is tagged to a project. Rates are tracked for each vendor so that suppliers can be compared for the same material. Vendor lists belong to the production side, not the rest of the platform.

**Snags.** Snags and quality issues are handled by the Production Manager offline. The platform does not track them.

**Operations on site.** Quality checks are owned by the Production Manager. Delivery and installation dates are set by the Production Manager and agreed with the client. The design partner joins when needed, since installation happens in the client's home. The dates appear in the client's dashboard as well as in WhatsApp. Notices are always sent through WhatsApp.

**Delivery planning.** Each site is its own project, so delivery is planned per project, and the Production Manager plans each one separately.

- Vendor deliveries are covered by the receiving date on each material line.
- Installation trips are the crew travelling to the client's site. The Production Manager plans them through his crew assignments.

**Double-booking warning (decided in v7).** The platform warns the Production Manager when the same crew or vehicle is booked on two projects on one day.

## 11. Client communication, complaints, warranty and feedback

**Principle.** Clients communicate mainly through WhatsApp and phone calls. The client portal is for the small share of clients who want it. Staff work inside the studio software.

**Point of contact by stage.**

- Sales representative: first contact, through the call and the meeting booking.
- Design partner: main contact from the meeting onward, through the design phase.
- Production Manager: introduced once production starts, and handles production questions. Design questions still involve the design partner in the chat.
- Sales representative: steps back in if there is a communication gap or the client goes quiet.

The handover is automatic, driven by the project stage. The system sends the client an introduction of the new contact.

**Company WhatsApp number.** All client messages and file deliveries come from one company WhatsApp number. Staff never copy files across by hand, and clients never log into WhatsApp.

**One-click sending.** When a file or stage changes, such as renders or a quotation for review, the system offers the responsible person a one-click WhatsApp message to the project group. Staff can also send a file directly from the software, and the company number delivers it to the client.

**Project WhatsApp group.** Client and staff talk inside the project group. The AI reads and transcribes the conversation into the project record.

**AI assistance.** The AI summarises the conversation and flags anything needing action, such as a change request. It alerts the responsible person through WhatsApp (section 12).

**Complaints.** After handover:

1. The sales representative gathers the request and the problem.
2. He shares it with the Production Head.
3. The Production Head assigns it to a Production Manager.

The sales representative responds to the client within 24 to 48 hours of a complaint.

**Warranty.** The warranty period is 10 years. The 10-year period starts at handover, which is also when the final payment is made (decided in v7). The sales representative decides whether a claim is covered. A claim that is not covered gets a written reason for the client. A covered claim is handled by the Production Manager, who pulls the part details from the project, has the part made, and sends someone to fit it.

OPEN: the exclusions. These will come from the company's warranty policy PDF when it is shared.

**Project close and feedback.** At project close, the system automatically asks the client for feedback over WhatsApp, with review links. The client also receives renders and videos, and is asked to tag the firm or share links to any posts they make. The sales representative is reminded to call the client in person and record how the experience went.

## 12. Alerts and the AI call agent

Core alerts use WhatsApp only. When something new arrives for a person, such as a lead group, a pending decision, a meeting or a file to review, the platform sends a WhatsApp message. If an item sits too long, the platform sends a second WhatsApp message in a different style. No phone calls are placed for alerts. This keeps AI cost down.

Access-change notices do not go to department heads on WhatsApp: they get them inside the app. The person who leaves, is deleted or is hibernated gets one final WhatsApp message and then nothing more (section 24).

The AI call agent is an optional plugin. It is not part of the core platform. A firm can switch it on or off, and the core platform works fully without it. The plugin covers the daily check-ins and the overseer, described below. Its scope is defined when the plugin is built.

**What the agent is (plugin).** An AI call agent sits alongside the people, not above them. It reminds, collects replies, and carries requests between staff and the system. It never makes a final decision on its own. Every call and reply is logged into the archive.

**Who it calls (plugin).** Staff only, for now. The agent does not call clients. Clients keep their WhatsApp and phone contact with their designer or sales representative.

**Reminder and information calls (plugin).** These record no decision:

- Meeting reminders and the warnings at 6, 3 and 1 hours before a meeting.
- Confirming a client's meeting is still on.
- Postponed call reminders for the day.
- Quotation review reminders.
- Production progress requests.
- The MD's briefing.
- Daily check-ins for everyone.

**Decision and approval calls (plugin).** These become a pending action, confirmed on screen:

- Approving or declining a meeting a design partner was tagged on.
- Accepting or rejecting a lead group, with a reason if declined.
- Approving or declining leave, and naming a cover person.
- Approving a quotation revision.
- Reassigning a rejected or idle lead.
- Answering a design question during production.

Payment confirmation is outside both groups. It stays with the MD on screen and is never voice-approved.

**Daily check-ins (plugin).**

- The sales representative receives one or two mid-day check-ins, and reports to the Sales Head.
- The Sales Head receives one daily call for the report.
- The MD receives a morning call and an evening call, plus urgent calls when needed.
- Designers are called only for meetings coming up soon that they have not answered, and for urgent updates.
- The Production Head is called only for urgent issues.

**Check-in timing.** Set per role by the MD. Exact defaults are set later.

**Urgent items.** The design partner calls the client when something is urgent. The agent informs and asks, and does not replace the human call.

**Access to data.** The AI applies the same access rules as the platform. It shares what is relevant to the person it is speaking to.

**Confirmation.** Every voice reply creates a pending action with a summary. The person confirms on screen before anything is written. Calls are recorded and transcribed into the archive. The person's identity is confirmed on the call.

**Feasibility and cost (plugin).** The agent is built on a voice platform, such as Retell, Vapi or Bland, with a phone line from a telephony provider such as Twilio, plus a language model. The official WhatsApp Business API is used for the company number. Current indicative costs, in US dollars, are around $0.10 to $0.18 a minute all-in, plus telephony and number fees. For 5 to 8 short calls a day, this is roughly Rs 3,500 to Rs 10,000 a month before storage. The vendor and exact costs are to be confirmed before purchase.

**Escalation and retry rules.** SETTLED 2026-11-18: option B, as in architecture decisions 7 and 8. Details in section 26.3.

**Overseer (optional plugin).** A company-wide AI that reads all data and answers questions across the business. It is built after the core platform, as a separate plugin, and respects the same access rules. A firm can keep it off. The overseer must be coded as an option that defaults to off for any firm that does not opt in. Its default alerts are OPEN.

**Meetbook and other transcript plugins (held).** Meetbook, a meeting-transcription tool, may later supply transcripts and approval proof as an optional plugin. Held until the architecture session. A firm can switch this plugin off, as it can the call agent and the overseer.

## 13. Leave and cover

**Who approves leave.**

- Sales representatives apply to the Sales Head.
- Designers apply to the Design Head.
- Production staff apply to the Production Head.
- All heads apply to the MD.
- The MD does not take leave.

The MD sees a live view of who is working and who is on leave. Overlapping leave is not blocked. Since projects run for months, a day or two of stalled work is acceptable.

**Cover scope.** When someone goes on leave, the head of their department chooses the cover scope. There are two options:

1. Share all of the absent person's projects with the cover person.
2. Share only selected projects or tasks.

The crew linked to the shared projects or tasks go to the cover person as well, and nothing else. The same rules apply to Production Managers and to designers.

**During cover.** The cover person gets working access to the projects in scope. The absent person can view all of his projects at any time, including the ones handed over. The owner keeps visibility.

**Return from leave.**

1. The absent person marks himself as back from leave.
2. The system asks the cover person for a handover.
3. The cover person hands the projects and crew back.
4. The head of the department is notified of the handover.

**Moving projects.** Any head can move any project to a different person at any time, not only during leave.

Leave cover is complete. The earlier open item on cover access and withdrawal is now settled by the rules above.

## 14. Payments, pay and performance

**Who is paid how.**

- Salaried: the Sales Head, the Design Head, the Production Head, the sales representative, the Marketing Head and the Production Managers.
- Production Managers receive a fixed salary set by the MD, and can submit bills for purchases and vendor costs. Those bills follow the expense chain in section 9.
- Design partners are not on salary. They earn 5% of the final quotation total.

**Salary amounts and the salary process (decided in v7).** The MD sets each person's salary amount in the platform once, as the default. He sets one limit per person, which that person can see, and he can change it at any time. When he pays, he can change the amount for that payment, then sends it to the person for approval. The MD decides per person, each time, who is paid, when, and how much. This closes the earlier open item on salary increases and deductions. The person still sees their limit, and is notified of the amount paid each time. The fixed pay dates below stay as the normal schedule, and the MD can pay off-schedule when he decides.

**Design partner payout.** The 5% is divided into the same four steps as the client's payments:

- Client pays 10%: design partner receives 1.5%.
- Client pays 50%: design partner receives 1.5%. Running total 3%.
- Client pays 35%: design partner receives 1%. Running total 4%.
- Client pays the final balance: design partner receives the remaining 1%. Total 5%.

The designer's share is always tied to what the client actually pays, and adds up to 5% of the final quotation.

**Pay dates.** Design partners are paid on the 10th, 20th and 30th of each month. Salaried staff are paid on the 30th.

**Salary process.** The MD sends salaries with a payslip or receipt attached. The receiver approves it. Design partners receive their pay in the same way on their dates.

**Design partner ledger.** The system records what the company owes each design partner at any time. Each partner can see what is expected in each of the three pay windows.

**Monthly reports.** Design partners submit a monthly financial report on their own tracking.

**Visibility.**

- The MD sees each person's figures and the company's overall position, including where the money went.
- Salaried staff see their received pay and their performance report.
- Design partners see their performance report combined with their financial report.
- The MD sees the business's performance report alongside the financial report.

**Attendance.** Attendance is tracked inside the platform. There are no fixed check-in or check-out times, since the company is remote. Work is recorded by the tasks people complete. Production Managers also track the attendance of their own crew (section 10).

**Stage durations and working window.**

- Design: 15 days. Starts when the token (10%) is paid.
- Production: 45 days. Starts when the 50% is paid.
- Installation: 5 days. Starts when the 35% is paid.
- Stages before the token (the sales and quotation steps) are timed in hours, within a window of 8 a.m. to 10 p.m.
- Work outside the 8 a.m. to 10 p.m. window is allowed. It is recorded separately and is not charged to the stage timer.
- A delay caused by the client pauses the stage timer.

**Estimates.**

- The design time estimate is given by the design partner, after the token is paid, and approved by the Design Head.
- Design-phase extensions are approved by the Design Head.
- Production and installation time estimates are set by the Production Manager and approved by the Production Head.
- Revisions to an approved estimate go back to the same approver.

**Performance rating.**

- **Weekly cycle.** The cycle runs Monday to Monday. Monday is the review day, when the report cards are checked: what was taken on and what was completed. Saturday and Sunday are the peak working days. Performance is reviewed weekly, not monthly.
- **Step timer.** Each stage has a step timer that records how long it took and who held it.
- **Traffic light, per stage.** Green: within the expected duration. Yellow: the stage passes its target. Red: the stage passes 125% of its target.
- **Client-caused delays.** A delay caused by the client never turns a stage yellow or red. The stage still shows that it was paused by the client, so the team can see the cause.
- **Personal view.** Each person sees their own rating and their weekly count of completed stages, next to the colour.
- **Heads' view.** The Design Head, Production Head and Sales Head see their team's ratings and the ratings of their projects.
- **Project rating.** Each project has an overall rating of its own, in addition to the ratings for people and teams.
- **MD's view.** The MD sees every person's rating on one page.

A delay counts against a person only when it holds a project back. A slow day alone does not count.

## 15. Marketing, sales reporting and dashboards

**Marketing Head pipeline.**

1. The Marketing Head sets up the brand template: logo, colours, fonts and the approved look for the studio. Brand data belongs to the company.
2. He chooses the content types to generate. The AI model is set by the platform, not chosen by him.
3. The system generates content and schedules posts across the chosen channels.
4. The system handles comments and replies automatically.
5. Responses and lead data come back from those channels.
6. Leads are filtered and passed to the Sales Head, who groups them as in section 3.

He supervises results and makes small adjustments, from his own dashboard.

**Marketing funnel.** The Marketing Head sees the funnel for social media, down to individual posts. For example, one reel might bring 25 leads, which produce 15 meetings, which produce 3 converted clients. He sees the percentage at each step. He also has a funnel for each channel.

**Own content.** He can add his own content alongside what the system generates.

**Project-to-content automation.** Each finished project becomes product data, which the system turns into multiple pieces of content.

**Project package.** The MD releases a finished project to the Marketing Head. He receives:

- The final files of the project.
- A brief: the final price, when the project finished, and the feedback received.

The final files are named and grouped consistently.

**Marketing Head and client details (decided in v7).** The Marketing Head sees only the final files and the brief, with no client details. This closes the earlier open item.

**Sales reporting.** The Sales Head sees:

- Where leads come from, such as social media, referrals or the calculator, and how many each source brings in.
- Conversion at each step: lead, meeting, and converted client.
- Meetings set, and how many of those the design partner converts.
- Which marketing schemes perform best.
- A weekly sales report.

The MD uses the Sales Head's dashboard to brief himself on how sales are going.

**Dashboards (decided in v7).** The sales, marketing and head dashboards are richer than simple views, but easy to read and not overwhelming. They use clear charts and graphs, including semicircle gauges.

- Each person can choose which charts appear on their own dashboard, from a wide set of options.
- Each role has a default layout when first opened, which the person can customise.
- A person's dashboard choices are saved to their account and follow them across devices.

**Scope note.** Creative options are kept light. The focus is the pipeline and its reporting.

## 16. Logging

Everything anyone does is logged in the archive, including the MD. Everything that happens in the software is logged. This covers sales calls, design decisions, uploads and approvals, quotation approvals, payment confirmations, expense approvals, reimbursements, pay approvals, settings changes, leave decisions, cover handovers, shares, BOQ changes, vendor additions, lead regrouping, performance and estimate approvals, closed project writes and MD overrides. Nothing is overwritten silently.

**Logs and corrections (decided in v7).**

- Logs are fixed once written and cannot be edited.
- A wrong entry is fixed by a new correcting entry. The original stays visible. A reason is optional.
- Corrections notify no one automatically, except that the MD is notified when a correction touches a payment.
- The MD sees the full correction log. Each department head sees corrections for their own teams.
- A person can see their own actions in the log. Department heads see logs for their own teams. The MD sees all logs.

## 17. Open items

The following are still open after v7. Items marked OPEN are not built.

1. **Warranty exclusions.** To come from the company's warranty policy PDF when it is shared (section 11).
2. **Architecture document.** Framework, database, sign-in provider, queue and integrations. Written before the build starts (section 20).
3. **Calculator and website code.** These live in the same repository and will be brought in at build time.
4. **Alert retry rules: SETTLED 2026-11-18** (section 26.3). **Overseer default alerts and check-in defaults:** still OPEN, for the optional plugins.
5. **Company conduct rules** beyond attendance. Remote work with no fixed check-in is decided.
6. **File details for the architecture session.** The exact folder and naming conventions, the retention period for archived files, and how the design partner's pinned list is ordered (section 21). These were open in v6 and no v7 decision has closed them.
7. **Meetbook plugin.** Whether and how Meetbook supplies transcripts and approval proof. Held until the architecture session (section 12).
8. **Conflicts resolved.** See section 25.

**Closed in v8:**

- The Production Manager sees everything on a live project. History requests are removed (section 23.6).
- The Sales Head sees a live project only by requesting access, from a sales representative, design partner, MD or Design Head. Anyone on the project can approve the request and add anyone (section 23.6).
- Anyone on a project can grant access to anyone (section 23.6).
- Closed-leads visibility: the Sales Head, the MD and the Design Head see all closed leads. Design partners and sales representatives see only the closed leads they worked on (section 23.1).
- When the MD ends a session, the person receives a WhatsApp message saying so (section 24).
- The Marketing Head sees the full status of each marketing spend request he raises: approved, declined and paid (section 9).
- Notices about access changes, such as hibernation or leaving, also appear in the activity log (section 24).

**Closed in v7:**

- Whether any approval type must always be confirmed by the client directly: none. The design partner can approve everything on the client's behalf.
- Notification channels for access and hibernation changes: department heads get them inside the app; the person leaving gets one final WhatsApp message, then nothing more.
- Salary increase and deduction rules: the MD decides per person, each time (section 14).
- Double-booking warnings for crew and vehicles: the platform warns the Production Manager.
- Warranty start date: handover, which is also when the final payment is made.
- Dashboard format: richer dashboards, easy to read, customisable per person.
- Marketing Head's access to client details: none. He sees only the final files and the brief.
- Client login rules: the client may act for themselves, never required; nobody logs in as a client.
- Client session window: the same 15-day rolling window as staff.

## 18. Missing business areas: status

**Finance and accounts.** Covered: production expenses, marketing spend, reimbursements, client payments, invoicing with GST, and Production Manager bills. Excluded for now: bank statement matching, office expenses, spending limits.

**Operations and site.** Covered: production inventory and BOQ, stage buying, vendors, delivery and installation dates, crew directory and attendance, double-booking warnings. Left offline: snags and quality tracking.

**Design.** Covered: technical files and their approval flow. Structural and engineering sign-off is not needed, since the firm does interiors only.

**Client experience.** Covered: complaints, the 10-year warranty, and feedback at project close.

**Company and governance.** Covered: remote work with no fixed check-in, the weekly performance cycle, onboarding by the MD, and company-wide decisions by the MD alone. Recruitment happens outside the platform. Conduct rules beyond attendance are OPEN.

## 19. Decisions already made

### Carried from v5

1. Shukra owns the platform and rents it out. First Light is the first aggregator version.
2. The platform is configurable. Business rules live in settings, not in code.
3. The software stays light, with simple, loosely connected parts.
4. Clients communicate mainly through WhatsApp and calls. The portal is for a small share.
5. The MD is the supervising chair. He approves all payments and does not take leave.
6. Only the MD confirms payments. There is no backup approver.
7. Sales representatives never approve or reject leads. They only call.
8. The Sales Head has full control over sales leads: pull, reassign, hold, regroup.
9. The AI groups leads. The Sales Head does not group by hand.
10. The four call outcomes are: successful with a meeting, could not connect, warm and call later, and not interested.
11. Every client has a unique ID. Rejected or cold clients are archived under it.
12. A paused project can be picked up later. A blacklisted client is handled outside the platform.
13. A temporary project is created when the design partner's meeting is approved, and becomes permanent when the token is paid.
14. The project team at creation: design partner, Design Head, booking sales representative, company number. Everyone stays through production.
15. The sales representative keeps full visibility of the project.
16. Design partner renders and quotations go to the Design Head for approval before reaching the client.
17. Technical files go to the Production Manager for approval, then to the client. The Design Head does not approve them.
18. The payment split is 10 / 50 / 35 / 5 on the latest quotation. The final balance is what remains.
19. Received payments are locked. All corrections are logged entries.
20. Design partners earn 5%, paid as 1.5 / 1.5 / 1 / 1 against the client's four payments.
21. Salaried staff are paid on the 30th. Design partners are paid on the 10th, 20th and 30th.
22. Salaries are sent with a payslip or receipt, and the receiver approves them.
23. Production expenses go from the Production Manager to the Production Head, then the MD, who pays and approves. The Production Manager is told of the confirmation.
24. Only the Production Manager, Production Head and MD see production expenses.
25. Marketing spend goes from the Marketing Head to the MD for approval.
26. Reimbursements can be claimed by anyone, and the MD approves and pays them.
27. No office expense category and no spending limits, for now.
28. Invoices carry the company's GST number.
29. Bank statement matching is left out of the platform.
30. The MD assigns a Production Manager after the 50% is paid.
31. The Production Head oversees all Production Managers and maintains the vendor list.
32. Each vendor gets an ID when an invoice is tagged to a project. Vendor rates are tracked for comparison.
33. Each Production Manager has a separate inventory workspace, with site tabs, a general tab and a table builder.
34. Each project has its own inventory record, built from the BOQ.
35. The BOQ can be changed at any time, and each material line has a payment date and a receiving date.
36. Purchases can be staged, and the BOQ can be filtered by stage.
37. Snags are handled offline.
38. Delivery and installation dates are set by the Production Manager with the client. Notices go through WhatsApp.
39. Clients see everything they receive on WhatsApp in their dashboard as well.
40. Complaints are raised by the sales representative and assigned by the Production Head. The sales representative responds within 24 to 48 hours.
41. At project close, feedback is requested automatically through WhatsApp, with review links.
42. Recruitment happens outside the platform. The MD onboards staff and creates their accounts.
43. Company-wide decisions are made by the MD alone. Department heads decide within their own departments.
44. The MD can write over a closed project, for example to record a refund.
45. The Sales Head sees lead sources, conversion and a weekly sales report. The Marketing Head sees a funnel per post.
46. Clients are not called by the AI for now. Staff only.
47. The AI never makes a final decision. Every voice reply becomes a pending action confirmed on screen.
48. Payment confirmation is never voice-approved.
49. Overlapping leave is not blocked.
50. The Marketing Head sets the brand template and content types. The AI model is set by the platform.
51. The Marketing Head can add his own content.
52. The MD releases finished project packages to the Marketing Head.
53. Every action by anyone, including the MD, is logged.
54. The overseer is a separate layer, built after the core.
55. Design partners approve on the client's behalf inside the software. They never enter the client's portal, and nobody logs in as a client on the client's behalf.
56. The calculator and website live in the same repository as the platform.
57. An architecture document is written before the build. Technical choices are not made by default.
58. Build work follows the guardrails in section 20.

### Added in v6

- The lead grouping uses eight fixed options only. There is no free keyword grouping.
- The Production Manager receives a fixed salary set by the MD, and can submit bills. There is no percentage cut.
- The MD sets each person's salary amount, with one limit per person that the person can see, and can change it at any time.
- The company is remote, with no fixed check-in or check-out.
- Warranty period is 10 years. The sales representative decides whether a claim is covered.
- The Marketing Head receives the final files and the brief from a finished project.
- The design estimate is approved by the Design Head. Production and installation estimates are approved by the Production Head.
- Stage durations: design 15 days (from the token), production 45 days (from the 50%), installation 5 days (from the 35%). Pre-token stages are timed in hours, within 8 a.m. to 10 p.m. Client-caused delays pause the timer.
- Performance: Monday to Monday cycle. Green within target, yellow past target, red past 125% of target. Client-caused delays never turn a stage yellow or red, but are shown as client-paused.
- Each person sees their own rating and weekly count of completed stages. Heads see their team's and projects' ratings. Each project has its own rating. The MD sees everyone's rating on one page.
- Each site is its own project. Vendor deliveries follow the receiving date. Installation trips follow the Production Manager's crew assignments.
- Crew directory, attendance and assignments are visible only to the owning Production Manager. The Production Head can open any Production Manager's profile.
- Cover after leave: the head chooses all projects or selected projects and tasks. Crew linked to them go too. The absent person keeps visibility. Return is by handover, and the department head is notified.
- Any head can move a project to a different person at any time.
- Core alerts use WhatsApp only. No phone calls are placed for alerts. A second WhatsApp message in a different style is sent when an item sits too long.
- The AI call agent and the overseer are optional plugins. A firm can switch them off, and the core works without them.
- Also settled in v6 (sections 21 to 23): file structure, logins and sessions, temporary projects, and approvals on the client's behalf.

### Added in v7

1. The client can act for themselves in the portal if they choose, but is never required to. They sign in with the same phone number the lead was created with.
2. The design partner approves on the client's behalf by default, and can approve everything. No approval type needs the client directly. Approvals by phone call, WhatsApp or Google Meet are logged with the client's words and a timestamp.
3. Nobody logs in as a client on the client's behalf. The project runs without the client's login.
4. Client sessions follow the same 15-day rolling window as staff.
5. Every lead with a meeting gets a temporary project, visible to the design partner. It becomes permanent only when the token amount is paid. Quoted-but-lost leads move to a separate closed-leads file.
6. When the MD confirms a payment, the design partner is notified on WhatsApp automatically and the client receives an automatic receipt. The design partner does not approve payments.
7. The design partner sees everything on the project from the first lead, including full client details. The MD keeps control of payments and company-level records.
8. The Production Manager sees the latest project brief, the address and other current details, and no history by default. He requests history; the design partner approves; if the design partner is unavailable, the Design Head approves. (Superseded in v8: the Production Manager sees everything on a live project. See section 23.6.)
9. Logs are fixed once written. A wrong entry is fixed by a new correcting entry, with an optional reason. Corrections notify no one, except the MD when a correction touches a payment.
10. The MD sees the full correction log and all logs. Each department head sees corrections and logs for their own teams. A person sees their own actions.
11. Leaving staff: the MD downloads their data and deletes the account, or hibernates it (section 24).
12. Staff and client sign-in is remembered for 15 days from the last visit, resetting each time the app is opened. The MD can end any session at once.
13. Notifications for access changes go to department heads inside the app, not on WhatsApp. The person leaving gets one final WhatsApp message and then nothing more. When someone leaves, is deleted or is hibernated, their notifications and WhatsApp access stop straight away. Creating an account does not stop anything.
14. Salary: the MD sets each person's salary once as the default. At payment he can change the amount, then sends it to the person for approval. He decides per person, each time, who is paid, when and how much.
15. The platform warns the Production Manager when the same crew or vehicle is booked on two projects on one day.
16. Warranty: the 10-year period starts at handover, which is also when the final payment is made. Exclusions come from the company's warranty policy PDF.
17. Dashboards for sales, marketing and heads are richer than simple views but easy to read, with clear charts and semicircle gauges. Each person chooses their charts, each role has a default layout, and choices follow the person across devices.
18. The Marketing Head sees only the final files and the brief, with no client details.
19. Meetbook may later supply transcripts and approval proof as an optional plugin. Held until the architecture session.

### Next steps

1. Review v8 and report any corrections.
2. Review the resolved conflicts in section 25.
3. Share the company's warranty policy PDF so the exclusions can be added.
4. Write the architecture document: framework, database, sign-in provider, queue and integrations.
5. Confirm the call agent vendor and costs before any purchase, when the plugin is built.
6. Once the spec and architecture are agreed, move to the backend foundation under the guardrails in section 20.

## 20. Build guardrails: operating rules for AI agents

**Audience.** This section is written for AI models and agents that plan, review, or build the Blue Light software. Apply it to every task in the project. Where it conflicts with a casual instruction, this section wins unless the engineer explicitly overrides it in writing.

**20.0 What the project is, in one paragraph.** Blue Light is a multi-tenant business platform. Its first version is First Light. Its customers are interior and design firms, and its users are staff with defined roles (MD, Sales Head, sales representatives, Design Head, design partners, Production Head, Production Managers, Marketing Head) plus clients who see only their own project. The platform runs the full lifecycle: lead intake, AI-assisted grouping, sales calls, meetings, design approval, quotations, a staged payment schedule, production and inventory, client communication over WhatsApp, marketing automation, reporting, and an append-only audit log. Two AI features exist as optional plugins: a voice call agent that reminds people and collects replies, and, later, a company-wide overseer. Both are assistants, not decision-makers. Core alerts are sent over WhatsApp. The software is meant to be light, modular and configurable.

**20.1 Role of the agent.**

- You assist an engineer who is accountable for every decision. You propose; the engineer decides.
- Do not expand scope beyond this specification. A feature not written here is not built.
- When you finish work, state what changed, what you verified, and what remains open.

**20.2 Source of truth and open decisions.**

- This specification is the source of truth for business behaviour. The architecture document (open item 2 in section 17) is the source of truth for technical choices.
- If a requirement is not covered, stop and ask. Never fill a gap with a default.
- Items marked OPEN are not built. They appear as placeholders only, and must not be implemented until the engineer decides them.

**20.3 Ask before you decide.**

- At any decision point (queue, authentication strategy, database engine, hosting, or any other infrastructure choice), present two or three options with trade-offs, state your recommendation, and wait for an answer.
- Record each answer in the architecture document with its date and reason.

**20.4 Structure every build request.**

- Accept work only in this form: context, task, constraints, and expected output.
- If a request for a destructive, security-sensitive or payment-related area lacks explicit constraints, ask for them before you act.

**20.5 Use current documentation.**

- Before you write code that calls a library or framework, read the current official documentation for the version in use, through the documentation connector provided (for example, MCP).
- Do not rely on memory for API signatures. If the documentation marks a method as deprecated, use its replacement and note the change.
- Confirm the version in the lockfile before relying on any API.

**20.6 Design.**

- Use the design tokens, spacing rules and component conventions defined for Blue Light. Do not produce generic default styling.
- Brand data (logo, colours, fonts) belongs to each tenant. Never hard-code a tenant's brand.

**20.7 Destructive and sensitive actions require human approval.**

- Any schema change, migration, data deletion, bulk update, or change to a payment record requires explicit human approval before it runs.
- Never run a destructive action against production. Never run one as a side effect of another task. If you believe data is unused, report it. Do not remove it.
- Payment confirmation is a human-only action (section 9). Refunds are recorded by the MD writing over a closed project, which is also human-only and logged.

**20.8 Access control is enforced on the server.**

- Enforce role-based access in the database layer (row-level security) and in the server API, never only in the interface.
- Every role sees only what section 2 allows. Clients see only their own project.
- Treat any query that returns another client's data, staff-only costs, or vendor details to a client as a defect.

**20.9 Money.**

- Store amounts in exact integer units (paise), not floating-point numbers.
- Compute the payment split on the latest accepted quotation (section 9). Round only at the final step, and show the reconciliation.
- A received payment is immutable. A correction is a new entry that references the original.

**20.10 Audit log.**

- Every state change writes an append-only log entry with the actor, the time, the object, and the before and after values.
- No log entry is ever edited or deleted. A correction is a new entry.

**20.11 Tests.**

- Write automated tests before or with each feature. At minimum, cover: stage gates, the payment split arithmetic and the reconciliation example in section 9, quotation revisions, the approval routes, role-based access for every role, the four call outcomes, the traffic light thresholds (yellow past target, red past 125%), and the client-delay exclusion.
- Tests run in continuous integration on every change. A failing test blocks the change.

**20.12 Review.**

- Every pull request receives an automated AI review and a human review.
- An AI reviewer may recommend changes. It may not approve or merge a change on its own.

**20.13 Environments.**

- Every release passes through a staging environment before production.
- Schema changes are applied to staging first and verified there.

**20.14 Monitoring.**

- Production runs error monitoring from the first release.
- Monitoring may triage failures and propose a fix as a pull request. A human reviews and approves any fix before it is deployed.

**20.15 AI agents inside the product.**

- The voice call agent and the overseer act only through pending actions. A pending action is shown on screen, and a human confirms it before anything is written.
- They never approve, reject, pay, refund, or delete on their own.
- Every call is recorded and transcribed into the archive, and the caller's identity is confirmed on the call.
- The agent does not call clients in the current phase (section 12).
- Core alerts are sent by WhatsApp and do not involve any AI decision.

**20.16 Scope discipline.**

- Do not add features that are not written in this specification.
- Keep the software light. Prefer simple, loosely connected modules over a single heavy system.
- Do not add dependencies or services without first recording the reason in the architecture document.

**20.17 Reporting back.**

- For every task, report: what changed, which tests and checks ran and their results, which guardrails applied, and which items remain open.

## 21. File structure

This section records how files are stored and when they change. It is the business view. Technical storage choices are made in the architecture document.

**Principle.** The project record is the central container. Files are grouped inside it by stage and type, and each file keeps its own version history. Nothing is deleted. Old versions are kept and archived.

**21.1 Client files**

- After the Design Head approves a render or quotation, it appears on the client's dashboard. Only approved versions are visible to the client.
- The design partner pins the files he wants at the front of the client's dashboard. Nothing is pinned automatically. The latest version of each file always shows there.
- Old versions sit in a separate history section, which the client opens on purpose. History is grouped by date.
- Each version carries a short brief of what changed from the version before. The client sees this in the history.
- Old versions are view-only on screen. Current versions can be downloaded.
- Files still under review are not visible to the client.
- Rejected versions stay visible to the team, with the reason. The client never sees them.
- Finished projects stay in the client's dashboard, and the client can log in to view them at any time.
- A returning client gets a new, separate project. Old projects are not linked to new ones.

**21.2 Project files**

- The BOQ and the signed quotation sit inside the project record. The signed quotation is locked and versioned, never edited.
- The stage history is a separate, append-only log linked to the project. Everyone on the project can open it.
- When a project is paused, its stage history and files stay readable. Nothing changes until it resumes.

**21.3 Production files**

- Each Production Manager's workspace (stock, vendors, crew) stays with him. Projects link to the parts that belong to them.
- Each vendor invoice belongs to both the vendor record and the project it is tagged to.
- If an invoice is tagged to the wrong project, the Production Manager corrects it. The original tag stays in the log, and the correction is a new entry. The correction is only logged and notifies no one, except that the MD is notified when a correction touches a payment (confirmed in v7).

**21.4 Company files**

- Company files sit in one folder that the MD manages.
- Payslips are visible only to the person who received the money, and to the MD.
- Reimbursement receipts are kept separate from payslips.

**21.5 Marketing files**

- The brand template sits in the Marketing Head's workspace. He can edit it at any time. Every change is kept as a version, with what changed and when.
- Each published post is kept in his workspace, under post history, with its performance numbers for leads, meetings and conversions.
- Finished project packages stay in the project record. The MD shares access to them, and the Marketing Head opens them from his dashboard. He sees only the final files and the brief, with no client details.

OPEN: the exact folder and naming conventions, the retention period for archived files, and how the design partner's pinned list is ordered. These are for the architecture session.

## 22. Logins and sessions

This section sets how each role signs in and how long a sign-in is remembered. Technical choices (auth provider, cookie details) are made in the architecture document.

**22.1 Staff sign-in**

- Staff sign in with their business email on the company domain, hosted with Miles Web.
- The MD creates every staff account. Nobody self-registers.
- A staff sign-in is remembered on the device. It survives closing the app, the tab or the browser.
- The memory is a rolling window. Each time the person opens the app, the window resets. A person who opens it at least every few days never has to sign in again.
- If the person does not open the app for the full window, the session lapses and they sign in again.
- The window is 15 days by default, counted from the last visit, and is an editable setting that the MD controls.
- Sessions are held on the server, so the MD can end any of a person's sessions at once. Ending a session signs that device out immediately, and the person must sign in again before seeing anything. This is used for lost or stolen devices and for leavers.

**22.2 Client sign-in**

- Clients sign in with their mobile number and a one-time code (OTP). The mobile number is mandatory. It is the same phone number the lead was created with.
- Clients may also link a Google account. This is optional, and the number and OTP remain the main method.
- A client's sign-in is remembered on the device, with the same rolling window as staff.

**22.3 Staff and client sessions in use**

- Logging out ends the session on that device.
- Changing the login ID (email or number) ends all existing sessions for that account.
- Every client follows the same rolling session rule as staff in 22.1. The window is 15 days by default, it resets each time the client opens the app, and the MD can end a client's sessions at once.
- The earlier open items on the client window length, who may act for a client, and how staff log in as a client are closed (sections 23.2, 23.3 and 23.6).

## 23. Leads, temporary projects and approvals

**23.1 Temporary projects**

- Every lead that has a meeting gets a temporary project, visible to the design partner.
- A temporary project becomes permanent only when the token amount is paid.
- Leads that were quoted but not won are moved to a separate closed-leads file. They are kept for reference and reporting, and are not mixed with live projects. The Sales Head, the MD and the Design Head can see all closed leads. Design partners and sales representatives see only the closed leads they worked on.

**23.2 Client access**

- The client never has to log in to work with the project. The design partner is the client's front point.
- The client can act for themselves in the portal if they choose, but is never required to. When they do, they sign in with the same phone number the lead was created with.
- The client is mainly a viewer: they see progress, download files, and pay through UPI.
- Phone verification with OTP is required before the token payment and the invoice are issued, because that is when the client commits money.
- Nobody logs in as a client on the client's behalf. The project runs without the client's login.

**23.3 Approvals**

- The design partner approves on behalf of the client by default, for all items. He can approve everything. No approval type needs the client directly.
- The client can agree by phone call, WhatsApp message or Google Meet. The design partner records the client's words and a timestamp against the approval, so there is proof the client agreed.
- Every approval made this way is logged in the client's name, with the design partner's name beside it.

**23.4 Meeting transcripts and plugins**

- Meeting transcripts and approval proof may later come in through an optional plugin. Meetbook, a meeting-transcription tool, is one such option. Its choice is held until the architecture session.
- The transcript and approval-proof plugin, like Meetbook, is optional. A firm can switch each plugin off.

**23.5 Payment confirmation**

- The client receives a payment request and pays by UPI.
- The client shares the payment proof on WhatsApp. The design partner forwards it to the MD.
- The project moves forward only after the MD confirms that the payment was received.
- The MD's confirmation is logged against the payment proof image and the amount, so it can be checked later.
- When the MD confirms, the design partner is notified automatically on WhatsApp, and the client receives an automatic receipt.
- Payments are not approved by the design partner.

**23.6 Access to a live project**

- The design partner sees everything on the project from the first lead, including full client details. The MD keeps control of payments and company-level records.
- The Production Manager sees everything on a live project.
- The Sales Head sees a live project only by requesting access. The request can go to a sales representative, a design partner, the MD or the Design Head.
- Anyone already on a project can approve an access request, and can add anyone to the project.
- Anyone on a project can grant access to anyone.

**23.7 Payment proof reading (optional)**

- A general AI vision model may read the amount from a payment proof image and show it as a suggestion.
- The reader is an optional aid, not a check. Nothing is marked as checked by the software.
- The MD looks at every proof and makes the decision.
- The MD can flag a payment and reject it, with a reason.
- Every flag and rejection is logged. If the reader is switched off, the MD checks proofs as usual.

## 24. Leaving staff and hibernation

- When a staff member leaves, the MD either downloads their data and deletes the account, or puts the account into hibernation.
- Before deciding, the MD can reassign that person's open projects. The old owner then keeps read access to the project history only.
- A hibernated account can be reactivated by the MD and shows as inactive until then.
- Deleting an account removes only the login. Projects are kept. The person's name stays on everything they were tagged to, with a "former staff" label.
- The MD sees one list of all hibernated and deleted accounts.
- Department heads request access to one person's hibernated account from the MD. The approval lasts until the MD removes it. The department head is notified when access is given or removed.
- Notifications for these access and hibernation changes do not go on WhatsApp for department heads: they get them inside the app, and each notice also appears in the activity log. The person who leaves, is deleted or is hibernated gets one final WhatsApp message, after which they receive no more messages.
- When someone leaves, is deleted, or is hibernated, their notifications and WhatsApp access stop straight away. Creating an account does not stop anything.
- The MD can end any session at once, for lost devices or leavers (section 22.1). The person is signed out and receives a WhatsApp message saying their session was ended.

## 25. Conflicts resolved

These six places, where a v7 decision and an older v6 line clashed or were unclear, were confirmed with you by voice. The text above already follows these answers.

- **C1. Invoice-tag corrections.** No exception. Corrections are only logged. A correction that touches a payment notifies the MD. New versions, such as a revised quotation or a new design, still notify the people in charge.
- **C2. Design partner acting for the client.** The design partner approves on the client's behalf. He never enters the client's portal.
- **C3. Salary limit.** The person still sees their limit, and is also notified of the amount paid each time.
- **C4. Pay dates.** The fixed dates stay as the normal schedule. The MD can pay off-schedule when he decides.
- **C5. AI supervisor layer.** Removed as a separate term. The transcript and approval-proof plugins, such as Meetbook, are optional, alongside the call agent and the overseer.
- **C6. Channel for access changes.** The person who leaves, is deleted or is hibernated gets one final WhatsApp message, after which they receive nothing more. Department heads get their access notices inside the app.


## 26. Decisions of 2026-11-22 (merged from the app flow)

### 26.1 Rejected payment

1. The MD rejects a proof with a reason. The rejection goes to the department head who owns the project. For a client payment, that is the Design Head.
2. The department head either fixes it and sends it back to the MD, or tags the people involved (a design partner, a representative or anyone related to the project) to make the changes.
3. A tagged person sees the rejection and the related project only. Nobody who is not tagged sees it.
4. Work can pass in either direction along the chain (MD, department head, representatives, design partners) and returns to the MD.
5. The client is handled the same way. The associated representative or design partner talks to the client and acts on the client's behalf.
6. **Decided:** the client resubmits a corrected proof, and the stage waits until the MD confirms it.

### 26.2 Call retry cycle, stalled quotes and the unresponsive archive

**Cycle, first pass**
1. Day one: the representative calls. Not reached: a WhatsApp message with catalogues matched to the client's requirements.
2. Next day: the representative calls. Not reached: three hours later, a WhatsApp message with testimonials.
3. After one day: the representative calls again. Not reached: a WhatsApp message with sample videos and more material.
4. Then a 7-day wait.

**Second pass**
5. The cycle is repeated once.
6. If the client is still not reached, the lead goes to the **unresponsive archive**.

**Other outcomes**
- Any connected call is logged with its time and result.
- A time given by the client is booked for a call the next day and logged.
- "Indefinite delay" (the client postpones with no date) moves the lead to the archive.
- A representative may log "active but not responding" when the client has read a message but not replied.

**Unresponsive archive**
- It is separate from the closed-leads file and the cold archive.
- A representative cannot delete a lead here. They can call it again at any time.
- Each representative sees their own leads. The Sales Head and the MD see all of them.
- A lead returns to active work when someone picks it up manually, or when the representative sets a return date with a separate button, which moves the lead into a scheduled list.
- On the scheduled date, the lead returns to the representative with the project brief (section 26.6).
- The Sales Head can bring any lead back at any time and reassign it.

**Stalled quote (values confirmed 2026-11-22; changeable later in tenant settings)**
- A client who holds a quote but keeps stalling: the lead stays live and is not moved to closed leads.
- Each follow-up adds something new: a catalogue, sample work, a video or a call.
- Follow up after 3 days of silence. Up to 3 follow-up rounds.
- A new meeting after the second round, booked on the same temporary project.
- After the third round with no decision, the lead moves to the closed-leads file as "not won".

### 26.3 Alert retries (settled 2026-11-18)

- Option B from the alert retry draft (v0.1), as summarised in architecture decision 7 and 8: bounded retries by alert class, retrying only transient failures, then an in-app Delivery Problems list and a count on the MD dashboard.
- Time-critical: 3 attempts. Standard: 4. Digest: 2. Exit notice: 1.
- No phone call, SMS or department-head channel for core alerts.
- Core alerts are approved WhatsApp templates, sent by content SID with their variables. A message sent without an approved template fails with error 63016 (verified against Twilio's documentation, 2026-11-22).
- **Decided:** a retry that falls due outside the 8 a.m. to 10 p.m. window waits until 8 a.m. The retry draft's "no quiet hours" recommendation is replaced by this window (section 26.8).

### 26.4 Project WhatsApp group at handover

1. When a representative hands a confirmed client to a design partner, the software creates a WhatsApp group for that client.
2. The group includes the representative, the design partner, the Design Head and the group's own company WhatsApp number, which sends the group messages.
3. **Joining:** clients join by invitation link, sent as an approved template. This is confirmed by the owner (2026-11-22). Meta's documentation states participants cannot be added manually.
4. Until the client is in the group, messages go to the client's private number. Once they are in, all messages go to the group.
5. Anyone added to a project is added to its group by the software.
6. **Decided 2026-11-22:** groups use a separate company WhatsApp number, set up for group features on Meta's Cloud API. Twilio carries all other messages and alerts from the main number. To verify before build: a direct add works on the group number (test group).

### 26.5 Design partner absent during the token stage

1. The Design Head receives an immediate alert on the project.
2. The alert suggests design partners, split by region and by workload, shown side by side.
3. The Design Head chooses one. That design partner gets full access to the project and is added to its group.

### 26.6 Project visibility

1. Anyone on a project can see its current status and its history: what has happened, what was agreed and what is pending.
2. Anyone on the team can answer a client's question about the project from the project itself.
3. Access beyond this follows section 23.6: a request, approved by someone already on the project.

### 26.7 Default dashboards by role

| Role | Default charts |
|---|---|
| MD | Payments received against due; team performance; pipeline funnel; delivery problems |
| Sales Head | Lead sources; conversion funnel; call outcomes; team and project ratings |
| Sales representative | My calls today; my follow-ups due; my weekly count; my rating |
| Design Head | Renders and quotations awaiting approval; meetings this week; team and project ratings; estimates pending |
| Design partner | Temporary projects before the token; live projects, each with its stage and days left; next deliverables due; new client requirements and add-ons raised since the last visit; time remaining on each design phase; payments due to me; my ledger; my rating |
| Production Head | Projects reaching production; expenses awaiting approval; crew on site; vendor spend |
| Production Manager | Deliveries and installations this week; material payments due; crew attendance; my rating |
| Marketing Head | Funnel per post; channel performance; spend requests and status; brand template status |

### 26.8 Messaging window

1. All WhatsApp messages, automatic and manual, are sent between **8 a.m. and 10 p.m.**
2. Stage time for pre-token work is also measured within this window.
3. This replaces the earlier 9 a.m. to 9 p.m. window everywhere in this specification.
4. Work done outside the window is still allowed. It is recorded separately and is not charged to the stage timer.
5. Retries that fall outside the window wait until 8 a.m. (section 26.3).

### 26.9 Targets

The ten starting targets for success metrics are in the goals and success-metrics document (version 3). They are changeable by the MD.

### 26.10 Still to be written

- **Written:** the tenant settings document (First_Light_Tenant_Settings_v1). It lists every changeable value, gives each company its own copy and logs each change.
- The in-app Delivery Problems screen, and the exact wording of the design partner absence alert. Both go in the UI/UX brief.

### 26.11 Google Meet links (new, 2026-11-22)

1. When a design partner or sales representative agrees a meeting time with the client, the software creates a Google Meet link automatically.
2. The link is created from **one company Google Workspace account on the company domain**, held by the software. Nobody logs in to create it, and no personal Google account is used.
3. If the client is in the project WhatsApp group, the link is posted to the group.
4. If the client is not yet in the group (for example, the first call or first meeting), the link goes to the client's private number. The team member sees a one-tap WhatsApp button to send it from their own WhatsApp.

### 26.12 Pre-written messages (new, 2026-11-22)

1. The company holds a library of pre-written messages, one for each situation. Examples: first contact, meeting link, meeting reminder, catalogue follow-up, testimonial follow-up, sample videos, request for a call time.
2. Each message fills in the client's name and the related project details automatically.
3. Each message is sent automatically from the company number when its trigger occurs. There is no manual send (owner, 2026-11-22).
4. Anyone may edit the library text. A changed message needs WhatsApp template approval again before it is used, so the edit is not instant.
5. Every pre-written message is an approved WhatsApp template, sent by content SID (26.2 and 26.3).

### 26.13 Client joining the group

1. The software sends the client an invitation link, as an approved template, when the group is created.
2. Until the client joins, messages go to the client's private number.
3. The invitation template needs approval before the first handover.

### 26.14 One-off messages (decided 2026-11-22)

A one-off message is written for one client at one moment and is not in the pre-written library. Two options are kept:

1. **Free text from the company number.** Allowed only if the client has messaged the company within the last 24 hours. The person may edit the text just before sending. Outside that window, the software refuses free text and requires an approved template (error 63016 otherwise).
2. **Manual send from the person's own WhatsApp.** Free and instant. The software cannot see it, so it is not tracked, and it does not count toward retries or delivery records.

