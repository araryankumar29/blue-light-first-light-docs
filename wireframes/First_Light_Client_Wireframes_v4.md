# First Light · Client wireframes v4

Plain-text version of the wireframe set. Each board lists its phone screens with numbered components, and each requirement page lists the rules for those screens. Bracketed values such as [14] are placeholders.

_Version 4 · 22 November 2026 · supersedes v3_

## First Light · client wireframes

Four boards and four requirement pages, twelve phone screens in all, in the same standard components as the design partner set. This version corrects the errors found in the second cross-check and settles every conflict that was open in v3, with the reason beside each decision. Nothing here is visual design: grey and white, placeholders marked in square brackets.

Sources checked: the sitemap of 22 November (client pages and shared pages), the registered decisions of the 22 November voice sessions, and the cross-check document. Each requirement page names its sources.

## Conflicts settled

| Item | What the sources say | Decision and why |
|---|---|---|
| Help line | Sitemap: Call the office. Decision: sales representative by name. | Representative by name, as decided on 22 Nov. Office call kept on Messages. |
| Proof route | Sitemap: client sends on WhatsApp, partner forwards. Decision: in-app upload to MD. | In-app upload straight to the MD. Hand forwarding removed. |
| Client bottom bar | Sitemap: Project, Files, Payments, Messages, More. Decision: Home, Projects, Meetings, Messages, Catalogue. | Decision used. |
| Studio name | HOMESIC in logo and decision; HOMSIC in some documents. | HOMESIC. HOMSIC treated as a typo to correct in the documents. |
| Owed-now amount (v2) | Showed Rs 2,40,000 owed now, though token and mid were paid. | Rs 1,40,000 due 14 Dec; remaining Rs 1,60,000 (fixed in v3, rechecked in v4). |
| Payment steps (v2) | Home showed three steps; the schedule has four. | Four steps, 10 / 50 / 35 / 5 (rechecked). |
| Quotation version (v2) | Quotation v4 while Designs showed Version 5. | All files of a round at the same version (rechecked). |
| Invented copy (v2) | Typical 3 to 4 weeks; Due before handover; HOMESIC Interiors. | Placeholders in square brackets; payee is HOMESIC. |
| Fold lines (v3) | Home and Project run past one screen. | Fold line on every screen; lower items are numbered and in the guide. |

## Conflicts settled

| Item | What the sources say | Decision and why |
|---|---|---|
| Proof route | Sitemap: client sends on WhatsApp, partner forwards to the MD. Decision: client uploads in the app. | In-app to the MD. Hand forwarding is error-prone, and the sitemap itself says nobody copies files across by hand. |
| Help line | Sitemap: Call the office. Decision: the assigned sales representative by name. | Representative by name. The office stays one tap away on Messages. |
| Client bottom bar | Sitemap: Project, Files, Payments, Messages, More. Decision: Home, Projects, Meetings, Messages, Catalogue. | Decision. It matches the sections the client asked to reach each time. |
| Studio name | HOMESIC in the logo and decision; HOMSIC in some documents. | HOMESIC. The logo is the brand's authority. |
| Team and client sections | Not in the sitemap for the client. | Kept as new screens; to be added to the site map at the next update. |

## Client wireframes · 1 of 4 · Entry, Home, Project

Standardized components: header, hero, cards, rows, tab bar. Numbers match the guide under each phone. Sheets are numbered on the phone too.

### Sign-in

WhatsApp and OTP. Number must match the lead.

**Components**

1. **Wordmark**: Company wordmark, centred, top of screen. No address, no tagline.
2. **Heading and reason**: One line. States the rule: the number must match the one on the lead.
3. **Mobile number**: Must match the lead number. A different number shows: 'This number is not on your enquiry. Call the office.'
4. **Send one-time code**: Sends the code from the company WhatsApp number. Disabled until the number is complete.
5. **Six-digit code**: Boxes advance automatically. Resend unlocks after 30 seconds. OTP is required before the token payment and the invoice.
6. **Optional email**: Asked after OTP. Skippable. Stored as empty if skipped.
7. **Terms agreement, every login**: Ticked on every sign-in, not once. Links to the Terms page. Records the version agreed and the time.
8. **Alternative sign-in**: Optional link. The mobile and OTP step is never skipped, so every account has a verified number.

