import { agent, whatsappHref } from "@/content/copy";

/** Shared so the footer can reuse the same glyphs in its contact rows. */
export const SOCIAL_ICONS = {
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 8.6h2.3V5.4h-2.6c-2.3 0-3.7 1.5-3.7 3.9v1.8H8.2v3.2h2.3V22h3.3v-7.7h2.4l.4-3.2h-2.8V9.6c0-.7.3-1 .7-1Z" />
  ),
  whatsapp: (
    <>
      <path d="M3.2 20.8 4.5 16a8.6 8.6 0 1 1 3.4 3.3l-4.7 1.5Z" />
      <path d="M9 8.6c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.5.6c-.1.2-.3.3-.1.6a8 8 0 0 0 3.6 3.1c.3.2.5 0 .6-.1l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.4.4a2 2 0 0 1-1.3 1.7c-.4.2-1 .3-1.8.1a11 11 0 0 1-6.5-5.7c-.4-1-.4-1.9 0-2.6L9 8.6Z" />
    </>
  ),
};

type Key = keyof typeof SOCIAL_ICONS;

/** Icon links for Ann's socials. LinkedIn is omitted until she has one. */
export default function Socials({
  className = "",
  size = "md",
  tone = "dark",
}: {
  className?: string;
  size?: "sm" | "md";
  /** "dark" = on the charcoal sections, "light" = on the cream sections. */
  tone?: "dark" | "light";
}) {
  const links: { key: Key; href: string; label: string }[] = [
    { key: "whatsapp", href: whatsappHref, label: "WhatsApp Ann" },
    { key: "instagram", href: agent.instagram, label: "Ann on Instagram" },
    { key: "facebook", href: agent.facebook, label: "Ann on Facebook" },
  ];

  const box = size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const icon = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";
  const toneCls =
    tone === "light"
      ? "border-ink-text/15 text-ink-text-dim hover:border-gold-700 hover:text-gold-700 hover:bg-ink-text/[0.04]"
      : "border-ink-700 text-bone-dim hover:border-gold-600 hover:text-gold-400";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
          title={l.label}
          className={`group flex ${box} ${toneCls} items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5`}
        >
          <svg
            viewBox="0 0 24 24"
            className={icon}
            fill={l.key === "facebook" ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {SOCIAL_ICONS[l.key]}
          </svg>
        </a>
      ))}
    </div>
  );
}
