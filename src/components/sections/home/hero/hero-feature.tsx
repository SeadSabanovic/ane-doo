import Container from "@/components/layout/container";
import { Award, BadgeCheck, Boxes, Store, Tag, Truck } from "lucide-react";

const featureData = [
  {
    icon: <Store />,
    title: "Veleprodaja i maloprodaja",
    description: "Mogućnost kupovine manjih količina",
  },
  {
    icon: <Tag />,
    title: "Veliki izbor artikala",
    description: "Široka ponuda odjeće i kućnog tekstila",
  },
  {
    icon: <Truck />,
    title: "Brza isporuka",
    description: "Pouzdana dostava širom BiH",
  },
  {
    icon: <BadgeCheck />,
    title: "Provjeren kvalitet",
    description: "Saradnja sa dugogodišnjim dobavljačima",
  },
  {
    icon: <Award />,
    title: "20+ godina tradicije",
    description: "Porodična firma sa dugogodišnjim povjerenjem",
  },
  {
    icon: <Boxes />,
    title: "Uvijek dostupna roba",
    description: "Stalan lager najtraženijih artikala",
  },
];

const HeroFeature = () => {
  return (
    <Container>
      <div className="rounded-md grid sm:grid-cols-2 lg:grid-cols-3 mx-auto overflow-hidden bg-linear-to-r from-primary to-card-foreground py-10">
        {featureData.map((item, key) => (
          <div
            className={"flex items-center gap-4 flex-col xl:flex-1 py-6 px-5"}
            key={key}
          >
            <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
              {item.icon && item.icon}
            </div>

            <div className="text-center">
              <h3 className="font-bold text-lg text-background">
                {item.title}
              </h3>
              <p className="text-md text-muted">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HeroFeature;
