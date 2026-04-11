"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLenis } from "lenis/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AneLogo } from "@/components/logo/ane-logo";
import { menuData } from "./menuData";
import type { Category } from "@/sanity/lib/api";
import { usePathname } from "next/navigation";
import { useCategoryFilterSlugs } from "@/hooks/use-category-filter-slugs";
import { cn } from "@/lib/utils";
import { SOCIALS } from "@/constants/socials";

const navLinkClass =
  "border-border/60 block w-full border-b py-3.5 text-left text-2xl font-medium tracking-tight transition-colors hover:text-primary";

const subLinkClass =
  "text-muted-foreground hover:text-foreground block py-2 pl-1 text-lg font-medium tracking-tight transition-colors";

export default function MobileMenu({
  categories,
}: {
  categories: Category[];
}) {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const pathname = usePathname();
  const selectedCategorySlugs = useCategoryFilterSlugs();
  const getShopFilterHref = (slug: string) =>
    `/katalog?kategorija=${encodeURIComponent(slug)}`;

  useEffect(() => {
    if (!lenis) return;

    if (open) {
      lenis.stop();
      lenis.destroy();
    } else {
      lenis.start();
    }

    return () => {
      if (lenis && !open) {
        lenis.start();
      }
    };
  }, [open, lenis]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="ml-3 shrink-0 lg:hidden"
          aria-label="Otvori mobilni meni"
        >
          <Menu className="size-[18px]" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        hideCloseButton
        className="flex h-full w-[min(100%,420px)] max-w-full flex-col gap-0 border-l p-0 shadow-lg sm:max-w-md"
      >
        <SheetHeader className="bg-background/95 flex h-[61px] shrink-0 flex-row items-center justify-between space-y-0 border-b border-dashed px-4 backdrop-blur-sm">
          <SheetClose asChild>
            <Link
              href="/"
              className="text-primary flex items-center gap-2 text-xl font-bold"
            >
              <AneLogo className="size-8 shrink-0" />
              <span className="font-heading">ANE d.o.o.</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
              aria-label="Zatvori meni"
            >
              <X className="size-5" aria-hidden />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4">
          <div className="flex min-h-full flex-1 flex-col">
            <SheetTitle className="text-muted-foreground mt-3 shrink-0 px-0 pb-1 text-sm font-normal">
              Meni
            </SheetTitle>
            <SheetDescription className="sr-only">
              Navigacija, kategorije i društvene mreže
            </SheetDescription>

            <nav
              className="flex shrink-0 flex-col [&>a:last-of-type]:border-b-0"
              aria-label="Glavna navigacija"
            >
            {menuData.map((item) => {
              if (item.id === 3 && item.title === "Kategorije") {
                return (
                  <Accordion
                    key={item.id}
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    <AccordionItem
                      value="kategorije"
                      className="group border-none"
                    >
                      <AccordionTrigger
                        className={cn(
                          navLinkClass,
                          "flex py-3.5 hover:no-underline group-data-[state=open]:border-b-0 [&>svg]:size-6",
                        )}
                      >
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="pb-3 pl-0 pt-1">
                        <ul className="flex flex-col gap-4">
                          {categories.map((category) => {
                            const categorySlug = category.slug?.current;
                            if (!categorySlug) return null;
                            const categoryIsActive =
                              pathname === "/katalog" &&
                              selectedCategorySlugs.has(categorySlug);
                            const subs = category.subcategories ?? [];

                            return (
                              <li
                                key={category._id}
                                className="border-border border-b pb-3 last:border-none last:pb-0"
                              >
                                <SheetClose asChild>
                                  <Link
                                    href={getShopFilterHref(categorySlug)}
                                    className={cn(
                                      subLinkClass,
                                      "text-foreground block py-1 text-lg",
                                      categoryIsActive && "font-semibold",
                                    )}
                                  >
                                    {category.name}
                                  </Link>
                                </SheetClose>
                                {subs.length > 0 && (
                                  <ul className="border-border/60 mt-2 ml-1 flex flex-col gap-1 border-l pl-3">
                                    {subs.map((subcategory) => {
                                      const subSlug =
                                        subcategory.slug?.current;
                                      if (!subSlug) return null;
                                      const subIsActive =
                                        pathname === "/katalog" &&
                                        selectedCategorySlugs.has(subSlug);
                                      return (
                                        <li key={subcategory._id}>
                                          <SheetClose asChild>
                                            <Link
                                              href={getShopFilterHref(subSlug)}
                                              className={cn(
                                                subLinkClass,
                                                "text-base",
                                                subIsActive &&
                                                  "text-foreground font-semibold",
                                              )}
                                            >
                                              {subcategory.name}
                                            </Link>
                                          </SheetClose>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                );
              }

              return (
                <SheetClose key={item.id} asChild>
                  <Link
                    href={item.path}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className={navLinkClass}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              );
            })}
            </nav>

            <section
              className="border-border mt-auto shrink-0 border-t border-dashed pt-8 pb-10"
              aria-label="Društvene mreže"
            >
              <p className="text-muted-foreground mb-3 text-sm font-normal">
                Pratite nas
              </p>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map(({ name, url, Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="border-border hover:bg-muted/40 flex size-11 items-center justify-center rounded-full border transition-colors"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
