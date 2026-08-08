# Prompt: cinematic location reels

Paste everything below the line into a fresh Claude Code session in a new,
empty folder. It carries the decisions and the failures from building
`reel/`, so the new project should not have to rediscover them.

---

## What I want built

A **Remotion** project that renders cinematic 9:16 reels for Instagram and
Facebook, one per Dubai location or development. 1080x1920, 30fps, roughly 20
to 24 seconds. I drop assets into folders, run one command, and get an MP4.

These promote **Ann Fernando**, Property Consultant at **GCC Real Estate**
(Dubai), to **Sri Lankan investors**. Her site is **https://www.annfernando.com**.

Act as a creative video editor and designer, not just an engineer. I care about
the cut, the grade, the type and the rhythm. Push back on my ideas if you think
something reads badly, and tell me plainly when something is not possible.

## Folder structure

```
content/
  locations/
    <slug>/
      location.json      # I fill this in. The only source of facts.
      images/            # photos of that location or development
  ann/                   # photos of Ann, shared across every reel
  brand/
    gcc-logo.png
    gcc-qr.png           # company QR
    ann-qr.png           # her WhatsApp QR
src/                     # Remotion composition
out/                     # rendered MP4s, gitignored
```

Render with `npm run render -- --props='{"slug":"dubai-marina"}'` or equivalent.
Adding a new location must mean **adding a folder, not editing code**. Register
compositions dynamically from the folders present.

## location.json

Design the schema, but it must carry at minimum: the place name, a one-line
positioning phrase, and an array of claims where **every claim has its own
`source` string**. Also an optional event block (dates, venue, times, entry) for
when there is a roadshow to promote.

## Copy generation, and the hard rule under it

Generate the reel's script automatically from `location.json`. Compose the
lines, choose which claims lead, order the beats, and fit the type. That is your
job.

**But never invent a fact.** No yield percentage, price, distance, handover
date, rental figure or amenity may appear on screen unless it is in
`location.json` with a source. If a slot has no sourced fact, use fewer beats.
An empty beat is fine. A confident wrong number in a property ad is not.

If I leave a field blank, ask me for it or drop the beat. Do not fill it in from
what you know about Dubai.

## Standing rules, non-negotiable

These come from the main site and apply to every frame:

- **Never claim Ann is licensed.** GCC Real Estate holds the brokerage licence,
  she works as a consultant under it. Attribute all licensing to the company.
  Never print a personal BRN.
- **Never mention timelines, tenure, years of experience, or a track record.**
  No unit counts, no transaction volume.
- **No commission or agency-fee figures anywhere.**
- **No em dashes.** Use a full stop or a middle dot. Em dashes read as AI
  generated.
- **No testimonials** unless I supply named, attributable ones.

## Design system

Charcoal and gold, matching the site:

```
ink      #12151c      gold   #d9bd80
ink-900  #171b24      goldHi #edd9aa
bone     #f8f6f1
```

Display type: **Playfair Display** 400. Labels and body: **Inter** 400/500,
uppercase labels tracked to about `0.3em`. A 72px gold rule grid at very low
opacity, and soft gold aurora blooms, both lifted from the site.

## Beat structure

Roughly: hook, who she is, three or four location claims, the event if there is
one, end card. Vary it if the location suggests something better.

- Scenes **overlap by about 12 frames** so every cut is a cross-dissolve, not a
  dip to black. Dipping to black on every beat of a 22 second reel stutters.
- The **end card is the longest beat**, around 4.5 seconds, because the QR needs
  roughly four still seconds for someone to raise a phone.

## Motion vocabulary

Build these as reusable components. This is what makes it read as shot rather
than animated:

- **Wipe** for headlines. Left to right reveal with a gold edge riding the wipe.
- **Rise** for secondary type. Rise, fade and a short defocus. The blur is the
  part that matters: type resolving into focus reads photographic, opacity alone
  reads like a slide deck.
- **TrackIn** for labels. Letter-spacing tightens as it lands.
- **Rule** that draws itself outward rather than fading in.
- **Sweep**. A gold bar crossing the frame on every cut, giving each beat a
  leading edge.
