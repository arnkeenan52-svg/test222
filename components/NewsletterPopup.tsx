"use client";
import { useEffect, useState } from "react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { DISCOUNT_PCT } from "@/lib/newsletter";
import { X } from "lucide-react";

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!localStorage.getItem("fc_news");
    } catch {}
    if (seen) return;
    // show after a short delay, once per visitor
    const t = setTimeout(() => setOpen(true), 7000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    try {
      localStorage.setItem("fc_news", "1");
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} aria-hidden />
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-4xl bg-paper p-8 text-center shadow-soft">
        <button onClick={close} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-card">
          <X className="h-5 w-5" />
        </button>
        <div className="mx-auto mb-3 inline-flex rounded-full bg-brand-tint px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-brand">
          Limited offer
        </div>
        <h2 className="font-display text-[1.9rem] font-bold leading-tight text-ink">
          {DISCOUNT_PCT}% off your<br />first FadeClipper
        </h2>
        <p className="mx-auto mb-6 mt-3 max-w-[34ch] text-[0.95rem] text-muted">
          Join the newsletter and we&rsquo;ll send your {DISCOUNT_PCT}% code straight away.
        </p>
        <NewsletterForm tone="light" />
        <button onClick={close} className="mt-4 text-[0.8rem] text-muted underline hover:text-ink">
          No thanks, I&rsquo;ll pay full price
        </button>
      </div>
    </div>
  );
}
