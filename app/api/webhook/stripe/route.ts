import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripeClient, maybeSendConfirmation } from "@/lib/order";

// Stripe webhook — the reliable trigger for the order-confirmation email.
// Stripe calls this the moment a payment truly succeeds (even if the customer
// closed the tab), so the email goes out regardless of the browser.
//
// Setup (one time): Stripe Dashboard → Developers → Webhooks → Add endpoint
//   URL:    https://fadeclipper.com/api/webhook/stripe
//   Events: payment_intent.succeeded
// Then copy the "Signing secret" into STRIPE_WEBHOOK_SECRET in Vercel.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const stripe = stripeClient();
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !whSecret) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature") || "";
  const raw = await req.text(); // raw body is required for signature verification

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `signature verification failed: ${err?.message}` }, { status: 400 });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      const pi = event.data.object as Stripe.PaymentIntent;
      // Re-retrieve with the charge expanded so the email can show card + shipping.
      const intent = await stripe.paymentIntents.retrieve(pi.id, { expand: ["latest_charge"] });
      await maybeSendConfirmation(stripe, intent);
    }
  } catch {
    // Swallow errors so Stripe doesn't hammer retries for a transient email hiccup;
    // the success-page load is a second chance to send.
  }

  return NextResponse.json({ received: true });
}
