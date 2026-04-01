import { formatPrice } from "@/lib/format-price";

export type CheckoutCartItemEmail = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  purchaseType: "retail" | "wholesale";
  pricing: {
    retailPrice: number;
    wholesalePrice: number;
    wholesaleMinQuantity: number;
  };
  wholesalePackageSnapshot?: {
    packageContentsText?: string | null;
    sizes: string[];
    colorOptions: { label: string; hex: string }[];
  };
};

export type CheckoutEmailPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryMethod: "pickup" | "delivery";
  address: string;
  addressNumber: string;
  city: string;
  zip: string;
  country: string;
  items: CheckoutCartItemEmail[];
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** URL za atribut src — samo http(s), radi sigurnosti. */
function safeImageUrlForEmail(url: string): string | null {
  const t = url.trim();
  if (!t) return null;
  try {
    const u = new URL(t);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return t;
  } catch {
    return null;
  }
}

export function lineItemTotal(item: CheckoutCartItemEmail): number {
  if (item.purchaseType === "wholesale") {
    return (
      item.quantity *
      item.pricing.wholesaleMinQuantity *
      item.pricing.wholesalePrice
    );
  }
  return item.quantity * item.pricing.retailPrice;
}

export function checkoutGrandTotal(items: CheckoutCartItemEmail[]): number {
  return items.reduce((sum, item) => sum + lineItemTotal(item), 0);
}

const deliveryMethodLabel: Record<"pickup" | "delivery", string> = {
  pickup: "Lično preuzimanje",
  delivery: "Dostava",
};

function formatItemDetailsText(item: CheckoutCartItemEmail): string[] {
  const lines: string[] = [];
  const isWholesale = item.purchaseType === "wholesale";

  lines.push(isWholesale ? "Veleprodaja" : "Maloprodaja");

  if (isWholesale) {
    lines.push(
      `1 paket = ${item.pricing.wholesaleMinQuantity} komada`,
      `Broj pakovanja: ${item.quantity}`,
      `Ukupno komada: ${item.quantity * item.pricing.wholesaleMinQuantity}`,
    );
    const note = item.wholesalePackageSnapshot?.packageContentsText?.trim();
    if (note) lines.push(`Napomena: ${note}`);
    const sizes = item.wholesalePackageSnapshot?.sizes?.filter(Boolean) ?? [];
    if (sizes.length)
      lines.push(`Veličine (paket): ${sizes.join(", ")}`);
    const colors =
      item.wholesalePackageSnapshot?.colorOptions?.map((c) => c.label) ?? [];
    if (colors.length) lines.push(`Boje (paket): ${colors.join(", ")}`);
  } else {
    if (item.size) lines.push(`Veličina: ${item.size}`);
    if (item.color) lines.push(`Boja: ${item.color}`);
    lines.push(`Količina: ${item.quantity}`);
  }

  const unit = isWholesale ? item.pricing.wholesalePrice : item.pricing.retailPrice;
  lines.push(`Cijena po komadu: ${formatPrice(unit)}`);
  lines.push(`Ukupno za stavku: ${formatPrice(lineItemTotal(item))}`);

  return lines;
}

export function buildCheckoutEmailHtml(data: CheckoutEmailPayload): string {
  const safe = {
    firstName: escapeHtml(data.firstName),
    lastName: escapeHtml(data.lastName),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone),
    delivery: escapeHtml(deliveryMethodLabel[data.deliveryMethod]),
    address: escapeHtml(data.address),
    addressNumber: escapeHtml(data.addressNumber),
    city: escapeHtml(data.city),
    zip: escapeHtml(data.zip),
    country: escapeHtml(data.country),
  };
  const receivedAt = escapeHtml(new Date().toLocaleString("bs-BA"));
  const total = checkoutGrandTotal(data.items);

  const addressBlock =
    data.deliveryMethod === "delivery"
      ? `
      <tr>
        <td colspan="2" style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;">
          <strong>Adresa za dostavu:</strong><br />
          ${safe.address} ${safe.addressNumber}, ${safe.zip} ${safe.city}, ${safe.country}
        </td>
      </tr>`
      : "";

  const itemRows = data.items
    .map((item, index) => {
      const name = escapeHtml(item.name);
      const slug = escapeHtml(item.slug);
      const lines = formatItemDetailsText(item)
        .map((l) => escapeHtml(l))
        .join("<br />");

      const imgUrl = safeImageUrlForEmail(item.image);
      const imgBlock = imgUrl
        ? `<img src="${escapeHtml(imgUrl)}" alt="${name}" width="96" height="96" style="display:block;width:96px;height:96px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb;" />`
        : `<div style="width:96px;height:96px;background:#f3f4f6;border-radius:8px;border:1px solid #e5e7eb;"></div>`;

      return `
        <tr>
          <td width="112" valign="top" style="padding:10px 16px 10px 0;border-bottom:1px solid #e5e7eb;">
            ${imgBlock}
          </td>
          <td valign="top" style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;">
            <strong>${index + 1}. ${name}</strong>
            <span style="font-size:12px;color:#6b7280;"> (/shop/${slug})</span>
            <div style="margin-top:8px;line-height:1.5;color:#374151;">${lines}</div>
          </td>
        </tr>`;
    })
    .join("");

  return `
    <div style="margin:0;padding:24px;background:#f5f7fb;font-family:Arial,sans-serif;color:#111827;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="padding:20px 24px;background:#23695e;color:#ffffff;">
            <h1 style="margin:0;font-size:20px;line-height:1.3;">ANE d.o.o. — Nova narudžba</h1>
            <p style="margin:8px 0 0 0;font-size:13px;opacity:0.85;">Zaprimljeno: ${receivedAt}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><strong>Ime i prezime:</strong> ${safe.firstName} ${safe.lastName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><strong>Email:</strong> ${safe.email}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><strong>Telefon:</strong> ${safe.phone}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><strong>Način preuzimanja:</strong> ${safe.delivery}</td>
              </tr>
              ${addressBlock}
            </table>

            <h2 style="margin:0 0 12px 0;font-size:16px;padding-top:8px;">Stavke narudžbe</h2>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${itemRows}
              <tr>
                <td colspan="2" style="padding:14px 0 0 0;text-align:right;font-size:15px;border-top:1px solid #e5e7eb;">
                  <strong>Ukupno za naplatu: ${escapeHtml(formatPrice(total))}</strong>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export function buildCheckoutEmailText(data: CheckoutEmailPayload): string {
  const lines: string[] = [
    "ANE d.o.o. — Nova narudžba",
    `Zaprimljeno: ${new Date().toLocaleString("bs-BA")}`,
    "",
    `Ime i prezime: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Telefon: ${data.phone}`,
    `Način preuzimanja: ${deliveryMethodLabel[data.deliveryMethod]}`,
  ];

  if (data.deliveryMethod === "delivery") {
    lines.push(
      `Adresa: ${data.address} ${data.addressNumber}, ${data.zip} ${data.city}, ${data.country}`,
    );
  }

  lines.push("", "Stavke:", "");

  data.items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.name} (/shop/${item.slug})`);
    const img = safeImageUrlForEmail(item.image);
    if (img) lines.push(`   Slika: ${img}`);
    formatItemDetailsText(item).forEach((l) => lines.push(`   ${l}`));
    lines.push("");
  });

  lines.push(`Ukupno za naplatu: ${formatPrice(checkoutGrandTotal(data.items))}`);

  return lines.join("\n");
}
