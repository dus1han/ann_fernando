/**
 * Receives an enquiry from the contact form and appends it to Ann's Google
 * Sheet, via the Apps Script web app deployed from `docs/leads-sheet.gs`.
 *
 * WHY THE BROWSER DOES NOT POST TO GOOGLE DIRECTLY
 * Three reasons, and the first is the one that matters:
 *
 *  1. The Apps Script URL would have to ship in the client bundle, where
 *     anyone can read it and write junk rows into Ann's sheet forever. Kept
 *     here, it is a server-only secret the browser never sees.
 *  2. Apps Script answers with a 302 to a different Google host, which is
 *     awkward to follow from a browser under CORS but trivial server-side.
 *  3. Validation belongs somewhere the submitter cannot edit.
 *
 * This route always answers 204, whatever happens downstream. The client is
 * not waiting for the response — it has already handed the person to WhatsApp
 * — so there is nothing useful to report, and a failing sheet must never
 * surface as an error in front of someone making an enquiry.
 */

/** Longest value accepted per field. Beyond this it is abuse, not an enquiry. */
const MAX_FIELD = 900;

const clean = (v: unknown) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, MAX_FIELD) : "";

const ok = () => new Response(null, { status: 204 });

export async function POST(request: Request) {
  const endpoint = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  // Not configured is a normal state, not a fault: local runs and any deploy
  // without the variable simply skip the sheet. The form still works.
  if (!endpoint) return ok();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return ok();
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  const lead = {
    name: clean(raw.name),
    phone: clean(raw.phone),
    email: clean(raw.email),
    interest: clean(raw.interest),
    budget: clean(raw.budget),
    message: clean(raw.message),
    page: clean(raw.page),
    referrer: clean(raw.referrer),
    secret: process.env.LEAD_WEBHOOK_SECRET ?? "",
  };

  // The two fields the form marks required. Anything without them is a bot or
  // a broken request, and is not worth a row.
  if (!lead.name || !lead.phone) return ok();

  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      // Apps Script redirects to script.googleusercontent.com to serve the
      // actual response. Without following it, every write looks like a 302.
      redirect: "follow",
      // A hanging Google must not hold a serverless function open.
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    // Swallowed on purpose — see the note at the top of the file.
  }

  return ok();
}

/**
 * Diagnostics. Answers the question the POST path deliberately cannot: when a
 * row does not appear in the sheet, WHERE did it stop?
 *
 * The POST handler swallows every failure on purpose — a broken sheet must
 * never surface in front of someone making an enquiry — which is exactly what
 * makes it undebuggable. This does the same round trip and reports what Google
 * actually said.
 *
 * Gated on the shared secret, sent as a header rather than a query parameter
 * so it does not end up in access logs or browser history. A wrong or missing
 * header returns 404, so the endpoint is invisible to anyone probing for it.
 *
 * Never returns the webhook URL or the secret — only the host, the shape of
 * the URL, and Google's own response, none of which are sensitive.
 */
export async function GET(request: Request) {
  const secret = process.env.LEAD_WEBHOOK_SECRET ?? "";
  const supplied = request.headers.get("x-diagnose") ?? "";

  if (!secret || supplied !== secret) {
    return new Response("Not found", { status: 404 });
  }

  const endpoint = process.env.GOOGLE_SHEET_WEBHOOK_URL ?? "";

  const report: Record<string, unknown> = {
    urlConfigured: Boolean(endpoint),
    secretConfigured: Boolean(secret),
    secretLength: secret.length,
  };

  if (!endpoint) {
    report.verdict = "GOOGLE_SHEET_WEBHOOK_URL is not set on this deployment.";
    return Response.json(report);
  }

  try {
    const parsed = new URL(endpoint);
    report.urlHost = parsed.host;
    report.urlEndsWithExec = parsed.pathname.endsWith("/exec");
    report.urlPathTail = parsed.pathname.slice(-6);
  } catch {
    report.verdict = "GOOGLE_SHEET_WEBHOOK_URL is not a valid URL.";
    return Response.json(report);
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        name: "DIAGNOSTIC - safe to delete",
        phone: "+000",
        email: "",
        interest: "diagnostic",
        budget: "diagnostic",
        message: "Written by GET /api/lead. Delete this row.",
        page: "/api/lead",
        referrer: "diagnostic",
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    const text = await res.text();

    report.googleStatus = res.status;
    report.googleContentType = res.headers.get("content-type");
    report.googleBody = text.slice(0, 400);

    if (res.status === 200 && text.indexOf('"ok":true') >= 0) {
      report.verdict = "WORKING. A diagnostic row was written - delete it.";
    } else if (text.indexOf("bad secret") >= 0) {
      report.verdict =
        "SECRET MISMATCH. Vercel and the Apps Script SECRET differ.";
    } else if ((report.googleContentType || "").toString().indexOf("html") >= 0) {
      report.verdict =
        "GOOGLE RETURNED A LOGIN PAGE. Redeploy the web app with 'Who has access' = Anyone.";
    } else {
      report.verdict = "Unexpected reply - read googleBody below.";
    }
  } catch (err) {
    report.verdict = "Could not reach the Apps Script URL at all.";
    report.error = String(err);
  }

  return Response.json(report);
}
