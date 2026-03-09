"use client";

import { useCartStore } from "@/stores";
import OrderSummary from "./order-summary";
import CheckoutForm from "./checkout-form";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useSyncExternalStore } from "react";
import EmptyState from "@/components/ui/empty-state";

export default function CheckoutContent() {
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const total = getTotalPrice();

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Vaša korpa je prazna"
        description="Dodajte proizvode u korpu da biste nastavili s narudžbom."
        actionLabel="Istraži Shop"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8">
      <OrderSummary cartItems={items} total={total} />
      <CheckoutForm />
    </div>
  );
}
