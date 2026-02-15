"use client";
import { ReactLenis } from "lenis/react";
import { FC, useRef } from "react";
import { usePathname } from "next/navigation";

type LenisScrollProviderProps = {
  children: React.ReactNode;
};
const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  // Disable Lenis for Sanity Studio
  const isStudioRoute = pathname?.startsWith("/studio");

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <ReactLenis ref={lenisRef} root options={{ lerp: 0.1, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
};

export default LenisScrollProvider;
