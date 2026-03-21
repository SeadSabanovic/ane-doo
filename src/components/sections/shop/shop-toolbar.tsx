"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown01, Search } from "lucide-react";
import { useState } from "react";
import ShopFilterDialog from "./shop-filter-dialog";
import Container from "@/components/layout/container";
import { Label } from "@/components/ui/label";

export default function ShopToolbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const sortOptions = [
    { value: "popular", label: "Najpopularnije" },
    { value: "newest", label: "Najnovije" },
    { value: "price-asc", label: "Cijena: rastuća" },
    { value: "price-desc", label: "Cijena: padajuća" },
  ];

  return (
    <Container className="pb-8">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:items-end lg:justify-end">
        {/* Search Bar */}
        <div className="flex w-full flex-1 flex-col items-stretch gap-2 lg:max-w-sm! xl:max-w-lg!">
          <Label
            htmlFor="search-input"
            className="sr-only text-sm font-medium whitespace-nowrap"
          >
            Pretraga:
          </Label>
          <InputGroup className="bg-background! h-fit rounded-full">
            <InputGroupInput
              id="search-input"
              name="search"
              type="text"
              placeholder="Pretraga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              className="text-lg!"
            />
            <InputGroupAddon className="py-1 pl-1">
              <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full">
                <Search />
              </div>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex w-full flex-1 items-end gap-4 xl:max-w-sm">
          {/* Sort */}
          <div className="flex flex-1 flex-col items-stretch gap-2">
            <Label
              htmlFor="sort-select"
              className="sr-only text-sm font-medium whitespace-nowrap"
            >
              Sortiraj:
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                id="sort-select"
                className="bg-background! h-fit! w-full flex-1 cursor-pointer rounded-full p-1 pr-2 font-medium!"
              >
                <SelectValue className="h-fit">
                  <div className="bg-primary text-primary-foreground! flex size-10 items-center justify-center rounded-full">
                    <ArrowDown01
                      size={24}
                      className="text-primary-foreground"
                    />
                  </div>
                  {sortOptions.find((opt) => opt.value === sortBy)?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex w-full items-center justify-between font-medium">
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter */}
          <ShopFilterDialog />
        </div>
      </div>
    </Container>
  );
}
