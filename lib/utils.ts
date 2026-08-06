export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** AED 1,250,000 */
export function aed(n: number) {
  return `AED ${n.toLocaleString("en-US")}`;
}

/** AED 1.25M — for tight spaces */
export function aedShort(n: number) {
  if (n >= 1_000_000) return `AED ${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
  return `AED ${(n / 1000).toFixed(0)}K`;
}
