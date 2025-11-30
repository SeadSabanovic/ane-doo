"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

interface InteractiveHoverButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "dark" | "light";
}

export function InteractiveHoverButton({
  children,
  className,
  variant = "dark",
  ...props
}: InteractiveHoverButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ref.current) {
      const { clientX, clientY } = e;
      const { height, width, left, top } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX, y: middleY });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{
        scale: 0.95,
      }}
      className={cn(
        "group bg-primary text-primary-foreground relative w-auto cursor-pointer overflow-hidden rounded-md px-6 py-2 text-center font-semibold transition-none",
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
    </motion.button>
  );
}
