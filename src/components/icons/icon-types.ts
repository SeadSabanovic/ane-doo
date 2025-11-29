import { SVGProps } from "react";

/**
 * Base props for all icon components
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}
