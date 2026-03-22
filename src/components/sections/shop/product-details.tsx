"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { ProductSpecifications } from "./product-specifications";
import { ProductOptions } from "./product-options";
import { ProductPricingSection } from "./product-pricing-section";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";
import { Badge } from "@/components/ui/badge";
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
  value?: string;
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
  price?: number;
  salePrice?: number;
  wholesalePrice: number;
  wholesaleMinQuantity: number;
  description: string;
  specifications: Specification[];
  sizes: string[];
  colors: string[];
  tags?: string[];
  pricingSections: PricingSection[];
  /** Ako true, maloprodaja je dostupna (proizvod na akciji s salePrice) */
  allowRetail?: boolean;
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
  tags,
  pricingSections,
  allowRetail = false,
  className,
}: ProductDetailsProps) {
  const [openItem, setOpenItem] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "");

  const addToCart = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const displayPrice = salePrice ?? price ?? wholesalePrice;

  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isWishlisted = isHydrated && isInWishlist(productId);

  const handleAddToCart = (
    quantity: number,
    purchaseType: "retail" | "wholesale",
  ) => {
    const isRetail = purchaseType === "retail";
    if (isRetail) {
      if (!selectedSize) {
        toast.error("Molimo odaberite veličinu");
        return;
      }
      if (!selectedColor && colors.length > 0) {
        toast.error("Molimo odaberite boju");
        return;
      }
    }

    const size = isRetail ? selectedSize : "";
    const color = isRetail ? selectedColor : "";
    const retailPrice = (salePrice ?? price) ?? 0;

    addToCart({
      productId,
      name,
      slug,
      image,
      size,
      color,
      quantity,
      purchaseType,
      pricing: {
        retailPrice,
        wholesalePrice,
        wholesaleMinQuantity,
      },
    });

    const desc =
      purchaseType === "wholesale"
        ? `${quantity} paket(a) × ${wholesaleMinQuantity} kom`
        : `${selectedSize}${selectedColor ? ` • ${selectedColor}` : ""}`;
    toast.success(`${name} dodano u korpu`, {
      description: `${desc} • ${purchaseType === "wholesale" ? "Veleprodaja" : "Maloprodaja"}`,
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
      price: displayPrice,
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
    // Open first accordion (veleprodaja ako samo nju ima, ili maloprodaja ako postoje obje)
    const timer = setTimeout(() => {
      setOpenItem("item-0");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("flex flex-1 flex-col gap-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h1 className="text-4xl font-bold">{name}</h1>
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            {salePrice != null ? (
              <>
                {price != null && (
                  <span className="text-muted-foreground text-2xl line-through">
                    {formatPrice(price)}
                  </span>
                )}
                <span className="text-destructive text-3xl font-semibold">
                  {formatPrice(salePrice)}
                </span>
              </>
            ) : (
              <p className="text-primary text-3xl font-semibold">
                od {formatPrice(wholesalePrice)} / kom
              </p>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="hover:bg-muted/20"
          onClick={handleToggleWishlist}
        >
          <Heart
            className={cn(
              "text-destructive",
              isWishlisted && "fill-destructive",
            )}
          />
          <span className="hidden md:block">
            {isWishlisted ? "Sačuvano" : "Sačuvaj"}
          </span>
        </Button>
      </div>

      <p className="text-base leading-relaxed">{description}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <ProductSpecifications specifications={specifications} />

      <ProductOptions
        sizes={sizes}
        colors={colors}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onSizeChange={setSelectedSize}
        onColorChange={setSelectedColor}
        mode={allowRetail ? "retail" : "wholesale"}
        wholesaleMinQuantity={wholesaleMinQuantity}
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
                  isLast && "data-[state=closed]:rounded-b-md",
                )}
              >
                <span className="flex items-center gap-4">
                  <span
                    className="from-primary to-card-foreground text-accent flex size-10 shrink-0 items-center justify-center rounded-full bg-linear-to-r"
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
                  addButtonLabel={
                    section.type === "veleprodaja"
                      ? "Dodaj paket"
                      : "Dodaj u korpu"
                  }
                  onAddToCart={(quantity) =>
                    handleAddToCart(
                      quantity,
                      section.type === "maloprodaja" ? "retail" : "wholesale",
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
