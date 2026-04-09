"use client";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useRouter } from "next/navigation";

export function AboutCtaActions() {
  const router = useRouter();

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
      <InteractiveHoverButton
        type="button"
        variant="light"
        onClick={() => router.push("/katalog")}
      >
        Istraži asortiman
      </InteractiveHoverButton>

      <InteractiveHoverButton
        type="button"
        onClick={() => router.push("/kontakt")}
      >
        Kontaktirajte nas
      </InteractiveHoverButton>
    </div>
  );
}
