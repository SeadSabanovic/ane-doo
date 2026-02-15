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
import { getParentCategories, type Category } from "@/sanity/lib/api";

export default function ShopFilterDialog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Set<string>
  >(new Set());
  const lenis = useLenis();

  useEffect(() => {
    async function fetchCategories() {
      const data = await getParentCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="xl:hidden flex flex-1 items-center justify-start p-1 h-fit hover:bg-background/80! rounded-full"
        >
          <div className="flex items-center justify-center size-10 bg-primary text-primary-foreground rounded-full">
            <FilterIcon />
          </div>
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
          collapsible
          value={openAccordion}
          onValueChange={setOpenAccordion}
          className="w-full p-6 flex-1 overflow-y-auto"
        >
          {/* Kategorije */}
          <AccordionItem value="categories">
            <AccordionTrigger className="text-lg font-semibold">
              Kategorije
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 bg-muted/20 p-4 rounded-md">
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
                          className="shrink-0 text-sm font-medium cursor-pointer"
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
                                  htmlFor={`dialog-subcategory-${subcategory._id}`}
                                  className="shrink-0 text-sm font-medium cursor-pointer"
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
