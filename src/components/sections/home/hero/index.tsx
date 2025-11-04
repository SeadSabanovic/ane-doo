import Container from "@/components/layout/container";
import HeroCarousel from "./hero-carousel";
import HeroFeature from "./hero-feature";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 pt-10">
      <Container className="grid grid-cols-1 mb-10">
        <HeroCarousel />
      </Container>

      <HeroFeature />
    </section>
  );
}
