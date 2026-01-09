import Container from "@/components/layout/container";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import SectionBadge from "@/components/ui/section-badge";
import Image from "next/image";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Amina Hadžić",

    content:
      "Odlična kvaliteta majica, brza dostava i profesionalna usluga. Preporučujem svima!",
    img: "https://avatar.vercel.sh/amina",
  },
  {
    id: "testimonial-2",
    name: "Emir Kovačević",

    content:
      "Najbolji izbor odjeće u gradu. Cijene su pristupačne, a kvaliteta izvrsna.",
    img: "https://avatar.vercel.sh/emir",
  },
  {
    id: "testimonial-3",
    name: "Lejla Smajić",

    content:
      "Kupujem ovdje već godinama i nikad nisam bila razočarana. Topla preporuka!",
    img: "https://avatar.vercel.sh/lejla",
  },
  {
    id: "testimonial-4",
    name: "Adnan Hodžić",

    content: "Odličan odnos cijene i kvalitete. Dostava je uvijek na vrijeme.",
    img: "https://avatar.vercel.sh/adnan",
  },
  {
    id: "testimonial-5",
    name: "Emina Dervišević",

    content:
      "Veliki izbor, ljubazno osoblje i brza usluga. Definitivno ću se vratiti!",
    img: "https://avatar.vercel.sh/emina",
  },
  {
    id: "testimonial-6",
    name: "Armin Bajramović",

    content:
      "Kvalitetna odjeća po pristupačnim cijenama. Preporučujem svima koji traže kvalitet.",
    img: "https://avatar.vercel.sh/armin",
  },
  {
    id: "testimonial-7",
    name: "Armin Bajramović",

    content:
      "Kvalitetna odjeća po pristupačnim cijenama. Preporučujem svima koji traže kvalitet.",
    img: "https://avatar.vercel.sh/armin",
  },
  {
    id: "testimonial-8",
    name: "Armin Bajramović",

    content:
      "Kvalitetna odjeća po pristupačnim cijenama. Preporučujem svima koji traže kvalitet.",
    img: "https://avatar.vercel.sh/armin",
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

const ReviewCard = ({
  img,
  name,
  content,
}: {
  img: string;
  name: string;
  content: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-md p-4 transition",
        // light styles
        "bg-secondary/10 hover:bg-secondary/20"
      )}
    >
      <Quote className="absolute top-2 right-2 size-8 text-secondary-muted/50 z-10" />
      <div className="flex flex-row items-center gap-2 mb-3 relative z-20">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt={name}
          src={img}
          unoptimized
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-secondary-foreground">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-muted-foreground italic">
        &quot;{content}&quot;
      </blockquote>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-8">
          <SectionBadge className="mx-auto md:mx-0">Povjerenje</SectionBadge>
          <h2 className="text-3xl lg:text-4xl font-bold mt-4 text-center md:text-left">
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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background"></div>
      </div>
    </section>
  );
}
