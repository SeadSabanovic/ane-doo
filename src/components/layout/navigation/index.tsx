import Link from "next/link";
import Container from "../container";
import { Heart, Search, ShoppingCart } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import DesktopMenu from "./desktop-menu";
import { Badge } from "@/components/ui/badge";
import MobileMenu from "./mobile-menu";

const Navigation = () => {
  return (
    <header
      className={`sticky left-0 top-0 w-full z-50 backdrop-blur-sm bg-background/90 transition-all ease-in-out duration-300`}
    >
      <div className="border-b">
        {/* <!-- header top start --> */}
        <Container className="py-3">
          <div className={`flex gap-5 items-center justify-between relative`}>
            {/* <!-- header top left / Logo --> */}
            <Link className="shrink-0 text-2xl font-bold text-primary" href="/">
              ANE DOO
            </Link>

            {/* <!-- header search --> */}
            <InputGroup className="bg-background max-w-md hidden lg:flex absolute left-1/2 -translate-x-1/2">
              <InputGroupInput placeholder="Pretraga..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            {/* <!-- header top right --> */}
            <div className="flex items-center gap-3">
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

      <DesktopMenu />
    </header>
  );
};

export default Navigation;
