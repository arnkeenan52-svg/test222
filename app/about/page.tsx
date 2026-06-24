import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About us — FadeClipper",
  description: "Why we built FadeClipper — the auto-fading clipper that brings a barber-quality fade home.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="About FadeClipper"
      intro="We think a sharp fade shouldn't mean a standing appointment, a long drive, or another $40 at the chair."
    >
      <h2>The problem we set out to fix</h2>
      <p>
        A clean fade is the hardest cut to do yourself. It takes a steady hand, two mirrors, and years of practice to
        blend the gradient that a barber makes look effortless. So most people just keep paying — visit after visit,
        month after month.
      </p>
      <p>
        FadeClipper started with a simple question: what if the blade did the blending for you?
      </p>

      <h2>What makes it different</h2>
      <p>
        FadeClipper pairs a static and a moving blade that taper the cut as you glide, so the fade blends itself instead
        of relying on barber-level skill. Add adjustable fade lengths, a long cordless runtime, a waterproof body, and a
        safety lock, and a fresh fade becomes a two-minute job you can do at home — first try.
      </p>

      <h2>What we stand for</h2>
      <ul>
        <li><strong>Honest products.</strong> We&apos;d rather under-promise and over-deliver than hype.</li>
        <li><strong>Real support.</strong> A person reads your email, and we back every clipper with a money-back guarantee.</li>
        <li><strong>Built to last.</strong> One purchase that pays for itself in a couple of haircuts — not a subscription.</li>
      </ul>

      <h2>Get in touch</h2>
      <p>
        Questions, feedback, or just want to show off your fade? Email us at{" "}
        <a href="mailto:hello@fadeclipper.com">hello@fadeclipper.com</a> or head to our{" "}
        <a href="/contact">contact page</a>.
      </p>
    </PageShell>
  );
}
