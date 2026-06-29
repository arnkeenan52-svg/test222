"use client";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { PRODUCTS } from "@/lib/products";
import { Lock, ShieldCheck, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotalUsd } = useCart();
  const { fmt } = useCurrency();
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    if (items.length === 0 || loading) return;
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url; // redirect to Stripe's secure checkout
        return;
      }
      setMsg(data.error || "Could not start checkout. Please try again.");
    } catch {
      setMsg("Network error — please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-line">
        <div className="container-x flex items-center justify-between py-5">
          <a href="/" aria-label="FadeClipper home" className="text-ink">
            <Logo />
          </a>
          <span className="flex items-center gap-1.5 text-[0.85rem] text-muted">
            <Lock className="h-4 w-4" /> Secure checkout
          </span>
        </div>
      </header>

      <main className="flex-1">
        <div className="container-x py-[clamp(2rem,5vw,3.5rem)]">
          <div className="mx-auto grid max-w-[940px] gap-10 md:grid-cols-[1.2fr_1fr]">
            {/* review + pay */}
            <div>
              <h1 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold">Checkout</h1>
              <p className="mt-3 max-w-[46ch] text-[0.98rem] text-muted">
                You&rsquo;ll enter your card and shipping details on the next step — a secure payment page hosted by
                Stripe. Nothing is charged until you confirm there.
              </p>

              <ul className="mt-6 grid gap-3">
                {[
                  ["Free worldwide shipping", "Arrives in about 7–10 business days."],
                  ["Pay securely with Stripe", "Card, Apple Pay &amp; Google Pay — encrypted end to end."],
                  ["90-day money-back guarantee", "Not for you? Send it back for a full refund."],
                ].map(([t, s]) => (
                  <li key={t} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4">
                    <Truck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <div>
                      <p className="font-semibold leading-tight" dangerouslySetInnerHTML={{ __html: t }} />
                      <p className="text-[0.85rem] text-muted" dangerouslySetInnerHTML={{ __html: s }} />
                    </div>
                  </li>
                ))}
              </ul>

              <Button size="lg" className="mt-7 w-full" onClick={pay} disabled={items.length === 0 || loading}>
                {items.length === 0 ? "Your cart is empty" : loading ? "Redirecting to payment…" : `Continue to payment — ${fmt(subtotalUsd)}`}
              </Button>
              {msg && <p className="mt-3 rounded-2xl bg-brand-tint px-4 py-3 text-[0.88rem] text-brand-dark">{msg}</p>}
              <p className="mt-3 flex items-center gap-1.5 text-[0.78rem] text-muted">
                <ShieldCheck className="h-4 w-4" /> Encrypted &amp; secure. You can review everything before paying.
              </p>
            </div>

            {/* summary */}
            <aside className="h-fit rounded-4xl border border-line bg-card p-6 md:sticky md:top-6">
              <h2 className="font-display text-[1.1rem] font-semibold">Order summary</h2>
              {items.length === 0 ? (
                <p className="mt-4 text-muted">
                  Nothing here yet. <a href="/" className="text-brand underline">Back to the store</a>.
                </p>
              ) : (
                <>
                  <div className="mt-4 grid gap-3">
                    {items.map((it) => {
                      const p = PRODUCTS[it.id];
                      return (
                        <div key={it.id} className="flex items-center gap-3">
                          <img src={p.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                          <div className="flex-1">
                            <p className="text-[0.95rem] font-semibold leading-tight">{p.title}</p>
                            <p className="text-[0.8rem] text-muted">Qty {it.qty}</p>
                          </div>
                          <span className="font-semibold">{fmt(p.usd * it.qty)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 space-y-1.5 border-t border-line pt-4 text-[0.92rem]">
                    <div className="flex justify-between text-muted"><span>Subtotal</span><span>{fmt(subtotalUsd)}</span></div>
                    <div className="flex justify-between text-muted"><span>Shipping</span><span className="text-[#1b8a4e]">Free</span></div>
                    <div className="mt-2 flex justify-between border-t border-line pt-3 font-display text-[1.1rem] font-bold">
                      <span>Total</span><span>{fmt(subtotalUsd)}</span>
                    </div>
                  </div>
                </>
              )}
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
