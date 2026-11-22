# Blue Light: AI Context Brief

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
