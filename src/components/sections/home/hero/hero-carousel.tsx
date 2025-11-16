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
import Container from "@/components/layout/container";

const slides = [
  {
    id: "mens-shirt",
    discount: "30%",
    title: "Muške majice",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    image:
      "https://images.pexels.com/photos/4066296/pexels-photo-4066296.jpeg?_gl=1*1et4hmy*_ga*MjA0MTQwODUxLjE3NjMzMjUxNzE.*_ga_8JE65Q40S6*czE3NjMzMjUxNzEkbzEkZzEkdDE3NjMzMjU4MTUkajUyJGwwJGgw",
    ctaHref: "/shop",
  },
  {
    id: "womens-shirt",
    discount: "20%",
    title: "Ženske majice",
    description: "Ograničena ponuda na najnoviji model.",
    image:
      "https://images.pexels.com/photos/17919087/pexels-photo-17919087.jpeg",
    ctaHref: "/shop",
  },
  {
    id: "kids-shirt",
    discount: "15%",
    title: "Dječje majice",
    description: "Udobne i kvalitetne majice za najmlađe.",
    image:
      "https://images.pexels.com/photos/33665695/pexels-photo-33665695.jpeg",
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
      <div className="bg-background rounded-md overflow-hidden relative lg:min-h-[50svh] xl:min-h-[60svh]">
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
                  <div className="order-2 lg:order-1 flex flex-col justify-between lg:justify-center items-center lg:items-start p-6 backdrop-blur-sm py-12 h-fit mt-auto lg:rounded-tr-lg">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-4xl font-bold text-center lg:text-7xl lg:text-left text-background">
                        {slide.title}
                      </h2>
                      <p className="mt-2 text-card text-center lg:text-left text-lg">
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

                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={1200}
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
