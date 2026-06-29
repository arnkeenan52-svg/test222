"use client";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { PRODUCTS, ACCESSORIES } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, add, subtotalUsd, count } = useCart();
  const { fmt } = useCurrency();
  // Cross-sell: accessories that aren't already in the cart (up to 2).
  const upsells = ACCESSORIES.filter((p) => !items.some((it) => it.id === p.id)).slice(0, 2);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Go straight to Stripe's hosted checkout — no intermediate review page.
  const checkout = async () => {
    if (items.length === 0 || loading) return;
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setErr(data.error || "Could not start checkout. Please try again.");
    } catch {
      setErr("Network error — please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[110] bg-black/50 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-[120] flex h-full w-[92%] max-w-[400px] flex-col bg-paper shadow-soft transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Cart"
      >
        <div className="flex items-center justify-between border-b border-line p-5">
          <span className="flex items-center gap-2 font-display text-[1.2rem] font-bold">
            <ShoppingBag className="h-5 w-5" /> Your cart ({count})
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="grid h-9 w-9 place-items-center rounded-full hover:bg-card">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="mt-6 text-center text-muted">Your cart is empty.</p>
          ) : (
            items.map((it) => {
              const p = PRODUCTS[it.id];
              return (
                <div key={it.id} className="mb-3 flex items-center gap-3 rounded-3xl border border-line bg-white p-3">
                  <img src={p.image} alt="" className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold leading-tight">{p.title}</p>
                    <p className="text-[0.85rem] text-muted">{fmt(p.usd)}</p>
                    <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-line px-2 py-1">
                      <button onClick={() => setQty(it.id, it.qty - 1)} aria-label="Decrease" className="text-muted hover:text-ink">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-4 text-center text-sm font-semibold tabular-nums">{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} aria-label="Increase" className="text-muted hover:text-ink">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-display font-bold">{fmt(p.usd * it.qty)}</span>
                    <button onClick={() => remove(it.id)} className="text-[0.75rem] text-muted underline hover:text-ink">
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* upsell — add accessories without leaving the cart */}
        {items.length > 0 && upsells.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted">Add to your order</p>
            <div className="grid gap-2">
              {upsells.map((p) => (
                <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-2.5">
                  <img src={p.image} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                  <div className="flex-1 leading-tight">
                    <p className="text-[0.88rem] font-semibold">{p.title}</p>
                    <p className="text-[0.8rem] text-muted">{fmt(p.usd)}</p>
                  </div>
                  <button
                    onClick={() => add(p.id)}
                    aria-label={`Add ${p.title} to cart`}
                    className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1.5 text-[0.8rem] font-semibold text-brand-dark transition-colors hover:bg-brand/15"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={3} /> Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-line p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-muted">Subtotal</span>
            <span className="font-display text-[1.25rem] font-bold">{fmt(subtotalUsd)}</span>
          </div>
          {items.length > 0 ? (
            <Button size="lg" className="w-full" onClick={checkout} disabled={loading}>
              {loading ? "Redirecting to payment…" : "Checkout"}
            </Button>
          ) : (
            <Button size="lg" className="w-full" onClick={() => setOpen(false)}>
              Continue shopping
            </Button>
          )}
          {err && <p className="mt-2 text-center text-[0.78rem] text-brand">{err}</p>}
          <p className="mt-3 text-center text-[0.75rem] text-muted">Free shipping &middot; 90-day money-back guarantee</p>
        </div>
      </aside>
    </>
  );
}
