"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputWithPlusMinus } from "@/components/ui/input-with-plus-minus";
import { Separator } from "@/components/ui/separator";
import { Info, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PricingInfo {
  label: string;
  value: string;
}

interface ProductPricingSectionProps {
  type: "maloprodaja" | "veleprodaja";
  infoText: string;
  pricingInfo: PricingInfo[];
  pricePerUnit: number;
  onAddToCart?: (quantity: number) => void;
  className?: string;
}

export function ProductPricingSection({
  type,
  infoText,
  pricingInfo,
  pricePerUnit,
  onAddToCart,
  className,
}: ProductPricingSectionProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart?.(quantity);
  };

  return (
    <div className={cn("flex flex-col p-4 border rounded-md gap-4", className)}>
      <Badge variant="outline" className="mb-4">
        {type === "maloprodaja" ? "Maloprodaja" : "Veleprodaja"}
      </Badge>

      <div className="border flex items-start gap-6 rounded-md p-2 border-secondary bg-secondary-muted/50 text-secondary-foreground">
        <Info className="shrink-0" />
        <p>{infoText}</p>
      </div>

      {pricingInfo.map((info, index) => (
        <div
          key={index}
          className="flex gap-4 items-start justify-between"
        >
          <h3 className="font-semibold">{info.label}</h3>
          <p>{info.value}</p>
        </div>
      ))}

      <div className="flex gap-4 items-start justify-between">
        <h3 className="font-semibold">Cijena po komadu</h3>
        <p className="text-primary font-semibold">{pricePerUnit.toFixed(2)} KM</p>
      </div>

      <Separator />

      <div className="flex flex-col gap-4 items-center justify-between lg:flex-row lg:items-end">
        <InputWithPlusMinus
          value={quantity}
          onChange={setQuantity}
          minValue={1}
        />
        <Button
          className="flex-1 w-full h-10 lg:min-w-[200px]"
          onClick={handleAddToCart}
        >
          <ShoppingCart />
          Dodaj u korpu
        </Button>
      </div>
    </div>
  );
}

