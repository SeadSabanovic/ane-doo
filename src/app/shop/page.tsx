import Container from "@/components/layout/container";
import PageHeader from "@/components/layout/page-header";
import ShopPagination from "@/components/sections/shop/shop-pagination";
import ShopSidebar from "@/components/sections/shop/shop-sidebar";
import ShopToolbar from "@/components/sections/shop/shop-toolbar";
import ProductCard from "@/components/ui/product-card";
import { Metadata } from "next";
import { getProducts } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "ANE D.O.O. | Shop",
  description:
    "Pregledajte našu kompletnu kolekciju proizvoda. Filtrirajte po kategorijama i pronađite savršen artikl za sebe.",
};

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

export default async function ShopPage() {
  const sanityProducts = await getProducts();

  // Transform Sanity products to ProductCard format
  const products = sanityProducts.map((product) => ({
    id: product._id,
    name: product.name,
    price: product.salePrice || product.price,
    image: product.images[0] ? urlFor(product.images[0]).width(400).height(400).url() : "",
    slug: product.slug.current,
    link: `/shop/${product.slug.current}`,
  }));

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
