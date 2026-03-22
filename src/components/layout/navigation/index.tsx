"use client";

import { useState, useSyncExternalStore } from "react";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "../container";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import DesktopMenu from "./desktop-menu";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./mobile-menu";
import { SearchDialog } from "./search/search-dialog";
import { SOCIALS } from "@/constants/socials";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { useCartStore, useWishlistStore } from "@/stores";

const Navigation = () => {
  const pathname = usePathname();
  const isRootRoute = pathname === "/";
  const [searchOpen, setSearchOpen] = useState(false);
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
      {/* Social Links Bar */}
      <div className="bg-card-foreground text-primary-foreground hidden w-full lg:block">
        <Container className="flex items-center justify-between py-2">
          <a href="tel:+38761123456" className="flex items-center gap-2">
            <AnimatedShinyText className="text-sm">
              Pozovite nas: (+387) 61 101 871
            </AnimatedShinyText>
          </a>
          <div className="flex items-center justify-between gap-6">
            {SOCIALS.map((social) => (
              <Link key={social.name} href={social.url} target="_blank">
                <div className="text-primary-foreground flex size-5 items-center justify-center rounded-full transition-all duration-200 hover:scale-110">
                  {social.icon}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <header
        className={`bg-background/90 sticky top-0 left-0 z-50 w-full backdrop-blur-sm transition-all duration-300 ease-in-out`}
      >
        <div className="border-b">
          {/* <!-- header top start --> */}
          <Container className="flex h-nav items-center">
            <div className="relative flex w-full items-center justify-between gap-5">
              <div className="flex items-center gap-8">
                {/* <!-- header top left / Logo --> */}
                <Link
                  className="text-primary flex shrink-0 items-center gap-2 text-2xl font-bold"
                  href="/"
                >
                  <Image
                    src="/icons/ANE-logo.svg"
                    alt="ANE d.o.o. Logo"
                    width={32}
                    height={32}
                    priority
                    className="size-8"
                  />
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
                {isRootRoute && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative"
                      onClick={() => setSearchOpen(true)}
                    >
                      <Search />
                    </Button>
                    <SearchDialog
                      open={searchOpen}
                      onOpenChange={setSearchOpen}
                    />
                  </>
                )}
                {/* <!-- header top right / Wishlist and Cart --> */}
                <Link href="/spaseno">
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="text-destructive" />
                    {isHydrated && wishlistCount > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-background absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums"
                      >
                        {wishlistCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link href="/narudzba">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart size={24} />
                    {isHydrated && cartCount > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-background absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums"
                      >
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </Link>

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
