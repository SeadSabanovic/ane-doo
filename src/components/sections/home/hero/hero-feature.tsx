import { Award, BadgeCheck, Boxes, Store, Tag, Truck } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const ICON_SIZE = 36;
const ICON_STROKE_WIDTH = 1;

const featureData = [
  {
    icon: <Store size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    title: "Veleprodaja i maloprodaja",
    description: "Mogućnost kupovine manjih količina",
  },
  {
    icon: <Tag size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    title: "Veliki izbor artikala",
    description: "Široka ponuda odjeće i kućnog tekstila",
  },
  {
    icon: <Truck size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    title: "Brza isporuka",
    description: "Pouzdana dostava širom BiH",
  },
  {
    icon: <BadgeCheck size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    title: "Provjeren kvalitet",
    description: "Saradnja sa dugogodišnjim dobavljačima",
  },
  {
    icon: <Award size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    title: "20+ godina tradicije",
    description: "Porodična firma sa dugogodišnjim povjerenjem",
  },
  {
    icon: <Boxes size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
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
    <div className={cn("flex items-center gap-4 flex-col py-10 px-5 shrink-0")}>
      <div className="size-16 flex items-center justify-center text-card-foreground relative">
        {icon}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-[60%] bg-accent/40 rounded-full -z-10" />
      </div>

      <div className="text-center">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-md">{description}</p>
      </div>
    </div>
  );
};

const HeroFeature = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s] md:[--duration:40s]">
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
