"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { fbTrack } from "@/lib/pixel";

/**
 * One document-level listener that records every contact action on the page.
 *
 * The site has eleven separate contact points - WhatsApp buttons in the hero,
 * affordability, visa, gallery, shortlist, proposal, FAQ and contact, plus the
 * floating button, the tel: links and the mailto: links. Instrumenting each
 * component individually would mean eleven edits now and a forgotten one every
 * time a section is added.
 *
 * Listening on `document` in the capture phase catches all of them, including
 * any added later, and records WHICH section produced the click - so you can
 * see whether people convert off the Golden Visa argument or the FAQ.
 *
 * Note: Vercel Web Analytics counts page views on every plan. Custom events
 * like these may require Pro - `track()` fails silently if unsupported, so
 * there is no error either way.
 */
export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      // Which section did this come from - the whole point of the exercise.
      const section =
        link.closest("section")?.id ||
        link.closest("footer")?.tagName.toLowerCase() ||
        "unknown";

      if (href.includes("wa.me")) {
        track("whatsapp_click", { section });
        /**
         * Only the DIRECT WhatsApp links are a contact attempt. Every other
         * wa.me button is intercepted by WhatsAppToForm and turned into a
         * scroll to the enquiry form, which fires its own event and then
         * Lead on submit. Counting those here too would report one person
         * three times and inflate the rate the ads are optimised against.
         *
         * Testing the attribute rather than `e.defaultPrevented` is
         * deliberate: it is the same condition WhatsAppToForm branches on,
         * so the two cannot drift, and it does not depend on which listener
         * happened to be registered first.
         */
        if (link.hasAttribute("data-wa-direct")) {
          fbTrack("Contact", { method: "whatsapp", section });
        }
      } else if (href.startsWith("tel:")) {
        track("call_click", { section });
        fbTrack("Contact", { method: "phone", section });
      } else if (href.startsWith("mailto:")) {
        track("email_click", { section });
        fbTrack("Contact", { method: "email", section });
      } else if (href.includes("instagram.com")) {
        track("social_click", { section, network: "instagram" });
      } else if (href.includes("facebook.com")) {
        track("social_click", { section, network: "facebook" });
      } else if (href.includes("google.com/maps")) {
        track("map_click", { section });
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    // How far people actually get. Fires once per depth, per page load.
    const marks = [25, 50, 75, 90];
    const hit = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const m of marks) {
        if (pct >= m && !hit.has(m)) {
          hit.add(m);
          track("scroll_depth", { depth: `${m}%` });
        }
      }
      if (hit.size === marks.length) {
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