- **LightPass**. One band of light travelling across a portrait, so a held shot
  is not static.
- **KenBurns**. Zoom plus lateral drift, direction alternating between
  consecutive beats, with per-shot colour correction.
- **Grain**. Reseeded film grain. Generate it small and stretch it, grain wants
  to be soft and full-resolution turbulence is slow.
- **Progress bar**. A filling gold bar measurably lifts completion rate.

Use spring physics, not linear tweens, for anything that lands.

## Brand layer

The GCC logo and `www.annfernando.com` render **above every scene and outside
their dissolves**, so they hold for the entire reel. A reel gets one muted, fast
viewing. Do not put the logo on the last card only.

Both QRs must appear: hers on the end card at scanning size, and on the event
beat if there is one. The company QR at least once.

## The QR rule

**A QR that is still moving cannot be scanned.** Wipe it in once, then hold it
absolutely still. Drop its transform entirely once settled so the modules stay
pixel-aligned; never leave it on a fractional scale. Only decoration around it
may keep moving.

If a source QR is a small or soft JPEG, rebuild it: binarise to kill the
compression ringing, trim to the code, square it, upscale with **nearest
neighbour** so the modules stay square, and add a proper quiet zone back.

## Photo handling

- Crop 9:16 from the **full-resolution originals**, not from web-optimised
  copies. A 9:16 crop plus a Ken Burns push upscales roughly 1.4x, and a 1600px
  web copy will go visibly soft.
- Output crops at **1296x2304**, which is 1.2x the frame, so the zoom never runs
  out of pixels.
- **Frame every crop around where that scene's gradient reaches solid ink.** This
  is the thing that actually decides the composition. Get it wrong and the fade
  cuts across her mouth. Note the dependency in comments: changing a gradient
  stop means revisiting the crop.
- **Grade every shot individually.** A midday blue frame dropped next to a dusk
  skyline reads as a different video. Pull saturation and brightness down on the
  bright ones.
- For portraits shot in white marble interiors against bright windows,
  desaturating alone leaves them cold grey. Add a **gold wash on soft-light** to
  warm the midtones back without lifting the blacks.
- Apply effects in the composition, not baked into the files, so they stay
  adjustable.
- Do not repeat a framing on adjacent beats. If two of her photos are both tight
  face shots, separate them.

## Technical setup, and the traps

- **Pin TypeScript to 5.x.** TypeScript 7 breaks Remotion's esbuild loader with
  `Cannot read properties of undefined (reading 'readFile')`.
- **Constrain the Google Fonts load** to the weights and subsets actually used.
  Unconstrained, `loadFont()` fired 126 network requests per render.
- If this project ever sits inside a Next.js app, **exclude it from the Next
  `tsconfig.json`**. Next types image imports as `StaticImageData`, Remotion's
  `<Img>` takes a string, and the site build will fail.
- First render downloads a Chrome Headless Shell, about 113MB.
- `Config.setChromiumOpenGlRenderer("angle")` on Windows for correct alpha
  compositing.
- CRF 18, h264. Lower barely helps once Meta re-encodes it.

## How to verify, and I mean actually verify

Do not tell me it looks good because the code looks right.

After every render, **extract frames from the encoded MP4 with ffmpeg**, one per
beat plus one mid-transition, tile them into a contact sheet, and look at it.
Then fix what you see and render again. Crop a QR at 1:1 and confirm the modules
are square before you claim it scans.

I expect at least one round of "this frame is wrong, here is why, fixed."

## Audio

None. I will add a track from Instagram's own library in the app. Baked-in music
suppresses reach and creates a licensing problem. Do not add a music file.

## Deliverables

1. The Remotion project, rendering from folders with no code edits per location.
2. A `README.md` covering how to render, how to add a location, the QR rule, the
   crop-and-gradient dependency, and the traps above.
3. One rendered example reel, verified frame by frame.
4. `out/` and `node_modules/` gitignored. Do not commit MP4s, they are
   reproducible and would add a new copy to history on every render.

Start by asking me anything genuinely ambiguous, then build.
