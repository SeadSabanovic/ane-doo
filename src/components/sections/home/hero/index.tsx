import HeroCarousel from "./hero-carousel";
import HeroFeature from "./hero-feature";

export default function HeroSection() {
  return (
    <section className="pt-10">
      <HeroCarousel />
      <HeroFeature />
    </section>
  );
}
