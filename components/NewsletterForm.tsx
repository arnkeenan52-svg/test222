"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DISCOUNT_CODE, DISCOUNT_PCT } from "@/lib/newsletter";
import { Check, Copy, Sparkles } from "lucide-react";

export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);

  const dark = tone === "dark";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading") return;
    setErr("");
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) setState("done");
      else {
        setErr(data.error || "Something went wrong. Try again.");
        setState("idle");
      }
    } catch {
      setErr("Network error — please try again.");
      setState("idle");
    }
  };

  const copy = () => {
    try {
      navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  if (state === "done") {
    return (
      <div className="text-center">
        <div className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${dark ? "bg-white/10" : "bg-brand-tint"}`}>
          <Sparkles className="h-7 w-7 text-brand" />
        </div>
        <p className={`mt-4 font-display text-[1.15rem] font-bold ${dark ? "text-white" : "text-ink"}`}>You&rsquo;re in! Here&rsquo;s your {DISCOUNT_PCT}% off:</p>
        <button
          onClick={copy}
          className={`mt-4 inline-flex items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-3 font-display text-[1.3rem] font-bold tracking-wide ${dark ? "border-white/25 text-white" : "border-brand/40 text-brand"}`}
        >
          {DISCOUNT_CODE}
          {copied ? <Check className="h-5 w-5 text-[#1b8a4e]" /> : <Copy className="h-5 w-5 opacity-60" />}
        </button>
        <p className={`mt-3 text-[0.82rem] ${dark ? "text-white/60" : "text-muted"}`}>
          Enter it at checkout to save {DISCOUNT_PCT}%. We emailed you a copy too.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className={`h-13 flex-1 rounded-full px-5 py-3.5 text-[1rem] outline-none transition-colors ${
            dark
              ? "border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white/50"
              : "border border-line bg-white text-ink placeholder:text-muted focus:border-brand"
          }`}
        />
        <Button type="submit" size="lg" disabled={state === "loading"} className="shrink-0">
          {state === "loading" ? "Sending…" : `Get ${DISCOUNT_PCT}% off`}
        </Button>
      </div>
      {err && <p className="mt-2 px-2 text-[0.82rem] text-brand">{err}</p>}
      <p className={`mt-2.5 px-2 text-[0.78rem] ${dark ? "text-white/55" : "text-muted"}`}>
        Join the list for fade tips &amp; drops. No spam — unsubscribe anytime.
      </p>
    </form>
  );
}
