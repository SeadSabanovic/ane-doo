/** Jedna opcija boje na PDP-u (iz kataloga `color` u Sanityju). */
export type ProductColorOption = {
  label: string;
  hex: string;
};

/**
 * Gradi niz za picker iz dereferenciranih `colors[]` na proizvodu.
 * Preskače null (obrisan dokument u referenci).
 */
export function buildProductColorOptions(
  colors?: Array<{ name: string; hex: string } | null> | null,
): ProductColorOption[] {
  return (colors ?? [])
    .filter((c): c is { name: string; hex: string } => c != null)
    .map((c) => ({
      label: c.name.trim(),
      hex: c.hex.trim(),
    }))
    .filter((c) => c.label.length > 0 && /^#[0-9A-Fa-f]{6}$/i.test(c.hex));
}
