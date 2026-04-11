"use client";

import { usePathname } from "next/navigation";
import Navigation from "./navigation";
import Footer from "@/components/layout/footer";
import type { Category } from "@/sanity/lib/api";

export default function ConditionalLayout({
  children,
  socialTopBar,
  categories,
}: {
  children: React.ReactNode;
  /** Server Component slot (prosljeđuje ga root layout) — izbjegava hydration mismatch na društvenim linkovima. */
  socialTopBar: React.ReactNode;
  /** Iz Sanityja (`getParentCategories`) — jedan izvor s katalogom. */
  categories: Category[];
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      {socialTopBar}
      <Navigation categories={categories} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
