import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  allowedSubjects,
  buildContactEmailHtml,
  buildContactEmailText,
  formatContactSubjectLabel,
} from "@/lib/contact-email-template";

const allowedPhoneCodes = ["+387", "+381", "+385", "+382"] as const;

const contactRequestSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+387|\+381|\+385|\+382)\s\d{6,12}$/,
      "Invalid phone format"
    ),
  company: z.string().trim().optional().default(""),
  subject: z.enum(allowedSubjects),
  message: z.string().trim().min(1),
  website: z.string().trim().optional().default(""),
});


export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_FORM_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid contact form data." },
      { status: 400 }
    );
  }

  const parsedBody = contactRequestSchema.safeParse(rawBody);

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid contact form data." },
      { status: 400 }
    );
  }

  const data = parsedBody.data;
  if (data.website.length > 0) {
    // Honeypot hit: pretend success and silently ignore.
    return NextResponse.json({ ok: true });
  }

  const hasValidPrefix = allowedPhoneCodes.some((code) =>
    data.phone.startsWith(`${code} `)
  );
  if (!hasValidPrefix) {
    return NextResponse.json(
      { error: "Invalid contact form data." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);
  const readableSubject = formatContactSubjectLabel(data.subject);
  const html = buildContactEmailHtml(data);
  const text = buildContactEmailText(data);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `Kontakt forma: ${readableSubject}`,
    html,
    text,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
