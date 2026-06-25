import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms & conditions — FadeClipper",
  description: "The terms that apply when you use the FadeClipper website and place an order.",
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms &amp; conditions"
      updated="June 24, 2026"
      intro="These terms govern your use of this website and any purchase you make from us. By using the site or ordering, you agree to them."
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by FadeClipper (&quot;FadeClipper&quot;, &quot;we&quot;, &quot;us&quot;). You can reach
        us any time at <a href="mailto:fadeclipper@gmail.com">fadeclipper@gmail.com</a>.
      </p>

      <h2>2. Eligibility</h2>
      <p>You must be at least 18 years old (or the age of majority where you live) to place an order.</p>

      <h2>3. Orders &amp; acceptance</h2>
      <p>
        Placing an order is an offer to buy. A contract is formed only when we send you a confirmation that your order
        has shipped. We may refuse or cancel an order — for example if an item is out of stock, a price was listed in
        error, or we suspect fraud — and will refund any payment taken.
      </p>

      <h2>4. Pricing &amp; payment</h2>
      <p>
        Prices are shown in the currency displayed at checkout and may change at any time before you order. We take
        reasonable care to ensure prices are correct, but if an obvious error occurs we&apos;ll let you know and give you
        the choice to reconfirm or cancel. Payment is processed securely by our third-party payment providers.
      </p>

      <h2>5. Shipping, returns &amp; warranty</h2>
      <p>
        Delivery is covered by our <a href="/shipping">Shipping policy</a>, returns and refunds by our{" "}
        <a href="/returns">Returns &amp; refunds policy</a>, both of which form part of these terms. FadeClipper is
        covered by a 1-year warranty against manufacturing defects.
      </p>

      <h2>6. Acceptable use</h2>
      <p>
        Don&apos;t use this site unlawfully, attempt to disrupt it, or copy its content for commercial use without our
        permission. We may suspend access if these terms are breached.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        All content on this site — text, graphics, logos, images, and the FadeClipper name — is owned by us or our
        licensors and is protected by intellectual-property laws. You may not reproduce it without written consent.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        The product is intended for personal grooming use. Follow the included instructions and use common sense around
        blades and water. The site is provided &quot;as is&quot; without warranties beyond those required by law.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        Nothing in these terms limits liability that cannot be limited by law (including your statutory consumer
        rights). Subject to that, our total liability for any order is limited to the amount you paid for it, and we are
        not liable for indirect or unforeseeable losses.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of Denmark and the European Union, and disputes are subject to the courts
        of that jurisdiction. This does not affect mandatory consumer-protection rights available to you locally.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these terms from time to time. The version published on this page at the time you order is the one
        that applies to your order.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms? Email <a href="mailto:fadeclipper@gmail.com">fadeclipper@gmail.com</a>.
      </p>
    </PageShell>
  );
}
