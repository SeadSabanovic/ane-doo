import { NextResponse } from "next/server";
import {
  getFeaturedProducts,
  parseShopSearchQuery,
  searchProducts,
  type Product,
} from "@/sanity/lib/api";
import { urlFor } from "@/sanity/lib/image";
import {
  getBaseWholesaleUnitPrice,
  getListingUnitPrice,
} from "@/lib/sanity-product-pricing";

export type SearchProductPayload = {
  id: string;
  name: string;
  price: number;
  /** Akcijska cijena kad postoji (veleprodajna kao precrtana referenca). */
  salePrice?: number;
  image: string;
  link: string;
};

function mapProducts(products: Product[]): SearchProductPayload[] {
  return products.map((p) => {
    const base = getBaseWholesaleUnitPrice(p);
    const price =
      p.salePrice != null && base != null ? base : getListingUnitPrice(p);
    return {
      id: p._id,
      name: p.name,
      price,
      ...(typeof p.salePrice === "number" && p.salePrice > 0
        ? { salePrice: p.salePrice }
        : {}),
      image: p.images[0]
        ? urlFor(p.images[0]).width(400).height(400).url()
        : "",
      link: `/katalog/${p.slug.current}`,
    };
  });
}

/**
 * GET ?q=
 * - Nema valjanog upita (prazno ili < 3 znaka nakon trim): istaknuti proizvodi.
 * - Valjan upit: rezultati pretrage (Sanity match).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const parsed = parseShopSearchQuery(q);

  if (!parsed) {
    const featured = await getFeaturedProducts();
    return NextResponse.json({ products: mapProducts(featured) });
  }

  const found = await searchProducts(parsed);
  return NextResponse.json({ products: mapProducts(found) });
}
