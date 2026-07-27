import { NewsletterForm } from "@/components/NewsletterForm";
import { DISCOUNT_PCT } from "@/lib/newsletter";

export function Newsletter() {
  return (
    <section id="newsletter" className="px-3 pb-10">
      <div className="container-x overflow-hidden rounded-5xl bg-ink px-6 py-[clamp(3rem,6vw,5rem)] text-center text-white">
        <p className="eyebrow mb-4 !text-brand">Join the list</p>
        <h2 className="mx-auto max-w-[16ch] font-display text-[clamp(2rem,4.4vw,3rem)] font-bold leading-tight text-white">
          Get {DISCOUNT_PCT}% off your first fade.
        </h2>
        <p className="mx-auto mb-8 mt-4 max-w-[46ch] text-[1.05rem] text-white/70">
          Drop your email and we&rsquo;ll send a {DISCOUNT_PCT}% code, plus fade tips and early access to drops.
        </p>
        <div className="mx-auto max-w-[520px]">
          <NewsletterForm tone="dark" />
        </div>
      </div>
    </section>
  );
}
