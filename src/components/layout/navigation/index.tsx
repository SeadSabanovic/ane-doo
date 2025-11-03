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

const Navigation = () => {
  return (
    <header
      className={`sticky left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300`}
    >
      <div className="border-b">
        {/* <!-- header top start --> */}
        <Container className="py-4">
          <div className={`flex gap-5 items-center justify-between`}>
            {/* <!-- header top left / Logo --> */}
            <Link className="shrink-0 text-2xl font-bold" href="/">
              ANE D.O.O.
            </Link>

            {/* <!-- header top right --> */}
            <div className="flex items-center gap-3">
              <DesktopMenu />
              {/* <!-- header top right / Search --> */}
              <InputGroup>
                <InputGroupInput placeholder="Pretraga..." />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
              {/* <!-- header top right / Wishlist and Cart --> */}
              <Link href="/spaseno">
                <Button variant="outline" size="icon" className="relative">
                  <Heart />
                  <small className="font-medium text-xs leading-none text-dark absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {1}
                  </small>
                </Button>
              </Link>
              <Link href="/blagajna">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart size={24} />
                  <small className="font-medium text-xs text-dark absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {4}
                  </small>
                </Button>
              </Link>
            </div>
          </div>
          {/* <!-- header top end --> */}
        </Container>
      </div>
    </header>
  );
};

export default Navigation;
