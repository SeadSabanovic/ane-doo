import { BadgeCheck, Tag, Truck } from "lucide-react";

const featureData = [
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
];

const HeroFeature = () => {
  return (
    <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-10 bg-background rounded-t-md">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              {item.icon && item.icon}
            </div>

            <div>
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-md">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
