"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    id: "mens-shirt",
    discount: "30%",
    title: "Muška majica",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image: "/images/product/shirt.png",
    ctaHref: "/shop-with-sidebar",
  },
  {
    id: "womens-shirt",
    discount: "20%",
    title: "Ženska majica",
    description: "Ograničena ponuda na najnoviji model.",
    image: "/images/product/shirt.png",
    ctaHref: "/shop-with-sidebar",
  },
  {
    id: "kids-shirt",
    discount: "15%",
    title: "Dječja majica",
    description: "Udobne i kvalitetne majice za najmlađe.",
    image: "/images/product/shirt.png",
    ctaHref: "/shop-with-sidebar",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

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
    <div className="bg-background rounded-md lg:col-span-3 overflow-hidden relative lg:min-h-[50svh]">
      <Carousel
        className="h-full"
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full p-6 pb-12">
                <div className="order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start min-h-full">
                  <h4 className="text-2xl text-center lg:text-left">
                    <span className="text-primary text-5xl font-bold">
                      {slide.discount}
                    </span>
                    <br />
                    <span className="font-light">sniženje</span>
                  </h4>
                  <h2 className="text-4xl font-bold mt-6 text-center lg:text-left">
                    {slide.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground text-center lg:text-left">
                    {slide.description}
                  </p>
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
                <div className="relative aspect-4/3 md:aspect-3/2 w-full order-1 lg:order-2">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain absolute top-0 left-0 w-full h-full"
                    priority
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-2 left-0 w-full flex items-center justify-center gap-2 p-2">
        {Array.from({ length: count || slides.length }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-6 rounded-full border-2 transition-all cursor-pointer ${
              current === index + 1 ? "border-primary/50 w-10" : "border-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
