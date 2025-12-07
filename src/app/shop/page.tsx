import Container from "@/components/layout/container";
import PageHeader from "@/components/layout/page-header";
import ShopPagination from "@/components/sections/shop/shop-pagination";
import ShopSidebar from "@/components/sections/shop/shop-sidebar";
import ShopToolbar from "@/components/sections/shop/shop-toolbar";
import ProductCard from "@/components/ui/product-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ANE D.O.O. | Shop",
  description:
    "Pregledajte našu kompletnu kolekciju proizvoda. Filtrirajte po kategorijama i pronađite savršen artikl za sebe.",
};

export default function ShopPage() {
  // Privremeni dummy podaci za proizvode
  const products = [
    {
      id: 1,
      name: "Basic T-Shirt",
      price: 29.99,
      image:
        "https://i.pinimg.com/1200x/7a/b5/0d/7ab50d17b4173cbe17c8c89c970b0cd6.jpg",
      slug: "basic-t-shirt",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 2,
      name: "Classic Hoodie",
      price: 59.99,
      image:
        "https://i.pinimg.com/1200x/54/05/0e/54050ec0e02ccb060c3241bff1ae3491.jpg",
      slug: "classic-hoodie",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 3,
      name: "Denim Jacket",
      price: 89.99,
      image:
        "https://i.pinimg.com/1200x/9c/a5/20/9ca5201d2a3644062c992e442a391175.jpg",
      slug: "denim-jacket",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 4,
      name: "Sport Sneakers",
      price: 79.99,
      image:
        "https://i.pinimg.com/1200x/35/74/7e/35747ed4d30ed8fbbd0bd2da87bd6dcd.jpg",
      slug: "sport-sneakers",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 5,
      name: "Casual Pants",
      price: 49.99,
      image:
        "https://i.pinimg.com/1200x/30/e9/80/30e98016b74fcc7f9f4ce7a730255c45.jpg",
      slug: "casual-pants",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 6,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/736x/60/2a/70/602a70a7e4984c3fb1e95b732fd3b10c.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 7,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/736x/49/d5/89/49d589a0d6ea487582d302c3ea75e724.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 8,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/736x/8b/56/d6/8b56d6e3749932f1e247a1a8290f844a.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 9,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/736x/ce/19/cb/ce19cbfd6bdcbbe67b1bcc87a5de3881.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 10,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/736x/51/e7/e8/51e7e871ae60d78ea70af0ad3b18c2ce.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 11,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/736x/8b/99/05/8b9905077340c99494232f42c9719202.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 12,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/1200x/df/b4/af/dfb4af8a4f043deb8e1a9c744ddba036.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 13,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/1200x/f2/99/fd/f299fdfa172d8ac3eab237a1a62b22a1.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 14,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/736x/82/05/ff/8205ffb2d67e7899722855cb57bd0101.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },

    {
      id: 15,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/736x/7b/37/79/7b3779b870bc88677adc3f3f2d2e5ee2.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
    {
      id: 16,
      name: "Summer Dress",
      price: 69.99,
      image:
        "https://i.pinimg.com/736x/5a/28/ad/5a28adca858b65e1a4e9fe646b477282.jpg",
      slug: "summer-dress",
      link: "/shop/basic-t-shirt",
    },
  ];

  return (
    <>
      <PageHeader
        title="Shop"
        description="Pregledajte našu kolekciju proizvoda"
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Shop", href: "/shop" },
        ]}
      />
      <ShopToolbar />
      <Container className="lg:flex-row lg:flex gap-8 pb-20">
        <ShopSidebar />

        <div className="flex flex-1 flex-col gap-8 lg:gap-12">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 flex-1">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <ShopPagination />
        </div>
      </Container>
    </>
  );
}
