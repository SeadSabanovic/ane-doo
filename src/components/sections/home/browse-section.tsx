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
import AnimatedImage from "@/components/ui/animated-image";

const categories = [
  {
    id: "majice",
    name: "Majice",
    image: "https://images.pexels.com/photos/9594677/pexels-photo-9594677.jpeg",
    link: "/shop",
  },
  {
    id: "jakne",
    name: "Jakne",
    image: "https://images.pexels.com/photos/7481668/pexels-photo-7481668.jpeg",
    link: "/shop",
  },
  {
    id: "dukserice",
    name: "Dukserice",
    image: "https://images.pexels.com/photos/9594679/pexels-photo-9594679.jpeg",
    link: "/shop",
  },
  {
    id: "carape",
    name: "Čarape",
    image:
      "https://images.pexels.com/photos/10557900/pexels-photo-10557900.jpeg",
    link: "/shop",
  },
  {
    id: "posteljine",
    name: "Posteljine",
    image: "https://images.pexels.com/photos/6800946/pexels-photo-6800946.jpeg",
    link: "/shop",
  },
  {
    id: "pidzame",
    name: "Pidžame",
    image: "https://images.pexels.com/photos/6976434/pexels-photo-6976434.jpeg",
    link: "/shop",
  },
  {
    id: "jastucnice",
    name: "Jastučnice",
    image: "https://images.pexels.com/photos/1248583/pexels-photo-1248583.jpeg",
    link: "/shop",
  },
  {
    id: "papuce",
    name: "Papuče",
    image:
      "https://images.pexels.com/photos/29636809/pexels-photo-29636809.jpeg",
    link: "/shop",
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
          <SectionBadge icon={<Tags size={18} />} className="mx-auto md:mx-0">
            Kategorije
          </SectionBadge>
          <h2 className="text-3xl lg:text-4xl font-bold mt-4 text-center md:text-left">
            Za svakoga po nešto
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
                <div className="group [border-top-left-radius:50vh] [border-top-right-radius:50vh] [border-bottom-left-radius:8px] [border-bottom-right-radius:50vh] bg-muted/20 relative aspect-3/4 cursor-pointer flex flex-col items-center justify-center overflow-hidden border">
                  <AnimatedImage
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="object-cover group-hover:scale-105 transition-all duration-300 absolute top-0 left-0 w-full h-full"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-secondary/20" />
                </div>
                <h4 className="text-xl font-medium mt-4">{category.name}</h4>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
