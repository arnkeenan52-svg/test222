"use client";
import { ProductCard } from "@/components/ProductCard";
import { ACCESSORIES, PRODUCTS, type Product, type ProductId } from "@/lib/products";

/**
 * "You might also like" cross-sell grid. Defaults to the accessory line-up,
 * but a specific set of ids can be passed in. Renders nothing if empty.
 */
export function SuggestedProducts({
  title = "Complete your kit",
  subtitle = "Hand-picked add-ons that keep your FadeClipper cutting like new.",
  eyebrow = "You might also like",
  ids,
  exclude = [],
  limit,
}: {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  ids?: ProductId[];
  exclude?: ProductId[];
  limit?: number;
}) {
  let list: Product[] = (ids ? ids.map((id) => PRODUCTS[id]) : ACCESSORIES).filter(
    (p) => p && !exclude.includes(p.id)
  );
  if (limit) list = list.slice(0, limit);
  if (list.length === 0) return null;

  return (
    <div>
      <div className="mb-7 max-w-[640px]">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.3rem)] font-bold leading-[1.1]">{title}</h2>
        {subtitle && <p className="mt-3 max-w-[52ch] text-[1.02rem] text-muted">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
