"use client";
import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PRODUCTS } from "@/lib/products";
import { COUNTRIES } from "@/lib/countries";
import { useCountry } from "@/components/CurrencyProvider";
import { Lock, ShieldCheck, Check, ChevronDown, Tag, Search, X } from "lucide-react";

type ShippingId = "standard" | "express";
const SHIP: Record<ShippingId, { label: string; cents: number; eta: string }> = {
  standard: { label: "Standard shipping", cents: 0, eta: "7–10 business days" },
  express: { label: "Express shipping", cents: 1200, eta: "2–3 business days" },
};
type Quote = { productCents: number; unitCents: number; quantity: number; shippingCents: number; discountCents: number; total: number; codeOk: boolean };

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const PRODUCT = PRODUCTS.single;
const PRODUCT_IMG = "/assets/img/packaging.jpg";

// Google Places address autocomplete (the same source Shopify's checkout uses).
// Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in Vercel and enable "Places API (New)" +
// billing on the Google Cloud project so the key can call the Places endpoint.
// It autocompletes every country — including Denmark, which Stripe's own address
// widget can't. If the key is missing or Google isn't enabled yet, Danish
// addresses still autocomplete via the official DK register (DAWA) fallback.
const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Order quantity comes in from the product page as ?qty=N — clamp it 1–10.
function readQty(): number {
  if (typeof window === "undefined") return 1;
  const raw = parseInt(new URLSearchParams(window.location.search).get("qty") || "1", 10);
  return Math.min(10, Math.max(1, Number.isFinite(raw) ? raw : 1));
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [piId, setPiId] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [fatal, setFatal] = useState("");
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null);
  const started = useRef(false);
  const qtyRef = useRef(1);

  // The global body is bg-paper (cream); paint html/body white while on checkout
  // so the iOS status-bar / safe area at the top is pure white (no colour band),
  // like Shopify. Reverted on unmount.
  useEffect(() => {
    const html = document.documentElement, body = document.body;
    const pH = html.style.backgroundColor, pB = body.style.backgroundColor;
    html.style.backgroundColor = "#ffffff";
    body.style.backgroundColor = "#ffffff";
    return () => { html.style.backgroundColor = pH; body.style.backgroundColor = pB; };
  }, []);

  useEffect(() => {
    if (started.current) return; // run once
    started.current = true;
    qtyRef.current = readQty();
    (async () => {
      // Publishable key is fetched at runtime, so it works the moment it's set
      // in the environment — no rebuild required, and either env-var name works.
      let pk = "";
      try {
        pk = (await fetch("/api/stripe-config").then((r) => r.json()))?.publishableKey || "";
      } catch {}
      if (!pk) {
        setFatal("Stripe isn’t configured yet. Add your publishable key to go live.");
        return;
      }
      setStripePromise(loadStripe(pk));
      try {
        const d = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shipping: "standard", qty: qtyRef.current }),
        }).then((r) => r.json());
        if (d.clientSecret) {
          setClientSecret(d.clientSecret);
          setPiId(d.paymentIntentId);
          setQuote(d);
        } else {
          setFatal(d.error || "Could not start checkout.");
        }
      } catch {
        setFatal("Network error — please try again.");
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink">
      {/* header — white, Shopify-style */}
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4">
          <a href="/" aria-label="FadeClipper home">
            <img src="/assets/img/fadeclipper-stripe-logo.png" alt="FadeClipper" width={123} height={24} className="h-6 w-auto" />
          </a>
          <span className="flex items-center gap-1.5 text-[0.82rem] font-medium text-muted">
            <Lock className="h-4 w-4" aria-hidden="true" /> Secure checkout
          </span>
        </div>
      </header>
      <h1 className="sr-only">Checkout</h1>

      {fatal ? (
        <FatalFallback message={fatal} />
      ) : !stripePromise || !clientSecret || !quote ? (
        <div className="mx-auto max-w-[1100px] px-5 py-24 text-center text-muted" role="status" aria-live="polite">
          Loading secure checkout…
        </div>
      ) : (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#ec6324",
                colorText: "#191919",
                colorTextSecondary: "#6b7280",
                colorDanger: "#d64545",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSizeBase: "15px",
                borderRadius: "8px",
                spacingUnit: "4px",
              },
              rules: {
                ".Input": { padding: "12px 14px", borderColor: "#d9dce1" },
                ".Input:focus": { borderColor: "#ec6324", boxShadow: "0 0 0 1px #ec6324" },
                ".Label": { fontWeight: "500", marginBottom: "6px" },
                ".Tab, .Block": { borderColor: "#d9dce1" },
              },
            },
          }}
        >
          <CheckoutInner clientSecret={clientSecret} piId={piId} quote={quote} setQuote={setQuote} qty={qtyRef.current} />
        </Elements>
      )}
    </div>
  );
}

