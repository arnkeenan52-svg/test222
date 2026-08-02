"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Send } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/30";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.ok) {
        setEmail(String(data.email || ""));
        setStatus("done");
        form.reset();
      } else {
        setStatus("error");
        setError(d.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error — please try again.");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-brand-tint/60 p-6 not-prose" role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1b8a4e] text-white">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <div>
            <p className="font-display text-[1.1rem] font-bold text-ink">Message sent — thank you!</p>
            <p className="mt-1 text-[0.92rem] text-ink-2">
              We&rsquo;ve emailed a confirmation to <span className="font-medium text-ink">{email}</span> and will reply within one
              business day.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="not-prose grid gap-4" noValidate>
      {/* honeypot — hidden from users, catches bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="cf-name" className="text-[0.85rem] font-semibold text-ink">Name</label>
          <input id="cf-name" name="name" autoComplete="name" className={inputCls} placeholder="Your name" />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="cf-email" className="text-[0.85rem] font-semibold text-ink">
            Email <span className="text-brand">*</span>
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" inputMode="email" className={inputCls} placeholder="you@example.com" />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="cf-order" className="text-[0.85rem] font-semibold text-ink">
          Order number <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="cf-order" name="orderNo" autoComplete="off" className={inputCls} placeholder="e.g. A1B2C3D4 — from your confirmation email" />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="cf-message" className="text-[0.85rem] font-semibold text-ink">
          How can we help? <span className="text-brand">*</span>
        </label>
        <textarea id="cf-message" name="message" required rows={5} className={`${inputCls} resize-y min-h-[120px]`} placeholder="Tell us what you need…" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" disabled={status === "sending"} className="touch-manipulation">
          {status === "sending" ? "Sending…" : <>Send message <Send className="h-4 w-4" /></>}
        </Button>
        <span className="text-[0.85rem] text-muted">We usually reply within one business day.</span>
      </div>

      <p role="alert" aria-live="assertive" className="min-h-[1.2em] text-[0.88rem] text-brand">
        {status === "error" ? error : ""}
      </p>
    </form>
  );
}
