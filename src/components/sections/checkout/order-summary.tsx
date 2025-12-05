"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedImage from "@/components/ui/animated-image";
import CartItem from "./cart-item";
import { Fragment } from "react/jsx-runtime";

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number; // Za retail: broj komada, za wholesale: broj pakovanja
  size: string;
  color: string;
  pricing: {
    retail: number;
    wholesale?: {
      price: number; // Cijena po artiklu
      itemsPerPack: number; // Broj artikala po pakovanju
    };
  };
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  total: number;
}

export default function OrderSummary({ cartItems, total }: OrderSummaryProps) {
  return (
    <div className="border rounded-lg lg:col-span-3 flex-1 overflow-hidden">
      {/* Cart Items */}
      <div className="p-6 border-b space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Korpa</h2>
        {cartItems.map((item, index) => (
          <Fragment key={item.id}>
            <CartItem item={item} />
            {index !== cartItems.length - 1 && (
              <div className="h-px bg-border" />
            )}
          </Fragment>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="space-y-6 p-6">
        <div className="flex justify-between text-lg font-bold">
          <span>Ukupno:</span>
          <span>{total.toFixed(2)} KM</span>
        </div>
      </div>
    </div>
  );
}
