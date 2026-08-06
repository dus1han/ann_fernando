import Image from "next/image";
import Reveal from "@/components/Reveal";
import { whyDubai } from "@/content/copy";
import { Say } from "@/lib/bi";

export default function WhyDubai() {
  return (
    <section id="why-dubai" className="relative overflow-hidden py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute -left-[6%] top-[6%] h-[36vmax] w-[36vmax] rounded-full bg-[radial-gradient(circle,rgba(212,182,120,0.11),transparent_66%)]" />
        <div className="aurora-slow absolute bottom-[4%] right-[2%] h-[30vmax] w-[30vmax] rounded-full bg-[radial-gradient(circle,rgba(212,182,120,0.09),transparent_66%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
            The case
          </p>
          <Say
            as="h2"
            v={whyDubai.title}
            className="glow-gold font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.08] text-bone"
          />
          <p className="mt-5 text-lg leading-relaxed text-bone-dim">
            {whyDubai.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyDubai.cards.map((c, i) => (
            <Reveal
              key={c.headline.en}
              delay={(i % 3) * 0.08}
              className="ring-anim lift group relative overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 p-8 hover:bg-ink-900"
            >
              {/* Photography sits behind the card and blooms on hover */}
              <Image
                src={c.img}
                alt=""
                fill
                quality={70}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover opacity-25 transition-[transform,opacity] duration-[900ms] ease-out group-hover:scale-110 group-hover:opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/90 to-ink-950/65 transition-opacity duration-700 group-hover:opacity-90" />

              {/* Hairline that draws in on hover */}
              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-500 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

              <span className="relative font-display text-sm text-gold-500">
                {String(i + 1).padStart(2, "0")}
              </span>

              <Say
                as="h3"
                v={c.headline}
                className="relative mt-4 font-display text-2xl font-light leading-snug text-bone transition-colors duration-500 group-hover:text-gold-400"
              />

              <p className="relative mt-4 text-[15px] leading-relaxed text-bone-dim">
                {c.body}
              </p>

              {c.source && (
                <p className="relative mt-6 text-[11px] uppercase tracking-[0.15em] text-bone-faint">
                  Source · {c.source}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
