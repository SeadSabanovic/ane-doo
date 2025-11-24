import { ProductSpecifications } from "./product-specifications";
import { ProductOptions } from "./product-options";
import { ProductPricingSection } from "./product-pricing-section";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

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

      {pricingSections.map((section, index) => (
        <ProductPricingSection
          key={index}
          type={section.type}
          infoText={section.infoText}
          pricingInfo={section.pricingInfo}
          pricePerUnit={section.pricePerUnit}
          onAddToCart={section.onAddToCart}
        />
      ))}
    </div>
  );
}
