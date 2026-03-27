"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ProductSpecifications } from "./product-specifications";
import {
  ProductPackageInfo,
  RetailVariantPickers,
} from "./product-options";
import { ProductPricingSection } from "./product-pricing-section";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useCartStore, useWishlistStore } from "@/stores";
import { toast } from "sonner";
import type { ProductColorOption } from "@/constants/colors";

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
  /** Samo veleprodaja: precrtana veleprodajna kad postoji akcija */
  compareAtPrice?: number;
}

interface ProductDetailsProps {
  productId: string;
  slug: string;
  image: string;
  name: string;
  salePrice?: number;
  /** Maloprodajna cijena po komadu (samo ova vrijednost za maloprodaju, bez akcije) */
  retailPrice?: number;
  wholesalePrice: number;
  wholesaleMinQuantity: number;
  description: string;
  specifications: Specification[];
  sizes: string[];
  colorOptions: ProductColorOption[];
  tags?: string[];
  pricingSections: PricingSection[];
  /** Ako true, maloprodaja je dostupna (popunjena maloprodajna cijena u CMS-u) */
  allowRetail?: boolean;
  /** Opis sadržaja paketa (slobodan tekst iz CMS-a) */
  packageContentsText?: string | null;
  className?: string;
}

export function ProductDetails({
  productId,
  slug,
  image,
  name,
  salePrice,
  retailPrice,
  wholesalePrice,
  wholesaleMinQuantity,
  description,
  specifications,
  sizes,
  colorOptions,
  tags,
  pricingSections,
  allowRetail = false,
  packageContentsText,
  className,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const addToCart = useCartStore((state) => state.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  /** Za listu želja – efektivna javna cijena (akcija ili veleprodajna) */
  const displayPrice = salePrice ?? wholesalePrice;

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
      if (sizes.length > 0 && !selectedSize) {
        toast.error("Molimo odaberite veličinu");
        return;
      }
      if (colorOptions.length > 0 && !selectedColor) {
        toast.error("Molimo odaberite boju");
        return;
      }
    }

    const size = isRetail ? selectedSize : "";
    const color = isRetail ? selectedColor : "";
    const cartRetailUnitPrice = retailPrice ?? 0;
    const effectiveWholesaleUnit = salePrice ?? wholesalePrice;

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
        retailPrice: cartRetailUnitPrice,
        wholesalePrice: effectiveWholesaleUnit,
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
                <p className="text-muted-foreground/80 text-2xl line-through">
                  {formatPrice(wholesalePrice)}
                </p>
                <p className="text-primary text-3xl font-semibold">
                  <span className="text-destructive">{formatPrice(salePrice)}</span>{" "}
                  / kom
                </p>
              </>
            ) : (
              <p className="text-primary text-3xl font-semibold">
                {formatPrice(wholesalePrice)} / kom
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

      {specifications.length > 0 && (
        <ProductSpecifications specifications={specifications} />
      )}

      <div className="flex flex-col gap-6">
        {pricingSections.map((section, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-md border p-4"
          >
            <div className="flex flex-col gap-2">
              <Badge variant="outline" className="w-fit">
                {section.type === "maloprodaja"
                  ? "Maloprodaja"
                  : "Veleprodaja"}
              </Badge>
              <p className="text-muted-foreground text-lg font-semibold">
                {section.type === "veleprodaja" &&
                section.compareAtPrice != null ? (
                  <>
                    <span className="text-muted-foreground/80 line-through">
                      {formatPrice(section.compareAtPrice)}{" "}
                    </span>
                    <span className="text-destructive">
                      {formatPrice(section.pricePerUnit)}
                    </span>
                  </>
                ) : (
                  formatPrice(section.pricePerUnit)
                )}{" "}
                po komadu
              </p>
            </div>

            {section.type === "veleprodaja" && (
              <ProductPackageInfo
                embedded
                sizes={sizes}
                colorOptions={colorOptions}
                wholesaleMinQuantity={wholesaleMinQuantity}
                packageContentsText={packageContentsText}
              />
            )}

            <ProductPricingSection
              infoText={section.infoText}
              pricingInfo={section.pricingInfo}
              pricePerUnit={section.pricePerUnit}
              compareAtPrice={
                section.type === "veleprodaja"
                  ? section.compareAtPrice
                  : undefined
              }
              wholesaleMinQuantity={
                section.type === "veleprodaja"
                  ? wholesaleMinQuantity
                  : undefined
              }
              variantSlot={
                section.type === "maloprodaja" && allowRetail ? (
                  <RetailVariantPickers
                    sizes={sizes}
                    colorOptions={colorOptions}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                    onSizeChange={setSelectedSize}
                    onColorChange={setSelectedColor}
                  />
                ) : undefined
              }
              className="p-0"
              addButtonLabel="Dodaj u korpu"
              onAddToCart={(quantity) =>
                handleAddToCart(
                  quantity,
                  section.type === "maloprodaja" ? "retail" : "wholesale",
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
