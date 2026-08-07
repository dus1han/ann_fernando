"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import Reveal from "@/components/Reveal";
import { whatsappHref } from "@/content/copy";

/**
 * "The market" — a 3D perspective wall rather than a flat card rail.
 *
 * Three things are happening at once:
 *
 *  1. PERSPECTIVE. The whole rig sits behind a 1600px perspective and is
 *     rotated on X and Y, so the rails recede like a wall seen at an angle
 *     instead of sitting flat on the page.
 *
 *  2. SCROLL VELOCITY. The rails drift on their own, but scrolling adds to
 *     their speed and scrolling *up* reverses their direction. It makes the
 *     section feel physically connected to the reader's input rather than
 *     playing a loop at them.
 *
 *  3. Z-LIFT ON HOVER. A tile pulls forward out of the wall on hover with a
 *     gold sheen sweeping across it — real depth, not a scale transform.
 *
 * ⚠ PROPERTY AND REAL ESTATE ONLY. No photographs of Ann belong here — she
 * carries eight other placements across the page, and a person in these tiles
 * pulls the eye away from the thing being sold. Buildings, views, rooms.
 *
 * Performance: everything animated is a compositor-friendly transform. Each
 * rail updates one transform per frame; the Z-lift and sheen are hover-only.
 * The whole rig flattens and stops under prefers-reduced-motion.
 *
 * Stock stand-ins for now. Replace with real project renders from the
 * developer channel packs — those are far stronger and cost nothing.
 */
const ROW_A = [
  "/images/city-04.jpg", // Downtown + Burj Khalifa
  "/images/g-03.jpg", // styled show apartment, dining through to lounge
  "/images/city-02.jpg", // Burj Al Arab from the air
  "/images/int-05.jpg", // high-rise living room
  "/images/city-03.jpg",
  "/images/g-05.jpg", // show apartment, arched screen and art
];

const ROW_B = [
  "/images/city-06.jpg", // Marina towers from the beach
  "/images/int-01.jpg",
  "/images/city-08.jpg",
  "/images/int-03.jpg",
  "/images/city-09.jpg",
  "/images/city-01.jpg",
];

/** Keeps the marquee looping seamlessly without a layout jump. */
function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export default function Gallery() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-ink-800 py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora absolute left-1/2 top-1/3 h-[36vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(217,189,128,0.10),transparent_66%)]" />
      </div>

      <div className="mx-auto mb-14 max-w-7xl px-6">
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
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-600/50 px-6 py-3 text-sm text-gold-400 transition-colors duration-300 hover:bg-gold-500 hover:text-ink-950"
          >
            See what&rsquo;s available
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>

      {/* ── The wall ─────────────────────────────────────────────────── */}
      <div
        className="relative"
        style={{ perspective: reduced ? undefined : "1600px" }}
      >
        {/* Edge fades so the rails dissolve rather than clip */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-ink-950 via-ink-950/70 to-transparent sm:w-48" />

        <div
          className="space-y-6 py-10"
          style={
            reduced
              ? undefined
              : {
                  transform: "rotateX(9deg) rotateY(-7deg) scale(1.06)",
                  transformStyle: "preserve-3d",
                }
          }
        >
          <Rail images={ROW_A} baseVelocity={-2.2} />
          <Rail images={ROW_B} baseVelocity={2.8} />
        </div>
      </div>
    </section>
  );
}

function Rail({
  images,
  baseVelocity,
}: {
  images: string[];
  baseVelocity: number;
}) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  });
  // Scrolling adds speed; scrolling up flips the rail's direction.
  const velocityFactor = useTransform(smoothVelocity, [-1600, 0, 1600], [-4, 1, 4], {
    clamp: false,
  });

  // Duplicated once, so wrapping at -50% is seamless.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += moveBy * Math.abs(factor);
    baseX.set(baseX.get() + moveBy);
  });

  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-6"
        style={{ x: reduced ? 0 : x, transformStyle: "preserve-3d" }}
      >
        {doubled.map((src, i) => (
          <Tile key={`${src}-${i}`} src={src} />
        ))}
      </motion.div>
    </div>
  );
}

function Tile({ src }: { src: string }) {
  return (
    <figure
      tabIndex={0}
      /* The Z-lift is pure CSS so it costs no React work and also fires on
         keyboard focus. `translateZ` pulls the tile forward out of the wall —
         real depth, not a scale. */
      className="group relative h-56 w-80 shrink-0 overflow-hidden rounded-2xl border border-ink-700/70 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.95)] outline-none transition-[transform,border-color,box-shadow] duration-[600ms] ease-out [transform:translateZ(0)] [transform-style:preserve-3d] sm:h-72 sm:w-[28rem]
                 hover:z-10 hover:border-gold-600/60 hover:shadow-[0_40px_80px_-30px_rgba(217,189,128,0.35)] hover:[transform:translateZ(90px)]
                 focus-visible:z-10 focus-visible:border-gold-600/60 focus-visible:[transform:translateZ(90px)]"
    >
      <Image
        src={src}
        alt=""
        fill
        quality={74}
        sizes="(max-width: 640px) 320px, 448px"
        className="object-cover transition-transform duration-[1400ms] ease-out will-change-transform group-hover:scale-[1.08]"
      />

      {/* Base grade — lifts off on hover so the tile brightens as it comes forward */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent transition-opacity duration-[600ms] group-hover:opacity-25" />

      {/* Gold sheen sweeping across the glass */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-[-60%] left-[-40%] w-[35%] -translate-x-[220%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-gold-400/25 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-[560%]" />
      </div>

      {/* Hairline that catches the light along the top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent opacity-0 transition-opacity duration-[600ms] group-hover:opacity-100" />
    </figure>
  );
}
