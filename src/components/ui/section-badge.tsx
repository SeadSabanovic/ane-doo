import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "./animated-shiny-text";

export default function SectionBadge({
  className,
  children,
  icon,
}: {
  className?: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-fit group border border-secondary rounded-full bg-secondary-muted transition-all ease-in hover:bg-secondary/90",
        className
      )}
    >
      <AnimatedShinyText className="inline-flex gap-4 uppercase font-medium items-center justify-center px-4 py-1 transition  ease-out hover:duration-300">
        {icon && icon}
        {children}
      </AnimatedShinyText>
    </div>
  );
}
