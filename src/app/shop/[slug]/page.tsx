import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";

// Privremeni dummy podaci za proizvode
const products = [
  {
    id: 1,
    name: "Basic T-Shirt",
    price: 29.99,
    image: "/images/product/shirt.png",
    slug: "basic-t-shirt",
    description:
      "Udobna pamučna majica savršena za svakodnevno nošenje. Izrađena od visokokvalitetnog materijala.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Crna", "Bijela", "Siva"],
  },
  {
    id: 2,
    name: "Classic Hoodie",
    price: 59.99,
    image: "/images/product/shirt.png",
    slug: "classic-hoodie",
    description:
      "Topli i udoban hoodie idealan za hladnije dane. Moderan dizajn i kvalitetna izrada.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Crna", "Siva", "Navy"],
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: 89.99,
    image: "/images/product/shirt.png",
    slug: "denim-jacket",
    description:
      "Klasična traper jakna koja nikada ne izlazi iz mode. Savršena za proljeće i jesen.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Light Blue", "Dark Blue", "Black"],
  },
  {
    id: 4,
    name: "Sport Sneakers",
    price: 79.99,
    image: "/images/product/shirt.png",
    slug: "sport-sneakers",
    description:
      "Sportske tenisice za maksimalnu udobnost i stil. Idealne za svakodnevno nošenje.",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: ["Bijela", "Crna", "Siva"],
  },
  {
    id: 5,
    name: "Casual Pants",
    price: 49.99,
    image: "/images/product/shirt.png",
    slug: "casual-pants",
    description:
      "Casual hlače za opušteni stil. Udobne i praktične za svakodnevno nošenje.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Smeđa", "Crna", "Bež"],
  },
  {
    id: 6,
    name: "Summer Dress",
    price: 69.99,
    image: "/images/product/shirt.png",
    slug: "summer-dress",
    description:
      "Lagana ljetna haljina savršena za tople dane. Elegantan kroj i kvalitetan materijal.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Bijela", "Crvena", "Plava"],
  },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-3xl font-semibold text-primary">
                ${product.price}
              </p>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Sizes */}
            <div>
              <h3 className="font-semibold mb-2">Veličine:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button key={size} variant="outline" size="sm">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-semibold mb-2">Boje:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button key={color} variant="outline" size="sm">
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button size="lg" className="w-full md:w-auto">
              Dodaj u korpu
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}
