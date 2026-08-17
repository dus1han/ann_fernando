"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { fbTrackCustom } from "@/lib/pixel";

/**
 * Sends every WhatsApp button on the page to the enquiry form instead.
 *
 * The form itself then composes the WhatsApp message on submit, so the route is
 * button, form, WhatsApp. There is only ever one form: the real one in the
 * Contact section.
 *
 * WHY IT INTERCEPTS RATHER THAN CHANGING THE BUTTONS
 * Fourteen sections render `<a href={whatsappHref}>` and nearly all of them are
 * server components. Repointing each at "#contact" would mean fourteen edits now
 * and a forgotten one every time a section is added, and it would also throw
 * away the per-section prefilled text. One capture-phase listener on `document`
 * catches all of them, including any added later. ConversionTracking and
 * SmoothScroll both already work this way.
 *
 * THE ONE EXCEPTION
 * The floating green button carries `data-wa-direct` and goes straight to
 * WhatsApp. It is the escape hatch for someone who has already decided.
 */
export default function WhatsAppToForm() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Modified clicks are someone deliberately opening a new tab. Leave them.
      if (
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.button !== 0
      ) {
        return;
      }

      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (!href.includes("wa.me")) return;
      if (link.hasAttribute("data-wa-direct")) return;

      const target = document.getElementById("contact");
      if (!target) return; // never trap the click if the form is not on the page

      e.preventDefault();

      const section =
        link.closest("section")?.id ||
        link.closest("footer")?.tagName.toLowerCase() ||
        "unknown";
      track("enquiry_form_open", { section });
      // The middle of the Meta funnel: PageView → EnquiryFormOpen → Lead.
      // Custom rather than standard because nobody has given a detail yet —
      // reporting this as a Lead would teach the ad to find people who click.
      fbTrackCustom("EnquiryFormOpen", { section });

      // Each button carries its own prefilled text, which is the context of
      // whatever the reader was looking at when they decided to ask. Hand it to
      // the form rather than discarding it. The form owns its own state, so
      // this goes across as an event rather than by lifting state up.
      let message = "";
      try {
        message =
          new URL(href, window.location.origin).searchParams.get("text") ?? "";
      } catch {
        message = "";
      }
      // The form's submit handler writes its own "Hi Ann" opener.
      message = message.replace(/^\s*Hi Ann,?\s*/i, "").trim();

      // Lenis owns the scroll position on desktop, so a native smooth scroll
      // would fight its rAF loop. SmoothScroll publishes the instance for
      // exactly this. On touch and reduced-motion there is no Lenis and the
      // native path is correct.
      const lenis = (
        window as unknown as {
          __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void };
        }
      ).__lenis;

      if (lenis) {
        lenis.scrollTo(target, { offset: -72 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      window.dispatchEvent(
        new CustomEvent("enquiry:prefill", { detail: { message, section } })
      );
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
