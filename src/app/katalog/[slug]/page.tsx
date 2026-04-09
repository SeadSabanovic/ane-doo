import Container from "@/components/layout/container";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import { ProductImages } from "@/components/sections/shop/product-images";
import { ProductDetails } from "@/components/sections/shop/product-details";
import MoreSuggestions from "@/components/sections/shop/more-suggestions";
import { getProductBySlug, getProducts, Product } from "@/sanity/lib/api";
import {
  getBaseWholesaleUnitPrice,
  getEffectiveWholesaleUnitPrice,
  getListingUnitPrice,
  hasWholesaleOffer,
} from "@/lib/sanity-product-pricing";
import { urlFor } from "@/sanity/lib/image";
import { buildProductColorOptions } from "@/constants/colors";

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Generate all product pages at build time
export const dynamicParams = true; // Allow new products to be generated on-demand

/** Veleprodaja ako postoji bilo koji veleprodajni podatak; maloprodaja ako je retailPrice postavljen. */
function getPricingSections(product: Product) {
  const sections: {
    type: "maloprodaja" | "veleprodaja";
    infoText: string;
    pricingInfo: { label: string; value: string }[];
    pricePerUnit: number;
    compareAtPrice?: number;
  }[] = [];

  if (hasWholesaleOffer(product)) {
    const base = getBaseWholesaleUnitPrice(product);
    const eff = getEffectiveWholesaleUnitPrice(product);
    if (base != null && eff != null) {
      sections.push({
        type: "veleprodaja",
        infoText:
          "Veleprodajna kupovina omogućava povoljniju cijenu po komadu za veće narudžbe. Naručujete pakete – svaki paket sadrži određeni broj komada u različitim veličinama i bojama.",
        pricingInfo: [
          {
            label: "Pakovanje",
            value: `${product.wholesaleMinQuantity ?? "?"} komada`,
          },
        ],
        pricePerUnit: eff,
        compareAtPrice: product.salePrice != null ? base : undefined,
      });
    }
  }

  if (product.retailPrice != null) {
    sections.push({
      type: "maloprodaja",
      infoText:
        "Maloprodaja je način kupnje proizvoda u malim količinama. Cijena po komadu je fiksna i ne varira ovisno o količini.",
      pricingInfo: [],
      pricePerUnit: product.retailPrice,
    });
  }

  return sections;
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
    urlFor(img).width(800).height(800).url(),
  );
  const galleryImages = product.images.map((img) => urlFor(img).url());

  // Build specifications from product data (šifra je interno, ne prikazuje se kupcu)
  const specifications = [
    ...(product.material
      ? [{ label: "Materijal", value: product.material }]
      : []),
    ...(product.weight ? [{ label: "Težina", value: product.weight }] : []),
    ...(product.originCountry
      ? [
          {
            label: "Zemlja porijekla",
            value: product.originCountry === "turska" ? "Turska" : "Indonezija",
          },
        ]
      : []),
    ...(product.specifications || []),
  ];

  const displaySizes = (product.sizes ?? [])
    .filter((s): s is NonNullable<typeof s> => s != null)
    .map((s) => s.name);

  const colorOptions = buildProductColorOptions(product.colors);

  // JSON-LD Product schema za SEO (Google rich snippets)
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://www.ane-doo.com");
  const productUrl = `${baseUrl}/katalog/${product.slug.current}`;
  const displayPrice = getListingUnitPrice(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: galleryImages,
    url: productUrl,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "BAM",
      price: displayPrice,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    ...(product.tags &&
      product.tags.length > 0 && {
        keywords: product.tags.join(", "),
      }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Katalog", href: "/katalog" },
          { label: product.name, href: `/katalog/${product.slug}` },
        ]}
      />

      <Container className="pb-20">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Product Images */}
          <ProductImages
            images={images}
            galleryImages={galleryImages}
            productName={product.name}
          />

          {/* Product Details */}
          <ProductDetails
            productId={product._id}
            slug={product.slug.current}
            image={images[0]}
            name={product.name}
            salePrice={product.salePrice}
            retailPrice={product.retailPrice}
            wholesalePrice={product.wholesalePrice}
            wholesalePricePerPackage={product.wholesalePricePerPackage}
            wholesaleMinQuantity={product.wholesaleMinQuantity}
            description={product.description}
            specifications={specifications}
            sizes={displaySizes}
            colorOptions={colorOptions}
            tags={product.tags}
            pricingSections={getPricingSections(product)}
            allowRetail={product.retailPrice != null}
            packageContentsText={product.packageContentsText}
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
