import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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

      {specifications.map((spec, index) => {
        const displayValue = spec.value?.trim();
        const hasText = Boolean(displayValue);

        return (
          <div
            key={index}
            className="flex items-start justify-between gap-4"
          >
            <h3 className="font-semibold">{spec.label}</h3>
            {hasText ? (
              <p className="text-right">{displayValue}</p>
            ) : (
              <span
                className="text-primary inline-flex shrink-0"
                aria-label={`${spec.label}: da`}
                title="Da"
              >
                <Check className="size-4" strokeWidth={2.5} aria-hidden />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
