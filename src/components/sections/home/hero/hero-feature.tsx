import { Award, BadgeCheck, Boxes, Store, Tag, Truck } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { NumberTicker } from "@/components/ui/number-ticker";

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

      {/* Tickers */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full mt-10 border-t border-secondary/20 pt-10">
        {/* Year of experience */}
        <div className="flex flex-1 items-center gap-2 flex-col">
          <span className="flex items-center gap-2">
            <NumberTicker
              value={27}
              className="text-foreground text-8xl lg:text-9xl"
            />
            <p className="text-2xl font-bold text-accent">+</p>
          </span>
          <h3 className="text-lg">Godina iskustva</h3>
        </div>

        {/* Products */}
        <div className="flex flex-1 items-center gap-2 flex-col">
          <span className="flex items-center gap-2">
            <NumberTicker
              value={988}
              className="text-foreground text-8xl lg:text-9xl"
            />
            <p className="text-2xl font-bold text-accent">+</p>
          </span>
          <h3 className="text-lg">Proizvoda</h3>
        </div>
      </div>
    </div>
  );
};

export default HeroFeature;
