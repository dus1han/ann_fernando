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

## Lead capture (email)

The enquiry form's real job is to open WhatsApp with the details filled in.
But the person still has to press send there, and some never do - they
hesitate, or they are on a desktop not logged into WhatsApp Web. Those leads
vanish, even though they typed a name, a phone number and a budget a second
earlier.

So every submission is also emailed. WhatsApp stays the primary path; the
email is the safety net.

```
form submit
  |-- recordLead()        lib/leads.ts   fire-and-forget, never awaited
  |     `-> POST /api/lead              validates, then Resend's REST API
  `-- window.open(wa.me)  unchanged, still the primary path
```

### Setup

1. Sign up at **resend.com**. **Register with the address you want the leads
   sent to** - see the sender note below; this saves a DNS step.
2. **API Keys -> Create API Key**. Copy it; it starts `re_` and is shown once.
3. Vercel -> Settings -> Environment Variables, for **Production**:

| Variable | Required | Default |
|---|---|---|
| `RESEND_API_KEY` | yes | - |
| `LEAD_EMAIL_TO` | no | `dus1han@gmail.com` |
| `LEAD_EMAIL_FROM` | no | Resend's shared sender |

4. Redeploy. Environment variables are read at build time.

`LEAD_EMAIL_TO` accepts a comma-separated list, so Ann can be added later
without touching code.

### The sender, and why it matters

By default mail goes out through Resend's shared sender,
`onboarding@resend.dev`. That needs no DNS setup at all, but it can **only
deliver to the address the Resend account was registered with**. That is the
one real constraint, and it is why step 1 says to register with the
destination address.

To send anywhere else - Ann's own inbox, a second recipient - verify
annfernando.com in Resend (it gives you the DNS records) and set
`LEAD_EMAIL_FROM` to something like `Ann Fernando <leads@annfernando.com>`.
Mail from your own domain also reaches the inbox far more reliably.

### Checking it

`GET /api/lead` reports the configuration without revealing the key:

```bash
curl -s https://www.annfernando.com/api/lead
```

Add the key as a header to send a real test email and see Resend's reply:

```bash
curl -s -H "x-diagnose: re_your_key" https://www.annfernando.com/api/lead
```

The POST path swallows every failure on purpose, so this is the only way to
find out why an email did not arrive. Verdicts distinguish a missing key, a
rejected key, and a sender the account is not allowed to use.

### Notes

- **An unset key is a normal state.** Without it the route returns 204 and
  skips the email, so local runs and previews send nothing. The form still
  works.
- **A dead mail provider cannot break an enquiry.** Every failure is
  swallowed and WhatsApp still opens.
- **Never await `recordLead`.** `window.open` is only allowed while the click
  is still being handled; awaiting first hands the WhatsApp tab to the popup
  blocker. See the warning in [`lib/leads.ts`](lib/leads.ts).
- The email sets `reply_to` to the enquirer's address when they gave one, so
  hitting reply writes straight back to them.
- Enquirer text is HTML-escaped before it goes into the email body.
- Fields are collapsed to single spaces and capped at 900 characters.
  Submissions with no name or no phone are dropped without an email.

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
