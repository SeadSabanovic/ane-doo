import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  buildCheckoutEmailHtml,
  buildCheckoutEmailText,
  type CheckoutEmailPayload,
} from "@/lib/checkout-email-template";

const allowedPhoneCodes = ["+387", "+381", "+385", "+382"] as const;

const cartItemSchema = z.object({
  productId: z.string().trim().min(1),
  name: z.string().trim().min(1),
  slug: z.string().trim().min(1),
  image: z.string().trim().optional().default(""),
  size: z.string().trim().optional().default(""),
  color: z.string().trim().optional().default(""),
  quantity: z.number().int().min(1),
  purchaseType: z.enum(["retail", "wholesale"]),
  pricing: z.object({
    retailPrice: z.number().nonnegative(),
    wholesalePrice: z.number().nonnegative(),
    wholesaleMinQuantity: z.number().int().min(1),
  }),
  wholesalePackageSnapshot: z
    .object({
      packageContentsText: z.string().nullable().optional(),
      sizes: z.array(z.string()),
      colorOptions: z.array(
        z.object({
          label: z.string(),
          hex: z.string(),
        }),
      ),
    })
    .optional(),
});

const checkoutRequestSchema = z
  .object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: z
      .string()
      .trim()
      .regex(/^(?:\+387|\+381|\+385|\+382)\s\d{6,12}$/, "Invalid phone format"),
    deliveryMethod: z.enum(["pickup", "delivery"]),
    address: z.string().trim().optional().default(""),
    addressNumber: z.string().trim().optional().default(""),
    city: z.string().trim().optional().default(""),
    zip: z.string().trim().optional().default(""),
    country: z.string().trim().optional().default(""),
    website: z.string().trim().optional().default(""),
    items: z.array(cartItemSchema).min(1),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === "delivery") {
      if (!data.address?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address required for delivery",
          path: ["address"],
        });
      }
      if (!data.addressNumber?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address number required for delivery",
          path: ["addressNumber"],
        });
      }
      if (!data.city?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City required for delivery",
          path: ["city"],
        });
      }
      if (!data.zip?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ZIP required for delivery",
          path: ["zip"],
        });
      }
      if (!data.country?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Country required for delivery",
          path: ["country"],
        });
      }
    }
  });

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to =
    process.env.CHECKOUT_ORDER_TO_EMAIL ?? process.env.CONTACT_FORM_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      {
        error:
          "Slanje narudžbe nije konfigurirano. Molimo pokušajte kasnije ili nas kontaktirajte telefonom.",
      },
      { status: 500 },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Neispravni podaci narudžbe. Provjerite unos i pokušajte ponovo." },
      { status: 400 },
    );
  }

  const parsedBody = checkoutRequestSchema.safeParse(rawBody);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Neispravni podaci narudžbe. Provjerite sva polja." },
      { status: 400 },
    );
  }

  const data = parsedBody.data;

  if (data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const hasValidPrefix = allowedPhoneCodes.some((code) =>
    data.phone.startsWith(`${code} `),
  );
  if (!hasValidPrefix) {
    return NextResponse.json(
      { error: "Neispravni podaci narudžbe. Provjerite unos i pokušajte ponovo." },
      { status: 400 },
    );
  }

  const emailPayload: CheckoutEmailPayload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    deliveryMethod: data.deliveryMethod,
    address: data.address,
    addressNumber: data.addressNumber,
    city: data.city,
    zip: data.zip,
    country: data.country,
    items: data.items,
  };

  const resend = new Resend(apiKey);
  const html = buildCheckoutEmailHtml(emailPayload);
  const text = buildCheckoutEmailText(emailPayload);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `Nova narudžba: ${data.firstName} ${data.lastName}`,
    html,
    text,
  });

  if (error) {
    return NextResponse.json(
      { error: "Došlo je do greške. Molimo pokušajte ponovo kasnije." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
