// Central site metadata — single source of truth for URL, brand and socials.
// Set NEXT_PUBLIC_SITE_URL in Vercel to your live domain; everything (canonical
// tags, sitemap, Open Graph, JSON-LD) derives from it.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://fadeclipper.com").replace(/\/$/, "");
export const SITE_NAME = "FadeClipper";
export const SITE_TAGLINE = "Fade your own hair in minutes";
export const SITE_DESCRIPTION =
  "The auto-fading clipper that blends a salon-quality fade for you. One swipe, fade done. Cordless, waterproof, 240-minute runtime.";
export const CONTACT_EMAIL = "contact@fadeclipper.com";
export const PRODUCT_PRICE_USD = 89.99;

// Real, owned profiles — used for the Organization `sameAs` (knowledge graph).
export const SOCIAL_URLS = [
  "https://instagram.com/fadeclippr",
  "https://www.tiktok.com/@fadeclipper",
  "https://x.com/fadeclipper",
];

// Absolute URL for a site-relative path.
export const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
