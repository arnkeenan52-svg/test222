"use client";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { PRODUCTS } from "@/lib/products";
import { Lock, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotalUsd } = useCart();
  const { fmt } = useCurrency();
  const [msg, setMsg] = useState("");

  const pay = () => {
    // TODO: create a Stripe Checkout Session on your backend and redirect here.
    // e.g. const res = await fetch("/api/checkout", { method: "POST", body: JSON.stringify(items) });
    //      const { url } = await res.json(); window.location.href = url;
    setMsg("Payment isn't connected yet — Stripe checkout will go live here. (No charge was made.)");
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
            {/* form */}
            <div>
              <h1 className="font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold">Checkout</h1>

              <h2 className="mt-8 font-display text-[1.1rem] font-semibold">Contact</h2>
              <input type="email" placeholder="Email" className="mt-3 w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-brand" />

              <h2 className="mt-7 font-display text-[1.1rem] font-semibold">Shipping address</h2>
              <div className="mt-3 grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="First name" className="rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-brand" />
                  <input placeholder="Last name" className="rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-brand" />
                </div>
                <input placeholder="Address" className="rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-brand" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="City" className="rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-brand" />
                  <input placeholder="Postal code" className="rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-brand" />
                </div>
                <input placeholder="Country" className="rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-brand" />
              </div>

              <Button size="lg" className="mt-7 w-full" onClick={pay} disabled={items.length === 0}>
                {items.length === 0 ? "Your cart is empty" : `Pay ${fmt(subtotalUsd)}`}
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
                          <img src="/assets/img/packaging.jpg" alt="" className="h-14 w-14 rounded-xl object-cover" />
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
