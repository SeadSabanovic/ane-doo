import { cn } from "@/lib/utils";

export default function SectionBadge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("flex items-center gap-2 text-lg font-medium", className)}
    >
      <span className="bg-accent block h-1 w-6"></span>
      {children}
    </div>
  );
}
