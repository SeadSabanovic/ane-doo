"use client";

import { Button } from "@/components/ui/button";
import { COLORS } from "@/constants/colors";
import { cn } from "@/lib/utils";
import {
  formatPackageContentsDisplay,
  type PackageContentLine,
} from "@/lib/package-contents";
import { useState } from "react";

/** Uvijek vidljivo: veleprodajni sadržaj paketa (bez odabira varijante). */
export interface ProductPackageInfoProps {
  sizes: string[];
  colors: string[];
  wholesaleMinQuantity?: number;
  packageContents?: PackageContentLine[] | null;
  /** true = unutar kartice Veleprodaja (bez duplog obruba) */
  embedded?: boolean;
  className?: string;
}

export function ProductPackageInfo({
  sizes,
  colors,
  wholesaleMinQuantity,
  packageContents,
  embedded = false,
  className,
}: ProductPackageInfoProps) {
  const packageSummary = formatPackageContentsDisplay(
    packageContents ?? undefined,
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        embedded ? "border-border/60 border-b pb-4" : "rounded-md border p-4",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Sadržaj paketa</h3>
        <p className="text-sm">
          1 paket = {wholesaleMinQuantity ?? "?"} komada
          {packageSummary && (
            <span className="text-muted-foreground"> ({packageSummary})</span>
          )}
        </p>
      </div>

      {sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Veličine</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <span
                key={size}
                className="border-input inline-flex cursor-default items-center justify-center rounded-md border bg-transparent px-3 py-1.5 text-sm font-medium"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Boje</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((colorName) => {
              const color = COLORS.find(
                (c) =>
                  c.name === colorName || c.key === colorName.toLowerCase(),
              );
              return (
                <span
                  key={colorName}
                  className="border-input flex size-10 cursor-default items-stretch rounded-md border p-1.5"
                  aria-label={colorName}
                >
                  <span
                    className="min-h-0 min-w-0 flex-1 rounded-sm border border-black/10"
                    style={{
                      backgroundColor: color?.value || "#E5E7EB",
                    }}
                  />
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/** Odabir veličine i boje za maloprodaju (ugrađuje se u karticu Maloprodaja). */
export interface RetailVariantPickersProps {
  sizes: string[];
  colors: string[];
  selectedSize?: string;
  selectedColor?: string;
  onSizeChange?: (size: string) => void;
  onColorChange?: (color: string) => void;
  className?: string;
}

export function RetailVariantPickers({
  sizes,
  colors,
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
  className,
}: RetailVariantPickersProps) {
  const [internalSize, setInternalSize] = useState(selectedSize ?? "");
  const [internalColor, setInternalColor] = useState(selectedColor ?? "");

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
    <div className={cn("flex flex-col gap-4", className)}>
      {sizes.length > 0 && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h3 className="shrink-0 font-semibold">
            Veličina<sup className="text-destructive">*</sup>
          </h3>
          <div className="flex flex-wrap justify-end gap-2 sm:max-w-[70%]">
            {sizes.map((size) => (
              <Button
                key={size}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSizeClick(size)}
                className={cn(
                  currentSize === size &&
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                )}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h3 className="shrink-0 font-semibold">
            Boja<sup className="text-destructive">*</sup>
          </h3>
          <div className="flex flex-wrap justify-end gap-2 sm:max-w-[70%]">
            {colors.map((colorName) => {
              const color = COLORS.find((c) => c.name === colorName);
              const isSelected = currentColor === colorName;
              return (
                <button
                  key={colorName}
                  type="button"
                  onClick={() => handleColorClick(colorName)}
                  aria-label={`Odaberi boju ${colorName}`}
                  aria-pressed={isSelected}
                  className={cn(
                    /* Isti oblik kao boje u „Sadržaj paketa“ (veleprodaja) */
                    "border-input flex size-10 shrink-0 items-stretch rounded-md border p-1.5 transition-[box-shadow,border-color]",
                    !isSelected && "hover:border-primary/50",
                    "focus-visible:ring-primary focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                    isSelected && "border-primary",
                  )}
                >
                  <span
                    className="min-h-0 min-w-0 flex-1 rounded-sm border border-black/10"
                    style={{
                      backgroundColor: color?.value || "#FFFFFF",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
