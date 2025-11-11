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

const Navigation = () => {
  return (
    <header
      className={`sticky left-0 top-0 w-full z-9999 backdrop-blur-sm bg-background/80 transition-all ease-in-out duration-300`}
    >
      <div className="border-b">
        {/* <!-- header top start --> */}
        <Container className="py-4">
          <div className={`flex gap-5 items-center justify-between`}>
            {/* <!-- header top left / Logo --> */}
            <Link className="shrink-0 text-2xl font-bold" href="/">
              ANE
            </Link>

            {/* <!-- header top right / Search --> */}
            <InputGroup className="bg-background/50 max-w-md hidden lg:flex">
              <InputGroupInput placeholder="Pretraga..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            {/* <!-- header top right --> */}
            <div className="flex items-center gap-3">
              {/* <!-- header top right / Wishlist and Cart --> */}
              <Link href="/spaseno">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  <Heart className="text-destructive" />
                  <Badge
                    variant="outline"
                    className="absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums bg-white animate-bounce duration-700"
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
                    className="absolute -top-1 -right-2 h-5 min-w-5 rounded-full px-1 tabular-nums bg-white animate-bounce duration-700"
                  >
                    8
                  </Badge>
                </Button>
              </Link>
            </div>
          </div>
          {/* <!-- header top end --> */}
        </Container>
      </div>
      <div className="border-b lg:block hidden">
        <Container>
          <DesktopMenu />
        </Container>
      </div>
    </header>
  );
};

export default Navigation;
