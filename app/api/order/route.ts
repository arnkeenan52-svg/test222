import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/lib/products";
import { DISCOUNT_CODE, DISCOUNT_PCT } from "@/lib/newsletter";

// Returns safe, display-only details for a completed order, looked up from the
// PaymentIntent id that Stripe appends to the success return_url.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SHIP_LABEL: Record<string, string> = { standard: "Standard shipping", express: "Express shipping" };
const SHIP_ETA: Record<string, string> = { standard: "7–10 business days", express: "2–3 business days" };
const SHIP_CENTS: Record<string, number> = { standard: 0, express: 1200 };

export async function GET(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 500 });

  const pi = new URL(req.url).searchParams.get("pi") || "";
  if (!/^pi_/.test(pi)) return NextResponse.json({ ok: false, error: "missing" }, { status: 400 });

  const stripe = new Stripe(secret);
  try {
    const intent = await stripe.paymentIntents.retrieve(pi, { expand: ["latest_charge"] });
    const charge = intent.latest_charge as Stripe.Charge | null;
    const card = charge?.payment_method_details?.card;
    const shipping = intent.shipping;
    const shippingId = (intent.metadata?.shipping as string) || "standard";
    const codeOk = !!intent.metadata?.discount_code;

    const productCents = Math.round(PRODUCTS.single.usd * 100);
    const discountCents = codeOk ? Math.round((productCents * DISCOUNT_PCT) / 100) : 0;

    return NextResponse.json({
      ok: true,
      status: intent.status,
      orderNo: intent.id.slice(-8).toUpperCase(),
      email: intent.receipt_email || charge?.billing_details?.email || "",
      name: shipping?.name || charge?.billing_details?.name || "",
      address: shipping?.address
        ? {
            line1: shipping.address.line1 || "",
            line2: shipping.address.line2 || "",
            city: shipping.address.city || "",
            state: shipping.address.state || "",
            postal: shipping.address.postal_code || "",
            country: shipping.address.country || "",
          }
        : null,
      shippingMethod: SHIP_LABEL[shippingId] || "Standard shipping",
      shippingEta: SHIP_ETA[shippingId] || SHIP_ETA.standard,
      paymentBrand: card?.brand ? card.brand.charAt(0).toUpperCase() + card.brand.slice(1) : "",
      paymentLast4: card?.last4 || "",
      productTitle: PRODUCTS.single.title,
      productSub: PRODUCTS.single.sub,
      productCents,
      discountCents,
      discountCode: codeOk ? DISCOUNT_CODE : "",
      shippingCents: SHIP_CENTS[shippingId] ?? 0,
      totalCents: intent.amount,
      currency: (intent.currency || "usd").toUpperCase(),
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "error" }, { status: 500 });
  }
}
