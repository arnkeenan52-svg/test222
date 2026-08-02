import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { isAuthed, unauthorized } from "@/lib/adminAuth";

// One-time helper: registers this site's own domain with Apple Pay via your
// Stripe account, so Apple Pay can be presented in the checkout. ADMIN-ONLY — it
// mutates your Stripe account state, so it requires a valid admin session. Sign
// in at /admin first, then visit this endpoint.
//
// The domain is derived from the configured site URL (or the request host) and
// is NOT taken from a query parameter: as a GET with a SameSite=Lax session
// cookie, an attacker-supplied ?domain= could otherwise be triggered via CSRF to
// register a domain they control. We only ever (re)register our own host.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Never let anonymous callers register domains under our account.
  if (!isAuthed(req)) return unauthorized();

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY is not set in this project." }, { status: 500 });
  }
  const stripe = new Stripe(secret);
  const url = new URL(req.url);
  const configuredHost = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const domain = (configuredHost || req.headers.get("host") || url.host)
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "");

  try {
    const existing = await stripe.applePayDomains.list({ limit: 100 });
    const already = existing.data.find((d) => d.domain_name === domain);
    if (already) {
      return NextResponse.json({ status: "already-registered", domain, id: already.id });
    }
    const created = await stripe.applePayDomains.create({ domain_name: domain });
    return NextResponse.json({ status: "registered", domain, id: created.id });
  } catch (err: any) {
    return NextResponse.json({ status: "error", domain, error: err?.message || String(err) }, { status: 500 });
  }
}
