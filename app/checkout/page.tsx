"use client";
import { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  ExpressCheckoutElement,
  AddressElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PRODUCTS } from "@/lib/products";
import { Lock, ShieldCheck, Truck, Zap, Check, ChevronDown, Tag } from "lucide-react";

type ShippingId = "standard" | "express";
const SHIP: Record<ShippingId, { label: string; cents: number; eta: string }> = {
  standard: { label: "Standard shipping", cents: 0, eta: "7–10 business days" },
  express: { label: "Express shipping", cents: 1200, eta: "2–3 business days" },
};
type Quote = { productCents: number; shippingCents: number; discountCents: number; total: number; codeOk: boolean };

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const PRODUCT = PRODUCTS.single;
const PRODUCT_IMG = "/assets/img/packaging.jpg";

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [piId, setPiId] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [fatal, setFatal] = useState("");
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return; // run once
    started.current = true;
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
          body: JSON.stringify({ shipping: "standard" }),
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
          <CheckoutInner clientSecret={clientSecret} piId={piId} quote={quote} setQuote={setQuote} />
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
}: {
  clientSecret: string;
  piId: string;
  quote: Quote;
  setQuote: (q: Quote) => void;
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

  const recomputeAsync = async (nextShipping: ShippingId, nextCode: string, announce = false) => {
    try {
      const res = await fetch("/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: piId, shipping: nextShipping, code: nextCode || null }),
      });
      const d = await res.json();
      if (d.total != null) {
        setQuote(d);
        if (announce) setCodeMsg(d.codeOk ? "Discount applied." : "That code isn’t valid.");
      }
    } catch {}
  };
  const recompute = (nextShipping: ShippingId, nextCode: string, announce = false) => {
    void recomputeAsync(nextShipping, nextCode, announce);
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
      lineItems: [{ name: PRODUCT.title, amount: Math.max(0, quote.productCents - quote.discountCents) }],
      shippingRates: [
        { id: "standard", displayName: "Standard shipping (7–10 business days)", amount: SHIP.standard.cents },
        { id: "express", displayName: "Express shipping (2–3 business days)", amount: SHIP.express.cents },
      ],
    });
  const onExpressShippingRateChange = async ({ shippingRate, resolve }: any) => {
    const next: ShippingId = shippingRate?.id === "express" ? "express" : "standard";
    setShipping(next);
    await recomputeAsync(next, code);
    resolve();
  };

  const chooseShipping = (id: ShippingId) => {
    setShipping(id);
    recompute(id, code);
  };

  const applyCode = () => {
    recompute(shipping, code, true);
  };

  const pay = async () => {
    if (!stripe || !elements || paying) return;
    setPaying(true);
    setPayErr("");
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success` },
    });
    // Only reached if there's an immediate validation error (otherwise redirects away).
    if (error) setPayErr(error.message || "Payment could not be completed.");
    setPaying(false);
  };

  return (
    <div className="mx-auto grid max-w-[1100px] gap-0 md:grid-cols-2">
      {/* mobile collapsible summary */}
      <button
        onClick={() => setSummaryOpen((v) => !v)}
        className="flex touch-manipulation items-center justify-between border-b border-line bg-paper-alt px-5 py-3 text-[0.9rem] md:hidden"
        aria-expanded={summaryOpen}
        aria-controls="order-summary-mobile"
      >
        <span className="flex items-center gap-2 font-medium text-brand">
          Order summary
          <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
        </span>
        <span className="font-display text-[1.1rem] font-bold tabular-nums">{money(quote.total)}</span>
      </button>
      {summaryOpen && (
        <div id="order-summary-mobile" className="border-b border-line bg-paper-alt px-5 py-5 md:hidden">
          <Summary quote={quote} shipping={shipping} code={code} setCode={setCode} applyCode={applyCode} codeMsg={codeMsg} />
        </div>
      )}

      {/* form */}
      <main className="order-2 px-5 py-8 md:order-1 md:py-12 md:pr-12">
        <div className="mx-auto max-w-[520px]">
          {/* Express checkout — Apple Pay / Google Pay / Link */}
          <div className={hasExpress ? "mb-6" : ""}>
            {hasExpress && <p className="mb-3 text-center text-[0.9rem] font-medium text-muted">Express checkout</p>}
            <ExpressCheckoutElement
              options={{ buttonHeight: 48 }}
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
            <LinkAuthenticationElement />
          </Section>

          <Section title="Delivery">
            {/* mode:shipping gives a country dropdown + Google-style address autocomplete */}
            <AddressElement
              options={{
                mode: "shipping",
                display: { name: "split" },
                fields: { phone: "always" },
                autocomplete: { mode: "automatic" },
              }}
            />
          </Section>

          <Section title="Shipping method">
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
                        <span className="flex items-center gap-1.5 font-medium">
                          {id === "express" ? <Zap className="h-4 w-4 text-brand" aria-hidden="true" /> : <Truck className="h-4 w-4 text-brand" aria-hidden="true" />}
                          {s.label}
                        </span>
                        <span className="text-[0.82rem] text-muted">{s.eta}</span>
                      </span>
                    </span>
                    <span className="font-semibold tabular-nums">{s.cents === 0 ? "FREE" : money(s.cents)}</span>
                  </label>
                );
              })}
            </div>
          </Section>

          <Section title="Payment">
            <p className="mb-3 flex items-center gap-1.5 text-[0.8rem] text-muted">
              <ShieldCheck className="h-4 w-4 text-brand" aria-hidden="true" /> All transactions are secure and encrypted.
            </p>
            {/* Apple Pay / Google Pay / Link appear as fast-pay buttons when available */}
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

      {/* desktop summary */}
      <aside className="order-1 hidden border-l border-line bg-paper-alt px-5 py-12 md:order-2 md:block md:pl-12">
        <div className="sticky top-8 max-w-[420px]">
          <Summary quote={quote} shipping={shipping} code={code} setCode={setCode} applyCode={applyCode} codeMsg={codeMsg} />
        </div>
      </aside>
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
}: {
  quote: Quote;
  shipping: ShippingId;
  code: string;
  setCode: (v: string) => void;
  applyCode: () => void;
  codeMsg: string;
}) {
  const [discountOpen, setDiscountOpen] = useState(!!code);
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="relative shrink-0">
          <img src={PRODUCT_IMG} alt={PRODUCT.title} width={64} height={64} className="h-16 w-16 rounded-xl border border-line object-cover" />
          <span aria-hidden="true" className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-ink text-[0.72rem] font-bold text-white">1</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight">
            {PRODUCT.title} <span className="sr-only">, quantity 1</span>
          </p>
          <p className="truncate text-[0.82rem] text-muted">{PRODUCT.sub}</p>
        </div>
        <span className="font-semibold tabular-nums">{money(quote.productCents)}</span>
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
          <span>Shipping &middot; {SHIP[shipping].label}</span>
          <span className={`tabular-nums ${quote.shippingCents === 0 ? "text-[#1b8a4e]" : ""}`}>
            {quote.shippingCents === 0 ? "Free" : money(quote.shippingCents)}
          </span>
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
        body: JSON.stringify({ items: [{ id: "single", qty: 1 }] }),
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
