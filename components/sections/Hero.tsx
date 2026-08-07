"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import HeroBackdrop from "@/components/HeroBackdrop";
import { agent, hero, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Portrait drifts slower than the text — depth without a heavy parallax lib.
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0]);

  const words = hero.headlineLead.split(" ");

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Three Dubai frames cross-dissolving under a Ken Burns push. */}
      <HeroBackdrop />

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8"
      >
        {/* ── Copy ────────────────────────────────────────────────────── */}
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold-600" />
            <Say
              v={hero.eyebrow}
              className="text-xs uppercase tracking-[0.3em] text-gold-500"
            />
            <span className="text-xs tracking-[0.3em] text-bone-faint">
              LK → AE
            </span>
          </motion.div>

          {/* Her name is the H1 — this is a personal brand, not a listings site. */}
          <h1 className="glow-gold font-display text-[clamp(3rem,8vw,6rem)] font-light leading-[0.98] tracking-[-0.025em] text-bone">
            {words.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: "0.4em" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.09, ease: EASE }}
                className="mr-[0.2em] inline-block"
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-4 text-sm uppercase tracking-[0.28em] text-gold-500"
          >
            {hero.roleLine}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
            className="mt-7 font-display text-[clamp(1.5rem,3vw,2.3rem)] font-light leading-tight text-bone"
          >
            {hero.taglineLead}{" "}
            <Say v={hero.headlineAccent} className="italic text-gold-400" />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          >
            <Say
              as="p"
              v={hero.sub}
              className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone-dim"
            />

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full bg-gold-500 px-8 py-4 text-base font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">
                  <Say v={hero.ctaPrimary} />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href="#proposal"
                className="rounded-full border border-ink-600 px-8 py-4 text-base text-bone-dim transition-colors duration-300 hover:border-gold-600 hover:text-bone"
              >
                {hero.ctaSecondary.en}
              </a>
            </div>

            {/* Company endorsement — credibility is attributed to the
                brokerage, never claimed personally. */}
            <div className="mt-10 inline-flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-ink-700/70 bg-ink-950/50 px-6 py-4 backdrop-blur-sm">
              <span className="text-[11px] uppercase tracking-[0.2em] text-bone-faint">
                {agent.role} at
              </span>
              <Image
                src="/brand/gcc-logo-light.png"
                alt={agent.companyLegal}
                width={200}
                height={60}
                className="h-10 w-auto"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Portrait ────────────────────────────────────────────────── */}
        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
          className="relative lg:col-span-5"
        >
          {/*
            NO FRAME. She breaks out of her column (-mr/-mt on large screens)
            and her edges are masked away, so she reads as standing in the page
            rather than sitting in a card.

            When a real transparent PNG of her exists, swap the src, drop
            `feather-figure` and the darkening overlay, and this becomes a true
            cut-out with no further layout change.
          */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md lg:-mr-16 lg:-mt-10 lg:max-w-none lg:scale-[1.14] xl:-mr-28">
            {/* Gold bloom behind her, so she is lit from the page not framed by it */}
            <div className="aurora pointer-events-none absolute inset-[-18%] -z-10 rounded-full bg-[radial-gradient(ellipse_54%_58%_at_50%_44%,rgba(217,189,128,0.20),transparent_70%)]" />

            <div className="relative h-full w-full">
              {/* Deliberately NOT `priority`. On mobile this sits below a tall
                  copy block, so preloading it only competes for bandwidth with
                  the backdrop, which is the real LCP element. */}
              <Image
                src="/images/ann-hero.jpg"
                alt="Ann Fernando, Property Consultant, in a Dubai villa"
                fill
                quality={80}
                sizes="(max-width: 1024px) 90vw, 560px"
                style={{ objectPosition: "50% 30%" }}
                className="feather-figure object-cover"
              />

              {/* Darkens the room from the middle outwards BEFORE the mask
                  fades it, so a bright interior does not leave a glowing halo
                  against the dark page. This is what sells the cut-out. */}
              <div className="feather-figure pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_52%_56%_at_50%_38%,transparent_38%,rgba(18,21,28,0.80)_78%,#12151c_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
            </div>

            {/* Name floats on the page — no panel, no border */}
            <div className="absolute inset-x-0 bottom-2 text-center lg:bottom-6">
              <p className="glow-gold font-display text-3xl font-light leading-none text-bone">
                {agent.name}
              </p>
              <p className="mt-2.5 text-[11px] uppercase tracking-[0.26em] text-gold-500">
                {agent.role} · Dubai
              </p>
              <span className="mx-auto mt-4 block h-px w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                {agent.companyLegal} · DLD registered
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-bone-faint">
          {hero.scrollCue}
        </span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-gold-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
