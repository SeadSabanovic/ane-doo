"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Info } from "lucide-react";

interface ProductOptionsProps {
  sizes: string[];
  colors: string[];
  selectedSize?: string;
  selectedColor?: string;
  onSizeChange?: (size: string) => void;
  onColorChange?: (color: string) => void;
  /** Veleprodaja = prikaz sadržaja paketa; Maloprodaja = selectori za odabir */
  mode?: "wholesale" | "retail";
  wholesaleMinQuantity?: number;
  className?: string;
}

export function ProductOptions({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
  mode = "retail",
  wholesaleMinQuantity,
  className,
}: ProductOptionsProps) {
  const [internalSize, setInternalSize] = useState(selectedSize);
  const [internalColor, setInternalColor] = useState(selectedColor);

  const handleSizeClick = (size: string) => {
    setInternalSize(size);
    onSizeChange?.(size);
  };

  const handleColorClick = (color: string) => {
    setInternalColor(color);
    onColorChange?.(color);
  };

  const currentSize = selectedSize ?? internalSize;
  const currentColor = selectedColor ?? internalColor;

  if (mode === "wholesale") {
    const packageContent = [
      sizes.length > 0 && `veličine: ${sizes.join(", ")}`,
      colors.length > 0 && `boje: ${colors.join(", ")}`,
    ]
      .filter(Boolean)
      .join(" • ");

    return (
      <div className={cn("flex flex-col gap-4 rounded-md border p-4", className)}>
        <Badge variant="outline" className="mb-2 w-fit">
          Sadržaj paketa
        </Badge>
        <div className="border-secondary bg-secondary-muted/50 text-secondary-foreground flex items-start gap-4 rounded-md border p-3">
          <Info className="mt-0.5 shrink-0 size-4" />
          <div>
            <p className="font-medium">
              1 paket = {wholesaleMinQuantity ?? "?"} komada
            </p>
            {packageContent && (
              <p className="text-muted-foreground mt-1 text-sm">
                {packageContent}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4 rounded-md border p-4", className)}>
      <Badge variant="outline" className="mb-4">
        Opcije
      </Badge>

      {/* Veličine */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold">
          Veličina<sup className="text-destructive">*</sup>
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant="outline"
              size="sm"
              onClick={() => handleSizeClick(size)}
              className={cn(
                currentSize === size &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold">
          Boja<sup className="text-destructive">*</sup>
        </h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((colorName) => {
            const color = COLORS.find((c) => c.name === colorName);
            const isSelected = currentColor === colorName;
            return (
              <Button
                key={colorName}
                variant="outline"
                className={cn(
                  "ring-primary/20! relative size-10 rounded-full border",
                  isSelected && "ring-primary ring-2",
                )}
                onClick={() => handleColorClick(colorName)}
                aria-label={`Odaberi boju ${colorName}`}
              >
                <div
                  className="absolute top-1/2 left-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border p-2"
                  style={{
                    backgroundColor: color?.value || "#FFFFFF",
                  }}
                />
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
