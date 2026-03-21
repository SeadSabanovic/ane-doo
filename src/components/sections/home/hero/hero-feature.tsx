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
    description: "Pouzdana dostava u BiH i regionu",
  },
  {
    icon: <BadgeCheck size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    title: "Provjeren kvalitet",
    description: "Saradnja sa dugogodišnjim dobavljačima",
  },
  {
    icon: <Award size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />,
    title: "12+ godina tradicije",
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
    <div className={cn("flex shrink-0 flex-col items-center gap-4 px-5 py-10")}>
      <div className="text-card-foreground relative flex size-16 items-center justify-center">
        {icon}
        <div className="bg-accent/40 absolute bottom-0 left-1/2 -z-10 size-[60%] -translate-x-1/2 rounded-full" />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-bold">{title}</h3>
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
      <div className="border-secondary/20 mx-auto mt-10 grid w-full max-w-6xl grid-cols-1 gap-8 border-t pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-2">
        {/* Year of experience */}
        <div className="flex flex-col items-center gap-2">
          <span className="flex items-center gap-2">
            <NumberTicker
              value={12}
              seoLabel="12+"
              className="text-foreground text-8xl"
            />
            <p className="text-accent text-2xl font-bold">+</p>
          </span>
          <h3 className="text-center text-lg font-semibold">Godina iskustva</h3>
        </div>

        {/* Products */}
        <div className="flex flex-col items-center gap-2">
          <span className="flex items-center gap-2">
            <NumberTicker
              value={988}
              seoLabel="988+"
              className="text-foreground text-8xl"
            />
            <p className="text-accent text-2xl font-bold">+</p>
          </span>
          <h3 className="text-center text-lg font-semibold">Proizvoda</h3>
        </div>

        {/* Regional markets */}
        <div className="flex flex-col items-center gap-2">
          <span className="flex items-center gap-2">
            <NumberTicker
              value={4}
              seoLabel="4"
              className="text-foreground text-8xl"
            />
          </span>
          <h3 className="text-center text-lg font-semibold">
            Regionalna tržišta
          </h3>
        </div>

        {/* Tons imported */}
        <div className="flex flex-col items-center gap-2">
          <span className="flex items-center gap-2">
            <NumberTicker
              value={300}
              seoLabel="300+"
              className="text-foreground text-8xl"
            />
            <p className="text-accent text-2xl font-bold">+</p>
          </span>
          <h3 className="text-center text-lg leading-snug font-semibold">
            Tona robe uvezeno
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HeroFeature;
