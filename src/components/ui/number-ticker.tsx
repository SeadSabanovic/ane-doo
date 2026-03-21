"use client";

import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

function formatNumber(n: number, decimalPlaces: number) {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(Number(n.toFixed(decimalPlaces)));
}

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  /**
   * Statičan tekst za SEO (u HTML-u odmah, van animacije).
   * Ako nije proslijeđen, koristi se formatiran `value` (npr. "988").
   * Za statistike s "+" proslijedi npr. `seoLabel="12+"`.
   */
  seoLabel?: string;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  seoLabel,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : startValue);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const seoText = seoLabel ?? formatNumber(value, decimalPlaces);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction, startValue]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = formatNumber(Number(latest), decimalPlaces);
        }
      }),
    [springValue, decimalPlaces]
  );

  return (
    <span className="relative inline-block">
      {/* Stvarna vrijednost u DOM-u za crawlers / SEO; vizuelno sakriveno */}
      <span className="sr-only">{seoText}</span>
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          "inline-block tracking-wider tabular-nums text-foreground",
          className
        )}
        {...props}
      >
        {startValue}
      </span>
    </span>
  );
}
