"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CostSlider from "@/components/ui/cost-slider";
import { Label } from "@/components/ui/label";
import { type Category } from "@/sanity/lib/api";
import { COLORS, SIZES } from "@/constants/colors";

interface ShopSidebarProps {
  categories: Category[];
}

export default function ShopSidebar({ categories }: ShopSidebarProps) {
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Set<string>
  >(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());

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
    checked: boolean
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
            newSet.has(sub._id)
          );
          if (allSelected) {
            setSelectedCategories((prevCat) =>
              new Set(prevCat).add(categoryId)
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

  // Handler za boje
  const handleColorChange = (colorKey: string, checked: boolean) => {
    if (checked) {
      setSelectedColors((prev) => new Set(prev).add(colorKey));
    } else {
      setSelectedColors((prev) => {
        const newSet = new Set(prev);
        newSet.delete(colorKey);
        return newSet;
      });
    }
  };

  // Handler za veličine
  const handleSizeChange = (sizeKey: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes((prev) => new Set(prev).add(sizeKey));
    } else {
      setSelectedSizes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(sizeKey);
        return newSet;
      });
    }
  };

  return (
    <aside className="w-full max-w-2xs space-y-3 hidden xl:block xl:sticky xl:top-24 xl:self-start rounded-md border">
      <div className="flex justify-between items-center gap-2 mb-0 p-4">
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
          <AccordionTrigger className="text-lg font-semibold px-6 cursor-pointer">
            Kategorije
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <div className="flex flex-col gap-2 bg-muted/20 p-4 rounded-md">
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
                        className="shrink-0 text-sm font-medium cursor-pointer"
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
                                  subcategory._id
                                )}
                                onCheckedChange={(checked) =>
                                  handleSubcategoryChange(
                                    category._id,
                                    subcategory._id,
                                    checked === true
                                  )
                                }
                              />
                              <Label
                                htmlFor={`sidebar-subcategory-${subcategory._id}`}
                                className="shrink-0 text-sm font-medium cursor-pointer"
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

        {/* Boje */}
        <AccordionItem value="colors">
          <AccordionTrigger className="text-lg font-semibold px-6 cursor-pointer">
            Boje
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <div className="flex flex-col gap-2 bg-muted/20 p-4 rounded-md">
              {COLORS.map((color) => (
                <div key={color.key} className="flex items-center gap-2">
                  <Checkbox
                    id={`sidebar-color-${color.key}`}
                    checked={selectedColors.has(color.key)}
                    onCheckedChange={(checked) =>
                      handleColorChange(color.key, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`sidebar-color-${color.key}`}
                    className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                  >
                    <span
                      className="size-4 rounded-full border border-border"
                      style={{ backgroundColor: color.value }}
                      aria-hidden="true"
                    />
                    {color.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Veličine */}
        <AccordionItem value="sizes">
          <AccordionTrigger className="text-lg font-semibold px-6 cursor-pointer">
            Veličine
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <div className="flex flex-col gap-2 bg-muted/20 p-4 rounded-md">
              {SIZES.map((size) => (
                <div key={size.key} className="flex items-center gap-2">
                  <Checkbox
                    id={`sidebar-size-${size.key}`}
                    checked={selectedSizes.has(size.key)}
                    onCheckedChange={(checked) =>
                      handleSizeChange(size.key, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`sidebar-size-${size.key}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {size.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Cijena */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-lg font-semibold px-6 cursor-pointer">
            Cijena
          </AccordionTrigger>
          <AccordionContent className="px-2">
            <div className="bg-muted/20 p-4 rounded-md">
              <CostSlider />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
