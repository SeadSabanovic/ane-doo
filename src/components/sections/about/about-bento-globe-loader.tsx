"use client";

import dynamic from "next/dynamic";

const AboutGlobeEmbed = dynamic(
  () => import("@/components/sections/about/about-globe-embed"),
  {
    ssr: false,
    loading: () => <div className="aspect-video min-h-[350px] w-full" />,
  },
);

export default function AboutBentoGlobeLoader() {
  return <AboutGlobeEmbed />;
}
