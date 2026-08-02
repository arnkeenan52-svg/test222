"use client";
import { useEffect } from "react";

// Pings /api/track on load and on a light heartbeat so the admin can show
// "active now" + "visits today". Skips /admin so staff views aren't counted
// as customer traffic. No-ops server-side if KV isn't configured.
export function VisitorTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.pathname.startsWith("/admin")) return;

    const ping = () => {
      fetch("/api/track", { method: "POST", keepalive: true, credentials: "same-origin" }).catch(() => {});
    };
    ping();
    const iv = setInterval(() => {
      if (document.visibilityState === "visible") ping();
    }, 45000);
    const onVis = () => {
      if (document.visibilityState === "visible") ping();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(iv);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return null;
}
