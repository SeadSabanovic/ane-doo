import Image from "next/image";
import { Button } from "./button";
import { Heart, ShoppingCart } from "lucide-react";
import { Badge } from "./badge";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  badges?: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col">
      <div className="group rounded-md bg-gray-50 relative aspect-square cursor-pointer flex flex-col items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-contain size-[80%] group-hover:scale-105 transition-all duration-300"
        />
      </div>
      <div>
        <h4 className="text-2xl font-medium mt-8">{product.name}</h4>
        {product.badges && (
          <div className="flex items-center gap-2 mt-2">
            {product.badges?.map((badge) => (
              <Badge key={badge} variant="outline">
                {badge}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="pt-4 mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col mt-4">
            <span className="text-sm font-medium uppercase">Cijena</span>
            <span className="text-xl font-semibold">{product.price} KM</span>
          </div>

          <Button>Dodaj u korpu</Button>
        </div>
      </div>
    </div>
  );
}
