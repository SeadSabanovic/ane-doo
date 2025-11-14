import Container from "@/components/layout/container";
import { Heart, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import SectionBadge from "@/components/ui/section-badge";
import Image from "next/image";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Amina Hadžić",
    role: "Kupac",
    content:
      "Odlična kvaliteta majica, brza dostava i profesionalna usluga. Preporučujem svima!",
    img: "https://avatar.vercel.sh/amina",
  },
  {
    id: "testimonial-2",
    name: "Emir Kovačević",
    role: "Kupac",
    content:
      "Najbolji izbor odjeće u gradu. Cijene su pristupačne, a kvaliteta izvrsna.",
    img: "https://avatar.vercel.sh/emir",
  },
  {
    id: "testimonial-3",
    name: "Lejla Smajić",
    role: "Kupac",
    content:
      "Kupujem ovdje već godinama i nikad nisam bila razočarana. Topla preporuka!",
    img: "https://avatar.vercel.sh/lejla",
  },
  {
    id: "testimonial-4",
    name: "Adnan Hodžić",
    role: "Kupac",
    content: "Odličan odnos cijene i kvalitete. Dostava je uvijek na vrijeme.",
    img: "https://avatar.vercel.sh/adnan",
  },
  {
    id: "testimonial-5",
    name: "Emina Dervišević",
    role: "Kupac",
    content:
      "Veliki izbor, ljubazno osoblje i brza usluga. Definitivno ću se vratiti!",
    img: "https://avatar.vercel.sh/emina",
  },
  {
    id: "testimonial-6",
    name: "Armin Bajramović",
    role: "Kupac",
    content:
      "Kvalitetna odjeća po pristupačnim cijenama. Preporučujem svima koji traže kvalitet.",
    img: "https://avatar.vercel.sh/armin",
  },
  {
    id: "testimonial-7",
    name: "Armin Bajramović",
    role: "Kupac",
    content:
      "Kvalitetna odjeća po pristupačnim cijenama. Preporučujem svima koji traže kvalitet.",
    img: "https://avatar.vercel.sh/armin",
  },
  {
    id: "testimonial-8",
    name: "Armin Bajramović",
    role: "Kupac",
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
  role,
  content,
}: {
  img: string;
  name: string;
  role: string;
  content: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5",
        // dark styles
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15"
      )}
    >
      <Quote className="absolute top-2 right-2 size-8 text-gray-200 z-10" />
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
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{role}</p>
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
    <section className="py-10">
      <Container>
        <div className="mb-8">
          <SectionBadge icon={<Heart />}>Povjerenje</SectionBadge>
          <h2 className="text-3xl font-bold mt-2">Naši klijenti kažu</h2>
        </div>
      </Container>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg">
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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
