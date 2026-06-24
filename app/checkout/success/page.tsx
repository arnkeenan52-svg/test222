"use client";
import { useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartProvider";
import { CheckCircle2, Truck } from "lucide-react";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  // Payment completed on Stripe — empty the cart.
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-line">
        <div className="container-x flex items-center justify-between py-5">
          <a href="/" aria-label="FadeClipper home" className="text-ink">
            <Logo />
          </a>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-[clamp(3rem,8vw,6rem)]">
        <div className="w-full max-w-[520px] text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-tint">
            <CheckCircle2 className="h-9 w-9 text-brand" />
          </div>
          <h1 className="mt-6 font-display text-[clamp(1.8rem,4vw,2.4rem)] font-bold">Thank you — your order is in!</h1>
          <p className="mx-auto mt-3 max-w-[42ch] text-[1.02rem] text-muted">
            Payment received. A confirmation email with your receipt is on its way.
          </p>
          <div className="mx-auto mt-6 flex max-w-[360px] items-center gap-3 rounded-2xl border border-line bg-white p-4 text-left">
            <Truck className="h-5 w-5 shrink-0 text-brand" />
            <p className="text-[0.9rem] text-ink-2">
              <b>Free shipping</b> — your FadeClipper arrives in about <b>7–10 business days</b>.
            </p>
          </div>
          <Button asChild size="lg" className="mt-8">
            <a href="/">Back to home</a>
          </Button>
        </div>
      </main>
    </div>
  );
}
