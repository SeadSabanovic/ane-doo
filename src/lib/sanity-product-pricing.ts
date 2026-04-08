/** Polja cijena kakva dolaze iz Sanityja / propsa. */
export type ProductPricingLike = {
  salePrice?: number | null;
  retailPrice?: number | null;
  wholesalePrice?: number | null;
  wholesalePricePerPackage?: number | null;
  wholesaleMinQuantity?: number | null;
};

/** Veleprodajna cijena po komadu iz CMS-a (bez akcije): eksplicitno ili iz cijene po paketu. */
export function getBaseWholesaleUnitPrice(p: ProductPricingLike): number | null {
  if (typeof p.wholesalePrice === "number") return p.wholesalePrice;
  if (
    typeof p.wholesalePricePerPackage === "number" &&
    typeof p.wholesaleMinQuantity === "number" &&
    p.wholesaleMinQuantity > 0
  ) {
    return p.wholesalePricePerPackage / p.wholesaleMinQuantity;
  }
  return null;
}

/** Javna veleprodajna cijena po komadu: akcija ako postoji, inače baza. */
export function getEffectiveWholesaleUnitPrice(
  p: ProductPricingLike,
): number | null {
  if (typeof p.salePrice === "number") return p.salePrice;
  return getBaseWholesaleUnitPrice(p);
}

export function hasWholesaleOffer(p: ProductPricingLike): boolean {
  return (
    typeof p.salePrice === "number" ||
    typeof p.wholesalePrice === "number" ||
    typeof p.wholesalePricePerPackage === "number"
  );
}

/** Cijena za kartice / JSON-LD / wishlist: akcija → veleprodaja → maloprodaja. */
export function getListingUnitPrice(product: ProductPricingLike): number {
  const w = getEffectiveWholesaleUnitPrice(product);
  if (typeof w === "number") return w;
  if (typeof product.retailPrice === "number") return product.retailPrice;
  return 0;
}
