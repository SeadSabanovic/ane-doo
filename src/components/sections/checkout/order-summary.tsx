"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedImage from "@/components/ui/animated-image";
import CartItem from "./cart-item";

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
    <div className="border rounded-lg sticky top-4 flex-1 max-w-3xl overflow-hidden">
      {/* Cart Header */}
      <div className="p-6 relative aspect-5/2 flex flex-col justify-end">
        <h2 className="text-2xl font-bold mt-auto text-background text-shadow-sm">
          Pregled narudžbe
        </h2>
        <p className="text-shadow-sm mt-4 max-w-md text-background/80">
          Pregledajte svoju narudžbu i potvrdite je. Završite proces kupovine u
          par koraka.
        </p>
        <AnimatedImage
          src="https://images.pexels.com/photos/4273467/pexels-photo-4273467.jpeg?_gl=1*1p7bln1*_ga*MjA0MTQwODUxLjE3NjMzMjUxNzE.*_ga_8JE65Q40S6*czE3NjQ4NDY2OTckbzQkZzEkdDE3NjQ4NDgyMTckajI2JGwwJGgw"
          alt="Narudžba"
          width={768}
          height={432}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
      </div>
      {/* Cart Items */}
      <div className="p-6 border-b space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="space-y-6 p-6">
        <div className="flex justify-between text-lg font-bold">
          <span>Ukupno:</span>
          <span>{total.toFixed(2)} KM</span>
        </div>

        <div>
          <Button className="w-full" size="lg">
            Završi narudžbu
          </Button>

          <Link href="/shop" className="block text-center mt-4">
            <Button variant="outline" className="w-full" size="lg">
              Nastavi kupovinu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
