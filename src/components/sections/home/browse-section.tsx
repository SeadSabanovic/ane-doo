"use client";
import { useState, useEffect } from "react";
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
  {
    id: "majice",
    name: "Majice",
    image: "https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg",
  },
  {
    id: "dukserice",
    name: "Dukserice i Trenerke",
    image: "https://images.pexels.com/photos/9594667/pexels-photo-9594667.jpeg",
  },
  {
    id: "donje-rublje",
    name: "Donje rublje",
    image: "https://images.pexels.com/photos/6303689/pexels-photo-6303689.jpeg",
  },
  {
    id: "carape",
    name: "Čarape",
    image:
      "https://images.pexels.com/photos/10557900/pexels-photo-10557900.jpeg",
  },
  {
    id: "haljine",
    name: "Haljine i Tunike",
    image: "https://images.pexels.com/photos/8274720/pexels-photo-8274720.jpeg",
  },
  {
    id: "pidzame",
    name: "Pidžame i Spavaćice",
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
  },
];

export default function BrowseSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

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
    <section className="pt-20">
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

        <div className="mt-20">
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
                  className="pl-2 md:pl-4 lg:basis-1/6 md:basis-1/3 basis-1/2"
                >
                  <div className="group rounded-full bg-gray-50 relative aspect-square cursor-pointer flex flex-col items-center justify-center overflow-hidden border">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={400}
                      height={400}
                      className="object-cover group-hover:scale-105 transition-all duration-300 absolute top-0 left-0 w-full h-full"
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
