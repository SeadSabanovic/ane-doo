/** U poljskoj validaciji Sanity ponekad ne popuni `document`; `parent` kod korijenskih polja je cijeli dokument. */
export function getDocumentForValidation(context: {
  document?: unknown;
  parent?: unknown;
}): Record<string, unknown> | null {
  const raw = context.document ?? context.parent;
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  return null;
}

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/** Maloprodajna / akcijska cijena smatra se unesenom samo ako je > 0 (0 ne smije zaobići obaveznu veleprodaju). */
export function isPositivePrice(value: unknown): boolean {
  return isFiniteNumber(value) && value > 0;
}

/** Kad nema cijelog broja ≥1 u „Komada u paketu”, veleprodajna polja u Studiju su zaključana (samo opis tekstom ne onemogućava unos). */
export function normalizeWholesaleQty(q: unknown): number | null {
  if (typeof q === "number" && Number.isFinite(q) && Number.isInteger(q) && q >= 1) {
    return q;
  }
  if (typeof q === "string" && q.trim() !== "") {
    const n = Number(q.trim());
    if (Number.isInteger(n) && n >= 1) return n;
  }
  return null;
}

export function hasValidWholesaleQty(document: unknown): boolean {
  if (!document || typeof document !== "object") return false;
  const q = (document as { wholesaleMinQuantity?: unknown }).wholesaleMinQuantity;
  return normalizeWholesaleQty(q) != null;
}

export function hasWholesalePricingValues(document: unknown): boolean {
  if (!document || typeof document !== "object") return false;
  const d = document as {
    wholesalePrice?: unknown;
    wholesalePricePerPackage?: unknown;
    salePrice?: unknown;
  };
  return (
    isFiniteNumber(d.wholesalePrice) ||
    isFiniteNumber(d.wholesalePricePerPackage) ||
    isFiniteNumber(d.salePrice)
  );
}

/**
 * Zaključaj veleprodajna polja kad nema komada u paketu, OSIM ako već postoje vrijednosti —
 * tada moraju biti otključana da korisnik može obrisati ili unijeti „Komada u paketu”.
 */
export function wholesaleFieldsReadOnly(document: unknown): boolean {
  if (hasValidWholesaleQty(document)) return false;
  if (hasWholesalePricingValues(document)) return false;
  return true;
}

/**
 * Jedinična veleprodajna cijena za validaciju: eksplicitno po komadu, inače iz paketa ÷ komada u paketu.
 * Usklađeno s `getBaseWholesaleUnitPrice` na sajtu.
 */
export function getWholesaleBaseUnit(doc: unknown): number | null {
  if (!doc || typeof doc !== "object") return null;
  const d = doc as {
    wholesalePrice?: unknown;
    wholesalePricePerPackage?: unknown;
    wholesaleMinQuantity?: unknown;
  };
  if (isFiniteNumber(d.wholesalePrice)) return d.wholesalePrice;
  const qty = normalizeWholesaleQty(d.wholesaleMinQuantity);
  if (qty != null && isFiniteNumber(d.wholesalePricePerPackage)) {
    return d.wholesalePricePerPackage / qty;
  }
  return null;
}
