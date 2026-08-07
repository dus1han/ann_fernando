import type { Bi } from "@/content/copy";
import { SINHALA_ENABLED } from "@/content/copy";

/** Resolve a bilingual line to the string that should render right now. */
export function say(v: Bi): string {
  return SINHALA_ENABLED && v.si ? v.si : v.en;
}

/**
 * Renders a bilingual line.
 *
 * While SINHALA_ENABLED is false this is a plain English span - but it still
 * stamps `data-si-slot` onto the element, so the slot inspector (append
 * ?slots=1 to the URL) can show exactly where Sinhala is waiting to go.
 */
export function Say({
  v,
  className = "",
  as: Tag = "span",
}: {
  v: Bi;
  className?: string;
  as?: React.ElementType;
}) {
  const showingSinhala = SINHALA_ENABLED && !!v.si;
  return (
    <Tag
      className={`${className} ${showingSinhala ? "si" : ""}`.trim()}
      data-si-slot={v.slot ?? undefined}
      data-si-text={v.si ?? undefined}
      data-si-why={v.why ?? undefined}
    >
      {showingSinhala ? v.si : v.en}
    </Tag>
  );
}
