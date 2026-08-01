"use client";
import { useEffect, useState } from "react";

const DAY = 24 * 60 * 60 * 1000;
const pad = (n: number) => String(n).padStart(2, "0");

// A rolling 24-hour countdown. Each visitor gets a fresh 24h window that
// persists across reloads (stored in localStorage) and restarts automatically
// when it reaches zero — so reloading never resets it, but it always loops.
export function Countdown() {
  const [label, setLabel] = useState("24:00:00");

  useEffect(() => {
    const KEY = "fc_cd_start";
    let start = 0;
    try {
      start = parseInt(localStorage.getItem(KEY) || "0", 10);
    } catch {}
    const now = Date.now();
    if (!start || now - start >= DAY) {
      start = now;
      try {
        localStorage.setItem(KEY, String(start));
      } catch {}
    }

    const tick = () => {
      let elapsed = Date.now() - start;
      if (elapsed >= DAY) {
        start = Date.now();
        elapsed = 0;
        try {
          localStorage.setItem(KEY, String(start));
        } catch {}
      }
      const diff = DAY - elapsed;
      const h = Math.floor(diff / 3.6e6);
      const m = Math.floor((diff % 3.6e6) / 6e4);
      const s = Math.floor((diff % 6e4) / 1e3);
      setLabel(`${pad(h)}:${pad(m)}:${pad(s)}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums font-semibold">{label}</span>;
}
