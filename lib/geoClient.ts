// Browser-side visitor geolocation used for currency, warehouse and delivery
// estimates. Prefers our own /api/geo (Vercel edge geolocation — accurate and
// unblockable) and falls back to a third-party IP API for local dev / non-Vercel
// hosting. Results are cached in localStorage so the whole app resolves location
// once per visitor and shares it.

export type Geo = { cc: string; city: string; country: string; label: string };

function countryName(cc: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(cc.toUpperCase()) || cc;
  } catch {
    return cc;
  }
}

async function lookup(): Promise<Geo | null> {
  // 1) Vercel edge geolocation via our own endpoint (same-origin, not blockable).
  try {
    const d = await fetch("/api/geo").then((r) => r.json());
    if (d && d.country) {
      const name = countryName(d.country);
      return { cc: d.country, city: d.city || "", country: name, label: [d.city, name].filter(Boolean).join(", ") };
    }
  } catch {}
  // 2) Fallback: third-party IP geolocation (local dev / non-Vercel).
  try {
    const d = await fetch("https://ipwho.is/?fields=city,country,country_code").then((r) => r.json());
    if (d && d.success !== false && d.country_code) {
      return { cc: d.country_code, city: d.city || "", country: d.country || "", label: [d.city, d.country].filter(Boolean).join(", ") };
    }
  } catch {}
  return null;
}

export async function fetchGeo(): Promise<Geo | null> {
  try {
    const cached = JSON.parse(localStorage.getItem("fc_geo") || "null");
    if (cached && cached.cc) return cached as Geo;
  } catch {}
  const geo = await lookup();
  if (geo) {
    try {
      localStorage.setItem("fc_geo", JSON.stringify(geo));
      localStorage.setItem("fc_cc", geo.cc);
    } catch {}
  }
  return geo;
}
