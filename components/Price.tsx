"use client";
import { useCurrency } from "@/components/CurrencyProvider";

// Renders a USD base amount in the visitor's local currency.
export function Price({ usd, className }: { usd: number; className?: string }) {
  const { fmt } = useCurrency();
  return <span className={className}>{fmt(usd)}</span>;
}
