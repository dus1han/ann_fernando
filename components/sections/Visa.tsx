import Image from "next/image";
import Reveal from "@/components/Reveal";
import { agent, visa, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";

/**
 * Layout note: portrait and copy sit as one balanced row, and the threshold
 * card runs the full width beneath them.
 *
 * The earlier 4/8 split put a short portrait beside a very tall column of
 * copy plus card, which left a large dead gap under the photo. Pairing the
 * photo with the copy alone keeps both columns roughly the same height, and
 * the card reads better wide anyway — the big number gets its own space
 * instead of sitting on top of a cramped bullet list.
 */
export default function Visa() {
  return (
    <section
      id="visa"
      className="relative overflow-hidden border-t border-ink-800 py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute left-1/2 top-0 h-[40vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(217,189,128,0.10),transparent_65%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* ── Portrait + copy, balanced ─────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="ring-anim relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-ink-900 lg:max-w-none">
              <Image
                src="/images/ann-suit.jpg"
                alt="Ann Fernando, Property Consultant, at a Dubai sales centre"
                fill
                quality={80}
                sizes="(max-width: 1024px) 85vw, 460px"
                style={{ objectPosition: "48% 28%" }}
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-display text-xl font-light italic leading-snug text-bone">
                  &ldquo;I&rsquo;ll tell you honestly whether you qualify.&rdquo;
                </p>
                <p className="mt-2.5 text-[10px] uppercase tracking-[0.22em] text-gold-500">
                  {agent.name} · {agent.role}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
              UAE Golden Visa
            </p>
            <Say
              as="h2"
              v={visa.title}
              className="glow-gold font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.08] text-bone"
            />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
              {visa.body}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-gold-600/50 px-6 py-3 text-sm text-gold-400 transition-colors duration-300 hover:bg-gold-500 hover:text-ink-950"
            >
              Ask if you qualify
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>

        {/* ── Threshold card, full width ────────────────────────────── */}
        <Reveal
          delay={0.12}
          className="edge-gold relative mt-14 overflow-hidden rounded-3xl bg-ink-900 p-8 sm:p-10 lg:mt-16"
        >
          <Image
            src="/images/city-01.jpg"
            alt=""
            fill
            quality={70}
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/88 to-ink-950/65" />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <p className="glow-gold font-display text-[clamp(3rem,7vw,4.5rem)] font-light leading-none text-gold-400">
                AED 2M
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-bone-faint">
                Qualifying threshold
              </p>
              <span className="mt-6 block h-px w-20 bg-gradient-to-r from-gold-500 to-transparent" />
            </div>

            <div className="lg:col-span-8">
              <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {visa.points.map((p, i) => (
                  <Reveal as="li" key={p} delay={0.12 + i * 0.06} y={12}>
                    <span className="flex items-start gap-3 text-[15px] leading-relaxed text-bone-dim">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                      {p}
                    </span>
                  </Reveal>
                ))}
              </ul>

              <p className="mt-8 border-t border-bone/10 pt-6 text-xs leading-relaxed text-bone-faint">
                {visa.disclaimer}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
