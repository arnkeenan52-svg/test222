"use client";
import { useState } from "react";
import type { ProductId } from "@/lib/products";

// Single-product store: no cart. Every CTA sends the buyer straight to the
// custom checkout page.
export function useBuyNow() {
  const [loading, setLoading] = useState(false);

  const buy = (_id: ProductId = "single") => {
    setLoading(true);
    window.location.href = "/checkout";
  };

  return { buy, loading, error: "" };
}
