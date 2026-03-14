"use client";
import { useState, useEffect, useRef } from "react";
import Container from "@/components/layout/container";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/ui/section-badge";
import AnimatedImage from "@/components/ui/animated-image";
import Link from "next/link";

const categories = [
  {
    id: "majice",
    name: "Majice",
    image: "/images/categories/ane-doo-majice.jpg",
    link: "/shop?kategorija=majice",
    alt: "Kategorija majice - ANE D.O.O.",
  },
  {
    id: "jakne",
    name: "Jakne",
    image: "/images/categories/ane-doo-jakne.jpg",
    link: "/shop?kategorija=jakne",
    alt: "Kategorija jakne - ANE D.O.O.",
  },
  {
    id: "dukserice",
    name: "Dukserice",
    image: "https://images.pexels.com/photos/9594679/pexels-photo-9594679.jpeg",
    link: "/shop?kategorija=dukserice",
    alt: "Kategorija dukserice - ANE D.O.O.",
  },
  {
    id: "carape",
    name: "Čarape",
    image:
      "/images/categories/ane-doo-carape.jpg",
    link: "/shop?kategorija=carape",
    alt: "Kategorija čarape - ANE D.O.O.",
  },
  {
    id: "posteljine",
    name: "Posteljine",
    image: "/images/categories/ane-doo-posteljine.jpg",
    link: "/shop?kategorija=posteljine",
    alt: "Kategorija posteljine - ANE D.O.O.",
  },
  {
    id: "pidzame",
    name: "Pidžame",
    image: "/images/categories/ane-doo-pidzame.jpg",
    link: "/shop?kategorija=pidzame",
    alt: "Kategorija pidžame - ANE D.O.O.",
  },
  {
    id: "jastucnice",
    name: "Jastučnice",
    image: "/images/categories/ane-doo-jastucnice.jpg",
    link: "/shop?kategorija=jastucnice",
    alt: "Kategorija jastučnice - ANE D.O.O.",
  },
  {
    id: "papuce",
    name: "Papuče",
    image:
      "/images/categories/ane-doo-papuce.jpg",
    link: "/shop?kategorija=papuce",
    alt: "Kategorija papuče - ANE D.O.O.",
  },
];

export default function CategoriesSection() {
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
          <SectionBadge className="mx-auto md:mx-0 justify-center md:justify-start">
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
      </Container>

      <div className="mt-10 relative">
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
                <Link href={category.link} key={category.id}>
                  <div className="group rounded-t-[50vw] rounded-bl-[8px] rounded-br-[50vw] bg-muted/20 relative aspect-3/4 cursor-pointer flex flex-col items-center justify-center overflow-hidden border">
                    <AnimatedImage
                      src={category.image}
                      alt={category.alt}
                      width={400}
                      height={400}
                      className="object-cover group-hover:scale-105 transition-all duration-300 absolute top-0 left-0 w-full h-full"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-secondary/20" />
                    <div className="absolute bottom-2 left-2 size-4 bg-accent rounded-t-full rounded-r-full" />
                  </div>
                  <h4 className="text-xl font-medium mt-4">{category.name}</h4>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section >
  );
}
