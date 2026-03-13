import { buildContactEmailHtml, type ContactEmailPayload } from "@/lib/contact-email-template";

export async function GET() {
  const previewData: ContactEmailPayload = {
    firstName: "Sead",
    lastName: "Sabanovic",
    email: "sead@example.com",
    phone: "+387 61486300",
    company: "ANE D.O.O.",
    subject: "upit-o-proizvodima",
    message:
      "Pozdrav,\n\nzanima me dostupnost proizvoda i uslovi veleprodaje.\n\nHvala!",
  };

  const html = buildContactEmailHtml(previewData);
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
