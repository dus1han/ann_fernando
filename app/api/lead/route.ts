/**
 * Emails each enquiry from the contact form.
 *
 * WHY A SERVER ROUTE AND NOT THE BROWSER
 * The Resend API key must never reach the client. Anything in the browser
 * bundle is readable by every visitor, and that key can send mail as you.
 *
 * This route always answers 204, whatever happens downstream. The client is
 * not waiting for the response — it has already handed the person to WhatsApp
 * — so there is nothing useful to report, and a failing mail provider must
 * never surface as an error in front of someone making an enquiry.
 */

/** Where enquiries go. Override in Vercel to change or add a recipient. */
const DEFAULT_TO = "dus1han@gmail.com";

/**
 * Resend's shared sender. It works with NO DNS setup at all, but it can only
 * deliver to the address the Resend account was registered with.
 *
 * To send anywhere else — Ann's own inbox, a second recipient — verify
 * annfernando.com in Resend and set LEAD_EMAIL_FROM to something like
 * "leads@annfernando.com". Mail from your own domain also lands in the inbox
 * far more reliably than a shared sender.
 */
const DEFAULT_FROM = "Ann Fernando Website <onboarding@resend.dev>";

/** Longest value accepted per field. Beyond this it is abuse, not an enquiry. */
const MAX_FIELD = 900;

const clean = (v: unknown) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, MAX_FIELD) : "";

/** Escapes text before it goes into the HTML body of the email. */
const esc = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const ok = () => new Response(null, { status: 204 });

type Lead = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  budget: string;
  message: string;
  page: string;
  referrer: string;
};

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;

  // Not configured is a normal state, not a fault: local runs and any deploy
  // without the key simply skip the email. The form still works.
  if (!key) return ok();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return ok();
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  const lead: Lead = {
    name: clean(raw.name),
    phone: clean(raw.phone),
    email: clean(raw.email),
    interest: clean(raw.interest),
    budget: clean(raw.budget),
    message: clean(raw.message),
    page: clean(raw.page),
    referrer: clean(raw.referrer),
  };

  // The two fields the form marks required. Anything without them is a bot or
  // a broken request, and is not worth an email.
  if (!lead.name || !lead.phone) return ok();

  try {
    await sendEmail(key, lead);
  } catch {
    // Swallowed on purpose — see the note at the top of the file.
  }

  return ok();
}

async function sendEmail(key: string, lead: Lead) {
  const to = (process.env.LEAD_EMAIL_TO ?? DEFAULT_TO)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email || "not given"],
    ["Interest", lead.interest],
    ["Budget", lead.budget],
    ["Message", lead.message || "none"],
    ["Page", lead.page || "/"],
    ["Came from", lead.referrer || "direct"],
  ];

  const html = [
    '<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px">',
    '<h2 style="margin:0 0 4px;font-size:18px">New enquiry from the website</h2>',
    '<p style="margin:0 0 18px;color:#666;font-size:14px">',
    esc(lead.name),
    " &middot; ",
    esc(lead.interest),
    "</p>",
    '<table style="border-collapse:collapse;width:100%;font-size:14px">',
    rows
      .map(
        ([k, v]) =>
          '<tr><td style="padding:7px 12px 7px 0;color:#666;vertical-align:top;white-space:nowrap">' +
          esc(k) +
          '</td><td style="padding:7px 0;border-bottom:1px solid #eee">' +
          esc(v) +
          "</td></tr>"
      )
      .join(""),
    "</table>",
    '<p style="margin:18px 0 0"><a href="https://wa.me/',
    esc(lead.phone.replace(/[^0-9]/g, "")),
    '" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:9px 16px;border-radius:5px;font-size:14px">Reply on WhatsApp</a></p>',
    '<p style="margin:18px 0 0;color:#999;font-size:12px">',
    "This is a copy of what the enquirer was about to send on WhatsApp. ",
    "They may or may not have pressed send there.</p>",
    "</div>",
  ].join("");

  const text = rows.map(([k, v]) => k + ": " + v).join("\n");

  const payload: Record<string, unknown> = {
    from: process.env.LEAD_EMAIL_FROM ?? DEFAULT_FROM,
    to,
    subject: "New enquiry: " + lead.name + " (" + lead.interest + ")",
    html,
    text,
  };

  // Lets you hit reply and write straight back to them, when they gave one.
  if (lead.email) payload.reply_to = lead.email;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });

  return res;
}

/**
 * Diagnostics. Answers the question the POST path deliberately cannot: when an
 * email does not arrive, WHERE did it stop?
 *
 * The POST handler swallows every failure on purpose, which is exactly what
 * makes it undebuggable. This reports the configuration, and — with the key
 * supplied as a header — sends a real test email and returns what Resend said.
 *
 * The unauthenticated response reveals only whether each variable is present
 * and where mail would go. It never returns the API key.
 */
export async function GET(request: Request) {
  const key = process.env.RESEND_API_KEY ?? "";
  const authorised = key.length > 0 && request.headers.get("x-diagnose") === key;

  const from = process.env.LEAD_EMAIL_FROM ?? DEFAULT_FROM;
  const to = process.env.LEAD_EMAIL_TO ?? DEFAULT_TO;

  const report: Record<string, unknown> = {
    RESEND_API_KEY: key ? "set" : "MISSING",
    keyLooksValid: key.startsWith("re_"),
    from,
    to,
    usingSharedSender: from.indexOf("resend.dev") >= 0,
  };

  if (!key) {
    report.verdict =
      "RESEND_API_KEY is not set on this deployment. Add it in Vercel and redeploy.";
    return Response.json(report);
  }

  if (!authorised) {
    report.verdict =
      "Key is set. Send the x-diagnose header with the API key to send a real test email.";
    if (report.usingSharedSender) {
      report.note =
        "Using Resend's shared sender, which can ONLY deliver to the address " +
        "the Resend account was registered with. If " + to + " is not that " +
        "address, verify a domain and set LEAD_EMAIL_FROM.";
    }
    return Response.json(report);
  }

  try {
    const res = await sendEmail(key, {
      name: "DIAGNOSTIC",
      phone: "+971500000000",
      email: "",
      interest: "diagnostic",
      budget: "diagnostic",
      message: "Test email from GET /api/lead. If you can read this, it works.",
      page: "/api/lead",
      referrer: "diagnostic",
    });

    const text = await res.text();
    report.resendStatus = res.status;
    report.resendBody = text.slice(0, 400);

    if (res.status === 200) {
      report.verdict = "WORKING. A test email was sent to " + to + ".";
    } else if (res.status === 401 || res.status === 403) {
      report.verdict = "KEY REJECTED. The RESEND_API_KEY is wrong or revoked.";
    } else if (text.indexOf("domain") >= 0) {
      report.verdict =
        "SENDER NOT ALLOWED. Verify the domain in Resend, or use the shared " +
        "sender and send only to the account's own address.";
    } else {
      report.verdict = "Unexpected reply - read resendBody.";
    }
  } catch (err) {
    report.verdict = "Could not reach the Resend API.";
    report.error = String(err);
  }

  return Response.json(report);
}
