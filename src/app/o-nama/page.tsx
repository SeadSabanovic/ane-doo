import PageHeader from "@/components/layout/page-header";
import AboutBentoSection from "@/components/sections/about/about-bento-section";
import AboutCtaSection from "@/components/sections/about/about-cta-section";
import AboutHeroSection from "@/components/sections/about/about-hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nama - Lideri u veleprodaji tekstila",
  description:
    "ANE d.o.o. Sarajevo – regionalni lider u uvozu tekstila iz Turske i Indonezije. Sa 12 godina tradicije, snabdijevamo butike i hotele širom BiH i regiona.",
  alternates: {
    canonical: "/o-nama",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Upoznajte ANE d.o.o. Sarajevo"
        description="Saznajte kako smo od porodične tradicije izgradili jednog od najpouzdanijih partnera u uvozu i veleprodaji tekstila u BiH i regionu."
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "O Nama", href: "/o-nama" },
        ]}
      />
      <AboutHeroSection />
      <AboutBentoSection />
      <AboutCtaSection />
    </>
  );
}
