import Container from "@/components/layout/container";
import ProductCard from "@/components/ui/product-card";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";

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
      name: "Product 1",
      price: 16.99,
      image:
        "https://i.pinimg.com/736x/d7/5b/4f/d75b4f080a55b0500799077eb37989a3.jpg",
      link: "/shop/basic-t-shirt",
      saved: true,
    },
    {
      id: 2,
      name: "Product 2",
      price: 17.99,
      image:
        "https://i.pinimg.com/1200x/82/6b/35/826b3584f6cdeb75dcbf1e2801313521.jpg",
      link: "/shop/basic-t-shirt",
      saved: true,
    },
    {
      id: 3,
      name: "Product 3",
      price: 18.99,
      image:
        "https://i.pinimg.com/736x/d8/6c/a7/d86ca7b2f915885bc5ef7d3b1e6cd4ec.jpg",
      link: "/shop/basic-t-shirt",
      saved: true,
    },
    {
      id: 4,
      name: "Product 4",
      price: 19.99,
      image:
        "https://i.pinimg.com/736x/7e/c1/b6/7ec1b6940782133e1a9d04f2db1e2134.jpg",
      link: "/shop/basic-t-shirt",
      saved: true,
    },
    {
      id: 5,
      name: "Product 5",
      price: 20.99,
      image:
        "https://i.pinimg.com/736x/fe/bc/b4/febcb44882494610c8c4b1f5b55ea74b.jpg",
      link: "/shop/basic-t-shirt",
      saved: true,
    },
    {
      id: 6,
      name: "Product 6",
      price: 21.99,
      image:
        "https://i.pinimg.com/1200x/36/83/8f/36838f6fd4d878649c5eab015f591aff.jpg",
      link: "/shop/basic-t-shirt",
      saved: true,
    },
    {
      id: 7,
      name: "Product 7",
      price: 22.99,
      image:
        "https://i.pinimg.com/736x/27/1a/1d/271a1d30b5c96cf9bbeb4a9aaf861548.jpg",
      link: "/shop/basic-t-shirt",
      saved: true,
    },
    {
      id: 8,
      name: "Product 8",
      price: 23.99,
      image:
        "https://i.pinimg.com/1200x/b2/4b/fc/b24bfcec26d2772701f88e06192d1d09.jpg",
      link: "/shop/basic-t-shirt",
      saved: true,
    },
  ];

  return (
    <>
      <PageHeader
        title="Spašeni proizvodi"
        description="Vaši omiljeni proizvodi na jednom mjestu"
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Spašeni proizvodi", href: "/spaseno" },
        ]}
      />
      <Container className="pb-20">
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
