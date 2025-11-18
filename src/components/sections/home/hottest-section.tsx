import Container from "@/components/layout/container";
import ProductCard from "@/components/ui/product-card";
import SectionBadge from "@/components/ui/section-badge";
import { Flame } from "lucide-react";

export default function HottestSection() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 16.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://images.pexels.com/photos/9558695/pexels-photo-9558695.jpeg?_gl=1*1ucphhq*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIzNDg0MzckbzIkZzEkdDE3NjIzNDg1NjYkajU5JGwwJGgw",
    },
    {
      id: 2,
      name: "Product 2",
      price: 17.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://images.pexels.com/photos/9558695/pexels-photo-9558695.jpeg?_gl=1*1ucphhq*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIzNDg0MzckbzIkZzEkdDE3NjIzNDg1NjYkajU5JGwwJGgw",
    },
    {
      id: 3,
      name: "Product 3",
      price: 18.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://images.pexels.com/photos/9558695/pexels-photo-9558695.jpeg?_gl=1*1ucphhq*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIzNDg0MzckbzIkZzEkdDE3NjIzNDg1NjYkajU5JGwwJGgw",
    },
    {
      id: 4,
      name: "Product 4",
      price: 19.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://images.pexels.com/photos/9558695/pexels-photo-9558695.jpeg?_gl=1*1ucphhq*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIzNDg0MzckbzIkZzEkdDE3NjIzNDg1NjYkajU5JGwwJGgw",
    },
    {
      id: 5,
      name: "Product 5",
      price: 20.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://images.pexels.com/photos/9558695/pexels-photo-9558695.jpeg?_gl=1*1ucphhq*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIzNDg0MzckbzIkZzEkdDE3NjIzNDg1NjYkajU5JGwwJGgw",
    },
    {
      id: 6,
      name: "Product 6",
      price: 21.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://images.pexels.com/photos/9558695/pexels-photo-9558695.jpeg?_gl=1*1ucphhq*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIzNDg0MzckbzIkZzEkdDE3NjIzNDg1NjYkajU5JGwwJGgw",
    },
    {
      id: 7,
      name: "Product 7",
      price: 22.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://images.pexels.com/photos/9558695/pexels-photo-9558695.jpeg?_gl=1*1ucphhq*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIzNDg0MzckbzIkZzEkdDE3NjIzNDg1NjYkajU5JGwwJGgw",
    },
    {
      id: 8,
      name: "Product 8",
      price: 23.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://images.pexels.com/photos/9558695/pexels-photo-9558695.jpeg?_gl=1*1ucphhq*_ga*MjU2NTE2NTYyLjE3NjIyNDU2NTE.*_ga_8JE65Q40S6*czE3NjIzNDg0MzckbzIkZzEkdDE3NjIzNDg1NjYkajU5JGwwJGgw",
    },
  ];
  return (
    <section className="py-20">
      <Container>
        <SectionBadge icon={<Flame size={18} />}>Najprodavanije</SectionBadge>
        <h2 className="text-3xl font-bold mt-2">Ovog mjeseca</h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
