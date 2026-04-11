"use client";

import CartItemComponent from "./cart-item";
import { Fragment } from "react/jsx-runtime";
import { CartItem } from "@/stores";
import { formatPrice } from "@/lib/format-price";

interface OrderSummaryProps {
  cartItems: CartItem[];
  total: number;
}

export default function OrderSummary({ cartItems, total }: OrderSummaryProps) {
  return (
    <div className="h-fit flex-1 overflow-hidden rounded-lg border xl:col-span-3">
      {/* Cart Items */}
      <div className="space-y-4 border-b p-6">
        <h2 className="mb-6 text-2xl font-semibold">Pregled narudžbe</h2>
        {cartItems.map((item, index) => (
          <Fragment
            key={`${item.productId}-${item.size}-${item.color}-${item.purchaseType}`}
          >
            <CartItemComponent item={item} />
            {index !== cartItems.length - 1 && (
              <div className="bg-border h-px" />
            )}
          </Fragment>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-muted/10 space-y-6 p-6">
        <div className="flex justify-between text-lg font-bold">
          <span>Ukupno:</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
