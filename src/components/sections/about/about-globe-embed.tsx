"use client";

import {
  World,
  defaultGlobeArcs,
  defaultGlobeConfig,
} from "@/components/ui/globe";

export default function AboutGlobeEmbed() {
  return (
    <World globeConfig={defaultGlobeConfig} data={defaultGlobeArcs} />
  );
}
