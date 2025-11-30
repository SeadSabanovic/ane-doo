import Container from "@/components/layout/container";
import { Award, BadgeCheck, Boxes, Store, Tag, Truck } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

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

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className={cn("flex items-center gap-4 flex-col py-20 px-5 shrink-0")}>
      <div className="size-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
        {icon}
      </div>

      <div className="text-center">
        <h3 className="font-bold text-lg text-background">{title}</h3>
        <p className="text-md text-muted">{description}</p>
      </div>
    </div>
  );
};

const HeroFeature = () => {
  const firstRow = featureData;

  return (
    <>
      {/* Mobile/Tablet - Marquee Animation */}
      <div className="lg:hidden relative flex w-full flex-col items-center justify-center overflow-hidden bg-linear-to-r from-primary to-card-foreground">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((item, index) => (
            <FeatureCard
              key={`feature-1-${index}`}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </Marquee>
      </div>

      {/* Desktop - Grid Layout */}
      <div className="bg-linear-to-r from-primary to-card-foreground py-10 hidden lg:block">
        <Container className="lg:grid lg:grid-cols-3 rounded-b-md mx-auto overflow-hidden">
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
        </Container>
      </div>
    </>
  );
};

export default HeroFeature;
