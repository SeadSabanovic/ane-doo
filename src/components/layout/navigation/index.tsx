"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../container";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import DesktopMenu from "./desktop-menu";
import { CategoryNavLinksSrOnly } from "./category-nav-links-sr-only";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./mobile-menu";
import { SearchDialog } from "./search/search-dialog";
import { useCartStore, useWishlistStore } from "@/stores";
import { AneLogo } from "@/components/logo/ane-logo";
import type { Category } from "@/sanity/lib/api";
import { cn } from "@/lib/utils";

const Navigation = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  /** false na SSR i prvom client paintu — izbjegava hydration mismatch; na `/` nakon mounta lagani ulaz. */
  const [searchReveal, setSearchReveal] = useState(false);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
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
  }, [pathname]);

  return (
    <>
      <header
        className={`bg-background/90 sticky top-0 left-0 z-50 w-full backdrop-blur-sm transition-all duration-300 ease-in-out`}
      >
        <div className="border-b">
          {/* <!-- header top start --> */}
          <Container className="h-nav flex items-center">
            <div className="relative flex w-full items-center justify-between gap-5">
              <div className="flex items-center gap-8">
                {/* <!-- header top left / Logo --> */}
                <Link
                  className="text-primary flex shrink-0 items-center gap-2 text-2xl font-bold"
                  href="/"
                >
                  <AneLogo className="size-8" />
                  <span className="font-heading sr-only text-xl font-bold sm:not-sr-only">
                    ANE d.o.o.
                  </span>
                </Link>

                <CategoryNavLinksSrOnly categories={categories} />
                <DesktopMenu categories={categories} />
              </div>

              {/* <!-- header top right --> */}
              <div className="flex items-center">
                <div
                  className={cn(
                    "flex shrink-0 justify-center transition-[max-width,opacity,transform] duration-300 ease-out motion-reduce:transition-none",
                    pathname === "/" && searchReveal
                      ? "max-w-9 translate-y-0 opacity-100"
                      : "pointer-events-none max-w-0 -translate-y-1 opacity-0 overflow-hidden",
                  )}
                  aria-hidden={pathname !== "/" || !searchReveal}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="relative shrink-0"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Pretraži proizvode"
                    disabled={pathname !== "/"}
                    tabIndex={pathname === "/" && searchReveal ? undefined : -1}
                  >
                    <Search aria-hidden />
                  </Button>
                </div>
                <SearchDialog
                  open={searchOpen && pathname === "/"}
                  onOpenChange={(open) => {
                    if (pathname !== "/") return;
                    setSearchOpen(open);
                  }}
                />
                {/* <!-- header top right / Wishlist and Cart --> */}
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Link href="/spaseno" aria-label="Spašeni proizvodi">
                    <Heart className="text-destructive" aria-hidden />
                    {isHydrated && wishlistCount > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-background absolute -top-1 -right-2 z-10 h-5 min-w-5 rounded-full px-1 tabular-nums"
                      >
                        {wishlistCount}
                      </Badge>
                    )}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Link href="/narudzba" aria-label="Korpa za narudžbu">
                    <ShoppingCart size={24} aria-hidden />
                    {isHydrated && cartCount > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-background absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums"
                      >
                        {cartCount}
                      </Badge>
                    )}
                  </Link>
                </Button>

                <MobileMenu categories={categories} />
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
};

export default Navigation;
