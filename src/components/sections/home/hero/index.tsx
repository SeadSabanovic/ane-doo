import Container from "@/components/layout/container";
import HeroCarousel from "./hero-carousel";
import HeroFeature from "./hero-feature";
import HeroFeaturedCard from "./hero-featured-card";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 pt-10">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-5 mb-10">
        <HeroCarousel />
        <div className="lg:col-span-2 flex flex-col gap-5">
          <HeroFeaturedCard />
          <HeroFeaturedCard />
        </div>
      </Container>

      <HeroFeature />
    </section>
  );
}
