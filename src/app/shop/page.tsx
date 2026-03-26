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
      .filter(Boolean),
  );

  const currentPageParam = normalizedSearchParams.get("stranica");
  const parsedPage = Number.parseInt(currentPageParam ?? "1", 10);
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const parsePriceParam = (key: "cijenaOd" | "cijenaDo") => {
    const raw = normalizedSearchParams.get(key);
    if (!raw) return undefined;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) ? n : undefined;
  };

  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 200;
  const minPrice = Math.max(
    0,
    parsePriceParam("cijenaOd") ?? DEFAULT_MIN_PRICE,
  );
  const maxPrice = Math.max(
    minPrice,
    parsePriceParam("cijenaDo") ?? DEFAULT_MAX_PRICE,
  );

  const rawAkcija = normalizedSearchParams.get("akcija");
  const saleOnly = rawAkcija === "1" || rawAkcija === "true";

  const [categories, totalProducts] = await Promise.all([
    getParentCategories(),
    selectedCategorySlugs.size > 0
      ? getProductsByCategorySlugsCount(
          [...selectedCategorySlugs],
          minPrice,
          maxPrice,
          saleOnly,
        )
      : getProductsCount(minPrice, maxPrice, saleOnly),
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
          end,
          minPrice,
          maxPrice,
          saleOnly,
        )
      : await getProductsPaginated(start, end, minPrice, maxPrice, saleOnly);

  // Transform Sanity products to ProductCard format
  const products = sanityProducts.map((product) => ({
    id: product._id,
    name: product.name,
    price: product.wholesalePrice,
    salePrice: product.salePrice,
    image: product.images[0]
      ? urlFor(product.images[0]).width(400).height(400).url()
      : "",
    slug: product.slug.current,
    link: `/shop/${product.slug.current}`,
  }));

  return (
    <>
      <PageHeader
        title="Online Katalog"
        description="Istražite dostupne modele i naručite direktno za svoju poslovnicu ili butik"
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Shop", href: "/shop" },
        ]}
      />
      <ShopToolbar categories={categories} />
      <Container className="gap-8 pb-20 lg:flex lg:flex-row">
        <ShopSidebar categories={categories} />

        <div className="flex flex-1 flex-col gap-8 lg:gap-12">
          {products.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="Nema proizvoda za odabrani filter"
              description="Promijenite ili očistite filtere kako biste vidjeli dostupne artikle."
              actionLabel="Očisti filtere"
              actionHref="/shop"
            />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
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
