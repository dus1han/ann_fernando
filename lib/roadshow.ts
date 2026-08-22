"use client";

import { useEffect, useState } from "react";
import { roadshow } from "@/content/copy";

/**
 * Whether the Colombo event is still ahead of us.
 *
 * The page is statically generated, so a `new Date()` evaluated during render
 * would be frozen at the last deploy. The check therefore runs on the client
 * after mount, exactly as the countdown in Roadshow.tsx does, and the server
 * renders the pre-event state — correct until the date passes.
 *
 * Keys off `roadshow.active` and `roadshow.endsAt`, so switching the event off
 * or moving its date carries everything that depends on this with it.
 */
export function useRoadshowLive() {
  const [live, setLive] = useState(roadshow.active);

  useEffect(() => {
    if (!roadshow.active) return;

    const end = new Date(roadshow.endsAt).getTime();
    let id: number;

    const check = () => {
      const ms = end - Date.now();
      if (ms <= 0) {
        setLive(false);
        return;
      }
      // setTimeout overflows past ~24.8 days and would then fire immediately,
      // flipping the copy early. A distant deadline is re-checked a day at a
      // time instead of waited out in one go.
      id = window.setTimeout(check, Math.min(ms, 86_400_000));
    };

    check();
    return () => clearTimeout(id);
  }, []);

  return live;
}
