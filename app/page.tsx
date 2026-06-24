import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { PressBar } from "@/components/PressBar";
import { HowItWorks } from "@/components/HowItWorks";
import { WatchDemo } from "@/components/WatchDemo";
import { ComparisonTable } from "@/components/ComparisonTable";
import { RedditReviews } from "@/components/RedditReviews";
import { Price } from "@/components/Price";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, Plus, Star, ArrowRight } from "lucide-react";

const faqs: [string, string][] = [
  ["Can I really fade the back of my own head?", "Yes — that's exactly what FadeClipper is built for. The tapered 45° auto-fade blade blends the gradient as you glide up, so you don't need barber-level skill or two mirrors. Most people get a clean back fade on the first or second try."],
  ["Is it hard to use if I've never faded before?", "No. Pick a length, glide up, flick out — the blade does the blending. Follow the four steps above and you'll have a sharp fade in minutes."],
  ["How long does the battery last?", "Up to 240 minutes of cordless runtime per charge — weeks of fades. The display shows exactly how many minutes remain, and it charges over USB-C on the dock."],
  ["Is it actually waterproof?", "Yes. You can fade in the shower and rinse the whole clipper under the tap. Cleanup takes about ten seconds."],
  ["What if I don't like it?", "You're covered by a 90-day money-back guarantee. If it isn't for you, send it back for a full refund."],
];

export default function Page() {
  return (
    <>
      {/* TOP — nav + hero live in ONE black box behind a SINGLE glow, so there is
          no seam between the logo/menu bar and the hero. */}
      <div id="top" className="relative overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(90%_60%_at_50%_15%,rgba(236,99,36,0.32),transparent_70%)]" />
        <div className="relative">
          <SiteNav onDark />
          <header>
            <div className="container-x flex flex-col items-center pb-[clamp(3rem,6vw,5rem)] pt-[clamp(1.5rem,4vw,3rem)] text-center">
              <div className="mb-5 flex items-center gap-2">
                <span className="flex text-brand">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-[18px] w-[18px] fill-current" />)}
                </span>
                <span className="text-sm font-medium text-white/70"><b className="text-white">1,200+</b> reviews</span>
              </div>
              <h1 className="font-display text-[clamp(2.6rem,6.4vw,4.6rem)] font-bold leading-[1.0] tracking-[-0.02em]">
                Fade your own hair.<br />
                <span className="text-brand">In minutes.</span>
              </h1>
              <p className="mt-5 max-w-[42ch] text-[1.12rem] text-white/65">
                The auto-fading clipper with a 45&deg; blade that blends the gradient for you &mdash;{" "}
                <span className="underline decoration-white/30 underline-offset-2">no skill needed</span>.
              </p>
              <div className="mt-7 flex w-full max-w-[360px] flex-col gap-3">
                <Button asChild size="lg"><a href="/product">Order now &mdash; <Price usd={59} /></a></Button>
                <WatchDemo />
              </div>
              <Reveal className="mt-10 w-full max-w-[620px]">
                <figure className="overflow-hidden rounded-5xl border border-white/10 shadow-soft">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/img/product-hero-dark.jpg"
                    aria-label="FadeClipper auto-fading cordless hair clipper"
                    className="aspect-[4/3] w-full object-cover"
                  >
                    <source src="/assets/video/hero-zoom.mp4" type="video/mp4" />
                  </video>
                </figure>
              </Reveal>
            </div>
          </header>
        </div>
      </div>

      <main>
        {/* AS SEEN IN */}
        <PressBar />

        {/* HOW DOES IT WORK */}
        <Section id="how">
          <Head center eyebrow="60-second setup" title="How does it work?" sub="No experience needed. If you can comb your hair, you can run a FadeClipper." />
          <Reveal><HowItWorks /></Reveal>
        </Section>

        {/* WHY BETTER */}
        <Section alt id="compare">
          <Head center eyebrow="The difference" title="Why FadeClipper beats ordinary clippers." sub="The auto-fade blade does what regular clippers can't — and what the barber charges you for, on repeat." />
          <Reveal><div className="rounded-4xl bg-white p-4 shadow-card md:p-7"><ComparisonTable /></div></Reveal>
        </Section>

        {/* TRUSTED BY PEOPLE — real Reddit posts */}
        <RedditReviews />

        {/* OFFER */}
        <Section alt id="buy">
          <div className="mx-auto max-w-[760px]">
            <div className="overflow-hidden rounded-5xl bg-white shadow-soft">
              <div className="bg-brand px-6 py-3 text-center text-sm font-semibold text-white">Launch sale — save 40% today</div>
              <div className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
                <div>
                  <h2 className="font-display text-[2rem] font-bold leading-tight">Skip six barber visits. Keep the clipper.</h2>
                  <ul className="mt-5 grid gap-2.5">
                    {["FadeClipper + full accessory kit", "Free worldwide shipping", "90-day money-back guarantee", "1-year warranty"].map((t) => (
                      <li key={t} className="flex items-center gap-2.5 text-[0.98rem] text-ink-2">
                        <Check className="h-4 w-4 shrink-0 text-brand" strokeWidth={3} />{t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center rounded-4xl bg-card p-7 text-center">
                  <div className="flex items-baseline justify-center gap-2.5">
                    <Price usd={59} className="font-display text-[3rem] font-bold leading-none text-brand" />
                    <Price usd={99} className="text-[1.3rem] text-muted line-through" />
                  </div>
                  <p className="mt-2 text-[0.84rem] text-muted">One-time payment · pays for itself in ~2 haircuts</p>
                  <Button asChild size="lg" className="mt-5 w-full"><a href="/product">Get FadeClipper <ArrowRight className="h-4 w-4" /></a></Button>
                  <p className="mt-3 text-[0.74rem] text-muted">Secure checkout · Visa · Mastercard · PayPal</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section alt id="faq">
          <Head center eyebrow="Questions" title="Everything you're wondering." />
          <div className="mx-auto grid max-w-[720px] gap-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-4xl bg-white px-6 shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[1.04rem] font-semibold [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus className="h-5 w-5 shrink-0 text-brand transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="max-w-[60ch] pb-5 text-[0.97rem] text-muted">{a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* FINAL CTA */}
        <section className="px-3 pb-10">
          <Reveal className="container-x overflow-hidden rounded-5xl bg-ink px-6 py-[clamp(3.5rem,7vw,6rem)] text-center text-white">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold text-white">Your next fade is on you.</h2>
            <p className="mx-auto mb-7 mt-4 max-w-[42ch] text-[1.06rem] text-white/70">The auto-fading clipper that turns a barber-only skill into a one-swipe move.</p>
            <Button asChild size="lg" variant="invert"><a href="/product">Get FadeClipper — <Price usd={59} /></a></Button>
            <p className="mt-5 text-[0.8rem] text-white/50">90-day money-back guarantee · Free worldwide shipping</p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function Section({ id, alt, children }: { id?: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={alt ? "bg-paper-alt py-[clamp(3.5rem,7vw,6rem)]" : "py-[clamp(3.5rem,7vw,6rem)]"}>
      <div className="container-x">{children}</div>
    </section>
  );
}

function Head({ eyebrow, title, sub, center }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-[640px] ${center ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-bold leading-[1.08]">{title}</h2>
      {sub && <p className={`mt-4 text-[1.06rem] text-muted ${center ? "mx-auto" : ""} max-w-[52ch]`}>{sub}</p>}
    </div>
  );
}
