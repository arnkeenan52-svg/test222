"use client";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";
import { useCart } from "@/components/CartProvider";
import { type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { fmt } = useCurrency();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-4xl border border-line bg-white shadow-card transition-shadow hover:shadow-soft">
      <div className="relative aspect-square overflow-hidden bg-card">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-muted">{product.category}</p>
        <h3 className="mt-1 font-display text-[1.02rem] font-bold leading-tight">{product.title}</h3>
        <p className="mt-1 text-[0.85rem] text-muted">{product.sub}</p>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[1.15rem] font-bold text-brand">{fmt(product.usd)}</span>
            {product.was && <span className="text-[0.9rem] text-muted line-through">{fmt(product.was)}</span>}
          </div>
          <button
            onClick={onAdd}
            aria-label={`Add ${product.title} to cart`}
            className="mt-3 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-brand text-[0.92rem] font-semibold text-white shadow-btn transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            {added ? (
              <>
                <Check className="h-4 w-4" strokeWidth={3} /> Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" strokeWidth={3} /> Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
