import PageHeader from "@/components/layout/page-header";
import AboutBentoSection from "@/components/sections/about/about-bento-section";
import AboutHeroSection from "@/components/sections/about/about-hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Saznajte više o ANE d.o.o. - našoj misiji, vrijednostima i timu koji stoji iza našeg uspjeha.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Upoznajte ANE d.o.o."
        description="Saznajte kako smo od porodične tradicije izgradili jednog od najpouzdanijih partnera u uvozu i veleprodaji tekstila u Bosni i Hercegovini."
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "O nama", href: "/o-nama" },
        ]}
      />
      <AboutHeroSection />
      <AboutBentoSection />
    </>
  );
}
