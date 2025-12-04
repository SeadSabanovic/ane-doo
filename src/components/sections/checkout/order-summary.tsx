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
    <div className="border rounded-lg lg:sticky lg:top-4 flex-1 max-w-2xl overflow-hidden">
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
