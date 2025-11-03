"use client";

import { Slider } from "./slider";
import { useState } from "react";

export default function CostSlider() {
  const [value, setValue] = useState([0, 1000]);
  return (
    <div className="flex w-full max-w-md flex-col gap-2 pt-2">
      <Slider
        id="slider"
        max={1000}
        min={0}
        onValueChange={setValue}
        value={value}
      />
      <div className="flex items-center justify-between text-muted-foreground text-sm">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
}
