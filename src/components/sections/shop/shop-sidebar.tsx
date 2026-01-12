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
import { categoryData } from "@/constants/categories";

export default function ShopSidebar() {
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    new Set()
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Set<number>
  >(new Set());

  // Handler za top-level kategoriju
  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    const category = categoryData.find((cat) => cat.id === categoryId);

    if (checked) {
      // Dodaj kategoriju i sve subkategorije
      setSelectedCategories((prev) => new Set(prev).add(categoryId));
      if (category?.subcategories) {
        setSelectedSubcategories((prev) => {
          const newSet = new Set(prev);
          category.subcategories!.forEach((sub) => {
            newSet.add(sub.id);
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
            newSet.delete(sub.id);
          });
          return newSet;
        });
      }
    }
  };

  // Handler za subkategoriju
  const handleSubcategoryChange = (
    categoryId: number,
    subcategoryId: number,
    checked: boolean
  ) => {
    const category = categoryData.find((cat) => cat.id === categoryId);

    if (checked) {
      // Dodaj subkategoriju
      setSelectedSubcategories((prev) => {
        const newSet = new Set(prev).add(subcategoryId);

        // Provjeri da li su sve subkategorije sada odabrane
        // Ako jesu, automatski odaberi i top-level kategoriju
        if (category?.subcategories) {
          const allSelected = category.subcategories.every((sub) =>
            newSet.has(sub.id)
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
        defaultValue="categories"
      >
        {/* Kategorije */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-lg font-semibold px-6 cursor-pointer">
            Kategorije
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <div className="flex flex-col gap-2 bg-muted/20 p-4 rounded-md">
              {categoryData.map((category) => (
                <div key={category.id} className="flex flex-col gap-2">
                  {/* Main Category */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`sidebar-category-${category.id}`}
                        checked={selectedCategories.has(category.id)}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category.id, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`sidebar-category-${category.id}`}
                        className="shrink-0 text-sm font-medium cursor-pointer"
                      >
                        {category.title}
                      </Label>
                    </div>
                  </div>
                  {/* Subcategories */}
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <div className="flex flex-col gap-2 pl-6">
                        {category.subcategories.map((subcategory) => (
                          <div
                            key={subcategory.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`sidebar-subcategory-${subcategory.id}`}
                                checked={selectedSubcategories.has(
                                  subcategory.id
                                )}
                                onCheckedChange={(checked) =>
                                  handleSubcategoryChange(
                                    category.id,
                                    subcategory.id,
                                    checked === true
                                  )
                                }
                              />
                              <Label
                                htmlFor={`sidebar-subcategory-${subcategory.id}`}
                                className="shrink-0 text-sm font-medium cursor-pointer"
                              >
                                {subcategory.title}
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
