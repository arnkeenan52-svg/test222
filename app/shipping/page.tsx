import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Shipping policy — FadeClipper",
  description: "Processing times, delivery estimates, tracking, and shipping costs for FadeClipper orders.",
};

export default function ShippingPage() {
  return (
    <PageShell
      title="Shipping policy"
      updated="June 24, 2026"
      intro="Here's how and when your FadeClipper gets to you."
    >
      <h2>Processing time</h2>
      <p>
        Orders are processed within <strong>1–2 business days</strong> (Mon–Fri, excluding holidays). You&apos;ll get a
        confirmation email when you order and a second email with tracking once it ships.
      </p>

      <h2>Delivery estimates</h2>
      <p>Once shipped, estimated delivery times are:</p>
      <ul>
        <li><strong>Domestic:</strong> 3–5 business days</li>
        <li><strong>Europe:</strong> 5–10 business days</li>
        <li><strong>Rest of world:</strong> 7–21 business days</li>
      </ul>
      <p>These are estimates, not guarantees — carrier and customs delays can occasionally add time.</p>

      <h2>Shipping cost</h2>
      <p>
        <strong>Free worldwide shipping</strong> is included on every order. Any price shown at checkout is the final
        shipping cost.
      </p>

      <h2>Tracking</h2>
      <p>
        Your tracking link is in your shipping confirmation email. If it hasn&apos;t updated within a few business days,
        give it a little time — then reach out at <a href="mailto:fadeclipper@gmail.com">fadeclipper@gmail.com</a>.
      </p>

      <h2>Customs, duties &amp; taxes</h2>
      <p>
        International orders may be subject to import duties or taxes set by your country. These are not included in your
        order total and are the responsibility of the recipient.
      </p>

      <h2>Wrong address or undeliverable parcels</h2>
      <p>
        Please double-check your shipping address at checkout. If a parcel is returned to us as undeliverable, we&apos;ll
        contact you to arrange re-shipment or a refund.
      </p>

      <h2>Questions</h2>
      <p>
        Email <a href="mailto:fadeclipper@gmail.com">fadeclipper@gmail.com</a> with your order number and we&apos;ll
        help.
      </p>
    </PageShell>
  );
}
