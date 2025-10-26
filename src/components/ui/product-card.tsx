import Image from "next/image";
import { Button } from "./button";
import { Heart, ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative">
      <div className="group rounded-md bg-gray-50 relative aspect-square cursor-pointer flex flex-col items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain size-[80%] group-hover:scale-105 transition-all duration-300"
        />
      </div>
      <h4 className="text-2xl font-medium mt-8">{product.name}</h4>
      <p className="text-lg">{product.price} KM</p>

      <div className="mt-4 flex items-center gap-2">
        <Button variant="outline" size="icon" className="lg:hidden">
          <Heart />
        </Button>
        <Button className="flex-1 w-full">
          <ShoppingCart /> Dodaj u korpu
        </Button>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="hidden lg:flex absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <Heart />
      </Button>
    </div>
  );
}
