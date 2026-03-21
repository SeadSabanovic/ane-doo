import AnimatedImage from "@/components/ui/animated-image";
import { formatPrice } from "@/lib/format-price";
import { ArrowRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  link: string;
}

export default function SearchProduct({ product }: { product: Product }) {
  return (
    <div className="hover:bg-muted/10 flex items-start gap-3 rounded-md pr-3 transition-colors">
      <AnimatedImage
        src={product.image}
        alt={product.name}
        className="aspect-square size-24 rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col gap-1 py-2">
        <span className="text-xl font-medium">{product.name}</span>
        <span className="text-sm">{formatPrice(product.price)}</span>
      </div>

      <div className="bg-muted/20 hover:bg-muted/30 self-center rounded-md p-2 transition-colors">
        <ArrowRight className="text-muted-foreground size-4" />
      </div>
    </div>
  );
}
