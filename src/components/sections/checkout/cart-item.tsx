import AnimatedImage from "@/components/ui/animated-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputWithPlusMinus } from "@/components/ui/input-with-plus-minus";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    image: string;
    quantity: number; // Za retail: broj komada, za wholesale: broj pakovanja
    size: string;
    color: string;
    pricing: {
      retail: number;
      wholesale?: {
        price: number; // Cijena po artiklu
        itemsPerPack: number; // Broj artikala po pakovanju
      };
    };
  };
  onQuantityChange?: (itemId: number, newQuantity: number) => void;
}
export default function CartItem({ item, onQuantityChange }: CartItemProps) {
  // Ako postoji wholesale u pricing objektu, to znači da je wholesale tip
  const isWholesale = !!item.pricing.wholesale;

  // Za wholesale: quantity = broj pakovanja, cijena je po artiklu
  // Ukupna cijena = broj pakovanja × artikala po pakovanju × cijena po artiklu
  // Za retail: quantity = broj komada, cijena je po komadu
  const unitPrice = isWholesale
    ? item.pricing.wholesale!.price
    : item.pricing.retail;

  const totalPrice = isWholesale
    ? item.quantity *
      item.pricing.wholesale!.itemsPerPack *
      item.pricing.wholesale!.price
    : item.pricing.retail * item.quantity;

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-start gap-3">
        <Link href={`/shop/basic-t-shirt`}>
          <AnimatedImage
            src={item.image}
            alt={item.name}
            width={128}
            height={128}
            className="size-24 object-cover rounded-md md:size-32"
          />
        </Link>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-3">
          <h4 className="font-medium pt-2 px-2">{item.name}</h4>

          {/* Details - Size and Color */}
          <div className="flex gap-1 flex-wrap px-2">
            <Badge variant="outline">Veličina: {item.size}</Badge>
            <Badge variant="outline">Boja: {item.color}</Badge>
            {isWholesale && (
              <Badge
                variant="outline"
                className="bg-secondary-muted/50 text-secondary-foreground"
              >
                Veleprodaja: 1 x {item.pricing.wholesale!.itemsPerPack} kom
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Price and Quantity */}
      <div className={cn("flex flex-col gap-3 p-2 pb-0 rounded-md w-full")}>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-right">
            {unitPrice.toFixed(2)} KM{isWholesale ? " / kom" : ""}
          </span>
        </div>
        <div className="flex items-end gap-2">
          <InputWithPlusMinus
            value={item.quantity}
            minValue={1}
            onChange={(newQuantity) => {
              onQuantityChange?.(item.id, newQuantity);
            }}
            label={isWholesale ? "Broj pakovanja" : "Količina"}
            className="flex-1"
          />
          <Button variant="outline" size="lg">
            <Pencil />
            Uredi
          </Button>
        </div>
        <span className="text-sm text-foreground/80 text-right">
          = {totalPrice.toFixed(2)} KM
        </span>
      </div>
    </div>
  );
}
