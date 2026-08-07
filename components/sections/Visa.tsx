import Image from "next/image";
import Reveal from "@/components/Reveal";
import { agent, visa, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";

export default function Visa() {
  return (
    <section id="visa" className="relative overflow-hidden border-t border-ink-800 py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[40vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(212,182,120,0.09),transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-14">
        {/* Portrait column. Residency is a family decision — this was the
            largest section on the page with no person in it. */}
        <Reveal className="lg:col-span-4">
          <div className="ring-anim relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-ink-900 lg:sticky lg:top-28 lg:max-w-none">
            <Image
              src="/images/ann-suit.jpg"
              alt="Ann Fernando, Property Consultant, at a Dubai sales centre"
              fill
              quality={80}
              sizes="(max-width: 1024px) 80vw, 380px"
              style={{ objectPosition: "48% 30%" }}
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-lg font-light italic leading-snug text-bone">
                &ldquo;I&rsquo;ll tell you honestly whether you qualify.&rdquo;
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-gold-500">
                {agent.name} · {agent.role}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Copy and the threshold card stack in the wider column */}
        <div className="space-y-10 lg:col-span-8">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
              UAE Golden Visa
            </p>
            <Say
              as="h2"
              v={visa.title}
              className="glow-gold font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.08] text-bone"
            />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
              {visa.body}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-gold-400 transition-colors hover:text-gold-500"
            >
              Ask if you qualify
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="edge-gold relative overflow-hidden rounded-3xl bg-ink-900 p-8 sm:p-10">
            <Image
              src="/images/city-01.jpg"
              alt=""
              fill
              quality={74}
              sizes="(max-width: 1024px) 92vw, 560px"
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/70 to-ink-950/40" />

            <div className="relative">
            <p className="glow-gold font-display text-6xl font-light text-gold-400">
              AED 2M
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-bone-faint">
              Qualifying threshold
            </p>

            <ul className="mt-8 space-y-4 border-t border-bone/10 pt-8">
              {visa.points.map((p, i) => (
                <Reveal as="li" key={p} delay={0.15 + i * 0.07} y={12}>
                  <span className="flex items-start gap-3 text-[15px] text-bone-dim">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
