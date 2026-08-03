import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Allow everything crawlable — including AI answer-engine crawlers (GPTBot,
// ClaudeBot, PerplexityBot, Google-Extended, etc.), which the wildcard rule
// covers — since the goal is to be found in both Search and AI answers. Only the
// dashboard, API and checkout (no SEO value, may carry params) are disallowed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/checkout"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
