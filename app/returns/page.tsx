import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Returns & refunds — FadeClipper",
  description: "Our 90-day money-back guarantee, how to start a return, and how refunds work.",
};

export default function ReturnsPage() {
  return (
    <PageShell
      title="Returns &amp; refunds"
      updated="June 24, 2026"
      intro="Try FadeClipper risk-free. If it isn't for you, sending it back is simple."
    >
      <h2>90-day money-back guarantee</h2>
      <p>
        If you&apos;re not happy with your FadeClipper, you can return it within <strong>90 days</strong> of delivery for
        a refund of the purchase price. We want you keeping it because you love it — not because you&apos;re stuck with
        it.
      </p>

      <h2>Your statutory right to cancel (EU/UK)</h2>
      <p>
        Separately from our guarantee, if you&apos;re in the EU/UK you have the right to withdraw from your purchase
        within <strong>14 days</strong> of receiving it, for any reason. Our 90-day guarantee is in addition to — and
        more generous than — this statutory right.
      </p>

      <h2>How to start a return</h2>
      <ul>
        <li>Email <a href="mailto:hello@fadeclipper.com">hello@fadeclipper.com</a> with your order number and the reason for the return.</li>
        <li>We&apos;ll reply with return instructions and the return address.</li>
        <li>Pack the item securely (ideally in its original packaging) and ship it back.</li>
      </ul>
      <p>Please don&apos;t send anything back before contacting us — returns without instructions can&apos;t be tracked to your order.</p>

      <h2>Condition</h2>
      <p>
        For hygiene reasons we ask that the clipper and blades be clean. Items should be returned in good condition with
        all included accessories. We may reduce a refund to reflect any loss in value from handling beyond what&apos;s
        needed to try the product.
      </p>

      <h2>Refunds</h2>
      <p>
        Once we receive and check your return, we&apos;ll process your refund to your original payment method within{" "}
        <strong>14 days</strong>. Your bank or card provider may take a few extra days to post it.
      </p>

      <h2>Return shipping</h2>
      <p>
        Unless the item arrived faulty or incorrect, return shipping is the customer&apos;s responsibility. If your item
        is defective or we sent the wrong product, we&apos;ll cover it — just let us know.
      </p>

      <h2>Faulty items &amp; warranty</h2>
      <p>
        FadeClipper is covered by a <strong>1-year warranty</strong> against manufacturing defects. If something stops
        working as it should, email us with your order number and a short description (a photo or video helps) and
        we&apos;ll repair, replace, or refund it.
      </p>
    </PageShell>
  );
}
