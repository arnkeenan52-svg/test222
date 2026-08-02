import Stripe from "stripe";
import { PRODUCTS } from "@/lib/products";
import { DISCOUNT_CODE, DISCOUNT_PCT } from "@/lib/discount";
import { renderOrderConfirmationEmail, type OrderEmailData } from "@/lib/email/orderConfirmation";
import { sendMail } from "@/lib/email/resend";

// Shared order helpers used by the success-page API and the Stripe webhook.
// Prices are always recomputed server-side from PaymentIntent metadata — the
// client is never trusted.

const SHIP_LABEL: Record<string, string> = { standard: "Standard shipping", express: "Express shipping" };
const SHIP_ETA: Record<string, string> = { standard: "7–10 business days", express: "2–3 business days" };
const SHIP_CENTS: Record<string, number> = { standard: 0, express: 1200 };

export type OrderDetails = OrderEmailData & { status: string };

export function stripeClient(): Stripe | null {
  const secret = process.env.STRIPE_SECRET_KEY;
  return secret ? new Stripe(secret) : null;
}

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

// Build safe, display-ready order details from a retrieved PaymentIntent.
// Pass an intent retrieved with `{ expand: ["latest_charge"] }` for card details.
export function orderFromIntent(intent: Stripe.PaymentIntent): OrderDetails {
  const charge = intent.latest_charge as Stripe.Charge | null;
  const card = charge?.payment_method_details?.card;
  const shipping = intent.shipping;
  const shippingId = (intent.metadata?.shipping as string) || "standard";
  const qty = Math.min(10, Math.max(1, parseInt(intent.metadata?.quantity || "1", 10) || 1));
  const codeOk = !!intent.metadata?.discount_code;

  const unitCents = Math.round(PRODUCTS.single.usd * 100);
  const productCents = unitCents * qty;
  const discountCents = codeOk ? Math.round((productCents * DISCOUNT_PCT) / 100) : 0;
  const shippingCents = SHIP_CENTS[shippingId] ?? 0;

  return {
    status: intent.status,
    orderNo: intent.id.slice(-8).toUpperCase(),
    email: intent.receipt_email || charge?.billing_details?.email || "",
    name: shipping?.name || charge?.billing_details?.name || "",
    address: shipping?.address
      ? {
          line1: shipping.address.line1 || "",
          line2: shipping.address.line2 || "",
          city: shipping.address.city || "",
          state: shipping.address.state || "",
          postal: shipping.address.postal_code || "",
          country: shipping.address.country || "",
        }
      : null,
    shippingMethod: SHIP_LABEL[shippingId] || "Standard shipping",
    shippingEta: SHIP_ETA[shippingId] || SHIP_ETA.standard,
    paymentBrand: card?.brand ? cap(card.brand) : "",
    paymentLast4: card?.last4 || "",
    productTitle: PRODUCTS.single.title,
    productSub: PRODUCTS.single.sub,
    quantity: qty,
    unitCents,
    productCents,
    discountCents,
    discountCode: codeOk ? DISCOUNT_CODE : "",
    shippingCents,
    totalCents: intent.amount,
    currency: (intent.currency || "usd").toUpperCase(),
  };
}

export async function getOrder(stripe: Stripe, pi: string): Promise<OrderDetails | null> {
  try {
    const intent = await stripe.paymentIntents.retrieve(pi, { expand: ["latest_charge"] });
    return orderFromIntent(intent);
  } catch {
    return null;
  }
}

// Sends the confirmation email exactly once per order. Idempotency is enforced
// with a `confirmation_email_sent` flag on the PaymentIntent metadata, so the
// webhook and the success-page load can both call this and only one email goes
// out. Returns a short status string for logging.
export async function maybeSendConfirmation(
  stripe: Stripe,
  intent: Stripe.PaymentIntent
): Promise<"sent" | "already-sent" | "not-ready" | "no-email" | "send-failed"> {
  if (intent.status !== "succeeded") return "not-ready";
  if (intent.metadata?.confirmation_email_sent === "true") return "already-sent";

  const order = orderFromIntent(intent);
  if (!order.email) return "no-email";

  const { subject, html, text } = renderOrderConfirmationEmail(order);
  const sent = await sendMail({ to: order.email, subject, html, text });
  if (!sent.ok) return "send-failed";

  try {
    await stripe.paymentIntents.update(intent.id, {
      metadata: { ...intent.metadata, confirmation_email_sent: "true" },
    });
  } catch {
    // Email already went out; failing to set the flag only risks a rare re-send.
  }
  return "sent";
}
