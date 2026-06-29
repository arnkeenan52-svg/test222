import type { MetadataRoute } from "next";

const SITE_URL = "https://fadeclipper.com"; // ← change to your real .com domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/product",
    "/products",
    "/how-to-fade-your-own-hair",
    "/about",
    "/contact",
    "/shipping",
    "/returns",
    "/terms",
    "/privacy",
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" || path === "/product" || path === "/products" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/product" || path === "/products" || path === "/how-to-fade-your-own-hair" ? 0.9 : 0.5,
  }));
}
