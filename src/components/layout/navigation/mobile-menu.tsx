"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { menuData } from "./menuData";
import { categoryData } from "@/constants/categories";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategorySlugs = new Set(
    searchParams
      .getAll("kategorija")
      .join(",")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  );
  const getCategorySlugFromPath = (path: string) => path.split("/").pop() ?? "";
  const getShopFilterHref = (slug: string) =>
    `/shop?kategorija=${encodeURIComponent(slug)}`;

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-3 lg:hidden"
          aria-label="Otvori mobilni meni"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-full! bg-primary/70 backdrop-blur-sm! border-none gap-0"
        hideCloseButton
      >
        <SheetHeader className="bg-linear-to-r from-primary to-card-foreground relative">
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 hover:bg-transparent"
              onClick={handleNavigate}
            >
              <X className="size-6" />
              <span className="sr-only">Zatvori meni</span>
            </Button>
          </SheetClose>
          <SheetTitle className="text-accent text-2xl font-bold">
            ANE D.O.O.
          </SheetTitle>
          <SheetDescription className="sr-only">
            Navigirajte kroz stranicu koristeći meni opcije
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-4 p-4 text-primary-foreground overflow-auto pt-6 pb-[10lvh]">
          {menuData.map((item) => {
            // Special handling for "Kategorije" with accordion
            if (item.id === 3 && item.title === "Kategorije") {
              return (
                <Accordion
                  type="single"
                  collapsible
                  key={item.id}
                  className="w-full"
                >
                  <AccordionItem value="kategorije" className="border-none">
                    <AccordionTrigger className="font-medium text-lg py-2 hover:no-underline [&>svg]:size-5 [&>svg]:text-accent">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pl-4">
                      <Accordion type="single" collapsible className="w-full">
                        {categoryData.map((category) => {
                          const categorySlug = getCategorySlugFromPath(
                            category.path
                          );
                          const categoryIsActive =
                            pathname === "/shop" &&
                            selectedCategorySlugs.has(categorySlug);
                          const hasSubcategories =
                            category.subcategories &&
                            category.subcategories.length > 0;

                          return (
                            <AccordionItem
                              key={category.id}
                              value={`category-${category.id}`}
                              className="border-none"
                            >
                              <AccordionTrigger className="py-2 text-secondary text-lg hover:no-underline [&>svg]:size-5 [&>svg]:text-accent">
                                <div className="flex items-center gap-2 flex-1">
                                  {hasSubcategories ? (
                                    <Link
                                      href={getShopFilterHref(categorySlug)}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavigate();
                                      }}
                                      className={cn(
                                        categoryIsActive && "font-bold"
                                      )}
                                    >
                                      {category.title}
                                    </Link>
                                  ) : (
                                    <Link
                                      href={getShopFilterHref(categorySlug)}
                                      onClick={handleNavigate}
                                      className={cn(
                                        categoryIsActive && "font-bold"
                                      )}
                                    >
                                      {category.title}
                                    </Link>
                                  )}
                                </div>
                              </AccordionTrigger>
                              {hasSubcategories && (
                                <AccordionContent className="pt-2 pl-4">
                                  <div className="flex flex-col gap-2">
                                    {category.subcategories?.map(
                                      (subcategory) => {
                                        const subcategorySlug =
                                          getCategorySlugFromPath(
                                            subcategory.path
                                          );
                                        const subIsActive =
                                          pathname === "/shop" &&
                                          selectedCategorySlugs.has(
                                            subcategorySlug
                                          );
                                        return (
                                          <Link
                                            key={subcategory.id}
                                            href={getShopFilterHref(
                                              subcategorySlug
                                            )}
                                            onClick={handleNavigate}
                                            className={cn(
                                              "text-lg font-medium text-secondary hover:underline py-1",
                                              subIsActive && "font-bold"
                                            )}
                                          >
                                            {subcategory.title}
                                          </Link>
                                        );
                                      }
                                    )}
                                  </div>
                                </AccordionContent>
                              )}
                            </AccordionItem>
                          );
                        })}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            }

            // Regular navigation items
            return (
              <div key={item.id}>
                <Link
                  href={item.path}
                  target={item.newTab ? "_blank" : "_self"}
                  className="font-medium text-lg hover:underline block"
                  onClick={handleNavigate}
                >
                  {item.title}
                </Link>
                {item.submenu && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.id}
                        href={subItem.path}
                        target={subItem.newTab ? "_blank" : "_self"}
                        className="font-medium text-lg hover:underline text-secondary"
                        onClick={handleNavigate}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
