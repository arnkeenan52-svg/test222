"use client";
import { useEffect, useState } from "react";

// Counts down to the end of the current day (a real daily deadline — not a
// per-visit fake reset). Swap for a fixed promo end date if you run one.
export function Countdown() {
  const [label, setLabel] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const end = new Date();
      end.setHours(23, 59, 59, 999);
      const diff = Math.max(0, end.getTime() - Date.now());
      const h = Math.floor(diff / 3.6e6);
      const m = Math.floor((diff % 3.6e6) / 6e4);
      const s = Math.floor((diff % 6e4) / 1e3);
      const pad = (n: number) => String(n).padStart(2, "0");
      setLabel(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums font-semibold">{label}</span>;
}
