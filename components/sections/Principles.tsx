import Image from "next/image";
import Reveal from "@/components/Reveal";
import { agent, principles, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";

/**
 * The personal-brand core — four commitments in Ann's own voice. This is the
 * part of the site a client repeats when recommending her, so it gets the
 * strongest treatment on the page: oversized gold numerals, animated ring
 * borders and a light beam sweeping the section.
 */
export default function Principles() {
  return (
    <section
      id="principles"
      className="beam relative overflow-hidden border-t border-ink-800 bg-ink-900/30 py-20 lg:py-24"
    >
      <div className="gold-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
              {principles.eyebrow}
            </p>
            <Say
              as="h2"
              v={principles.title}
              className="glow-gold font-display text-[clamp(2rem,4.2vw,3rem)] font-light leading-[1.1] text-bone"
            />
            <p className="mt-5 text-[15px] leading-relaxed text-bone-dim">
              {principles.intro}
            </p>

            {/* Her face against her own promises — the single most personal
                moment on the page, so it is signed rather than captioned. */}
            <div className="mt-8 flex items-center gap-4">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-600/50">
                <Image
                  src="/images/ann-portrait.jpg"
                  alt="Ann Fernando"
                  fill
                  quality={80}
                  sizes="64px"
                  style={{ objectPosition: "52% 28%" }}
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block font-display text-lg font-light italic text-gold-400">
                  {agent.name}
                </span>
                <span className="block text-[11px] uppercase tracking-[0.2em] text-bone-faint">
                  {agent.role}
                </span>
              </span>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.04]"
            >
              Hold me to it
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {principles.items.map((p, i) => (
              <Reveal
                key={p.no}
                delay={(i % 2) * 0.08}
                className="ring-anim lift group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-950/80 p-7"
              >
                {/* Oversized ghost numeral — the memorable bit */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[6rem] leading-none text-gold-500/[0.07] transition-all duration-700 group-hover:text-gold-500/[0.14]"
                >
                  {p.no}
                </span>

                <span className="relative font-display text-sm text-gold-500">
                  {p.no}
                </span>
                <Say
                  as="h3"
                  v={p.title}
                  className="relative mt-3 font-display text-xl font-light leading-snug text-bone transition-colors duration-500 group-hover:text-gold-400"
                />
                <p className="relative mt-3 text-[15px] leading-relaxed text-bone-dim">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
