"use client";

import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import { Badge } from "./badge";
import Link from "next/link";
import AnimatedImage from "./animated-image";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";
import { useWishlistStore } from "@/stores";
import { toast } from "sonner";

interface Product {
  id: string | number;
  name: string;
  price: number;
  image: string;
  badge?: string;
  link: string;
  saved?: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  // Izvuci slug iz linka (npr. "/shop/nike-majica" -> "nike-majica")
  const slug = product.link.replace("/shop/", "");
  const isSaved = isHydrated && isInWishlist(String(product.id));

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleItem({
      productId: String(product.id),
      name: product.name,
      slug: slug,
      image: product.image,
      price: product.price,
    });

    if (isSaved) {
      toast.success("Uklonjeno iz spašenih proizvoda", {
        icon: (
          <AnimatedImage
            src={product.image}
            alt={product.name}
            width={40}
            height={40}
            className="size-10 rounded-md object-cover"
          />
        ),
      });
    } else {
      toast.success("Dodano u spašene proizvode", {
        icon: (
          <AnimatedImage
            src={product.image}
            alt={product.name}
            width={40}
            height={40}
            className="size-10 rounded-md object-cover"
          />
        ),
      });
    }
  };

  return (
    <div className="group relative flex flex-col">
      <Link
        href={product.link ? product.link : "#"}
        className="group rounded-md bg-muted/20 relative aspect-3/4 cursor-pointer flex flex-col items-center justify-center overflow-hidden"
      >
        <AnimatedImage
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover size-full group-hover:scale-105 transition-all duration-300"
        />
      </Link>

      <div
        onClick={handleHeartClick}
        className={cn(
          "group/heart absolute backdrop-blur-sm top-2 right-2 z-20 p-3 bg-muted/20 rounded-full cursor-pointer hover:bg-destructive/20 transition",
          isSaved ? "bg-destructive/20 hover:bg-destructive/10" : "bg-muted/20 hover:bg-muted/20"
        )}
      >
        {isSaved ? (
          <Heart
            className="text-destructive group-hover/heart:text-destructive"
            fill="currentColor"
            size={16}
          />
        ) : (
          <Heart
            className="text-white group-hover/heart:text-destructive"
            size={16}
          />
        )}
      </div>

      {product.badge && (
        <Badge
          variant="outline"
          className="absolute top-2 left-2 z-20 bg-background"
        >
          {product.badge}
        </Badge>
      )}
      <div className="flex flex-col mt-4 flex-1">
        <Link href={product.link ? product.link : "#"} className="block w-full">
          <h4 className="text-xl font-medium line-clamp-2">{product.name}</h4>
        </Link>

        <small className="text-sm pt-1 mt-auto flex items-end justify-between gap-2">
          {formatPrice(product.price)}
        </small>
      </div>
    </div>
  );
}
