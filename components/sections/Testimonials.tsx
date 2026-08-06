import Reveal from "@/components/Reveal";
import { SHOW_TESTIMONIALS, testimonials } from "@/content/copy";
import { Say } from "@/lib/bi";

/**
 * Gated by SHOW_TESTIMONIALS. If there are no real, attributable quotes yet,
 * set that flag to false — a missing testimonials section is unremarkable,
 * an invented one is fraud and this community is small enough to find out.
 */
export default function Testimonials() {
  if (!SHOW_TESTIMONIALS) return null;

  return (
    <section className="border-t border-ink-800 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
            Clients
          </p>
          <Say
            as="h2"
            v={testimonials.title}
            className="glow-gold font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.08] text-bone"
          />
          <p className="mt-5 text-[15px] leading-relaxed text-bone-dim">
            {testimonials.note}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.items.map((tItem, i) => (
            <Reveal
              key={tItem.name}
              delay={(i % 2) * 0.1}
              className="relative rounded-2xl border border-ink-800 bg-ink-900/40 p-8"
            >
              <span
                aria-hidden
                className="absolute right-6 top-4 font-display text-6xl leading-none text-ink-800"
              >
                &rdquo;
              </span>
              <Say
                as="blockquote"
                v={tItem.quote}
                className="relative font-display text-xl font-light leading-relaxed text-bone"
              />
              <footer className="mt-6 flex items-center gap-3 border-t border-ink-800 pt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-700 text-xs text-gold-500">
                  {tItem.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm text-bone">{tItem.name}</p>
                  <p className="text-xs text-bone-faint">{tItem.location}</p>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