### Home

Front desk. Hero is the project. Four-step payment summary.

**Components**

1. **Header**: Logo left, client name centre, payment icon and settings icon right. Hides on scroll-down, returns on scroll-up.
2. **Project hero**: Pinned render, or an upload. Tapping opens the project. The pinned image also sets the project avatar.
3. **Help line**: Names the assigned sales representative (decision, 22 Nov). 'Call the office' is kept on Messages as a second call option.
4. **References row**: Only ideas tied to this project. View more opens keyword chips and a search bar.
5. **Catalogue row**: Horizontal, sized close to the stage cards. Tap opens the catalogue entry panel.
6. **Team profile images**: Tap opens the person's bio, projects and details.
7. **Testimonial**: One at a time. Doubles as a showcase of past projects.
8. **Payment procedure summary**: Four steps, 10 / 50 / 35 / 5, from the schedule for this project. Full detail is on Payments.
9. **Tab bar**: Home, Projects, Meetings, Messages, Catalogue. Decision of 22 Nov. The sitemap's client bar is not used.

### Project

Stage row opens at the current stage.

**Components**

1. **Header with back**: Back to Home. Project name centre. Settings icon right.
2. **Project identity**: Stage in words plus one traffic-light dot. Client pauses are never yellow or red; they read Paused by client.
3. **Stage row**: Opens scrolled to the current stage. Past: outline and tick. Current: filled. Future: dashed. Stage names come from the tenant's stage list.
4. **Stage detail strip**: Changes when a stage card is tapped. One plain sentence on what the studio does and what the client does.
5. **Next meeting**: Date and time. Opens the meeting view on Meetings.
6. **Payment summary**: Shows the next due date. Amount and actions are on Payments. Money never appears without a due date.
7. **Designs preview**: Two latest approved renders. View all opens the gallery. Unapproved files never appear.
8. **Files list**: Current approved files, each under its own name with its version. Older versions open from View previous files.
9. **Tab bar**: Projects active.

### Stage detail

Pop-up sheet over Project.

**Components**

1. **Header with back**: Back to Home. Project name centre. Settings icon right.
2. **Background**: Project behind the sheet.
3. **Stage name and dates**: Name, start date and days left. Source: stage timer.
4. **Illustration**: One simple drawing per stage, in the same style for all stages. Placeholder until supplied.
5. **What the client must do**: One sentence on the client's action, or: Nothing from you right now.

## Requirements · entry, home, project

What each screen must do, why, and where the rule comes from. Read with the board opposite; the columns line up.

### Sign-in

A client signs in with the WhatsApp number on their enquiry. The company WhatsApp number sends a six-digit code. The number must match the lead, so a stranger cannot take over an enquiry. Email is optional and asked after the code; it can be skipped. Google can be linked, but it still asks for the mobile number and an OTP, so every account has a verified number. The Terms tick appears on every sign-in and is stored with its version and time. Staff never use this screen.

**Rules and states**

- Number must match the lead; mismatch goes to the office
- OTP is required before the token payment and invoice
- Nobody signs in on a client's behalf
- The client is never required to use the portal

**Sources**

Sitemap signin-client (Spec §22.2). Registered 22 Nov: email optional, Terms on every login.

### Home

Home is the front desk for one project. It should tell the client the studio is working and what they can do next, in one screen. The hero is the pinned render chosen by the design team, and it also sets the project avatar. A single help line names the assigned sales representative. Sitemap says 'Call the office'; the decision says the representative's name. Both are kept until settled. References show only ideas linked to this project. The lower part holds the catalogue row, team, testimonials and the four-step payment summary. Home shows no amount without its due date.

