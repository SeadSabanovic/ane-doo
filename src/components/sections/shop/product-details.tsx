"use client";

import { useState, useEffect } from "react";
import { ProductSpecifications } from "./product-specifications";
import { ProductOptions } from "./product-options";
import { ProductPricingSection } from "./product-pricing-section";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Box, Boxes } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Specification {
  label: string;
  value: string;
}

interface PricingInfo {
  label: string;
  value: string;
}

interface PricingSection {
  type: "maloprodaja" | "veleprodaja";
  infoText: string;
  pricingInfo: PricingInfo[];
  pricePerUnit: number;
  onAddToCart?: (quantity: number) => void;
}

interface ProductDetailsProps {
  name: string;
  price: number;
  description: string;
  specifications: Specification[];
  sizes: string[];
  colors: string[];
  pricingSections: PricingSection[];
  className?: string;
}

export function ProductDetails({
  name,
  price,
  description,
  specifications,
  sizes,
  colors,
  pricingSections,
  className,
}: ProductDetailsProps) {
  const [openItem, setOpenItem] = useState<string>("");

  useEffect(() => {
    // Open second accordion item after 500ms
    const timer = setTimeout(() => {
      setOpenItem("item-1");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("flex flex-col gap-6 flex-1", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">{name}</h1>
          <p className="text-3xl font-semibold text-primary">{price} KM</p>
        </div>
        <Button variant="outline" size="lg" className="hover:bg-muted/20">
          <Heart className="text-destructive" />
          <span className="hidden md:block">Spasi</span>
        </Button>
      </div>

      <p className="text-base leading-relaxed">{description}</p>

      <ProductSpecifications specifications={specifications} />

      <ProductOptions sizes={sizes} colors={colors} />

      <Accordion
        type="single"
        className="w-full rounded-md border"
        value={openItem}
        onValueChange={setOpenItem}
      >
        {pricingSections.map((section, index) => {
          const isFirst = index === 0;
          const isLast = index === pricingSections.length - 1;

          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger
                className={cn(
                  "px-5",
                  isFirst && "rounded-t-md",
                  isLast && "data-[state=closed]:rounded-b-md"
                )}
              >
                <span className="flex items-center gap-4">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-primary to-card-foreground text-accent"
                    aria-hidden="true"
                  >
                    {section.type === "maloprodaja" ? (
                      <Box className="size-4" />
                    ) : (
                      <Boxes className="size-4" />
                    )}
                  </span>
                  <span className="flex flex-col space-y-0.5 text-lg">
                    <h3 className="font-semibold">
                      {section.type === "maloprodaja"
                        ? "Maloprodaja"
                        : "Veleprodaja"}
                    </h3>
                    <span className="text-muted-foreground font-semibold">
                      {section.pricePerUnit.toFixed(2)} KM po komadu
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent
                className={cn("px-5", isLast && "rounded-b-md")}
              >
                <ProductPricingSection
                  infoText={section.infoText}
                  pricingInfo={section.pricingInfo}
                  pricePerUnit={section.pricePerUnit}
                  onAddToCart={section.onAddToCart}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
