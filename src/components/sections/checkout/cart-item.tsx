import AnimatedImage from "@/components/ui/animated-image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
}
export default function CartItem({ item }: CartItemProps) {
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

  // Za wholesale: ukupna količina artikala = broj pakovanja × artikala po pakovanju
  const totalItems = isWholesale
    ? item.quantity * item.pricing.wholesale!.itemsPerPack
    : item.quantity;

  return (
    <div className="flex items-start gap-3">
      <AnimatedImage
        src={item.image}
        alt={item.name}
        width={96}
        height={96}
        className="size-24 object-cover rounded-md"
      />

      {/* Details */}
      <div className="flex-1 flex flex-col gap-3">
        <h4 className="font-medium p-2">{item.name}</h4>

        {/* Details - Size and Color */}
        <div className="flex gap-1 flex-col px-2">
          <div className="text-sm flex gap-2 justify-between text-foreground/80">
            <span>Veličina</span>
            <span>{item.size}</span>
          </div>
          <div className="text-sm flex gap-2 justify-between text-foreground/80">
            <span>Boja</span>
            <span>{item.color}</span>
          </div>
        </div>

        {/* Price */}
        <div
          className={cn(
            " flex flex-col gap-1 p-2 rounded-md",
            isWholesale && "bg-secondary-muted/50"
          )}
        >
          {isWholesale && (
            <Badge variant="outline" className="bg-background rounded-sm mb-2">
              Veleprodaja
            </Badge>
          )}
          <span className="text-foreground/80 text-sm">Cijena</span>
          {isWholesale &&
            item.pricing.retail !== item.pricing.wholesale!.price && (
              <span className="text-xs text-foreground/80 line-through text-right">
                {item.pricing.retail.toFixed(2)} KM
              </span>
            )}
          <span className="font-medium text-right">
            {unitPrice.toFixed(2)} KM{isWholesale ? " / kom" : ""}
          </span>
          <span className="text-sm text-foreground/80 text-right">
            {isWholesale
              ? `${item.quantity} × ${item.pricing.wholesale!.itemsPerPack} kom`
              : `${item.quantity} x`}
          </span>
          <span className="text-sm text-muted-foreground text-right">
            = {totalPrice.toFixed(2)} KM
          </span>
        </div>
      </div>
    </div>
  );
}
