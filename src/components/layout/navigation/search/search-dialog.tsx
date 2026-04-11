"use client";

import {
  startTransition,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import Link from "next/link";
import { Loader2, Search, X } from "lucide-react";
import { useLenis } from "lenis/react";

import { useIsClient } from "@/hooks/use-is-client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import SearchProduct, { type SearchProductItem } from "./search-product";
import SearchResultsSkeleton from "./search-results-skeleton";
import { parseShopSearchQuery, SHOP_SEARCH_MIN_LENGTH } from "@/sanity/lib/api";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SEARCH_DEBOUNCE_MS = 400;

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const isClient = useIsClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [products, setProducts] = useState<SearchProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const lenis = useLenis();
  const abortRef = useRef<AbortController | null>(null);

  // Debounce za API (prazno odmah → istaknuto)
  useEffect(() => {
    if (!open) return;
    if (searchQuery.trim() === "") {
      startTransition(() => {
        setDebouncedQuery("");
      });
      return;
    }
    const id = window.setTimeout(
      () => setDebouncedQuery(searchQuery),
      SEARCH_DEBOUNCE_MS,
    );
    return () => window.clearTimeout(id);
  }, [searchQuery, open]);

  useEffect(() => {
    if (!lenis) return;

    if (open) {
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

  /** Samo ≥ 3 znaka (trim) šalju se na API kao pretraga; kraće = isto kao prazno (istaknuto). */
  const stableSearchQuery = useMemo(() => {
    const t = debouncedQuery.trim();
    if (t.length < SHOP_SEARCH_MIN_LENGTH) return "";
    return t;
  }, [debouncedQuery]);

  useLayoutEffect(() => {
    if (!open) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    startTransition(() => {
      setIsLoading(true);
      setProducts([]);
    });

    const params = new URLSearchParams();
    if (stableSearchQuery) params.set("q", stableSearchQuery);

    fetch(`/api/products/search?${params.toString()}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json() as Promise<{ products: SearchProductItem[] }>;
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        setProducts(data.products ?? []);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setProducts([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [open, stableSearchQuery]);

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setSearchQuery("");
      setDebouncedQuery("");
      setProducts([]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  const parsedSearch = parseShopSearchQuery(stableSearchQuery || undefined);
  const showClear = searchQuery.length > 0;
  const showSearchAddon = showClear || isLoading;

  const listTitle =
    parsedSearch === null
      ? "Istaknuto"
      : products.length > 0
        ? "Rezultati pretrage"
        : "Nema rezultata";

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex h-[90svh] max-h-[680px] max-w-3xl! flex-col gap-0 p-0 md:h-[70svh]">
        <DialogHeader className="flex h-fit flex-col gap-6 border-b p-6">
          <DialogTitle>Pretražite proizvode</DialogTitle>
          <DialogDescription className="sr-only">
            Pretražite proizvode; za pretragu potrebno je najmanje{" "}
            {SHOP_SEARCH_MIN_LENGTH} znaka.
          </DialogDescription>

          <InputGroup className="bg-background! h-fit rounded-full">
            <InputGroupInput
              id="header-search-input"
              name="search"
              type="text"
              placeholder="Pretraga..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              aria-busy={isLoading}
              className="text-lg!"
            />
            {showSearchAddon ? (
              <InputGroupAddon align="inline-end">
                {isLoading ? (
                  <span
                    className="text-muted-foreground flex size-8 items-center justify-center"
                    role="status"
                    aria-label="Učitavanje"
                  >
                    <Loader2
                      className="size-4 shrink-0 animate-spin"
                      aria-hidden
                    />
                  </span>
                ) : (
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
                )}
              </InputGroupAddon>
            ) : null}
            <InputGroupAddon className="py-1 pl-1">
              <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full">
                <Search />
              </div>
            </InputGroupAddon>
          </InputGroup>
        </DialogHeader>

        <div className="flex-1 overflow-hidden rounded-b-md">
          <div className="h-full overflow-auto rounded-b-md p-6">
            {isLoading ? (
              <SearchResultsSkeleton count={6} />
            ) : parsedSearch !== null && products.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">
                Nema rezultata za &quot;{stableSearchQuery}&quot;
              </div>
            ) : (
              <div className="flex flex-col gap-2 space-y-2">
                <h3 className="text-xl font-medium">{listTitle}</h3>
                {products.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    onClick={() => handleOpenChange(false)}
                  >
                    <SearchProduct product={item} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
