import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import AnimatedImage from "@/components/ui/animated-image";
import { Badge } from "@/components/ui/badge";
import { COLORS } from "@/constants/colors";
import { Info } from "lucide-react";

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

  const allImages = [product.image, ...(product.images || [])];

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
          {/* Product Image */}
          <div className="lg:max-w-2xl flex-1 w-full flex flex-col gap-4">
            <div className="relative aspect-square rounded-md overflow-hidden w-full">
              <AnimatedImage
                src={product.image}
                alt={product.name}
                width={1000}
                height={1000}
                className="object-cover size-full"
                priority={true}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {allImages.map((image, key) => (
                <div
                  key={key}
                  className="relative aspect-square rounded-md overflow-hidden w-full"
                >
                  <AnimatedImage
                    src={image}
                    alt={product.name}
                    width={1000}
                    height={1000}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6 flex-1">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-3xl font-semibold text-primary">
                {product.price} KM
              </p>
            </div>

            <p className="text-base leading-relaxed">{product.description}</p>

            {/* Specifikacije */}
            <div className="flex flex-col p-4 border rounded-md gap-4">
              <Badge variant="outline" className="mb-4">
                Detalji
              </Badge>

              {/* Šifra */}
              <div className="flex gap-4 items-start justify-between">
                <h3 className="font-semibold">Šifra</h3>
                <p>NK-TSH-001</p>
              </div>

              {/* Materijal */}
              <div className="flex gap-4 items-start justify-between">
                <h3 className="font-semibold">Materijal</h3>
                <p>100% pamuk</p>
              </div>

              {/* Težina */}
              <div className="flex gap-4 items-start justify-between">
                <h3 className="font-semibold">Težina</h3>
                <p>100g po komadu</p>
              </div>

              {/* Tip rukava */}
              <div className="flex gap-4 items-start justify-between">
                <h3 className="font-semibold">Tip rukava</h3>
                <p>Kratki rukav</p>
              </div>

              {/* Zemlja porijekla */}
              <div className="flex gap-4 items-start justify-between">
                <h3 className="font-semibold">Zemlja porijekla</h3>
                <p>Turska</p>
              </div>
            </div>

            {/* Opcije Proizvoda */}
            <div className="flex flex-col p-4 border rounded-md gap-4">
              <Badge variant="outline" className="mb-4">
                Opcije
              </Badge>

              {/* Veličine */}
              <div className="flex gap-4 items-start justify-between">
                <h3 className="font-semibold">
                  Veličina<sup className="text-destructive">*</sup>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button key={size} variant="outline" size="sm">
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="flex gap-4 items-start justify-between">
                <h3 className="font-semibold">
                  Boja<sup className="text-destructive">*</sup>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((colorName) => {
                    const color = COLORS.find((c) => c.name === colorName);
                    return (
                      <Button
                        key={colorName}
                        variant="outline"
                        className="size-10 rounded-full border ring-primary/20! relative"
                      >
                        <div
                          className="p-2 border rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[80%]"
                          style={{
                            backgroundColor: color?.value || "#FFFFFF",
                          }}
                        />
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Maloprodaja */}
            <div className="flex flex-col p-4 border rounded-md gap-4">
              <Badge variant="outline" className="mb-4">
                Maloprodaja
              </Badge>

              <div className="border rounded-md p-2 border-secondary bg-secondary-muted/50 text-secondary-foreground">
                <h5 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="size-4" /> Napomena
                </h5>
                <p>
                  Maloprodaja je način kupnje proizvoda u malim količinama,
                  obično od 1 do 99 komada. Cijena po komadu je fiksna i ne
                  varira ovisno o količini.
                </p>
              </div>

              {/* Rok isporuke */}
              <div className="flex gap-4 items-start justify-between">
                <h3 className="font-semibold">Rok isporuke</h3>
                <p>7 radnih dana</p>
              </div>

              {/* Cijena po komadu */}
              <div className="flex gap-4 items-start justify-between">
                <h3 className="font-semibold">Cijena po komadu</h3>
                <p className="text-primary font-semibold">13.00 KM</p>
              </div>
            </div>

            {/* Veleprodaja */}
            <div className="flex flex-col p-4 border rounded-md gap-4">
              <Badge variant="outline" className="mb-4">
                Veleprodaja
              </Badge>
            </div>

            {/* Add to Cart Button */}
            <Button size="lg" className="w-full md:w-fit">
              Dodaj u korpu
            </Button>
          </div>
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
