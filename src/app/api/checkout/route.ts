import { NextResponse } from "next/server";
import { z } from "zod";

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
    items: z
      .array(
        z.object({
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
        }),
      )
      .min(1),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === "delivery") {
      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address required for delivery",
          path: ["address"],
        });
      }
      if (!data.city) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City required for delivery",
          path: ["city"],
        });
      }
      if (!data.zip) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "ZIP required for delivery",
          path: ["zip"],
        });
      }
      if (!data.country) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Country required for delivery",
          path: ["country"],
        });
      }
    }
  });

export async function POST(request: Request) {
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid checkout data." }, { status: 400 });
  }

  const parsedBody = checkoutRequestSchema.safeParse(rawBody);
  if (!parsedBody.success) {
    return NextResponse.json({ error: "Invalid checkout data." }, { status: 400 });
  }

  const data = parsedBody.data;

  if (data.website.length > 0) {
    // Honeypot hit: pretend success and silently ignore.
    return NextResponse.json({ ok: true });
  }

  // TODO: Persist/send order notification here (DB/CRM/email).
  return NextResponse.json({ ok: true });
}

