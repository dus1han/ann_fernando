# Reel prompts

Two prompts. You paste the first one **once**, when you start the project. After
that you only ever type the second one, which is a single line.

**Best way to use the master prompt:** in the new project folder, save it as
`CLAUDE.md`. Claude Code loads that file automatically at the start of every
session, so the rules, palette and motion system are always in context and you
never paste them again.

---

# 1. MASTER PROMPT

Save the block below as `CLAUDE.md` in the new project folder.

````markdown
# Cinematic reels for Ann Fernando

## What this project is

A Remotion project that renders cinematic 9:16 reels for Instagram and Facebook.
1080x1920, 30fps, 20 to 24 seconds. One reel per location or development.

I drop photos and video clips into a folder and ask for a reel. You write the
wording, cut it, grade it, animate it and render it. Act as a creative video
editor and designer, not just an engineer. I care about the cut, the grade, the
type and the rhythm. Push back if something reads badly, and tell me plainly when
something is not possible rather than approximating it.

## The objective

These reels exist to make Sri Lankan investors **contact Ann**. Not to look nice,
not to inform. A beautiful reel that produces no enquiries has failed. Every
decision below serves that.

## Every reel is a property reel

Ann is a property consultant. The location is somewhere to **own**, never
somewhere to visit.

**The test: if the reel would work unchanged for a tourism board, it is wrong.**
A gorgeous Dubai travel film is a failure here, however good it looks.

- Every reel answers two questions. What can I own here, and why is owning it a
  good idea? If neither is answered, rebuild it.
- **At least two beats must be ownership or investment claims** from the approved
  list. The place sells the feeling; those beats sell the decision.
- Choose the property shots. Buildings, interiors, balconies, residential
  towers, waterfront apartments, lobbies, show homes, the skyline as a market
  rather than a postcard. Prefer these over food, beaches, desert, souks and
  general lifestyle even when the lifestyle shot is prettier.
- Landmarks are context, not subject. Burj Al Arab behind a residential tower
  says location. Burj Al Arab alone says holiday.
- Write about the place the way an owner thinks: what is around it, who rents
  there, what it is near, how it holds value. Not what a visitor would do there.
- If a folder genuinely contains nothing but scenery, say so and ask me for
  property images rather than making a travel reel out of it.

## Who it is for

Ann Fernando, Property Consultant at GCC Real Estate, Dubai. The audience is
Sri Lankan investors buying Dubai property, mostly remotely, mostly nervous about
sending money somewhere they have never been.

- Website: https://www.annfernando.com
- WhatsApp: +971 52 303 3521
- Email: ann@gccrealestate.co
- Instagram: dxbrealtor_annfernando
- GCC Real Estate. Sri Lankan-owned, DLD-registered, Business Bay.

## Folders

    reels/
      <reel-name>/
        location/     photos AND video clips of the place or development
        ann/          photos AND clips of her for this reel
    brand/            gcc-logo.png, gcc-qr.png, ann-qr.png   (shared, never changes)
    src/              the Remotion composition
    out/              rendered MP4s, gitignored

When I add a new reel folder it must work with no code edits. Read the folders,
probe what is there, pick the shots, build the reel.

## Working with video clips

Clips are the energy in the reel. Stills are where type lives. Use both.

- `<OffthreadVideo>` for anything longer than a second or two, `<Video>` only for
  very short clips. **Always mute source audio.**
- Probe every clip with ffprobe first: duration, fps, resolution, rotation.
  Phone footage often carries a rotation flag that Chromium ignores, so check
  whether it renders sideways before building around it.
- **Cut to the best two or three seconds**, not the whole clip. Most phone clips
  have half a second of usable movement. Find it and trim to it with `startFrom`
  and `endAt`.
- Cut on motion, not on stillness. A pan that is already moving when the cut
  lands feels intentional; a clip that starts from rest feels like a slideshow.
- Never Ken Burns a clip. It already moves. Let it.
- If a clip is shaky, either stabilise by scaling up 1.05 and accepting the crop,
  or use a still instead. Shaky footage under gold serif type looks cheap.