function CheckoutInner({
  clientSecret,
  piId,
  quote,
  setQuote,
  qty: initialQty,
}: {
  clientSecret: string;
  piId: string;
  quote: Quote;
  setQuote: (q: Quote) => void;
  qty: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [shipping, setShipping] = useState<ShippingId>("standard");
  const [code, setCode] = useState("");
  const [codeMsg, setCodeMsg] = useState("");
  const [paying, setPaying] = useState(false);
  const [payErr, setPayErr] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [hasExpress, setHasExpress] = useState(false);
  const [qty, setQty] = useState(initialQty);
  const [email, setEmail] = useState("");
  const geoCountry = useCountry(); // IP-detected country — prefills the country field
  const [addr, setAddr] = useState<Addr>({ country: "", first: "", last: "", line1: "", line2: "", city: "", postal: "", phone: "" });
  const [addrComplete, setAddrComplete] = useState(false); // shipping options unlock once the address is filled
  const countryTouched = useRef(false); // don't override a country the shopper picked themselves

  // Prefill the country from the shopper's location once geolocation resolves.
  useEffect(() => {
    if (!countryTouched.current && geoCountry) setAddr((a) => (a.country ? a : { ...a, country: geoCountry }));
  }, [geoCountry]);

  const recomputeAsync = async (nextShipping: ShippingId, nextCode: string, nextQty: number, announce = false) => {
    try {
      const res = await fetch("/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: piId, shipping: nextShipping, code: nextCode || null, qty: nextQty }),
      });
      const d = await res.json();
      if (d.total != null) {
        setQuote(d);
        if (announce) setCodeMsg(d.codeOk ? "Discount applied." : "That code isn’t valid.");
      }
    } catch {}
  };
  const recompute = (nextShipping: ShippingId, nextCode: string, nextQty: number, announce = false) => {
    void recomputeAsync(nextShipping, nextCode, nextQty, announce);
  };

  // Quantity is chosen here, in the order summary — the product page stays clean.
  const changeQty = (next: number) => {
    const q = Math.min(10, Math.max(1, next));
    if (q === qty) return;
    setQty(q);
    recompute(shipping, code, q);
  };

  const confirm = async () => {
    if (!stripe || !elements) return;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success` },
    });
    if (error) setPayErr(error.message || "Payment could not be completed.");
  };

  // Express Checkout (Apple Pay / Google Pay / Link) — collects contact + shipping
  // in the wallet sheet, keeps the PaymentIntent amount in sync with the choice.
  const onExpressClick = ({ resolve }: any) =>
    resolve({
      emailRequired: true,
      phoneNumberRequired: true,
      shippingAddressRequired: true,
      lineItems: [{ name: quote.quantity > 1 ? `${PRODUCT.title} × ${quote.quantity}` : PRODUCT.title, amount: Math.max(0, quote.productCents - quote.discountCents) }],
      shippingRates: [
        { id: "standard", displayName: "Standard shipping (7–10 business days)", amount: SHIP.standard.cents },
        { id: "express", displayName: "Express shipping (2–3 business days)", amount: SHIP.express.cents },
      ],
    });
  const onExpressShippingRateChange = async ({ shippingRate, resolve }: any) => {
    const next: ShippingId = shippingRate?.id === "express" ? "express" : "standard";
    setShipping(next);
    await recomputeAsync(next, code, qty);
    resolve();
  };

  const chooseShipping = (id: ShippingId) => {
    setShipping(id);
    recompute(id, code, qty);
  };

  const applyCode = () => {
    recompute(shipping, code, qty, true);
  };

  const pay = async () => {
    if (!stripe || !elements || paying) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setPayErr("Please enter a valid email address.");
      return;
    }
    if (!addrComplete) {
      setPayErr("Please complete your shipping address.");
      return;
    }
    setPaying(true);
    setPayErr("");
    // We collect shipping in our own form (so autocomplete can live inside the
    // Address field), so hand it to Stripe explicitly at confirmation time.
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        receipt_email: email.trim(),
        shipping: {
          name: `${addr.first} ${addr.last}`.trim() || addr.last,
          phone: addr.phone,
          address: {
            line1: addr.line1,
            line2: addr.line2 || undefined,
            city: addr.city,
            postal_code: addr.postal,
            country: addr.country,
          },
        },
      },
    });
    // Only reached if there's an immediate validation error (otherwise redirects away).
    if (error) setPayErr(error.message || "Payment could not be completed.");
    setPaying(false);
  };

  return (
    <div className="mx-auto grid max-w-[1100px] gap-0 md:grid-cols-2">
      {/* mobile collapsible order summary (Shopify style) */}
      <button
        onClick={() => setSummaryOpen((v) => !v)}
        className="flex touch-manipulation items-center justify-between border-b border-line bg-paper-alt px-5 py-3.5 text-[0.9rem] md:hidden"
        aria-expanded={summaryOpen}
        aria-controls="order-summary-mobile"
      >
        <span className="flex items-center gap-2 font-medium text-brand">
          Order summary
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
        </span>
        <span className="font-display text-[1.15rem] font-bold tabular-nums">{money(quote.total)}</span>
      </button>
      {summaryOpen && (
        <div id="order-summary-mobile" className="border-b border-line bg-paper-alt px-5 py-5 md:hidden">
          <Summary quote={quote} shipping={shipping} code={code} setCode={setCode} applyCode={applyCode} codeMsg={codeMsg} qty={qty} onQty={changeQty} ready={addrComplete} />
        </div>
      )}

      {/* form */}
      <main className="order-2 px-5 py-8 md:order-1 md:py-12 md:pr-12">
        <div className="mx-auto max-w-[520px]">
          {/* Express checkout — Apple Pay / Google Pay / Amazon Pay / Link */}
          <div className={hasExpress ? "mb-6" : ""}>
            {hasExpress && <p className="mb-3 text-center text-[0.9rem] font-medium text-muted">Express checkout</p>}
            <ExpressCheckoutElement
              options={{ buttonHeight: 48, layout: { maxRows: 2 } }}
              onReady={(e: any) => setHasExpress(!!e?.availablePaymentMethods)}
              onClick={onExpressClick}
              onShippingAddressChange={({ resolve }: any) => resolve()}
              onShippingRateChange={onExpressShippingRateChange}
              onConfirm={confirm}
            />
            {hasExpress && (
              <div className="mt-5 flex items-center gap-3 text-[0.8rem] text-muted">
                <span className="h-px flex-1 bg-line" /> OR <span className="h-px flex-1 bg-line" />
              </div>
            )}
          </div>

          <Section title="Contact">
            <label htmlFor="co-email" className="mb-1.5 block text-[0.9rem] font-medium text-ink">Email</label>
            <input
              id="co-email"
              type="email"
              required
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#d9dce1] bg-white px-3.5 py-3 text-[0.95rem] text-ink outline-none transition-colors focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand"
            />
            <p className="mt-1.5 text-[0.8rem] text-muted">Your order confirmation & receipt are sent here.</p>
          </Section>

          <Section title="Delivery">
            {/* Our own shipping form so the address autocomplete can live right
                inside the Address field (Google Places, the same source Shopify
                uses — it covers Denmark, with the official DK register as a
                fallback). The address is handed to Stripe at payment. */}
            <AddressForm
              value={addr}
              onChange={(next, complete) => {
                if (next.country !== addr.country) countryTouched.current = true;
                setAddr(next);
                setAddrComplete(complete);
              }}
            />
          </Section>

          <Section title="Shipping method">
            {addrComplete ? (
              <div className="grid gap-2.5" role="radiogroup" aria-label="Shipping method">
                {(Object.keys(SHIP) as ShippingId[]).map((id) => {
                  const s = SHIP[id];
                  const active = shipping === id;
                  return (
                    <label
                      key={id}
                      className={`flex cursor-pointer touch-manipulation items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-1 ${
                        active ? "border-brand bg-brand-tint" : "border-line hover:border-ink/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping-method"
                        value={id}
                        checked={active}
                        onChange={() => chooseShipping(id)}
                        className="sr-only"
                      />
                      <span className="flex items-center gap-3">
                        <span aria-hidden="true" className={`grid h-5 w-5 place-items-center rounded-full border ${active ? "border-brand" : "border-line-2"}`}>
                          {active && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
                        </span>
                        <span>
                          <span className="block font-medium">{s.label}</span>
                          <span className="text-[0.82rem] text-muted">{s.eta}</span>
                        </span>
                      </span>
                      <span className="font-semibold tabular-nums">{s.cents === 0 ? "FREE" : money(s.cents)}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-lg bg-paper-alt px-4 py-4 text-[0.9rem] text-muted">
                Enter your shipping address to view available shipping methods.
              </div>
            )}
          </Section>

          <Section title="Payment">
            <p className="mb-3 flex items-center gap-1.5 text-[0.8rem] text-muted">
              <ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" /> All transactions are secure and encrypted.
            </p>
            {/* Card form. Apple Pay / Google Pay also appear as wallet tabs when
                supported; the fast wallet buttons are at the top of the page.
                Link visibility is managed in the Stripe Dashboard. */}
            <PaymentElement options={{ wallets: { applePay: "auto", googlePay: "auto" } }} />
          </Section>

          <button
            onClick={pay}
            disabled={paying || !stripe}
            aria-busy={paying}
            className="mt-6 w-full touch-manipulation rounded-[10px] bg-brand py-[0.95rem] text-center font-display text-[1.05rem] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
          >
            {paying ? "Processing…" : "Pay now"}
          </button>
          <p role="alert" aria-live="assertive" className="mt-3 text-center text-[0.85rem] text-[#d64545]">
            {payErr}
          </p>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-[0.78rem] text-muted">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Powered by Stripe · Backed by our 14-day money-back guarantee
          </p>

          <nav aria-label="Policies" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-[0.8rem]">
            {[
              ["Refund policy", "/returns"],
              ["Shipping", "/shipping"],
              ["Privacy policy", "/privacy"],
              ["Terms of service", "/terms"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="text-brand hover:underline">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </main>

      {/* order summary — sticky sidebar on desktop */}
      <aside className="order-1 hidden border-l border-line bg-paper-alt px-5 py-12 md:order-2 md:block md:pl-12">
        <div className="sticky top-8 max-w-[420px]">
          <Summary quote={quote} shipping={shipping} code={code} setCode={setCode} applyCode={applyCode} codeMsg={codeMsg} qty={qty} onQty={changeQty} ready={addrComplete} />
        </div>
      </aside>
    </div>
  );
}

// The full shipping address collected in our own form (fed to Stripe at payment).
type Addr = { country: string; first: string; last: string; line1: string; line2: string; city: string; postal: string; phone: string };
// The street / postcode / city resolved from a chosen autocomplete suggestion.
type DkPick = { line1: string; postal: string; city: string };
// A dropdown row — either a Google Places prediction or a DAWA suggestion.
type Suggestion = { id: string; text: string; src: "google" | "dawa"; dawa?: DawaItem };

type DawaItem = {
  type?: string;
  tekst?: string;
  forslagstekst?: string;
  adresse?: { vejnavn?: string; husnr?: string; etage?: string | null; dør?: string | null; postnr?: string; postnrnavn?: string };
  adgangsadresse?: { vejnavn?: string; husnr?: string; postnr?: string; postnrnavn?: string };
};

// Google Places API (New) — the same source Shopify's checkout uses, so it
// autocompletes Denmark (and everywhere else). Called straight from the browser
// with the HTTP-referrer-restricted key, so it's authorised on the live domain.
// Returns null on any failure so the caller can fall back to DAWA.
async function googleAutocomplete(input: string, cc: string, token: string): Promise<{ placeId: string; text: string }[] | null> {
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Goog-Api-Key": MAPS_KEY },
      body: JSON.stringify({
        input,
        sessionToken: token,
        ...(cc ? { includedRegionCodes: [cc] } : {}),
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const s = data?.suggestions;
    if (!Array.isArray(s) || !s.length) return null;
    return s
      .map((x: any) => x.placePrediction)
      .filter((p: any) => p?.placeId)
      .map((p: any) => ({ placeId: p.placeId, text: p.text?.text || "" }));
  } catch {
    return null;
  }
}

// Resolve a Google place to street / postcode / city.
async function googlePlaceDetails(placeId: string, token: string): Promise<DkPick | null> {
  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?sessionToken=${encodeURIComponent(token)}`,
      { headers: { "X-Goog-Api-Key": MAPS_KEY, "X-Goog-FieldMask": "addressComponents" } }
    );
    if (!res.ok) return null;
    const comps: any[] = (await res.json())?.addressComponents || [];
    const pick = (type: string) => comps.find((c) => (c.types || []).includes(type));
    const route = pick("route")?.longText || "";
    const num = pick("street_number")?.longText || "";
    const postal = pick("postal_code")?.longText || "";
    const city = pick("locality")?.longText || pick("postal_town")?.longText || pick("administrative_area_level_2")?.longText || "";
    // Denmark (and most of Europe) writes "Street Number".
    const line1 = [route, num].filter(Boolean).join(" ").trim();
    if (!line1 && !postal && !city) return null;
    return { line1, postal, city };
  } catch {
    return null;
  }
}

// Free, official Danish address register (DAWA / Danmarks Adresseregister —
// api.dataforsyningen.dk). No key, no billing, CORS-open. Used as the fallback
// so Danish addresses autocomplete even before Google billing is switched on.
async function dawaAutocomplete(query: string): Promise<Suggestion[]> {
  try {
    const res = await fetch(
      `https://api.dataforsyningen.dk/adresser/autocomplete?per_side=8&fuzzy=&q=${encodeURIComponent(query)}`,
      { headers: { Accept: "application/json" } }
    );
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.slice(0, 8).map((it: DawaItem, i: number) => ({
      id: (it.tekst || "") + i,
      text: it.forslagstekst || it.tekst || "",
      src: "dawa" as const,
      dawa: it,
    }));
  } catch {
    return [];
  }
}

function randomToken(): string {
  try { return crypto.randomUUID(); } catch { return `${Math.random()}`.slice(2); }
}

// Shared input styling, matched to the Contact email field so the form looks native.
const INPUT =
  "w-full rounded-lg border border-[#d9dce1] bg-white px-3.5 py-3 text-[0.95rem] text-ink outline-none transition-colors focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand placeholder:text-muted";

// Everything required to ship (first name is optional, like Shopify).
function isAddrComplete(a: Addr): boolean {
  return !!(a.country && a.last.trim() && a.line1.trim() && a.city.trim() && a.postal.trim() && a.phone.trim());
}

// The Address field itself, with autocomplete living *inside* it — Google Places
// first (the source Shopify uses, so Denmark is covered), DAWA as the DK fallback.
function AddressLine({
  country,
  value,
  onText,
  onPick,
}: {
  country: string;
  value: string;
  onText: (t: string) => void;
  onPick: (p: DkPick) => void;
}) {
  const cc = (country || "").toLowerCase();
  const [items, setItems] = useState<Suggestion[]>([]);
  const [src, setSrc] = useState<"google" | "dawa" | "">("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const seq = useRef(0);              // guards against out-of-order responses
  const tokenRef = useRef(randomToken()); // one Google session token per lookup→select

  // Debounced lookup (≥3 chars, only while the dropdown is open): Google, then DAWA.
  useEffect(() => {
    const query = value.trim();
    if (!open || query.length < 3) { setItems([]); setSrc(""); return; }
    const mine = ++seq.current;
    const t = setTimeout(async () => {
      let list: Suggestion[] = [];
      let source: "google" | "dawa" | "" = "";
      if (MAPS_KEY) {
        const g = await googleAutocomplete(query, cc, tokenRef.current);
        if (mine !== seq.current) return;
        if (g && g.length) { list = g.map((p) => ({ id: p.placeId, text: p.text, src: "google" as const })); source = "google"; }
      }
      if (!list.length && cc === "dk") {
        const d = await dawaAutocomplete(query);
        if (mine !== seq.current) return;
        if (d.length) { list = d; source = "dawa"; }
      }
      if (mine !== seq.current) return;
      setItems(list); setSrc(source); setActive(-1);
    }, 200);
    return () => clearTimeout(t);
  }, [value, cc, open]);

  // Close the dropdown when clicking away.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const close = () => { setOpen(false); setItems([]); setSrc(""); };

  const choose = async (it: Suggestion) => {
    if (it.src === "google") {
      const details = await googlePlaceDetails(it.id, tokenRef.current);
      tokenRef.current = randomToken(); // a Places session ends when details are fetched
      if (details) onPick(details); else onText(it.text);
      close();
      return;
    }
    // DAWA: a full address (has a house number) → fill; otherwise drill down.
    const g = it.dawa!;
    const a = g.adresse || g.adgangsadresse;
    if (a && a.vejnavn && a.husnr && a.postnr) {
      const house = [a.husnr, g.adresse?.etage ? `${g.adresse.etage}.` : "", g.adresse?.dør].filter(Boolean).join(" ").trim();
      onPick({ line1: `${a.vejnavn} ${house}`.trim(), postal: a.postnr, city: a.postnrnavn || "" });
      close();
    } else {
      onText((g.forslagstekst || g.tekst || "").trim());
      setOpen(true);
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open || !items.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(items.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); choose(items[active]); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  const showList = open && items.length > 0;
  return (
    <div ref={boxRef} className="relative">
      <label htmlFor="addr-line1" className="mb-1.5 block text-[0.9rem] font-medium text-ink">Address</label>
      <div className="relative">
        <input
          id="addr-line1"
          type="text"
          value={value}
          autoComplete="off"
          onChange={(e) => { onText(e.target.value); setOpen(true); }}
          onFocus={() => value.trim().length >= 3 && setOpen(true)}
          onKeyDown={onKey}
          placeholder="Address"
          role="combobox"
          aria-expanded={showList}
          aria-controls="addr-list"
          aria-autocomplete="list"
          className={INPUT + " pr-10"}
        />
        <Search aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
      {showList && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-line bg-white shadow-lg">
          <div className="flex items-center justify-between px-3.5 pb-1 pt-2.5">
            <span className="text-[0.72rem] font-semibold uppercase tracking-wide text-muted">Suggestions</span>
            <button type="button" aria-label="Close suggestions" onClick={() => setOpen(false)} className="text-muted hover:text-ink">
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul id="addr-list" role="listbox" className="max-h-64 overflow-auto pb-1">
            {items.map((it, i) => (
              <li
                key={it.id}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => { e.preventDefault(); choose(it); }}
                className={`cursor-pointer px-3.5 py-2.5 text-[0.95rem] ${i === active ? "bg-brand-tint text-brand-dark" : "text-ink-2"}`}
              >
                {it.text}
              </li>
            ))}
          </ul>
          <div className="border-t border-line px-3.5 py-2 text-right">
            <span className="text-[0.72rem] text-muted">
              powered by <span className="font-semibold text-ink-2">{src === "google" ? "Google" : "Danmarks Adresseregister"}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// The full Shopify-style shipping form: country, name, autocompleting Address, city…
function AddressForm({ value, onChange }: { value: Addr; onChange: (next: Addr, complete: boolean) => void }) {
  const set = (patch: Partial<Addr>) => {
    const next = { ...value, ...patch };
    onChange(next, isAddrComplete(next));
  };
  const onPick = (p: DkPick) => {
    const next = { ...value, line1: p.line1 || value.line1, postal: p.postal || value.postal, city: p.city || value.city };
    onChange(next, isAddrComplete(next));
  };
  return (
    <div className="grid gap-3">
      {/* Country / region */}
      <div>
        <label htmlFor="addr-country" className="mb-1.5 block text-[0.9rem] font-medium text-ink">Country/region</label>
        <div className="relative">
          <select
            id="addr-country"
            autoComplete="country"
            value={value.country}
            onChange={(e) => set({ country: e.target.value })}
            className={INPUT + " cursor-pointer appearance-none pr-10"}
          >
            <option value="" disabled>Select country/region</option>
            {COUNTRIES.map(([code, name]) =>
              code === "—" ? (
                <option key="sep" disabled>{name}</option>
              ) : (
                <option key={code} value={code}>{name}</option>
              )
            )}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </div>

      {/* Name */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="addr-first" className="mb-1.5 block text-[0.9rem] font-medium text-ink">
            First name <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="addr-first" type="text" autoComplete="given-name" value={value.first} onChange={(e) => set({ first: e.target.value })} className={INPUT} />
        </div>
        <div>
          <label htmlFor="addr-last" className="mb-1.5 block text-[0.9rem] font-medium text-ink">Last name</label>
          <input id="addr-last" type="text" autoComplete="family-name" value={value.last} onChange={(e) => set({ last: e.target.value })} className={INPUT} />
        </div>
      </div>

      {/* Address (autocomplete) */}
      <AddressLine country={value.country} value={value.line1} onText={(t) => set({ line1: t })} onPick={onPick} />

      {/* Apartment / suite */}
      <div>
        <label htmlFor="addr-line2" className="mb-1.5 block text-[0.9rem] font-medium text-ink">
          Apartment, suite, etc. <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="addr-line2" type="text" autoComplete="address-line2" value={value.line2} onChange={(e) => set({ line2: e.target.value })} className={INPUT} />
      </div>

      {/* Postal code + City */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="addr-postal" className="mb-1.5 block text-[0.9rem] font-medium text-ink">Postal code</label>
          <input id="addr-postal" type="text" inputMode="numeric" autoComplete="postal-code" value={value.postal} onChange={(e) => set({ postal: e.target.value })} className={INPUT} />
        </div>
        <div>
          <label htmlFor="addr-city" className="mb-1.5 block text-[0.9rem] font-medium text-ink">City</label>
          <input id="addr-city" type="text" autoComplete="address-level2" value={value.city} onChange={(e) => set({ city: e.target.value })} className={INPUT} />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="addr-phone" className="mb-1.5 block text-[0.9rem] font-medium text-ink">Phone</label>
        <input id="addr-phone" type="tel" inputMode="tel" autoComplete="tel" value={value.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="For delivery updates" className={INPUT} />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h2 className="mb-3 font-display text-[1.05rem] font-bold">{title}</h2>
      {children}
    </section>
  );
}

function Summary({
  quote,
  shipping,
  code,
  setCode,
  applyCode,
  codeMsg,
  qty,
  ready = true,
}: {
  quote: Quote;
  shipping: ShippingId;
  code: string;
  setCode: (v: string) => void;
  applyCode: () => void;
  codeMsg: string;
  qty: number;
  onQty: (n: number) => void;
  ready?: boolean; // false until the shipping address is filled
}) {
  const [discountOpen, setDiscountOpen] = useState(!!code);
  return (
    <div>
      {/* compact product row — Shopify order-summary style */}
      <div className="flex items-center gap-3">
        <span className="relative shrink-0">
          <img src={PRODUCT_IMG} alt={PRODUCT.title} width={56} height={56} className="h-14 w-14 rounded-lg border border-line object-cover" />
          <span aria-hidden="true" className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-ink text-[0.66rem] font-bold text-white tabular-nums">{qty}</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.92rem] font-semibold leading-tight text-ink">{PRODUCT.title}</p>
          <p className="truncate text-[0.8rem] text-muted">{qty > 1 ? `${money(quote.unitCents)} each` : PRODUCT.sub}</p>
        </div>
        <span className="shrink-0 text-[0.92rem] font-semibold tabular-nums">{money(quote.productCents)}</span>
      </div>

      {/* discount */}
      {!discountOpen ? (
        <button
          onClick={() => setDiscountOpen(true)}
          className="mt-5 inline-flex touch-manipulation items-center gap-1.5 rounded-lg border border-line px-4 py-2.5 text-[0.88rem] font-semibold text-ink transition-colors hover:bg-card"
        >
          <Tag className="h-4 w-4" aria-hidden="true" /> Add discount
        </button>
      ) : (
        <div className="mt-5 flex gap-2">
          <label htmlFor="discount-code" className="sr-only">Discount code</label>
          <input
            id="discount-code"
            name="discount-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyCode()}
            placeholder="Discount code"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            className="min-w-0 flex-1 rounded-lg border border-[#d9dce1] bg-white px-4 py-2.5 text-[0.9rem] outline-none focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand"
          />
          <button
            onClick={applyCode}
            className="shrink-0 touch-manipulation rounded-lg bg-[#e6e8eb] px-5 py-2.5 text-[0.9rem] font-semibold text-ink transition-colors hover:bg-[#dcdfe3]"
          >
            Apply
          </button>
        </div>
      )}
      <p aria-live="polite" className={`mt-2 flex items-center gap-1 text-[0.8rem] ${quote.codeOk ? "text-[#1b8a4e]" : "text-[#d64545]"}`}>
        {codeMsg && (
          <>
            {quote.codeOk && <Check className="h-3.5 w-3.5" aria-hidden="true" />} {codeMsg}
          </>
        )}
      </p>

      {/* totals */}
      <div className="mt-5 space-y-2 border-t border-line pt-4 text-[0.92rem]">
        <div className="flex justify-between text-muted">
          <span>Subtotal</span>
          <span className="tabular-nums">{money(quote.productCents)}</span>
        </div>
        {quote.discountCents > 0 && (
          <div className="flex justify-between text-[#1b8a4e]">
            <span>Discount</span>
            <span className="tabular-nums">&minus;{money(quote.discountCents)}</span>
          </div>
        )}
        <div className="flex justify-between text-muted">
          <span>Shipping{ready ? ` · ${SHIP[shipping].label}` : ""}</span>
          {ready ? (
            <span className={`tabular-nums ${quote.shippingCents === 0 ? "text-[#1b8a4e]" : ""}`}>
              {quote.shippingCents === 0 ? "Free" : money(quote.shippingCents)}
            </span>
          ) : (
            <span className="text-[0.85rem]">Enter address</span>
          )}
        </div>
        <div className="mt-2 flex items-baseline justify-between border-t border-line pt-3">
          <span className="font-display text-[1.1rem] font-bold">Total</span>
          <span>
            <span className="mr-1.5 text-[0.72rem] text-muted">USD</span>
            <span className="font-display text-[1.3rem] font-bold tabular-nums">{money(quote.total)}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// If Stripe keys aren't set yet (or intent creation fails), keep the store working
// by falling back to Stripe's hosted checkout.
function FatalFallback({ message }: { message: string }) {
  const [loading, setLoading] = useState(false);
  const hosted = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "single", qty: readQty() }] }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {}
    setLoading(false);
  };
  return (
    <div className="mx-auto max-w-[520px] px-5 py-20 text-center">
      <p className="text-muted" role="status">{message}</p>
      <button
        onClick={hosted}
        disabled={loading}
        aria-busy={loading}
        className="mt-5 touch-manipulation rounded-full bg-brand px-6 py-3 font-display font-bold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {loading ? "Starting…" : "Continue to secure checkout"}
      </button>
      <p className="mt-4">
        <a href="/product" className="text-[0.85rem] text-muted underline">Back to product</a>
      </p>
    </div>
  );
}
