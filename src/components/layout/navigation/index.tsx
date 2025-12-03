"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../container";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import DesktopMenu from "./desktop-menu";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./mobile-menu";

const Navigation = () => {
  const pathname = usePathname();
  const isRootRoute = pathname === "/";
  return (
    <header
      className={`sticky left-0 top-0 w-full z-50 backdrop-blur-sm bg-background/90 transition-all ease-in-out duration-300`}
    >
      <div className="border-b">
        {/* <!-- header top start --> */}
        <Container className="py-3">
          <div className={`flex gap-5 items-center justify-between relative`}>
            <div className="flex items-center gap-8">
              {/* <!-- header top left / Logo --> */}
              <Link
                className="shrink-0 text-2xl font-bold text-primary"
                href="/"
              >
                ANE DOO
              </Link>

              <DesktopMenu />
            </div>

            {/* <!-- header top right --> */}
            <div className="flex items-center">
              {isRootRoute && (
                <Button variant="ghost" size="icon" className="relative">
                  <Search />
                </Button>
              )}
              {/* <!-- header top right / Wishlist and Cart --> */}
              <Link href="/spaseno">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="text-destructive" />
                  <Badge
                    variant="outline"
                    className="absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums bg-background animate-bounce duration-700"
                  >
                    8
                  </Badge>
                </Button>
              </Link>
              <Link href="/blagajna">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart size={24} />
                  <Badge
                    variant="outline"
                    className="absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums bg-background animate-bounce duration-700"
                  >
                    8
                  </Badge>
                </Button>
              </Link>

              <MobileMenu />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Navigation;
