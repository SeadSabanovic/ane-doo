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
  salePrice?: number;
  image: string;
  badge?: string;
  /** Kad je postavljeno (npr. početna „Nova kolekcija“), uvijek ovaj tekst na bedžu, ne veličine/% akcija. */
  fixedBadge?: string;
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
  // Izvuci slug iz linka (npr. "/katalog/nike-majica" -> "nike-majica")
  const slug = product.link.replace("/katalog/", "");
  const isSaved = isHydrated && isInWishlist(String(product.id));

  const hasFixedBadge = Boolean(product.fixedBadge?.trim());
  const showBadge =
    hasFixedBadge || Boolean(product.salePrice ?? product.badge);
  const badgeIsSaleStyle = !hasFixedBadge && Boolean(product.salePrice);
  const badgeLabel = hasFixedBadge
    ? product.fixedBadge!.trim()
    : product.salePrice
      ? "% Akcija"
      : product.badge;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleItem({
      productId: String(product.id),
      name: product.name,
      slug: slug,
      image: product.image,
      price: product.price,
      salePrice: product.salePrice,
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

  const href = product.link ? product.link : "#";

  return (
    <div className="group relative flex flex-col">
      <Link
        href={href}
        className="focus-visible:ring-ring flex flex-col rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        <div className="group/image bg-muted/20 relative flex aspect-3/4 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md">
          <AnimatedImage
            src={product.image}
            alt=""
            width={400}
            height={400}
            className="size-full object-cover transition-all duration-300 group-hover/image:scale-105"
          />
          {showBadge && badgeLabel && (
            <Badge
              variant="outline"
              className={
                badgeIsSaleStyle
                  ? "border-background/30 bg-background/20 text-background absolute top-2 left-2 z-10 backdrop-blur-md"
                  : "bg-background absolute top-2 left-2 z-10"
              }
            >
              {badgeLabel}
            </Badge>
          )}
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <h3 className="line-clamp-2 text-xl font-medium">{product.name}</h3>

          <small className="mt-auto flex flex-wrap items-end gap-x-2 gap-y-0 pt-1 text-sm">
            {product.salePrice ? (
              <>
                <span className="sr-only">
                  Redovna cijena: {formatPrice(product.price)}
                </span>
                <span aria-hidden="true" className="line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="sr-only">
                  Akcijska cijena: {formatPrice(product.salePrice)}
                </span>
                <span className="text-destructive font-semibold">
                  {formatPrice(product.salePrice)}
                </span>
              </>
            ) : (
              formatPrice(product.price)
            )}
          </small>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleHeartClick}
        aria-label={
          isSaved
            ? `Ukloni ${product.name} iz spašenih`
            : `Sačuvaj ${product.name} u spašene`
        }
        aria-pressed={isSaved}
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
            aria-hidden
          />
        ) : (
          <Heart
            className="group-hover/heart:text-destructive text-white"
            size={16}
            aria-hidden
          />
        )}
      </button>
    </div>
  );
}
