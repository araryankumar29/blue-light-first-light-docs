# First Light · Production Manager wireframes v1

Plain-text version of the wireframe set. Each board lists its phone screens with numbered components, and each requirement page lists the rules for those screens. Bracketed values such as [14] are placeholders.

_Version 1 · 22 November 2026 · for cross-check_

## First Light · Production Manager wireframes

Four boards and four requirement pages, sixteen phone screens. The Production Manager runs factory and site work for each project the MD assigns: the BOQ, materials, inventory, vendors, invoices, deliveries, crew, the schedule, and expense requests that follow the approval chain.

Sources: sitemap pages for the Production Manager, the access matrix and the specification's Production Manager powers (sections 9, 10, 13).

## Conflicts settled

| Item | What the sources say | Decision and why |
|---|---|---|
| Crew visibility | Spec: Production Head can open any PM's profile and see where each crew member is. Sitemap: crew assignments and attendance visible only to the owning PM. | Both. The Production Head sees where each crew member is through the PM's profile, as the spec says. Attendance detail stays with the owning PM. |
| Expense chain | Spec and sitemap agree: PM raises, PH checks and approves, MD pays, PM acknowledges. PM bills follow the same chain. | As written. |
| Tab bar | Sitemap: stock reachable from the tab bar; workspace is the PM's own. | Home, Projects, Stock, Workspace, More. |
| Technical files | Spec: PM approves; Design Head does not approve technical files. | As written. |
| Snags and quality checks | Sitemap: handled offline, no screen in this version. | No screen built. Shown as a note only. |

## Cross-check · what was verified

- Every screen maps to a Production Manager page in the sitemap or to a power in the specification.

- Expenses are visible only to the Production Manager, the Production Head and the MD.

- Crew and attendance are visible only to the owning Production Manager.

- Stock is reachable from the tab bar.

- The Design Head does not approve technical files.

- Money fields show placeholders in brackets; no rupee figures are invented.

## Production Manager wireframes · 1 of 4 · Home, projects, technical files

The Production Manager's home shows the week, payments due and double-booking warnings. Projects are the ones the MD assigned after the 50 percent payment.

### Home

This week, payments due, double-booking.

**Components**

1. **Header**: Title centre. Logout top right.
2. **This week**: Deliveries and installations this week, from the schedule.
3. **Payments due**: Stock payments due this week, with the date.
4. **Double-booking warning**: Shown when a crew member or vehicle is booked twice on one day.
5. **Tab bar**: Home, Projects, Stock, Workspace, More. Stock is on the tab bar, as the sitemap requires.

### Projects

Assigned live projects only.

**Components**

1. **Header**: Search right.
2. **Assigned projects**: Projects the MD assigned to this Production Manager, after the 50 percent payment.
3. **Live project rule**: Full visibility of a project once assigned.
4. **Tab bar**: Projects active.

### Project

Summary, actions and dates.

**Components**

1. **Header**: Back.
2. **Project summary**: Stage and what was handed over.
3. **Project actions**: Build the BOQ, check inventory, upload technical files.
4. **Dates**: Delivery and installation dates, set with the client.

### Technical files

Approve, then send to client.

**Components**

1. **Header**: Back.
2. **Technical file**: File received from the designer.
3. **Approve, then client**: The Production Manager approves; the Design Head does not.
4. **Rule**: No file reaches the client before the Production Manager approves.

## Requirements · home, projects, technical files

The Production Manager runs factory and site work once the MD assigns a project after the 50 percent payment.

### Home

The home shows this week's deliveries and installations, material payments due, and any double-booking warning. A warning names the crew member or vehicle and the clashing project.

**Rules and states**

- Week at a glance
- Payments due
- Double-booking warning

**Sources**

Sitemap home-pm; spec §10 (double-booking warning).

### Projects

Projects are the ones the MD assigned to this Production Manager. Once assigned, the Production Manager sees everything on the live project.

**Rules and states**

- Assigned by the MD
- Full visibility on a live project

**Sources**

Spec §10 and the production handover (MD assigns after 50 percent).