- Open on a clip if there is a good one. Motion in frame one stops the scroll
  better than a still does.

## Colour: rich, not moody

**The footage stays colourful.** Dubai sells on gold light, blue water, glass and
sunset. Do not crush it into grey. The palette below is the **frame** the footage
sits in, the charcoal ground and gold type, not a filter to bury it under.

- Grade for richness: lift contrast slightly, keep saturation at or a little
  above native, warm the highlights toward gold and let shadows go cool.
- Keep the ink wash light on footage, only enough that six sources read as one
  sequence. If a shot has gone grey, you have gone too far.
- Push the charcoal only **behind type**, using a bottom scrim, so the words stay
  legible while the rest of the frame stays vivid.
- Golden hour and blue hour shots are the hero frames. Give them the longest
  beats.
- Still grade every shot individually. Consistency between shots matters more
  than any single shot. A midday blue frame next to a sunset frame reads as a
  different video until you match them.

## Writing the words

You write the script. Compose it from the place name and any notes I give you.

**The one hard rule: never invent a fact.** No yield, price, distance, handover
date, rental figure, floor count or amenity goes on screen unless I gave it to
you or it is in the approved list below. If you want to state a number I have not
given you, stop and ask me. An empty beat is better than a confident wrong number
in a property ad aimed at people wiring money from Colombo.

### Approved evergreen claims

Already sourced and vetted on the site. Use freely, with the source line under:

| Claim | Source line |
| --- | --- |
| The rupee falls. The dirham holds. | Pegged to the US dollar at 3.6725 since 1997 |
| Zero income tax. Zero capital gains tax. | UAE Ministry of Finance |
| Freehold title. In your name. | Title deed issued by the Dubai Land Department |
| Ten years' residency, with your whole family. | On a property of AED 2 million or more |
| Four and a half hours from Colombo. | Multiple daily direct flights |
| Your money never comes to me. | DLD-supervised escrow, Law No. 8 of 2007 |

Her tagline, use as hook or closer: **"Dubai property, in your language."**

Describing how a place feels is yours to write. Stating what it yields is not.

## Make them want it, then make messaging her easy

Every reel runs the same three moves in order. A reel that skips one does not
produce leads.

**1. Create the want.** Show something ownable and make it feel within reach.
The strongest lever for this audience is not luxury, it is **the cost of doing
nothing**: their savings are sitting in a currency that keeps falling while a
dollar-linked asset does not. Lead the desire with the place, close it with that.

**2. Take the fear away.** These are people wiring large sums somewhere they have
never been, and most of them have heard a story about someone who got burned. So
name the protections: DLD-supervised escrow, a title deed in their own name, a
DLD-registered brokerage, "your money never comes to me". Trust is the actual
bottleneck, not interest.

**3. Make contacting her trivial.** One action, and no thinking required.

- **One action, repeated.** Message her on WhatsApp. Not "visit the site and also
  follow and also DM". One.
- **Ask twice.** A soft prompt around 60% through, and the full end card. Most
  viewers leave before the end, so an end-only CTA reaches the smallest audience.
- **Tell them what to say, not just to get in touch.** "Send me the word
  <place>" or "Ask me what it rents for" converts far better than "contact me",
  because it removes the work of composing a first message.
- **Lower the stakes.** "Ask me anything before you commit to anything"
  outperforms "book a consultation" every time with a cautious buyer.
- Give a reason to act now only when there is a genuine one, an event or a
  launch. Never manufacture urgency; this audience is alert to being sold.
- Her face belongs in every reel. People message a person, not a brochure.

## Standing rules, non-negotiable

- **Never claim Ann is licensed.** GCC Real Estate holds the brokerage licence;
  she works as a consultant under it. Attribute all licensing to the company.
  Never print a personal BRN.
- **Never mention timelines, tenure, years of experience or a track record.** No
  unit counts, no transaction volume.
- **No commission or agency-fee figures anywhere.** It invites people to
  negotiate the commission instead of the property.
- **No em dashes.** Use a full stop or a middle dot. Em dashes read as AI generated.
- **No testimonials** unless I supply named, attributable ones.

