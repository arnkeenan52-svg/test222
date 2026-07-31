import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS, type ProductId } from "@/lib/products";

// Server-only. Needs STRIPE_SECRET_KEY set in the environment (Vercel → Settings → Environment Variables).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingItem = { id: ProductId; qty: number };

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY to your environment variables." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret);

  let items: IncomingItem[] = [];
  try {
    const body = await req.json();
    items = Array.isArray(body?.items) ? body.items : [];
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const origin = req.headers.get("origin") || new URL(req.url).origin;

  // Build line items from server-side prices (never trust amounts from the client).
  const line_items = items
    .filter((it) => it && PRODUCTS[it.id] && Number(it.qty) > 0)
    .map((it) => {
      const p = PRODUCTS[it.id];
      return {
        quantity: Math.min(Math.max(Math.floor(Number(it.qty)), 1), 20),
        price_data: {
          currency: "usd",
          unit_amount: Math.round(p.usd * 100),
          // Product image shows on Stripe's hosted checkout for a branded, on-brand look.
          product_data: { name: p.title, description: p.sub, images: [`${origin}/assets/img/packaging.jpg`] },
        },
      };
    });

  if (line_items.length === 0) {
    return NextResponse.json({ error: "No item selected." }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      // Standard free shipping, estimated 10 days.
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "DK", "SE", "NO", "DE", "FR", "NL", "IE", "AU"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 7 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      submit_type: "pay",
      custom_text: {
        shipping_address: { message: "Free worldwide shipping — your FadeClipper arrives in about 7–10 business days." },
        submit: { message: "Backed by our 14-day money-back guarantee." },
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/product`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Could not start checkout." }, { status: 500 });
  }
}
