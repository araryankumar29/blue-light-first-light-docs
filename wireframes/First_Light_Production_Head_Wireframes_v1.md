# First Light · Production Head wireframes v1

Plain-text version of the wireframe set. Each board lists its phone screens with numbered components, and each requirement page lists the rules for those screens. Bracketed values such as [14] are placeholders.

_Version 1 · 22 November 2026 · for cross-check_

## First Light · Production Head wireframes

Four boards and four requirement pages. The Production Head checks production expenses before the MD, approves estimates and leave, maintains the vendor list, oversees every production manager and chooses cover. The delivery problems screen is held. A fourth board covers the interim combined role.

Sources: sitemap pages for the Production Head, the access matrix and the specification's Production Head powers (sections 9, 13).

## Conflicts settled

| Item | What the sources say | Decision and why |
|---|---|---|
| Combined role | Spec: Production Head currently also acts as a Production Manager. | Kept as an interim board, separate so it can be removed when roles split. |
| Crew visibility | Spec: Production Head sees where each crew member is. Sitemap: attendance visible only to owning PM. | Location through the profile, as the spec says. Attendance stays with the owning manager. |
| Delivery problems | Sitemap: awaiting owner approval (open item 16). | Held. Not built. |
| Expense chain | Spec: the Production Head checks every expense before the MD. | As written. |
| Tab bar | Sitemap production-head screens: Home, Approvals, Projects, Vendors. | Home, Approvals, Projects, Vendors, More. |

## Cross-check · what was verified

- Every expense passes the Production Head before the MD.

- Crew attendance detail is not shown to the Production Head.

- Delivery problems are held, not built.

- The combined-role board is marked interim.

- No rupee figures are invented; placeholders only.

## Production Head wireframes · 1 of 4 · Home, approvals, expenses, estimates

The Production Head checks every production expense before it reaches the MD, approves production estimates, and approves leave.

### Home

Waiting items, managers today, held screen.

**Components**

1. **Header**: Title centre. Logout top right.
2. **Waiting for you**: Expenses to check and estimates to approve.
3. **Managers today**: Each Production Manager and their project today.
4. **Delivery problems**: Held until the owner approves the screen (open item 16).
5. **Tab bar**: Home, Approvals, Projects, Vendors, More.

### Approvals

Expenses, estimates, leave.

**Components**

1. **Header**: Title only.
2. **Expenses to check**: Each production expense waits here before it reaches the MD.
3. **Estimates**: Production and installation time estimates and revisions.
4. **Leave**: Production leave is approved here.
5. **Tab bar**: Approvals active.

### Expense check

Check, ask for data, forward.

**Components**

1. **Header**: Back.
2. **Expense**: Who raised it, the project and the amount.
3. **Supporting data**: The Production Head can ask for supporting data before approving.
4. **Approve or return**: Approve and forward to the MD, or return to the manager.

### Estimate

Approve or ask for revision.

**Components**

1. **Header**: Back.
2. **Estimate**: Production or installation time estimate.
3. **Approve or revise**: Approve, or ask for a revision.

## Requirements · approvals, expenses, estimates

The Production Head is the check between the manager and the MD: every production expense passes through them, and they approve time estimates and leave.

### Home

The home shows expenses to check, estimates waiting, the managers working today, and the delivery problems screen (held).

**Rules and states**

- Waiting counts
- Managers today
- Delivery problems held

**Sources**

Sitemap home-ph; spec on the Production Head.

### Approvals

Each production expense waits here before it reaches the MD. Production and installation time estimates and revisions are approved here, and so is production leave.

**Rules and states**

- Expenses first
- Estimates and revisions
- Leave approved here

**Sources**

Spec §9 (expense chain); spec on Production Head estimates and leave.

### Expense check

The Production Head checks the expense for correctness and can ask for supporting data, then approves it and forwards it to the MD, or returns it to the manager.

**Rules and states**

- Check, ask for data
- Approve and forward to MD

**Sources**

Spec §9 (steps 2 and 3).

### Estimate

The Production Head approves production or installation time estimates, or asks for a revision.

**Rules and states**

- Approve or revise

**Sources**

Spec on Production Head estimates.

## Production Head wireframes · 2 of 4 · Vendors, projects, managers

The Production Head maintains the vendor list, sees every project that reaches production, and can open any manager's profile.

### Vendors

Vendor list, catalogues, invoices.

**Components**

1. **Header**: Search right.
2. **Company vendor list**: The company's vendor list, with catalogues and price lists.
3. **Invoices**: Every vendor invoice, all projects.
4. **Tab bar**: Vendors active.

### Projects

Every production project; reshuffle managers.

**Components**

1. **Header**: Search right.
2. **Production projects**: Every project that reaches production.
3. **Reshuffle**: Reassign which manager handles which project.
4. **Tab bar**: Projects active.

### Manager profile

Projects, crew locations, attendance rule.

**Components**

