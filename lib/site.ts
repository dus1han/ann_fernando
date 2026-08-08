/**
 * Single source of truth for the site's public URL.
 *
 * ⚠ This must resolve to a URL that is actually reachable. It drives
 * `metadataBase` (which builds the absolute og:image URL), the canonical tag,
 * robots.txt and the sitemap. It was previously hardcoded to a placeholder
 * domain that did not exist, which is why link previews came back blank.
 *
 * ⚠ It must also match whichever host Vercel treats as PRIMARY. Vercel is set
 * to www, so the apex 308-redirects to it. While this said the apex, every
 * canonical, og:url, og:image and sitemap entry pointed at a URL that
 * immediately redirected: crawlers still resolved it, but Search Console
 * reports sitemap URLs that redirect, and a canonical pointing away from the
 * URL that actually serves is a contradictory signal. The printed creatives
 * say www too, so www is the one to standardise on.
 *
 * If the primary is ever flipped to the apex in Vercel, flip this with it.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — override in Vercel if the domain changes
 *   2. The live domain
 *   3. localhost, only when running outside a deployment
 */
export const PRODUCTION_URL = "https://www.annfernando.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL ? PRODUCTION_URL : "http://localhost:3000");
