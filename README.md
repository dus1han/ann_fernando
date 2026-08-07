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