**Rules and states**

- Only approved files appear
- Hero is pinned by the designer
- No amount without a due date
- Payment summary has four steps: 10 / 50 / 35 / 5

**Sources**

Sitemap home-cl (Mobile §7). Registered 22 Nov: hero, references, catalogue row, team, testimonials, payment summary.

### Project

The Project page shows where the work is. The stage row opens at the current stage, never at the first one. Each stage carries a traffic light with a word: green on time, yellow or red when late (red past 125% of planned time). A client-caused pause reads Paused by client and is never yellow or red. The page also shows the next meeting, the next due payment, two approved renders with View all, and the current approved files. Stage names come from the tenant's list; the numbers shown here are placeholders.

**Rules and states**

- Stage row scrolls to the current stage on open
- Client pause is never yellow or red
- Files pinned first; only approved versions
- One primary action per screen

**Sources**

Sitemap portal-home, stage-timeline, paused (Spec §6, §21.2). Registered 22 Nov: stage cards and detail strip.

### Stage detail

A tapped stage opens a short sheet near the card, not a new page. It names the stage and its dates, shows one simple illustration in the same style as every other stage, and says in one sentence what the client must do. If nothing is needed from the client, it says so. Internal notes, costs and staff notes never appear here.

**Rules and states**

- Pop-up near the card, not a page
- One illustration per stage, same style
- Client action in one sentence, or 'nothing from you'

**Sources**

Registered 22 Nov (stage detail sheet). Illustrations are not yet supplied.

## Client wireframes · 2 of 4 · Money and messages

Payments show what is owed, when, and how to pay. Messages show the team, calls, the meeting and the group's join state.

### Payments

Owed now, next due, actions, schedule, receipts.

**Components**

1. **Header**: Back to Project. Same header as Home.
2. **Owed now and due date**: The amount due now with its due date, then the remaining balance. Never an amount without a date.
3. **Next payment card**: Stage, percentage, due date. Only this card carries the highlight.
4. **Document icons**: Invoice opens a PDF pop-up. Quotation opens the current quotation and zooms. Receipts lists confirmed payments. Schedule opens the four-stage split.
5. **Pay now**: Opens the QR sheet. Pay by UPI using the QR or the payee details.
6. **Submit proof**: Opens the screenshot upload. The client uploads in the app; it goes straight to the MD. The design partner sees status and does not forward files.
7. **Schedule list**: Four stages: 10 / 50 / 35 / 5. Paid rows link to their receipt; upcoming rows show their due date.
8. **Receipts and balance**: Each confirmed payment has a receipt showing the amount received and the balance left.
9. **Tab bar**: Payments is opened from the header, so no tab is highlighted.

### Pay now

QR sheet over Payments.

**Components**

1. **Header**: Back to Project. Same header as Home.
2. **Background**: Payments behind the sheet.
3. **Amount and due date**: Both shown together, every time.
4. **QR code**: Downloadable and scannable. Company QR for the project's payment account.
5. **Payee details**: Payee HOMESIC, UPI reference. Resolved: HOMESIC, as in the logo and the decision.
6. **Next step**: Moves to the proof upload.

### Submit proof

Screenshot to confirm. Status until confirmed.

**Components**

1. **Header**: Back to Payments.
2. **Heading and reason**: One line on the next step.
3. **Screenshot picker**: One image, JPG or PNG.
4. **Amount and date**: Client confirms the amount they paid. Pre-filled from the next payment.
5. **Send**: Disabled until a screenshot is attached.
6. **Status**: Shows the state until the MD confirms. Confirmed triggers the receipt.

### Messages

Team, calls, meeting, group. Change time sheet below.

**Components**

