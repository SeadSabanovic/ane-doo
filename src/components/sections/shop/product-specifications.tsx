import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Specification {
  label: string;
  value: string;
}

interface ProductSpecificationsProps {
  specifications: Specification[];
  className?: string;
}

export function ProductSpecifications({
  specifications,
  className,
}: ProductSpecificationsProps) {
  return (
    <div className={cn("flex flex-col p-4 border rounded-md gap-4", className)}>
      <Badge variant="outline" className="mb-4">
        Detalji
      </Badge>

      {specifications.map((spec, index) => (
        <div
          key={index}
          className="flex gap-4 items-start justify-between"
        >
          <h3 className="font-semibold">{spec.label}</h3>
          <p>{spec.value}</p>
        </div>
      ))}
    </div>
  );
}

