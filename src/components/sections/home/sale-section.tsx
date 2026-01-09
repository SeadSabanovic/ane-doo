import Container from "@/components/layout/container";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SectionBadge from "@/components/ui/section-badge";
import Image from "next/image";
import Link from "next/link";

export default function SaleSection() {
  return (
    <section className="py-10">
      <Container className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2 justify-center items-center text-center lg:text-left lg:items-start">
          <SectionBadge>Akcija</SectionBadge>
          <h2 className="text-6xl font-bold">Sezonska ponuda</h2>
          <p className="text-muted-foreground mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <Link href="/shop">
            <InteractiveHoverButton className="mt-8 w-fit text-center lg:text-left">
              Pogledaj
            </InteractiveHoverButton>
          </Link>
        </div>
        <div className="aspect-square overflow-hidden relative rounded-md">
          <Image
            src="https://i.pinimg.com/736x/f5/ea/49/f5ea49e3d8958eb88f5f6e8fba99a880.jpg"
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
