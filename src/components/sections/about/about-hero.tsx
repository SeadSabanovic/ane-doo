import Container from "@/components/layout/container";
import AnimatedImage from "@/components/ui/animated-image";
import SectionBadge from "@/components/ui/section-badge";

export default function AboutHeroSection() {
  return (
    <section className="mb-20">
      <Container className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="flex flex-col lg:col-span-3">
          <SectionBadge className="justify-start">
            Naše vrijednosti
          </SectionBadge>
          <h2 className="mt-4 text-3xl font-bold lg:text-4xl">
            Tradicija, Povjerenje, Kvalitet
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
            Korijeni firme ANE d.o.o. sežu u decenije iskustva porodice Adžajlić
            u svijetu tekstila. Ono što je započelo kao strast prema kvalitetnim
            materijalima, krunisano je osnivanjem firme pod vodstvom Alije
            Adžajlića. Danas, sa više od 12 godina samostalnog rada, ponosni smo
            na stabilnost i integritet koji gradimo sa našim partnerima.
          </p>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 gap-4 rounded-2xl lg:col-span-2 lg:mt-0">
          <AnimatedImage
            src="/images/about/ane-doo-about-1.jpg"
            alt="Pakovanja Odjeće"
            width={420}
            height={420}
            className="-mt-8 aspect-square h-full w-full rounded-2xl object-cover"
          />
          <AnimatedImage
            src="/images/about/ane-doo-about-2.png"
            alt="Prazni ofingeri na vješalici"
            width={420}
            height={420}
            className="aspect-square h-full w-full rounded-2xl object-cover"
          />
          <AnimatedImage
            src="/images/about/ane-doo-about-3.jpg"
            alt="Grad Sarajevo"
            width={420}
            height={420}
            className="-mt-8 aspect-square h-full w-full rounded-2xl object-cover"
          />
          <AnimatedImage
            src="/images/about/ane-doo-about-4.png"
            alt="Skladište robe - Viljuškar"
            width={420}
            height={420}
            className="aspect-square h-full w-full rounded-2xl object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
