import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

// Lightweight signed-cookie auth for the /admin dashboard. The access code is
// verified server-side only (never shipped to the client). On success we set an
// httpOnly, signed session cookie so the code isn't re-sent on every request.
//
// SECURITY: set ADMIN_CODE in Vercel to a private value. The "1677" fallback is
// only for convenience and is visible in source — anyone who reads the repo can
// see it, and the admin can issue refunds, so use a real secret in production.
const COOKIE = "fc_admin";
const TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function secret(): string {
  // Reuse an existing server-only secret so no extra env var is required.
  return process.env.ADMIN_SECRET || process.env.STRIPE_SECRET_KEY || "fc-admin-dev-secret";
}

export function adminCode(): string {
  return (process.env.ADMIN_CODE || "1677").trim();
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get(COOKIE)?.value || "";
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  // constant-time compare to avoid timing leaks
  const expected = sign(payload);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const exp = parseInt(payload, 10);
  return Number.isFinite(exp) && exp > Date.now();
}

export function setSession(res: NextResponse): void {
  const exp = Date.now() + TTL_MS;
  const payload = String(exp);
  const token = `${payload}.${sign(payload)}`;
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(TTL_MS / 1000),
  });
}

export function clearSession(res: NextResponse): void {
  res.cookies.set(COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
}

// Timing-safe compare for the access code.
export function codeMatches(input: string): boolean {
  const a = Buffer.from(String(input || "").trim());
  const b = Buffer.from(adminCode());
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
}
