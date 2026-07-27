import { NextRequest, NextResponse } from "next/server";
import { DISCOUNT_CODE } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// Adds the subscriber to your email list, then returns the 10% welcome code.
// Storage is pluggable — set ONE of these in your environment:
//   • Mailchimp:  MAILCHIMP_API_KEY (e.g. abc123-us21) + MAILCHIMP_AUDIENCE_ID
//   • Any webhook: NEWSLETTER_WEBHOOK_URL (Google Sheet / Zapier / Make / your ESP)
export async function POST(req: NextRequest) {
  let email = "";
  try {
    const body = await req.json();
    email = String(body?.email || "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  let stored = false;

  // 1) Mailchimp audience
  const mcKey = process.env.MAILCHIMP_API_KEY;
  const mcAud = process.env.MAILCHIMP_AUDIENCE_ID;
  if (mcKey && mcAud && mcKey.includes("-")) {
    const dc = mcKey.split("-")[1];
    try {
      const r = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${mcAud}/members`, {
        method: "POST",
        headers: { Authorization: `Bearer ${mcKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email_address: email, status: "subscribed", tags: ["fadeclipper"] }),
      });
      if (r.ok) stored = true;
      else {
        const j = await r.json().catch(() => ({} as any));
        if (j?.title === "Member Exists") stored = true; // already subscribed → still fine
      }
    } catch {}
  }

  // 2) Generic webhook (Google Sheet / Zapier / Make / any ESP inbound)
  const hook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!stored && hook) {
    try {
      const r = await fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "fadeclipper", subscribedAt: new Date().toISOString() }),
      });
      if (r.ok) stored = true;
    } catch {}
  }

  // Even if storage isn't configured yet, hand back the code so the UX works.
  return NextResponse.json({ ok: true, stored, code: DISCOUNT_CODE });
}
