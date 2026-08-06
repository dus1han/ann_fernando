"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { agent, contact, whatsappHref } from "@/content/copy";
import { Say } from "@/lib/bi";

/**
 * The form composes a WhatsApp message rather than posting to a backend.
 *
 * Deliberate: in this market WhatsApp converts several times better than
 * email, it needs no API key or deliverability setup, and a lead can never be
 * silently lost to a spam folder. If Ann later wants email copies too, swap
 * `onSubmit` for a Server Action calling Resend — the markup does not change.
 */
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: contact.interests[0],
    budget: contact.budgets[0],
    message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Hi Ann, I'd like to talk about Dubai property.`,
      ``,
      `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      `Interest: ${form.interest}`,
      `Budget: ${form.budget}`,
      form.message && ``,
      form.message && form.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-ink-800 py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/city-09.jpg"
          alt=""
          fill
          quality={70}
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/72 to-ink-950" />
        <div className="aurora absolute left-[6%] top-1/3 h-[32vmax] w-[32vmax] rounded-full bg-[radial-gradient(circle,rgba(212,182,120,0.13),transparent_66%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          {/* A face at the point of enquiry — people message a person, not a
              form. Highest-intent moment on the page. */}
          <div className="mb-7 flex items-center gap-4">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-600/50">
              <Image
                src="/images/ann-portrait.jpg"
                alt="Ann Fernando"
                fill
                quality={78}
                sizes="56px"
                style={{ objectPosition: "52% 28%" }}
                className="object-cover"
              />
            </span>
            <span>
              <span className="block text-sm text-bone">{agent.name}</span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-gold-500">
                Replies personally
              </span>
            </span>
          </div>

          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold-500">
            Get in touch
          </p>
          <Say
            as="h2"
            v={contact.title}
            className="glow-gold font-display text-[clamp(2.4rem,5vw,3.8rem)] font-light leading-[1.05] text-bone"
          />
          <p className="mt-5 text-lg leading-relaxed text-bone-dim">
            {contact.intro}
          </p>

          <div className="mt-10 space-y-4 border-t border-ink-800 pt-8">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-xl border border-ink-800 px-5 py-4 transition-colors hover:border-gold-600/50"
            >
              <span className="text-sm text-bone">WhatsApp</span>
              <span className="text-sm text-gold-400 transition-transform group-hover:translate-x-1">
                {agent.phone} →
              </span>
            </a>
            {/* Same number as WhatsApp — this one dials instead of chatting. */}
            <a
              href={`tel:${agent.phone.replace(/\s/g, "")}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-ink-800 px-5 py-4 transition-colors hover:border-gold-600/50"
            >
              <span className="text-sm text-bone">Call</span>
              <span className="text-sm text-gold-400 transition-transform group-hover:translate-x-1">
                {agent.phone} →
              </span>
            </a>
            <a
              href={`mailto:${agent.email}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-ink-800 px-5 py-4 transition-colors hover:border-gold-600/50"
            >
              <span className="text-sm text-bone">Email</span>
              <span className="text-sm text-gold-400 transition-transform group-hover:translate-x-1">
                {agent.email} →
              </span>
            </a>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-bone-faint">
            {contact.note}
          </p>

          <a
            href={agent.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 text-xs text-bone-dim transition-colors hover:text-gold-400"
          >
            {agent.address}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-7">
          <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
            <Field label={contact.fields.name}>
              <input
                required
                value={form.name}
                onChange={set("name")}
                className={inputCls}
                autoComplete="name"
              />
            </Field>

            <Field label={contact.fields.phone}>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                className={inputCls}
                autoComplete="tel"
                placeholder="+971 …"
              />
            </Field>

            <Field label={contact.fields.email} className="sm:col-span-2">
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                className={inputCls}
                autoComplete="email"
              />
            </Field>

            <Field label={contact.fields.interest}>
              <select value={form.interest} onChange={set("interest")} className={inputCls}>
                {contact.interests.map((o) => (
                  <option key={o} className="bg-ink-900">
                    {o}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={contact.fields.budget}>
              <select value={form.budget} onChange={set("budget")} className={inputCls}>
                {contact.budgets.map((o) => (
                  <option key={o} className="bg-ink-900">
                    {o}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={contact.fields.message} className="sm:col-span-2">
              <textarea
                rows={4}
                value={form.message}
                onChange={set("message")}
                className={`${inputCls} resize-none`}
              />
            </Field>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-full bg-gold-500 px-8 py-4 text-base font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.01] sm:w-auto"
              >
                <span className="relative z-10">{contact.fields.submit}</span>
                <span className="absolute inset-0 -translate-x-full bg-gold-400 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
              <p className="mt-4 text-xs text-bone-faint">
                Opens WhatsApp with your details filled in — nothing is sent
                until you press send there.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-lg border border-ink-700 bg-ink-900/60 px-4 py-3 text-[15px] text-bone outline-none transition-colors placeholder:text-bone-faint focus:border-gold-600";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs uppercase tracking-[0.15em] text-bone-faint">
        {label}
      </span>
      {children}
    </label>
  );
}
