import Reveal from "@/components/Reveal";
import { verify } from "@/content/copy";
import { Say } from "@/lib/bi";

/**
 * The trust centrepiece.
 *
 * The move is to stop asking to be believed and start showing the reader how
 * to check — every item here is verifiable without involving Ann at all.
 * Counter-intuitively this converts better than projected confidence, because
 * it is what someone with nothing to hide would actually do.
 */
export default function Verify() {
  return (
    <section
      id="verify"
      className="relative overflow-hidden border-t border-ink-800 py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-[38vmax] w-[38vmax] rounded-full bg-[radial-gradient(circle,rgba(212,182,120,0.07),transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
            {verify.eyebrow}
          </p>
          <Say
            as="h2"
            v={verify.title}
            className="glow-gold font-display text-[clamp(2.2rem,5vw,3.6rem)] font-light leading-[1.08] text-bone"
          />
          <p className="mt-6 text-lg leading-relaxed text-bone-dim">
            {verify.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {verify.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 3) * 0.08}
              className="lift group flex h-full flex-col rounded-2xl border border-ink-800 bg-ink-950 p-7 hover:border-gold-600/50"
            >
              <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700 transition-colors duration-500 group-hover:border-gold-600/60">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 stroke-gold-500"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2.5 4 6v6c0 5 3.4 8.4 8 9.5 4.6-1.1 8-4.5 8-9.5V6l-8-3.5Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>

              <h3 className="font-display text-xl font-light leading-snug text-bone">
                {item.title}
              </h3>

              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-bone-dim">
                {item.body}
              </p>

              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border-t border-ink-800 pt-4 text-[11px] uppercase tracking-[0.14em] text-gold-500 transition-colors hover:text-gold-400"
                >
                  {item.action}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ) : (
                <p className="mt-6 border-t border-ink-800 pt-4 text-[11px] uppercase tracking-[0.14em] text-gold-600">
                  {item.action}
                </p>
              )}
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
