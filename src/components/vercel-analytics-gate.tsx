"use client";

import { Analytics } from "@vercel/analytics/next";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  queueMicrotask(onChange);
  return () => {};
}

function allowAnalyticsSnapshot() {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h !== "localhost" && h !== "127.0.0.1" && h !== "0.0.0.0";
}

/** `/_vercel/insights/script.js` ne postoji na localhostu / `next start` (NODE_ENV=production). */
export function VercelAnalyticsGate() {
  const allow = useSyncExternalStore(
    subscribe,
    allowAnalyticsSnapshot,
    () => false,
  );

  if (!allow) return null;
  return <Analytics />;
}
