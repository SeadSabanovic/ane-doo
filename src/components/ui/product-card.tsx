import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "./badge";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: string;
  link: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col">
      <Link
        href={product.link ? product.link : "#"}
        className="group rounded-md bg-muted/20 relative aspect-3/4 cursor-pointer flex flex-col items-center justify-center overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover size-full group-hover:scale-105 transition-all duration-300"
        />
      </Link>

      <div className="group/heart absolute backdrop-blur-sm top-2 right-2 z-20 p-3 bg-muted/20 rounded-full cursor-pointer hover:bg-destructive/20">
        <Heart
          className="text-white group-hover/heart:text-destructive"
          size={16}
        />
      </div>

      {product.badge && (
        <Badge
          variant="outline"
          className="absolute top-2 left-2 z-20 bg-background"
        >
          {product.badge}
        </Badge>
      )}
      <div className="flex flex-col mt-4">
        <Link href={product.link ? product.link : "#"} className="w-fit">
          <h4 className="text-xl font-medium w-fit">{product.name}</h4>
        </Link>

        <small className="text-sm pt-1 mt-auto flex items-end justify-between gap-2">
          {product.price} KM
        </small>
      </div>
    </div>
  );
}
