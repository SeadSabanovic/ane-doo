import Link from "next/link";
import { menuData } from "./menuData";
import Container from "../container";
import { Heart, ShoppingCart } from "lucide-react";

const Navigation = () => {
  return (
    <header
      className={`sticky left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300`}
    >
      {/* <!-- header top start --> */}
      <Container className="py-4">
        <div
          className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between`}
        >
          {/* <!-- header top left --> */}
          <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
            <Link className="shrink-0 text-2xl font-bold" href="/">
              ANE D.O.O.
            </Link>
          </div>

          {/* <!-- header top right --> */}
          <div className="flex w-full lg:w-auto items-center gap-7.5">
            <div className="flex w-full lg:w-auto justify-between items-center gap-5">
              <button className="flex items-center gap-2.5 relative cursor-pointer">
                <Heart size={24} />
                <span className="font-medium text-xs text-dark absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {6}
                </span>
              </button>
              <button className="flex items-center gap-2.5 relative cursor-pointer">
                <ShoppingCart size={24} />
                <span className="font-medium text-xs text-dark absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {4}
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* <!-- header top end --> */}
      </Container>

      <div className="border-y py-2">
        <Container className="flex items-center gap-4 justify-center">
          {menuData.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="font-medium text-gray-500 hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
};

export default Navigation;
