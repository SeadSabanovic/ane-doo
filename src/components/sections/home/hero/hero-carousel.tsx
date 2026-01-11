import Container from "@/components/layout/container";
import AnimatedImage from "@/components/ui/animated-image";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Link from "next/link";

const heroData = {
  title: "Pouzdan veleprodajni partner",
  description:
    "Porodična firma koja već više od 20 godina spaja tradiciju i veleprodaju odjeće i kućnog tekstila.",
  image: "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg",
  ctaHref: "/shop",
};

export default function HeroCarousel() {
  return (
    <section className="overflow-hidden h-full min-h-[calc(85svh-var(--nav-height))] lg:min-h-[calc(75svh-var(--nav-height))] flex flex-col items-center justify-center relative sm:py-4">
      <Container className="flex flex-1 flex-col justify-end gap-6 h-full w-full z-30 relative sm:rounded-lg overflow-hidden">
        <div className="flex flex-col justify-between lg:justify-center items-center lg:items-start p-6 pt-4 lg:pt-6 py-12 h-fit lg:rounded-tr-lg pb-[10svh] z-30">
          <div className="flex flex-col gap-2 items-center w-full">
            <h1 className="text-lg font-bold text-center text-background text-shadow-sm">
              ANE D.O.O.
            </h1>
            <h2 className="text-5xl font-bold lg:text-6xl text-background text-shadow-sm text-center">
              {heroData.title}
            </h2>
            <p className="mt-4 text-center text-lg md:text-2xl text-shadow-sm text-background max-w-2xl">
              {heroData.description}
            </p>
            <Link href={heroData.ctaHref}>
              <InteractiveHoverButton className="mt-8 w-fit text-center">
                Pogledaj
              </InteractiveHoverButton>
            </Link>
          </div>
        </div>
        <AnimatedImage
          src={heroData.image}
          alt={heroData.title}
          width={1600}
          height={900}
          className="object-cover absolute top-0 left-0 w-full h-full z-10"
          priority
        />
        <div className="absolute bottom-0 left-0 w-full h-full z-20 bg-linear-to-t from-primary/50 to-primary/0" />
      </Container>
    </section>
  );
}
