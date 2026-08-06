import Image from "next/image";
import DubaiClock from "@/components/DubaiClock";
import { SOCIAL_ICONS } from "@/components/Socials";
import { agent, legal, nav, whatsappHref } from "@/content/copy";

/** Row glyphs — the social marks are shared with the Socials component so the
 *  footer rows and the icon buttons elsewhere never drift apart. */
const ROW_ICONS = {
  ...SOCIAL_ICONS,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5h3l1.5 3.7-1.9 1.1a11 11 0 0 0 4.5 4.5l1.1-1.9 3.7 1.5v3a1.6 1.6 0 0 1-1.7 1.6A14.5 14.5 0 0 1 5 5.2 1.6 1.6 0 0 1 6.6 3.5Z" />
  ),
} as const;

/**
 * Licensing is attributed to the brokerage, never to Ann. No personal BRN is
 * printed here — see the note above `agent.brn` in copy.ts.
 *
 * The oversized wordmark at the base is the signature element: it closes the
 * page on her name rather than on small print, which is the point of a
 * personal-brand site.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-800 bg-ink-950">
      <div className="gold-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0">
        <div className="aurora absolute -bottom-[10%] left-1/2 h-[34vmax] w-[70vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(217,189,128,0.13),transparent_66%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-14">
        {/* ── Columns ───────────────────────────────────────────────── */}
        <div className="grid gap-x-8 gap-y-10 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-3xl font-light leading-none text-bone">
              {agent.name}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-gold-500">
              {agent.role} · {agent.company}
            </p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-bone-dim">
              Helping Sri Lankan families buy in Dubai — remotely, and without
              guesswork.
            </p>

            {/* The logo belongs here, next to her role, rather than floating
                alone at the top of the footer. */}
            <a
              href={agent.companySite}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block opacity-85 transition-opacity duration-300 hover:opacity-100"
            >
              <Image
                src="/brand/gcc-logo-light.png"
                alt={agent.companyLegal}
                width={200}
                height={60}
                className="h-9 w-auto"
              />
            </a>
          </div>

          <nav className="lg:col-span-4">
            <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-bone-faint">
              Explore
            </p>
            {/* Two columns so the list fills its width instead of running
                long and thin down one side. */}
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group inline-flex items-center gap-2 text-sm text-bone-dim transition-colors hover:text-gold-400"
                  >
                    <span className="h-px w-0 bg-gold-500 transition-all duration-300 group-hover:w-3" />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-bone-faint">
              Reach me
            </p>
            {/* Socials live inside this list rather than floating as a
                detached icon strip — same row rhythm as phone and email. */}
            <ul className="space-y-2.5">
              {/* Same number for both — WhatsApp opens the chat, Call dials. */}
              <ContactRow
                icon="whatsapp"
                label="WhatsApp"
                value={agent.phone}
                href={whatsappHref}
                external
              />
              <ContactRow
                icon="phone"
                label="Call"
                value={agent.phone}
                href={`tel:${agent.phone.replace(/\s/g, "")}`}
              />
              <ContactRow
                icon="mail"
                label="Email"
                value={agent.email}
                href={`mailto:${agent.email}`}
              />
              <ContactRow
                icon="instagram"
                label="Instagram"
                value={agent.instagramHandle}
                href={agent.instagram}
                external
              />
              <ContactRow
                icon="facebook"
                label="Facebook"
                value={agent.name}
                href={agent.facebook}
                external
              />
              <ContactRow
                icon="pin"
                label="Office"
                value={agent.address}
                href={agent.mapUrl}
                external
              />
            </ul>

            <p className="mt-4 text-xs text-bone-faint">
              <DubaiClock />
            </p>
          </div>
        </div>
      </div>

      {/* ── Wordmark + base line ────────────────────────────────────
          The wordmark is clipped to a fixed band so only the upper two
          thirds of the letterforms show. That keeps it a graphic device
          rather than a tall block of empty space. */}
      <div className="relative border-t border-ink-800">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(3.5rem,9vw,7.5rem)] select-none overflow-hidden px-6"
        >
          <p className="mx-auto max-w-7xl translate-y-[6%] bg-gradient-to-b from-bone/[0.14] via-gold-500/[0.10] to-transparent bg-clip-text text-center font-display text-[clamp(4rem,15vw,12rem)] font-light leading-[0.78] tracking-[-0.03em] text-transparent">
            Ann Fernando
          </p>
        </div>

        <div className="relative mx-auto flex h-[clamp(3.5rem,9vw,7.5rem)] max-w-7xl items-end justify-between gap-6 px-6 pb-5">
          <p className="text-xs text-bone-faint">{legal.copyright}</p>

          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-xs text-bone-faint transition-colors hover:text-gold-400"
          >
            Back to top
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-3 w-3 stroke-current transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

/**
 * One row of the "Reach me" list. Icon + label on the left, value on the
 * right, hairline underneath — phone, email and socials all share this shape
 * so nothing in the column reads as a detached element.
 */
function ContactRow({
  icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: keyof typeof ROW_ICONS;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="flex shrink-0 items-center gap-2.5">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 shrink-0 transition-colors duration-300 group-hover:stroke-gold-500"
          fill={icon === "facebook" ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ROW_ICONS[icon]}
        </svg>
        <span className="text-xs uppercase tracking-[0.16em]">{label}</span>
      </span>
      <span
        className={`text-right text-sm ${
          href
            ? "text-bone transition-colors group-hover:text-gold-400"
            : "max-w-[13rem] text-bone-dim"
        }`}
      >
        {value}
      </span>
    </>
  );

  const rowCls =
    "group flex items-center justify-between gap-4 border-b border-ink-800 pb-2.5 text-bone-faint transition-colors";

  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={`${rowCls} hover:border-gold-600/50`}
        >
          {inner}
        </a>
      ) : (
        <span className={rowCls}>{inner}</span>
      )}
    </li>
  );
}
