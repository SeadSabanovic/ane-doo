import Container from "@/components/layout/container";
import HeroCarousel from "./hero-carousel";
import HeroFeature from "./hero-feature";

export default function HeroSection() {
  return (
    <section className="bg-secondary pt-10">
      <HeroCarousel />
      <HeroFeature />
    </section>
  );
}