### Project

The project screen shows its stage, the approved design files and signed quotation received, and the dates. The Production Manager sets delivery and installation dates with the client.

**Rules and states**

- Stage and handover
- Dates set with client

**Sources**

Spec §10; sitemap project-home.

### Technical files

The Production Manager approves technical files from the designer, then they go to the client for verification. The Design Head does not approve technical files.

**Rules and states**

- PM approves
- Design Head does not approve
- Client verifies after PM

**Sources**

Sitemap technical-files (Design Head does not approve).

## Production Manager wireframes · 2 of 4 · BOQ, materials, inventory, workspace

The BOQ is built from the approved quotation and can change at any time, with each change logged. Materials are bought in stages and expenses go to the Production Head.

### BOQ builder

Lines from the quote, edits logged.

**Components**

1. **Header**: Back.
2. **BOQ source**: Lines built from the approved quotation; the signed quotation travels with it.
3. **Lines**: Each line shows its source: from the quotation or edited.
4. **Add and compare**: Manual lines; a view of what differs from the quotation.

### Materials

Staged purchases; expense requests.

**Components**

1. **Header**: Back.
2. **Staged purchases**: Material bought in stages against the BOQ.
3. **Raise request**: Request with project, amount and vendor. Goes to the Production Head.
4. **Acknowledge**: The MD's payment confirmation returns to this screen.

### Inventory

Built from the BOQ; shared automatically.

**Components**

1. **Header**: Back.
2. **Inventory**: Each project's inventory record, from the BOQ.
3. **Adjust**: A quantity change needs a reason.
4. **Sharing**: Automatic sharing with the Production Head and MD.

### My workspace

Site tabs, general tab, table builder.

**Components**

1. **Header**: Back.
2. **Site tabs**: One tab per site: its vendors and invoices.
3. **General tab**: Contacts and the inventory register.
4. **Table builder**: Type a category such as laminates; a ready table with starter rows.

## Requirements · BOQ, materials, inventory, workspace

The BOQ is the working list for the project. It can change at any time and every change is logged.

### BOQ builder

The BOQ is built from the approved quotation, and the signed quotation travels with it. The Production Manager can add lines, edit quantity or rate, and see what changed against the quotation. Every change is logged.

**Rules and states**

- Built from approved quote
- Every change logged
- Compare to quote

**Sources**

Sitemap boq; spec §10.

### Materials

Materials are bought in stages. A purchase request carries project, amount and vendor, and goes to the Production Head, then the MD. The MD's payment confirmation returns to the Production Manager, who acknowledges it.

**Rules and states**

- Staged purchases
- Expense chain to MD
- Acknowledge payment

**Sources**

Spec §9 (production expense chain).

### Inventory

Each project has its own inventory, built from the BOQ. Adjusting a quantity needs a reason. It is shared automatically with the Production Head and MD.

**Rules and states**

- Built from BOQ
- Adjust with reason
- Shared automatically

**Sources**

Sitemap inventory.

### My workspace

Each Production Manager has a standalone workspace: a tab per site with its vendors and invoices, a general tab with contacts and the inventory register, and a table builder that starts a category with starter rows.

**Rules and states**

- Site tabs
- General tab
- Table builder with starter rows

**Sources**

