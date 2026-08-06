import Image from "next/image";
import Reveal from "@/components/Reveal";
import { partners } from "@/content/copy";
import { Say } from "@/lib/bi";

/**
 * Borrowed credibility, and the most persuasive kind available: these are real
 * channel partnerships held by GCC Real Estate. Do not add a developer here
 * unless the brokerage genuinely transacts with them.
 */
export default function Partners() {
  const row = [...partners.items, ...partners.items];

  return (
    <section id="partners" className="relative overflow-hidden border-t border-ink-800 py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/city-05.jpg"
          alt=""
          fill
          quality={68}
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/72 to-ink-950" />
        <div className="aurora-slow absolute right-[10%] top-[8%] h-[30vmax] w-[30vmax] rounded-full bg-[radial-gradient(circle,rgba(212,182,120,0.14),transparent_66%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
            {partners.eyebrow}
          </p>
          <Say
            as="h2"
            v={partners.title}
            className="glow-gold font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.1] text-bone"
          />
          <p className="mt-5 text-lg leading-relaxed text-bone-dim">
            {partners.intro}
          </p>

          <p className="mt-7 inline-flex items-center gap-3 rounded-full border border-gold-600/35 bg-ink-900/60 px-5 py-2.5">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 stroke-gold-500"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="9" r="5.5" />
              <path d="M8.5 13.5 7 22l5-2.5L17 22l-1.5-8.5" />
            </svg>
            <span className="text-sm text-gold-400">{partners.award}</span>
          </p>
        </Reveal>
      </div>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent sm:w-40" />

        <div className="flex w-max animate-[marquee_42s_linear_infinite] gap-14 pr-14">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap font-display text-2xl tracking-[0.14em] text-bone-faint transition-colors duration-500 hover:text-gold-500 sm:text-3xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
