import AnimatedImage from "@/components/ui/animated-image";
import { Badge } from "@/components/ui/badge";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
    color: string;
    wholesale?: {
      price: number;
      quantity: number;
    };
  };
}
export default function CartItem({ item }: CartItemProps) {
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
      <div className="flex-1 p-2 flex flex-col gap-2">
        <h4 className="font-medium">{item.name}</h4>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{item.size}</Badge>
          <span className="text-sm">{item.quantity} x</span>
        </div>
      </div>

      {/* Price */}
      <div className="p-2">
        <span>{item.price} KM</span>
      </div>
    </div>
  );
}
