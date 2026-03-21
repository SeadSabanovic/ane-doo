"use client";

import dynamic from "next/dynamic";

const AboutGlobeEmbed = dynamic(
  () => import("@/components/sections/about/about-globe-embed"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[350px] w-full aspect-video" />
    ),
  }
);

export default function AboutBentoGlobeLoader() {
  return <AboutGlobeEmbed />;
}
