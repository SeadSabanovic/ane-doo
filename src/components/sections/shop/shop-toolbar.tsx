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
      <div className="flex flex-col gap-4 items-center justify-between lg:flex-row lg:items-end ">
        {/* Search Bar */}
        <div className="flex flex-col items-stretch gap-2 w-full flex-1">
          <Label
            htmlFor="search-input"
            className="text-sm font-medium whitespace-nowrap sr-only"
          >
            Pretraga:
          </Label>
          <InputGroup className="bg-background! rounded-full h-fit">
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
            <InputGroupAddon className="pl-1 py-1">
              <div className="flex items-center justify-center size-10 bg-primary text-primary-foreground rounded-full">
                <Search />
              </div>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex w-full flex-1 items-end gap-4 xl:max-w-sm">
          {/* Sort */}
          <div className="flex flex-col items-stretch gap-2 flex-1">
            <Label
              htmlFor="sort-select"
              className="text-sm font-medium whitespace-nowrap sr-only"
            >
              Sortiraj:
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                id="sort-select"
                className="flex-1 bg-background! h-fit! p-1 pr-2 w-full cursor-pointer font-medium! rounded-full"
              >
                <SelectValue className="h-fit">
                  <div className="flex items-center justify-center size-10 bg-primary text-primary-foreground! rounded-full">
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
                    <div className="flex items-center justify-between w-full font-medium">
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
