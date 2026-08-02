import { NextRequest, NextResponse } from "next/server";
import { isAuthed, unauthorized } from "@/lib/adminAuth";
import { kvReady, kv, kvPipeline } from "@/lib/kv";

// Live visitor stats for the admin dashboard (active now + visits today/yesterday).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();
  if (!kvReady()) {
    return NextResponse.json({ ok: true, configured: false, activeNow: 0, visitsToday: 0, visitsYesterday: 0 });
  }

  const now = Math.floor(Date.now() / 1000);
  const today = new Date().toISOString().slice(0, 10);
  const yday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // Drop anyone not seen in the last 60s, then count.
  await kv(["ZREMRANGEBYSCORE", "fc:active", 0, now - 60]);
  const [activeNow, visitsToday, visitsYesterday] = await kvPipeline([
    ["ZCARD", "fc:active"],
    ["SCARD", `fc:visits:${today}`],
    ["SCARD", `fc:visits:${yday}`],
  ]);

  return NextResponse.json({
    ok: true,
    configured: true,
    activeNow: Number(activeNow) || 0,
    visitsToday: Number(visitsToday) || 0,
    visitsYesterday: Number(visitsYesterday) || 0,
  });
}
