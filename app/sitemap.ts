import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // High-value indexable pages with tuned priority/frequency.
  const core: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/product`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/how-to-fade-your-own-hair`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/guides`, changeFrequency: "weekly", priority: 0.7 },
  ];

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: new Date(g.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const info: MetadataRoute.Sitemap = ["/about", "/contact", "/shipping", "/returns", "/terms", "/privacy"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...core.map((e) => ({ ...e, lastModified: now })), ...guidePages, ...info.map((e) => ({ ...e, lastModified: now }))];
}
