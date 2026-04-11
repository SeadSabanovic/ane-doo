"use client";

import { CheckIcon, FilterIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CostSlider from "@/components/ui/cost-slider";
import SaleOnlyToggle from "@/components/ui/sale-only-toggle";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Category } from "@/sanity/lib/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function getSelectedFromQuery(
  rawCategoryParam: string | null,
  categories: Category[],
) {
  if (!rawCategoryParam) {
    return {
      selectedCategories: new Set<string>(),
      selectedSubcategories: new Set<string>(),
    };
  }

  const selectedSlugs = new Set(
    rawCategoryParam
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  );

  const selectedSubcategories = new Set<string>();
  categories.forEach((category) => {
    const subcategories = category.subcategories ?? [];
    const parentSelected = selectedSlugs.has(category.slug.current);

    if (parentSelected) {
      subcategories.forEach((subcategory) => {
        selectedSubcategories.add(subcategory._id);
      });
    }

    subcategories.forEach((subcategory) => {
      if (selectedSlugs.has(subcategory.slug.current)) {
        selectedSubcategories.add(subcategory._id);
      }
    });
  });

  const selectedCategories = new Set<string>();
  categories.forEach((category) => {
    const parentSelected = selectedSlugs.has(category.slug.current);
    const allSubcategoriesSelected =
      (category.subcategories?.length ?? 0) > 0 &&
      category.subcategories!.every((subcategory) =>
        selectedSubcategories.has(subcategory._id),
      );

    if (parentSelected || allSubcategoriesSelected) {
      selectedCategories.add(category._id);
    }
  });

  return {
    selectedCategories,
    selectedSubcategories,
  };
}

