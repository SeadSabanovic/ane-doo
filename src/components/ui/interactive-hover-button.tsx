import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "light";
}

export function InteractiveHoverButton({
  children,
  className,
  variant = "dark",
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      className={cn(
        "group bg-primary text-primary-foreground relative w-auto cursor-pointer overflow-hidden rounded-md px-6 py-2 text-center font-semibold",
        variant === "dark" && "bg-primary text-primary-foreground",
        variant === "light" && "bg-background text-primary border",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "bg-accent size-2 rounded-full transition-all duration-300 group-hover:scale-[100.8] not-group-hover:animate-pulse",
            variant === "light" && "bg-primary"
          )}
        ></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="text-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
}
