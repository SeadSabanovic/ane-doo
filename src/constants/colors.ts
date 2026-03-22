export const COLORS = [
  {
    key: "crna",
    name: "Crna",
    value: "#000000",
  },
  {
    key: "bijela",
    name: "Bijela",
    value: "#FFFFFF",
  },
  {
    key: "siva",
    name: "Siva",
    value: "#808080",
  },
  {
    key: "plava",
    name: "Plava",
    value: "#314A66",
  },
  {
    key: "crvena",
    name: "Crvena",
    value: "#DC143C",
  },
  {
    key: "zelena",
    name: "Zelena",
    value: "#228B22",
  },
  {
    key: "zuta",
    name: "Žuta",
    value: "#FFD700",
  },
  {
    key: "roze",
    name: "Roze",
    value: "#FFC0CB",
  },
  {
    key: "smeda",
    name: "Smeđa",
    value: "#8B4513",
  },
  {
    key: "narandzasta",
    name: "Narandžasta",
    value: "#FF8C00",
  },
];

// Helper function to get color display name
export const getColorName = (key: string): string => {
  const color = COLORS.find((c) => c.key === key);
  return color?.name || key;
};

// Helper function to get color hex value
export const getColorHex = (key: string): string => {
  const color = COLORS.find((c) => c.key === key);
  return color?.value || "#000000";
};

/** Jedna opcija boje na PDP-u (preset ili custom iz CMS-a) */
export type ProductColorOption = {
  label: string;
  hex: string;
};

/** Spaja preset ključeve i custom boje s hexom u jedan niz za UI */
export function buildProductColorOptions(
  colorKeys?: string[] | null,
  customColors?: { name?: string; hex?: string }[] | null,
): ProductColorOption[] {
  const preset: ProductColorOption[] = (colorKeys ?? []).map((key) => ({
    label: getColorName(key),
    hex: getColorHex(key),
  }));
  const custom: ProductColorOption[] = (customColors ?? [])
    .map((c) => ({
      label: (c.name ?? "").trim(),
      hex: (c.hex ?? "").trim(),
    }))
    .filter((c) => c.label.length > 0 && /^#[0-9A-Fa-f]{6}$/i.test(c.hex));
  return [...preset, ...custom];
}

// Sizes configuration
export const SIZES = [
  { key: "xs", name: "XS" },
  { key: "s", name: "S" },
  { key: "m", name: "M" },
  { key: "l", name: "L" },
  { key: "xl", name: "XL" },
  { key: "xxl", name: "XXL" },
  { key: "xxxl", name: "XXXL" },
];