1. **Header**: Title only.
2. **Team contacts**: Design partner and production manager, each with Call. Sits above the WhatsApp window.
3. **Ask them to call you**: Time slots: 1 to 3 hours, 3 to 6 hours, within a day.
4. **Meeting card**: Shows time, link and everyone tagged. Change time opens the sheet.
5. **Join state**: Shown until the client joins the project group. Invitation sent in an approved template.
6. **Project WhatsApp window**: Once joined: the project group thread, sent through the company number.
7. **Message input**: Sends into the group or to the client's number, depending on the join state.
8. **Tab bar**: Messages active.
9. **New date and time**: Two fields. The request goes to everyone tagged.
10. **Approval rule**: Each tagged person confirms. The client gets a confirmation notice when the time is final.
11. **Send request**: Creates the pending request.

## Requirements · money and messages

Payments are the most sensitive screens. Money is always shown with its due date, and only the MD confirms a payment.

### Payments

Payments states what is owed and when, in one place. The top shows the amount due now with its due date and the balance left. The next payment card carries the only highlight. The schedule is 10, 50, 35 and 5 per cent of the latest accepted quotation, set by the MD for each project. Confirmed payments show a receipt with the amount received and the balance left. Receipts and Schedule fill the other two icons. The sitemap already lists receipts and the payment schedule as client pages.

**Rules and states**

- No amount without a due date
- Payment is confirmed only by the MD, never by the app
- Receipt sent on confirmation
- Company-wide schedule changes apply to new projects only

**Sources**

Sitemap portal-payments, split, receipt (Spec §9). Registered 22 Nov: owed, next, icons, Pay now.

### Pay now

Pay now shows a QR code that can be downloaded or scanned in any UPI app, with the payee and the reference beside it. The sitemap says Pay by UPI; the QR is the way to do that. The client then moves to submitting proof. The payee is HOMESIC, the spelling in the logo and the decision. HOMSIC in some documents is treated as a typo to correct.

**Rules and states**

- Amount shown with its due date
- Payee HOMESIC
- Next step: submit proof

**Sources**

Sitemap portal-payments (Pay by UPI), payment-request. Registered 22 Nov: QR code.

### Submit proof

The client attaches one screenshot, confirms the amount and date, and sends it. The stage waits until the MD confirms. The client sees the state at all times: waiting, confirmed, or rejected with a reason and a resend route. On confirmation the update is posted to the project group and shown across the app.

**Rules and states**

- One image, JPG or PNG
- Stage held until the MD confirms
- Rejected: reason shown, client resends
- Confirmed: receipt and WhatsApp notice

**Sources**

Sitemap proof, payment-resubmit (Spec §9, §26.1). Resolved: the in-app route follows the 22 Nov decision. The sitemap step where the design partner forwards proof by hand is dropped, because the sitemap itself says nobody copies files across by hand.

### Messages

Messages is the single place to speak to the team. Above the WhatsApp window, the design partner and production manager each have a call option, and Ask them to call you offers time slots: 1 to 3 hours, 3 to 6 hours, or within a day. Until the client joins the project group, messages go to their own number; the join uses an invitation link sent in an approved template, because Meta does not allow adding participants directly. The meeting card shows the next meeting. A change request is final only when everyone tagged confirms.

**Rules and states**

- Join state shown until the client joins the group
- Invitation link is the only route in
- Meeting change needs every tagged person to confirm

**Sources**

Sitemap portal-messages, group-invite, meeting-link (Spec §26.4, §26.11, §26.13). Registered 22 Nov: contacts, call slots, change request.

### Change time

Change time asks for a new date and time. The request goes to everyone tagged in the meeting. The status shows how many have confirmed. The client receives a confirmation notice when the new time is final.

**Rules and states**

- Everyone tagged confirms
- Status shows waiting for N of M
- Confirmation notice to the client

**Sources**

Registered 22 Nov (meeting change). Sitemap meeting-reminder, meeting-link for the link and reminder rules.

## Client wireframes · 3 of 4 · Discover, designs, settings

Catalogue is the browsing library. The entry panel holds the share actions. Designs show approved versions by chip. Settings are kept short.

### Catalogue

