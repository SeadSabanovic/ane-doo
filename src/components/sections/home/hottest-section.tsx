import Container from "@/components/layout/container";
import ProductCard from "@/components/ui/product-card";
import { Flame } from "lucide-react";

export default function HottestSection() {
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
    
  ];
  return (
    <section className="py-10">
      <Container>
        <div className="flex items-center gap-3">
          <Flame />
          <span className="text-md leading-none font-medium">
            Najprodavanije
          </span>
        </div>
        <h2 className="text-3xl font-bold mt-2">Ovog mjeseca</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
