"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown01, Search, X } from "lucide-react";
import debounce from "lodash/debounce";
import {
  startTransition,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ShopFilterDialog from "./shop-filter-dialog";
import Container from "@/components/layout/container";
import { Label } from "@/components/ui/label";
import {
  parseShopSortParam,
  SHOP_SEARCH_MIN_LENGTH,
  type Category,
  type ShopSort,
} from "@/sanity/lib/api";

const SEARCH_DEBOUNCE_MS = 400;

export default function ShopToolbar({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsRef = useRef(searchParams);

  const [searchQuery, setSearchQuery] = useState("");
  const skipNextUrlSyncRef = useRef(false);

  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const sortBy = parseShopSortParam(searchParams.get("sort"));

  const searchParamsSnapshot = searchParams.toString();
  useEffect(() => {
    if (skipNextUrlSyncRef.current) {
      skipNextUrlSyncRef.current = false;
      return;
    }
    const q = new URLSearchParams(searchParamsSnapshot).get("q") ?? "";
    startTransition(() => {
      setSearchQuery(q);
    });
  }, [searchParamsSnapshot]);

  const debouncedApplySearchToUrlRef = useRef<ReturnType<
    typeof debounce
  > | null>(null);

  useLayoutEffect(() => {
    const d = debounce((raw: string) => {
      skipNextUrlSyncRef.current = true;
      const trimmed = raw.trim();
      const params = new URLSearchParams(searchParamsRef.current.toString());
      params.delete("stranica");
      if (trimmed.length >= SHOP_SEARCH_MIN_LENGTH) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, SEARCH_DEBOUNCE_MS);
    debouncedApplySearchToUrlRef.current = d;
    return () => {
      d.cancel();
      debouncedApplySearchToUrlRef.current = null;
    };
  }, [pathname, router]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setSearchQuery(next);
    debouncedApplySearchToUrlRef.current?.(next);
  };

  const handleClearSearch = () => {
    debouncedApplySearchToUrlRef.current?.cancel();
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("stranica");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const showClear = searchQuery.length > 0;

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
              onChange={handleSearchChange}
              autoComplete="off"
              className="text-lg!"
            />
            {showClear ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground hover:text-foreground rounded-full"
                  onClick={handleClearSearch}
                  aria-label="Očisti pretragu"
                >
                  <X />
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
            <InputGroupAddon className="py-1 pl-1">
              <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full">
                <Search />
              </div>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex w-full flex-1 items-end gap-4">
          {/* Sort */}
          <div className="ml-auto flex flex-1 flex-col items-stretch gap-2 lg:max-w-60">
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
                  <div className="bg-primary text-primary-foreground! flex size-6 items-center justify-center rounded-full md:size-8 lg:size-10">
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
