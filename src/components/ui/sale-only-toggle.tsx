"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SaleOnlyToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const checked = useMemo(() => {
    const raw = searchParams.get("akcija");
    return raw === "1" || raw === "true";
  }, [searchParams]);

  const setChecked = (nextChecked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextChecked) {
      params.set("akcija", "1");
    } else {
      params.delete("akcija");
    }
    params.delete("stranica");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          id="sale-only-toggle"
          checked={checked}
          onCheckedChange={(value) => setChecked(value === true)}
        />
        <Label
          htmlFor="sale-only-toggle"
          className="cursor-pointer text-sm font-medium"
        >
          Samo akcijski proizvodi
        </Label>
      </div>
    </div>
  );
}

