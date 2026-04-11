"use client";

import { useSyncExternalStore } from "react";
import { Suspense } from "react";
import Link from "next/link";
import Container from "../container";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import DesktopMenu from "./desktop-menu";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./mobile-menu";
// import { SearchDialog } from "./search/search-dialog";
import { useCartStore, useWishlistStore } from "@/stores";
import { AneLogo } from "@/components/logo/ane-logo";

const Navigation = () => {
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

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

                <Suspense fallback={null}>
                  <DesktopMenu />
                </Suspense>
              </div>

              {/* <!-- header top right --> */}
              <div className="flex items-center">
                {/* Homepage search (SearchDialog) — privremeno isključeno (hydration debug)
                {isRootRoute && (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="relative"
                      onClick={() => setSearchOpen(true)}
                      aria-label="Pretraži proizvode"
                    >
                      <Search aria-hidden />
                    </Button>
                    <SearchDialog
                      open={searchOpen}
                      onOpenChange={setSearchOpen}
                    />
                  </>
                )}
                */}
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

                <Suspense fallback={null}>
                  <MobileMenu />
                </Suspense>
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
};

export default Navigation;
