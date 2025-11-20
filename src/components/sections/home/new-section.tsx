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
      image:
        "https://i.pinimg.com/736x/d7/5b/4f/d75b4f080a55b0500799077eb37989a3.jpg",
      badge: "Novo",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 2,
      name: "Product 2",
      price: 17.99,
      badge: "M / L / XL",
      image:
        "https://i.pinimg.com/1200x/82/6b/35/826b3584f6cdeb75dcbf1e2801313521.jpg",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 3,
      name: "Product 3",
      price: 18.99,
      badge: "Novo",
      image:
        "https://i.pinimg.com/736x/d8/6c/a7/d86ca7b2f915885bc5ef7d3b1e6cd4ec.jpg",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 4,
      name: "Product 4",
      price: 19.99,
      badge: "Novo",
      image:
        "https://i.pinimg.com/736x/7e/c1/b6/7ec1b6940782133e1a9d04f2db1e2134.jpg",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 5,
      name: "Product 5",
      price: 20.99,
      badge: "Novo",
      image:
        "https://i.pinimg.com/736x/fe/bc/b4/febcb44882494610c8c4b1f5b55ea74b.jpg",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 6,
      name: "Product 6",
      price: 21.99,
      badge: "Novo",
      image:
        "https://i.pinimg.com/1200x/36/83/8f/36838f6fd4d878649c5eab015f591aff.jpg",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 7,
      name: "Product 7",
      price: 22.99,
      badge: "Novo",
      image:
        "https://i.pinimg.com/736x/27/1a/1d/271a1d30b5c96cf9bbeb4a9aaf861548.jpg",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 8,
      name: "Product 8",
      price: 23.99,
      badge: "Novo",
      image:
        "https://i.pinimg.com/1200x/b2/4b/fc/b24bfcec26d2772701f88e06192d1d09.jpg",
      link: "/shop/basic-t-shirt",
    },
  ];
  return (
    <section className="py-20">
      <Container>
        <SectionBadge icon={<Sparkles size={18} />} className="mx-auto md:mx-0">
          Nedavno dodano
        </SectionBadge>
        <h2 className="text-3xl lg:text-4xl font-bold mt-4 text-center md:text-left">
          Nova kolekcija
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
