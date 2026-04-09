"use client";

import { useCartStore } from "@/stores";
import OrderSummary from "./order-summary";
import CheckoutForm from "./checkout-form";
import { ShoppingBag, Loader2, CircleCheck } from "lucide-react";
import { useSyncExternalStore, useState, useEffect, useRef } from "react";
import EmptyState from "@/components/ui/empty-state";

export default function CheckoutContent() {
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const prevItemsLenRef = useRef(items.length);

  const total = getTotalPrice();

  useEffect(() => {
    prevItemsLenRef.current = useCartStore.getState().items.length;
    const unsubscribe = useCartStore.subscribe((state) => {
      const len = state.items.length;
      if (len > prevItemsLenRef.current && len > 0) {
        setOrderPlaced(false);
      }
      prevItemsLenRef.current = len;
    });
    return unsubscribe;
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <EmptyState
        icon={CircleCheck}
        title="Narudžba je uspješno poslana"
        description="Uskoro ćemo vas kontaktirati s potvrdom narudžbe."
        actionLabel="Istraži Katalog"
        actionHref="/katalog"
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Vaša korpa je prazna"
        description="Vaša korpa čeka na vrhunske komade tekstila. Pronađite idealne proizvode za svoj dom ili biznis."
        actionLabel="Istraži Katalog"
        actionHref="/katalog"
      />
    );
  }

  return (
    <div className="flex flex-col gap-8 xl:grid xl:grid-cols-5">
      <OrderSummary cartItems={items} total={total} />
      <CheckoutForm onOrderSuccess={() => setOrderPlaced(true)} />
    </div>
  );
}
