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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ShopFilterDialog from "./shop-filter-dialog";
import Container from "@/components/layout/container";
import { Label } from "@/components/ui/label";
import {
  parseShopSortParam,
  type Category,
  type ShopSort,
} from "@/sanity/lib/api";

export default function ShopToolbar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const sortBy = parseShopSortParam(searchParams.get("sort"));

  const sortOptions: { value: ShopSort; label: string }[] = [
    {
      value: "popular",
      label: "Istaknuto",
    },
    { value: "newest", label: "Najnovije" },
    { value: "price-asc", label: "Cijena: rastuća" },
    { value: "price-desc", label: "Cijena: padajuća" },
  ];

  const handleSortChange = (value: string) => {
    const next = parseShopSortParam(value);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "popular") {
      params.delete("sort");
    } else {
      params.set("sort", next);
    }
    params.delete("stranica");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <Container className="pb-8">
      <div className="flex flex-col items-center justify-between gap-4 lg:grid lg:grid-cols-2 lg:items-end lg:justify-end xl:grid-cols-3">
        {/* Search Bar */}
        <div className="flex w-full flex-1 flex-col items-stretch gap-2 xl:col-start-2">
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

        <div className="flex w-full flex-1 items-end gap-4">
          {/* Sort */}
          <div className="flex flex-1 flex-col items-stretch gap-2 lg:max-w-60 ml-auto">
            <Label
              htmlFor="sort-select"
              className="sr-only text-sm font-medium whitespace-nowrap"
            >
              Sortiraj:
            </Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger
                id="sort-select"
                className="bg-background! h-fit! w-full flex-1 cursor-pointer rounded-full p-1 pr-2 font-medium!"
              >
                <SelectValue className="h-fit">
                  <div className="bg-primary text-primary-foreground! flex size-6 md:size-8 lg:size-10 items-center justify-center rounded-full">
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
          <ShopFilterDialog categories={categories} />
        </div>
      </div>
    </Container>
  );
}
