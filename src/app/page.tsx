import CategoriesSection from "@/components/sections/home/categories-section";
import HeroSection from "@/components/sections/home/hero";
import HottestSection from "@/components/sections/home/hottest-section";
import NewSection from "@/components/sections/home/new-section";
import SaleSection from "@/components/sections/home/sale-section";
import Testimonials from "@/components/sections/home/testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Početna | ANE d.o.o.",
  description:
    "Dobrodošli u ANE d.o.o. online shop. Pregledajte najnovije kolekcije, popuste i najprodavanije proizvode.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <NewSection />
      <SaleSection />
      <HottestSection />
      <Testimonials />
    </>
  );
}
