import Container from "@/components/layout/container";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import { ProductImages } from "@/components/sections/shop/product-images";
import { ProductDetails } from "@/components/sections/shop/product-details";
import MoreSuggestions from "@/components/sections/shop/more-suggestions";
import { getProductBySlug, getProducts, Product } from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import { getColorName } from "@/constants/colors";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Generate all product pages at build time
export const dynamicParams = true; // Allow new products to be generated on-demand

// Helper function to generate pricing sections from product data
function getPricingSections(product: Product) {
  return [
    {
      type: "maloprodaja" as const,
      infoText:
        "Maloprodaja je način kupnje proizvoda u malim količinama, obično od 1 do 99 komada. Cijena po komadu je fiksna i ne varira ovisno o količini.",
      pricingInfo: [{ label: "Rok isporuke", value: "7 radnih dana" }],
      pricePerUnit: product.salePrice || product.price,
    },
    {
      type: "veleprodaja" as const,
      infoText:
        "Veleprodajna kupovina omogućava povoljniju cijenu po komadu za veće narudžbe. Popusti se obračunavaju po količinskim rangovima, a minimalna količina za ostvarivanje veleprodajne cijene navodi se uz svaki artikal.",
      pricingInfo: [
        { label: "Pakovanje", value: `${product.wholesaleMinQuantity} komada` },
        { label: "Rok isporuke", value: "12 radnih dana" },
      ],
      pricePerUnit: product.wholesalePrice,
    },
  ];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;


  const product = await getProductBySlug(slug);



  if (!product) {
    notFound();
  }

  const images = product.images.map((img) =>
    urlFor(img).width(800).height(800).url()
  );

  // Build specifications from product data
  const specifications = [
    { label: "Šifra", value: product.sku },
    ...(product.material ? [{ label: "Materijal", value: product.material }] : []),
    ...(product.weight ? [{ label: "Težina", value: product.weight }] : []),
    ...(product.originCountry
      ? [{ label: "Zemlja porijekla", value: product.originCountry === "turska" ? "Turska" : "Indonezija" }]
      : []),
    ...(product.specifications || []),
  ];

  // Convert sizes to uppercase for display
  const displaySizes = product.sizes.map((s) => s.toUpperCase());

  // Convert colors to display format using centralized color mapping
  const displayColors = product.colors?.map((c) => getColorName(c)) || [];

  return (
    <>
      <PageHeader
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name, href: `/shop/${product.slug}` },
        ]}
      />

      <Container className="pb-20">
        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Product Images */}
          <ProductImages
            images={images}
            productName={product.name}
          />

          {/* Product Details */}
          <ProductDetails
            name={product.name}
            price={product.salePrice || product.price}
            description={product.description}
            specifications={specifications}
            sizes={displaySizes}
            colors={displayColors}
            pricingSections={getPricingSections(product)}
          />
        </div>
      </Container>

      <MoreSuggestions />
    </>
  );

}

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug.current,
  }));
}

// Generate metadata for each product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Proizvod nije pronađen",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}
