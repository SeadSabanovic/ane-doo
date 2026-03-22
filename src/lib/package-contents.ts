import { getColorName } from "@/constants/colors";
import { displaySizeLabel } from "@/constants/product-variants";

export type PackageContentLine = {
  _key?: string;
  size: string;
  color: string;
  quantity: number;
};

/** Tekst za prikaz na PDP (npr. „2× M / Crna · 1× L / Smeđa”) */
export function formatPackageContentsDisplay(
  lines?: PackageContentLine[] | null,
): string {
  if (!lines?.length) return "";
  return lines
    .map((l) => {
      const size = displaySizeLabel(l.size ?? "");
      const color = getColorName(l.color ?? "");
      const q = typeof l.quantity === "number" ? l.quantity : 0;
      return `${q}× ${size} / ${color}`;
    })
    .join(" · ");
}

/** Zbroj komada iz rasporeda (za validaciju / prikaz) */
export function sumPackageContents(lines?: PackageContentLine[] | null): number {
  if (!lines?.length) return 0;
  return lines.reduce((acc, l) => acc + (typeof l.quantity === "number" ? l.quantity : 0), 0);
}
