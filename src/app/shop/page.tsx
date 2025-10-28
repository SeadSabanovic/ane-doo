import Container from "@/components/layout/container";
import ProductCard from "@/components/ui/product-card";
import Link from "next/link";

export default function ShopPage() {
  // Privremeni dummy podaci za proizvode
  const products = [
    {
      id: 1,
      name: "Basic T-Shirt",
      price: 29.99,
      image: "/images/product/shirt.png",
      slug: "basic-t-shirt",
    },
    {
      id: 2,
      name: "Classic Hoodie",
      price: 59.99,
      image: "/images/product/shirt.png",
      slug: "classic-hoodie",
    },
    {
      id: 3,
      name: "Denim Jacket",
      price: 89.99,
      image: "/images/product/shirt.png",
      slug: "denim-jacket",
    },
    {
      id: 4,
      name: "Sport Sneakers",
      price: 79.99,
      image: "/images/product/shirt.png",
      slug: "sport-sneakers",
    },
    {
      id: 5,
      name: "Casual Pants",
      price: 49.99,
      image: "/images/product/shirt.png",
      slug: "casual-pants",
    },
    {
      id: 6,
      name: "Summer Dress",
      price: 69.99,
      image: "/images/product/shirt.png",
      slug: "summer-dress",
    },
  ];

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shop</h1>
          <p className="text-muted-foreground">
            Pregledajte našu kolekciju proizvoda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/shop/${product.slug}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
