import Container from "@/components/layout/container";
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
    <Container className="">
      <div className="flex flex-wrap items-center justify-center gap-8 py-10 bg-card rounded-t-md px-4">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4 flex-col xl:flex-1" key={key}>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              {item.icon && item.icon}
            </div>

            <div className="text-center">
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-md">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HeroFeature;
