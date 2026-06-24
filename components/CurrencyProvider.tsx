"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CURRENCIES, currencyForCountry, formatPrice, type Currency } from "@/lib/currency";

type Ctx = { currency: Currency; fmt: (usd: number) => string };

const CurrencyContext = createContext<Ctx>({
  currency: CURRENCIES.USD,
  fmt: (usd) => formatPrice(usd, CURRENCIES.USD),
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES.USD);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("fc_cc");
      if (cached) {
        setCurrency(currencyForCountry(cached));
        return;
      }
    } catch {}
    // Detect the visitor's country by IP (client-side, default USD on failure).
    fetch("https://ipwho.is/?fields=country_code")
      .then((r) => r.json())
      .then((d) => {
        const cc = d && d.country_code;
        if (cc) {
          try {
            localStorage.setItem("fc_cc", cc);
          } catch {}
          setCurrency(currencyForCountry(cc));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, fmt: (usd) => formatPrice(usd, currency) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
