import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripeClient, orderFromIntent } from "@/lib/order";
import { isAuthed, unauthorized, codeMatches } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DAY = 86400;

// GET ?id=pi_xxx  → full order detail
// GET ?q=text     → search recent orders by ref / name / email / city
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  const stripe = stripeClient();
  if (!stripe) return NextResponse.json({ ok: false, error: "Stripe not configured" }, { status: 500 });

  const sp = new URL(req.url).searchParams;
  const id = sp.get("id");
  const q = (sp.get("q") || "").trim().toLowerCase();

  try {
    if (id) {
      const intent = await stripe.paymentIntents.retrieve(id, { expand: ["latest_charge"] });
      const o = orderFromIntent(intent);
      const charge = intent.latest_charge as Stripe.Charge | null;
      const refundedAmt = charge?.amount_refunded || 0;
      return NextResponse.json({
        ok: true,
        ref: o.orderNo,
        date: new Date(intent.created * 1000).toISOString(),
        customer: {
          name: o.name,
          email: o.email,
          phone: intent.shipping?.phone || charge?.billing_details?.phone || "",
        },
        address: o.address
          ? { line1: o.address.line1, line2: o.address.line2, city: o.address.city, state: o.address.state, postalCode: o.address.postal, country: o.address.country }
          : null,
        items: [{ name: o.productTitle, qty: o.quantity, lineTotal: o.productCents / 100, image: "/assets/img/packaging.jpg" }],
        shipping: { name: o.shippingMethod, amount: o.shippingCents / 100 },
        subtotal: o.productCents / 100,
        discount: o.discountCents / 100,
        total: o.totalCents / 100,
        paymentStatus: intent.status === "succeeded" ? "paid" : intent.status,
        card: o.paymentBrand ? { brand: o.paymentBrand, last4: o.paymentLast4 } : null,
        refunded: !!charge?.refunded || refundedAmt >= intent.amount,
        amountRefunded: refundedAmt / 100,
        fulfilled: intent.metadata?.fulfilled === "true",
        currency: (intent.currency || "usd").toUpperCase(),
      });
    }

    if (q) {
      // Search the last ~90 days of orders (bounded), filter client-side.
      const gte = Math.floor(Date.now() / 1000) - 90 * DAY;
      const out: any[] = [];
      let starting_after: string | undefined;
      let truncated = false;
      for (let page = 0; page < 3; page++) {
        const res = await stripe.paymentIntents.list({ created: { gte }, limit: 100, expand: ["data.latest_charge"], ...(starting_after ? { starting_after } : {}) });
        for (const pi of res.data) {
          if (pi.status !== "succeeded") continue;
          const charge = pi.latest_charge as Stripe.Charge | null;
          const name = pi.shipping?.name || charge?.billing_details?.name || "";
          const email = pi.receipt_email || charge?.billing_details?.email || "";
          const city = pi.shipping?.address?.city || "";
          const ref = pi.id.slice(-8).toUpperCase();
          const hay = `${ref} ${name} ${email} ${city}`.toLowerCase();
          if (!hay.includes(q)) continue;
          out.push({
            id: pi.id, ref, customerName: name || "—", email, city,
            country: pi.shipping?.address?.country || "",
            amount: (pi.amount - (charge?.amount_refunded || 0)) / 100,
            date: new Date(pi.created * 1000).toISOString(),
            itemCount: Math.max(1, parseInt(pi.metadata?.quantity || "1", 10) || 1),
            delivery: (pi.metadata?.shipping as string) || "standard",
            refunded: !!charge?.refunded, paymentStatus: "paid",
            fulfilled: pi.metadata?.fulfilled === "true",
          });
        }
        if (res.has_more && res.data.length) { starting_after = res.data[res.data.length - 1].id; if (page === 2) truncated = true; }
        else break;
      }
      return NextResponse.json({ ok: true, orders: out, truncated });
    }

    return NextResponse.json({ ok: false, error: "missing id or q" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Stripe error" }, { status: 500 });
  }
}

// POST { id, code, amount? } → refund (full remaining, or partial in dollars).
// The access code is re-verified server-side for every refund.
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  const stripe = stripeClient();
  if (!stripe) return NextResponse.json({ ok: false, error: "Stripe not configured" }, { status: 500 });

  let body: { id?: string; action?: string; code?: string; amount?: number; fulfilled?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  if (!body.id || !/^pi_/.test(body.id)) return NextResponse.json({ ok: false, error: "Invalid order" }, { status: 400 });

  // Fulfillment toggle — just needs a valid admin session (no refund code).
  // Stripe merges individual metadata keys, so this preserves product/quantity/etc.
  if (body.action === "fulfill") {
    try {
      await stripe.paymentIntents.update(body.id, { metadata: { fulfilled: body.fulfilled ? "true" : "" } });
      return NextResponse.json({ ok: true, fulfilled: !!body.fulfilled });
    } catch (err: any) {
      return NextResponse.json({ ok: false, error: err?.message || "Could not update" }, { status: 500 });
    }
  }

  // Refunds require the access code, re-verified here.
  if (!codeMatches(body.code || "")) return NextResponse.json({ ok: false, error: "Wrong code" }, { status: 403 });

  try {
    const refundParams: Stripe.RefundCreateParams = { payment_intent: body.id };
    if (body.amount != null) {
      const cents = Math.round(Number(body.amount) * 100);
      if (!Number.isFinite(cents) || cents <= 0) return NextResponse.json({ ok: false, error: "Invalid amount" }, { status: 400 });
      refundParams.amount = cents;
    }
    const refund = await stripe.refunds.create(refundParams);
    return NextResponse.json({ ok: true, refundId: refund.id, status: refund.status });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Refund failed" }, { status: 500 });
  }
}
