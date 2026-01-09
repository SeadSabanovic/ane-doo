import { cn } from "@/lib/utils";

export default function SectionBadge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-2 text-lg font-medium", className)}>
      <span className="bg-accent w-6 h-1 block"></span>
      {children}
    </div>
  );
}
