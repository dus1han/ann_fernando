# Reel

A 9:16 social reel (1080x1920, 30fps, ~21s) built in [Remotion](https://remotion.dev),
which renders React through headless Chromium. That is what buys the CSS filters,
masks and blur-in transitions the earlier GDI+ approach could not do.

## Render

```bash
cd reel
npm install
npm run render     # -> reel/out/ann-reel.mp4
npm run studio     # live preview, scrub the timeline, edit and see it instantly
```

First render downloads a Chrome Headless Shell (~113MB) into the Remotion cache.
Font files are fetched from Google at render time, so the first render needs
network.

`out/` and `node_modules/` are gitignored. The MP4 is not committed because it
is fully reproducible from this source, and a 13MB binary would accumulate a new
copy in git history on every re-render.

## It shares the site's single source of truth

- Copy, dates and contact details come from `../content/copy.ts`
- The URL comes from `../lib/site.ts`
- Property photography is imported from `../public/images`, not duplicated
- Colours in `src/theme.ts` mirror `app/globals.css`

Her three frames are the exception and live in `assets/`. They are cut 9:16 from
the full-resolution originals in `Ann Photos`, because the `public/images`
copies are downscaled to a 1600px long edge and a 9:16 crop plus a Ken Burns
push would have upscaled them about 1.4x. The crops are 1296x2304, which is
1.2x the output, so the zoom never runs out of pixels.

One frame each, chosen so no two adjacent beats repeat a framing:

| Asset | Beat | Why |
| --- | --- | --- |
| `ann-portrait.jpg` | Who she is | Close, straight to camera. Introduces her as a person before any argument is made. |
| `ann-suit.jpg` | Roadshow | The line is "meet me", so you should see who you would be meeting. Also the darkest of the three, which lets the gold panel sit on top of it. |
| `ann-stone.jpg` | End card | The only frame whose own background is already the palette, a gold carved panel. |

Each crop is framed around where that scene's gradient reaches solid ink. Change
a gradient stop and the crop needs revisiting, or it will cut across her face.

So **changing the roadshow date in `content/copy.ts` and re-rendering updates the
reel**. Nothing here restates a fact the site does not already state.

## The standing content rules apply here too

Every claim in the reel is lifted verbatim from `content/copy.ts`. In particular:

- No licensing claim is attached to Ann personally, only to GCC Real Estate
- No timeline, tenure or track record
- No commission or agency-fee figure
- No em dashes

## Brand marks are persistent, not per-scene

`<Brand>` renders the GCC logo top-right and the URL top-left **above every
scene and outside their dissolves**, so both are on screen for the full 22
seconds. They used to appear on the last two beats only. A reel gets one muted,
fast viewing, so the mark has to be there the whole time.

The WhatsApp QR appears twice: inside the roadshow panel, and large on the end
card.

## ⚠ Never animate the QR after it lands

`<QrPlate>` wipes the code in once and then holds it **absolutely still**, and
drops its transform entirely once settled so the modules stay pixel-aligned. A
QR that is still moving, scaling, or sitting on a fractional transform cannot be
scanned. Only the conic gold ring around it rotates.

The end card is the longest beat (138 frames) for the same reason: the code needs
roughly four still seconds for someone to raise a phone.

## Motion vocabulary

| Component | What it does |
| --- | --- |
| `Wipe` | Headline reveal, left to right, with a gold edge riding the wipe. Optional `drift` keeps a line moving after it lands. |
| `Rise` | Rise, fade and defocus. The blur is what makes type read as shot rather than animated. |
| `TrackIn` | Letter-spacing tightens as a label lands. |
| `Rule` | Gold rule draws itself outward instead of fading. |
| `Sweep` | Gold bar crosses the frame on every cut, giving each beat a leading edge. |
| `LightPass` | One band of light travels across her portrait, so a static cut-out is not static. |
| `KenBurns` | Zoom plus lateral drift, direction alternating between beats, with per-shot colour correction. |
| `Grain` | Reseeded film grain, generated small and stretched because grain wants to be soft. |

`Wipe`'s `drift` is used once, on "The rupee falls." The line keeps falling while
"The dirham holds." does not move at all.

## Audio

There is none, deliberately. Upload it and add a track from Instagram's or
Facebook's own library in the app. Baked-in music suppresses reach compared with
a track picked from their catalogue, and it avoids a licensing problem.

## Own tsconfig, own dependency tree

`reel` is excluded from the site's `tsconfig.json`. Next types image imports as
`StaticImageData` via `next-env.d.ts`, while Remotion's `<Img>` takes a plain
string, so leaving it in breaks `next build`. Check this project with:

```bash
cd reel && npx tsc --noEmit
```

## Structure

| File | Purpose |
| --- | --- |
| `src/Reel.tsx` | The eight beats, their timing and their copy |
| `src/components.tsx` | Scene dissolve, Ken Burns, text rise, scrim, grid, bloom |
| `src/theme.ts` | Palette and timing tokens, mirrored from the site |
| `remotion.config.ts` | Codec, CRF, Chromium renderer |

Beats: hook, who she is, currency, tax, freehold, visa, roadshow, end card.
Scenes overlap by `XFADE` (12 frames) so each cut is a dissolve rather than a
dip to black.
