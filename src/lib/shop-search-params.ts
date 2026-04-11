/**
 * Normalizacija query parametara shop/katalog stranice (isti oblik kao u `katalog/page.tsx`).
 */
export function normalizeShopSearchParams(
  resolved: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const normalizedSearchParams = new URLSearchParams();

  Object.entries(resolved).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry) normalizedSearchParams.append(key, entry);
      });
      return;
    }

    if (value) {
      normalizedSearchParams.set(key, value);
    }
  });

  return normalizedSearchParams;
}

/**
 * Canonical za `/katalog`: zadržava smislene filtere (kategorija, cijena, akcija, q, stranica),
 * isključuje `sort` da se signal ne dijeli na više URL-ova. `kategorija` u stabilnom obliku.
 */
export function buildKatalogCanonicalPath(
  normalizedSearchParams: URLSearchParams,
): string {
  const params = new URLSearchParams(normalizedSearchParams);
  params.delete("sort");

  const kategorijaValues = params.getAll("kategorija");
  params.delete("kategorija");
  const slugSet = new Set<string>();
  for (const raw of kategorijaValues) {
    for (const part of raw.split(",")) {
      const t = part.trim();
      if (t) slugSet.add(t);
    }
  }

  const map = new Map<string, string>();

  for (const key of ["akcija", "cijenaDo", "cijenaOd", "q", "stranica"] as const) {
    const v = params.get(key);
    if (v == null || v === "") continue;
    if (key === "stranica" && v === "1") continue;
    map.set(key, v);
  }

  if (slugSet.size > 0) {
    map.set(
      "kategorija",
      [...slugSet].sort((a, b) => a.localeCompare(b)).join(","),
    );
  }

  const keys = [...map.keys()].sort((a, b) => a.localeCompare(b));
  const ordered = new URLSearchParams();
  for (const k of keys) {
    ordered.set(k, map.get(k)!);
  }

  const qs = ordered.toString();
  return qs ? `/katalog?${qs}` : "/katalog";
}
