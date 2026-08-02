import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/lib/products";
import { DISCOUNT_CODE, DISCOUNT_PCT } from "@/lib/discount";

// Server-only. Needs STRIPE_SECRET_KEY in the environment.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type ShippingId = "standard" | "express";

export const SHIPPING: Record<ShippingId, { label: string; cents: number; eta: string }> = {
  standard: { label: "Standard shipping", cents: 0, eta: "7–10 business days" },
  express: { label: "Express shipping", cents: 1200, eta: "2–3 business days" },
};

// Amount breakdown in USD cents, computed server-side (never trust the client).
function quote(shipping: ShippingId, code: string | null, qty: number) {
  const quantity = Math.min(10, Math.max(1, Math.floor(qty) || 1));
  const unitCents = Math.round(PRODUCTS.single.usd * 100);
  const productCents = unitCents * quantity;
  const ship = SHIPPING[shipping] ?? SHIPPING.standard;
  const codeOk = !!code && code.trim().toUpperCase() === DISCOUNT_CODE.toUpperCase();
  const discountCents = codeOk ? Math.round((productCents * DISCOUNT_PCT) / 100) : 0;
  const total = Math.max(0, productCents - discountCents) + ship.cents;
  return { productCents, unitCents, quantity, shippingCents: ship.cents, discountCents, total, codeOk };
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY to your environment variables." },
      { status: 500 }
    );
  }
  const stripe = new Stripe(secret);

  let body: { paymentIntentId?: string; shipping?: ShippingId; code?: string | null; qty?: number } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const shipping: ShippingId = body.shipping === "express" ? "express" : "standard";
  const code = body.code ?? null;
  const q = quote(shipping, code, body.qty ?? 1);

  const metadata = {
    product: PRODUCTS.single.title,
    quantity: String(q.quantity),
    shipping,
    discount_code: q.codeOk ? DISCOUNT_CODE : "",
  };

  try {
    // Recompute an existing intent (shipping / discount changed) — keeps the same clientSecret.
    if (body.paymentIntentId) {
      const pi = await stripe.paymentIntents.update(body.paymentIntentId, { amount: q.total, metadata });
      return NextResponse.json({ clientSecret: pi.client_secret, paymentIntentId: pi.id, ...q });
    }

    const pi = await stripe.paymentIntents.create({
      amount: q.total,
      currency: "usd",
      // Includes every method enabled in the Stripe Dashboard — card plus the
      // Apple Pay / Google Pay / Amazon Pay express wallets. Only activated methods
      // are included (so this never errors), and Link is controlled in the Dashboard
      // (the Express element also hides its Link button on the client).
      automatic_payment_methods: { enabled: true },
      description: PRODUCTS.single.title,
      metadata,
    });
    return NextResponse.json({ clientSecret: pi.client_secret, paymentIntentId: pi.id, ...q });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Could not start checkout." }, { status: 500 });
  }
}
