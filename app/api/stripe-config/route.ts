import { NextResponse } from "next/server";

// Serves the Stripe publishable key to the browser at runtime. The publishable
// key is meant to be public, so this is safe — and reading it at runtime means
// it takes effect the moment it's set in the environment, with no rebuild.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const publishableKey =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY || "";
  return NextResponse.json({ publishableKey }, { headers: { "Cache-Control": "no-store" } });
}
