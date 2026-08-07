import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * /robots.txt was returning 404. Google will crawl a site without one, but
 * the sitemap reference here is the fastest way to get the page discovered
 * and re-crawled after changes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing to hide; the slot inspector is a query param, not a route.
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
