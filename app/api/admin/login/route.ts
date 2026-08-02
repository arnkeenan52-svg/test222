import { NextRequest, NextResponse } from "next/server";
import { isAuthed, setSession, clearSession, codeMatches, unauthorized } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  // default action = login
  if (!codeMatches(body.code || "")) {
    return unauthorized();
  }
  const res = NextResponse.json({ ok: true });
  setSession(res);
  return res;
}
