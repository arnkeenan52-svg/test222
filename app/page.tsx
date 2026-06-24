import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/SiteNav";
import { PressBar } from "@/components/PressBar";
import { HowItWorks } from "@/components/HowItWorks";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Logo } from "@/components/Logo";
import { Scissors, Ruler, BatteryCharging, Gauge, Droplets, Lock, Check, Plus, Star, Play, ArrowRight } from "lucide-react";

const features = [
  { icon: Scissors, title: "Auto-fade blade", text: "Static + moving blades taper the cut so the fade blends itself." },
  { icon: Ruler, title: "Four fade lengths", text: "Switch 0.4, 0.8 and 1.2mm with one lever." },
  { icon: BatteryCharging, title: "240-min runtime", text: "Weeks of fades per charge, with a live battery display." },
  { icon: Gauge, title: "Adjustable power", text: "Dial RPM up for thick hair, down for detail." },
  { icon: Droplets, title: "Fully waterproof", text: "Fade in the shower; rinse it clean under the tap." },
  { icon: Lock, title: "Safety lock", text: "Lock your settings so nothing shifts mid-fade." },
];

// NOTE: photos are AI-generated and quotes/names are placeholders.
// Replace with REAL customer photos + reviews before running ads.
const reviews = [
  { q: "First try and the back faded itself. I've stopped booking touch-ups.", a: "Marcus T.", img: "/assets/img/person-1.jpg" },
  { q: "I'm not skilled and it still looked like a shop fade. Unreal.", a: "Dani R.", img: "/assets/img/person-2.jpg" },
  { q: "Battery lasts forever and it's waterproof, so cleanup is ten seconds.", a: "Jay K.", img: "/assets/img/person-3.jpg" },
];

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
      <SiteNav />

      <main id="top">
        {/* HERO (dark) */}
        <header className="relative -mt-[60px] overflow-hidden bg-black pt-[60px] text-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(236,99,36,0.25),transparent_70%)]" />
          <div className="container-x relative flex flex-col items-center pb-[clamp(3rem,6vw,5rem)] pt-[clamp(1.5rem,4vw,3rem)] text-center">
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
              <Button asChild size="lg"><a href="#buy">Order now &mdash; $59</a></Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white hover:text-ink">
                <a href="#how"><Play className="h-4 w-4 fill-current" /> See how it works</a>
              </Button>
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

        {/* AS SEEN IN */}
        <PressBar />

        {/* HOW DOES IT WORK */}
        <Section>
          <Head center eyebrow="60-second setup" title="How does it work?" sub="No experience needed. If you can comb your hair, you can run a FadeClipper." />
          <Reveal><HowItWorks /></Reveal>
        </Section>

        {/* WHY BETTER */}
        <Section alt id="compare">
          <Head center eyebrow="The difference" title="Why FadeClipper beats ordinary clippers." sub="The auto-fade blade does what regular clippers can't — and what the barber charges you for, on repeat." />
          <Reveal><div className="rounded-4xl bg-white p-4 shadow-card md:p-7"><ComparisonTable /></div></Reveal>
        </Section>

        {/* FEATURES */}
        <Section id="reviews">
          <Head center eyebrow="Real people, real fades" title="Trusted by people who fade at home now." />
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={(i % 3) * 0.07} className="w-[78%] shrink-0 snap-center sm:w-[60%] md:w-auto">
                <figure className="relative h-full overflow-hidden rounded-4xl bg-ink">
                  <img src={r.img} alt={`${r.a} holding a FadeClipper`} className="aspect-[3/4] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="flex text-brand">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}</span>
                    <blockquote className="mt-2 text-[1rem] font-medium leading-snug">&ldquo;{r.q}&rdquo;</blockquote>
                    <p className="mt-2 text-[0.82rem] text-white/70">{r.a} &middot; verified buyer</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Section>

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
                    <span className="font-display text-[3rem] font-bold leading-none text-brand">$59</span>
                    <span className="text-[1.3rem] text-muted line-through">$99</span>
                  </div>
                  <p className="mt-2 text-[0.84rem] text-muted">One-time payment · pays for itself in ~2 haircuts</p>
                  <Button asChild size="lg" className="mt-5 w-full"><a href="#">Get FadeClipper <ArrowRight className="h-4 w-4" /></a></Button>
                  <p className="mt-3 text-[0.74rem] text-muted">Secure checkout · Visa · Mastercard · PayPal</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* GUARANTEE */}
        <Section>
          <Reveal className="mx-auto flex max-w-[680px] flex-col items-center gap-3 rounded-5xl bg-card p-9 text-center">
            <div>
              <h3 className="font-display text-[1.4rem] font-bold">Fade with zero risk.</h3>
              <p className="mt-2 text-muted">Try FadeClipper for 90 days. If your fades aren't sharper, easier and cheaper than the barber, send it back for a full refund.</p>
            </div>
          </Reveal>
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
            <Button asChild size="lg" variant="invert"><a href="#buy">Get FadeClipper — $59</a></Button>
            <p className="mt-5 text-[0.8rem] text-white/50">90-day money-back guarantee · Free worldwide shipping</p>
          </Reveal>
        </section>
      </main>

      <footer className="bg-paper-alt py-14">
        <div className="container-x grid gap-8 md:grid-cols-[1.7fr_1fr_1fr]">
          <div>
            <span className="text-ink"><Logo /></span>
            <p className="mt-4 max-w-[30ch] text-[0.9rem] text-muted">The auto-fading clipper. One swipe, fade done.</p>
          </div>
          <nav className="flex flex-col gap-3 text-[0.9rem] text-muted">
            <a href="#how" className="hover:text-ink">How it works</a>
            <a href="#compare" className="hover:text-ink">Why FadeClipper</a>
            <a href="#reviews" className="hover:text-ink">Reviews</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
          </nav>
          <nav className="flex flex-col gap-3 text-[0.9rem] text-muted">
            <a href="#" className="hover:text-ink">Shipping &amp; returns</a>
            <a href="#" className="hover:text-ink">Contact</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <a href="#" className="hover:text-ink">Privacy</a>
          </nav>
        </div>
        <div className="container-x mt-10 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[0.8rem] text-muted">
          <span>© {new Date().getFullYear()} FadeClipper. All rights reserved.</span>
          <span>hello@fadeclipper.com</span>
        </div>
      </footer>
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
