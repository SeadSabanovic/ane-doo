import AnimatedImage from "@/components/ui/animated-image";
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
    <div className="flex items-start gap-3 rounded-md hover:bg-muted/10 transition-colors pr-3">
      <AnimatedImage
        src={product.image}
        alt={product.name}
        className="aspect-square size-24 object-cover rounded-md"
      />
      <div className="flex flex-col gap-1 py-2 flex-1">
        <span className="font-medium text-xl">{product.name}</span>
        <span className="text-sm">{product.price} KM</span>
      </div>

      <div className="p-2 bg-muted/20 rounded-md self-center hover:bg-muted/30 transition-colors">
        <ArrowRight className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}
