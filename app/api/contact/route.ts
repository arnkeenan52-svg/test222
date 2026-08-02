import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/email/resend";
import { renderContactNotification, renderContactAck } from "@/lib/email/contact";
import { rateLimit, clientIp } from "@/lib/rateLimit";

// Contact form -> Resend -> the store owner's inbox. Configure in Vercel:
//   CONTACT_TO    (optional) destination, default arnkeenan@gmail.com
//   CONTACT_FROM  (optional) sender, default "FadeClipper <contact@fadeclipper.com>"
//   (CONTACT_FROM's domain must be verified in Resend to send in production.)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTACT_TO = process.env.CONTACT_TO || "arnkeenan@gmail.com";
const CONTACT_FROM = process.env.CONTACT_FROM || "FadeClipper <contact@fadeclipper.com>";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clip = (s: unknown, n: number) => String(s ?? "").trim().slice(0, n);

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real users never fill this hidden field. Silently accept bots.
  if (clip(body.company, 100)) return NextResponse.json({ ok: true });

  // Rate-limit per IP: this endpoint sends mail (including to an address the
  // caller supplies), so without a cap it's a spam / domain-reputation vector.
  const rl = await rateLimit(`contact:${clientIp(req)}`, 5, 3600);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "You've sent several messages already. Please try again a little later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  const name = clip(body.name, 120);
  const email = clip(body.email, 200);
  const orderNo = clip(body.orderNo, 40);
  const message = clip(body.message, 5000);

  if (!isEmail(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  if (message.length < 5) return NextResponse.json({ ok: false, error: "Please add a short message." }, { status: 400 });

  const input = { name, email, orderNo, message };

  // 1) Notify the owner (reply-to the customer, so a Gmail reply reaches them).
  const notify = renderContactNotification(input);
  const sent = await sendMail({
    to: CONTACT_TO,
    from: CONTACT_FROM,
    replyTo: email,
    subject: notify.subject,
    html: notify.html,
    text: notify.text,
  });
  if (!sent.ok) {
    return NextResponse.json({ ok: false, error: "Couldn’t send your message. Please email us directly." }, { status: 502 });
  }

  // 2) Acknowledge the customer (best-effort — never fail the request on this).
  const ack = renderContactAck(input);
  await sendMail({ to: email, from: CONTACT_FROM, subject: ack.subject, html: ack.html, text: ack.text }).catch(() => {});

  return NextResponse.json({ ok: true });
}
