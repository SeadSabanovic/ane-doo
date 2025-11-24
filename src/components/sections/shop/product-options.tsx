"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductOptionsProps {
  sizes: string[];
  colors: string[];
  selectedSize?: string;
  selectedColor?: string;
  onSizeChange?: (size: string) => void;
  onColorChange?: (color: string) => void;
  className?: string;
}

export function ProductOptions({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
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

  return (
    <div className={cn("flex flex-col p-4 border rounded-md gap-4", className)}>
      <Badge variant="outline" className="mb-4">
        Opcije
      </Badge>

      {/* Veličine */}
      <div className="flex gap-4 items-start justify-between">
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
                  "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="flex gap-4 items-start justify-between">
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
                  "size-10 rounded-full border ring-primary/20! relative",
                  isSelected && "ring-2 ring-primary"
                )}
                onClick={() => handleColorClick(colorName)}
                aria-label={`Odaberi boju ${colorName}`}
              >
                <div
                  className="p-2 border rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[80%]"
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

