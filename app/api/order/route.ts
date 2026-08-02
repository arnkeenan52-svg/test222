import { NextRequest, NextResponse } from "next/server";
import { stripeClient, orderFromIntent, maybeSendConfirmation } from "@/lib/order";

// Returns safe, display-only details for a completed order, looked up from the
// PaymentIntent id that Stripe appends to the success return_url. It also fires
// the confirmation email on first load (idempotent — see maybeSendConfirmation),
// so a working Stripe webhook is a reliability bonus, not a requirement.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const stripe = stripeClient();
  if (!stripe) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 500 });

  const pi = new URL(req.url).searchParams.get("pi") || "";
  if (!/^pi_/.test(pi)) return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });

  try {
    const intent = await stripe.paymentIntents.retrieve(pi, { expand: ["latest_charge"] });
    const order = orderFromIntent(intent);

    // Send the confirmation email (once). Awaited so the serverless function
    // doesn't get frozen before Resend receives the request.
    await maybeSendConfirmation(stripe, intent).catch(() => {});

    return NextResponse.json({ ok: true, ...order });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "error" }, { status: 500 });
  }
}
