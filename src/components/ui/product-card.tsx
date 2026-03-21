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
    () => false,
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
        className="group bg-muted/20 relative flex aspect-3/4 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md"
      >
        <AnimatedImage
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="size-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </Link>

      <div
        onClick={handleHeartClick}
        className={cn(
          "group/heart bg-muted/20 hover:bg-destructive/20 absolute top-2 right-2 z-20 cursor-pointer rounded-full p-3 backdrop-blur-sm transition",
          isSaved
            ? "bg-destructive/20 hover:bg-destructive/10"
            : "bg-muted/20 hover:bg-muted/20",
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
            className="group-hover/heart:text-destructive text-white"
            size={16}
          />
        )}
      </div>

      {product.badge && (
        <Badge
          variant="outline"
          className="bg-background absolute top-2 left-2 z-20"
        >
          {product.badge}
        </Badge>
      )}
      <div className="mt-4 flex flex-1 flex-col">
        <Link href={product.link ? product.link : "#"} className="block w-full">
          <h4 className="line-clamp-2 text-xl font-medium">{product.name}</h4>
        </Link>

        <small className="mt-auto flex items-end justify-between gap-2 pt-1 text-sm">
          {formatPrice(product.price)}
        </small>
      </div>
    </div>
  );
}
