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
    link: "/katalog?kategorija=majice",
    alt: "Kategorija majice - ANE d.o.o.",
  },
  {
    id: "dukserice",
    name: "Dukserice",
    image: "/images/categories/ane-doo-dukserice.jpg",
    link: "/katalog?kategorija=dukserice",
    alt: "Kategorija dukserice - ANE d.o.o.",
  },
  {
    id: "jakne",
    name: "Jakne",
    image: "/images/categories/ane-doo-jakne.jpg",
    link: "/katalog?kategorija=jakne",
    alt: "Kategorija jakne - ANE d.o.o.",
  },
  {
    id: "carape",
    name: "Čarape",
    image: "/images/categories/ane-doo-carape.jpg",
    link: "/katalog?kategorija=carape",
    alt: "Kategorija čarape - ANE d.o.o.",
  },
  {
    id: "posteljine",
    name: "Posteljine",
    image: "/images/categories/ane-doo-posteljine.jpg",
    link: "/katalog?kategorija=posteljine",
    alt: "Kategorija posteljine - ANE d.o.o.",
  },
  {
    id: "pidzame",
    name: "Pidžame",
    image: "/images/categories/ane-doo-pidzame.jpg",
    link: "/katalog?kategorija=pidzame",
    alt: "Kategorija pidžame - ANE d.o.o.",
  },
  {
    id: "jastucnice",
    name: "Jastučnice",
    image: "/images/categories/ane-doo-jastucnice.jpg",
    link: "/katalog?kategorija=jastucnice",
    alt: "Kategorija jastučnice - ANE d.o.o.",
  },
  {
    id: "papuce",
    name: "Papuče",
    image: "/images/categories/ane-doo-papuce.jpg",
    link: "/katalog?kategorija=papuce",
    alt: "Kategorija papuče - ANE d.o.o.",
  },
  {
    id: "peskiri",
    name: "Peškiri",
    image: "/images/categories/ane-doo-peskiri.jpg",
    link: "/katalog?kategorija=peskiri",
    alt: "Kategorija peškiri - ANE d.o.o.",
  },
];

export default function CategoriesSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
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
          <SectionBadge className="mx-auto justify-center md:mx-0 md:justify-start">
            Kategorije
          </SectionBadge>
          <h2 className="mt-4 text-center text-3xl font-bold md:text-left lg:text-4xl">
            Za svakoga po nešto
          </h2>

          {/* Navigation buttons */}
          <div className="absolute top-0 right-0 hidden items-center gap-2 md:flex">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                api?.scrollPrev();
                plugin.current.reset();
              }}
              disabled={!canScrollPrev}
              className="size-10"
              aria-label="Prethodna kategorija"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => {
                api?.scrollNext();
                plugin.current.reset();
              }}
              disabled={!canScrollNext}
              className="size-10"
              aria-label="Sljedeća kategorija"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </Container>

      <div className="relative mt-10">
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
                className="basis-2/3 pl-2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <Link href={category.link} key={category.id}>
                  <div className="group bg-muted/20 relative flex aspect-3/4 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-t-[50vw] rounded-br-[50vw] rounded-bl-[8px] border">
                    <AnimatedImage
                      loadWhenVisible
                      src={category.image}
                      alt={category.alt}
                      width={400}
                      height={400}
                      className="absolute top-0 left-0 h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="bg-accent absolute right-0 bottom-0 left-0 h-1" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium">{category.name}</h3>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
