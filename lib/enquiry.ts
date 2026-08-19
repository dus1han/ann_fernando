/**
 * Where "take me to the enquiry form" should actually land.
 *
 * THE PROBLEM THIS SOLVES
 * The Contact section is a two-column grid only from `lg` up. Below that it
 * stacks, and the column that comes first is the one with Ann's portrait, the
 * heading and the WhatsApp / call / email links — the form is the SECOND
 * child, well below the fold.
 *
 * So on a phone, scrolling to `#contact` shows the contact details and hides
 * the form. A Facebook ad pointed at `/#contact` delivered people to a screen
 * with no form on it, and every WhatsApp button did the same thing before
 * focusing a name field the visitor could not see.
 *
 * Targeting the form itself fixes both, and costs nothing on desktop: there
 * the two columns are in the same grid row, so the form's top and the
 * heading's top are the same line. The heading stays on screen either way.
 *
 * Falls back to the section, so nothing breaks if the form is ever renamed or
 * a page renders the section without it.
 */
export function enquiryTarget(): HTMLElement | null {
  return (
    document.getElementById("enquiry") ?? document.getElementById("contact")
  );
}

/**
 * True when this href means "the enquiry form".
 *
 * `#contact` is the public, linkable name — it is in the nav, in the printed
 * creatives and in a live Facebook ad — so it has to keep working. It just
 * needs to resolve to the form rather than the top of the section.
 */
export function isEnquiryHash(href: string | null | undefined): boolean {
  return href === "#contact" || href === "#enquiry";
}
