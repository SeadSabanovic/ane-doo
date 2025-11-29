import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { IconProps } from "./icon-types";

const BedIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("shrink-0 text-inherit", className)}
        {...props}
      >
        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" fill="currentColor" />
        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" fill="currentColor" />
        <path d="M12 4v6" fill="currentColor" />
        <path d="M2 18h20" fill="currentColor" />
      </svg>
    );
  }
);

BedIcon.displayName = "BedIcon";

export default BedIcon;
