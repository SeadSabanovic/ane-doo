import Container from "@/components/layout/container";
import AnimatedImage from "@/components/ui/animated-image";
import SectionBadge from "@/components/ui/section-badge";

export default function AboutHeroSection() {
  return (
    <section className="mb-20">
      <Container className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col lg:col-span-3">
          <SectionBadge className="justify-start">Naše vrijednosti</SectionBadge>
          <h2 className="mt-4 text-3xl font-bold lg:text-4xl">
            Tradicija, Povjerenje, Kvalitet
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg leading-relaxed">
            Korijeni firme Ane d.o.o. sežu u decenije iskustva porodice Adžajlić u svijetu tekstila. Ono što je započelo kao strast prema kvalitetnim materijalima, krunisano je osnivanjem firme pod vodstvom Alije Adžajlića. Danas, sa više od 12 godina samostalnog rada, ponosni smo na stabilnost i integritet koji gradimo sa našim partnerima.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-2xl w-full lg:col-span-2 mt-8 lg:mt-0">
          <AnimatedImage
            src="/images/about/ane-doo-about-1.jpg"
            alt="Kolekcija dukserica"
            width={420}
            height={420}
            className="object-cover aspect-square w-full h-full rounded-2xl -mt-8"
          />
          <AnimatedImage
            src="https://i.pinimg.com/736x/17/13/b5/1713b5534375e9453953f5b1d54c8302.jpg"
            alt="Kolekcija dukserica"
            width={420}
            height={420}
            className="object-cover aspect-square w-full h-full rounded-2xl"
          />
          <AnimatedImage
            src="https://i.pinimg.com/1200x/32/d0/fc/32d0fc784a4b3734ac127fbd5b970423.jpg"
            alt="Kolekcija dukserica"
            width={420}
            height={420}
            className="object-cover aspect-square w-full h-full rounded-2xl -mt-8"
          />
          <AnimatedImage
            src="https://i.pinimg.com/1200x/05/85/48/058548136951490d5622240648dd3455.jpg"
            alt="Kolekcija dukserica"
            width={420}
            height={420}
            className="object-cover aspect-square w-full h-full rounded-2xl"
          />
        </div>
      </Container>
    </section>
  );
}
