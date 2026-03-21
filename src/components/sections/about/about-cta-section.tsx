import Container from "@/components/layout/container";
import { AboutCtaActions } from "@/components/sections/about/about-cta-actions";

export default function AboutCtaSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Blaga pozadina + točkasta mreža (primary #23695e) */}
      <div
        className="pointer-events-none absolute inset-0 bg-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--primary)_1px,transparent_1px)] bg-size-[22px_22px] opacity-[0.14] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
        aria-hidden
      />

      <Container className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Spremni za saradnju?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Istražite naš trenutni asortiman na online shopu ili nas kontaktirajte direktno za veleprodajne upite i namjensku proizvodnju po vašoj mjeri.
        </p>

        <AboutCtaActions />
      </Container>
    </section>
  );
}
