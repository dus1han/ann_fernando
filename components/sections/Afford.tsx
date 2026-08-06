"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";
import { afford, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";
import { aed } from "@/lib/utils";

export default function Afford() {
  const [active, setActive] = useState(1);

  return (
    <section
      id="afford"
      className="relative overflow-hidden border-t border-ink-800 py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-slow absolute right-[4%] top-[10%] h-[32vmax] w-[32vmax] rounded-full bg-[radial-gradient(circle,rgba(217,189,128,0.12),transparent_66%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
            Entry points
          </p>
          <Say
            as="h2"
            v={afford.title}
            className="glow-gold font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.08] text-bone"
          />
          <p className="mt-5 text-lg leading-relaxed text-bone-dim">
            {afford.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {afford.tiers.map((tier, i) => {
            const isActive = active === i;
            const down = Math.round((tier.priceAed * tier.downPct) / 100);
            return (
              <Reveal key={tier.type} delay={i * 0.1}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`lift relative h-full w-full overflow-hidden rounded-2xl border text-left ${
                    isActive
                      ? "border-gold-600/70 bg-ink-900"
                      : "border-ink-800 bg-ink-950 hover:border-ink-700"
                  }`}
                >
                  {/* Photography header — full colour, no murk. */}
                  <span className="relative block h-48 overflow-hidden">
                    <Image
                      src={tier.img}
                      alt=""
                      fill
                      quality={78}
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className={`object-cover transition-[transform,filter] duration-700 ease-out ${
                        isActive ? "scale-105 saturate-110" : "scale-100"
                      }`}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
                    <span className="absolute bottom-3 left-5 text-[11px] uppercase tracking-[0.2em] text-gold-400">
                      {tier.type}
                    </span>
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="afford-line"
                      className="absolute inset-x-0 top-48 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                    />
                  )}

                  <div className="relative p-7">
                    <p className="text-sm text-gold-500">{tier.area}</p>

                    <p
                      className={`mt-4 font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-light leading-none text-bone transition-all duration-500 ${
                        isActive ? "glow-gold" : ""
                      }`}
                    >
                      {aed(tier.priceAed)}
                    </p>
                    <p className="mt-2 text-sm text-bone-dim">
                      from · gross yield {tier.yield}
                    </p>

                    <div className="mt-7 space-y-3 border-t border-ink-800 pt-6">
                      <Row label={`${tier.downPct}% on booking`} value={aed(down)} />
                      <Row
                        label="Balance over construction"
                        value={aed(tier.priceAed - down)}
                      />
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-bone-dim">
                      {tier.note}
                    </p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={0.2}
          className="mt-10 flex flex-wrap items-center justify-between gap-6"
        >
          <p className="max-w-xl text-xs leading-relaxed text-bone-faint">
            {afford.disclaimer}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-gold-600/50 px-6 py-3 text-sm text-gold-400 transition-all duration-300 hover:bg-gold-500 hover:text-ink-950"
          >
            Ask what fits your budget
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-bone-faint">{label}</span>
      <span className="text-sm tabular-nums text-bone">{value}</span>
    </div>
  );
}
