import Container from "@/components/layout/container";
import SectionBadge from "@/components/ui/section-badge";
import AboutBentoGlobeLoader from "@/components/sections/about/about-bento-globe-loader";
import { Package, PaletteIcon, Store, Truck } from "lucide-react";
import type { ReactNode } from "react";
import AnimatedImage from "@/components/ui/animated-image";

/** Isti vizuelni jezik kao `hero-feature` → FeatureCard ikone */
const ICON_SIZE = 36;
const ICON_STROKE_WIDTH = 1;

function BentoFeatureIcon({ children }: { children: ReactNode }) {
  return (
    <div className="text-card-foreground relative flex size-16 shrink-0 items-center justify-center">
      {children}
      <div className="bg-accent/40 absolute bottom-0 left-1/2 -z-10 size-[60%] -translate-x-1/2 rounded-full" />
    </div>
  );
}

export default function AboutBentoSection() {
  return (
    <section className="pb-20">
      <Container>
        <SectionBadge>Uvoz i Logistika</SectionBadge>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold lg:text-4xl">
          Od fabrika u Turskoj i Indoneziji do vašeg butika
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
          Direktan uvoz bez posrednika osigurava bolju cijenu, strogu kontrolu
          kvaliteta i stalnu dostupnost robe na našem skladištu u Sarajevu.
        </p>

        <div className="mt-12 grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-6">
          {/* CARD 1: Globe */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border md:col-span-6 lg:col-span-4 lg:row-span-2">
            <div className="p-6 pb-0">
              <div className="text-primary flex flex-col items-start gap-3">
                <BentoFeatureIcon>
                  <Truck
                    size={ICON_SIZE}
                    strokeWidth={ICON_STROKE_WIDTH}
                    aria-hidden
                  />
                </BentoFeatureIcon>
                <h3 className="text-foreground text-xl font-semibold">
                  Uvoz bez posrednika
                </h3>
              </div>
              <p className="mt-auto max-w-2xl pt-3 leading-relaxed md:text-base">
                Specijalizovani smo za nabavku tekstila direktno iz provjerenih
                fabrika u Turskoj i Indoneziji. Ovakav pristup nam omogućava
                strogu kontrolu kvaliteta svakog materijala i konkurentne ulazne
                cijene za naše poslovne partnere.
              </p>
            </div>
            <AboutBentoGlobeLoader />
          </div>

          {/* CARD 2: Logistika */}
          <div className="flex flex-col overflow-hidden rounded-2xl border md:col-span-3 lg:col-span-2">
            <div className="flex flex-1 flex-col p-6">
              <div className="text-primary flex flex-col items-start gap-3">
                <BentoFeatureIcon>
                  <Package
                    size={ICON_SIZE}
                    strokeWidth={ICON_STROKE_WIDTH}
                    aria-hidden
                  />
                </BentoFeatureIcon>
                <h3 className="text-foreground text-xl font-semibold">
                  Roba na stanju u Sarajevu
                </h3>
              </div>
              <p className="mt-auto max-w-2xl pt-3 leading-relaxed md:text-base">
                Asortiman koji nudimo nalazi se na našem skladištu u Sarajevu.
                To vam osigurava brzu dopunu zaliha vaših butika i trgovina, bez
                potrebe za čekanjem dugotrajnih uvoznih procesa, transporta ili
                carinjenja robe.
              </p>
            </div>
          </div>

          {/* CARD 3: Kvalitet */}
          <div className="flex flex-col rounded-2xl border p-6 md:col-span-3 lg:col-span-2">
            <div className="text-primary flex flex-col items-start gap-3">
              <BentoFeatureIcon>
                <PaletteIcon
                  size={ICON_SIZE}
                  strokeWidth={ICON_STROKE_WIDTH}
                  aria-hidden
                />
              </BentoFeatureIcon>
              <h3 className="text-foreground text-xl font-semibold">
                Brendiranje i izrada po mjeri
              </h3>
            </div>
            <p className="mt-auto max-w-2xl pt-3 leading-relaxed md:text-base">
              Nudimo vam mogućnost proizvodnje artikala prema vašim
              specifikacijama i dizajnu. Možete naručiti namjenske serije
              tekstila sa sopstvenim logotipom, što je idealno rješenje za veće
              butike, hotele ili specijalizovane prodavnice.
            </p>
          </div>

          {/* CARD 4: B2B — mobil: tekst pa slika; desktop: pola / pola */}
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border md:col-span-6 lg:grid-cols-2 lg:items-stretch">
            <div className="flex min-w-0 flex-1 flex-col p-6">
              <div className="text-primary flex flex-col items-start gap-3">
                <BentoFeatureIcon>
                  <Store
                    size={ICON_SIZE}
                    strokeWidth={ICON_STROKE_WIDTH}
                    aria-hidden
                  />
                </BentoFeatureIcon>
                <h3 className="text-foreground text-xl font-semibold">
                  Regionalna mreža i stabilnost
                </h3>
              </div>
              <p className="mt-auto max-w-2xl pt-3 leading-relaxed md:text-base">
                Pored preko 100 aktivnih partnera u Bosni i Hercegovini,
                uspješno razvijamo distribuciju na tržištima Hrvatske, Srbije i
                Crne Gore. Fokusirani smo na održavanje kontinuiteta asortimana
                i fer uslove saradnje koji omogućavaju zajednički rast vašeg i
                našeg biznisa u cijeloj regiji.
              </p>
            </div>
            <div className="relative aspect-video w-full">
              <AnimatedImage
                src="https://images.pexels.com/photos/4792352/pexels-photo-4792352.jpeg?_gl=1*ia7oto*_ga*MjA0MTQwODUxLjE3NjMzMjUxNzE.*_ga_8JE65Q40S6*czE3NzQxMDYyOTQkbzgkZzEkdDE3NzQxMDYzMTkkajM1JGwwJGgw"
                alt="ANE d.o.o. Sarajevo"
                width={600}
                height={600}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
