"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";
import { agent, roadshow } from "@/content/copy";
import { Say } from "@/lib/bi";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Time-boxed event band, and the landing point for paid traffic.
 *
 * The page is statically generated, so `new Date()` at build time would be
 * frozen at whenever the last deploy happened. The countdown and the
 * before/after switch therefore run on the client, after mount. Server render
 * shows the pre-event state, which is correct until the date passes.
 *
 * Everything keys off `roadshow.endsAt` — change that one value and the
 * countdown, the copy and the nav item all follow.
 */
function useCountdown(endsAt: string) {
  const [state, setState] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    over: boolean;
    ready: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    over: false,
    ready: false,
  });

  useEffect(() => {
    const end = new Date(endsAt).getTime();
    const tick = () => {
      const diff = end - Date.now();
      if (diff <= 0) {
        setState({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          over: true,
          ready: true,
        });
        return;
      }
      setState({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        over: false,
        ready: true,
      });
    };
    tick();
    // Ticks every second so the seconds column keeps moving. One setState a
    // second on four numbers is negligible, and a visibly live clock is what
    // makes the deadline feel real.
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return state;
}

export default function Roadshow() {
  const { days, hours, minutes, seconds, over, ready } = useCountdown(
    roadshow.endsAt
  );

  if (!roadshow.active) return null;

  const bookHref = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(
    over
      ? "Hi Ann, I missed the Colombo roadshow. Can we talk on video?"
      : `Hi Ann, I'd like to reserve a slot at the Colombo roadshow on ${roadshow.dates}.`
  )}`;

  return (
    <section
      id="roadshow"
      className="relative overflow-hidden border-t border-gold-600/30"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/city-07.jpg"
          alt=""
          fill
          quality={72}
          sizes="100vw"
          className="object-cover object-bottom opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/70" />
        <div className="aurora absolute -right-[8%] top-[6%] h-[34vmax] w-[34vmax] rounded-full bg-[radial-gradient(circle,rgba(217,189,128,0.18),transparent_66%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        {over ? (
          /* ── After the event ─────────────────────────────────────── */
          <Reveal className="max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
              {roadshow.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-[1.12] text-bone">
              {roadshow.afterTitle}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone-dim">
              {roadshow.afterBody}
            </p>
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-8 inline-block overflow-hidden rounded-full bg-gold-500 px-8 py-4 text-base font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">{roadshow.afterCta}</span>
              <span className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-500 group-hover:translate-x-0" />
            </a>
          </Reveal>
        ) : (
          /* ── Before the event ────────────────────────────────────── */
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal className="lg:col-span-7">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
                </span>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
                  {roadshow.eyebrow}
                </p>
              </div>

              <Say
                as="h2"
                v={roadshow.title}
                className="glow-gold font-display text-[clamp(2rem,4.6vw,3.4rem)] font-light leading-[1.06] text-bone"
              />

              <p className="mt-6 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-light leading-none text-gold-400">
                {roadshow.dates}
              </p>
              <p className="mt-3 text-lg text-bone">
                {roadshow.venue}
              </p>
              <p className="mt-1.5 text-sm text-bone-dim">
                {roadshow.time} · {roadshow.entry}
              </p>

              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone-dim">
                {roadshow.intro}
              </p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-bone-faint">
                {roadshow.reassurance}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={bookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-block overflow-hidden rounded-full bg-gold-500 px-8 py-4 text-base font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
                >
                  <span className="relative z-10">
                    <Say v={roadshow.cta} />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-500 group-hover:translate-x-0" />
                </a>
                <p className="text-sm text-bone-faint">{roadshow.ctaNote}</p>
              </div>
            </Reveal>

            {/* ── Countdown + facts ─────────────────────────────────── */}
            <Reveal delay={0.1} className="lg:col-span-5">
              {/* data-nosnippet, because Google was assembling a search snippet
                  out of this block: it stitched "10am and 6pm" from the intro
                  onto "Until doors open" and then the live countdown digits, so
                  the result read "open 28 days : 12 hrs : 29 min". Ticking
                  numbers are meaningless in a search result and they crowded out
                  the meta description. This attribute makes the subtree
                  ineligible for snippets without hiding it from indexing. */}
              <div
                data-nosnippet
                className="edge-gold rounded-3xl bg-ink-900/70 p-7 backdrop-blur-sm sm:p-8"
              >
                <p className="text-center text-[11px] uppercase tracking-[0.24em] text-gold-600">
                  {roadshow.countdownLabel}
                </p>

                {/* Centred, and each cell is fixed-width with tabular figures
                    so the ticking seconds never shift the layout sideways. */}
                <motion.div
                  initial={false}
                  animate={{ opacity: ready ? 1 : 0.3 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-5 flex items-start justify-center gap-2 sm:gap-3"
                >
                  {[
                    { n: days, l: "days" },
                    { n: hours, l: "hrs" },
                    { n: minutes, l: "min" },
                    { n: seconds, l: "sec" },
                  ].map((u, i) => (
                    <div key={u.l} className="flex items-start">
                      <div className="w-[3.6rem] text-center sm:w-[4.2rem]">
                        <p className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-none tabular-nums text-gold-400">
                          {ready ? String(u.n).padStart(2, "0") : "--"}
                        </p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-bone-faint">
                          {u.l}
                        </p>
                      </div>
                      {i < 3 && (
                        <span
                          aria-hidden
                          className="font-display text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-none text-gold-700"
                        >
                          :
                        </span>
                      )}
                    </div>
                  ))}
                </motion.div>

                <dl className="mt-8 space-y-3 border-t border-bone/10 pt-6">
                  {roadshow.facts.map((f) => (
                    <div key={f.k} className="flex gap-4">
                      <dt className="w-16 shrink-0 text-[11px] uppercase tracking-[0.16em] text-gold-600">
                        {f.k}
                      </dt>
                      <dd className="flex-1 text-sm leading-relaxed text-bone-dim">
                        {f.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
