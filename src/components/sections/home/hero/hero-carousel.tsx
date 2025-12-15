import Container from "@/components/layout/container";
import AnimatedImage from "@/components/ui/animated-image";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Link from "next/link";

const heroData = {
  title: "Pouzdan veleprodajni partner",
  description:
    "Porodična firma koja već više od 20 godina spaja tradiciju i veleprodaju odjeće i kućnog tekstila.",
  image: "https://images.pexels.com/photos/3262937/pexels-photo-3262937.jpeg",
  ctaHref: "/shop",
};

export default function HeroCarousel() {
  return (
    <section className="bg-muted/20 overflow-hidden h-full min-h-[calc(85svh-var(--nav-height))] lg:min-h-[calc(75svh-var(--nav-height))] flex flex-col items-center justify-center relative">
      <Container className="flex flex-1 flex-col justify-end gap-6 h-full w-full relative z-30">
        <div className="flex flex-col justify-between lg:justify-center items-center lg:items-start p-6 pt-4 lg:pt-6 py-12 h-fit lg:rounded-tr-lg pb-[10svh] ">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold text-center lg:text-left text-background text-shadow-sm">
              ANE D.O.O.
            </h1>
            <h2 className="text-6xl font-bold text-center lg:text-8xl lg:text-left text-background text-shadow-sm">
              {heroData.title}
            </h2>
            <p className="mt-4 text-center text-lg lg:text-left md:text-2xl text-shadow-sm text-background">
              {heroData.description}
            </p>
          </div>
          <Link href={heroData.ctaHref}>
            <InteractiveHoverButton className="mt-8 w-fit text-center lg:text-left">
              Pogledaj
            </InteractiveHoverButton>
          </Link>
        </div>
      </Container>
      <AnimatedImage
        src={heroData.image}
        alt={heroData.title}
        width={1600}
        height={900}
        className="object-cover absolute top-0 left-0 w-full h-full z-10"
        priority
      />
      <div className="absolute bottom-0 left-0 w-full h-full z-20 bg-linear-to-t from-secondary to-secondary-muted/0" />
    </section>
  );
}
