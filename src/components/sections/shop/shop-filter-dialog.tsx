"use client";

import { FilterIcon } from "lucide-react";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ShopFilterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="xl:hidden flex flex-1">
          <FilterIcon size={20} />
          Filtriraj
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filtriraj proizvode</DialogTitle>
          <DialogDescription>
            Odaberite kategorije i cijenu za filtriranje proizvoda
          </DialogDescription>
        </DialogHeader>

        <Accordion
          type="single"
          collapsible
          defaultValue="categories"
          className="w-full"
        >
          {/* Kategorije */}
          <AccordionItem value="categories">
            <AccordionTrigger className="text-lg font-semibold">
              Kategorije
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 bg-muted/20 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="dialog-category-men" />
                    <Label
                      htmlFor="dialog-category-men"
                      className="shrink-0 text-sm font-medium cursor-pointer"
                    >
                      Muška odjeća
                    </Label>
                  </div>
                  <Badge variant="outline" className="bg-background">
                    12
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="dialog-category-women" />
                    <Label
                      htmlFor="dialog-category-women"
                      className="shrink-0 text-sm font-medium cursor-pointer"
                    >
                      Ženska odjeća
                    </Label>
                  </div>
                  <Badge variant="outline" className="bg-background">
                    18
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="dialog-category-kids" />
                    <Label
                      htmlFor="dialog-category-kids"
                      className="shrink-0 text-sm font-medium cursor-pointer"
                    >
                      Dječija odjeća
                    </Label>
                  </div>
                  <Badge variant="outline" className="bg-background">
                    25
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="dialog-category-shoes" />
                    <Label
                      htmlFor="dialog-category-shoes"
                      className="shrink-0 text-sm font-medium cursor-pointer"
                    >
                      Obuća
                    </Label>
                  </div>
                  <Badge variant="outline" className="bg-background">
                    8
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="dialog-category-accessories" />
                    <Label
                      htmlFor="dialog-category-accessories"
                      className="shrink-0 text-sm font-medium cursor-pointer"
                    >
                      Dodaci
                    </Label>
                  </div>
                  <Badge variant="outline" className="bg-background">
                    15
                  </Badge>
                </div>
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
      </DialogContent>
    </Dialog>
  );
}
