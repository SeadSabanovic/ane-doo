import Container from "@/components/layout/container";
import ProductCard from "@/components/ui/product-card";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ANE D.O.O. | Spašeni proizvodi",
  description:
    "Vaši omiljeni proizvodi na jednom mjestu. Pregledajte sve artikle koje ste sačuvali.",
};

export default function FavoritesPage() {
  // Privremeni dummy podaci za spašene proizvode
  const favorites = [
    {
      id: 1,
      name: "Basic T-Shirt",
      price: 29.99,
      image: "/images/product/shirt.png",
      slug: "basic-t-shirt",
    },
    {
      id: 3,
      name: "Denim Jacket",
      price: 89.99,
      image: "/images/product/shirt.png",
      slug: "denim-jacket",
    },
  ];

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Spašeni proizvodi</h1>
          </div>
          <p className="text-muted-foreground">
            Vaši omiljeni proizvodi na jednom mjestu
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">
              Nemate spašenih proizvoda
            </h2>
            <p className="text-muted-foreground mb-6">
              Počnite pregledavati i dodajte svoje omiljene artikle
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Istraži Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <Link key={product.id} href={`/shop/${product.slug}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
