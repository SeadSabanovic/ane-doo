import Container from "@/components/layout/container";
import HeroCarousel from "./hero-carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
        {/* <div className="bg-background rounded-md p-6 flex gap-5 items-center lg:col-span-2">
          <div className="flex-1 flex flex-col justify-between items-start h-full">
            <h2 className="text-3xl font-bold">Ženska majica</h2>
            <p className="text-sm mt-auto">Ograničeni popust</p>

            <span className="flex items-center gap-3 mt-2">
              <span className="font-medium text-4xl text-primary">$699</span>
              <span className="font-medium text-2xl text-muted-foreground line-through">
                $999
              </span>
            </span>

            <Button className="mt-8 w-fit" size="lg">
              Pogledaj <ArrowUpRight />
            </Button>
          </div>
          <Image
            src="/images/product/shirt.png"
            alt="Shirt"
            width={500}
            height={500}
            className="object-contain max-w-[30%] w-full h-full"
          />
        </div> */}
      </Container>

      <HeroFeature />
    </section>
  );
}
