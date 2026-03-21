import type { Metadata } from "next";
import { Geist_Mono, Lora, Nunito } from "next/font/google";
import "./globals.css";
import LenisScrollProvider from "@/providers/lenis-provider";
import ConditionalLayout from "@/components/layout/conditional-layout";
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

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ANE d.o.o.",
    template: "%s | ANE d.o.o.",
  },
  description:
    "Pronađite sve što vam treba na jednom mjestu. Kvalitetna odjeća i obuća po povoljnim cijenama.",
  keywords: ["online shop", "kupovina", "odjeća", "obuća", "moda"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bs"
      className={`${nunito.variable} ${lora.variable} ${geistMono.variable}`}
    >
      <body
        className="font-sans antialiased select-none"
        suppressHydrationWarning
      >
        <LenisScrollProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <Toaster position="top-center" />
        </LenisScrollProvider>
      </body>
    </html>
  );
}
