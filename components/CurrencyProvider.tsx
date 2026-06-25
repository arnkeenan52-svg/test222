"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CURRENCIES, currencyForCountry, formatPrice, type Currency } from "@/lib/currency";

type Ctx = {
  currency: Currency; // the currency actually used for display
  local: Currency; // the visitor's IP-detected local currency
  chosen: boolean; // has the visitor explicitly picked (or is none needed)?
  choose: (c: Currency) => void;
  fmt: (usd: number) => string;
};

const CurrencyContext = createContext<Ctx>({
  currency: CURRENCIES.USD,
  local: CURRENCIES.USD,
  chosen: true,
  choose: () => {},
  fmt: (usd) => formatPrice(usd, CURRENCIES.USD),
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES.USD);
  const [local, setLocal] = useState<Currency>(CURRENCIES.USD);
  const [chosen, setChosen] = useState(true); // hidden until we know there's a choice to offer

  useEffect(() => {
    let savedChoice: string | null = null;
    try {
      savedChoice = localStorage.getItem("fc_ccy");
    } catch {}

    const apply = (cc: string) => {
      const loc = currencyForCountry(cc);
      setLocal(loc);
      if (savedChoice && CURRENCIES[savedChoice]) {
        setCurrency(CURRENCIES[savedChoice]);
        setChosen(true);
      } else {
        setCurrency(loc); // default to local
        setChosen(loc.code === "USD"); // only ask when local differs from USD
      }
    };

    try {
      const cc = localStorage.getItem("fc_cc");
      if (cc) {
        apply(cc);
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
          apply(cc);
        }
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
    <CurrencyContext.Provider value={{ currency, local, chosen, choose, fmt: (usd) => formatPrice(usd, currency) }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
