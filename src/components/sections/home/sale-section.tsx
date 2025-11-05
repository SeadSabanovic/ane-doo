import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/ui/section-badge";
import { ArrowUpRight, Percent } from "lucide-react";
import Image from "next/image";

export default function SaleSection() {
  return (
    <section className="py-10">
      <Container className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2 justify-center">
          <SectionBadge icon={<Percent />}>Akcija</SectionBadge>
          <h2 className="text-6xl font-bold">Sezonska ponuda</h2>
          <p className="text-muted-foreground mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <Button className="mt-4 w-fit" size="lg">
            Pogledaj <ArrowUpRight />
          </Button>
        </div>
        <div className="aspect-video overflow-hidden relative rounded-md">
          <Image
            src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg"
            alt="Sale"
            width={1000}
            height={1000}
            className="object-cover w-full h-full absolute top-0 left-0"
          />
        </div>
      </Container>
    </section>
  );
}
