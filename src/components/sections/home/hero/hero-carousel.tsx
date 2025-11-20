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
    <Container className="grid grid-cols-1 mb-10">
      <div className="bg-muted/20 rounded-md overflow-hidden relative min-h-[80svh] lg:min-h-[50svh] xl:min-h-[60svh] max-h-[80svh]">
        <Carousel
          className="h-full"
          setApi={setApi}
          opts={{ loop: true }}
          plugins={[plugin.current]}
        >
          <CarouselContent className="h-full">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full w-full relative min-h-[70svh] md:min-h-0 md:aspect-3/4 lg:aspect-video overflow-hidden">
                  {slide.discount && (
                    <Badge className="z-10 lg:left-unset right-2 absolute top-2 border-transparent bg-accent text-accent-foreground font-black text-2xl rounded-sm">
                      -{slide.discount}
                    </Badge>
                  )}
                  <div className="order-2 lg:order-1 flex flex-col justify-between lg:justify-center items-center lg:items-start p-6 pt-4 lg:pt-6 backdrop-blur-sm py-12 h-fit mt-auto lg:rounded-tr-lg bg-muted/10 border border-muted/20">
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

                  <AnimatedImage
                    src={slide.image}
                    alt={slide.title}
                    width={1600}
                    height={900}
                    className="object-cover absolute top-0 left-0 w-full h-full -z-10"
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute bottom-2 left-0 w-full flex items-center justify-center gap-2 p-2">
          {Array.from({ length: count || slides.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                api?.scrollTo(index);
                plugin.current.reset();
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3 w-3 rounded-full border-2 border-accent transition-all cursor-pointer shadow-sm ${
                current === index + 1 ? "border-accent w-10 bg-accent" : null
              }`}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
