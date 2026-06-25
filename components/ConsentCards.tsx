"use client";
import { useEffect, useState } from "react";
import { useCurrency } from "@/components/CurrencyProvider";
import { CURRENCIES } from "@/lib/currency";

const NAMES: Record<string, string> = {
  USD: "US dollars",
  EUR: "euros",
  GBP: "British pounds",
  DKK: "Danish kroner",
  SEK: "Swedish kronor",
  NOK: "Norwegian kroner",
  CAD: "Canadian dollars",
  AUD: "Australian dollars",
  CHF: "Swiss francs",
};

export function ConsentCards() {
  const { local, chosen, choose } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (!localStorage.getItem("fc_cookie")) setCookieOpen(true);
    } catch {
      setCookieOpen(true);
    }
  }, []);

  const setCookie = (v: string) => {
    try {
      localStorage.setItem("fc_cookie", v);
    } catch {}
    setCookieOpen(false);
  };

  if (!mounted) return null;

  const showCurrency = !chosen && local.code !== "USD";
  if (!showCurrency && !cookieOpen) return null;

  const localName = NAMES[local.code] || local.code;

  return (
    <div className="fixed bottom-4 left-4 z-[100] flex w-[min(330px,calc(100vw-2rem))] flex-col gap-3 sm:bottom-5 sm:left-5 sm:w-[370px]">
      {/* Currency picker */}
      {showCurrency && (
        <div className="rounded-[28px] border border-white/10 bg-[#141414] p-5 text-white shadow-2xl">
          <p className="text-[0.95rem] leading-relaxed text-white/60">
            We&rsquo;re showing prices in US dollars ($). Would you like your local currency ({localName})?
          </p>
          <button
            onClick={() => choose(CURRENCIES.USD)}
            className="mt-4 w-full rounded-full border border-white/20 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Keep US dollars ($)
          </button>
          <button
            onClick={() => choose(local)}
            className="mt-2.5 w-full rounded-full bg-white py-3.5 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-white/90"
          >
            Show {localName} ({local.symbol.trim()})
          </button>
        </div>
      )}

      {/* Cookie / terms consent */}
      {cookieOpen && (
        <div className="rounded-[28px] border border-white/10 bg-[#141414] p-5 text-white shadow-2xl">
          <p className="text-[0.95rem] leading-relaxed text-white/60">
            We use cookies to improve your experience and keep your data safe. By continuing you agree to our{" "}
            <a href="/terms" className="text-white underline underline-offset-2">Terms</a> and{" "}
            <a href="/privacy" className="text-white underline underline-offset-2">Privacy policy</a>.
          </p>
          <button
            onClick={() => setCookie("essential")}
            className="mt-4 w-full rounded-full border border-white/20 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10"
          >
            Essential only
          </button>
          <button
            onClick={() => setCookie("all")}
            className="mt-2.5 w-full rounded-full bg-brand py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Accept &amp; agree
          </button>
        </div>
      )}
    </div>
  );
}
