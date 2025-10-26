"use client";
import * as React from "react";
import Container from "@/components/layout/container";
import { Tags, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const categories = [
  { id: "majice", name: "Majice", image: "/images/product/shirt.png" },
  {
    id: "dukserice",
    name: "Dukserice i Trenerke",
    image: "/images/product/shirt.png",
  },
  {
    id: "donje-rublje",
    name: "Donje rublje",
    image: "/images/product/shirt.png",
  },
  { id: "carape", name: "Čarape", image: "/images/product/shirt.png" },
  {
    id: "haljine",
    name: "Haljine i Tunike",
    image: "/images/product/shirt.png",
  },
  {
    id: "pidzame",
    name: "Pidžame i Spavaćice",
    image: "/images/product/shirt.png",
  },
  {
    id: "radna-odjeca",
    name: "Radna odjeća",
    image: "/images/product/shirt.png",
  },
  {
    id: "sezonska",
    name: "Sezonska ponuda",
    image: "/images/product/shirt.png",
  },
];

export default function BrowseSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="pt-10">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Tags />
            <span className="text-md leading-none font-medium">Kategorije</span>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className="size-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className="size-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-2">Istraži po kategorijama</h2>

        <div className="mt-8">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-2 md:pl-4 lg:basis-1/5 md:basis-1/3 basis-1/2"
                >
                  <div className="group rounded-md bg-gray-50 relative aspect-square cursor-pointer flex flex-col items-center justify-center">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={200}
                      height={200}
                      className="object-contain size-[80%] group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <h4 className="text-2xl font-medium mt-4 text-center">
                    {category.name}
                  </h4>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <Separator className="mt-24" />
      </Container>
    </section>
  );
}
