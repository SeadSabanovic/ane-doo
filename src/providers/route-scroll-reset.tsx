"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * Forsira start stranice na vrhu pri promjeni rute.
 * Ne prati query parametre da ne razbije shop filter UX.
 */
export default function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (typeof window === "undefined" || pathname?.startsWith("/studio"))
      return;
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, [pathname]);

  useLayoutEffect(() => {
    if (!pathname || pathname.startsWith("/studio")) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [lenis, pathname]);

  return null;
}
