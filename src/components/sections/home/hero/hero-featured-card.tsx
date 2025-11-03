import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function HeroFeaturedCard() {
  return (
    <div className="bg-background rounded-md p-6 flex gap-5 items-center lg:col-span-2 h-full">
      <div className="flex-1 flex flex-col justify-between items-start h-full">
        <h2 className="text-3xl font-bold">Dječja majica</h2>
        <p className="text-sm mt-auto">Ograničeni popust</p>

        <span className="flex items-center gap-3 mt-2">
          <span className="font-medium text-4xl text-primary">$699</span>
          <span className="font-medium text-2xl text-muted-foreground line-through">
            $999
          </span>
        </span>

        <Button className="mt-8 w-fit" size="lg">
          Pogledaj <ArrowUpRight />
        </Button>
      </div>
      <Image
        src="/images/product/shirt.png"
        alt="Shirt"
        width={500}
        height={500}
        className="object-contain max-w-[30%]"
      />
    </div>
  );
}
