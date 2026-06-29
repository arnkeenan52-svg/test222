"use client";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ALL_PRODUCTS, CATEGORIES, type ProductCategory } from "@/lib/products";

type Filter = "All" | ProductCategory;
const FILTERS: Filter[] = ["All", ...CATEGORIES];

export function ProductsBrowser() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Filter>("All");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!needle) return true;
      const hay = [p.title, p.sub, p.category, ...(p.keywords ?? [])].join(" ").toLowerCase();
      return needle.split(/\s+/).every((term) => hay.includes(term));
    });
  }, [q, cat]);

  return (
    <div>
      {/* search field */}
      <div className="relative mx-auto max-w-[560px]">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products — try “blade”, “travel”, “charger”…"
          aria-label="Search products"
          className="h-14 w-full rounded-full border border-line bg-white pr-12 text-[1rem] text-ink shadow-card outline-none transition-colors placeholder:text-muted focus:border-brand"
          style={{ paddingLeft: "3.25rem" }}
        />
        {q && (
          <button
            onClick={() => setQ("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-card hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* category filters */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((f) => {
          const on = cat === f;
          return (
            <button
              key={f}
              onClick={() => setCat(f)}
              className={`rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-colors ${
                on ? "border-brand bg-brand text-white" : "border-line bg-white text-muted hover:border-line-2 hover:text-ink"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* result count */}
      <p className="mt-6 text-center text-[0.85rem] text-muted">
        {results.length === 0
          ? "No matches"
          : `${results.length} product${results.length === 1 ? "" : "s"}`}
        {q && <> for “{q.trim()}”</>}
      </p>

      {/* grid */}
      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-4xl border border-line bg-card p-10 text-center">
          <p className="font-display text-[1.1rem] font-semibold">Nothing matched that search.</p>
          <p className="mx-auto mt-2 max-w-[40ch] text-[0.92rem] text-muted">
            Try a shorter word, or{" "}
            <button onClick={() => { setQ(""); setCat("All"); }} className="text-brand underline underline-offset-2">
              browse everything
            </button>
            .
          </p>
        </div>
      )}
    </div>
  );
}
