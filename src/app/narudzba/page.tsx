import Container from "@/components/layout/container";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import CheckoutContent from "@/components/sections/checkout/checkout-content";

export const metadata: Metadata = {
  title: "Narudžba",
  description:
    "Završite vašu narudžbu. Unesite podatke za dostavu i odaberite način plaćanja.",
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        title="Narudžba"
        description="Pregledajte i potvrdite svoju narudžbu. Završite proces kupovine u par koraka."
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Narudžba", href: "/narudzba" },
        ]}
      />
      <Container className="pb-20">
        <CheckoutContent />
      </Container>
    </>
  );
}
