"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CURRENCIES, currencyForCountry, formatPrice, type Currency } from "@/lib/currency";
import { fetchGeo } from "@/lib/geoClient";

type Ctx = {
  currency: Currency; // the currency actually used for display
  local: Currency; // the visitor's IP-detected local currency
  country: string | null; // the visitor's IP-detected country code (e.g. "DK")
  chosen: boolean; // has the visitor explicitly picked (or is none needed)?
  choose: (c: Currency) => void;
  fmt: (usd: number) => string;
};

const CurrencyContext = createContext<Ctx>({
  currency: CURRENCIES.USD,
  local: CURRENCIES.USD,
  country: null,
  chosen: true,
  choose: () => {},
  fmt: (usd) => formatPrice(usd, CURRENCIES.USD),
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES.USD);
  const [local, setLocal] = useState<Currency>(CURRENCIES.USD);
  const [country, setCountry] = useState<string | null>(null);
  const [chosen, setChosen] = useState(true); // hidden until we know there's a choice to offer

  useEffect(() => {
    let savedChoice: string | null = null;
    try {
      savedChoice = localStorage.getItem("fc_ccy");
    } catch {}

    const apply = (cc: string) => {
      const loc = currencyForCountry(cc);
      setLocal(loc);
      setCountry((cc || "").toUpperCase() || null);
      if (savedChoice && CURRENCIES[savedChoice]) {
        setCurrency(CURRENCIES[savedChoice]);
        setChosen(true);
      } else {
        setCurrency(CURRENCIES.USD); // default to US dollars
        setChosen(loc.code === "USD"); // only offer local when one differs from USD
      }
    };

    // Resolve the visitor's country via Vercel edge geolocation (accurate,
    // unblockable), falling back to a third-party IP lookup off-Vercel.
    fetchGeo()
      .then((geo) => {
        if (geo?.cc) apply(geo.cc);
      })
      .catch(() => {});
  }, []);

  const choose = (c: Currency) => {
    setCurrency(c);
    setChosen(true);
    try {
      localStorage.setItem("fc_ccy", c.code);
    } catch {}
  };

  return (
    <CurrencyContext.Provider value={{ currency, local, country, chosen, choose, fmt: (usd) => formatPrice(usd, currency) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
export const useCountry = (): string | null => useContext(CurrencyContext).country;
