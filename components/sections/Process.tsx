"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Reveal from "@/components/Reveal";
import { process, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";

const EASE = [0.16, 1, 0.3, 1] as const;
const THUMB = 68; // px per thumbnail incl. gap — the rail translates by this

/**
 * Sticky-visual walkthrough.
 *
 * The left column pins while the steps scroll past on the right. It is kept
 * deliberately busy so it never reads as dead space: the photograph crossfades
 * and drifts under a slow parallax, a thumbnail rail slides to the active
 * step, the counter flips, and a progress bar fills. Panel height is tied to
 * the viewport so there is no gap above or below it while pinned.
 *
 * Below lg the pinned column is dropped and each step carries its own image.
 */
export default function Process() {
  const [active, setActive] = useState(0);
  const onEnter = useCallback((i: number) => setActive(i), []);

  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Slow continuous drift so the pinned image is never completely still.
  const drift = useSpring(
    useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]),
    { stiffness: 60, damping: 24, restDelta: 0.001 }
  );

  const total = process.steps.length;

  return (
    <section
      id="process"
      ref={sectionRef}
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

        {/* No `items-start` here — the columns must stretch to the row height
            or the sticky panel below has nothing to travel inside and simply
            scrolls away with the steps. */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ── Pinned visual ─────────────────────────────────────────── */}
          <div className="hidden lg:col-span-6 lg:block">
            {/* Height leaves room under the fixed nav so the panel always
                fits the viewport — a sticky box taller than the screen
                cannot pin. */}
            <div className="sticky top-24 flex h-[min(74vh,42rem)] gap-4">
              {/* Thumbnail rail — slides so the active step sits centre */}
              <div className="relative w-14 shrink-0 overflow-hidden">
                <motion.div
                  className="absolute inset-x-0 flex flex-col gap-3"
                  initial={false}
                  animate={{ y: `calc(50% - ${active * THUMB + THUMB / 2}px)` }}
                  transition={{ duration: 0.7, ease: EASE }}
                  style={{ top: "50%" }}
                >
                  {process.steps.map((s, i) => (
                    <button
                      key={s.label.en}
                      onClick={() => setActive(i)}
                      aria-label={`Step ${i + 1}`}
                      className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border transition-all duration-500 ${
                        i === active
                          ? "scale-105 border-gold-500 opacity-100"
                          : "border-ink-700 opacity-40 hover:opacity-70"
                      }`}
                    >
                      <Image
                        src={s.img}
                        alt=""
                        fill
                        quality={45}
                        sizes="56px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </motion.div>

                {/* Centre marker */}
                <span className="pointer-events-none absolute left-0 top-1/2 h-14 w-full -translate-y-1/2 rounded-xl ring-1 ring-inset ring-gold-500/35" />
              </div>

              {/* Main frame */}
              <div className="ring-anim relative flex-1 overflow-hidden rounded-3xl bg-ink-900">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <motion.div style={{ y: drift }} className="absolute -inset-y-[8%] inset-x-0">
                      <Image
                        src={process.steps[active].img}
                        alt=""
                        fill
                        quality={82}
                        sizes="560px"
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/15 to-ink-950/45" />

                {/* Counter */}
                <div className="absolute left-8 top-8 flex items-baseline gap-2">
                  <motion.span
                    key={`n-${active}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="glow-gold font-display text-7xl font-light leading-none text-gold-400"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </motion.span>
                  <span className="font-display text-lg text-bone-faint">
                    / {String(total).padStart(2, "0")}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`c-${active}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p className="text-[11px] uppercase tracking-[0.22em] text-gold-500">
                        {process.steps[active].meta}
                      </p>
                      <Say
                        as="p"
                        v={process.steps[active].label}
                        className="mt-2 font-display text-4xl font-light leading-tight text-bone"
                      />
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-bone-dim">
                        {process.steps[active].body}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress rail */}
                  <div className="mt-7 flex gap-1.5">
                    {process.steps.map((_, i) => (
                      <span
                        key={i}
                        className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-bone/15"
                      >
                        <motion.span
                          className="absolute inset-0 origin-left rounded-full bg-gold-500"
                          initial={false}
                          animate={{ scaleX: i <= active ? 1 : 0 }}
                          transition={{ duration: 0.6, ease: EASE }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Steps ─────────────────────────────────────────────────── */}
          <ol className="lg:col-span-6">
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

        <div className="flex-1">
          {/* Mobile-only image — the pinned column is hidden below lg */}
          <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-2xl lg:hidden">
            <Image
              src={step.img}
              alt=""
              fill
              quality={72}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 to-transparent" />
            <p className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.2em] text-gold-400">
              {step.meta}
            </p>
          </div>

          <motion.div
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
            {/* Body is shown in the pinned panel on desktop, so it is only
                repeated here on smaller screens. */}
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-bone-dim lg:hidden">
              {step.body}
            </p>
            <p className="mt-4 hidden text-[11px] uppercase tracking-[0.2em] text-bone-faint lg:block">
              {step.meta} · step {index + 1} of {total}
            </p>
          </motion.div>
        </div>
      </div>
    </li>
  );
}
