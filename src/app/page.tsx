import BrowseSection from "@/components/sections/home/browse-section";
import HeroSection from "@/components/sections/home/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <BrowseSection />
    </main>
  );
}
