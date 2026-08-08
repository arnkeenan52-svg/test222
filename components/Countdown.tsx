"use client";
import { useEffect, useRef, useState } from "react";

const DAY = 24 * 60 * 60 * 1000;
const pad = (n: number) => String(n).padStart(2, "0");

// One global 24-hour countdown — identical for every visitor on Earth.
//
// It counts down to a daily reset at a FIXED instant in UTC and loops forever
// from the same anchor. It does NOT depend on the visitor, their timezone, or
// localStorage: Date.now() is the same UTC instant everywhere, and the anchor
// is a constant, so everyone sees the exact same seconds remaining and everyone
// rolls over at the exact same moment.
//
// Reset happens daily at 17:11 UTC (an arbitrary fixed time — change the anchor
// below to move it; the time-of-day of the anchor is the daily reset time).
const RESET_ANCHOR_UTC = Date.UTC(2020, 0, 1, 17, 11, 0);

function remainingMs(now: number) {
  // ms elapsed since the most recent reset (the extra + DAY) % DAY keeps it
  // correct even for instants before the anchor).
  const into = (((now - RESET_ANCHOR_UTC) % DAY) + DAY) % DAY;
  return DAY - into;
}

function format(ms: number) {
  const h = Math.floor(ms / 3.6e6);
  const m = Math.floor((ms % 3.6e6) / 6e4);
  const s = Math.floor((ms % 6e4) / 1e3);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function Countdown() {
  // Start from the real remaining time (not a 24:00:00 placeholder) so it never
  // flashes a full day on open. suppressHydrationWarning below absorbs the ~1s
  // difference between the server-rendered value and first client render.
  const [label, setLabel] = useState(() => format(remainingMs(Date.now())));
  // serverNow − clientNow: neutralises a wrong device clock so the countdown is
  // the same for everyone, not just everyone whose clock happens to be correct.
  const skew = useRef(0);

  useEffect(() => {
    let alive = true;

    // Sync to the server's clock once (Date response header, ~1s resolution).
    fetch(window.location.origin, { method: "HEAD", cache: "no-store" })
      .then((r) => {
        const d = r.headers.get("date");
        if (!d || !alive) return;
        const server = new Date(d).getTime();
        if (Number.isFinite(server)) skew.current = server - Date.now();
      })
      .catch(() => {});

    const tick = () => setLabel(format(remainingMs(Date.now() + skew.current)));

    tick();
    const id = setInterval(tick, 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return <span suppressHydrationWarning className="tabular-nums font-semibold">{label}</span>;
}
