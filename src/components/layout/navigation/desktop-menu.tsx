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
import { usePathname } from "next/navigation";
import { menuData } from "./menuData";
import { categoryData } from "@/constants/categories";
import Container from "../container";
import { Badge } from "@/components/ui/badge";
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
          className="flex flex-col gap-1 rounded-md px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
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

  return (
    <div className="border-b lg:block hidden">
      <Container className="flex items-center justify-between">
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
                            "group relative focus:outline-none focus-visible:outline-none focus-visible:ring-0"
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
                          const categoryIsActive =
                            pathname === category.path ||
                            pathname.startsWith(category.path + "/");
                          return (
                            <DropdownMenuSub key={category.id}>
                              <DropdownMenuSubTrigger asChild className="group">
                                <Link
                                  href={category.path}
                                  className={cn(
                                    "flex items-center gap-2 focus:outline-none focus-visible:outline-none focus-visible:ring-0",
                                    categoryIsActive && "bg-accent"
                                  )}
                                >
                                  {category.icon}
                                  {category.title}
                                  <ChevronRight className="ml-auto size-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </Link>
                              </DropdownMenuSubTrigger>
                              {category.subcategories &&
                                category.subcategories.length > 0 && (
                                  <DropdownMenuSubContent className="w-[280px]">
                                    {category.subcategories.map(
                                      (subcategory) => {
                                        const subIsActive =
                                          pathname === subcategory.path ||
                                          pathname.startsWith(
                                            subcategory.path + "/"
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
                                              href={subcategory.path}
                                              className="flex items-center gap-2"
                                            >
                                              {subcategory.icon}
                                              {subcategory.title}
                                            </Link>
                                          </DropdownMenuItem>
                                        );
                                      }
                                    )}
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
                      <NavigationMenuTrigger className="focus:outline-none focus-visible:outline-none focus-visible:ring-0">
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
                        "focus:outline-none focus-visible:outline-none focus-visible:ring-0"
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

        <Link href="/shop" className="font-medium flex gap-3">
          Najprodavanije
          <Badge className="bg-accent text-accent-foreground">AKCIJA</Badge>
        </Link>
      </Container>
    </div>
  );
}