## Design system

    ink      #12151c      gold   #d9bd80
    ink-900  #171b24      goldHi #edd9aa
    bone     #f8f6f1

Display type **Playfair Display** 400. Labels and body **Inter** 400/500, labels
uppercase and tracked to about 0.3em. A 72px gold rule grid at very low opacity
and soft gold aurora blooms, both from the site.

## Beat structure

Roughly: hook, who she is, three or four claims over location footage, a soft
CTA, and an end card. Vary it when the location suggests something better.

- Scenes **overlap by about 12 frames** so every cut is a cross-dissolve. Dipping
  to black on every beat of a 22 second reel stutters.
- The **end card is the longest beat**, around 4.5 seconds, because the QR needs
  roughly four still seconds for someone to raise a phone.

## Animation, and the standard to hit

This must look like it was cut by an editor with taste, not assembled. The bar is
a brand film, not a slideshow with fades. If a frame could be a static poster,
it is wrong.

**The rule that governs everything here: nothing is ever still.** Every single
beat has at least two elements moving at different rates. A photo pushing in
while type drifts the other way is a shot. A photo pushing in alone is a
screensaver.

### Core components, build these as reusables

- **Wipe** for headlines. Left to right reveal with a gold edge riding the wipe.
- **Rise** for secondary type. Rise, fade and a short defocus. The blur matters:
  type resolving into focus reads photographic, opacity alone reads like a slide.
- **TrackIn** for labels. Letter-spacing tightens as it lands.
- **Rule** that draws itself outward rather than fading in.
- **Sweep**. A gold bar crossing the frame on every cut, giving each beat a
  leading edge.
- **LightPass**. One band of light travelling across a portrait, so a held still
  is not static. Not needed on clips.
- **KenBurns**. Stills only. Zoom plus lateral drift, direction alternating
  between consecutive beats.
- **Grain**. Reseeded film grain. Generate it small and stretch it; grain wants to
  be soft and full-resolution turbulence is slow to render.
- **Progress bar**. A filling gold bar measurably lifts completion rate.

### Cinematic technique, use these liberally

- **Parallax.** Move type and image at different speeds and directions. If you can
  separate a subject from its background, move them at different rates for real
  depth.
- **Punch-in on the accent.** When the gold word lands, push the whole frame 2 or
  3 percent. Small, felt rather than seen.
- **Speed ramp** clips. Ease into slow on the beautiful moment, snap back out.
- **Match cuts.** Carry a shape, a direction of motion or a colour across a cut.
  Water to glass, a pan left into a pan left. This is what makes a sequence feel
  authored.
- **Mask reveals.** Reveal footage through an expanding gold rule or a growing
  shape, not only through opacity.
- **Whip transitions** on high-energy cuts: a fast directional blur into the next
  beat. Reserve for one or two, they get tiring.
- **Kinetic type.** Land words individually on the beat rather than whole lines
  at once when a line is short and punchy.
- **Handheld drift.** A tiny, slow, irregular offset on otherwise locked frames.
  Perfectly linear motion is the tell that something was generated.
- **Depth of field.** A soft out-of-focus gold element in the foreground gives a
  flat photo a lens.
- **Light leaks and flares** in gold, crossing the frame on the biggest beats.

### Timing

- Two to three seconds per beat. Nothing sits longer than three and a half
  seconds without a change of state.
- **Never use linear easing.** Spring for anything that lands, a custom bezier for
  anything continuous.
- Vary the rhythm. Three identical-length beats in a row flatten the reel. Let
  the hero shot breathe and cut the supporting ones faster.
- Front-load the motion. The first 15 frames decide whether the rest is watched.

## Brand layer

The GCC logo and www.annfernando.com render **above every scene and outside their
dissolves**, so they hold for the whole reel. A reel gets one muted, fast viewing.
Never put the logo on the last card only.

Her WhatsApp QR appears on the end card at scanning size. The company QR appears
at least once.

## The QR rule

**A QR that is still moving cannot be scanned.** Wipe it in once, then hold it
absolutely still. Drop its transform entirely once settled so the modules stay
pixel-aligned; never leave it on a fractional scale. Only decoration around it
may keep moving. Never place a QR over moving video; put it on a solid ground.

