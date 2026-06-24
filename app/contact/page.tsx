import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact us — FadeClipper",
  description: "Get in touch with the FadeClipper team — we usually reply within one business day.",
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact us"
      intro="A real person reads every message. We usually reply within one business day (Mon–Fri)."
    >
      <h2>Email</h2>
      <p>
        For order help, product questions, returns, or anything else, email{" "}
        <a href="mailto:hello@fadeclipper.com">hello@fadeclipper.com</a>.
      </p>
      <p>
        To help us sort it fast, please include your <strong>order number</strong> (from your confirmation email) and a
        short description of what you need.
      </p>

      <h2>Support hours</h2>
      <p>Monday to Friday, 9:00–17:00 [CET]. Messages sent over the weekend are answered the next business day.</p>

      <h2>Common questions</h2>
      <ul>
        <li><strong>Where&apos;s my order?</strong> See our <a href="/shipping">Shipping page</a> for processing and delivery times.</li>
        <li><strong>I want to return it.</strong> Start with our <a href="/returns">Returns &amp; refunds page</a>.</li>
        <li><strong>How does it work?</strong> The <a href="/#how">How it works</a> section walks through it step by step.</li>
      </ul>

      <h2>Business details</h2>
      <p>
        FadeClipper is operated by [Your Company Legal Name], [Registered Address], [Country]. Company / VAT no.
        [number].
      </p>
    </PageShell>
  );
}
