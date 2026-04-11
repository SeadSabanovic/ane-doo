import Container from "@/components/layout/container";
import { AboutCtaActions } from "@/components/sections/about/about-cta-actions";

export default function AboutCtaSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Blaga pozadina + točkasta mreža (primary #23695e) */}
      <div
        className="bg-background pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--primary)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)] bg-size-[22px_22px] opacity-[0.14]"
        aria-hidden
      />

      <Container className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
          Spremni za saradnju?
        </h2>
        <p className="text-muted-foreground mt-4 text-lg md:text-xl">
          Istražite naš trenutni asortiman u online katalogu ili nas
          kontaktirajte direktno za veleprodajne upite i namjensku proizvodnju
          po vašoj mjeri.
        </p>

        <AboutCtaActions />
      </Container>
    </section>
  );
}
