import Container from "@/components/layout/container";
import PageHeader from "@/components/layout/page-header";
import ShopPagination from "@/components/sections/shop/shop-pagination";
import ShopSidebar from "@/components/sections/shop/shop-sidebar";
import ShopToolbar from "@/components/sections/shop/shop-toolbar";
import ProductCard from "@/components/ui/product-card";
import EmptyState from "@/components/ui/empty-state";
import { Metadata } from "next";
import { SearchX } from "lucide-react";
import {
  getParentCategories,
  getProductsByCategorySlugsCount,
  getProductsByCategorySlugsPaginated,
  getProductsCount,
  getProductsPaginated,
} from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Pregledajte našu kompletnu kolekciju proizvoda. Filtrirajte po kategorijama i pronađite savršen artikl za sebe.",
};

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;
const PRODUCTS_PER_PAGE = 12;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const normalizedSearchParams = new URLSearchParams();

  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry) normalizedSearchParams.append(key, entry);
      });
      return;
    }

    if (value) {
      normalizedSearchParams.set(key, value);
    }
  });

  const kategorija = normalizedSearchParams.getAll("kategorija");
  const selectedCategorySlugs = new Set(
    kategorija
      .join(",")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );

  const currentPageParam = normalizedSearchParams.get("stranica");
  const parsedPage = Number.parseInt(currentPageParam ?? "1", 10);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const [categories, totalProducts] = await Promise.all([
    getParentCategories(),
    selectedCategorySlugs.size > 0
      ? getProductsByCategorySlugsCount([...selectedCategorySlugs])
      : getProductsCount(),
  ]);
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const effectivePage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const start = (effectivePage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const sanityProducts =
    selectedCategorySlugs.size > 0
      ? await getProductsByCategorySlugsPaginated(
          [...selectedCategorySlugs],
          start,
          end
        )
      : await getProductsPaginated(start, end);

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
        <ShopSidebar categories={categories} />

        <div className="flex flex-1 flex-col gap-8 lg:gap-12">
          {products.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nema proizvoda za odabrani filter"
              description="Promijenite ili očistite filtere kako biste vidjeli dostupne artikle."
              actionLabel="Očisti filtre"
              actionHref="/shop"
            />
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <ShopPagination
            currentPage={effectivePage}
            totalPages={totalPages}
            searchParamsString={normalizedSearchParams.toString()}
          />
        </div>
      </Container>
    </>
  );
}
