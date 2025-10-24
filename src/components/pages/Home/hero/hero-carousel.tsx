import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function HeroCarousel() {
  return (
    <div className="bg-background rounded-md p-6 row-span-2 flex flex-col justify-center lg:col-span-3">
      <h4 className="text-2xl">
        <span className="text-primary text-5xl font-bold">30%</span>
        <br />
        <span className=" font-light">sniženje</span>
      </h4>

      <h2 className="text-4xl font-bold mt-8">Muška majica</h2>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
      <Button className="mt-8 w-fit" size="lg">
        Pogledaj <ArrowUpRight />
      </Button>
    </div>
  );
}
