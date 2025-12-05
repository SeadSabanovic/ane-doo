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
    <div className="flex flex-col gap-4 items-center justify-between lg:flex-row p-4 rounded-md border">
      {/* Search Bar */}
      <InputGroup className="bg-background">
        <InputGroupInput
          id="search-input"
          name="search"
          type="text"
          placeholder="Pretraga..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
          autoComplete="off"
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <div className="flex items-center gap-4 w-full xl:max-w-sm">
        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="flex-1">
            <SelectValue>
              <ArrowDown01 size={20} />
              {sortOptions.find((opt) => opt.value === sortBy)?.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center justify-between w-full">
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter */}
        <ShopFilterDialog />
      </div>
    </div>
  );
}
