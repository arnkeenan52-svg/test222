"use client";
import { useState } from "react";
import type { ProductId } from "@/lib/products";

// Single-product store: no cart. Every CTA starts checkout for one unit.
export function useBuyNow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buy = async (id: ProductId = "single") => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id, qty: 1 }] }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Could not start checkout. Please try again.");
    } catch {
      setError("Network error — please try again.");
    }
    setLoading(false);
  };

  return { buy, loading, error };
}
