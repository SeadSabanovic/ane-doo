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
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-linear-to-r from-primary to-card-foreground">
      <Marquee pauseOnHover className="[--duration:20s]">
        {featureData.map((item, index) => (
          <FeatureCard
            key={`feature-${index}`}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default HeroFeature;
