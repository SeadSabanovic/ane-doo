import BrowseSection from "@/components/sections/home/browse-section";
import HeroSection from "@/components/sections/home/hero";
import HottestSection from "@/components/sections/home/hottest-section";
import NewSection from "@/components/sections/home/new-section";
import SaleSection from "@/components/sections/home/sale-section";
import Testimonials from "@/components/sections/home/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BrowseSection />
      <NewSection />
      <SaleSection />
      <HottestSection />
      <Testimonials />
    </main>
  );
}
