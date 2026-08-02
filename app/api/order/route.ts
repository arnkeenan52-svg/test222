import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { stripeClient, orderFromIntent, maybeSendConfirmation } from "@/lib/order";

// Returns safe, display-only details for a completed order, looked up from the
// PaymentIntent id that Stripe appends to the success return_url. It also fires
// the confirmation email on first load (idempotent — see maybeSendConfirmation),
// so a working Stripe webhook is a reliability bonus, not a requirement.
//
// The caller must present the matching client_secret (Stripe includes it in the
// same return_url). Requiring it means a leaked/guessed PaymentIntent id alone
// can't be used to read a customer's name, email and shipping address.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Constant-time string compare that never throws on length mismatch.
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export async function GET(req: NextRequest) {
  const stripe = stripeClient();
  if (!stripe) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 500 });

  const sp = new URL(req.url).searchParams;
  const pi = sp.get("pi") || "";
  const cs = sp.get("cs") || "";
  if (!/^pi_/.test(pi) || !cs) return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });

  try {
    const intent = await stripe.paymentIntents.retrieve(pi, { expand: ["latest_charge"] });
    // The client_secret is the capability that authorises reading this order.
    if (!intent.client_secret || !safeEqual(cs, intent.client_secret)) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }
    const order = orderFromIntent(intent);

    // Send the confirmation email (once). Awaited so the serverless function
    // doesn't get frozen before Resend receives the request.
    await maybeSendConfirmation(stripe, intent).catch(() => {});

    return NextResponse.json({ ok: true, ...order });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "error" }, { status: 500 });
  }
}
