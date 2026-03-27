"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { type Category } from "@/sanity/lib/api";
import { FilterX } from "lucide-react";

interface ShopSidebarProps {
  categories: Category[];
}

export default function ShopSidebar({ categories }: ShopSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    "price",
  );
  const { selectedCategories, selectedSubcategories } = useMemo(() => {
    const rawCategoryParam = searchParams.get("kategorija");

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
    const nextSelectedSubcategories = new Set<string>();

    categories.forEach((category) => {
      const subcategories = category.subcategories ?? [];
      const parentSelected = selectedSlugs.has(category.slug.current);

      if (parentSelected) {
        subcategories.forEach((subcategory) => {
          nextSelectedSubcategories.add(subcategory._id);
        });
      }

      subcategories.forEach((subcategory) => {
        if (selectedSlugs.has(subcategory.slug.current)) {
          nextSelectedSubcategories.add(subcategory._id);
        }
      });
    });

    const nextSelectedCategories = new Set<string>();
    categories.forEach((category) => {
      const parentSelected = selectedSlugs.has(category.slug.current);
      const allSubcategoriesSelected =
        (category.subcategories?.length ?? 0) > 0 &&
        category.subcategories!.every((subcategory) =>
          nextSelectedSubcategories.has(subcategory._id),
        );

      if (parentSelected || allSubcategoriesSelected) {
        nextSelectedCategories.add(category._id);
      }
    });

    return {
      selectedCategories: nextSelectedCategories,
      selectedSubcategories: nextSelectedSubcategories,
    };
  }, [categories, searchParams]);

  const hasActiveFilters = useMemo(() => {
    if (searchParams.get("kategorija")) return true;
    if (searchParams.get("cijenaOd") || searchParams.get("cijenaDo"))
      return true;
    const akcija = searchParams.get("akcija");
    if (akcija === "1" || akcija === "true") return true;
    return false;
  }, [searchParams]);

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("kategorija");
    params.delete("cijenaOd");
    params.delete("cijenaDo");
    params.delete("akcija");
    params.delete("stranica");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const buildSelectedSlugs = (
    categoryIds: Set<string>,
    subcategoryIds: Set<string>,
  ) => {
    const selectedSlugs = new Set<string>();

    categories.forEach((category) => {
      const subcategories = category.subcategories ?? [];
      const allSubcategoriesSelected =
        subcategories.length > 0 &&
        subcategories.every((subcategory) =>
          subcategoryIds.has(subcategory._id),
        );
      const parentSelected = categoryIds.has(category._id);

      // Keep URL compact: if whole group is selected, store only parent slug.
      if (parentSelected || allSubcategoriesSelected) {
        selectedSlugs.add(category.slug.current);
        return;
      }

      subcategories.forEach((subcategory) => {
        if (subcategoryIds.has(subcategory._id)) {
          selectedSlugs.add(subcategory.slug.current);
        }
      });
    });

    return [...selectedSlugs];
  };

  const updateCategoryQuery = (
    categoryIds: Set<string>,
    subcategoryIds: Set<string>,
  ) => {
    const selectedSlugs = buildSelectedSlugs(categoryIds, subcategoryIds);

    const params = new URLSearchParams(searchParams.toString());

    if (selectedSlugs.length > 0) {
      params.set("kategorija", selectedSlugs.join(","));
    } else {
      params.delete("kategorija");
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // Handler za top-level kategoriju
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const category = categories.find((cat) => cat._id === categoryId);
    const nextSelectedCategories = new Set(selectedCategories);
    const nextSelectedSubcategories = new Set(selectedSubcategories);

    if (checked) {
      // Dodaj kategoriju i sve subkategorije
      nextSelectedCategories.add(categoryId);
      if (category?.subcategories) {
        category.subcategories.forEach((sub) => {
          nextSelectedSubcategories.add(sub._id);
        });
      }
    } else {
      // Ukloni kategoriju i sve subkategorije
      nextSelectedCategories.delete(categoryId);
      if (category?.subcategories) {
        category.subcategories.forEach((sub) => {
          nextSelectedSubcategories.delete(sub._id);
        });
      }
    }

    updateCategoryQuery(nextSelectedCategories, nextSelectedSubcategories);
  };

  // Handler za subkategoriju
  const handleSubcategoryChange = (
    categoryId: string,
    subcategoryId: string,
    checked: boolean,
  ) => {
    const category = categories.find((cat) => cat._id === categoryId);
    const nextSelectedCategories = new Set(selectedCategories);
    const nextSelectedSubcategories = new Set(selectedSubcategories);

    if (checked) {
      nextSelectedSubcategories.add(subcategoryId);
      if (
        category?.subcategories?.every((sub) =>
          nextSelectedSubcategories.has(sub._id),
        )
      ) {
        nextSelectedCategories.add(categoryId);
      }
    } else {
      nextSelectedSubcategories.delete(subcategoryId);
      nextSelectedCategories.delete(categoryId);
    }

    updateCategoryQuery(nextSelectedCategories, nextSelectedSubcategories);
  };

  return (
    <aside className="hidden w-full max-w-2xs space-y-3 rounded-md border xl:sticky xl:top-24 xl:block xl:self-start">
      <div className="mb-0 flex items-center justify-between gap-2 p-4">
        <h4 className="text-lg font-medium">Filteri:</h4>
      </div>

      <Accordion
        type="single"
        collapsible
        value={openAccordion}
        onValueChange={setOpenAccordion}
        className="w-full"
      >
        {/* Kategorije */}
        <AccordionItem value="categories">
          <AccordionTrigger className="cursor-pointer px-6 text-lg font-semibold">
            Kategorije
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <div className="flex flex-col gap-2 rounded-md px-4">
              {categories.map((category) => (
                <div key={category._id} className="flex flex-col gap-2">
                  {/* Main Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`sidebar-category-${category._id}`}
                        checked={selectedCategories.has(category._id)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category._id, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`sidebar-category-${category._id}`}
                        className="shrink-0 cursor-pointer text-sm font-medium"
                      >
                        {category.name}
                      </Label>
                    </div>
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
                                id={`sidebar-subcategory-${subcategory._id}`}
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
                                htmlFor={`sidebar-subcategory-${subcategory._id}`}
                                className="shrink-0 cursor-pointer text-sm font-medium"
                              >
                                {subcategory.name}
                              </Label>
                            </div>
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
          <AccordionTrigger className="cursor-pointer px-6 text-lg font-semibold">
            Cijena
          </AccordionTrigger>
          <AccordionContent className="px-2">
            <div className="px-4">
              <CostSlider />
              <div className="mt-4">
                <SaleOnlyToggle />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {hasActiveFilters ? (
        <div className="px-4 pb-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={clearFilters}
          >
            <FilterX className="size-4" aria-hidden />
            Očisti filtere
          </Button>
        </div>
      ) : null}
    </aside>
  );
}
