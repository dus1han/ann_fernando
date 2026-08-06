"use client";

import { useEffect, useState } from "react";

/**
 * Live Dubai time. Renders nothing on the server and on first paint, then
 * fills in on the client — the value differs between server and browser, so
 * mounting it this way avoids a hydration mismatch.
 *
 * Small detail, but it tells an overseas reader when Ann is actually awake.
 */
export default function DubaiClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Dubai",
        }).format(new Date())
      );

    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-500" />
      </span>
      {time ? `${time} in Dubai` : "Dubai · GMT+4"}
    </span>
  );
}
