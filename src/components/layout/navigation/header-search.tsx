"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchDialog } from "./search/search-dialog";

const SEARCH_SLOT_IDLE =
  "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden opacity-0 pointer-events-none transition-opacity duration-300 ease-out motion-reduce:transition-none";

/**
 * Search trigger + dialog samo na `/`. SSR-safe: dok pathname nije pouzdan, fiksno stanje
 * (navReady) izbjegava hydration mismatch; na početnoj lagani fade-in nakon mounta.
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
      <div
        className={
          navReady
            ? cn(
                "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden transition-opacity duration-300 ease-out motion-reduce:transition-none",
                pathname !== "/" && "pointer-events-none w-0 max-w-0",
                pathname === "/" && !searchReveal && "pointer-events-none",
                pathname === "/" && searchReveal ? "opacity-100" : "opacity-0",
              )
            : SEARCH_SLOT_IDLE
        }
        aria-hidden={navReady ? pathname !== "/" || !searchReveal : true}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-foreground relative shrink-0"
          onClick={() => setSearchOpen(true)}
          aria-label="Pretraži proizvode"
          disabled={navReady && pathname !== "/"}
          tabIndex={
            navReady && pathname === "/" && searchReveal ? undefined : -1
          }
        >
          <Search className="size-6" aria-hidden />
        </Button>
      </div>
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
