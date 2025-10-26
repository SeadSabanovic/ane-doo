import BrowseSection from "@/components/sections/home/browse-section";
import HeroSection from "@/components/sections/home/hero";
import NewSection from "@/components/sections/home/new-section";
import SaleSection from "@/components/sections/home/sale-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BrowseSection />
      <NewSection />
      <SaleSection />
    </main>
  );
}
