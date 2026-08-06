"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { agent, nav, whatsappHref } from "@/content/copy";
import { cn } from "@/lib/utils";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-ink-800/80 bg-ink-950/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#top" className="group flex items-center gap-4 leading-none">
            <span className="flex flex-col">
              <span className="font-display text-lg tracking-tight text-bone">
                {agent.name}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-gold-500">
                {agent.role}
              </span>
            </span>
            <span className="hidden h-9 w-px bg-ink-700 sm:block" />
            <Image
              src="/brand/gcc-logo-light.png"
              alt={agent.companyLegal}
              width={180}
              height={54}
              priority
              className="hidden h-8 w-auto sm:block"
            />
          </a>

          <nav className="hidden items-center gap-6 xl:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative whitespace-nowrap text-[13px] text-bone-dim transition-colors hover:text-bone"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-gold-500 px-5 py-2.5 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03] sm:block"
            >
              WhatsApp
            </a>
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen(true)}
              className="xl:hidden"
            >
              <span className="block h-px w-6 bg-bone" />
              <span className="mt-1.5 block h-px w-6 bg-bone" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink-950/98 backdrop-blur-xl xl:hidden"
          >
            <div className="flex justify-end p-6">
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="text-3xl leading-none text-bone-dim"
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-8 pt-6">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-ink-800 py-4 font-display text-2xl text-bone"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
