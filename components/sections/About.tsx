import Image from "next/image";
import Reveal from "@/components/Reveal";
import Socials from "@/components/Socials";
import { about, agent } from "@/content/copy";
import { Say } from "@/lib/bi";

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-ink-800 py-20 lg:py-24"
    >
      {/* ⚠ Clipping lives here, not on the <section> — overflow on an ancestor
          would stop the sticky portrait below from pinning. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="gold-grid absolute inset-0" />
        <div className="aurora absolute -left-[8%] top-1/4 h-[34vmax] w-[34vmax] rounded-full bg-[radial-gradient(circle,rgba(217,189,128,0.13),transparent_66%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-16">
        {/* Portrait slot */}
        <Reveal className="lg:col-span-5">
          {/* No frame — she breaks left out of the grid and her edges dissolve
              into the section. */}
          <div className="relative aspect-[4/5] w-full lg:sticky lg:top-28 lg:-ml-12 lg:w-[calc(100%+3rem)] xl:-ml-20 xl:w-[calc(100%+5rem)]">
            <div className="aurora pointer-events-none absolute inset-[-14%] -z-10 rounded-full bg-[radial-gradient(ellipse_56%_58%_at_50%_46%,rgba(217,189,128,0.16),transparent_70%)]" />

            <Image
              src="/images/ann-villa.jpg"
              alt="Ann Fernando on site at a Dubai villa"
              fill
              quality={78}
              sizes="(max-width: 1024px) 90vw, 560px"
              style={{ objectPosition: "50% 36%" }}
              className="feather-br object-cover"
            />
            <div className="feather-br pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_60%_at_46%_42%,transparent_42%,rgba(18,21,28,0.72)_82%,#12151c_100%)]" />

            <div className="absolute inset-x-0 bottom-0 pb-2 text-center lg:text-left lg:pl-14">
              <p className="text-[11px] uppercase tracking-[0.24em] text-gold-500">
                On site
              </p>
              <p className="mt-1.5 text-sm text-bone">
                Viewing a villa for a client in Dubai
              </p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <Say
              v={about.eyebrow}
              className="text-xs uppercase tracking-[0.3em] text-gold-500"
            />
            <h2 className="glow-gold mt-4 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.1] text-bone">
              {about.title}
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5">
            {about.body.map((p, i) => (
              <Reveal
                key={i}
                delay={0.08 * i}
                as="p"
                className="text-[17px] leading-relaxed text-bone-dim"
              >
                {p}
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <dl className="mt-12 grid gap-4 sm:grid-cols-2">
              {about.credentials.map((c) => (
                <div
                  key={c.label}
                  className="lift rounded-xl border border-ink-800 bg-ink-900/60 p-5"
                >
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-gold-600">
                    {c.label}
                  </dt>
                  <dd className="mt-1.5 text-sm text-bone">{c.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal
            delay={0.28}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <Socials />
            <a
              href={`mailto:${agent.email}`}
              className="text-sm text-bone-dim underline-offset-4 transition-colors hover:text-gold-400 hover:underline"
            >
              {agent.email}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