Search, chips and horizontal sections.

**Components**

1. **Header**: Search on the right, title centre.
2. **Search**: Full-catalogue search. Opened from Home or the bottom bar.
3. **Keyword chips**: One active at a time. Built from the catalogue's tags.
4. **Horizontal row**: Decent-sized cards in a row, one row per section. Not an endless list.
5. **Next section**: Each section is its own row, fed from the catalogue library.
6. **Tab bar**: Catalogue active.

### Catalogue entry

Panel over the catalogue.

**Components**

1. **Header**: Search on the right, title centre.
2. **Background**: Catalogue visible under the panel.
3. **Image and full-screen**: Large image. The full-screen icon opens it full screen.
4. **Title and lead time**: Lead time is a placeholder until the catalogue supplies it.
5. **WhatsApp and Share**: Open to anyone, including people not yet registered. An idea sent by an unregistered person goes to sales as a lead.

### Designs

Mixed grid of approved renders, with version chips.

**Components**

1. **Header**: Back to Project. Download the current set.
2. **Renders grid**: Mixed sizes. Each opens and downloads. Only approved renders.
3. **Version chips**: Small chips, newest first. Each chip opens that version's set, view-only, with its date.
4. **Tab bar**: Designs opens from the project, so Projects is active.

### Settings

Profile, devices, terms, log out.

**Components**

1. **Header**: Back. Opened from the header settings icon.
2. **Profile**: Name, verified WhatsApp number, optional email.
3. **Devices and sessions**: Signed-in devices. Sign out one at a time.
4. **Terms**: Opens the Terms page, any time, with the version agreed at sign-in.
5. **Log out, alone at the bottom**: Set apart so it is not tapped by mistake. No notification switches on this page.
6. **Tab bar**: Settings opens from the header, so no tab is highlighted.

## Requirements · discover, designs, settings

Browsing and the file history. Every version is kept; the client sees only what is approved.

### Catalogue

The catalogue is the full design library. It has search, keyword chips and horizontal sections, not an endless list. Sections are rows sized like the stage cards. It is reached from the bottom bar, or from search on Home. The sitemap has no client catalogue page, so this is a new screen from the 22 November decisions.

**Rules and states**

- Horizontal rows, one per section
- Search and chips always visible
- Tap opens the entry panel

**Sources**

Registered 22 Nov. Not in the sitemap; a gap to add.

### Catalogue entry

The entry opens as a panel over the catalogue, with a full-screen icon. WhatsApp and Share are available to everyone, including people not yet registered. An idea sent over WhatsApp by an unregistered person goes to sales as a lead. The lead time is a placeholder until the catalogue supplies it.

**Rules and states**

- Panel, not a new page
- Share open to everyone
- Unregistered share becomes a lead

**Sources**

Registered 22 Nov (catalogue entry; lead grouping rule).

### Designs

Renders show in a mixed grid, large and small, each opening and downloading. Every new round gives all its documents the same version number: renders, quotation, invoice and DN PDF all move to version 5 together, each keeping its own name. Older versions are shown as small chips, newest first, and open view-only with their date. Rejected versions stay with the team and are not shown here.

**Rules and states**

- Approved versions only
- One version number per round
- Older versions view-only, dated
- Rejected versions never shown to the client

**Sources**

Sitemap versions, pinned, portal-files (Spec §21.1). Registered 22 Nov: version rule and history chips.

### Settings

Settings is kept to what a client needs: profile (name, verified WhatsApp number, optional email), devices and sessions with sign-out, and the Terms. Log out sits alone at the bottom. There are no on or off switches for WhatsApp, payment or meeting messages, because those carry the project's record and stay on for every client. The sitemap has no client settings page, so this is a new screen.

**Rules and states**

- No notification switches
- Terms viewable any time
- Log out set apart at the bottom

**Sources**

Registered 22 Nov. Sitemap has no client settings page; a gap to add.

## Client wireframes · 4 of 4 · Public site, team, meetings, terms

