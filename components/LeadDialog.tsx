"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { track } from "@vercel/analytics";
import { agent } from "@/content/copy";

/**
 * Puts a short qualifying form in front of every WhatsApp link on the site.
 *
 * WHY IT INTERCEPTS RATHER THAN REPLACING THE BUTTONS
 * Fourteen sections render `<a href={whatsappHref}>`, and almost all of them are
 * server components. Turning each into a client component to hang an onClick on
 * would mean fourteen edits now and a forgotten one every time a section is
 * added. One capture-phase listener on `document` catches all of them, including
 * any added later. This is the same approach ConversionTracking already uses.
 *
 * THE ONE EXCEPTION
 * The floating green button carries `data-wa-direct` and is deliberately left
 * alone. It is the escape hatch for someone who has already decided and just
 * wants to type, and it is the only WhatsApp route on the site with no form in
 * the way.
 *
 * ⚠ NOTHING IS STORED. The answers are composed into the WhatsApp message and
 * nowhere else, so a visitor who fills the form and then abandons is not
 * captured anywhere. Wiring a backend is a separate job; do not assume this
 * form is a lead database.
 */

const BUDGETS = [
  "Not sure yet",
  "Under AED 1M",
  "AED 1M to 2M",
  "AED 2M or more",
] as const;

export default function LeadDialog() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("unknown");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [message, setMessage] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    returnFocusTo.current?.focus?.();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Let modified clicks through. Someone opening in a new tab on purpose
      // should get WhatsApp, not a dialog they did not ask for.
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
        return;
      }

      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (!href.includes("wa.me")) return;
      if (link.hasAttribute("data-wa-direct")) return;

      e.preventDefault();

      // Each section's link carries its own prefilled text, which is the whole
      // context of what the reader was reading when they decided to ask. Keep
      // it as the starting message rather than throwing it away.
      let prefill = "";
      try {
        prefill = new URL(href, window.location.origin).searchParams.get("text") ?? "";
      } catch {
        prefill = "";
      }
      // Her name is already at the top of the composed message, so a prefill
      // that also opens with it would read twice.
      prefill = prefill.replace(/^\s*Hi Ann,?\s*/i, "").trim();

      const from =
        link.closest("section")?.id ||
        link.closest("footer")?.tagName.toLowerCase() ||
        "unknown";

      returnFocusTo.current = link as HTMLElement;
      setSection(from);
      setMessage(prefill);
      setOpen(true);
      track("whatsapp_form_open", { section: from });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => nameRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `Hi Ann, I'm ${name.trim() || "getting in touch"}.`,
      message.trim(),
      budget ? `Budget: ${budget}` : "",
    ].filter(Boolean);

    track("whatsapp_form_submit", { section, budget: budget || "not given" });

    // Opened in the same gesture as the submit, so pop-up blockers allow it.
    window.open(
      `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(lines.join("\n\n"))}`,
      "_blank",
      "noopener,noreferrer"
    );
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-title"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="edge-gold max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-ink-900 p-7 sm:rounded-3xl sm:p-9"
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-gold-500">
                  Before we start
                </p>
                <h2
                  id="lead-title"
                  className="font-display text-2xl font-light leading-snug text-bone"
                >
                  Three quick things, then WhatsApp opens.
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-1 -mt-1 shrink-0 text-2xl leading-none text-bone-dim transition-colors hover:text-bone"
              >
                ×
              </button>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label
                  htmlFor="lead-name"
                  className="mb-2 block text-xs uppercase tracking-[0.14em] text-bone-dim"
                >
                  Your name
                </label>
                <input
                  id="lead-name"
                  ref={nameRef}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-ink-700 bg-ink-950 px-4 py-3 text-bone outline-none transition-colors focus:border-gold-600"
                />
              </div>

              <div>
                <span className="mb-2 block text-xs uppercase tracking-[0.14em] text-bone-dim">
                  Budget
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(budget === b ? "" : b)}
                      aria-pressed={budget === b}
                      className={
                        budget === b
                          ? "rounded-xl border border-gold-500 bg-gold-500/10 px-3 py-2.5 text-sm text-gold-400"
                          : "rounded-xl border border-ink-700 px-3 py-2.5 text-sm text-bone-dim transition-colors hover:border-ink-600 hover:text-bone"
                      }
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="lead-message"
                  className="mb-2 block text-xs uppercase tracking-[0.14em] text-bone-dim"
                >
                  What would you like to ask?
                </label>
                <textarea
                  id="lead-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything. There is no wrong question."
                  className="w-full resize-none rounded-xl border border-ink-700 bg-ink-950 px-4 py-3 text-bone outline-none transition-colors placeholder:text-bone-faint focus:border-gold-600"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gold-500 px-8 py-4 text-base font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.02]"
              >
                Open WhatsApp
              </button>

              <p className="text-center text-xs leading-relaxed text-bone-faint">
                This opens WhatsApp with your answers written out. Nothing is
                sent until you press send there.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
