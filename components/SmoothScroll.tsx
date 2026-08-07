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
    };
  }, []);

  return null;
}