Screens not on the first three boards: the public site before login, the team profile, the meetings page and the Terms page.

### Public site

Hero showpiece, reception choices, gallery, designer entrance.

**Components**

1. **Public header**: Logo and log in. Visible to anyone.
2. **Hero showpiece**: A 3D object at the studio entrance. Hover turns it to show facets of the company. Placeholder until the 3D asset exists.
3. **Headline**: One sentence, plain. States what is hassle-free. Copy to be approved.
4. **How we work, few stages**: A short layer, not all 14 stages. Persuasive, not technical.
5. **Reception choices**: Three choices: book a call or online meeting, visit the studio, or try a budget while waiting (estimator comes later).
6. **Gallery row**: Works spread out, not a forced path. Each opens a catalogue entry panel.
7. **Designer entrance**: Clearly placed below the hero. Labelled for the client side only.
8. **Lead capture**: Leaving a number anywhere creates a lead. Multiple entries from one number are grouped for sales.

### Team profile

Opened from the team row on Home.

**Components**

1. **Header**: Back to Home.
2. **Profile identity**: Photo, name and role. Photo uploaded by the studio.
3. **Bio**: Written by the person, reviewed by the studio.
4. **Projects**: This project first, then past work with the year.
5. **Testimonials**: Client testimonials that name this person.
6. **Tab bar**: Opened from Home, so no tab is highlighted.

### Meetings

Next meeting and past meetings.

**Components**

1. **Header**: Title only.
2. **Next meeting**: Link, time and everyone tagged. Join opens Google Meet.
3. **Request change**: Opens the change sheet on Messages. Everyone tagged must confirm.
4. **Past meetings**: Completed meetings only, with their dates.
5. **Tab bar**: Meetings active.

### Terms

Full text and version. Agree at sign-in.

**Components**

1. **Header**: Back. Opened from sign-in or Settings.
2. **Title and version**: Version and date. The version agreed at sign-in is stored with each client.
3. **Terms text**: Full text, scrollable. Wording is not drafted and is not part of this pass.
4. **Agree**: Shown when opened from sign-in. Hidden when opened from Settings.

## Requirements · public site, team, meetings, terms

The four screens that complete the client's path, from first visit to the Terms.

### Public site

The public front door is for anyone. The hero is a 3D object at the studio entrance that turns on hover to show facets of the company. Scrolling brings the reception: the story, testimonials and the choice of booking a call, visiting the studio or trying a budget. A short how-we-work layer shows a few stages, not all fourteen. The designer entrance sits below the hero and is labelled for the client side; entering there never assigns a staff role. Leaving a number anywhere creates a lead.

**Rules and states**

- Entrance is for clients only
- No staff role from this entrance
- Lead created from any number entry

**Sources**

Registered 22 Nov. Not in the sitemap; a gap to add.

### Team profile

Opened from the team row on Home. It shows the person's photo, name and role, a short bio written by the person and reviewed by the studio, the projects they worked on (this project first), and testimonials that name them.

**Rules and states**

- Photo and bio supplied by the studio
- This project listed first

**Sources**

Registered 22 Nov. Not in the sitemap; a gap to add.

### Meetings

The meetings page lists the next meeting with its link, time and everyone tagged, and the completed meetings with dates. A change request opens the change sheet. Join opens Google Meet. The link is created from one company account, and it is posted to the project group if the client is in it, or sent to their number otherwise.

**Rules and states**

- Link from one company account; nobody logs in
- Posted to the group, or to the client's number

**Sources**

Sitemap meeting-link (Spec §26.11). Registered 22 Nov: change request.

### Terms

The Terms page is readable at any time. It shows the version agreed at sign-in. The full wording has not been drafted and is not part of this pass; it is a placeholder.

**Rules and states**

- Version and date shown
- Agree button only from sign-in
- Wording to be drafted

**Sources**

Registered 22 Nov (Terms on every login). Wording not yet drafted.
