import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// One-time helper: registers this site's domain with Apple Pay via your Stripe
// account, so Apple Pay can be presented in the checkout. Visit it once on the
// live site (e.g. https://www.fadeclipper.com/api/register-apple-pay). You can
// also pass ?domain=example.com to register a specific host. Safe to delete
// after Apple Pay is confirmed working.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "STRIPE_SECRET_KEY is not set in this project." }, { status: 500 });
  }
  const stripe = new Stripe(secret);
  const url = new URL(req.url);
  const domain = (url.searchParams.get("domain") || req.headers.get("host") || url.host)
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
