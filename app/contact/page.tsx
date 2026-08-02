import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";

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
      <h2>Send us a message</h2>
      <p>
        Fill in the form below and it lands straight in our inbox — include your <strong>order number</strong> (from your
        confirmation email) if it&apos;s about an existing order, so we can sort it fast.
      </p>

      <ContactForm />

      <h2>Prefer email?</h2>
      <p>
        You can also reach us directly at <a href="mailto:contact@fadeclipper.com">contact@fadeclipper.com</a>.
      </p>

      <h2>Support hours</h2>
      <p>Monday to Friday, 9:00–17:00 CET. Messages sent over the weekend are answered the next business day.</p>

      <h2>Common questions</h2>
      <ul>
        <li><strong>Where&apos;s my order?</strong> See our <a href="/shipping">Shipping page</a> for processing and delivery times.</li>
        <li><strong>I want to return it.</strong> Start with our <a href="/returns">Returns &amp; refunds page</a>.</li>
        <li><strong>How does it work?</strong> The <a href="/#how">How it works</a> section walks through it step by step.</li>
      </ul>

      <h2>Business details</h2>
      <p>
        FadeClipper is an independent online store. For business, press or legal enquiries, email{" "}
        <a href="mailto:contact@fadeclipper.com">contact@fadeclipper.com</a> and we&apos;ll get back to you.
      </p>
    </PageShell>
  );
}
