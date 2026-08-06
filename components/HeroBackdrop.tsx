"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/**
 * Hero backdrop — one frame, treated properly.
 *
 * Dubai Marina from above at night: lit towers, moored yachts, gold light
 * running across the water. Chosen as the scroll-stopper because it reads as
 * *real estate* instantly — these are the actual buildings people buy into —
 * and its warm light already matches the gold palette.
 *
 * A single strong image with a slow breathing push beats a slideshow here:
 * nothing competes with the name, and the frame never feels static.
 * Freezes entirely under prefers-reduced-motion.
 */
export default function HeroBackdrop() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Very slow breathing push — 28s round trip, imperceptible frame to
          frame but the image is never quite still. */}
      <motion.div
        className="absolute inset-0"
        style={{ willChange: "transform" }}
        initial={{ scale: 1.04 }}
        animate={{ scale: reduced ? 1.04 : [1.04, 1.13, 1.04] }}
        transition={{
          duration: 28,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <Image
          src="/images/hero-marina-night.jpg"
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
          style={{ objectPosition: "center 58%" }}
          /* PERF: warmth is baked into the image filter rather than applied
             with a full-screen mix-blend layer — blend modes force the whole
             viewport to recomposite on every scroll frame. */
          className="object-cover brightness-[1.1] contrast-[1.06] saturate-[1.3] sepia-[0.12] hue-rotate-[-6deg]"
        />
      </motion.div>

      {/* ── Grading ──────────────────────────────────────────────────
          A night frame is already dark, so the overlays only carve a
          readable well on the left. The right side stays fully open so the
          tower lights and water reflections carry the frame. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/74 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-ink-950/35" />

      {/* Light vignette — the night shot falls off on its own */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_50%,transparent_48%,rgba(10,11,14,0.55)_100%)]" />

      {/* Gold blooms */}
      <div className="aurora absolute right-[6%] top-[6%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(217,189,128,0.22),transparent_66%)]" />
      <div className="aurora-slow absolute -left-[12%] bottom-[4%] h-[32vmax] w-[32vmax] rounded-full bg-[radial-gradient(circle,rgba(217,189,128,0.14),transparent_66%)]" />

      {/* Hairline horizon + fade into the section below */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-600/45 to-transparent" />
    </div>
  );
}
