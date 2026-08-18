"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling. This single component is responsible for most of the
 * "expensive agency site" feel - it is disabled entirely for users who have
 * asked for reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Skip on touch devices. Lenis hijacks native momentum scrolling, which on
    // a phone feels worse than the platform default and costs a rAF loop plus
    // a transform every frame - straight into Total Blocking Time.
    const isTouch =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Published so other components can scroll through Lenis instead of
    // fighting it. WhatsAppToForm uses this to reach the enquiry form; a native
    // smooth scroll would be overridden by the rAF loop below on the next tick.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors must go through Lenis or they fight each other.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  /**
   * Lands a URL opened directly at a hash - /#contact from a Facebook ad - in
   * the right place.
   *
   * The browser makes its own jump on load, but it does so before the imagery
   * above has finished loading, and the page height keeps changing underneath
   * it. By the time everything settles, the target has moved and the visitor is
   * looking at the wrong section. This re-runs the scroll once the page is
   * genuinely finished, and goes through Lenis where Lenis exists so the two do
   * not fight over the scroll position.
   *
   * Deliberately a separate effect from the one above, which returns early on
   * touch devices and for reduced motion. A hash landing has to work in both.
   */
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;

    let cancelled = false;

    const land = () => {
      if (cancelled) return;

      let target: Element | null = null;
      try {
        target = document.querySelector(hash);
      } catch {
        return; // a hash that is not a valid CSS selector, e.g. #1abc
      }
      if (!target) return;

      const lenis = (
        window as unknown as {
          __lenis?: {
            scrollTo: (
              t: HTMLElement,
              o?: { offset?: number; immediate?: boolean }
            ) => void;
          };
        }
      ).__lenis;

      if (lenis) {
        // immediate, not animated: someone who asked for #contact expects to
        // be there, not to watch the page scroll past everything first.
        lenis.scrollTo(target as HTMLElement, { offset: -72, immediate: true });
      } else {
        // scroll-margin-top in globals.css supplies the nav offset here.
        target.scrollIntoView({ block: "start" });
      }
    };

    if (document.readyState === "complete") {
      requestAnimationFrame(land);
    } else {
      window.addEventListener("load", () => requestAnimationFrame(land), {
        once: true,
      });
    }

    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
