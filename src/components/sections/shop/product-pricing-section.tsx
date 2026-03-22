"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { InputWithPlusMinus } from "@/components/ui/input-with-plus-minus";
import { Separator } from "@/components/ui/separator";
import { Info, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";

interface PricingInfo {
  label: string;
  value: string;
}

interface ProductPricingSectionProps {
  infoText: string;
  pricingInfo: PricingInfo[];
  pricePerUnit: number;
  /** Precrtana referentna cijena (npr. veleprodajna pri akciji) */
  compareAtPrice?: number;
  /** Npr. odabir veličine/boje za maloprodaju – ispod info boksa, prije ostalih redova */
  variantSlot?: ReactNode;
  onAddToCart?: (quantity: number) => void;
  addButtonLabel?: string;
  className?: string;
}

export function ProductPricingSection({
  infoText,
  pricingInfo,
  pricePerUnit,
  compareAtPrice,
  variantSlot,
  onAddToCart,
  addButtonLabel = "Dodaj u korpu",
  className,
}: ProductPricingSectionProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart?.(quantity);
  };

  return (
    <div className={cn("flex flex-col gap-4 p-4", className)}>
      <div className="border-secondary bg-secondary-muted/50 text-secondary-foreground flex items-start gap-4 rounded-md border p-2">
        <Info className="shrink-0" />
        <p>{infoText}</p>
      </div>

      {variantSlot}

      {pricingInfo.map((info, index) => (
        <div key={index} className="flex items-start justify-between gap-4">
          <h3 className="font-semibold">{info.label}</h3>
          <p>{info.value}</p>
        </div>
      ))}

      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold">Cijena po komadu</h3>
        <p className="text-primary font-semibold">
          {compareAtPrice != null ? (
            <>
              <span className="text-muted-foreground mr-2 line-through">
                {formatPrice(compareAtPrice)}
              </span>
              <span className="text-destructive">
                {formatPrice(pricePerUnit)}
              </span>
            </>
          ) : (
            formatPrice(pricePerUnit)
          )}
        </p>
      </div>

      <Separator />

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-end sm:justify-end">
        <InputWithPlusMinus
          value={quantity}
          onChange={setQuantity}
          minValue={1}
          className="w-full"
        />
        <Button
          className="h-10 w-full max-w-[300px] shrink-0 self-end sm:w-auto sm:max-w-none sm:min-w-[200px] sm:self-auto"
          onClick={handleAddToCart}
        >
          <ShoppingCart />
          {addButtonLabel}
        </Button>
      </div>
    </div>
  );
}
