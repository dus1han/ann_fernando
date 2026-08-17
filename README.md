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

## Environment variables

Both are optional. Nothing needs configuring in Vercel for the site to work.

| Variable | Effect when unset |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Falls back to `https://www.annfernando.com` on Vercel, `localhost:3000` otherwise |
| `NEXT_PUBLIC_META_PIXEL_ID` | Uses Ann's live dataset, `1071241701920064` |

## Meta Pixel

Installed and on by default in every build **except `npm run dev`**, which is
deliberately silent — see the note at the top of
[`components/MetaPixel.tsx`](components/MetaPixel.tsx). To see it fire locally,
run `npm run build && npm start` and check with the Meta Pixel Helper
extension, or Events Manager → Test Events.

### What it reports

| Event | Fires on | Standard? |
|---|---|---|
| `PageView` | Page load | yes |
| `EnquiryFormOpen` | Any WhatsApp button that routes to the enquiry form | custom |
| `Lead` | Enquiry form submitted | yes |
| `Contact` | Floating WhatsApp button, `tel:` and `mailto:` links | yes |

**Optimise campaigns for `Lead`.** It is the only event that means someone gave
their details. `EnquiryFormOpen` is a click and nothing more — optimising for
it teaches the algorithm to find people who click and then leave.

`Lead` carries the selected interest and budget. It never carries a name, phone
number, email or message; see the warning in [`lib/pixel.ts`](lib/pixel.ts).

### Tracking which ad produced a lead

The enquiry form opens WhatsApp rather than posting to a server, so the instant
a lead becomes a real conversation it leaves every system that can measure it —
Meta cannot see WhatsApp and neither can Vercel.

[`lib/attribution.ts`](lib/attribution.ts) closes that. The campaign is captured
on landing, kept for 30 days, and written into the enquiry as a final `Ref:`
line, so Ann reads the source in the chat itself. Organic visitors send exactly
the message they always did — the line appears only when an ad brought them.

**Tag every ad's destination URL**, otherwise all you get is `facebook`:

```
https://www.annfernando.com/?utm_source=facebook&utm_medium=paid&utm_campaign=golden-visa-oct&utm_content=carousel-a
```

That arrives in WhatsApp as `Ref: golden-visa-oct / carousel-a`, and in Vercel
Analytics on the `lead_submit` event. An untagged ad still records, because
Meta appends `fbclid` to every ad click, but it can only say "facebook".

Last touch wins, matching Meta's own convention: a newer ad click overwrites an
older one. A later visit with a clean URL does **not** erase the credit. The
30-day window is wider than Meta's default 7-day click window on purpose — a
property decision takes weeks, and a click that led to an enquiry 20 days later
is still the click that caused it.

⚠ The pixel sets cookies and sends data to Meta, unlike the cookieless Vercel
tags. There is no consent banner on this site. That is defensible for UAE and
Sri Lankan traffic; if the site is ever advertised into the EU or UK, gate
`<MetaPixel />` behind consent rather than deleting it.

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
