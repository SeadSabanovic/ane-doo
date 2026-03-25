"use client";

import { Slider } from "./slider";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CostSliderValue = [number, number];

export default function CostSlider({
  value,
  onValueChange,
  commitToUrl = true,
}: {
  value?: CostSliderValue;
  onValueChange?: (next: CostSliderValue) => void;
  /** true = mijenja URL (i šalje request), false = samo update lokalnih vrijednosti */
  commitToUrl?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const DEFAULT_MIN = 0;
  const DEFAULT_MAX = 200;

  const { initialMin, initialMax } = useMemo(() => {
    const rawMin = searchParams.get("cijenaOd");
    const rawMax = searchParams.get("cijenaDo");
    const min = rawMin ? Number.parseInt(rawMin, 10) : DEFAULT_MIN;
    const max = rawMax ? Number.parseInt(rawMax, 10) : DEFAULT_MAX;
    const safeMin = Number.isFinite(min) ? Math.max(DEFAULT_MIN, min) : DEFAULT_MIN;
    const safeMax = Number.isFinite(max) ? Math.max(safeMin, max) : DEFAULT_MAX;
    return { initialMin: safeMin, initialMax: safeMax };
  }, [searchParams, DEFAULT_MIN, DEFAULT_MAX]);

  const uncontrolledKey = useMemo(() => {
    if (value) return "";
    const rawMin = searchParams.get("cijenaOd") ?? "";
    const rawMax = searchParams.get("cijenaDo") ?? "";
    return `cost-slider:${rawMin}:${rawMax}`;
  }, [searchParams, value]);

  const commitRangeToUrl = (next: number[]) => {
    const [min, max] = next;
    const params = new URLSearchParams(searchParams.toString());
    if (min <= DEFAULT_MIN && max >= DEFAULT_MAX) {
      params.delete("cijenaOd");
      params.delete("cijenaDo");
    } else {
      params.set("cijenaOd", String(min));
      params.set("cijenaDo", String(max));
    }
    params.delete("stranica");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // Controlled mode (mobilni dialog): parent drži state; nema URL commit-a dok ne klikne "Primjeni".
  if (value) {
    return (
      <div className="flex w-full max-w-md flex-col gap-2 pt-4">
        <Slider
          id="slider"
          max={DEFAULT_MAX}
          min={DEFAULT_MIN}
          onValueChange={(next) =>
            onValueChange?.([next[0] ?? DEFAULT_MIN, next[1] ?? DEFAULT_MAX])
          }
          value={value}
        />
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <span>{value[0]} KM</span>
          <span>{value[1]} KM</span>
        </div>
      </div>
    );
  }

  // Uncontrolled mode (sidebar): lokalni state + remount kad se URL promijeni, bez setState u effectu.
  return (
    <UncontrolledCostSlider
      key={uncontrolledKey}
      initialValue={[initialMin, initialMax]}
      min={DEFAULT_MIN}
      max={DEFAULT_MAX}
      onValueChange={onValueChange}
      onCommit={commitToUrl ? commitRangeToUrl : undefined}
    />
  );
}

function UncontrolledCostSlider({
  initialValue,
  min,
  max,
  onValueChange,
  onCommit,
}: {
  initialValue: CostSliderValue;
  min: number;
  max: number;
  onValueChange?: (next: CostSliderValue) => void;
  onCommit?: (next: number[]) => void;
}) {
  const [value, setValue] = useState<CostSliderValue>(initialValue);

  const setNext = (next: CostSliderValue) => {
    setValue(next);
    onValueChange?.(next);
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-2 pt-4">
      <Slider
        id="slider"
        max={max}
        min={min}
        onValueChange={(next) => setNext([next[0] ?? min, next[1] ?? max])}
        onValueCommit={(next) => {
          const nextValue: CostSliderValue = [next[0] ?? min, next[1] ?? max];
          setNext(nextValue);
          onCommit?.(next);
        }}
        value={value}
      />
      <div className="text-muted-foreground flex items-center justify-between text-sm">
        <span>{value[0]} KM</span>
        <span>{value[1]} KM</span>
      </div>
    </div>
  );
}
