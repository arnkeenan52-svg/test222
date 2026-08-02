// Geo-based currency. Prices are authored in USD and converted for display.
// Rates are approximate display rates — set exact per-currency prices at checkout.

export type Currency = {
  code: string;
  symbol: string;
  rate: number; // USD -> local
  symbolAfter?: boolean; // e.g. "407 kr"
};

export const CURRENCIES: Record<string, Currency> = {
  USD: { code: "USD", symbol: "$", rate: 1 },
  EUR: { code: "EUR", symbol: "€", rate: 0.92 },
  GBP: { code: "GBP", symbol: "£", rate: 0.79 },
  DKK: { code: "DKK", symbol: "kr", rate: 6.9, symbolAfter: true },
  SEK: { code: "SEK", symbol: "kr", rate: 10.6, symbolAfter: true },
  NOK: { code: "NOK", symbol: "kr", rate: 10.8, symbolAfter: true },
  CAD: { code: "CAD", symbol: "CA$", rate: 1.36 },
  AUD: { code: "AUD", symbol: "A$", rate: 1.52 },
  CHF: { code: "CHF", symbol: "CHF ", rate: 0.88 },
};

const EURO = [
  "AT", "BE", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES", "HR",
];

export function currencyForCountry(cc: string): Currency {
  cc = (cc || "").toUpperCase();
  if (cc === "GB") return CURRENCIES.GBP;
  if (cc === "DK") return CURRENCIES.DKK;
  if (cc === "SE") return CURRENCIES.SEK;
  if (cc === "NO") return CURRENCIES.NOK;
  if (cc === "CA") return CURRENCIES.CAD;
  if (cc === "AU") return CURRENCIES.AUD;
  if (cc === "CH") return CURRENCIES.CHF;
  if (EURO.includes(cc)) return CURRENCIES.EUR;
  return CURRENCIES.USD;
}

// Which fulfilment warehouse serves a country. The store stocks a European and
// a US warehouse and ships each order from whichever is closest, so the product
// page can reassure the visitor it's in stock near them.
export type Warehouse = "Europe" | "US";

const EUROPE_COUNTRIES = [
  "GB", "IE", "FR", "DE", "NL", "BE", "LU", "AT", "CH", "LI", "IT", "ES", "PT",
  "DK", "SE", "NO", "FI", "IS", "PL", "CZ", "SK", "SI", "HU", "RO", "BG", "HR",
  "GR", "EE", "LV", "LT", "MT", "CY",
];
const US_COUNTRIES = ["US", "CA", "MX"];

export function warehouseForCountry(cc: string | null | undefined): Warehouse | null {
  const c = (cc || "").toUpperCase();
  if (!c) return null;
  if (EUROPE_COUNTRIES.includes(c)) return "Europe";
  if (US_COUNTRIES.includes(c)) return "US";
  return null;
}

export function formatPrice(usd: number, c: Currency): string {
  const raw = usd * c.rate;
  // USD shows the authored cents (e.g. 89.99); converted currencies round to whole units.
  const v = c.code === "USD" ? raw.toFixed(2).replace(/\.00$/, "") : String(Math.round(raw));
  return c.symbolAfter ? `${v} ${c.symbol}` : `${c.symbol}${v}`;
}
