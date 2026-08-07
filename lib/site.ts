/**
 * Single source of truth for the site's public URL.
 *
 * ⚠ This must resolve to a URL that is actually reachable. It drives
 * `metadataBase` (which builds the absolute og:image URL), the canonical tag,
 * robots.txt and the sitemap. It was previously hardcoded to a placeholder
 * domain that did not exist, which is why link previews came back blank.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — override in Vercel if the domain changes
 *   2. The live domain
 *   3. localhost, only when running outside a deployment
 */
export const PRODUCTION_URL = "https://annfernando.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL ? PRODUCTION_URL : "http://localhost:3000");
