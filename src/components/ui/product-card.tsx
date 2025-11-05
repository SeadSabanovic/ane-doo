import Image from "next/image";
import { Button } from "./button";
import { Heart, ShoppingCart } from "lucide-react";
import { Badge } from "./badge";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col">
      <div className="group rounded-md bg-gray-50 relative aspect-3/4 cursor-pointer flex flex-col items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover size-full group-hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="group/heart absolute top-2 right-2 z-20 p-3 bg-black/10 rounded-full cursor-pointer hover:bg-destructive/10">
        <Heart
          className="text-white group-hover/heart:text-destructive"
          size={16}
        />
      </div>

      {product.badge && (
        <Badge
          variant="outline"
          className="absolute top-2 left-2 z-20 bg-white"
        >
          {product.badge}
        </Badge>
      )}
      <div className="flex flex-col mt-4">
        <h4 className="text-xl font-medium ">{product.name}</h4>

        <small className="text-sm pt-1 mt-auto flex items-end justify-between gap-2">
          {product.price} KM
        </small>
      </div>
    </div>
  );
}
