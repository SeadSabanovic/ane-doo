/**
 * Jedan JSON-LD @graph (Organization + WebSite) za cijeli sajt — bez SearchAction.
 * Koristi isti izvor URL-a kao layout (`NEXT_PUBLIC_SITE_URL`).
 */
export default function OrganizationWebsiteJsonLd() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ane-doo.vercel.app";
  const base = raw.replace(/\/$/, "");
  const siteUrl = `${base}/`;
  const orgId = `${base}/#organization`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "ANE d.o.o.",
        url: siteUrl,
        logo: `${base}/icons/ANE-logo.svg`,
        email: "info@ane-doo.com",
        telephone: "+38761101871",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ismeta Alajbegovića Šerbe 30",
          addressLocality: "Sarajevo",
          postalCode: "71000",
          addressCountry: "BA",
        },
        sameAs: [
          "https://www.facebook.com/ane-doo",
          "https://www.instagram.com/ane-doo",
          "https://www.linkedin.com/company/ane-doo",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: siteUrl,
        name: "ANE d.o.o.",
        publisher: { "@id": orgId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
