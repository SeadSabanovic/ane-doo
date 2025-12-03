import Container from "@/components/layout/container";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import ContactForm from "@/components/sections/contact/contact-form";
import ContactInfo from "@/components/sections/contact/contact-info";

export const metadata: Metadata = {
  title: "ANE D.O.O. | Kontakt",
  description:
    "Kontaktirajte nas za sve vaše pitanja. Mi smo ovdje da vam pomognemo.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Kontakt"
        description="Sa više od 20 godina iskustva u veleprodaji, uvijek smo otvoreni za nova partnerstva. Pišite nam za upite, ponude ili dodatne informacije."
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Kontakt", href: "/kontakt" },
        ]}
      />
      <Container className="pb-20 flex flex-col gap-8 md:gap-10 lg:gap-12">
        <ContactForm />
        <ContactInfo />
      </Container>
    </>
  );
}
