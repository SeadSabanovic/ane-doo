"use client";

import { useState } from "react";
import Link from "next/link";
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

const Navigation = () => {
  const pathname = usePathname();
  const isRootRoute = pathname === "/";
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Social Links Bar */}
      <div className="w-full bg-card-foreground text-primary-foreground hidden lg:block">
        <Container className="py-2 flex items-center justify-between">
          <a href="tel:+38761123456" className="flex items-center gap-2">
            <AnimatedShinyText className="text-sm">
              Pozovite nas: (+387) 61 101 871
            </AnimatedShinyText>
          </a>
          <div className="flex items-center justify-between gap-6">
            {SOCIALS.map((social) => (
              <Link key={social.name} href={social.url} target="_blank">
                <div className="size-5 rounded-full flex items-center justify-center text-accent hover:scale-110 transition-all duration-200">
                  {social.icon}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>

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
                    <Badge
                      variant="outline"
                      className="absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums bg-background animate-bounce duration-700"
                    >
                      8
                    </Badge>
                  </Button>
                </Link>
                <Link href="/narudzba">
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
    </>
  );
};

export default Navigation;
