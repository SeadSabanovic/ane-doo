import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { IconProps } from "./icon-types";

const TableIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("shrink-0 text-inherit", className)}
        {...props}
      >
        <path
          d="M40.7443 4.92883H7.2558C5.4605 4.92883 4 6.38933 4 8.18472V12.8359C4 14.6313 5.4605 16.0917 7.2558 16.0917H10.1302L22.6884 28.6499L9.85116 41.4778C9.47903 41.8312 9.46979 42.4266 9.83258 42.7894C10.1954 43.1522 10.7814 43.1708 11.1442 42.808C11.1535 42.7987 11.1628 42.7894 11.1628 42.7894L24.0001 29.9615L36.828 42.7894C37.2001 43.1429 37.7862 43.1336 38.1396 42.7708C38.4838 42.4081 38.4838 41.8406 38.1396 41.4778L25.3117 28.6499L37.8699 16.0917H40.7443C42.5397 16.0917 44.0001 14.6312 44.0001 12.8359V8.18472C44.0002 6.38933 42.5397 4.92883 40.7443 4.92883ZM24.0001 27.3382L12.7535 16.0917H35.2373L24.0001 27.3382ZM42.1397 12.8359C42.1397 13.6079 41.5164 14.2312 40.7443 14.2312H7.2558C6.48373 14.2312 5.86044 13.6079 5.86044 12.8359V8.18472C5.86044 7.41265 6.48373 6.78936 7.2558 6.78936H40.7443C41.5164 6.78936 42.1397 7.41265 42.1397 8.18472V12.8359Z"
          fill="currentColor"
          strokeWidth={2}
        />
      </svg>
    );
  }
);

TableIcon.displayName = "TableIcon";

export default TableIcon;
