import { NextRequest, NextResponse } from "next/server";
import { isAuthed, setSession, clearSession, codeMatches, unauthorized } from "@/lib/adminAuth";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Throttle code guesses so the short access code can't be brute-forced.
const MAX_ATTEMPTS = 8;
const WINDOW_SEC = 600; // 10 minutes

// GET → session check. Returns { authed }.
export async function GET(req: NextRequest) {
  return NextResponse.json({ authed: isAuthed(req) });
}

// POST { action: "login"|"logout", code? }
export async function POST(req: NextRequest) {
  let body: { action?: string; code?: string } = {};
  try {
    body = await req.json();
  } catch {}

  if (body.action === "logout") {
    const res = NextResponse.json({ ok: true });
    clearSession(res);
    return res;
  }

  // default action = login — rate-limited per IP to stop code brute-forcing.
  const rl = await rateLimit(`login:${clientIp(req)}`, MAX_ATTEMPTS, WINDOW_SEC);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  if (!codeMatches(body.code || "")) {
    return unauthorized();
  }
  const res = NextResponse.json({ ok: true });
  setSession(res);
  return res;
}
