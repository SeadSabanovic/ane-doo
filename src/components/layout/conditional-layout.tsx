"use client";

import { usePathname } from "next/navigation";
import Navigation from "./navigation";
import Footer from "@/components/layout/footer";

export default function ConditionalLayout({
  children,
  socialTopBar,
}: {
  children: React.ReactNode;
  /** Server Component slot (prosljeđuje ga root layout) — izbjegava hydration mismatch na društvenim linkovima. */
  socialTopBar: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      {socialTopBar}
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
