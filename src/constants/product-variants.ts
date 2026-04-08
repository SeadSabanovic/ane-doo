/**
 * Stari preset slugovi (prije kataloga `size` u Sanityju).
 * Ostaje za `displaySizeLabel` ako negdje još stigne stari slug (npr. stari snapshot).
 */
export const PRODUCT_SIZE_OPTIONS = [
  { title: "XS", value: "xs" },
  { title: "S", value: "s" },
  { title: "M", value: "m" },
  { title: "L", value: "l" },
  { title: "XL", value: "xl" },
  { title: "XXL", value: "xxl" },
  { title: "XXXL", value: "xxxl" },
  // Posteljina (uobičajene dimenzije u cm)
  { title: "90 × 200 cm", value: "posteljina_90x200" },
  { title: "140 × 200 cm", value: "posteljina_140x200" },
  { title: "160 × 200 cm", value: "posteljina_160x200" },
  { title: "180 × 200 cm", value: "posteljina_180x200" },
  { title: "200 × 200 cm", value: "posteljina_200x200" },
  { title: "140 × 220 cm", value: "posteljina_140x220" },
  { title: "160 × 220 cm", value: "posteljina_160x220" },
] as const;

/** Prikaz oznake veličine na sajtu (preset ili custom string) */
export function displaySizeLabel(value: string): string {
  const hit = PRODUCT_SIZE_OPTIONS.find((o) => o.value === value);
  return hit ? hit.title : value;
}

