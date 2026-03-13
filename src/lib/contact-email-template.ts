export const allowedSubjects = [
  "upit-o-proizvodima",
  "veleprodaja-i-saradnja",
  "zahtjev-za-ponudu",
  "reklamacije-i-povrati",
  "opsti-upit",
] as const;

export type ContactSubject = (typeof allowedSubjects)[number];

export type ContactEmailPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: ContactSubject;
  message: string;
};

const subjectLabels: Record<ContactSubject, string> = {
  "upit-o-proizvodima": "Upit o proizvodima",
  "veleprodaja-i-saradnja": "Veleprodaja i saradnja",
  "zahtjev-za-ponudu": "Zahtjev za ponudu",
  "reklamacije-i-povrati": "Reklamacije i povrati",
  "opsti-upit": "Opsti upit",
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const formatContactSubjectLabel = (subject: ContactSubject) =>
  subjectLabels[subject] ?? subject;

export const buildContactEmailHtml = ({
  firstName,
  lastName,
  email,
  phone,
  company,
  subject,
  message,
}: ContactEmailPayload) => {
  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeCompany = escapeHtml(company || "-");
  const safeSubject = escapeHtml(formatContactSubjectLabel(subject));
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const receivedAt = escapeHtml(new Date().toLocaleString("bs-BA"));

  return `
    <div style="margin:0;padding:24px;background:#f5f7fb;font-family:Arial,sans-serif;color:#111827;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="padding:20px 24px;background:#23695e;color:#ffffff;">
            <h1 style="margin:0;font-size:20px;line-height:1.3;">ANE D.O.O. - Novi upit sa kontakt forme</h1>
            <p style="margin:8px 0 0 0;font-size:13px;opacity:0.85;">Zaprimljeno: ${receivedAt}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><strong>Ime i prezime:</strong> ${safeFirstName} ${safeLastName}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><strong>Email:</strong> ${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><strong>Telefon:</strong> ${safePhone}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><strong>Firma:</strong> ${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;"><strong>Predmet:</strong> ${safeSubject}</td>
              </tr>
            </table>

            <div style="margin-top:18px;padding:14px 16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
              <p style="margin:0 0 8px 0;font-size:14px;font-weight:700;">Poruka:</p>
              <p style="margin:0;font-size:14px;line-height:1.6;">${safeMessage}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;
};

export const buildContactEmailText = ({
  firstName,
  lastName,
  email,
  phone,
  company,
  subject,
  message,
}: ContactEmailPayload) =>
  [
    "ANE D.O.O. - Novi upit sa kontakt forme",
    `Zaprimljeno: ${new Date().toLocaleString("bs-BA")}`,
    "",
    `Ime i prezime: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Telefon: ${phone}`,
    `Firma: ${company || "-"}`,
    `Predmet: ${formatContactSubjectLabel(subject)}`,
    "",
    "Poruka:",
    message,
  ].join("\n");
