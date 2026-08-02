// Emails for the contact form: a clear notification to the store owner and a
// short branded auto-acknowledgement to the customer.

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://fadeclipper.com";
const LOGO = `${SITE}/assets/img/fadeclipper-stripe-logo.png`;

const C = { brand: "#ec6324", ink: "#1b1b1d", ink2: "#3c3f45", muted: "#5f6368", line: "#e4e7ec", paperAlt: "#f4f6f9", white: "#ffffff" };
const FONT = "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

const esc = (s: string) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nl2br = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

export type ContactInput = { name: string; email: string; orderNo?: string; message: string };

// --- Notification to the store owner (arrives in Gmail; reply-to is the customer) ---
export function renderContactNotification(i: ContactInput): { subject: string; html: string; text: string } {
  const who = i.name?.trim() || i.email;
  const subject = `New contact message${i.orderNo ? ` · order ${i.orderNo}` : ""} — ${who}`;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 0;font-family:${FONT};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${C.muted};width:130px;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;font-family:${FONT};font-size:14px;color:${C.ink};">${value}</td>
    </tr>`;

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:${C.paperAlt};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paperAlt};"><tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${C.white};border-radius:14px;overflow:hidden;box-shadow:0 8px 40px rgba(20,22,30,0.08);">
      <tr><td style="height:4px;background:${C.brand};font-size:0;line-height:4px;">&nbsp;</td></tr>
      <tr><td style="padding:24px 32px 8px;">
        <div style="font-family:${FONT};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${C.brand};">New contact message</div>
        <div style="font-family:${FONT};font-size:20px;font-weight:700;color:${C.ink};margin-top:6px;">${esc(who)} got in touch</div>
      </td></tr>
      <tr><td style="padding:8px 32px 4px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${row("Name", esc(i.name || "—"))}
          ${row("Email", `<a href="mailto:${esc(i.email)}" style="color:${C.brand};text-decoration:none;">${esc(i.email)}</a>`)}
          ${i.orderNo ? row("Order #", esc(i.orderNo)) : ""}
        </table>
      </td></tr>
      <tr><td style="padding:14px 32px 26px;">
        <div style="font-family:${FONT};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${C.muted};margin-bottom:8px;">Message</div>
        <div style="font-family:${FONT};font-size:15px;line-height:1.65;color:${C.ink2};background:${C.paperAlt};border:1px solid ${C.line};border-radius:12px;padding:16px 18px;">${nl2br(i.message)}</div>
        <div style="font-family:${FONT};font-size:13px;color:${C.muted};margin-top:16px;">Reply directly to this email to respond to ${esc(i.name?.trim() || "them")}.</div>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const text = [
    `New contact message${i.orderNo ? ` · order ${i.orderNo}` : ""}`,
    ``,
    `Name:  ${i.name || "—"}`,
    `Email: ${i.email}`,
    i.orderNo ? `Order: ${i.orderNo}` : "",
    ``,
    `Message:`,
    i.message,
    ``,
    `Reply directly to this email to respond.`,
  ].filter((l) => l !== "").join("\n");

  return { subject, html, text };
}

// --- Auto-acknowledgement to the customer ---
export function renderContactAck(i: ContactInput): { subject: string; html: string; text: string } {
  const firstName = (i.name || "").trim().split(" ")[0] || "";
  const subject = "We got your message · FadeClipper";
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:${C.paperAlt};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paperAlt};"><tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${C.white};border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(20,22,30,0.08);">
      <tr><td style="height:4px;background:${C.brand};font-size:0;line-height:4px;">&nbsp;</td></tr>
      <tr><td align="center" style="padding:26px 40px 4px;"><img src="${LOGO}" width="150" alt="FadeClipper" style="display:block;height:26px;width:auto;"></td></tr>
      <tr><td style="padding:18px 40px 8px;">
        <div style="font-family:${FONT};font-size:22px;font-weight:700;color:${C.ink};">Thanks${firstName ? `, ${esc(firstName)}` : ""} — we&rsquo;ve got your message.</div>
        <div style="font-family:${FONT};font-size:15px;line-height:1.7;color:${C.ink2};margin-top:12px;">
          A real person reads every message and we usually reply within <strong>one business day</strong> (Mon&ndash;Fri, 9:00&ndash;17:00 CET). We&rsquo;ll get back to you at this address.
        </div>
      </td></tr>
      <tr><td style="padding:6px 40px 8px;">
        <div style="font-family:${FONT};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${C.muted};margin-bottom:8px;">Your message</div>
        <div style="font-family:${FONT};font-size:14px;line-height:1.6;color:${C.ink2};background:${C.paperAlt};border:1px solid ${C.line};border-radius:12px;padding:14px 16px;">${nl2br(i.message)}</div>
      </td></tr>
      <tr><td style="padding:16px 40px 34px;">
        <div style="font-family:${FONT};font-size:13px;color:${C.muted};line-height:1.7;border-top:1px solid ${C.line};padding-top:16px;">
          Meanwhile, our <a href="${SITE}/shipping" style="color:${C.brand};text-decoration:none;">Shipping</a> and <a href="${SITE}/returns" style="color:${C.brand};text-decoration:none;">Returns</a> pages answer the most common questions.
          <br>© FadeClipper · <a href="${SITE}" style="color:${C.muted};text-decoration:none;">fadeclipper.com</a>
        </div>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const text = [
    `Thanks${firstName ? `, ${firstName}` : ""} — we've got your message.`,
    ``,
    `A real person reads every message and we usually reply within one business day (Mon–Fri, 9:00–17:00 CET).`,
    ``,
    `Your message:`,
    i.message,
    ``,
    `© FadeClipper · ${SITE}`,
  ].join("\n");

  return { subject, html, text };
}
