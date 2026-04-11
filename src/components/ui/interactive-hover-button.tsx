"use client";

import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { motion, type HTMLMotionProps } from "motion/react";
import { ArrowRight } from "lucide-react";
import omit from "lodash/omit";

import { cn } from "@/lib/utils";

/** Bez `forwardMotionProps` — inače `whileTap` / `animate` završe na `<a>` preko Next `Link` i React prijavljuje upozorenje. */
const MotionLink = motion.create(Link);

interface Position {
  x: number;
  y: number;
}

type Shared = {
  children: React.ReactNode;
  variant?: "dark" | "light";
};

export type InteractiveHoverButtonProps =
  | (Shared & {
      href: LinkProps["href"];
    } & Omit<HTMLMotionProps<"a">, "children" | "href">)
  | (Shared & { href?: undefined } & Omit<
        HTMLMotionProps<"button">,
        "children"
      >);

export function InteractiveHoverButton(props: InteractiveHoverButtonProps) {
  const { children, variant = "dark", className } = props;

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const anchorRef = React.useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });

  const handleMouse = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    const el =
      "href" in props && props.href != null
        ? anchorRef.current
        : buttonRef.current;
    if (el) {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX, y: middleY });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  const sharedClassName = cn(
    "group bg-primary text-primary-foreground relative w-auto cursor-pointer overflow-hidden rounded-md px-6 py-2 text-center font-semibold transition-none",
    variant === "dark" && "bg-primary text-primary-foreground",
    variant === "light" && "bg-background text-primary border",
    className,
  );

  const motionShared = {
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    animate: { x, y },
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 15,
      mass: 0.1,
    },
    whileTap: { scale: 0.95 },
    className: sharedClassName,
  };

  const inner = (
    <>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "bg-accent size-2 rounded-full transition-all duration-300 not-group-hover:animate-pulse group-hover:scale-[100.8]",
            variant === "light" && "bg-primary",
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
    </>
  );

  if ("href" in props && props.href != null) {
    const { href } = props;
    const anchorMotionProps = omit(props, [
      "href",
      "children",
      "variant",
      "className",
    ]);
    return (
      <MotionLink
        ref={anchorRef}
        href={href}
        {...motionShared}
        {...anchorMotionProps}
      >
        {inner}
      </MotionLink>
    );
  }

  const buttonProps = omit(props, ["children", "variant", "className"]);
  return (
    <motion.button ref={buttonRef} {...motionShared} {...buttonProps}>
      {inner}
    </motion.button>
  );
}
