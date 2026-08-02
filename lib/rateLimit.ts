import type { NextRequest } from "next/server";
import { kvReady, kv } from "@/lib/kv";

// Small, dependency-free rate limiter. Uses KV (Upstash) for a shared, atomic
// counter across serverless instances when it's configured, and falls back to a
// per-instance in-memory window otherwise. Fixed-window: `limit` requests per
// `windowSec` seconds, keyed by an arbitrary identifier (usually IP + route).

type Result = { ok: boolean; remaining: number; retryAfter: number };

// Per-instance fallback store. Bounded so an attacker can't grow it unboundedly.
const mem = new Map<string, { count: number; reset: number }>();
const MEM_MAX = 5000;

function memHit(key: string, limit: number, windowSec: number, now: number): Result {
  const rec = mem.get(key);
  if (!rec || rec.reset <= now) {
    if (mem.size >= MEM_MAX) {
      // Drop expired entries first; if still full, clear (cheap, rare).
      for (const [k, v] of mem) if (v.reset <= now) mem.delete(k);
      if (mem.size >= MEM_MAX) mem.clear();
    }
    mem.set(key, { count: 1, reset: now + windowSec * 1000 });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }
  rec.count += 1;
  const ok = rec.count <= limit;
  return { ok, remaining: Math.max(0, limit - rec.count), retryAfter: ok ? 0 : Math.ceil((rec.reset - now) / 1000) };
}

export async function rateLimit(key: string, limit: number, windowSec: number): Promise<Result> {
  const now = Date.now();
  if (kvReady()) {
    try {
      const k = `fc:rl:${key}`;
      const count = Number(await kv(["INCR", k])) || 0;
      // Set the TTL on the first hit of the window (and defensively if it's missing).
      if (count <= 1) await kv(["EXPIRE", k, windowSec]);
      const ok = count <= limit;
      return { ok, remaining: Math.max(0, limit - count), retryAfter: ok ? 0 : windowSec };
    } catch {
      // Fall through to the in-memory limiter if KV misbehaves.
    }
  }
  return memHit(key, limit, windowSec, now);
}

// Best-effort client IP from the platform's forwarding headers. On Vercel the
// left-most x-forwarded-for entry is the real client.
export function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for") || "";
  const first = xff.split(",")[0].trim();
  return first || req.headers.get("x-real-ip") || "unknown";
}
