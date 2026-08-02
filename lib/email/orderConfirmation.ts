// Professional, brand-matched order-confirmation email for FadeClipper.
//
// Design follows the uiux-pro-max rules: brand consistency with the store,
// weight-based hierarchy, 4/8px spacing rhythm, tabular figures for money,
// >=4.5:1 contrast, no emoji as icons (a text "✓" in a coloured badge instead),
// one primary CTA, responsive single-column layout. Built with tables + inline
// styles because that is the only thing that renders reliably in email clients.

export type OrderEmailData = {
  orderNo: string;
  name: string;
  email: string;
  productTitle: string;
  productSub: string;
  quantity: number;
  unitCents: number;
  productCents: number; // line subtotal (unit * qty)
  discountCents: number;
  discountCode: string;
  shippingMethod: string;
  shippingEta: string;
  shippingCents: number;
  totalCents: number;
  currency: string; // e.g. "USD"
  paymentBrand: string;
  paymentLast4: string;
  address: { line1: string; line2: string; city: string; state: string; postal: string; country: string } | null;
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://fadeclipper.com";
const LOGO = `${SITE}/assets/img/fadeclipper-stripe-logo.png`;
const PRODUCT_IMG = `${SITE}/assets/img/packaging.jpg`;

// Brand tokens (mirrored from tailwind.config.ts so the email matches the site).
const C = {
  brand: "#ec6324",
  brandDark: "#d2511a",
  ink: "#1b1b1d",
  ink2: "#3c3f45",
  muted: "#5f6368",
  line: "#e4e7ec",
  paperAlt: "#f4f6f9",
  card: "#fafafa",
  green: "#1b8a4e",
  white: "#ffffff",
};
const FONT = "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const DISPLAY = "'Poppins','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const esc = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function renderOrderConfirmationEmail(o: OrderEmailData): { subject: string; html: string; text: string } {
  const firstName = (o.name || "").trim().split(" ")[0] || "";
  const subject = `Order confirmed${o.orderNo ? ` — #${o.orderNo}` : ""} · FadeClipper`;
  const preheader = `Thanks${firstName ? `, ${firstName}` : ""}! Your FadeClipper order is confirmed and being prepared for shipping.`;

  const addr = o.address;
  const addressBlock = addr
    ? [
        o.name ? esc(o.name) : "",
        esc(addr.line1) + (addr.line2 ? `, ${esc(addr.line2)}` : ""),
        [addr.postal, addr.city].filter(Boolean).map(esc).join(" ") + (addr.state ? `, ${esc(addr.state)}` : ""),
        esc(addr.country),
      ]
        .filter(Boolean)
        .join("<br>")
    : "";

  const paymentLine =
    o.paymentBrand && o.paymentLast4 ? `${esc(o.paymentBrand)} ···· ${esc(o.paymentLast4)}` : "Paid securely via Stripe";

  // ---- summary rows ----
  const rowStyle = `font-family:${FONT};font-size:14px;color:${C.muted};padding:5px 0;`;
  const numStyle = `font-family:${FONT};font-size:14px;padding:5px 0;text-align:right;font-variant-numeric:tabular-nums;`;
  const summaryRows = `
    <tr>
      <td style="${rowStyle}">Subtotal</td>
      <td style="${numStyle}color:${C.ink2};">${money(o.productCents)}</td>
    </tr>
    ${
      o.discountCents > 0
        ? `<tr>
      <td style="${rowStyle}color:${C.green};">Discount${o.discountCode ? ` · ${esc(o.discountCode)}` : ""}</td>
      <td style="${numStyle}color:${C.green};">&minus;${money(o.discountCents)}</td>
    </tr>`
        : ""
    }
    <tr>
      <td style="${rowStyle}">Shipping · ${esc(o.shippingMethod)}</td>
      <td style="${numStyle}color:${o.shippingCents === 0 ? C.green : C.ink2};">${o.shippingCents === 0 ? "Free" : money(o.shippingCents)}</td>
    </tr>`;

  // ---- "what happens next" steps (no emoji — numbered/checked badges) ----
  const step = (badge: string, bg: string, title: string, sub: string, last = false) => `
    <tr>
      <td width="40" valign="top" style="padding-bottom:${last ? "0" : "16px"};">
        <div style="width:28px;height:28px;border-radius:14px;background:${bg};color:#ffffff;font-family:${FONT};font-size:13px;font-weight:700;line-height:28px;text-align:center;">${badge}</div>
      </td>
      <td valign="top" style="padding-bottom:${last ? "0" : "16px"};">
        <div style="font-family:${FONT};font-size:14px;font-weight:600;color:${C.ink};line-height:1.3;">${title}</div>
        <div style="font-family:${FONT};font-size:13px;color:${C.muted};line-height:1.5;margin-top:2px;">${sub}</div>
      </td>
    </tr>`;

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${esc(subject)}</title>
  <!--[if mso]><style>table,td,div{font-family:Arial,Helvetica,sans-serif !important;}</style><![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap');
    body{margin:0;padding:0;width:100%!important;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
    img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}
    a{text-decoration:none;}
    @media only screen and (max-width:600px){
      .container{width:100%!important;}
      .px{padding-left:22px!important;padding-right:22px!important;}
      .stack{display:block!important;width:100%!important;box-sizing:border-box;}
      .stack-gap{height:16px!important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${C.paperAlt};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${C.paperAlt};">${esc(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paperAlt};">
    <tr>
      <td align="center" style="padding:28px 12px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${C.white};border-radius:18px;overflow:hidden;box-shadow:0 8px 40px rgba(20,22,30,0.08);">

          <!-- brand accent bar -->
          <tr><td style="height:4px;background:${C.brand};line-height:4px;font-size:0;">&nbsp;</td></tr>

          <!-- header / logo -->
          <tr>
            <td class="px" align="center" style="padding:26px 40px 6px;">
              <img src="${LOGO}" width="150" alt="FadeClipper" style="display:block;height:26px;width:auto;">
            </td>
          </tr>

          <!-- hero -->
          <tr>
            <td class="px" align="center" style="padding:18px 40px 4px;">
              <div style="width:52px;height:52px;border-radius:26px;background:${C.green};margin:0 auto 16px;">
                <div style="font-family:${FONT};font-size:26px;line-height:52px;color:#ffffff;text-align:center;font-weight:700;">&#10003;</div>
              </div>
              <div style="font-family:${DISPLAY};font-size:26px;line-height:1.2;font-weight:700;color:${C.ink};">Thank you${firstName ? `, ${esc(firstName)}` : ""}!</div>
              <div style="font-family:${FONT};font-size:15px;line-height:1.6;color:${C.ink2};max-width:400px;margin:10px auto 0;">
                Your order is confirmed and we&rsquo;re getting it ready. We&rsquo;ll email your tracking number the moment it ships.
              </div>
              ${
                o.orderNo
                  ? `<div style="margin-top:16px;"><span style="display:inline-block;font-family:${FONT};font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${C.muted};background:${C.paperAlt};border:1px solid ${C.line};border-radius:999px;padding:7px 14px;">Order #${esc(o.orderNo)}</span></div>`
                  : ""
              }
            </td>
          </tr>

          <!-- product card -->
          <tr>
            <td class="px" style="padding:26px 40px 6px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-radius:14px;">
                <tr>
                  <td style="padding:16px 18px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="64" valign="top" style="width:64px;">
                          <div style="position:relative;width:64px;height:64px;">
                            <img src="${PRODUCT_IMG}" width="64" height="64" alt="${esc(o.productTitle)}" style="display:block;width:64px;height:64px;border-radius:12px;border:1px solid ${C.line};object-fit:cover;">
                          </div>
                        </td>
                        <td valign="middle" style="padding-left:14px;">
                          <div style="font-family:${FONT};font-size:15px;font-weight:600;color:${C.ink};line-height:1.3;">${esc(o.productTitle)}${o.quantity > 1 ? ` <span style="color:${C.muted};font-weight:500;">× ${o.quantity}</span>` : ""}</div>
                          <div style="font-family:${FONT};font-size:13px;color:${C.muted};line-height:1.4;margin-top:2px;">${o.quantity > 1 ? `${o.quantity} × ${money(o.unitCents)}` : esc(o.productSub)}</div>
                        </td>
                        <td valign="middle" align="right" style="font-family:${FONT};font-size:15px;font-weight:600;color:${C.ink};white-space:nowrap;font-variant-numeric:tabular-nums;">${money(o.productCents)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- summary -->
                <tr>
                  <td style="padding:14px 18px 4px;border-top:1px solid ${C.line};">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${summaryRows}
                    </table>
                  </td>
                </tr>
                <!-- total -->
                <tr>
                  <td style="padding:12px 18px 16px;border-top:1px solid ${C.line};">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-family:${DISPLAY};font-size:17px;font-weight:700;color:${C.ink};">Total</td>
                        <td align="right" style="font-family:${DISPLAY};font-size:19px;font-weight:700;color:${C.ink};font-variant-numeric:tabular-nums;">
                          <span style="font-family:${FONT};font-size:11px;font-weight:600;color:${C.muted};vertical-align:middle;margin-right:5px;">${esc(o.currency)}</span>${money(o.totalCents)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- shipping + payment details -->
          <tr>
            <td class="px" style="padding:18px 40px 6px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${
                    addressBlock
                      ? `<td class="stack" width="50%" valign="top" style="padding-right:12px;">
                    <div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.muted};">Shipping to</div>
                    <div style="font-family:${FONT};font-size:14px;line-height:1.6;color:${C.ink};margin-top:6px;">${addressBlock}</div>
                  </td>`
                      : ""
                  }
                  <td class="stack" width="50%" valign="top" style="padding-left:${addressBlock ? "12px" : "0"};">
                    <div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.muted};">Delivery</div>
                    <div style="font-family:${FONT};font-size:14px;line-height:1.6;color:${C.ink};margin-top:6px;">${esc(o.shippingMethod)}<br><span style="color:${C.muted};">Arrives in about ${esc(o.shippingEta)}</span></div>
                    <div style="font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${C.muted};margin-top:14px;">Payment</div>
                    <div style="font-family:${FONT};font-size:14px;line-height:1.6;color:${C.ink};margin-top:6px;">${paymentLine}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- what happens next -->
          <tr>
            <td class="px" style="padding:22px 40px 6px;">
              <div style="border:1px solid ${C.line};border-radius:14px;background:${C.card};padding:20px 22px;">
                <div style="font-family:${DISPLAY};font-size:15px;font-weight:700;color:${C.ink};margin-bottom:16px;">What happens next</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${step("&#10003;", C.green, "Order confirmed", "Payment received — you're all set.")}
                  ${step("2", C.brand, "Packed &amp; dispatched", "We prepare and hand your clipper to the carrier, usually within 24 hours.")}
                  ${step("3", "#c9ccd2", "On its way", `Tracking arrives by email · about ${esc(o.shippingEta)}.`, true)}
                </table>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="px" align="center" style="padding:26px 40px 6px;">
              <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${SITE}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="50%" fillcolor="${C.brand}" stroke="f"><w:anchorlock/><center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;"><![endif]-->
              <a href="${SITE}" style="display:inline-block;background:${C.brand};color:#ffffff;font-family:${FONT};font-size:15px;font-weight:600;line-height:48px;text-align:center;text-decoration:none;border-radius:999px;padding:0 34px;">Visit FadeClipper</a>
              <!--[if mso]></center></v:roundrect><![endif]-->
              <div style="font-family:${FONT};font-size:13px;color:${C.muted};margin-top:16px;line-height:1.6;">
                Questions about your order? Just reply to this email${o.email ? ` — we&rsquo;ll reach you at <span style="color:${C.ink2};">${esc(o.email)}</span>` : ""}.
              </div>
            </td>
          </tr>

          <!-- reassurance strip -->
          <tr>
            <td class="px" style="padding:20px 40px 4px;">
              <div style="border-top:1px solid ${C.line};padding-top:18px;text-align:center;font-family:${FONT};font-size:13px;color:${C.muted};line-height:1.7;">
                <span style="color:${C.ink2};font-weight:600;">14-day money-back guarantee</span> &nbsp;·&nbsp; 1-year warranty &nbsp;·&nbsp; Free worldwide shipping
              </div>
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td class="px" align="center" style="padding:22px 40px 34px;">
              <div style="font-family:${FONT};font-size:12px;line-height:2;color:${C.muted};">
                <a href="${SITE}/returns" style="color:${C.muted};text-decoration:none;">Refund policy</a> &nbsp;·&nbsp;
                <a href="${SITE}/shipping" style="color:${C.muted};text-decoration:none;">Shipping</a> &nbsp;·&nbsp;
                <a href="${SITE}/privacy" style="color:${C.muted};text-decoration:none;">Privacy</a> &nbsp;·&nbsp;
                <a href="${SITE}/terms" style="color:${C.muted};text-decoration:none;">Terms</a> &nbsp;·&nbsp;
                <a href="${SITE}/contact" style="color:${C.muted};text-decoration:none;">Contact</a>
              </div>
              <div style="font-family:${FONT};font-size:12px;color:${C.muted};margin-top:12px;line-height:1.6;">
                You&rsquo;re receiving this email because you placed an order at
                <a href="${SITE}" style="color:${C.brand};text-decoration:none;">fadeclipper.com</a>.
                <br>© FadeClipper. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // ---- plain-text fallback (deliverability + accessibility) ----
  const line = (l: string) => l;
  const text = [
    `Thank you${firstName ? `, ${firstName}` : ""}!`,
    ``,
    `Your FadeClipper order is confirmed and being prepared for shipping.`,
    o.orderNo ? `Order #${o.orderNo}` : "",
    ``,
    `${o.productTitle}${o.quantity > 1 ? ` x ${o.quantity}` : ""} — ${money(o.productCents)}`,
    `Subtotal: ${money(o.productCents)}`,
    o.discountCents > 0 ? `Discount${o.discountCode ? ` (${o.discountCode})` : ""}: -${money(o.discountCents)}` : "",
    `Shipping (${o.shippingMethod}): ${o.shippingCents === 0 ? "Free" : money(o.shippingCents)}`,
    `Total: ${money(o.totalCents)} ${o.currency}`,
    ``,
    addr
      ? `Shipping to:\n${[o.name, `${addr.line1}${addr.line2 ? `, ${addr.line2}` : ""}`, `${[addr.postal, addr.city].filter(Boolean).join(" ")}${addr.state ? `, ${addr.state}` : ""}`, addr.country].filter(Boolean).join("\n")}`
      : "",
    ``,
    `Delivery: ${o.shippingMethod} — arrives in about ${o.shippingEta}.`,
    `Payment: ${o.paymentBrand && o.paymentLast4 ? `${o.paymentBrand} ....${o.paymentLast4}` : "Paid securely via Stripe"}`,
    ``,
    `Questions? Just reply to this email.`,
    ``,
    `14-day money-back guarantee · 1-year warranty · Free worldwide shipping`,
    `${SITE}`,
  ]
    .filter((l) => l !== "")
    .map(line)
    .join("\n");

  return { subject, html, text };
}
