import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { kvReady, kvPipeline } from "@/lib/kv";
import { rateLimit, clientIp } from "@/lib/rateLimit";

// Public visitor beacon. Called on page load + a light heartbeat, so the admin
// can show "active now" (last 60s) and "visits today". A per-browser cookie
// (fc_vid) makes repeat views count as one unique visitor. No-op without KV.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!kvReady()) return NextResponse.json({ ok: false });

  // Cap per-IP writes so an attacker can't flood the visitor sets with unbounded
  // fresh IDs (KV cost + inflated "active/visits" numbers). Legit page loads +
  // heartbeats stay well under this; over the cap we just no-op (never error).
  const rl = await rateLimit(`track:${clientIp(req)}`, 240, 3600);
  if (!rl.ok) return NextResponse.json({ ok: true });

  let vid = req.cookies.get("fc_vid")?.value || "";
  const res = NextResponse.json({ ok: true });
  if (!vid) {
    vid = crypto.randomUUID();
    res.cookies.set("fc_vid", vid, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 365 });
  }

  const now = Math.floor(Date.now() / 1000);
  const today = new Date().toISOString().slice(0, 10);
  await kvPipeline([
    ["ZADD", "fc:active", now, vid],
    ["EXPIRE", "fc:active", 300],
    ["SADD", `fc:visits:${today}`, vid],
    ["EXPIRE", `fc:visits:${today}`, 60 * 60 * 48], // keep 2 days (today + yesterday)
  ]);

  return res;
}
