# Ann Fernando - Property Consultant, Dubai

Single-page personal branding site for a Dubai property consultant working with
Sri Lankan investors. Personal brand first: her name leads, the investment case
supports it.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, static export) |
| Styling | Tailwind CSS v4 |
| Motion | `motion` (framer-motion) + Lenis smooth scroll |
| Hosting | Vercel |

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Lead capture (Google Sheet)

The enquiry form's real job is to open WhatsApp with the details filled in.
But the person still has to press send there, and some never do - they
hesitate, or they are on a desktop not logged into WhatsApp Web. Those leads
vanish, even though they typed a name, a phone number and a budget a second
earlier.

So every submission is also copied to a Google Sheet. WhatsApp stays the
primary path; the sheet is the safety net.

```
form submit
  |-- recordLead()        lib/leads.ts        fire-and-forget, never awaited
  |     `-> POST /api/lead   app/api/lead/route.ts   validates, adds secret
  |           `-> Apps Script web app  ->  appends a row
  `-- window.open(wa.me)  unchanged, still the primary path
```

### Set up the sheet

1. Create a Google Sheet. Name it anything; the script makes its own **Leads**
   tab and header row on first write.
2. **Extensions -> Apps Script**. Delete the placeholder `myFunction`.
3. Paste the whole of [`docs/leads-sheet.gs`](docs/leads-sheet.gs).
4. Replace `CHANGE_ME_TO_A_LONG_RANDOM_STRING` with a long random string.
   Keep it - it goes into Vercel in step 8.
5. Save, then run **testAppend** once from the editor toolbar. Google will ask
   for permission; approve it. A test row should appear in the sheet. If it
   does not, stop here - nothing downstream will work.
6. **Deploy -> New deployment -> Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Copy the **Web app URL**. It ends in `/exec`.

> "Anyone" is required because Vercel calls it unauthenticated. That is why
> the shared secret exists - it is the only thing between the sheet and
> anyone who finds the URL.

### Set up Vercel

8. Vercel -> Settings -> Environment Variables, for **Production**:

| Variable | Value |
|---|---|
| `GOOGLE_SHEET_WEBHOOK_URL` | the `/exec` URL from step 7 |
| `LEAD_WEBHOOK_SECRET` | the random string from step 4 |

9. Redeploy. Environment variables are read at build time.

Neither is `NEXT_PUBLIC_`, so neither ever reaches the browser. **Do not add
that prefix** - it would publish the URL to every visitor and hand them write
access to the sheet.

### Re-deploying the script after an edit

Apps Script does not pick up edits automatically. After changing the script:
**Deploy -> Manage deployments -> edit (pencil) -> Version: New version ->
Deploy.** Creating a *new deployment* instead issues a different URL and the
old one keeps running the old code.

### Notes

- **Unset variables are a normal state.** Without them the route returns 204
  and skips the sheet, so local runs and previews do not write rows. The form
  still works.
- **A dead sheet cannot break an enquiry.** Every failure is swallowed and
  WhatsApp still opens - verified against a refused connection: 204 in 183ms.
- **Never await `recordLead`.** `window.open` is only allowed while the click
  is still being handled; awaiting first hands the WhatsApp tab to the popup
  blocker. See the warning in [`lib/leads.ts`](lib/leads.ts).
- Phone numbers are written with a leading apostrophe so Sheets does not read
  a leading `+` as a formula.
- Fields are collapsed to single spaces and capped at 900 characters.
  Submissions with no name or no phone are dropped without a row.
- To add email alerts later, send from the same route handler - the client
  and the form do not change.

## Where to edit things

**All site copy lives in [`content/copy.ts`](content/copy.ts).** Text changes
should never require touching a component. Phone numbers, socials, section
headings, FAQ answers, developer list - all of it is there.

```
content/copy.ts          every string on the site
components/sections/     one file per section, in page order
components/              shared: Nav, Reveal, Socials, HeroBackdrop, …
lib/bi.tsx               bilingual helper + Sinhala slot plumbing
public/images/           photography
public/brand/            GCC Real Estate logo
app/globals.css          design tokens and the signature effects
```

## Ground rules for this site

These are not style preferences - breaking them creates real problems.

**1. Never claim a personal track record.**
No tenure, no units-closed count, no transaction volume, unless it is real and
defensible. Inflated experience claims are a RERA advertising issue, and the
Sri Lankan investor community in Dubai is small enough that it gets found out.
Credibility on this site comes from things a reader can check independently.

**2. Licensing belongs to the brokerage, never to Ann.**
Ann does not personally hold a RERA broker number. GCC Real Estate holds the
licence and she consults under it. Never write "RERA licensed" about Ann, and
do not print a personal BRN. See the note above `agent.brn` in `copy.ts`.

**3. Testimonials must be real.**
`SHOW_TESTIMONIALS` is currently `false`. An absent testimonials section is
unremarkable; an invented one is fraud. Turn it on only with named,
attributable quotes.

**4. `overflow-hidden` must not go on a `<section>` that contains a sticky
child.** An ancestor with non-visible overflow becomes the sticky element's
scroll container and it silently stops pinning. Clip decorative layers in
their own wrapper instead - see `Process.tsx` and `About.tsx`.

## Sinhala

The site ships in English. Every place where Sinhala would genuinely earn its
place is already marked in `copy.ts` with proposed text, a priority, and a
written rationale - 17 slots, 12 of them high value.

Load **`/?slots=1`** to see them outlined in place with a review panel.

Set `SINHALA_ENABLED = true` in `copy.ts` to switch them on. Fonts and
line-height rules are already wired. **All Sinhala is a draft pending
native-speaker review** - awkward Sinhala does more damage than English-only.

## Outstanding before launch

- [ ] Ann's photography - hero portrait and a working shot (biggest visual gap)
- [ ] Real project renders from the developer channel packs, to replace stock
- [ ] Company ORN and trade licence numbers (currently `00000`)
- [ ] Confirm the RERA advertising requirements with the brokerage
- [ ] Native review of the Sinhala strings
- [ ] Google Business Profile for the office - free, and the highest-return
      local SEO action available
- [ ] Real testimonials, then flip `SHOW_TESTIMONIALS`
