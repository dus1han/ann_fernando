/**
 * Sends each enquiry from the contact form to Telegram.
 *
 * WHY TELEGRAM RATHER THAN EMAIL
 * It is a plain HTTPS call to an API that either succeeds or returns a clear
 * error. There is no deliverability, no spam folder, no domain verification
 * and no sending reputation to maintain — the things that make email from a
 * small site unreliable. It also arrives as a phone notification, which is
 * what you want for a lead.
 *
 * WHY A SERVER ROUTE AND NOT THE BROWSER
 * The bot token must never reach the client. Anything in the browser bundle is
 * readable by every visitor, and that token lets anyone post as the bot.
 *
 * This route always answers 204, whatever happens downstream. The client is
 * not waiting for the response — it has already handed the person to WhatsApp
 * — so there is nothing useful to report, and a failing notification must
 * never surface as an error in front of someone making an enquiry.
 */

const API = "https://api.telegram.org/bot";

/** Longest value accepted per field. Beyond this it is abuse, not an enquiry. */
const MAX_FIELD = 900;

/** Telegram rejects messages over 4096 characters. */
const MAX_MESSAGE = 3900;

const clean = (v: unknown) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, MAX_FIELD) : "";

/** Telegram's HTML mode needs exactly these three escaped, and no others. */
const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ok = () => new Response(null, { status: 204 });

export type Lead = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  budget: string;
  message: string;
  page: string;
  referrer: string;
};

/**
 * Builds the notification. Exported so its output can be checked directly,
 * without a network call or a bot token.
 */
export function buildMessage(lead: Lead): string {
  const lines = [
    "<b>New enquiry</b>",
    esc(lead.name) + " · " + esc(lead.interest),
    "",
    "<b>Phone:</b> " + esc(lead.phone),
    "<b>Email:</b> " + esc(lead.email || "not given"),
    "<b>Budget:</b> " + esc(lead.budget),
  ];

  if (lead.message) {
    lines.push("", "<b>Message</b>", esc(lead.message));
  }

  lines.push(
    "",
    "<i>Page: " + esc(lead.page || "/") + "</i>",
    "<i>From: " + esc(lead.referrer || "direct") + "</i>"
  );

  // Tapping this opens WhatsApp straight into a chat with them.
  const digits = lead.phone.replace(/[^0-9]/g, "");
  if (digits) {
    lines.push("", '<a href="https://wa.me/' + digits + '">Reply on WhatsApp</a>');
  }

  return lines.join("\n").slice(0, MAX_MESSAGE);
}

async function send(token: string, chatId: string, text: string) {
  return fetch(API + token + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(8000),
  });
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Not configured is a normal state, not a fault: local runs and any deploy
  // without these simply skip the notification. The form still works.
  if (!token || !chatId) return ok();

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
  // a broken request, and is not worth a notification.
  if (!lead.name || !lead.phone) return ok();

  try {
    await send(token, chatId, buildMessage(lead));
  } catch {
    // Swallowed on purpose — see the note at the top of the file.
  }

  return ok();
}

/**
 * Diagnostics, and the setup helper for the fiddliest step.
 *
 * A Telegram bot cannot message you first — you have to message it, which is
 * what creates the chat and gives it an id. Finding that id normally means
 * hand-calling getUpdates and reading raw JSON. Instead, when the token is set
 * and the chat id is not, this reports every chat that has messaged the bot,
 * so the id can simply be copied.
 *
 * Gated on the bot token, sent as a header rather than a query parameter so it
 * stays out of access logs and browser history. Never returns the token.
 */
export async function GET(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN ?? "";
  const chatId = process.env.TELEGRAM_CHAT_ID ?? "";
  const authorised =
    token.length > 0 && request.headers.get("x-diagnose") === token;

  const report: Record<string, unknown> = {
    TELEGRAM_BOT_TOKEN: token ? "set" : "MISSING",
    TELEGRAM_CHAT_ID: chatId ? "set" : "MISSING",
  };

  if (!token) {
    report.verdict =
      "TELEGRAM_BOT_TOKEN is not set. Get one from @BotFather, add it in " +
      "Vercel and redeploy.";
    return Response.json(report);
  }

  if (!authorised) {
    report.verdict = chatId
      ? "Both variables are set. Send the x-diagnose header with the bot token to post a test message."
      : "Token is set but TELEGRAM_CHAT_ID is missing. Message your bot in Telegram, then send the x-diagnose header with the bot token to discover the chat id.";
    return Response.json(report);
  }

  // --- no chat id yet: find it ---
  if (!chatId) {
    try {
      const res = await fetch(API + token + "/getUpdates", {
        signal: AbortSignal.timeout(8000),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        description?: string;
        result?: Array<{
          message?: {
            chat?: {
              id?: number;
              type?: string;
              first_name?: string;
              title?: string;
            };
          };
        }>;
      };

      if (!data.ok) {
        report.verdict = "TOKEN REJECTED by Telegram.";
        report.telegramError = data.description;
        return Response.json(report);
      }

      const chats = new Map<number, string>();
      for (const u of data.result ?? []) {
        const c = u.message?.chat;
        if (c?.id != null) {
          chats.set(c.id, (c.title || c.first_name || c.type) ?? "unknown");
        }
      }

      if (chats.size === 0) {
        report.verdict =
          "Token works, but nobody has messaged the bot yet. Open Telegram, " +
          "find your bot, press Start, then run this again.";
        return Response.json(report);
      }

      report.foundChats = Array.from(chats, ([id, who]) => ({
        id: String(id),
        who,
      }));
      report.verdict =
        "Token works. Set TELEGRAM_CHAT_ID to the id below and redeploy.";
      return Response.json(report);
    } catch (err) {
      report.verdict = "Could not reach the Telegram API.";
      report.error = String(err);
      return Response.json(report);
    }
  }

  // --- fully configured: post a real test message ---
  try {
    const res = await send(
      token,
      chatId,
      buildMessage({
        name: "DIAGNOSTIC",
        phone: "+971500000000",
        email: "",
        interest: "test",
        budget: "test",
        message: "Test from GET /api/lead. If you can read this, it works.",
        page: "/api/lead",
        referrer: "diagnostic",
      })
    );

    const data = (await res.json()) as { ok?: boolean; description?: string };
    report.telegramStatus = res.status;

    if (data.ok) {
      report.verdict = "WORKING. A test message was sent to your Telegram.";
    } else {
      report.telegramError = data.description;
      if ((data.description ?? "").indexOf("chat not found") >= 0) {
        report.verdict =
          "CHAT NOT FOUND. The id is wrong, or you have not pressed Start on the bot.";
      } else if (res.status === 401) {
        report.verdict = "TOKEN REJECTED. The bot token is wrong or revoked.";
      } else {
        report.verdict = "Telegram refused it - read telegramError.";
      }
    }
  } catch (err) {
    report.verdict = "Could not reach the Telegram API.";
    report.error = String(err);
  }

  return Response.json(report);
}
