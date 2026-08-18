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

## Lead capture (Telegram)

The enquiry form's real job is to open WhatsApp with the details filled in.
But the person still has to press send there, and some never do - they
hesitate, or they are on a desktop not logged into WhatsApp Web. Those leads
vanish, even though they typed a name, a phone number and a budget a second
earlier.

So every submission also fires a Telegram notification. WhatsApp stays the
primary path; Telegram is the safety net.

**Why Telegram and not email.** It is one HTTPS call that either succeeds or
returns a clear error. No deliverability, no spam folder, no domain
verification, no sending reputation - the things that make email from a small
site unreliable. It also arrives as a phone notification, which is what you
want for a lead.

```
form submit
  |-- recordLead()        lib/leads.ts   fire-and-forget, never awaited
  |     `-> POST /api/lead              validates, then the Telegram API
  `-- window.open(wa.me)  unchanged, still the primary path
```

### Setup

1. In Telegram, message **@BotFather** and send `/newbot`. Pick a display
   name and a username ending in `bot`. It replies with a token that looks
   like `123456789:AAH...`.
2. Add `TELEGRAM_BOT_TOKEN` in Vercel -> Settings -> Environment Variables,
   for **Production**. Redeploy.
3. **Open a chat with your new bot and press Start.** A bot cannot message
   you first, so this step is what creates the chat.
4. Ask the site for the chat id:

```bash
curl -s -H "x-diagnose: YOUR_BOT_TOKEN" https://www.annfernando.com/api/lead
```

   It returns `foundChats` with the id. No need to hand-read getUpdates.

5. Add `TELEGRAM_CHAT_ID` in Vercel with that id, and redeploy.
6. Run the same curl again. It now posts a real test message to your
   Telegram and reports `WORKING`.

| Variable | Required |
|---|---|
| `TELEGRAM_BOT_TOKEN` | yes |
| `TELEGRAM_CHAT_ID` | yes |

### Sending to more than one person

Create a Telegram **group**, add the bot to it, and use the group's chat id
(it is negative, e.g. `-1001234567890`). Everyone in the group then gets the
notifications - which is how Ann gets them too, without any code change.

### Checking it

`GET /api/lead` reports the configuration without revealing the token:

```bash
curl -s https://www.annfernando.com/api/lead
```

Add the token as a header to run a live test. The POST path swallows every
failure on purpose, so this is the only way to find out why a notification
did not arrive. Verdicts distinguish a missing token, a rejected token, and
a chat id that Telegram does not recognise.

### Notes

- **Unset variables are a normal state.** Without them the route returns 204
  and skips the notification, so local runs and previews send nothing. The
  form still works.
- **A Telegram outage cannot break an enquiry.** Every failure is swallowed
  and WhatsApp still opens.
- **Never await `recordLead`.** `window.open` is only allowed while the click
  is still being handled; awaiting first hands the WhatsApp tab to the popup
  blocker. See the warning in [`lib/leads.ts`](lib/leads.ts).
- The notification carries a **Reply on WhatsApp** link that opens a chat
  with the enquirer directly.
- Enquirer text is HTML-escaped; only the template's own tags render.
- Fields are collapsed to single spaces and capped at 900 characters, and the
  whole message at 3900, under Telegram's 4096 limit. Submissions with no
  name or no phone are dropped without a notification.

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
