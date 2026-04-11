import Container from "@/components/layout/container";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import ProductCard from "@/components/ui/product-card";
import SectionBadge from "@/components/ui/section-badge";
import { getNewProducts } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import {
  getBaseWholesaleUnitPrice,
  getListingUnitPrice,
} from "@/lib/sanity-product-pricing";

export default async function NewSection() {
  const raw = await getNewProducts();
  const products = raw
    .filter((p) => p.images?.[0])
    .map((p) => {
      const base = getBaseWholesaleUnitPrice(p);
      const price =
        p.salePrice != null && base != null ? base : getListingUnitPrice(p);
      return {
        id: p._id,
        name: p.name,
        price,
        salePrice: p.salePrice,
        image: urlFor(p.images[0]).width(400).height(400).url(),
        link: `/katalog/${p.slug.current}`,
        fixedBadge: "Novo",
      };
    });

  return (
    <section className="py-20">
      <Container>
        <SectionBadge className="mx-auto justify-center md:mx-0 md:justify-start">
          Nedavno dodano
        </SectionBadge>
        <h2 className="mt-4 text-center text-3xl font-bold md:text-left lg:text-4xl">
          Nova kolekcija
        </h2>

        {products.length === 0 ? (
          <p className="text-muted-foreground mt-10 text-center md:text-left">
            Trenutno nema dostupnih artikala za prikaz. Pogledajte cijeli
            katalog.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <InteractiveHoverButton
          href="/katalog?sort=newest"
          className="mx-auto mt-10 block w-fit text-center lg:text-left"
          variant="light"
        >
          Pogledaj više
        </InteractiveHoverButton>
      </Container>
    </section>
  );
}
