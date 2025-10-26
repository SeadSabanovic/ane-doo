"use client";
import * as React from "react";
import Container from "@/components/layout/container";
import { ChevronLeft, ChevronRight, MessageSquareHeart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Amina Hadžić",
    role: "Kupac",
    content:
      "Odlična kvaliteta majica, brza dostava i profesionalna usluga. Preporučujem svima!",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "Emir Kovačević",
    role: "Kupac",
    content:
      "Najbolji izbor odjeće u gradu. Cijene su pristupačne, a kvaliteta izvrsna.",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "Lejla Smajić",
    role: "Kupac",
    content:
      "Kupujem ovdje već godinama i nikad nisam bila razočarana. Topla preporuka!",
    rating: 5,
  },
  {
    id: "testimonial-4",
    name: "Adnan Hodžić",
    role: "Kupac",
    content: "Odličan odnos cijene i kvalitete. Dostava je uvijek na vrijeme.",
    rating: 4,
  },
  {
    id: "testimonial-5",
    name: "Emina Dervišević",
    role: "Kupac",
    content:
      "Veliki izbor, ljubazno osoblje i brza usluga. Definitivno ću se vratiti!",
    rating: 5,
  },
  {
    id: "testimonial-6",
    name: "Armin Bajramović",
    role: "Kupac",
    content:
      "Kvalitetna odjeća po pristupačnim cijenama. Preporučujem svima koji traže kvalitet.",
    rating: 5,
  },
];

export default function Testimonials() {
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
    <section className="py-10">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquareHeart />
            <span className="text-md leading-none font-medium">Povjerenje</span>
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
        <h2 className="text-3xl font-bold mt-2">Naši klijenti kažu</h2>

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
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 md:pl-4 lg:basis-1/3 md:basis-1/2 basis-full"
                >
                  <div className="group rounded-md bg-gray-50 text-card-foreground cursor-pointer p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="border-t pt-4 flex items-start gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>ANE</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
