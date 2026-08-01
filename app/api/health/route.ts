import { NextResponse } from "next/server";

// Diagnostic only — reports whether the Stripe keys are configured (never the
// keys themselves). Safe to delete once checkout is confirmed working.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mode(k: string) {
  if (!k) return "missing";
  if (k.startsWith("pk_live") || k.startsWith("sk_live")) return "live";
  if (k.startsWith("pk_test") || k.startsWith("sk_test")) return "test";
  return "unrecognized";
}

export async function GET() {
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY || "";
  const sk = process.env.STRIPE_SECRET_KEY || "";
  const pkMode = mode(pk);
  const skMode = mode(sk);
  // Names only (never values) of the Stripe-related vars this deployment sees.
  const configuredVarNames = Object.keys(process.env)
    .filter((k) => /stripe|publish|^pk_/i.test(k))
    .sort();
  return NextResponse.json(
    {
      publishableKey: pkMode,
      secretKey: skMode,
      keysMatchMode: pk && sk ? pkMode === skMode : false,
      configuredVarNames,
      // The client only sees the publishable key if the site was rebuilt AFTER
      // it was added — this endpoint reflects the runtime env, not the bundle.
      note: "If publishableKey shows 'missing' here it isn't set at all; if it's set here but /checkout still says 'not configured', the site needs a redeploy so the client bundle picks it up.",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
