import AneDooIcon from "@/components/icons/ane-doo-icon";
import Container from "@/components/layout/container";
import AnimatedImage from "@/components/ui/animated-image";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Link from "next/link";

const heroData = {
  title: "Pouzdan veleprodajni partner",
  description:
    "Porodična firma koja već više od 20 godina spaja tradiciju i veleprodaju odjeće i kućnog tekstila.",
  image: "/images/home/ane-doo-landing.jpeg",
  ctaHref: "/shop",
};

export default function HeroCarousel() {
  return (
    <section className="relative flex h-full min-h-[calc(90svh-var(--nav-height))] flex-col items-center justify-center overflow-hidden sm:py-4 lg:min-h-[calc(80svh-var(--nav-height))]">
      <Container className="relative z-30 flex h-full w-full flex-1 flex-col justify-end gap-6 overflow-hidden sm:rounded-lg">
        <div className="z-30 flex h-fit flex-col items-center justify-between p-6 py-12 pt-4 pb-[10svh] lg:items-start lg:justify-center lg:rounded-tr-lg lg:pt-6">
          <div className="flex w-full flex-col items-center gap-2">
            <AneDooIcon className="size-12" animated />
            <h1 className="text-background text-center text-lg font-bold text-shadow-sm">
              ANE d.o.o. Sarajevo
            </h1>
            <h2 className="text-background text-center text-5xl font-bold text-shadow-sm lg:text-6xl">
              {heroData.title}
            </h2>
            <p className="text-background mt-4 max-w-2xl text-center text-lg text-shadow-sm md:text-2xl">
              {heroData.description}
            </p>
            <Link href={heroData.ctaHref}>
              <InteractiveHoverButton
                className="mt-8 w-fit text-center"
                variant="light"
              >
                Shop
              </InteractiveHoverButton>
            </Link>
          </div>
        </div>
        <AnimatedImage
          src={heroData.image}
          alt={heroData.title}
          width={1600}
          height={900}
          className="absolute top-0 left-0 z-10 h-full w-full object-cover"
          priority
          fetchPriority="high"
        />
        <div className="from-primary/40 to-primary/0 absolute bottom-0 left-0 z-20 h-full w-full bg-linear-to-t" />
      </Container>
    </section>
  );
}
