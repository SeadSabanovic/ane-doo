import AnimatedImage from "@/components/ui/animated-image";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format-price";
import { ArrowRight } from "lucide-react";

export interface SearchProductItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  link: string;
}

export default function SearchProduct({
  product,
}: {
  product: SearchProductItem;
}) {
  const salePrice = product.salePrice;
  const onSale = salePrice != null && salePrice > 0;

  return (
    <div className="group hover:bg-muted/10 flex items-start gap-3 rounded-md pr-3 transition-colors">
      <div className="relative shrink-0">
        <AnimatedImage
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="aspect-square size-24 rounded-md object-cover"
        />
        {onSale ? (
          <Badge
            variant="outline"
            className="border-background/30 bg-background/20 text-background absolute top-1 left-1 z-10 text-[10px] backdrop-blur-md"
          >
            % Akcija
          </Badge>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 py-2">
        <span className="line-clamp-2 text-xl font-medium wrap-break-word">
          {product.name}
        </span>
        <div className="text-sm">
          {onSale ? (
            <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
              <span className="sr-only">
                Redovna cijena: {formatPrice(product.price)}
              </span>
              <span
                aria-hidden="true"
                className="text-muted-foreground line-through"
              >
                {formatPrice(product.price)}
              </span>
              <span className="sr-only">
                Akcijska cijena: {formatPrice(salePrice)}
              </span>
              <span className="text-destructive font-semibold">
                {formatPrice(salePrice)}
              </span>
            </span>
          ) : (
            formatPrice(product.price)
          )}
        </div>
      </div>

      <div className="bg-muted/20 group-hover:bg-muted/30 self-center rounded-md p-2 transition-all duration-200 group-hover:translate-x-1">
        <ArrowRight className="text-muted-foreground size-4" />
      </div>
    </div>
  );
}
