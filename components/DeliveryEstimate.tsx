"use client";
import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";

// Free-shipping delivery window (business days), varied by region so the
// estimate reflects the visitor's location.
function windowForCC(cc: string | null): [number, number] {
  if (!cc) return [7, 10];
  const c = cc.toUpperCase();
  const fast = ["US", "CA", "GB", "IE", "DE", "FR", "NL", "BE", "LU", "DK", "SE", "NO", "FI", "AT", "CH", "IT", "ES", "PT", "PL", "CZ"];
  const mid = ["AU", "NZ", "AE", "SA", "SG", "HK", "JP", "KR", "MX", "BR", "IL", "ZA"];
  if (fast.includes(c)) return [5, 8];
  if (mid.includes(c)) return [7, 10];
  return [9, 13];
}

function addBusinessDays(start: Date, days: number) {
  const d = new Date(start);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) added += 1;
  }
  return d;
}

export function DeliveryEstimate({
  compact = false,
  className = "",
  iconClassName = "",
}: {
  compact?: boolean;
  className?: string;
  iconClassName?: string;
}) {
  const [range, setRange] = useState("");
  const [place, setPlace] = useState<string | null>(null);

  useEffect(() => {
    const fmt = (d: Date) =>
      d.toLocaleDateString(undefined, compact ? { month: "short", day: "numeric" } : { weekday: "short", month: "short", day: "numeric" });

    const compute = (cc: string | null, label: string | null) => {
      const [min, max] = windowForCC(cc);
      const now = new Date();
      setRange(`${fmt(addBusinessDays(now, min))} – ${fmt(addBusinessDays(now, max))}`);
      if (label) setPlace(label);
    };

    // Reuse a cached geo lookup if we've done one before.
    let cached: { cc?: string; label?: string } | null = null;
    try {
      cached = JSON.parse(localStorage.getItem("fc_geo") || "null");
    } catch {}
    if (cached && cached.cc) {
      compute(cached.cc, cached.label || null);
      return;
    }

    // Show a dated estimate immediately from the currency provider's country code…
    let quickCc: string | null = null;
    try {
      quickCc = localStorage.getItem("fc_cc");
    } catch {}
    compute(quickCc, null);

    // …then refine with city + country by IP.
    fetch("https://ipwho.is/?fields=city,country,country_code")
      .then((r) => r.json())
      .then((d) => {
        if (!d || d.success === false) return;
        const label = [d.city, d.country].filter(Boolean).join(", ") || d.country || null;
        const cc = d.country_code || quickCc || null;
        try {
          localStorage.setItem("fc_geo", JSON.stringify({ cc, label }));
        } catch {}
        compute(cc, label);
      })
      .catch(() => {});
  }, [compact]);

  return (
    <p className={cn("flex items-center justify-center gap-1.5", className)}>
      <Truck className={cn("h-4 w-4 shrink-0", iconClassName)} />
      <span>
        Free delivery
        {!compact && place ? (
          <>
            {" "}
            to <span className="font-medium">{place}</span>
          </>
        ) : null}{" "}
        &mdash; <span className="font-semibold">{range ? `arrives ${range}` : "7–10 business days"}</span>
      </span>
    </p>
  );
}
