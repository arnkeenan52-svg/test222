"use client";
import { useState } from "react";
import { Star, Check, Truck, Gift, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const options = [
  { id: "single", title: "1 FadeClipper", sub: "Just for me", price: "399,00 kr", tag: "" },
  { id: "double", title: "2 FadeClippers", sub: "Save 99 kr — gift one", price: "699,00 kr", tag: "Best value" },
];

const tags = ["Gift it", "Father's Day", "Beginners"];

export function BuyBox() {
  const [sel, setSel] = useState("single");
  return (
    <div>
      {/* rating */}
      <div className="flex items-center gap-2">
        <span className="flex text-brand">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-[18px] w-[18px] fill-current" />
          ))}
        </span>
        <span className="text-sm font-medium text-muted">
          <b className="text-ink">1,200+</b> reviews
        </span>
      </div>

      <h1 className="mt-3 font-display text-[clamp(2rem,5vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.02em]">
        FadeClipper
      </h1>
      <p className="mt-1.5 text-[1.05rem] text-muted">The auto-fading cordless hair clipper.</p>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="whitespace-nowrap font-display text-[1.9rem] font-bold text-brand">399,00 kr</span>
        <span className="whitespace-nowrap text-[1.15rem] text-muted line-through">699,00 kr</span>
        <span className="whitespace-nowrap rounded-full bg-brand-soft px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-brand-dark">
          Save 43%
        </span>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#e9f7ef] px-3.5 py-1.5 text-[0.82rem] font-medium text-[#1b8a4e]">
        <span className="h-2 w-2 rounded-full bg-[#2bb673]" /> One-time payment &middot; no subscriptions
      </div>

      {/* options */}
      <div className="mt-5 grid gap-3">
        {options.map((o) => {
          const on = sel === o.id;
          return (
            <button
              key={o.id}
              onClick={() => setSel(o.id)}
              className={`flex items-center gap-3 rounded-3xl border-2 p-4 text-left transition-colors ${
                on ? "border-brand bg-brand-tint" : "border-line bg-white hover:border-line-2"
              }`}
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
                  on ? "border-brand bg-brand text-white" : "border-line"
                }`}
              >
                {on && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-semibold">{o.title}</span>
                  {o.tag && (
                    <span className="rounded-full bg-brand px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-white">
                      {o.tag}
                    </span>
                  )}
                </span>
                <span className="text-[0.85rem] text-muted">{o.sub}</span>
              </span>
              <span className="whitespace-nowrap font-display font-bold">{o.price}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="rounded-full border border-line px-3 py-1 text-[0.78rem] font-medium text-muted">
            {t}
          </span>
        ))}
      </div>

      <Button asChild size="lg" className="mt-5 w-full text-[1.05rem]">
        <a href="#buy">Buy now</a>
      </Button>

      {/* free gifts */}
      <div className="mt-6 rounded-4xl bg-brand-tint p-5">
        <p className="mb-3 font-display font-semibold text-brand-dark">Included with every order</p>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: Truck, label: "Free shipping" },
            { icon: Gift, label: "Accessory kit" },
            { icon: ShieldCheck, label: "90-day guarantee" },
          ].map((g) => (
            <div key={g.label} className="flex flex-col items-center gap-2">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand shadow-card">
                <g.icon className="h-5 w-5" />
              </span>
              <span className="text-[0.74rem] font-medium leading-tight text-ink-2">{g.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[0.85rem] text-muted">
        <MapPin className="h-4 w-4 shrink-0 text-brand" />
        <span>
          Free delivery &middot; <span className="text-ink">order today, get it in 3–5 business days</span>
        </span>
      </div>
    </div>
  );
}
