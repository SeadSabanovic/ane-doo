"use client";

import { useSyncExternalStore } from "react";

/** SSR / hydration-safe: false na serveru, true u browseru (bez setState u effectu). */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
