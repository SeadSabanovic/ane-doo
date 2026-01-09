import Container from "@/components/layout/container";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import ProductCard from "@/components/ui/product-card";
import SectionBadge from "@/components/ui/section-badge";
import Link from "next/link";

export default function HottestSection() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 16.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/57/de/dd/57dedd3f780ef00be19e543781155b12.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 17.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/ae/f9/fe/aef9fe1869d8098043de2ba7388840eb.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 18.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/736x/82/3c/fa/823cfac2a92c5e7c817b82f67dfdc854.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      price: 19.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/f9/8d/82/f98d82c437fc45edb977be305cf9ec22.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      price: 20.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/67/e6/e7/67e6e7e4dd988bb2a54cfe976ef356c8.jpg",
    },
    {
      id: 6,
      name: "Product 6",
      price: 21.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/736x/3f/35/3c/3f353c38b5567d6a28592dc79efe6e1c.jpg",
    },
    {
      id: 7,
      name: "Product 7",
      price: 22.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/27/4c/fd/274cfd022a45bda18b250c0bd6876630.jpg",
    },
    {
      id: 8,
      name: "Product 8",
      price: 23.99,
      link: "/shop/basic-t-shirt",
      image:
        "https://i.pinimg.com/1200x/05/f0/86/05f086c85e3a9acc032f94c2787927ec.jpg",
    },
  ];
  return (
    <section className="py-20">
      <Container>
        <SectionBadge className="mx-auto md:mx-0">Najtraženije</SectionBadge>
        <h2 className="text-3xl lg:text-4xl font-bold mt-4 text-center md:text-left">
          Najbolje iz ponude
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link href="/shop" className="mt-10 mx-auto block w-fit">
          <InteractiveHoverButton
            className="w-fit text-center lg:text-left"
            variant="light"
          >
            Pogledaj više
          </InteractiveHoverButton>
        </Link>
      </Container>
    </section>
  );
}
