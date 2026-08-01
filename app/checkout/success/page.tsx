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
        <div className="mx-auto max-w-[1100px] px-5 py-4">
          <a href="/" aria-label="FadeClipper home">
            <img src="/assets/img/fadeclipper-stripe-logo.png" alt="FadeClipper" width={123} height={24} className="h-6 w-auto" />
          </a>
        </div>
      </header>

      {!loaded ? (
        <div className="mx-auto max-w-[1100px] px-5 py-24 text-center text-muted" role="status" aria-live="polite">
          Loading your order…
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1100px] md:grid-cols-2">
          {/* confirmation + details */}
          <main className="order-2 px-5 py-8 md:order-1 md:py-12 md:pr-12">
            <div className="mx-auto max-w-[540px]">
              <div className="flex items-start gap-4">
                <span aria-hidden="true" className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1b8a4e] text-white">
                  <Check className="h-6 w-6" strokeWidth={3} />
                </span>
                <div className="min-w-0">
                  {order?.orderNo && <p className="text-[0.85rem] text-muted">Confirmation #{order.orderNo}</p>}
                  <h1 className="font-display text-[clamp(1.5rem,4vw,2rem)] font-bold leading-tight">
                    Thank you{firstName ? `, ${firstName}` : ""}!
                  </h1>
                </div>
              </div>

              <p className="mt-4 text-[1rem] text-ink-2">
                Your order is confirmed.{" "}
                {order?.email ? (
                  <>A confirmation email is on its way to <span className="font-medium text-ink">{order.email}</span>.</>
                ) : (
                  <>A confirmation email is on the way.</>
                )}
              </p>

              {/* order updates */}
              <section className="mt-8 rounded-xl border border-line p-5">
                <h2 className="font-display text-[1rem] font-bold">Shipping</h2>
                <p className="mt-1.5 text-[0.95rem] text-ink-2">
                  <span className="font-medium text-ink">Free {order?.shippingMethod ?? "Standard shipping"}</span> — arrives in about{" "}
                  {order?.shippingEta ?? "7–10 business days"}. We&rsquo;ll email tracking as soon as it ships.
                </p>
              </section>

              {/* customer information */}
              {order && (
                <section className="mt-6">
                  <h2 className="mb-3 font-display text-[1.05rem] font-bold">Customer information</h2>
                  <dl className="grid gap-5 rounded-xl border border-line p-5 sm:grid-cols-2">
                    {order.email && <Info label="Contact">{order.email}</Info>}
                    {order.address && (
                      <Info label="Shipping address">
                        {order.name && <>{order.name}<br /></>}
                        {order.address.line1}
                        {order.address.line2 ? <>, {order.address.line2}</> : null}
                        <br />
                        {[order.address.postal, order.address.city].filter(Boolean).join(" ")}
                        {order.address.state ? `, ${order.address.state}` : ""}
                        <br />
                        {order.address.country}
                      </Info>
                    )}
                    <Info label="Shipping method">{order.shippingMethod}</Info>
                    <Info label="Payment">Paid securely via Stripe · {money(order.totalCents)} {order.currency}</Info>
                  </dl>
                </section>
              )}

              <Button asChild size="lg" className="mt-8 w-full touch-manipulation sm:w-auto sm:px-10">
                <a href="/">Continue shopping</a>
              </Button>

              <p className="mt-5 text-[0.9rem] text-muted">
                Need help with your order? <a href="/contact" className="text-brand hover:underline">Contact us</a>.
              </p>

              <nav aria-label="Policies" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-[0.8rem]">
                {LINKS.map(([label, href]) => (
                  <a key={href} href={href} className="text-brand hover:underline">
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </main>

          {/* order summary */}
          <aside className="order-1 border-b border-line bg-paper-alt px-5 py-8 md:order-2 md:border-b-0 md:border-l md:py-12 md:pl-12">
            <div className="sticky top-8 mx-auto max-w-[420px]">
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
                <Row label="Subtotal">{money(order?.productCents ?? 5900)}</Row>
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
                  <span className="font-display text-[1.1rem] font-bold">Total</span>
                  <span>
                    <span className="mr-1.5 text-[0.72rem] text-muted">{order?.currency ?? "USD"}</span>
                    <span className="font-display text-[1.3rem] font-bold tabular-nums">{money(order?.totalCents ?? 5900)}</span>
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

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[0.78rem] font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-1 text-[0.92rem] leading-relaxed text-ink-2">{children}</dd>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between text-muted">
      <span>{label}</span>
      <span className="tabular-nums">{children}</span>
    </div>
  );
}
