import Container from "@/components/layout/container";
import ProductCard from "@/components/ui/product-card";
import SectionBadge from "@/components/ui/section-badge";
import { Sparkles } from "lucide-react";

export default function NewSection() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 16.99,
      image: "/images/product/shirt.png",
    },
    {
      id: 2,
      name: "Product 2",
      price: 17.99,
      image: "/images/product/shirt.png",
    },
    {
      id: 3,
      name: "Product 3",
      price: 18.99,
      image: "/images/product/shirt.png",
    },
    {
      id: 4,
      name: "Product 4",
      price: 19.99,
      image: "/images/product/shirt.png",
    },
    {
      id: 5,
      name: "Product 5",
      price: 20.99,
      image: "/images/product/shirt.png",
    },
    {
      id: 6,
      name: "Product 6",
      price: 21.99,
      image: "/images/product/shirt.png",
    },
    {
      id: 7,
      name: "Product 7",
      price: 22.99,
      image: "/images/product/shirt.png",
    },
    {
      id: 8,
      name: "Product 8",
      price: 23.99,
      image: "/images/product/shirt.png",
    },
  ];
  return (
    <section className="py-20">
      <Container>
        <SectionBadge icon={<Sparkles />}>Novo</SectionBadge>
        <h2 className="text-3xl font-bold mt-2">U ponudi</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
