import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Specification {
  label: string;
  value?: string;
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
    <div className={cn("flex flex-col gap-4 rounded-md border p-4", className)}>
      <Badge variant="outline" className="mb-4">
        Detalji
      </Badge>

      {specifications.map((spec, index) => (
        <div
          key={index}
          className={
            spec.value
              ? "flex items-start justify-between gap-4"
              : "flex items-start"
          }
        >
          <h3 className="font-semibold">{spec.label}</h3>
          {spec.value ? <p>{spec.value}</p> : null}
        </div>
      ))}
    </div>
  );
}
