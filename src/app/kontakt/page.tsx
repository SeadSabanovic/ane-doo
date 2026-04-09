import Container from "@/components/layout/container";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import ContactForm from "@/components/sections/contact/contact-form";
import ContactInfo from "@/components/sections/contact/contact-info";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte nas za sve vaše pitanja. Mi smo ovdje da vam pomognemo.",
  alternates: {
    canonical: "/kontakt",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Kontakt"
        description="Planirate unaprijediti svoju ponudu našim asortimanom? Naš tim je tu da vam pruži sve informacije o veleprodajnim cijenama, uslovima saradnje i dostupnosti artikala."
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Kontakt", href: "/kontakt" },
        ]}
      />
      <Container className="flex flex-col gap-8 pb-20 md:gap-10 lg:gap-12">
        <ContactForm />
        <ContactInfo />
      </Container>
    </>
  );
}
