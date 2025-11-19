"use client";
import { useState, useEffect, useRef } from "react";
import Container from "@/components/layout/container";
import { Tags, ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import SectionBadge from "@/components/ui/section-badge";
import { SpinningText } from "@/components/ui/spinning-text";

const categories = [
  {
    id: "majice",
    name: "Muška odjeća",
    image: "https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg",
  },
  {
    id: "dukserice",
    name: "Ženska odjeća",
    image: "https://images.pexels.com/photos/9594667/pexels-photo-9594667.jpeg",
  },
  {
    id: "donji-ves",
    name: "Dječija odjeća",
    image: "https://images.pexels.com/photos/6303689/pexels-photo-6303689.jpeg",
  },
  {
    id: "carape",
    name: "Sportska odjeća",
    image:
      "https://images.pexels.com/photos/10557900/pexels-photo-10557900.jpeg",
  },
  {
    id: "haljine",
    name: "Pidžame",
    image: "https://images.pexels.com/photos/8274720/pexels-photo-8274720.jpeg",
  },
  {
    id: "pidzame",
    name: "Spavaćice",
    image: "https://images.pexels.com/photos/9788969/pexels-photo-9788969.jpeg",
  },
  {
    id: "radna-odjeca",
    name: "Radna odjeća",
    image: "https://images.pexels.com/photos/2249248/pexels-photo-2249248.jpeg",
  },
  {
    id: "sezonska",
    name: "Sezonska ponuda",
    image: "https://images.pexels.com/photos/7202775/pexels-photo-7202775.jpeg",
    link: "/shop/sezonska-ponuda",
  },
];

export default function BrowseSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    // Initialize immediately
    onSelect();

    // Listen for changes
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="py-20">
      <Container>
        <div className="relative">
          <SectionBadge icon={<Tags size={18} />} className="mx-auto md:mx-0">Kategorije</SectionBadge>
          <h2 className="text-3xl lg:text-4xl font-bold mt-4 text-center md:text-left">
            Artikli po kategorijama
          </h2>

          {/* Navigation buttons */}
          <div className="items-center gap-2 absolute top-0 right-0 hidden md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                api?.scrollPrev();
                plugin.current.reset();
              }}
              disabled={!canScrollPrev}
              className="size-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                api?.scrollNext();
                plugin.current.reset();
              }}
              disabled={!canScrollNext}
              className="size-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="mt-10" />
      </Container>

      <div className="mt-10 relative">
        <div className="hidden md:block z-10 pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
        <div className="hidden md:block z-10 pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background"></div>
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            slidesToScroll: 1,
            loop: true,
            dragFree: true,
          }}
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="pl-2 md:pl-4 lg:basis-1/4 md:basis-1/3 basis-2/3 xl:basis-1/5 2xl:basis-1/6"
              >
                <div className="group rounded-full bg-muted relative aspect-square cursor-pointer flex flex-col items-center justify-center overflow-hidden border">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={400}
                    className="object-cover group-hover:scale-105 transition-all duration-300 absolute top-0 left-0 w-full h-full"
                  />
                  <SpinningText
                    reverse
                    className="text-3xl font-bold uppercase text-background"
                    duration={100}
                    radius={5}
                  >
                    {category.name}
                  </SpinningText>
                  <div className="absolute top-0 left-0 w-full h-full bg-secondary/50" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
