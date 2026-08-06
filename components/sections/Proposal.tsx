import Image from "next/image";
import Reveal from "@/components/Reveal";
import { agent, proposal } from "@/content/copy";
import { Say } from "@/lib/bi";

/**
 * The lead magnet.
 *
 * There is no generic PDF, so none is offered. The deliverable is a document
 * Ann actually produces per client — which converts better than a download
 * because it cannot be obtained without a conversation, and the lead arrives
 * already qualified on budget, timeline and purpose.
 *
 * The right-hand column renders a mock cover so the offer feels like a real,
 * tangible object rather than a form.
 */
export default function Proposal() {
  const href = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(
    "Hi Ann, I'd like a property proposal. Here's my budget and what I'm looking for:"
  )}`;

  return (
    <section id="proposal" className="border-t border-ink-800 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="ring-anim relative overflow-hidden rounded-3xl bg-ink-900 p-8 sm:p-12 lg:p-14">
          <Image
            src="/images/city-07.jpg"
            alt=""
            fill
            quality={70}
            sizes="100vw"
            className="object-cover object-bottom opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/70" />
          <div className="aurora pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(217,189,128,0.16),transparent_65%)] blur-2xl" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* ── Offer ─────────────────────────────────────────────── */}
            <Reveal className="lg:col-span-7">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
                {proposal.eyebrow}
              </p>
              <Say
                as="h2"
                v={proposal.title}
                className="glow-gold font-display text-[clamp(2rem,4.2vw,3.1rem)] font-light leading-[1.1] text-bone"
              />
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone-dim">
                {proposal.intro}
              </p>

              <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-gold-600">
                {proposal.bulletsLabel}
              </p>
              <ul className="mt-5 space-y-3.5">
                {proposal.bullets.map((b, i) => (
                  <Reveal as="li" key={b} delay={0.05 * i} y={12}>
                    <span className="flex items-start gap-3.5 text-[15px] leading-relaxed text-bone-dim">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mt-1 h-4 w-4 shrink-0 stroke-gold-500"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m5 12.5 4.5 4.5L19 7" />
                      </svg>
                      {b}
                    </span>
                  </Reveal>
                ))}
              </ul>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-10 inline-block overflow-hidden rounded-full bg-gold-500 px-8 py-4 text-base font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="relative z-10">{proposal.cta}</span>
                <span className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-500 group-hover:translate-x-0" />
              </a>

              <p className="mt-5 max-w-md text-xs leading-relaxed text-bone-faint">
                {proposal.note}
              </p>
            </Reveal>

            {/* ── Mock cover ────────────────────────────────────────── */}
            <Reveal delay={0.14} className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                {/* Stacked sheets behind, to read as a document */}
                <div className="absolute -right-3 top-3 h-full w-full rounded-2xl border border-ink-700/60 bg-ink-850" />
                <div className="absolute -right-1.5 top-1.5 h-full w-full rounded-2xl border border-ink-700/80 bg-ink-800" />

                <div className="relative overflow-hidden rounded-2xl border border-gold-600/40 bg-ink-950 p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-gold-500">
                        Prepared for
                      </p>
                      <p className="mt-1 font-display text-xl font-light text-bone">
                        Your name here
                      </p>
                    </div>
                    <Image
                      src="/brand/gcc-logo-light.png"
                      alt={agent.companyLegal}
                      width={110}
                      height={34}
                      className="h-5 w-auto opacity-80"
                    />
                  </div>

                  <div className="mt-7 space-y-4 border-t border-ink-800 pt-6">
                    <MockRow label="Budget" value="AED 1.2M" />
                    <MockRow label="Purpose" value="Rental yield" />
                    <MockRow label="Options shortlisted" value="4" />
                    <MockRow label="Projected net yield" value="6.8%" gold />
                    <MockRow label="Golden Visa" value="Not yet — AED 2M" />
                  </div>

                  {/* Skeleton lines suggesting further pages */}
                  <div className="mt-7 space-y-2.5 border-t border-ink-800 pt-6">
                    {[92, 78, 85, 60].map((w) => (
                      <span
                        key={w}
                        className="block h-1.5 rounded-full bg-bone/10"
                        style={{ width: `${w}%` }}
                      />
                    ))}
                  </div>

                  <p className="mt-7 border-t border-ink-800 pt-5 text-center text-xs leading-relaxed text-bone-dim">
                    Written from scratch around{" "}
                    <span className="text-gold-400">your</span> requirement.
                    Never a template.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-gold-600/50" />
                  <p className="text-center text-xs text-bone-dim">
                    {proposal.turnaroundLabel} ·{" "}
                    <span className="text-gold-400">{proposal.turnaround}</span>
                  </p>
                  <span className="h-px w-8 bg-gold-600/50" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockRow({
  label,
  value,
  gold = false,
}: {
  label: string;
  value: string;
  gold?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-xs text-bone-faint">{label}</span>
      <span
        className={`text-sm tabular-nums ${gold ? "text-gold-400" : "text-bone"}`}
      >
        {value}
      </span>
    </div>
  );
}
