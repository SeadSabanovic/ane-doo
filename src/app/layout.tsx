import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisScrollProvider from "@/providers/lenis-provider";
import ConditionalLayout from "@/components/layout/conditional-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ane-Doo | Online Shop",
    template: "%s | Ane-Doo",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased select-none`}
        suppressHydrationWarning
      >
        <LenisScrollProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </LenisScrollProvider>
      </body>
    </html>
  );
}
