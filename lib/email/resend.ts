// Minimal, dependency-free Resend client (uses their REST API over fetch).
// The API key is read from the environment — never hard-coded. Set these in
// Vercel → Settings → Environment Variables:
//   RESEND_API_KEY   (required)  your Resend key, e.g. re_xxx
//   RESEND_FROM      (optional)  e.g. "FadeClipper <orders@fadeclipper.com>"
//   RESEND_REPLY_TO  (optional)  e.g. "support@fadeclipper.com"

type SendArgs = { to: string; subject: string; html: string; text?: string; from?: string; replyTo?: string };

// Falls back to Resend's shared test sender so it works before a domain is
// verified. Switch RESEND_FROM to your own verified domain for production.
const FROM = process.env.RESEND_FROM || "FadeClipper <onboarding@resend.dev>";
const REPLY_TO = process.env.RESEND_REPLY_TO || "";

export async function sendMail({ to, subject, html, text, from, replyTo }: SendArgs): Promise<{ ok: boolean; id?: string; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, error: "RESEND_API_KEY is not set" };
  if (!to) return { ok: false, error: "missing recipient" };

  const replyAddr = replyTo || REPLY_TO;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: from || FROM,
        to: [to],
        subject,
        html,
        ...(text ? { text } : {}),
        ...(replyAddr ? { reply_to: replyAddr } : {}),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: data?.message || `Resend ${res.status}` };
    return { ok: true, id: data?.id };
  } catch (err: any) {
    return { ok: false, error: err?.message || "network error" };
  }
}
