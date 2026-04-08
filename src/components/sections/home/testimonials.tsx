import Container from "@/components/layout/container";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import SectionBadge from "@/components/ui/section-badge";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Samir Hanusic",
    content: "Rade k’o singerica",
  },
  {
    id: "testimonial-2",
    name: "BAYA GmbH",
    content: "Odlična ekipa! Sve pohvale!",
  },
  {
    id: "testimonial-3",
    name: "Kemal Softic",
    content: "Odlična usluga, divno osoblje! Sve preporuke!",
  },
  {
    id: "testimonial-4",
    name: "Anabella Bambi",
    content: "Veoma ljubazne dame rade, izuzetno su susretljive.",
  },
  {
    id: "testimonial-5",
    name: "Ozkayam Murat",
    content: "Pristupačna destinacija za kupovinu tekstila iz Turske.",
  },
  {
    id: "testimonial-6",
    name: "Armin Bajramović",
    content:
      "Kvalitetna odjeća po pristupačnim cijenama. Preporučujem svima koji traže kvalitet.",
  },
  {
    id: "testimonial-7",
    name: "Armin Bajramović",
    content:
      "Kvalitetna odjeća po pristupačnim cijenama. Preporučujem svima koji traže kvalitet.",
  },
  {
    id: "testimonial-8",
    name: "Armin Bajramović",
    content:
      "Kvalitetna odjeća po pristupačnim cijenama. Preporučujem svima koji traže kvalitet.",
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

const ReviewCard = ({ name, content }: { name: string; content: string }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-96 cursor-pointer overflow-hidden rounded-md p-4 transition flex flex-col",
      )}
    >
      <Quote className="text-accent/10 mb-4 size-8 absolute inset-0" />
      <blockquote className="text-foreground mb-4 text-lg italic">
        &quot;{content}&quot;
      </blockquote>
      <div className="text-lg tracking-wide text-accent mt-auto">★★★★★</div>
      <figcaption className="text-primary text-sm font-medium mt-2">
        {name}
      </figcaption>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-8">
          <SectionBadge className="mx-auto justify-center md:mx-0 md:justify-start">
            Povjerenje
          </SectionBadge>
          <h2 className="mt-4 text-center text-3xl font-bold md:text-left lg:text-4xl">
            Naši klijenti kažu...
          </h2>
        </div>
      </Container>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((testimonial) => (
            <ReviewCard key={testimonial.id} {...testimonial} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((testimonial) => (
            <ReviewCard key={testimonial.id} {...testimonial} />
          ))}
        </Marquee>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
      </div>
    </section>
  );
}
