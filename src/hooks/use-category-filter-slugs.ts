"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function parseKategorijaSlugs(search: string): Set<string> {
  const params = new URLSearchParams(search);
  return new Set(
    params
      .getAll("kategorija")
      .join(",")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean),
  );
}

/**
 * Zamjena za useSearchParams samo za ?kategorija=… — ne forsira CSR bailout na cijelom meniju.
 * Prvi paint (SSR + hydration): prazan Set; nakon mounta / promjene rute: stvarni slugovi iz URL-a.
 */
export function useCategoryFilterSlugs(): Set<string> {
  const pathname = usePathname();
  const [slugs, setSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    queueMicrotask(() => {
      setSlugs(parseKategorijaSlugs(window.location.search));
    });
  }, [pathname]);

  return slugs;
}
