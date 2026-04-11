"use client";

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const motionValue = useMotionValue(direction === "down" ? value : startValue);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const initialNumeric = direction === "down" ? value : startValue;
  const [display, setDisplay] = useState(() =>
    formatNumber(initialNumeric, decimalPlaces),
  );

  const seoText = seoLabel ?? formatNumber(value, decimalPlaces);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction, startValue]);

  useEffect(() => {
    if (!mounted) return;
    const update = (latest: number) => {
      setDisplay(formatNumber(Number(latest), decimalPlaces));
    };
    const unsub = springValue.on("change", update);
    update(springValue.get());
    return unsub;
  }, [mounted, springValue, decimalPlaces]);

  return (
    <span className="relative inline-block">
      <span className="sr-only">{seoText}</span>
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          "text-foreground inline-block tracking-wider tabular-nums",
          className,
        )}
        {...props}
      >
        {display}
      </span>
    </span>
  );
}
