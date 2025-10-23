import Container from "@/components/layout/container";
import HeroCarousel from "./hero-carousel";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-blue-50 py-10">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <HeroCarousel />
        <div className="bg-background rounded-md p-6 ">
          <h2 className="text-4xl font-bold mt-8">Ženska majica</h2>
          <p className="text-sm font-light mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>

          <span className="flex items-center gap-3">
            <span className="font-medium text-4xl text-primary">$699</span>
            <span className="font-medium text-2xl text-muted-foreground line-through">
              $999
            </span>
          </span>

          <Button className="mt-8" size="lg">
            Pogledaj
          </Button>
        </div>
        <div className="bg-background rounded-md p-6 ">
          <h2 className="text-4xl font-bold mt-8">Dječja majica</h2>
          <p className="text-sm font-light mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>

          <span className="flex items-center gap-3">
            <span className="font-medium text-4xl text-primary">$699</span>
            <span className="font-medium text-2xl text-muted-foreground line-through">
              $999
            </span>
          </span>

          <Button className="mt-8" size="lg">
            Pogledaj
          </Button>
        </div>
      </Container>
    </section>
  );
}
