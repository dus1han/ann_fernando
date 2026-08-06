import Image from "next/image";
import Reveal from "@/components/Reveal";
import { whatsappHref } from "@/content/copy";

/**
 * Two counter-scrolling photo rails. Pure atmosphere — its job is to make the
 * page unmistakably a property site at a glance, and to break the run of text
 * sections between the investment case and the process walkthrough.
 *
 * Stock stand-ins for now. Replace with real project renders from the
 * developer channel packs — those are far stronger and cost nothing.
 */
const ROW_A = [
  "/images/city-04.jpg",
  "/images/int-01.jpg",
  "/images/city-08.jpg",
  "/images/int-05.jpg",
  "/images/city-03.jpg",
  "/images/int-02.jpg",
];

const ROW_B = [
  "/images/int-03.jpg",
  "/images/city-09.jpg",
  // Ann inside a development's private cinema — the only frame here with a
  // person in it, which is what stops the eye on an otherwise generic rail.
  "/images/ann-cinema.jpg",
  "/images/city-01.jpg",
  "/images/int-04.jpg",
  "/images/city-05.jpg",
];

export default function Gallery() {
  return (
    <section className="relative overflow-hidden border-t border-ink-800 py-20 lg:py-24">
      <div className="mx-auto mb-12 max-w-7xl px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
              The market
            </p>
            <h2 className="glow-gold font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light leading-[1.1] text-bone">
              This is what your money buys here.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-bone-dim">
              Off-plan launches and ready stock across Dubai&rsquo;s freehold
              districts. Tell me your budget and I&rsquo;ll show you what is
              actually available in it this week.
            </p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-600/50 px-6 py-3 text-sm text-gold-400 transition-all duration-300 hover:bg-gold-500 hover:text-ink-950"
          >
            See what&rsquo;s available
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>

      <div className="relative space-y-5">
        {/* Edge fades so the rails dissolve rather than clip */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink-950 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink-950 to-transparent sm:w-40" />

        <Rail images={ROW_A} duration={52} />
        <Rail images={ROW_B} duration={64} reverse />
      </div>

      <style>{`
        @keyframes rail {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes rail-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function Rail({
  images,
  duration,
  reverse = false,
}: {
  images: string[];
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...images, ...images];

  return (
    <div
      className="flex w-max gap-5"
      style={{
        animation: `${reverse ? "rail-rev" : "rail"} ${duration}s linear infinite`,
      }}
    >
      {doubled.map((src, i) => (
        <figure
          key={`${src}-${i}`}
          className="group relative h-52 w-80 shrink-0 overflow-hidden rounded-2xl border border-ink-800 sm:h-64 sm:w-[26rem]"
        >
          <Image
            src={src}
            alt=""
            fill
            quality={70}
            sizes="416px"
            className="object-cover transition-transform duration-[1200ms] ease-out will-change-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-30" />
        </figure>
      ))}
    </div>
  );
}
