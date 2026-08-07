import Image from "next/image";
import Reveal from "@/components/Reveal";
import { shortlist, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";

/**
 * Replaces the old listings grid. A published selection works against a
 * consultative process - and this converts better, because it ends in a
 * question the reader wants to answer rather than a set of units to browse.
 */
export default function Shortlist() {
  return (
    <section id="shortlist" className="border-t border-ink-800 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Visual */}
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-ink-900 lg:sticky lg:top-28">
              <Image
                src="/images/ann-lobby.jpg"
                alt="Ann Fernando at a Dubai development"
                fill
                quality={78}
                sizes="(max-width: 1024px) 90vw, 480px"
                style={{ objectPosition: "55% 30%" }}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-500">
                  {shortlist.areasLabel}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {shortlist.areas.map((a) => (
                    <span
                      key={a}
                      className="rounded-full border border-bone/15 bg-ink-950/60 px-3 py-1 text-xs text-bone-dim backdrop-blur"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
                {shortlist.eyebrow}
              </p>
              <Say
                as="h2"
                v={shortlist.title}
                className="glow-gold font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.1] text-bone"
              />
              <p className="mt-5 text-lg leading-relaxed text-bone-dim">
                {shortlist.intro}
              </p>
            </Reveal>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink-800 bg-ink-800 sm:grid-cols-2">
              {shortlist.steps.map((s, i) => (
                <Reveal
                  key={s.k}
                  delay={(i % 2) * 0.08}
                  className="lift bg-ink-950 p-6 hover:bg-ink-900"
                >
                  <dt className="font-display text-lg font-light text-gold-400">
                    {s.k}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-bone-dim">
                    {s.v}
                  </dd>
                </Reveal>
              ))}
            </dl>

            <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full bg-gold-500 px-8 py-4 text-base font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">{shortlist.cta}</span>
                <span className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <p className="max-w-xs text-xs leading-relaxed text-bone-faint">
                {shortlist.disclaimer}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