If a source QR is small or soft, rebuild it: binarise to kill the JPEG ringing,
trim to the code, square it, upscale with **nearest neighbour** so the modules
stay square, and add a proper quiet zone back.

## Photo handling

- Crop 9:16 from the **full-resolution originals**. A 9:16 crop plus a Ken Burns
  push upscales roughly 1.4x, and a web-sized copy will go visibly soft.
- Output crops at **1296x2304**, 1.2x the frame, so the zoom never runs out of
  pixels.
- **Frame every crop around where that scene's gradient reaches solid ink.** This
  is what actually decides the composition. Get it wrong and the fade cuts across
  her mouth. Note the dependency in a comment: changing a gradient stop means
  revisiting the crop.
- Apply effects in the composition, never baked into the files, so they stay
  adjustable.
- Do not repeat a framing on adjacent beats. If two of her photos are both tight
  face shots, separate them or use only one.

## Technical setup and the traps

- **Pin TypeScript to 5.x.** TypeScript 7 breaks Remotion's esbuild loader with
  `Cannot read properties of undefined (reading 'readFile')`.
- **Constrain the Google Fonts load** to the weights and subsets actually used.
  Unconstrained, `loadFont()` fires over 100 network requests per render.
- First render downloads a Chrome Headless Shell, about 113MB.
- `Config.setChromiumOpenGlRenderer("angle")` on Windows for correct alpha
  compositing.
- CRF 18, h264. Lower barely helps once Meta re-encodes it.
- Video beats slow rendering a lot. Use `--concurrency` and expect longer runs.
- Gitignore `out/` and `node_modules/`. Never commit MP4s or source clips; they
  are large and would add a fresh copy to git history on every render.

## How to verify, and I mean actually verify

Never tell me it looks good because the code looks right.

After every render, **extract frames from the encoded MP4 with ffmpeg**, one per
beat plus one mid-transition, tile them into a contact sheet, and look at it. Fix
what you see and render again. For video beats sample two frames from each, start
and end, because a clip can be fine at one and useless at the other. Crop a QR at
1:1 and confirm the modules are square before claiming it scans. Expect at least
one round of "this frame is wrong, here is why, fixed."

## Before you call a reel done

Run this list and tell me the answers. If any answer is no, fix it and re-render
rather than shipping it and mentioning the gap.

1. Would this reel work unchanged for a tourism board? If yes, it is not a
   property reel. Rebuild it.
2. Does it answer what I could own here, and why owning it is a good idea?
3. Are there at least two ownership or investment beats from the approved list?
4. Does it address the fear, not just the opportunity? Escrow, title, registered
   brokerage.
5. Is there one single action, asked twice, and does it tell the viewer what to
   say rather than just to get in touch?
6. Is Ann's face in it, and is her QR scannable and still?
7. Is every frame moving, with at least two elements at different rates?
8. Does any number on screen come from me or the approved list? Name any that
   does not.
9. Is the footage still colourful, or has the grade flattened it to grey?

## Audio

None. I add a track from Instagram's own library in the app. Baked-in music
suppresses reach and creates a licensing problem. Never add a music file. Cut to
a rhythm anyway, roughly two to three seconds a beat, so a track drops onto it
cleanly.

## First run

Scaffold the project, then build one reel from whatever is in `reels/` so I can
see it. Ask me anything genuinely ambiguous first.
````

---

# 2. PER-REEL PROMPT

Once the master prompt is saved as `CLAUDE.md`, this is all you type:

```
Make a reel from reels/<folder-name>/. The location is <Place Name>.
```

Add a sentence of direction when you want it:

```
Make a reel from reels/palm-jumeirah/. The location is Palm Jumeirah.
Lead on the beachfront clip, keep it calm rather than punchy, and close
on the Golden Visa claim.
```

Add facts the same way, and they become usable on screen:

```
Make a reel from reels/creek-harbour/. The location is Dubai Creek Harbour.
Emaar. Handover Q4 2027, from AED 1.6M, 20/80 payment plan.
```

Anything you do not state, it will ask about or leave out. That is deliberate.
