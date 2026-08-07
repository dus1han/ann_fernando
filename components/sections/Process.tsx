"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import Reveal from "@/components/Reveal";
import { process, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";

const EASE = [0.16, 1, 0.3, 1] as const;
const R = 128; // progress ring radius
const C = 2 * Math.PI * R;

/**
 * Sticky walkthrough with an animated dial rather than a photo panel.
 *
 * The photographs that used to pin here fought the content - the steps are
 * about paperwork, escrow and title deeds, and no photograph illustrates
 * that. A dial does: a gold arc closes as you advance, the numeral flips,
 * six ticks mark the steps, and the caption crossfades. It reads as progress
 * through a process, which is exactly what the section is describing.
 *
 * Nothing here loads an image, so the section costs no bandwidth at all.
 */
export default function Process() {
  const [active, setActive] = useState(0);
  const onEnter = useCallback((i: number) => setActive(i), []);
  const total = process.steps.length;

  return (
    <section
      id="process"
      className="relative border-t border-ink-800 py-20 lg:py-24"
    >
      {/* ⚠ `overflow-hidden` must NOT go on the <section>. An ancestor with
          overflow other than visible becomes the sticky element's scroll
          container, which stops the pinned panel below from pinning at all.
          The decorative layers are clipped in their own wrapper instead. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="gold-grid absolute inset-0" />
        <div className="aurora absolute right-[2%] top-1/3 h-[34vmax] w-[34vmax] rounded-full bg-[radial-gradient(circle,rgba(217,189,128,0.12),transparent_66%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
            Buying from abroad
          </p>
          <Say
            as="h2"
            v={process.title}
            className="glow-gold font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.08] text-bone"
          />
          <p className="mt-5 text-lg leading-relaxed text-bone-dim">
            {process.intro}
          </p>
        </Reveal>

        {/* No `items-start` here - the columns must stretch to the row height
            or the sticky dial below has nothing to travel inside. */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ── Pinned dial ───────────────────────────────────────────── */}
          <div className="hidden lg:col-span-5 lg:block">
            {/* Column layout, not absolute positioning. The caption used to be
                pinned below the ring with a negative offset, which laid it
                over the lower arc. Normal flow guarantees no overlap. */}
            <div className="sticky top-24 flex h-[min(74vh,40rem)] flex-col items-center justify-center gap-9">
              <div className="relative shrink-0">
                <svg
                  viewBox="0 0 320 320"
                  className="h-[17.5rem] w-[17.5rem] -rotate-90"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="dial" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#edd9aa" />
                      <stop offset="100%" stopColor="#b4924f" />
                    </linearGradient>
                  </defs>

                  {/* Track */}
                  <circle
                    cx="160"
                    cy="160"
                    r={R}
                    fill="none"
                    stroke="#2a3040"
                    strokeWidth="1.5"
                  />

                  {/* Six ticks, one per step */}
                  {process.steps.map((_, i) => {
                    const a = (i / total) * 2 * Math.PI;
                    const inner = R - 9;
                    const outer = R + 9;
                    return (
                      <line
                        key={i}
                        x1={160 + Math.cos(a) * inner}
                        y1={160 + Math.sin(a) * inner}
                        x2={160 + Math.cos(a) * outer}
                        y2={160 + Math.sin(a) * outer}
                        stroke={i <= active ? "#d9bd80" : "#3b4354"}
                        strokeWidth={i === active ? 2.5 : 1.5}
                        className="transition-all duration-500"
                      />
                    );
                  })}

                  {/* Filling arc */}
                  <motion.circle
                    cx="160"
                    cy="160"
                    r={R}
                    fill="none"
                    stroke="url(#dial)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    initial={false}
                    animate={{ strokeDashoffset: C - C * ((active + 1) / total) }}
                    transition={{ duration: 0.9, ease: EASE }}
                  />
                </svg>

                {/* Numeral */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={active}
                      initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -22, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="glow-gold font-display text-[6rem] font-light leading-none text-gold-400"
                    >
                      {String(active + 1).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                  <span className="mt-1 font-display text-sm tracking-[0.2em] text-bone-faint">
                    OF {String(total).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Caption sits in normal flow beneath the dial. Fixed height so
                  swapping steps never nudges the ring up or down. */}
              <div className="flex h-20 w-full max-w-xs items-start justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`c-${active}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Say
                      as="p"
                      v={process.steps[active].label}
                      className="font-display text-2xl font-light leading-snug text-bone"
                    />
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-gold-500">
                      {process.steps[active].meta}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Steps ─────────────────────────────────────────────────── */}
          <ol className="lg:col-span-7">
            {process.steps.map((s, i) => (
              <Step
                key={s.label.en}
                index={i}
                total={total}
                step={s}
                isActive={active === i}
                onEnter={onEnter}
              />
            ))}

            <Reveal delay={0.1} className="mt-10">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block overflow-hidden rounded-full bg-gold-500 px-8 py-4 text-base font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">Start at step one</span>
                <span className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
            </Reveal>
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
  total,
  isActive,
  onEnter,
}: {
  step: (typeof process.steps)[number];
  index: number;
  total: number;
  isActive: boolean;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Fires when the step crosses the middle band of the viewport.
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li
      ref={ref}
      className="group relative border-t border-ink-800 py-9 last:border-b lg:min-h-[8.5rem] lg:py-11"
    >
      {/* Gold rule that draws across as the step becomes active */}
      <motion.span
        className="absolute left-0 top-0 h-px bg-gradient-to-r from-gold-400 to-transparent"
        initial={false}
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      />

      <div className="flex items-start gap-5">
        <motion.span
          initial={false}
          animate={{
            color: isActive ? "#edd9aa" : "#4e5768",
            scale: isActive ? 1.06 : 1,
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="font-display text-2xl leading-none"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        <motion.div
          className="flex-1"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
        >
          <Say
            as="h3"
            v={step.label}
            className={`font-display text-2xl font-light leading-snug transition-colors duration-500 sm:text-3xl ${
              isActive ? "text-gold-400" : "text-bone"
            }`}
          />
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-bone-dim">
            {step.body}
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-bone-faint">
            {step.meta} · step {index + 1} of {total}
          </p>
        </motion.div>
      </div>
    </li>
  );
}
