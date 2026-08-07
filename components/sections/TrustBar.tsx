import Reveal from "@/components/Reveal";
import { trustPoints } from "@/content/copy";

/**
 * Verifiable facts, not achievement statistics - every figure here is
 * something a reader could independently check today. Licensing claims belong
 * to the brokerage, never to Ann personally. See the notes above `trustPoints`
 * and `agent.brn` in copy.ts before changing any of it.
 */
export default function TrustBar() {
  return (
    <section className="border-y border-ink-800 bg-ink-900/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-ink-800 lg:grid-cols-4">
        {trustPoints.map((p, i) => (
          <Reveal
            key={p.label}
            delay={i * 0.07}
            className="group relative bg-ink-950 px-6 py-10 text-center transition-colors duration-500 hover:bg-ink-900"
          >
            <span className="absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold-500 to-transparent transition-transform duration-700 group-hover:scale-x-100" />

            <p className="glow-gold font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-light leading-none text-gold-400">
              {p.value}
            </p>
            <p className="mx-auto mt-3 max-w-[15rem] text-[11px] uppercase leading-relaxed tracking-[0.16em] text-bone-dim">
              {p.label}
            </p>
            <p className="mx-auto mt-3 max-w-[17rem] text-xs leading-relaxed text-bone-faint opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:h-0 lg:group-hover:h-auto">
              {p.detail}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
