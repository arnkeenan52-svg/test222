"use client";
import { useState } from "react";
import { Star, MapPin, Clock, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/components/CurrencyProvider";
import { useBuyNow } from "@/components/useBuyNow";
import { DeliveryEstimate } from "@/components/DeliveryEstimate";
import { Countdown } from "@/components/Countdown";

// Base prices in USD — converted to the visitor's currency.
const PRICE = { now: 89.99, was: 149 };

// Included-free perks, shown as rendered product icons.
const perks = [
  { img: "/assets/img/fc-icon-shipping.png", label: "Free shipping" },
  { img: "/assets/img/fc-icon-guards.png", label: "Free guard set" },
  { img: "/assets/img/fc-icon-guide.png", label: "Digital guide" },
];

export function BuyBox() {
  const { fmt } = useCurrency();
  const { buy, loading, error } = useBuyNow();
  const [qty, setQty] = useState(1);
  const setQ = (n: number) => setQty(Math.min(10, Math.max(1, n)));

  return (
    <div>
      {/* rating */}
      <a href="#reviews" className="inline-flex items-center gap-2 text-ink hover:opacity-80">
        <span className="flex text-brand">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-[18px] w-[18px] fill-current" />
          ))}
        </span>
        <span className="text-sm font-medium text-muted">
          <b className="text-ink">4.8</b> · 1,247 reviews
        </span>
      </a>

      <h1 className="mt-3 font-display text-[clamp(2rem,5vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.02em]">
        FadeClipper
      </h1>
      <p className="mt-1.5 text-[1.05rem] text-muted">The auto-fading cordless hair clipper.</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="whitespace-nowrap font-display text-[1.9rem] font-bold text-brand">{fmt(PRICE.now)}</span>
        <span className="whitespace-nowrap text-[1.15rem] text-muted line-through">{fmt(PRICE.was)}</span>
        <span className="whitespace-nowrap rounded-full bg-brand-soft px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-brand-dark">
          Save 40%
        </span>
      </div>

      {/* sale countdown + compact quantity stepper */}
      <div className="mt-5 flex items-stretch gap-2">
        <div className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl bg-brand-tint px-3 py-2.5 text-[0.82rem] font-semibold text-brand-dark">
          <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> Sale ends in <Countdown />
        </div>
        <div className="flex shrink-0 items-center rounded-2xl bg-brand-tint text-brand-dark" aria-label="Quantity">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQ(qty - 1)} disabled={qty <= 1} className="grid h-full w-8 place-items-center rounded-l-2xl transition-colors hover:bg-brand-soft disabled:opacity-30">
            <Minus className="h-3 w-3" strokeWidth={2.5} />
          </button>
          <span aria-live="polite" className="w-5 select-none text-center text-[0.85rem] font-bold tabular-nums">{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQ(qty + 1)} disabled={qty >= 10} className="grid h-full w-8 place-items-center rounded-r-2xl transition-colors hover:bg-brand-soft disabled:opacity-30">
            <Plus className="h-3 w-3" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <Button size="lg" className="mt-4 w-full rounded-2xl text-[1.05rem]" onClick={() => buy("single", qty)} disabled={loading}>
        {loading ? "Starting checkout…" : `Buy now — ${fmt(PRICE.now * qty)}`}
      </Button>

      <DeliveryEstimate className="mt-3 text-[0.85rem] text-muted" iconClassName="text-brand" />
      {error && <p className="mt-2 text-center text-[0.8rem] text-brand">{error}</p>}

      {/* included-free perks — rendered product icons */}
      <div className="mt-6 grid grid-cols-3 gap-3 rounded-4xl bg-brand-tint p-5 text-center">
        {perks.map((g) => (
          <div key={g.label} className="flex flex-col items-center gap-2">
            <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl bg-white shadow-card">
              <img src={g.img} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="text-[0.78rem] font-medium leading-tight text-ink-2">{g.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[0.85rem] text-muted">
        <MapPin className="h-4 w-4 shrink-0 text-brand" />
        <span>
          In stock &middot; <span className="text-ink">order today, ships within 24 hours</span>
        </span>
      </div>
    </div>
  );
}
