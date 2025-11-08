import { ArrowDown01, ChevronDownIcon, FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CostSlider from "@/components/ui/cost-slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "../../ui/badge";

export default function ShopSidebar() {
  return (
    <aside className="w-full max-w-[270px] space-y-3 hidden lg:block">
      <div className="flex items-center gap-2">
        <ArrowDown01 size={20} />
        <h4 className="text-lg font-bold">Sortiraj:</h4>
      </div>

      {/* Sortiranje */}
      <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-md">
        <RadioGroup defaultValue="popular">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="sort-popular" value="popular" />
              <Label
                htmlFor="sort-popular"
                className="text-sm font-medium cursor-pointer"
              >
                Najpopularnije
              </Label>
            </div>
            <span className="text-xs text-muted-foreground">Preporuka</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="sort-newest" value="newest" />
              <Label
                htmlFor="sort-newest"
                className="text-sm font-medium cursor-pointer"
              >
                Najnovije
              </Label>
            </div>
            <span className="text-xs text-muted-foreground">Novo</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="sort-price-asc" value="price-asc" />
              <Label
                htmlFor="sort-price-asc"
                className="text-sm font-medium cursor-pointer"
              >
                Cijena: rastuća
              </Label>
            </div>
            <span className="text-xs text-muted-foreground">Niže prvo</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RadioGroupItem id="sort-price-desc" value="price-desc" />
              <Label
                htmlFor="sort-price-desc"
                className="text-sm font-medium cursor-pointer"
              >
                Cijena: padajuća
              </Label>
            </div>
            <span className="text-xs text-muted-foreground">Više prvo</span>
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <FilterIcon size={20} />
        <h4 className="text-lg font-bold">Filtriraj:</h4>
      </div>
      {/* Kategorije */}
      <Collapsible className="flex flex-col gap-2" defaultOpen>
        <CollapsibleTrigger asChild className="group">
          <Button
            variant="ghost"
            className="w-full justify-between hover:bg-transparent"
          >
            <div className="text-lg font-semibold">Kategorije</div>
            <ChevronDownIcon className="text-muted-foreground size-4 transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-2 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="category-men" />
              <Label
                htmlFor="category-men"
                className="shrink-0 text-sm font-medium cursor-pointer"
              >
                Muška odjeća
              </Label>
            </div>
            <Badge variant="outline" className="bg-white">
              12
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="category-women" />
              <Label
                htmlFor="category-women"
                className="shrink-0 text-sm font-medium cursor-pointer"
              >
                Ženska odjeća
              </Label>
            </div>
            <Badge variant="outline" className="bg-white">
              18
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="category-kids" />
              <Label
                htmlFor="category-kids"
                className="shrink-0 text-sm font-medium cursor-pointer"
              >
                Dječija odjeća
              </Label>
            </div>
            <Badge variant="outline" className="bg-white">
              25
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="category-shoes" />
              <Label
                htmlFor="category-shoes"
                className="shrink-0 text-sm font-medium cursor-pointer"
              >
                Obuća
              </Label>
            </div>
            <Badge variant="outline" className="bg-white">
              8
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="category-accessories" />
              <Label
                htmlFor="category-accessories"
                className="shrink-0 text-sm font-medium cursor-pointer"
              >
                Dodaci
              </Label>
            </div>
            <Badge variant="outline" className="bg-white">
              15
            </Badge>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      {/* Cijena */}
      <Collapsible className="flex flex-col gap-2" defaultOpen>
        <CollapsibleTrigger asChild className="group">
          <Button
            variant="ghost"
            className="w-full justify-between hover:bg-transparent"
          >
            <div className="text-lg font-semibold">Cijena</div>
            <ChevronDownIcon className="text-muted-foreground size-4 transition-transform group-data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col gap-2 bg-gray-50 p-4 rounded-md">
          <CostSlider />
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}
