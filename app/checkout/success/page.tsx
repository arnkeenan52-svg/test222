"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type Order = {
  status: string;
  orderNo: string;
  email: string;
  name: string;
  address: { line1: string; line2: string; city: string; state: string; postal: string; country: string } | null;
  shippingMethod: string;
  shippingEta: string;
  paymentBrand: string;
  paymentLast4: string;
  productTitle: string;
  productSub: string;
  productCents: number;
  discountCents: number;
  discountCode: string;
  shippingCents: number;
  totalCents: number;
  currency: string;
};

const PRODUCT_IMG = "/assets/img/packaging.jpg";
const money = (c: number) => `$${(c / 100).toFixed(2)}`;
const LINKS: [string, string][] = [
  ["Refund policy", "/returns"],
  ["Shipping", "/shipping"],
  ["Privacy policy", "/privacy"],
  ["Terms of service", "/terms"],
  ["Contact", "/contact"],
];

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const pi = new URLSearchParams(window.location.search).get("payment_intent");
    if (!pi) {
      setLoaded(true);
      return;
    }
    fetch(`/api/order?pi=${encodeURIComponent(pi)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setOrder(d);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const firstName = order?.name?.trim().split(" ")[0] || "";

  return (
    <div className="min-h-screen bg-white text-ink">
      <header className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1000px] px-5 py-4">
          <a href="/" aria-label="FadeClipper home">
            <img src="/assets/img/fadeclipper-stripe-logo.png" alt="FadeClipper" width={123} height={24} className="h-6 w-auto" />
          </a>
        </div>
      </header>

      {!loaded ? (
        <div className="mx-auto max-w-[1000px] px-5 py-24 text-center text-muted" role="status" aria-live="polite">
          Loading your order…
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1000px] md:grid-cols-[1.05fr_0.95fr]">
          {/* details */}
          <main className="order-2 px-5 py-10 md:order-1 md:py-14 md:pr-14">
            <div className="mx-auto max-w-[520px]">
              {order?.orderNo && (
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-muted">Order #{order.orderNo}</p>
              )}
              <div className="mt-2 flex items-center gap-2.5">
                <span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#1b8a4e] text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <h1 className="font-display text-[clamp(1.5rem,3.4vw,2rem)] font-bold tracking-[-0.01em]">
                  Thank you{firstName ? `, ${firstName}` : ""}!
                </h1>
              </div>

              <p className="mt-3 text-[1rem] leading-relaxed text-ink-2">
                Your order is confirmed
                {order?.email ? (
                  <> — a confirmation email is on its way to <span className="font-medium text-ink">{order.email}</span></>
                ) : null}
                . We&rsquo;ll email your tracking number as soon as it ships.
              </p>

              {order && (
                <div className="mt-8 overflow-hidden rounded-2xl border border-line">
                  <div className="border-b border-line bg-[#fafafa] px-6 py-3.5">
                    <h2 className="font-display text-[0.98rem] font-bold">Order details</h2>
                  </div>
                  <dl className="divide-y divide-line">
                    <div className="grid gap-6 px-6 py-5 sm:grid-cols-2">
                      {order.email && <Field label="Contact">{order.email}</Field>}
                      <Field label="Payment">
                        {order.paymentBrand && order.paymentLast4
                          ? `${order.paymentBrand} ···· ${order.paymentLast4}`
                          : "Paid securely via Stripe"}
                        <span className="mt-0.5 block text-muted">{money(order.totalCents)} {order.currency}</span>
                      </Field>
                    </div>
                    {order.address && (
                      <div className="grid gap-6 px-6 py-5 sm:grid-cols-2">
                        <Field label="Shipping address">
                          {order.name && (
                            <>
                              {order.name}
                              <br />
                            </>
                          )}
                          {order.address.line1}
                          {order.address.line2 ? `, ${order.address.line2}` : ""}
                          <br />
                          {[order.address.postal, order.address.city].filter(Boolean).join(" ")}
                          {order.address.state ? `, ${order.address.state}` : ""}
                          <br />
                          {order.address.country}
                        </Field>
                        <Field label="Billing address">Same as shipping address</Field>
                      </div>
                    )}
                    <div className="px-6 py-5">
                      <Field label="Shipping method">
                        {order.shippingMethod} — arrives in about {order.shippingEta}
                      </Field>
                    </div>
                  </dl>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button asChild size="lg" className="touch-manipulation">
                  <a href="/">Continue shopping</a>
                </Button>
                <a href="/contact" className="text-[0.9rem] font-medium text-brand hover:underline">
                  Need help with your order?
                </a>
              </div>

              <nav aria-label="Policies" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-[0.8rem]">
                {LINKS.map(([label, href]) => (
                  <a key={href} href={href} className="text-muted transition-colors hover:text-ink">
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </main>

          {/* summary */}
          <aside className="order-1 border-b border-line bg-[#fafafa] px-5 py-8 md:order-2 md:border-b-0 md:border-l md:py-14 md:pl-12">
            <div className="sticky top-8 mx-auto max-w-[400px]">
              <h2 className="sr-only">Order summary</h2>
              <div className="flex items-center gap-4">
                <span className="relative shrink-0">
                  <img src={PRODUCT_IMG} alt={order?.productTitle ?? "FadeClipper"} width={64} height={64} className="h-16 w-16 rounded-xl border border-line object-cover" />
                  <span aria-hidden="true" className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink text-[0.72rem] font-bold text-white">1</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-tight">{order?.productTitle ?? "FadeClipper"}</p>
                  <p className="truncate text-[0.82rem] text-muted">{order?.productSub ?? "Auto-fading cordless hair clipper"}</p>
                </div>
                <span className="font-semibold tabular-nums">{money(order?.productCents ?? 5900)}</span>
              </div>

              <div className="mt-5 space-y-2 border-t border-line pt-4 text-[0.92rem]">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{money(order?.productCents ?? 5900)}</span>
                </div>
                {order && order.discountCents > 0 && (
                  <div className="flex justify-between text-[#1b8a4e]">
                    <span>Discount{order.discountCode ? ` · ${order.discountCode}` : ""}</span>
                    <span className="tabular-nums">&minus;{money(order.discountCents)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted">
                  <span>Shipping{order ? ` · ${order.shippingMethod}` : ""}</span>
                  <span className={`tabular-nums ${(order?.shippingCents ?? 0) === 0 ? "text-[#1b8a4e]" : ""}`}>
                    {(order?.shippingCents ?? 0) === 0 ? "Free" : money(order!.shippingCents)}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-line pt-3">
                  <span className="font-display text-[1.05rem] font-bold">Total</span>
                  <span>
                    <span className="mr-1.5 text-[0.72rem] text-muted">{order?.currency ?? "USD"}</span>
                    <span className="font-display text-[1.25rem] font-bold tabular-nums">{money(order?.totalCents ?? 5900)}</span>
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-muted">{label}</dt>
      <dd className="mt-1 text-[0.92rem] leading-relaxed text-ink">{children}</dd>
    </div>
  );
}
