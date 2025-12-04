"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default function OrderSummary({
  cartItems,
  subtotal,
  shipping,
  total,
}: OrderSummaryProps) {
  return (
    <div className="border rounded-lg p-6 sticky top-4">
      <h2 className="text-2xl font-bold mb-4">Pregled narudžbe</h2>

      <div className="space-y-4 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{item.name}</h4>
              <p className="text-xs text-muted-foreground">
                {item.size} | {item.color}
              </p>
              <p className="text-sm">
                Količina: {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Međuzbir:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Dostava:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Ukupno:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <Button className="w-full" size="lg">
        Završi narudžbu
      </Button>

      <Link href="/shop" className="block text-center mt-4">
        <Button variant="ghost" className="w-full">
          Nastavi kupovinu
        </Button>
      </Link>
    </div>
  );
}
