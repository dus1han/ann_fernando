/**
 * Meta (Facebook) Pixel — the thin call layer.
 *
 * The pixel itself is loaded by `components/MetaPixel.tsx`. Everything else on
 * the site talks to it through here, so there is exactly one place that knows
 * the global's shape and exactly one place that handles it being absent.
 *
 * ⚠ NEVER pass a name, phone number, email or free-text message into these.
 * Meta rejects payloads containing raw personal data and it is a genuine
 * privacy problem, not just an API error. Categories and section names only.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Ann's live dataset, from Events Manager. Hardcoded rather than left to an
 * environment variable so the pixel cannot be silently switched off by a
 * missing Vercel setting — a pixel that quietly reports nothing is worse than
 * one that reports a little test traffic.
 *
 * `NEXT_PUBLIC_META_PIXEL_ID` still overrides it, for pointing a branch at a
 * separate test dataset.
 */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "943279378030393";

/**
 * Meta's own standard events. Using the standard names rather than custom ones
 * matters: only these can be selected as an optimisation objective when a
 * campaign is set up, and only these populate the built-in reporting columns.
 *
 * `Lead` is the one that counts here — it is what an ad should be optimised
 * for, and it fires on enquiry form submit.
 */
type StandardEvent = "PageView" | "Lead" | "Contact" | "ViewContent";

type Params = Record<string, string | number>;

/** Fires a Meta standard event. Silent no-op when the pixel is not installed. */
export function fbTrack(event: StandardEvent, params?: Params) {
  if (typeof window === "undefined") return;
  window.fbq?.("track", event, params);
}

/**
 * Fires a custom event. These cannot be used as a campaign objective directly,
 * but they can be turned into a Custom Conversion in Events Manager and they
 * show up in the funnel. Use for intent steps that are not yet a lead.
 */
export function fbTrackCustom(event: string, params?: Params) {
  if (typeof window === "undefined") return;
  window.fbq?.("trackCustom", event, params);
}
