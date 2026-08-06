"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "@/components/Reveal";
import { faq, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-bleed single-column accordion.
 *
 * A two-column layout left a large empty gutter beside the questions, so the
 * list now runs the full container width with the heading composed above it.
 * Every answer starts collapsed; clicking an open row closes it again.
 *
 * The trust mechanic: the QUESTION is where Sinhala belongs (it is the
 * reader's own worry, in their own voice); the ANSWER stays in English so it
 * reads as a licensed professional replying. Do not blur that line.
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-ink-800 py-20 lg:py-24"
    >
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/city-08.jpg"
          alt=""
          fill
          quality={68}
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/88 to-ink-950" />
        <div className="aurora-slow absolute right-[8%] top-1/4 h-[32vmax] w-[32vmax] rounded-full bg-[radial-gradient(circle,rgba(217,189,128,0.12),transparent_66%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* ── Header composed across the full width ─────────────────── */}
        <Reveal className="flex flex-wrap items-end justify-between gap-8 border-b border-ink-800 pb-10">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
              Straight answers
            </p>
            <Say
              as="h2"
              v={faq.title}
              className="glow-gold font-display text-[clamp(2.4rem,6vw,4.2rem)] font-light leading-[1.02] text-bone"
            />
            <p className="mt-5 text-lg leading-relaxed text-bone-dim">
              I would rather answer an awkward question now than after you have
              paid. Nothing here is a sales answer.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden text-right sm:block">
              <span className="block font-display text-4xl font-light text-gold-400">
                {String(faq.items.length).padStart(2, "0")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                Questions
              </span>
            </span>
            <span className="hidden h-14 w-px bg-ink-700 sm:block" />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-gold-500 px-7 py-3.5 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.04]"
            >
              <span className="relative z-10">Ask me anything</span>
              <span className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-500 group-hover:translate-x-0" />
            </a>
          </div>
        </Reveal>

        {/* ── Full-width list ───────────────────────────────────────── */}
        <ul>
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q.en} delay={Math.min(i, 6) * 0.04} y={14}>
                <li className="group relative border-b border-ink-800">
                  {/* Gold wash that fills the row on hover / when open */}
                  <span
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-gold-500/[0.07] via-gold-500/[0.02] to-transparent transition-opacity duration-500 ${
                      isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  {/* Left accent bar */}
                  <motion.span
                    className="absolute bottom-0 left-0 top-0 w-[2px] bg-gradient-to-b from-gold-400 to-gold-600"
                    initial={false}
                    animate={{ scaleY: isOpen ? 1 : 0 }}
                    style={{ originY: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />

                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="relative flex w-full items-center gap-6 py-7 pl-5 pr-2 text-left sm:gap-8 sm:py-8 sm:pl-8"
                  >
                    <span
                      className={`font-display text-sm tabular-nums transition-colors duration-500 sm:text-base ${
                        isOpen ? "text-gold-400" : "text-gold-700"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <Say
                      v={item.q}
                      className={`flex-1 font-display text-xl font-light leading-snug transition-all duration-500 sm:text-2xl lg:text-[1.75rem] ${
                        isOpen
                          ? "text-gold-400"
                          : "text-bone group-hover:translate-x-1"
                      }`}
                    />

                    <span
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isOpen
                          ? "rotate-90 border-gold-500 bg-gold-500/10"
                          : "border-ink-700 group-hover:border-gold-600/60"
                      }`}
                    >
                      <span
                        className={`absolute h-px w-3.5 transition-colors duration-500 ${
                          isOpen ? "bg-gold-400" : "bg-bone-dim"
                        }`}
                      />
                      <motion.span
                        animate={{ opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute h-3.5 w-px bg-bone-dim"
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="relative overflow-hidden"
                      >
                        <motion.p
                          initial={{ y: 14 }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                          className="max-w-3xl pb-9 pl-[3.6rem] pr-6 text-[16px] leading-relaxed text-bone-dim sm:pl-[5.5rem]"
                        >
                          {item.a}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>

        {/* ── Closing prompt ────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div className="ring-anim mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-ink-900/70 px-8 py-7">
            <div>
              <p className="font-display text-2xl font-light text-bone">
                Still not sure about something?
              </p>
              <p className="mt-2 text-[15px] text-bone-dim">
                Ask it directly. No obligation, and no sales call afterwards
                unless you want one.
              </p>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-600/50 px-7 py-3.5 text-sm text-gold-400 transition-all duration-300 hover:bg-gold-500 hover:text-ink-950"
            >
              Message Ann
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
