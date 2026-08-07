"use client";

import { useEffect, useState } from "react";

type Slot = {
  priority: string;
  en: string;
  si: string;
  why: string;
};

/**
 * Append ?slots=1 to the URL to see exactly where Sinhala is proposed, why,
 * and what it would say. Every marked line gets outlined in place and listed
 * in a side panel.
 *
 * This is a review tool for Ann, not a production feature - it renders
 * nothing at all unless the query param is present.
 */
export default function SlotInspector() {
  const [on, setOn] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("slots")) return;
    setOn(true);

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-si-slot]"));
    const found: Slot[] = [];

    nodes.forEach((el, i) => {
      const priority = el.dataset.siSlot ?? "";
      const high = priority === "high";
      el.style.outline = `2px dashed ${high ? "#e6cf9a" : "#5b8def"}`;
      el.style.outlineOffset = "4px";
      el.style.position = el.style.position || "relative";
      el.dataset.slotIndex = String(i + 1);

      const tag = document.createElement("span");
      tag.textContent = String(i + 1);
      tag.style.cssText = `position:absolute;top:-10px;inset-inline-start:-10px;z-index:60;
        background:${high ? "#e6cf9a" : "#5b8def"};color:#08090b;font:600 10px/1 ui-sans-serif;
        padding:3px 5px;border-radius:4px;pointer-events:none;`;
      el.appendChild(tag);

      found.push({
        priority,
        en: el.dataset.siText ? (el.textContent ?? "").replace(/\d+$/, "") : el.textContent ?? "",
        si: el.dataset.siText ?? "",
        why: el.dataset.siWhy ?? "",
      });
    });

    setSlots(found);
  }, []);

  if (!on) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[200] max-h-[80vh] w-[min(420px,90vw)] overflow-auto rounded-xl border border-ink-700 bg-ink-900/95 p-4 text-sm shadow-2xl backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-base text-gold-400">Sinhala slots</p>
          <p className="text-xs text-bone-dim">
            {slots.filter((s) => s.priority === "high").length} high ·{" "}
            {slots.filter((s) => s.priority === "medium").length} medium
          </p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded border border-ink-700 px-2 py-1 text-xs text-bone-dim hover:text-bone"
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open && (
        <ol className="space-y-3">
          {slots.map((s, i) => (
            <li key={i} className="border-t border-ink-800 pt-3">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                  style={{
                    background: s.priority === "high" ? "#e6cf9a" : "#5b8def",
                    color: "#08090b",
                  }}
                >
                  {i + 1} · {s.priority}
                </span>
              </div>
              <p className="si text-gold-400">{s.si}</p>
              <p className="mt-1 text-xs text-bone-dim">{s.why}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
