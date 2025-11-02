import { ChevronDownIcon, FilterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "../ui/badge";

export default function ShopSidebar() {
  return (
    <aside className="w-full max-w-[350px] space-y-3">
      <div className="flex items-center gap-2">
        <FilterIcon size={20} />
        <h4 className="text-lg font-bold">Filteri</h4>
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
        <CollapsibleContent className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
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
        <CollapsibleContent className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md">
          <div className="flex items-center justify-between gap-4">
            <Label
              htmlFor="min-price-range"
              className="shrink-0 text-sm font-medium"
            >
              Min
            </Label>
            <Input
              id="min-price-range"
              type="number"
              placeholder="0"
              className="max-w-32"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label
              htmlFor="max-price-range"
              className="shrink-0 text-sm font-medium"
            >
              Max
            </Label>
            <Input
              id="max-price-range"
              type="number"
              placeholder="1000"
              className="max-w-32"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}
