"use client";

import { useWishlistStore } from "@/stores";
import ProductCard from "@/components/ui/product-card";
import { Heart, Loader2 } from "lucide-react";
import { useSyncExternalStore } from "react";
import EmptyState from "@/components/ui/empty-state";

export default function WishlistContent() {
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const items = useWishlistStore((state) => state.items);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Nemate spašenih proizvoda"
        description="Počnite pregledavati i dodajte svoje omiljene artikle"
        actionLabel="Istraži Shop"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <ProductCard
          key={item.productId}
          product={{
            id: item.productId,
            name: item.name,
            price: item.salePrice || item.price,
            image: item.image,
            link: `/shop/${item.slug}`,
            saved: true,
          }}
        />
      ))}
    </div>
  );
}
