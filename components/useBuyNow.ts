"use client";
import { useState } from "react";
import type { ProductId } from "@/lib/products";

// Single-product store: no cart. Every CTA sends the buyer straight to the
// custom checkout page.
export function useBuyNow() {
  const [loading, setLoading] = useState(false);

  const buy = (_id: ProductId = "single", qty = 1) => {
    setLoading(true);
    const q = Math.min(10, Math.max(1, Math.floor(qty) || 1));
    window.location.href = q > 1 ? `/checkout?qty=${q}` : "/checkout";
  };

  return { buy, loading, error: "" };
}
