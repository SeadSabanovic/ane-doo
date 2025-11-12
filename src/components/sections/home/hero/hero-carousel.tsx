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
import { Badge } from "@/components/ui/badge";

const slides = [
  {
    id: "mens-shirt",
    discount: "30%",
    title: "Muška majica",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image:
      "https://images.pexels.com/photos/8217431/pexels-photo-8217431.jpeg?_gl=1*236mpj*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIyNDU2NTAkbzEkZzEkdDE3NjIyNDYwMjkkajU5JGwwJGgw",
    ctaHref: "/shop",
  },
  {
    id: "womens-shirt",
    discount: "20%",
    title: "Ženska majica",
    description: "Ograničena ponuda na najnoviji model.",
    image:
      "https://images.pexels.com/photos/8217313/pexels-photo-8217313.jpeg?_gl=1*8sy20t*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIyNDU2NTAkbzEkZzEkdDE3NjIyNDcyNDkkajU5JGwwJGgw",
    ctaHref: "/shop",
  },
  {
    id: "kids-shirt",
    discount: "15%",
    title: "Dječija majica",
    description: "Udobne i kvalitetne majice za najmlađe.",
    image:
      "https://images.pexels.com/photos/7330645/pexels-photo-7330645.jpeg?_gl=1*uz1z7w*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIyNDU2NTAkbzEkZzEkdDE3NjIyNDczMzgkajU5JGwwJGgw",
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
    <div className="bg-background rounded-md overflow-hidden relative lg:min-h-[50svh] xl:min-h-[60svh] border">
      <Carousel
        className="h-full"
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full pb-12 relative">
                <div className="order-2 lg:order-1 flex flex-col justify-between lg:justify-center items-center lg:items-start min-h-full p-6 pb-0">
                  {slide.discount && (
                    <Badge className="z-10 lg:left-unset right-2 absolute top-2 border-transparent bg-linear-to-r from-primary to-pink-500 bg-size-[105%] bg-center text-white font-black text-2xl rounded-sm">
                      -{slide.discount}
                    </Badge>
                  )}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-bold text-center lg:text-7xl lg:text-left">
                      {slide.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground text-center lg:text-left">
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
                <div className="relative aspect-square w-full order-1 lg:order-2 lg:aspect-auto overflow-hidden lg:rounded-bl-2xl">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={800}
                    height={800}
                    className="object-cover absolute top-0 left-0 w-full h-full"
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
            className={`h-3 w-6 rounded-full border-2 border-primary/50 transition-all cursor-pointer ${
              current === index + 1 ? "border-primary w-10 bg-primary/50" : null
            }`}
          />
        ))}
      </div>
    </div>
  );
}
