import Container from "@/components/layout/container";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import ContactForm from "@/components/sections/contact/contact-form";
import ContactInfo from "@/components/sections/contact/contact-info";

export const metadata: Metadata = {
  title: "Kontakt – Veleprodaja i distribucija tekstila",
  description:
    "Stupite u kontakt sa ANE d.o.o. Sarajevo. Saznajte sve o veleprodajnim cijenama, uslovima saradnje i direktnom uvozu tekstila za vaše butike i hotele u regiji.",
  alternates: {
    canonical: "/kontakt",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Kontaktirajte ANE d.o.o. tim"
        description="Planirate unaprijediti ponudu svog biznisa našim asortimanom? Tu smo da vam pružimo sve informacije o veleprodajnim cijenama, direktnom uvozu i uslovima saradnje za BiH i region."
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
