/**
 * Remembers which ad brought someone to the site.
 *
 * WHY THIS EXISTS
 * The enquiry form does not post to a server — it composes a WhatsApp message
 * and hands the visitor to WhatsApp. That is the right call for this market
 * (see the note at the top of Contact.tsx), but it means the moment a lead
 * becomes a real conversation, it leaves every system that can measure it:
 * Meta cannot see WhatsApp, and neither can Vercel.
 *
 * So the campaign is captured on landing, kept, and written into the enquiry
 * itself. Ann then reads the source in the chat, which is the only place the
 * ad and the actual conversation ever meet.
 *
 * LAST TOUCH, 30 DAYS
 * A newer ad click overwrites an older one — the standard convention, and it
 * matches how Meta reports. 30 days is deliberately wider than Meta's default
 * 7-day click window, because the decision cycle on a property purchase is
 * measured in weeks and a click that led to an enquiry 20 days later is still
 * the click that caused it.
 *
 * localStorage, not sessionStorage: someone clicks the ad, reads, closes the
 * tab, and comes back two days later to enquire. That is a normal path for a
 * purchase this size and sessionStorage would forget it.
 */

const KEY = "ann:attribution";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export type Attribution = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  /** Meta's click id. Present on any click from a Facebook or Instagram ad. */
  fbclid?: string;
  savedAt: number;
};

/**
 * Records the campaign from the current URL, if there is one.
 *
 * Called once on mount. A visit with no campaign parameters does NOT clear a
 * stored one — that would erase the ad credit the moment someone navigated to
 * a clean URL, which is most of the time.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;

  const q = new URLSearchParams(window.location.search);
  const get = (k: string) => q.get(k)?.slice(0, 120) || undefined;

  const fbclid = get("fbclid");
  const source = get("utm_source");
  const campaign = get("utm_campaign");

  // Nothing identifying an ad, so nothing to record.
  if (!fbclid && !source && !campaign) return;

  const next: Attribution = {
    // A bare fbclid with no UTMs means the ad was built without a tracking
    // template. Still knowable: only Meta issues fbclid.
    source: source ?? (fbclid ? "facebook" : undefined),
    medium: get("utm_medium") ?? (fbclid ? "paid" : undefined),
    campaign,
    content: get("utm_content"),
    term: get("utm_term"),
    fbclid,
    savedAt: Date.now(),
  };

  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Safari private mode throws on write. Attribution is a nice-to-have; the
    // enquiry itself must never break because of it.
  }
}

/** The stored campaign, or null if there is none or it has expired. */
export function readAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Attribution;
    if (!parsed?.savedAt || Date.now() - parsed.savedAt > MAX_AGE_MS) {
      window.localStorage.removeItem(KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * A short human-readable label — this is what Ann actually reads in WhatsApp,
 * so it favours the campaign name over the machine detail.
 *
 * Returns null rather than "direct" so callers can distinguish "came from an
 * ad" from "did not", instead of printing a meaningless line for the majority
 * of visitors who arrived organically.
 */
export function attributionLabel(a: Attribution | null): string | null {
  if (!a) return null;
  const parts = [a.campaign, a.content].filter(Boolean);
  if (parts.length) return parts.join(" / ");
  if (a.source) return a.source;
  return a.fbclid ? "facebook ad" : null;
}
