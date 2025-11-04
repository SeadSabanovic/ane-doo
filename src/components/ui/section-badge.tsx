import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export default function SectionBadge({
  children,
  icon,
  variant,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  variant?: "default" | "hot";
}) {
  return (
    <Badge
      className={cn(
        "text-md font-bold gap-2!",
        variant === "hot" &&
          "bg-linear-to-r from-yellow-600 to-red-600 text-white bg-size-[105%] bg-center"
      )}
      variant="secondary"
    >
      {icon && (
        <span className="flex items-center justify-center size-5">{icon}</span>
      )}
      {children}
    </Badge>
  );
}
