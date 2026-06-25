"use client";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotalUsd, count } = useCart();
  const { fmt } = useCurrency();
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
                  <img src="/assets/img/packaging.jpg" alt="" className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
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
