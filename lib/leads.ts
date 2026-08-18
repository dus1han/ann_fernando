/**
 * Records an enquiry to the Google Sheet, without ever getting in the way of
 * the WhatsApp handoff.
 *
 * WHY THIS EXISTS
 * The form's real job is to open WhatsApp with the details filled in. But the
 * person still has to press send there, and some never do — they hesitate, or
 * they are on a desktop that is not logged into WhatsApp Web. Those leads
 * vanish completely, even though they typed a name, a phone number and a
 * budget into the form a second earlier.
 *
 * This sends a copy to the sheet, so Ann has them either way.
 *
 * ⚠ THE ONE RULE: NEVER AWAIT THIS BEFORE window.open()
 * Browsers only allow window.open() while a user gesture is still being
 * handled. Awaiting a fetch first ends that window, and the popup blocker
 * kills WhatsApp — which would break the primary path in order to improve the
 * backup one. So this fires and returns immediately, and every failure is
 * swallowed: a sheet that is down must never cost Ann a WhatsApp conversation.
 *
 * sendBeacon is built for exactly this case. It hands the request to the
 * browser, which delivers it independently of the page — so it survives the
 * tab being navigated away or closed the instant afterwards. `fetch` with
 * keepalive is the fallback for the rare browser that refuses the beacon.
 */

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  budget: string;
  message: string;
};

const ENDPOINT = "/api/lead";

export function recordLead(form: LeadPayload) {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify({
    ...form,
    // Useful context Ann cannot get from the form fields themselves.
    page: window.location.pathname + window.location.search,
    referrer: document.referrer || "",
  });

  try {
    const blob = new Blob([payload], { type: "application/json" });
    if (navigator.sendBeacon?.(ENDPOINT, blob)) return;
  } catch {
    // Fall through to fetch.
  }

  try {
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Deliberately silent. See the warning above.
  }
}
