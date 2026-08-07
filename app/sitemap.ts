import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * /sitemap.xml was returning 404.
 *
 * One page, so this is short — but a sitemap is still how Google learns the
 * site exists without waiting to find a link to it, and `lastModified` is
 * what prompts a re-crawl after changes.
 *
 * Anchors are deliberately NOT listed. Google treats `/#visa` as the same URL
 * as `/`, so listing them adds nothing and can look like padding.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
