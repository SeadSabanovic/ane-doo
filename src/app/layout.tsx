import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import LenisScrollProvider from "@/providers/lenis-provider";
import RouteScrollReset from "@/providers/route-scroll-reset";
import ConditionalLayout from "@/components/layout/conditional-layout";
import OrganizationWebsiteJsonLd from "@/components/seo/organization-website-json-ld";
import { Toaster } from "@/components/ui/sonner";

/** Body — Nunito (variable), subset latin + latin-ext za bs/hr */
const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
  adjustFontFallback: true,
});

/** Naslovi — Lora (variable) */
const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lora",
  display: "swap",
  adjustFontFallback: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://ane-doo.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Veleprodaja tekstila i kućnog asortimana – Sarajevo | ANE d.o.o.",
    template: "%s | ANE d.o.o.",
  },
  description:
    "Pouzdan veleprodajni partner za vaš biznis. ANE d.o.o. nudi vrhunski tekstil, posteljine i kućni asortiman uz brzu dostavu širom BiH. Pogledajte ponudu.",
  keywords: [
    "ANE d.o.o.",
    "veleprodaja tekstila",
    "veleprodaja Sarajevo",
    "distribucija tekstila BiH",
    "kućni tekstil",
    "veleprodaja posteljina",
    "veleprodaja odjeće",
    "oprema za hotele i apartmane",
    "pouzdan veleprodajni partner",
    "tekstilna galanterija",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bs"
      className={`${nunito.variable} ${lora.variable}`}
    >
      <body className="antialiased" suppressHydrationWarning>
        <OrganizationWebsiteJsonLd />
        <LenisScrollProvider>
          <RouteScrollReset />
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster position="top-center" />
          <Analytics />
        </LenisScrollProvider>
      </body>
    </html>
  );
}