export default function ShopFilterDialog({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    "price",
  );
  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 200;

  const readPriceFromQuery = (): [number, number] => {
    const rawMin = searchParams.get("cijenaOd");
    const rawMax = searchParams.get("cijenaDo");

    const min = rawMin ? Number.parseInt(rawMin, 10) : DEFAULT_MIN_PRICE;
    const max = rawMax ? Number.parseInt(rawMax, 10) : DEFAULT_MAX_PRICE;

    const safeMin = Number.isFinite(min)
      ? Math.max(DEFAULT_MIN_PRICE, min)
      : DEFAULT_MIN_PRICE;
    const safeMax = Number.isFinite(max)
      ? Math.max(safeMin, max)
      : DEFAULT_MAX_PRICE;

    return [safeMin, safeMax];
  };

  const [priceRange, setPriceRange] = useState<[number, number]>(() =>
    readPriceFromQuery(),
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Set<string>
  >(new Set());
  const lenis = useLenis();

  const syncSelectionWithQuery = () => {
    const {
      selectedCategories: nextSelectedCategories,
      selectedSubcategories: nextSelectedSubcategories,
    } = getSelectedFromQuery(searchParams.get("kategorija"), categories);
    setSelectedCategories(nextSelectedCategories);
    setSelectedSubcategories(nextSelectedSubcategories);
  };

  const applyCategoryFilter = () => {
    const selectedSlugs = new Set<string>();

    categories.forEach((category) => {
      const subcategories = category.subcategories ?? [];
      const allSubcategoriesSelected =
        subcategories.length > 0 &&
        subcategories.every((subcategory) =>
          selectedSubcategories.has(subcategory._id),
        );
      const parentSelected = selectedCategories.has(category._id);

      // Keep URL compact: if whole group is selected, store only parent slug.
      if (parentSelected || allSubcategoriesSelected) {
        selectedSlugs.add(category.slug.current);
        return;
      }

      subcategories.forEach((subcategory) => {
        if (selectedSubcategories.has(subcategory._id)) {
          selectedSlugs.add(subcategory.slug.current);
        }
      });
    });

    const params = new URLSearchParams(searchParams.toString());

    if (selectedSlugs.size > 0) {
      params.set("kategorija", [...selectedSlugs].join(","));
    } else {
      params.delete("kategorija");
    }

    const [minPrice, maxPrice] = priceRange;
    if (minPrice <= DEFAULT_MIN_PRICE && maxPrice >= DEFAULT_MAX_PRICE) {
      params.delete("cijenaOd");
      params.delete("cijenaDo");
    } else {
      params.set("cijenaOd", String(minPrice));
      params.set("cijenaDo", String(maxPrice));
    }

    params.delete("stranica");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    setOpen(false);
  };

  const clearCategoryFilter = () => {
    setSelectedCategories(new Set());
    setSelectedSubcategories(new Set());

    const params = new URLSearchParams(searchParams.toString());
    params.delete("kategorija");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // Disable/enable Lenis scroll when dialog opens/closes
  useEffect(() => {
    if (!lenis) return;

    if (open) {
      // Stop and destroy Lenis to completely disable scrolling when dialog opens
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

  // Handler za top-level kategoriju
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const category = categories.find((cat) => cat._id === categoryId);

    if (checked) {
      // Dodaj kategoriju i sve subkategorije
      setSelectedCategories((prev) => new Set(prev).add(categoryId));
      if (category?.subcategories) {
        setSelectedSubcategories((prev) => {
          const newSet = new Set(prev);
          category.subcategories!.forEach((sub) => {
            newSet.add(sub._id);
          });
          return newSet;
        });
      }
    } else {
      // Ukloni kategoriju i sve subkategorije
      setSelectedCategories((prev) => {
        const newSet = new Set(prev);
        newSet.delete(categoryId);
        return newSet;
      });
      if (category?.subcategories) {
        setSelectedSubcategories((prev) => {
          const newSet = new Set(prev);
          category.subcategories!.forEach((sub) => {
            newSet.delete(sub._id);
          });
          return newSet;
        });
      }
    }
  };

  // Handler za subkategoriju
  const handleSubcategoryChange = (
    categoryId: string,
    subcategoryId: string,
    checked: boolean,
  ) => {
    const category = categories.find((cat) => cat._id === categoryId);

    if (checked) {
      // Dodaj subkategoriju
      setSelectedSubcategories((prev) => {
        const newSet = new Set(prev).add(subcategoryId);

        // Provjeri da li su sve subkategorije sada odabrane
        // Ako jesu, automatski odaberi i top-level kategoriju
        if (category?.subcategories) {
          const allSelected = category.subcategories.every((sub) =>
            newSet.has(sub._id),
          );
          if (allSelected) {
            setSelectedCategories((prevCat) =>
              new Set(prevCat).add(categoryId),
            );
          }
        }

        return newSet;
      });
    } else {
      // Ukloni subkategoriju
      setSelectedSubcategories((prev) => {
        const newSet = new Set(prev);
        newSet.delete(subcategoryId);
        return newSet;
      });

      // Uvijek de-selektuj top-level kategoriju kada se de-selektuje bilo koja subkategorija
      setSelectedCategories((prev) => {
        const newSet = new Set(prev);
        newSet.delete(categoryId);
        return newSet;
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          syncSelectionWithQuery();
          setPriceRange(readPriceFromQuery());
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-background/80! flex h-fit flex-1 items-center justify-start rounded-full p-1 xl:hidden"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-full md:size-8 lg:size-10">
            <FilterIcon />
          </div>
          Filteri
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[70svh] max-w-md flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="flex h-fit flex-col gap-6 border-b p-6">
          <DialogTitle>Filtriraj proizvode</DialogTitle>
          <DialogDescription>
            Odaberite kategorije i cijenu za filtriranje proizvoda
          </DialogDescription>
        </DialogHeader>

        <Accordion
          type="single"
          collapsible
          value={openAccordion}
          onValueChange={setOpenAccordion}
          className="w-full flex-1 overflow-y-auto p-6"
        >
          {/* Kategorije */}
          <AccordionItem value="categories">
            <AccordionTrigger className="text-lg font-semibold">
              Kategorije
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 px-4">
                {categories.map((category) => (
                  <div key={category._id} className="flex flex-col gap-2">
                    {/* Main Category */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`dialog-category-${category._id}`}
                          checked={selectedCategories.has(category._id)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category._id, checked === true)
                          }
                        />
                        <Label
                          htmlFor={`dialog-category-${category._id}`}
                          className="shrink-0 cursor-pointer text-sm font-medium"
                        >
                          {category.name}
                        </Label>
                      </div>
                      <Badge variant="outline" className="bg-background">
                        {category.subcategories?.length || 0}
                      </Badge>
                    </div>
                    {/* Subcategories */}
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <div className="flex flex-col gap-2 pl-6">
                          {category.subcategories.map((subcategory) => (
                            <div
                              key={subcategory._id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`dialog-subcategory-${subcategory._id}`}
                                  checked={selectedSubcategories.has(
                                    subcategory._id,
                                  )}
                                  onCheckedChange={(checked) =>
                                    handleSubcategoryChange(
                                      category._id,
                                      subcategory._id,
                                      checked === true,
                                    )
                                  }
                                />
                                <Label
                                  htmlFor={`dialog-subcategory-${subcategory._id}`}
                                  className="shrink-0 cursor-pointer text-sm font-medium"
                                >
                                  {subcategory.name}
                                </Label>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-background"
                              >
                                0
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Cijena */}
          <AccordionItem value="price">
            <AccordionTrigger className="text-lg font-semibold">
              Cijena
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4">
                <CostSlider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  commitToUrl={false}
                />
                <div className="mt-4">
                  <SaleOnlyToggle />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DialogFooter className="flex border-t p-6">
          <Button
            variant="outline"
            className="flex-1"
            onClick={clearCategoryFilter}
          >
            <XIcon />
            Očisti filtere
          </Button>
          <Button
            variant="default"
            className="flex-1"
            onClick={applyCategoryFilter}
          >
            <CheckIcon />
            Primjeni filtere
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
