import Container from "@/components/layout/container";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import { ProductImages } from "@/components/sections/shop/product-images";
import { ProductDetails } from "@/components/sections/shop/product-details";

// Privremeni dummy podaci za proizvode
const products = [
  {
    id: 1,
    name: "Majica Nike",
    price: 29.99,
    image:
      "https://i.pinimg.com/736x/cf/d7/09/cfd709e976e33108ea28b93587634b04.jpg",
    images: [
      "https://i.pinimg.com/1200x/63/d8/6d/63d86da526e349ba8f95142913a05172.jpg",
      "https://i.pinimg.com/1200x/eb/43/3f/eb433ff60e1803ec46cd72f439888a6e.jpg",
      "https://i.pinimg.com/1200x/c7/2a/b7/c72ab7172a0accc0c214532d7da715dd.jpg",
    ],
    slug: "basic-t-shirt",
    description:
      "Ova Nike pamučna majica dizajnirana je za one koji žele savršenu kombinaciju udobnosti, kvalitete i jednostavnog sportskog stila. Izrađena od mekane, prozračne 100% pamuk tkanine, majica nudi izuzetnu ugodnost tokom cijelog dana, bez obzira nosiš li je na poslu, treningu ili u slobodno vrijeme. Materijal omogućava prirodan osjećaj na koži, a ujedno je dovoljno izdržljiv da zadrži oblik i boju i nakon višestrukog pranja.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Light Green", "Brown"],
  },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

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
            mainImage={product.image}
            images={product.images}
            productName={product.name}
          />

          {/* Product Details */}
          <ProductDetails
            name={product.name}
            price={product.price}
            description={product.description}
            specifications={[
              { label: "Šifra", value: "NK-TSH-001" },
              { label: "Materijal", value: "100% pamuk" },
              { label: "Težina", value: "100g po komadu" },
              { label: "Tip rukava", value: "Kratki rukav" },
              { label: "Zemlja porijekla", value: "Turska" },
            ]}
            sizes={product.sizes}
            colors={product.colors}
            pricingSections={[
              {
                type: "maloprodaja",
                infoText:
                  "Maloprodaja je način kupnje proizvoda u malim količinama, obično od 1 do 99 komada. Cijena po komadu je fiksna i ne varira ovisno o količini.",
                pricingInfo: [
                  { label: "Rok isporuke", value: "7 radnih dana" },
                ],
                pricePerUnit: 29.99,
              },
              {
                type: "veleprodaja",
                infoText:
                  "Veleprodajna kupovina omogućava povoljniju cijenu po komadu za veće narudžbe. Popusti se obračunavaju po količinskim rangovima, a minimalna količina za ostvarivanje veleprodajne cijene navodi se uz svaki artikal.",
                pricingInfo: [
                  { label: "Pakovanje", value: "12 komada" },
                  { label: "Rok isporuke", value: "12 radnih dana" },
                ],
                pricePerUnit: 19.99,
              },
            ]}
          />
        </div>
      </Container>
    </>
  );
}

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for each product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

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
