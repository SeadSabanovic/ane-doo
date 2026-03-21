"use client";

import AnimatedImage from "@/components/ui/animated-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputWithPlusMinus } from "@/components/ui/input-with-plus-minus";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { CartItem, useCartStore } from "@/stores";

interface CartItemProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const isWholesale = item.purchaseType === "wholesale";

  const unitPrice = isWholesale
    ? item.pricing.wholesalePrice
    : item.pricing.retailPrice;

  const totalPrice = isWholesale
    ? item.quantity *
      item.pricing.wholesaleMinQuantity *
      item.pricing.wholesalePrice
    : item.pricing.retailPrice * item.quantity;

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(
      item.productId,
      item.size,
      item.color,
      item.purchaseType,
      newQuantity,
    );
  };

  const handleRemove = () => {
    removeItem(item.productId, item.size, item.color, item.purchaseType);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-start gap-3">
        <Link href={`/shop/${item.slug}`}>
          <AnimatedImage
            src={item.image}
            alt={item.name}
            width={128}
            height={128}
            className="size-24 rounded-md object-cover md:size-32"
          />
        </Link>

        {/* Details */}
        <div className="flex flex-1 flex-col gap-3">
          <h4 className="px-2 pt-2 font-medium">{item.name}</h4>

          {/* Details - Size and Color */}
          <div className="flex flex-wrap gap-1 px-2">
            <Badge variant="outline">Veličina: {item.size}</Badge>
            <Badge variant="outline">Boja: {item.color}</Badge>
            {isWholesale && (
              <Badge
                variant="outline"
                className="bg-secondary-muted/50 text-secondary-foreground"
              >
                Veleprodaja: 1 x {item.pricing.wholesaleMinQuantity} kom
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Price and Quantity */}
      <div className={cn("flex w-full flex-col gap-3 rounded-md p-2 pb-0")}>
        <div className="flex flex-col gap-1">
          <span className="text-right font-medium">
            {formatPrice(unitPrice)}
            {isWholesale ? " / kom" : ""}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <InputWithPlusMinus
            value={item.quantity}
            minValue={1}
            onChange={handleQuantityChange}
            label={isWholesale ? "Broj pakovanja" : "Količina"}
            className="flex-1"
          />
          <Button variant="outline" size="lg" onClick={handleRemove}>
            <Trash2 />
            Ukloni
          </Button>
        </div>
        <span className="text-foreground/80 text-right text-sm">
          = {formatPrice(totalPrice)}
        </span>
      </div>
    </div>
  );
}
