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
import { RetailCartItemEditDialog } from "./retail-cart-item-edit-dialog";

interface CartItemProps {
  item: CartItem;
}

export default function CartItemComponent({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const isWholesale = item.purchaseType === "wholesale";
  const isRetail = item.purchaseType === "retail";

  const unitPrice = isWholesale
    ? item.pricing.wholesalePrice
    : item.pricing.retailPrice;
  const totalUnits = isWholesale
    ? item.quantity * item.pricing.wholesaleMinQuantity
    : item.quantity;

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

  // Retail edit dialog is extracted into its own component.

  const priceBlockLabelClass = "text-muted-foreground text-sm";
  const priceBlockValueClass = "font-semibold";

  const snap = item.wholesalePackageSnapshot;
  const packageNote = snap?.packageContentsText?.trim() ?? "";
  const packageSizes = snap?.sizes ?? [];
  const packageColors = snap?.colorOptions ?? [];

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Gornji red: samo slika + naslov + badgevi */}
      <div className="flex items-start gap-3">
        <Link href={`/shop/${item.slug}`} className="shrink-0">
          <AnimatedImage
            src={item.image}
            alt={item.name}
            width={128}
            height={128}
            className="size-24 rounded-md object-cover md:size-32"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-medium">
            <Link
              href={`/shop/${item.slug}`}
              className="hover:text-foreground/90 hover:underline"
            >
              {item.name}
            </Link>
          </h4>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="outline">
              {isWholesale ? "Veleprodaja" : "Maloprodaja"}
            </Badge>
            {isRetail ? (
              <>
                {item.size && (
                  <Badge variant="outline">Veličina: {item.size}</Badge>
                )}
                {item.color && (
                  <Badge variant="outline">Boja: {item.color}</Badge>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Cijena, ukupno — isti label + vrijednost stil */}
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-col gap-2">
          {isWholesale ? (
            <>
              <div className="flex flex-col gap-0.5">
                <span className={priceBlockLabelClass}>Sadržaj paketa</span>
                <span className={priceBlockValueClass}>
                  1 paket = {item.pricing.wholesaleMinQuantity} komada
                </span>
                {packageNote ? (
                  <span
                    className={cn(
                      priceBlockValueClass,
                      "block whitespace-pre-wrap",
                    )}
                  >
                    {packageNote}
                  </span>
                ) : null}
              </div>
              {packageSizes.length > 0 ? (
                <div className="flex flex-col gap-0.5">
                  <span className={priceBlockLabelClass}>Veličine</span>
                  <span className={priceBlockValueClass}>
                    {packageSizes.join(", ")}
                  </span>
                </div>
              ) : null}
              {packageColors.length > 0 ? (
                <div className="flex flex-col gap-0.5">
                  <span className={priceBlockLabelClass}>Boje</span>
                  <span className={priceBlockValueClass}>
                    {packageColors.map((c) => c.label).join(", ")}
                  </span>
                </div>
              ) : null}
            </>
          ) : null}

          <div className="flex flex-col gap-0.5">
            <span className={priceBlockLabelClass}>
              {isWholesale ? "Cijena po komadu" : "Cijena"}
            </span>
            <span className={priceBlockValueClass}>
              {formatPrice(unitPrice)}
              {isWholesale ? " / kom" : ""}
            </span>
          </div>

          <div className="flex w-full flex-col gap-0.5 text-right">
            <span className={cn(priceBlockLabelClass, "block")}>Ukupno</span>
            <span className={cn(priceBlockValueClass, "tabular-nums")}>
              {formatPrice(totalPrice)}
            </span>
            <span className="text-muted-foreground block text-xs">
              {formatPrice(unitPrice)} × {totalUnits} kom
            </span>
          </div>
        </div>

        <div
          className={cn(
            "flex w-full gap-2",
            "flex-col items-stretch gap-3 md:flex-row md:items-end",
          )}
        >
          <InputWithPlusMinus
            value={item.quantity}
            minValue={1}
            onChange={handleQuantityChange}
            label={isWholesale ? "Broj pakovanja" : "Količina"}
            className={cn("w-full", isWholesale && "md:min-w-0 md:flex-1")}
          />
          {isRetail ? (
            <div
              className={cn(
                "flex w-full flex-col items-stretch gap-2 md:w-auto md:shrink-0 md:flex-row md:self-end",
              )}
            >
              <RetailCartItemEditDialog
                item={item}
                triggerClassName="w-full md:w-auto"
              />
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto"
                onClick={handleRemove}
              >
                <Trash2 />
                Ukloni
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="w-full shrink-0 md:w-auto"
              onClick={handleRemove}
            >
              <Trash2 />
              Ukloni
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
