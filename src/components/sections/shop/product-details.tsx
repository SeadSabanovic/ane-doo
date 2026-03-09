"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProductSpecifications } from "./product-specifications";
import { ProductOptions } from "./product-options";
import { ProductPricingSection } from "./product-pricing-section";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";
import { Button } from "@/components/ui/button";
import { Heart, Box, Boxes } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCartStore, useWishlistStore } from "@/stores";
import { toast } from "sonner";

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
}

interface ProductDetailsProps {
  productId: string;
  slug: string;
  image: string;
  name: string;
  price: number;
  salePrice?: number;
  wholesalePrice: number;
  wholesaleMinQuantity: number;
  description: string;
  specifications: Specification[];
  sizes: string[];
  colors: string[];
  pricingSections: PricingSection[];
  className?: string;
}

export function ProductDetails({
  productId,
  slug,
  image,
  name,
  price,
  salePrice,
  wholesalePrice,
  wholesaleMinQuantity,
  description,
  specifications,
  sizes,
  colors,
  pricingSections,
  className,
}: ProductDetailsProps) {
  const [openItem, setOpenItem] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");

  const addToCart = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(productId);

  const handleAddToCart = (
    quantity: number,
    purchaseType: "retail" | "wholesale"
  ) => {
    if (!selectedSize) {
      toast.error("Molimo odaberite veličinu");
      return;
    }
    if (!selectedColor && colors.length > 0) {
      toast.error("Molimo odaberite boju");
      return;
    }

    addToCart({
      productId,
      name,
      slug,
      image,
      size: selectedSize,
      color: selectedColor,
      quantity,
      purchaseType,
      pricing: {
        retailPrice: salePrice || price,
        wholesalePrice,
        wholesaleMinQuantity,
      },
    });

    toast.success(`${name} dodano u korpu`, {
      description: `${selectedSize}${selectedColor ? ` • ${selectedColor}` : ""} • ${purchaseType === "wholesale" ? "Veleprodaja" : "Maloprodaja"}`,
      icon: (
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="size-10 rounded-md object-cover"
        />
      ),
    });
  };

  const handleToggleWishlist = () => {
    toggleItem({
      productId,
      name,
      slug,
      image,
      price,
      salePrice,
    });

    if (isWishlisted) {
      toast.success("Uklonjeno iz liste želja", {
        icon: (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="size-10 rounded-md object-cover"
          />
        ),
      });
    } else {
      toast.success("Dodano u listu želja", {
        icon: (
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="size-10 rounded-md object-cover"
          />
        ),
      });
    }
  };

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
          <p className="text-3xl font-semibold text-primary">{formatPrice(price)}</p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="hover:bg-muted/20"
          onClick={handleToggleWishlist}
        >
          <Heart className={cn("text-destructive", isWishlisted && "fill-destructive")} />
          <span className="hidden md:block">{isWishlisted ? "Spašeno" : "Spasi"}</span>
        </Button>
      </div>

      <p className="text-base leading-relaxed">{description}</p>

      <ProductSpecifications specifications={specifications} />

      <ProductOptions
        sizes={sizes}
        colors={colors}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onSizeChange={setSelectedSize}
        onColorChange={setSelectedColor}
      />

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
                      {formatPrice(section.pricePerUnit)} po komadu
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
                  onAddToCart={(quantity) =>
                    handleAddToCart(
                      quantity,
                      section.type === "maloprodaja" ? "retail" : "wholesale"
                    )
                  }
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
