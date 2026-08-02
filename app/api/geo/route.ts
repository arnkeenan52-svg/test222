import { NextRequest, NextResponse } from "next/server";

// Visitor geolocation from Vercel's edge network. Vercel resolves the client IP
// against a commercial geo-IP database and injects these headers on every request,
// so this is more accurate than a free client-side IP API — and because it's
// same-origin it can't be blocked by ad/tracker blockers (which silently break
// third-party IP lookups and leave visitors on the wrong currency).
// Locally / off-Vercel the headers are absent and `country` comes back empty, so
// the client falls back to a third-party lookup.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const dec = (v: string | null) => {
  if (!v) return "";
  try {
    return decodeURIComponent(v); // Vercel URL-encodes city names (e.g. "New%20York")
  } catch {
    return v;
  }
};

export async function GET(req: NextRequest) {
  const h = req.headers;
  const country = (h.get("x-vercel-ip-country") || "").toUpperCase();
  return NextResponse.json(
    {
      country,
      region: h.get("x-vercel-ip-country-region") || "",
      city: dec(h.get("x-vercel-ip-city")),
      latitude: h.get("x-vercel-ip-latitude") || "",
      longitude: h.get("x-vercel-ip-longitude") || "",
      timezone: h.get("x-vercel-ip-timezone") || "",
      source: country ? "edge" : "none",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
