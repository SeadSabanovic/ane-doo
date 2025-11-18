import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "./animated-shiny-text";

export default function SectionBadge({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-fit group rounded-full bg-secondary transition-all ease-in hover:bg-secondary/90"
      )}
    >
      <AnimatedShinyText className="inline-flex gap-4 uppercase font-medium items-center justify-center px-4 py-1 transition text-secondary-foreground ease-out hover:duration-300">
        {icon && icon}
        {children}
      </AnimatedShinyText>
    </div>
  );
}
