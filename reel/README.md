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
- Photography is imported from `../public/images`, not duplicated
- Colours in `src/theme.ts` mirror `app/globals.css`

So **changing the roadshow date in `content/copy.ts` and re-rendering updates the
reel**. Nothing here restates a fact the site does not already state.

## The standing content rules apply here too

Every claim in the reel is lifted verbatim from `content/copy.ts`. In particular:

- No licensing claim is attached to Ann personally, only to GCC Real Estate
- No timeline, tenure or track record
- No commission or agency-fee figure
- No em dashes

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