Spec §10 (Production Manager's own workspace).

## Production Manager wireframes · 3 of 4 · Stock, vendors, invoices, deliveries

Stock and vendor payments are on the tab bar. Invoices belong to both the vendor and the project, and corrections are logged.

### Stock

Payments due, categories, shortfalls.

**Components**

1. **Header**: Search right.
2. **Payments due**: Material payments due this week.
3. **Categories**: Starter categories, to be customised.
4. **Add and flag**: Add stock received; flag a shortfall.
5. **Tab bar**: Stock active.

### Vendors

Vendor list and catalogues.

**Components**

1. **Header**: Search right.
2. **Vendor list**: The vendor list and catalogues.
3. **Add vendor**: New vendor record.

### Invoice

Upload, tag to project, correct.

**Components**

1. **Header**: Back.
2. **Upload and tag**: Tagging to a project gives the vendor an ID.
3. **Correct a tag**: Correction notifies the Production Head.

### Deliveries

Expected by date; report problems.

**Components**

1. **Header**: Title only.
2. **Expected and received**: Deliveries by receiving date.
3. **Report a problem**: A short or damaged delivery is reported here.

## Requirements · stock, vendors, invoices, deliveries

Stock and vendor payments are on the tab bar. Invoices belong to both the vendor and the project.

### Stock

Material payments due this week, stock by category, adding stock in, and flagging a shortfall.

**Rules and states**

- Payments due this week
- Stock by category
- Flag shortfall

**Sources**

Sitemap stock.

### Vendors

The vendor list holds each vendor's catalogue. The Production Manager and Production Head both see vendor catalogues.

**Rules and states**

- Vendor list
- Catalogues

**Sources**

Sitemap vendors; spec on the Production Head's vendor list.

### Invoice

An invoice is uploaded and tagged to a project, which gives the vendor an ID. Each invoice belongs to the vendor record and the project. A wrong tag is corrected with a reason; the Production Head is notified and the original stays in the log.

**Rules and states**

- Tagged to project, gives vendor ID
- Correction notifies Production Head
- Original kept in log

**Sources**

Sitemap invoices.

### Deliveries

Vendor deliveries follow the receiving date. The Production Manager marks a delivery received, or reports a short or damaged one.

**Rules and states**

- Expected by receiving date
- Report short or damaged

**Sources**

Sitemap deliveries.

## Production Manager wireframes · 4 of 4 · Crew, schedule, expenses

Crew stays visible only to the Production Manager who owns it. Dates are set with the client, and expense requests follow the chain to the MD.

### Crew

Directory, assignments, owned crew only.

**Components**

1. **Header**: Search right.
2. **Crew directory**: Crew with skills and today's site.
3. **Assign**: Assign crew to a project and date.
4. **Visibility rule**: Crew visibility is limited to the owning PM.

### Schedule

This week; installations with the client.

**Components**

1. **Header**: Title only.
2. **This week**: Deliveries and installations this week.
3. **Set and reschedule**: Dates are set with the client; reschedules need a reason.
4. **Double-booking**: Warning on the date itself.

### Double-booking

Warning names crew and project.

**Components**

1. **Header**: Back.
2. **Warning**: Names the crew member or vehicle and the clashing project.
3. **Choose**: Go ahead anyway, or change the date.

### Expense request

Raise; status through the chain.

**Components**

1. **Header**: Back.
2. **Request fields**: Project, amount, vendor and reason.
3. **Submit**: Goes to the Production Head, then the MD.
4. **Status**: Each step of the chain, visible to the PM.

## Requirements · crew, schedule, expenses

Crew, schedule and expenses are the Production Manager's day-to-day. Crew visibility is restricted to the owning manager.

### Crew

Each Production Manager keeps a crew directory with skills and availability, and assigns crew to projects and dates. Crew assignments and attendance are visible only to the owning Production Manager.

**Rules and states**

- Owned crew only
- Assign by project and date

**Sources**

Sitemap crew; spec §10.

### Schedule

This week's deliveries and installations sit on the home. Installation dates are set with the client; a reschedule needs a reason. A double-booking warning appears on the date.

**Rules and states**

- Set with client
- Reschedule with reason
- Double-booking on date

**Sources**

Sitemap schedule.

### Double-booking

The platform warns when the same crew member or vehicle is on two projects on one day. The Production Manager can go ahead anyway or change the date.

**Rules and states**

- Named crew or vehicle
- Go ahead or change date

**Sources**

Spec §10; sitemap double-booking.

### Expense request

Expense requests and bills follow the same chain: the Production Manager raises it, the Production Head checks it, the MD pays and marks it approved, and the Production Manager acknowledges it. Expenses are visible only to those three roles.

**Rules and states**

- Chain: PM, PH, MD, PM
- Visible only to three roles

**Sources**

Spec §9 (production expenses); sitemap production-expense.
