/** @type {import('next').NextConfig} */

// Baseline security headers applied to every response. Kept deliberately
// Stripe-safe: no Content-Security-Policy that could block js.stripe.com or the
// payment iframes. These headers harden against clickjacking, MIME-sniffing and
// referrer/permission leakage without touching the checkout flow.
const securityHeaders = [
  // Clickjacking: the site may not be framed by other origins (protects the
  // buy button / checkout from overlay attacks). We still frame Stripe, not the
  // other way around, so this doesn't affect payments.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  // Stop browsers from MIME-sniffing responses into an unexpected content type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't leak full URLs (which can carry ids/tokens) to third parties.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Drop powerful features the store never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Force HTTPS for two years, including subdomains.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};
export default nextConfig;
