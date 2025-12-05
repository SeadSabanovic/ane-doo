"use client";

import { CheckIcon, FilterIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
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
import { categoryData } from "@/constants/categories";

export default function ShopFilterDialog() {
  const [open, setOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string>("categories");
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    new Set()
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Set<number>
  >(new Set());
  const lenis = useLenis();

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

  const handleValueChange = (value: string) => {
    // Osiguraj da uvijek jedan accordion item bude otvoren
    // Ako korisnik pokuša zatvoriti otvoreni, automatski otvori prvi
    if (value === "" || !value) {
      // Ako zatvara trenutni, otvori prvi (categories)
      setOpenAccordion("categories");
    } else {
      setOpenAccordion(value);
    }
  };

  // Provjeri da li su sve subkategorije odabrane
  const areAllSubcategoriesSelected = (categoryId: number) => {
    const category = categoryData.find((cat) => cat.id === categoryId);
    if (!category?.subcategories || category.subcategories.length === 0) {
      return false;
    }
    return category.subcategories.every((sub) =>
      selectedSubcategories.has(sub.id)
    );
  };

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="xl:hidden flex flex-1">
          <FilterIcon />
          Filteri
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md h-[70svh] p-0 flex flex-col gap-0 overflow-hidden">
        <DialogHeader className="p-6 h-fit border-b flex flex-col gap-6">
          <DialogTitle>Filtriraj proizvode</DialogTitle>
          <DialogDescription>
            Odaberite kategorije i cijenu za filtriranje proizvoda
          </DialogDescription>
        </DialogHeader>

        <Accordion
          type="single"
          value={openAccordion}
          onValueChange={handleValueChange}
          className="w-full p-6 flex-1 overflow-y-auto"
        >
          {/* Kategorije */}
          <AccordionItem value="categories">
            <AccordionTrigger className="text-lg font-semibold">
              Kategorije
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 bg-muted/20 p-4 rounded-md">
                {categoryData.map((category) => (
                  <div key={category.id} className="flex flex-col gap-2">
                    {/* Main Category */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`dialog-category-${category.id}`}
                          checked={selectedCategories.has(category.id)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category.id, checked === true)
                          }
                        />
                        <Label
                          htmlFor={`dialog-category-${category.id}`}
                          className="shrink-0 text-sm font-medium cursor-pointer"
                        >
                          {category.title}
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
                              key={subcategory.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={`dialog-subcategory-${subcategory.id}`}
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
                                  htmlFor={`dialog-subcategory-${subcategory.id}`}
                                  className="shrink-0 text-sm font-medium cursor-pointer"
                                >
                                  {subcategory.title}
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
              <div className="bg-muted/20 p-4 rounded-md">
                <CostSlider />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DialogFooter className="p-6 border-t flex">
          <Button variant="outline" className="flex-1">
            <XIcon />
            Očisti filtre
          </Button>
          <Button variant="default" className="flex-1">
            <CheckIcon />
            Primjeni filtere
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
