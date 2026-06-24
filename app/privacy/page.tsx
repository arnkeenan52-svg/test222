import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy policy — FadeClipper",
  description: "How FadeClipper collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy policy"
      updated="June 24, 2026"
      intro="Your privacy matters. This policy explains what we collect, why, and the rights you have over your data."
    >
      <h2>Who is responsible for your data</h2>
      <p>
        The data controller is [Your Company Legal Name], [Registered Address], [Country]. For any privacy question or
        request, contact us at <a href="mailto:hello@fadeclipper.com">hello@fadeclipper.com</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Order &amp; contact details:</strong> name, email, shipping/billing address, phone (if provided).</li>
        <li><strong>Payment information:</strong> handled by our payment providers — we don&apos;t store full card numbers.</li>
        <li><strong>Communications:</strong> messages you send us for support.</li>
        <li><strong>Usage data:</strong> device, browser, and how you use the site, collected via cookies and similar tools.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To process and deliver your orders and provide support.</li>
        <li>To send order updates and, if you opt in, marketing emails (you can unsubscribe any time).</li>
        <li>To improve the site and our products, and to keep the service secure and prevent fraud.</li>
        <li>To meet our legal and accounting obligations.</li>
      </ul>

      <h2>Legal basis (GDPR)</h2>
      <p>
        We process data to perform our contract with you (orders), for our legitimate interests (improving and securing
        the service), to comply with legal obligations, and — for marketing and non-essential cookies — based on your
        consent.
      </p>

      <h2>Who we share it with</h2>
      <p>We share data only as needed with trusted providers, including:</p>
      <ul>
        <li>Payment processors (to take payment securely)</li>
        <li>Shipping and fulfilment partners (to deliver your order)</li>
        <li>Email and analytics providers (to communicate and understand site usage)</li>
      </ul>
      <p>We do not sell your personal data. Providers may process data outside your country under appropriate safeguards.</p>

      <h2>Cookies</h2>
      <p>
        We use essential cookies to run the site and, with your consent, analytics/marketing cookies to understand and
        improve performance. You can control cookies through your browser settings.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep order records for as long as needed to provide the service and to meet legal/tax obligations, then
        delete or anonymise them.
      </p>

      <h2>Your rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>Access the data we hold about you</li>
        <li>Correct inaccurate data</li>
        <li>Delete your data (&quot;right to be forgotten&quot;)</li>
        <li>Object to or restrict processing</li>
        <li>Receive your data in a portable format</li>
        <li>Withdraw consent and unsubscribe from marketing at any time</li>
      </ul>
      <p>
        To exercise any of these, email <a href="mailto:hello@fadeclipper.com">hello@fadeclipper.com</a>. You also have
        the right to complain to your local data-protection authority.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect your data. No method of transmission is 100%
        secure, but we work to keep your information safe.
      </p>

      <h2>Children</h2>
      <p>This site is not directed at children, and we do not knowingly collect data from anyone under 16.</p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time; the &quot;last updated&quot; date above shows the latest version.</p>
    </PageShell>
  );
}
