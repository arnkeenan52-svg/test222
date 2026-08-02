import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripeClient } from "@/lib/order";
import { isAuthed, unauthorized } from "@/lib/adminAuth";
import { PRODUCTS } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DAY = 86400;
const MAX_PAGES = 3; // up to ~300 orders per range (bounds Stripe cost)

type Row = {
  id: string;
  ref: string;
  customerName: string;
  email: string;
  city: string;
  country: string;
  amount: number; // net dollars (captured − refunded)
  date: string;
  itemCount: number;
  delivery: string; // standard | express
  refunded: boolean;
  paymentStatus: string;
};

function rangeFromQuery(sp: URLSearchParams): { gte: number; lte: number; label: string } {
  const now = Math.floor(Date.now() / 1000);
  const from = sp.get("from");
  const to = sp.get("to");
  if (from) {
    const gte = Math.floor(new Date(from + "T00:00:00").getTime() / 1000);
    const lte = to ? Math.floor(new Date(to + "T23:59:59").getTime() / 1000) : gte + DAY - 1;
    const label = to && to !== from ? `${from} → ${to}` : from;
    return { gte, lte, label };
  }
  const days = Math.min(365, Math.max(1, parseInt(sp.get("days") || "7", 10) || 7));
  return { gte: now - days * DAY, lte: now, label: days === 1 ? "Today" : `${days} days` };
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  const stripe = stripeClient();
  if (!stripe) return NextResponse.json({ ok: false, error: "Stripe not configured" }, { status: 500 });

  const sp = new URL(req.url).searchParams;
  const { gte, lte, label } = rangeFromQuery(sp);

  // Pull succeeded payment intents in the window, newest first.
  const rows: Row[] = [];
  let truncated = false;
  try {
    let starting_after: string | undefined;
    for (let page = 0; page < MAX_PAGES; page++) {
      const res = await stripe.paymentIntents.list({
        created: { gte, lte },
        limit: 100,
        expand: ["data.latest_charge"],
        ...(starting_after ? { starting_after } : {}),
      });
      for (const pi of res.data) {
        if (pi.status !== "succeeded") continue;
        const charge = pi.latest_charge as Stripe.Charge | null;
        const refundedAmt = charge?.amount_refunded || 0;
        rows.push({
          id: pi.id,
          ref: pi.id.slice(-8).toUpperCase(),
          customerName: pi.shipping?.name || charge?.billing_details?.name || "—",
          email: pi.receipt_email || charge?.billing_details?.email || "",
          city: pi.shipping?.address?.city || "",
          country: pi.shipping?.address?.country || "",
          amount: (pi.amount - refundedAmt) / 100,
          date: new Date(pi.created * 1000).toISOString(),
          itemCount: Math.max(1, parseInt(pi.metadata?.quantity || "1", 10) || 1),
          delivery: (pi.metadata?.shipping as string) || "standard",
          refunded: !!charge?.refunded || refundedAmt >= pi.amount,
          paymentStatus: "paid",
        });
      }
      if (res.has_more && res.data.length) {
        starting_after = res.data[res.data.length - 1].id;
        if (page === MAX_PAGES - 1) truncated = true;
      } else break;
    }
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Stripe error" }, { status: 500 });
  }

  // Aggregates
  const totalOrders = rows.length;
  const totalRevenue = rows.reduce((s, r) => s + r.amount, 0);
  const avgOrder = totalOrders ? totalRevenue / totalOrders : 0;

  const todayStart = Math.floor(new Date(new Date().toDateString()).getTime() / 1000);
  const todays = rows.filter((r) => new Date(r.date).getTime() / 1000 >= todayStart);
  const ordersToday = todays.length;
  const revenueToday = todays.reduce((s, r) => s + r.amount, 0);

  // Top products — single product store, so units sold from quantity metadata.
  const unitsSold = rows.reduce((s, r) => s + r.itemCount, 0);
  const topProducts = unitsSold
    ? [{ name: PRODUCTS.single.title, qty: unitsSold, image: "/assets/img/packaging.jpg" }]
    : [];

  // Customer locations by city (+ country).
  const locMap = new Map<string, number>();
  for (const r of rows) {
    const loc = [r.city, r.country].filter(Boolean).join(", ") || "Unknown";
    locMap.set(loc, (locMap.get(loc) || 0) + 1);
  }
  const locations = Array.from(locMap.entries())
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  return NextResponse.json({
    ok: true,
    currency: "USD",
    rangeLabel: label,
    totalOrders,
    totalRevenue,
    avgOrder,
    ordersToday,
    revenueToday,
    orders: rows,
    topProducts,
    locations,
    truncated,
  });
}
