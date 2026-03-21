"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { menuData } from "./menuData";
import { categoryData } from "@/constants/categories";
import { ChevronDownIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function ListItem({
  title,
  children,
  href,
  isActive = false,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  isActive?: boolean;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild decoration={false} isActive={isActive}>
        <Link
          href={href}
          className="hover:bg-accent hover:text-accent-foreground flex flex-col gap-1 rounded-md px-3 py-2 transition-colors"
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default function DesktopMenu() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategorySlugs = new Set(
    searchParams
      .getAll("kategorija")
      .join(",")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );

  const getCategorySlugFromPath = (path: string) => path.split("/").pop() ?? "";
  const getShopFilterHref = (slug: string) =>
    `/shop?kategorija=${encodeURIComponent(slug)}`;

  return (
    <div className="hidden lg:block">
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList className="">
          {menuData.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname === item.path ||
                  pathname.startsWith(item.path + "/");

            // Use DropdownMenu for "Kategorije" item with subcategories
            if (item.id === 3 && item.title === "Kategorije") {
              return (
                <NavigationMenuItem key={item.id}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "group relative cursor-pointer focus:outline-none focus-visible:ring-0 focus-visible:outline-none",
                        )}
                      >
                        {item.title}{" "}
                        <ChevronDownIcon
                          className="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
                          aria-hidden="true"
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[280px]">
                      {categoryData.map((category) => {
                        const categorySlug = getCategorySlugFromPath(
                          category.path,
                        );
                        const categoryIsActive =
                          pathname === "/shop" &&
                          selectedCategorySlugs.has(categorySlug);
                        return (
                          <DropdownMenuSub key={category.id}>
                            <DropdownMenuSubTrigger asChild className="group">
                              <Link
                                href={getShopFilterHref(categorySlug)}
                                className={cn(
                                  "flex items-center gap-2 focus:outline-none focus-visible:ring-0 focus-visible:outline-none",
                                  categoryIsActive && "bg-accent",
                                )}
                              >
                                {category.title}
                                <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-hover:translate-x-1" />
                              </Link>
                            </DropdownMenuSubTrigger>
                            {category.subcategories &&
                              category.subcategories.length > 0 && (
                                <DropdownMenuSubContent className="w-[280px]">
                                  {category.subcategories.map((subcategory) => {
                                    const subcategorySlug =
                                      getCategorySlugFromPath(subcategory.path);
                                    const subIsActive =
                                      pathname === "/shop" &&
                                      selectedCategorySlugs.has(
                                        subcategorySlug,
                                      );
                                    return (
                                      <DropdownMenuItem
                                        key={subcategory.id}
                                        asChild
                                        className={
                                          subIsActive ? "bg-accent" : ""
                                        }
                                      >
                                        <Link
                                          href={getShopFilterHref(
                                            subcategorySlug,
                                          )}
                                          className="flex items-center gap-2"
                                        >
                                          {subcategory.title}
                                        </Link>
                                      </DropdownMenuItem>
                                    );
                                  })}
                                </DropdownMenuSubContent>
                              )}
                          </DropdownMenuSub>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              );
            }

            // Regular navigation items
            return (
              <NavigationMenuItem key={item.id}>
                {item.submenu ? (
                  <>
                    <NavigationMenuTrigger className="focus:outline-none focus-visible:ring-0 focus-visible:outline-none">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-2">
                        {item.submenu.map((subItem) => {
                          const subItemIsActive =
                            subItem.path === "/"
                              ? pathname === "/"
                              : pathname === subItem.path ||
                                pathname.startsWith(subItem.path + "/");
                          return (
                            <ListItem
                              key={subItem.id}
                              title={subItem.title}
                              href={subItem.path}
                              isActive={subItemIsActive}
                            />
                          );
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "focus:outline-none focus-visible:ring-0 focus-visible:outline-none",
                    )}
                    isActive={isActive}
                  >
                    <Link
                      href={item.path}
                      target={item.newTab ? "_blank" : "_self"}
                      className="focus:outline-none focus-visible:outline-none"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
