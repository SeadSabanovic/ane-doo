"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

export type SpinningTextProps = {
  text: string;
  radius?: number;
  textClassName?: string;
  speed?: number;
  direction?: "normal" | "reverse";
  className?: string;
};

export default function SpinningText({
  text,
  radius = 37,
  textClassName = "text-[8px]",
  speed = 10,
  direction = "normal",
  className,
}: SpinningTextProps) {
  const uid = useId();
  const pathId = `circlePath-${uid.replace(/:/g, "")}`;

  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <g
          className="origin-center animate-spin"
          style={{
            animationDuration: `${speed}s`,
            animationDirection: direction,
          }}
        >
          <path
            id={pathId}
            d={`
              M 50,50
              m -${radius},0
              a ${radius},${radius} 0 1,1 ${radius * 2},0
              a ${radius},${radius} 0 1,1 -${radius * 2},0
            `}
            fill="none"
          />
          <text
            className={cn(
              "font-bold uppercase tracking-widest",
              textClassName,
            )}
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
}
