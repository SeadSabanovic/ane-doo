import Link from "next/link";
import { menuData } from "./menuData";
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
          <div
            className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between`}
          >
            {/* <!-- header top left / Logo --> */}
            <Link className="shrink-0 text-2xl font-bold" href="/">
              ANE D.O.O.
            </Link>

            {/* <!-- header top right --> */}
            <div className="flex w-full lg:w-auto items-center gap-3">
              {/* <!-- header top right / Search --> */}
              <InputGroup>
                <InputGroupInput placeholder="Pretraga..." />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
              {/* <!-- header top right / Wishlist and Cart --> */}
              <Button variant="outline" size="icon" className="relative">
                <Heart />
                <small className="font-medium text-xs leading-none text-dark absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {1}
                </small>
              </Button>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart size={24} />
                <small className="font-medium text-xs text-dark absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {4}
                </small>
              </Button>
            </div>
          </div>
          {/* <!-- header top end --> */}
        </Container>
      </div>

      <div className="border-b py-2">
        <Container className="flex items-center gap-4 justify-center">
          {/* {menuData.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="font-medium text-gray-500 hover:text-primary"
            >
              {item.title}
            </Link>
          ))} */}
          <DesktopMenu />
        </Container>
      </div>
    </header>
  );
};

export default Navigation;
