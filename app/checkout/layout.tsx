import type { Metadata } from "next";

// Checkout (and /checkout/success) must never be indexed — they're transactional,
// thin, and generate ?qty= / ?utm= URL variants that Google would otherwise flag
// as "Duplicate without user-selected canonical". noindex keeps them out entirely.
// The page itself is a client component, so the robots directive lives here.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