1. **Header**: Back.
2. **Profile**: Any manager's profile.
3. **Crew locations**: Where each crew member is, on the profile.
4. **Attendance rule**: Only the owning manager sees attendance detail.

### Settings

Profile, directory, review, log out.

**Components**

1. **Header**: Back.
2. **Profile**: Name, role, company email.
3. **Directory and review**: Staff directory and the Monday review.
4. **Log out, alone at the bottom**: Set apart from other items.

## Requirements · vendors, projects, managers

The Production Head oversees every production manager, and keeps the company's vendor list.

### Vendors

The company's vendor list holds every vendor's catalogue, price list and invoices. Every invoice is visible, across all projects.

**Rules and states**

- Vendor list and catalogues
- All invoices

**Sources**

Spec on Production Head vendors (section 9 and vendors).

### Projects

The Production Head sees every project that reaches production, without being assigned to each one, and can reshuffle which manager handles which project.

**Rules and states**

- Every production project
- Reshuffle manager

**Sources**

Spec on Production Head, workload and reshuffle.

### Manager profile

The Production Head opens any manager's profile and sees where each crew member is. Attendance detail stays with the owning manager.

**Rules and states**

- Crew locations on profile
- Attendance stays with owner

**Sources**

Spec §10 (crew location); sitemap crew. Decision recorded.

### Settings

Settings holds the Production Head's profile, the staff directory, the Monday review and the log scope.

**Rules and states**

- Profile
- Directory and review

**Sources**

Sitemap directory, weekly-review, log-scope.

## Production Head wireframes · 3 of 4 · Cover, problems, review

Cover scope is chosen when a manager is away. The delivery problems screen is held until the owner approves it.

### Cover scope

Pick cover for a manager's leave.

**Components**

1. **Header**: Title only.
2. **Cover**: Choose the cover when a manager is on leave.
3. **Confirm**: Each cover handover notifies the Production Head.

### Delivery problems

Held until open item 16 is approved.

**Components**

1. **Header**: Title only. Held.
2. **Held**: Not built until approved.

### Monday review

Weekly review with the team.

**Components**

1. **Header**: Back.
2. **Review figures**: Weekly production figures.
3. **Reshuffle**: Move workload between managers.

### Log scope

What the Production Head can see in logs.

**Components**

1. **Header**: Back.
2. **Log scope**: What is visible in logs to this role.

## Requirements · cover, problems, review, log scope

Cover and the review are the Production Head's management tools. The delivery problems screen is held.

### Cover scope

When a Production Manager is on leave, the Production Head chooses the cover. Each handover of cover notifies the Production Head.

**Rules and states**

- Choose cover on leave
- Handover notifies Head

**Sources**

Spec on Production Head cover and Production Manager leave.

### Delivery problems

The delivery problems list is held until the owner approves open item 16. It is not built or shown in this set.

**Rules and states**

- Held

**Sources**

Sitemap delivery-problems (awaiting owner approval).

### Monday review

The Monday review shows production figures and the workload per manager, and lets the Production Head reshuffle workload.

**Rules and states**

- Production figures
- Reshuffle workload

**Sources**

Sitemap weekly-review.

### Log scope

The Production Head sees production expenses in the logs and not other departments' logs.

**Rules and states**

- Production expenses visible
- Other departments hidden

**Sources**

Sitemap log-scope.

## Production Head wireframes · 4 of 4 · Your own work as a manager

The specification notes the Production Head currently also works as a Production Manager. This board keeps that view, so it can be removed later without rebuilding the rest.

### Own projects

Projects the Production Head works on directly.

**Components**

1. **Header**: Title only.
2. **Interim note**: Interim; remove when roles split.
3. **Own project**: A project the Production Head works on.

### Own BOQ

Same BOQ rules as the Production Manager.

**Components**

1. **Header**: Back.
2. **Rule**: The Production Manager's BOQ rules apply.

### Own crew

Owned crew only.

**Components**

1. **Header**: Back.
2. **Visibility**: Owned crew visible to the owner.

### Own expenses

Expense requests as a manager.

**Components**

1. **Header**: Back.
2. **Chain**: Own requests go to the Head's check and then the MD.

## Requirements · the Production Head's own work

The specification says the Production Head currently also acts as a Production Manager. This set keeps that view separate so it can be removed later.

### Own projects

While the roles are combined, the Production Head can work directly on projects, with the same rules as a manager.

**Rules and states**

- Interim
- Same rules as manager

**Sources**

Spec, Production Head powers: currently also acts as a Production Manager.

### Own BOQ and crew

The BOQ and crew rules are the same as for any Production Manager.

**Rules and states**

- BOQ rules
- Owned crew only

**Sources**

Spec §10.

### Own expenses

Own expense requests follow the chain: the Head checks, and the MD pays.

**Rules and states**

- Head check, then MD

**Sources**

Spec §9.

### Removal

When the roles split, this board is removed. Nothing else in the set depends on it.

**Rules and states**

- Removable

**Sources**

Decision recorded below.
