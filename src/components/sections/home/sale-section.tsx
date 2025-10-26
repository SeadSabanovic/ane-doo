import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function SaleSection() {
  return (
    <section className="py-10">
      <Container className="border rounded-md md:col-span-2 relative overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-6 flex flex-col justify-center items-center z-20 col-span-1">
          <h2 className="text-6xl font-bold">Sezonska ponuda</h2>
          <p className="text-muted-foreground mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <Button className="mt-8 w-fit" size="lg">
            Pogledaj <ArrowUpRight />
          </Button>
        </div>
        <div className="col-span-1 aspect-video">
          <Image
            src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
            alt="Sale"
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        </div>
      </Container>
    </section>
  );
}
