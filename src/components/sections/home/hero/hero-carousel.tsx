"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/layout/container";
import AnimatedImage from "@/components/ui/animated-image";

const slides = [
  {
    id: "mens-shirt",
    discount: "30%",
    title: "Pidžame",
    description:
      "Uživajte u udobnosti koja traje cijelu noć. Savršene za mirne večeri i lagana jutra.",
    image:
      "https://images.unsplash.com/photo-1758524942070-77fcc202045d?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaHref: "/shop",
  },
  {
    id: "womens-shirt",
    discount: "20%",
    title: "Posteljine",
    description:
      "Osvježite svoju spavaću sobu kombinacijom modernih dezena i neodoljive udobnosti",
    image:
      "https://images.unsplash.com/photo-1567608614543-90a7241db08b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaHref: "/shop",
  },
  {
    id: "kids-shirt",
    discount: "15%",
    title: "Zima 2025",
    description: "Dočekajte zimu 2025 uz najmekše komade sezone.",
    image:
      "https://images.unsplash.com/photo-1668107423580-513ee6d9fbe2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ctaHref: "/shop",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="bg-muted/20 overflow-hidden relative ">
      <Carousel
        className="h-full"
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="h-full min-h-[calc(100svh-var(--nav-height-mobile))] lg:min-h-[calc(100svh-var(--nav-height-desktop))] flex flex-col items-center justify-center relative"
            >
              <Container className="flex flex-1 flex-col justify-end gap-6 h-full w-full relative">
                <div className="flex flex-col justify-between lg:justify-center items-center lg:items-start p-6 pt-4 lg:pt-6 py-12 h-fit lg:rounded-tr-lg pb-[10svh] lg:pb-[20svh]">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-bold text-center lg:text-7xl lg:text-left text-background text-shadow-sm">
                      {slide.title}
                    </h2>
                    <p className="mt-2 text-card text-center text-lg lg:text-left md:text-2xl text-shadow-sm ">
                      {slide.description}
                    </p>
                  </div>
                  <Button
                    className="mt-8 w-fit text-center lg:text-left"
                    size="lg"
                    asChild
                  >
                    <a href={slide.ctaHref}>
                      Pogledaj <ArrowUpRight />
                    </a>
                  </Button>
                </div>
              </Container>
              <AnimatedImage
                src={slide.image}
                alt={slide.title}
                width={1600}
                height={900}
                className="object-cover absolute top-0 left-0 w-full h-full -z-10"
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-2 right-4 w-fit flex items-center gap-2 p-2 hover:scale-105 transition-all duration-300">
        {Array.from({ length: count || slides.length }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              api?.scrollTo(index);
              plugin.current.reset();
            }}
            aria-label={`Idi na slide ${index + 1}`}
            className={`h-4 w-4 rounded-full border-2 border-accent transition-all cursor-pointer shadow-sm ${
              current === index + 1 ? "w-20 bg-accent" : null
            }`}
          />
        ))}
      </div>
    </section>
  );
}
