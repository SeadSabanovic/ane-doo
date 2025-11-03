import Container from "@/components/layout/container";
import PageHeader from "@/components/layout/page-header";
import ShopSidebar from "@/components/sections/shop/shop-sidebar";
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
      <PageHeader
        title="Shop"
        description="Pregledajte našu kolekciju proizvoda"
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Shop", href: "/shop" },
        ]}
      />
      <Container className="flex flex-col lg:flex-row gap-8">
        <ShopSidebar />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
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
