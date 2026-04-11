"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchDialog } from "./search/search-dialog";

/** SSR + prvi client paint: fiksne klase (bez pathname grana) — izbjegava hydration mismatch. */
const BUTTON_IDLE =
  "text-foreground relative shrink-0 opacity-0 pointer-events-none transition-opacity duration-300 ease-out motion-reduce:transition-none";

/**
 * Search trigger + dialog samo na `/`. SSR-safe: dok pathname nije pouzdan, fiksno stanje
 * (navReady) izbjegava hydration mismatch; na početnoj lagani fade-in ikone nakon mounta.
 */
export function HeaderSearch() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchReveal, setSearchReveal] = useState(false);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setNavReady(true));
  }, []);

  useEffect(() => {
    if (!navReady) return;
    if (pathname !== "/") {
      queueMicrotask(() => {
        setSearchReveal(false);
        setSearchOpen(false);
      });
      return;
    }
    let cancelled = false;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setSearchReveal(true);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [pathname, navReady]);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={
          navReady
            ? cn(
                "text-foreground relative shrink-0",
                /* Na `/` bez opacity na gumbu — ring ostaje kao kod ostalih; fade je na ikoni. */
                pathname !== "/" &&
                  "pointer-events-none w-0 max-w-0 overflow-hidden opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none",
                pathname === "/" && !searchReveal && "pointer-events-none",
              )
            : BUTTON_IDLE
        }
        onClick={() => setSearchOpen(true)}
        aria-label="Pretraži proizvode"
        disabled={navReady && pathname !== "/"}
        tabIndex={
          navReady && pathname === "/" && searchReveal ? undefined : -1
        }
      >
        <span
          className={cn(
            "inline-flex transition-opacity duration-300 ease-out motion-reduce:transition-none",
            navReady && pathname === "/" && searchReveal
              ? "opacity-100"
              : "opacity-0",
          )}
        >
          <Search aria-hidden />
        </span>
      </Button>
      <SearchDialog
        open={navReady && searchOpen && pathname === "/"}
        onOpenChange={(open) => {
          if (!navReady || pathname !== "/") return;
          setSearchOpen(open);
        }}
      />
    </>
  );
}
