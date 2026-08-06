"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { whatsappHref } from "@/content/copy";

/**
 * Full-bleed parallax band. Its job is purely rhythmic — it breaks up a long
 * run of card grids, gives the eye a large photograph to rest on, and carries
 * one line of copy plus a CTA at the point where scroll fatigue sets in.
 */
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", reduced ? "-12%" : "12%"]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[62vh] items-center overflow-hidden border-y border-ink-800"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10 h-[124%]">
        {/* Ann in a high-floor lounge above Sheikh Zayed Road. The line is
            about people who moved early — putting her, looking out over the
            city, behind it makes the point far better than a bare skyline. */}
        <Image
          src="/images/ann-skyline.jpg"
          alt="Ann Fernando overlooking the Dubai skyline"
          fill
          quality={86}
          sizes="100vw"
          style={{ objectPosition: "72% 42%" }}
          className="object-cover brightness-[1.04] contrast-[1.04] saturate-[1.05]"
        />
      </motion.div>

      {/* Overlays kept light — the photograph carries this band, so the
          gradients only need to protect the text on the left and keep Ann
          clear of it on the right. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/72 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/25" />

      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-gold-500">
            Why people move first
          </p>
          <p className="font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-light leading-[1.12] text-bone">
            The people who did well out of Dubai didn&rsquo;t time the market.
            <span className="shine"> They just started earlier.</span>
          </p>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone-dim">
            You do not need the full amount, and you do not need to be here.
            You need one honest conversation about what is realistic for you.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-9 inline-block overflow-hidden rounded-full bg-gold-500 px-8 py-4 text-base font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10">Start the conversation</span>
            <span className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
