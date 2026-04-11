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
        description="Sačuvajte artikle koji vas zanimaju kako biste lakše planirali svoju sljedeću narudžbu."
        actionLabel="Istraži katalog"
        actionHref="/katalog"
      />
    );
  }

  return (
    <>
      <h2 id="wishlist-products-heading" className="sr-only">
        Lista spašenih artikala
      </h2>
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        aria-labelledby="wishlist-products-heading"
      >
        {items.map((item) => (
          <ProductCard
            key={item.productId}
            product={{
              id: item.productId,
              name: item.name,
              price: item.price,
              salePrice: item.salePrice,
              image: item.image,
              link: `/katalog/${item.slug}`,
              saved: true,
            }}
          />
        ))}
      </div>
    </>
  );
}
