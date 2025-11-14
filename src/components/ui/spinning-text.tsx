"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { motion, Transition, Variants } from "motion/react";

import { cn } from "@/lib/utils";

interface SpinningTextProps extends ComponentPropsWithoutRef<"div"> {
  children: string | string[];
  duration?: number;
  reverse?: boolean;
  radius?: number;
  fixedLength?: number; // Fiksni broj karaktera (default 30)
  transition?: Transition;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
}

const BASE_TRANSITION: Transition = {
  repeat: Infinity,
  ease: "linear",
};

const BASE_ITEM_VARIANTS: Variants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

export function SpinningText({
  children,
  duration = 10,
  reverse = false,
  radius = 5,
  fixedLength = 20, // Fiksni broj karaktera
  transition,
  variants,
  className,
  style,
}: SpinningTextProps) {
  if (typeof children !== "string" && !Array.isArray(children)) {
    throw new Error("children must be a string or an array of strings");
  }

  if (Array.isArray(children)) {
    // Validate all elements are strings
    if (!children.every((child) => typeof child === "string")) {
      throw new Error("all elements in children array must be strings");
    }
    children = children.join("");
  }

  // Prosjeđujemo string na fiksnu dužinu dodavanjem razmaka
  let processedText = children.trim();
  if (processedText.length < fixedLength) {
    // Dodajemo razmake do željene dužine
    const spacesToAdd = fixedLength - processedText.length;
    processedText = processedText + " ".repeat(spacesToAdd);
  } else if (processedText.length > fixedLength) {
    // Ako je duži, skraćujemo (ili možemo koristiti cijeli)
    processedText = processedText.substring(0, fixedLength);
  }

  const letters = processedText.split("");

  const finalTransition: Transition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition as { duration?: number })?.duration ?? duration,
  };

  const containerVariants: Variants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const itemVariants: Variants = {
    ...BASE_ITEM_VARIANTS,
    ...variants?.item,
  };

  return (
    <motion.div
      className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10",
        className
      )}
      style={{
        ...style,
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={finalTransition}
    >
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${index}-${letter}`}
          variants={itemVariants}
          className="absolute top-1/2 left-1/2 inline-block"
          style={
            {
              "--index": index,
              "--total": letters.length,
              "--radius": radius,
              transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,
              transformOrigin: "center",
            } as React.CSSProperties
          }
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{children}</span>
    </motion.div>
  );
}
