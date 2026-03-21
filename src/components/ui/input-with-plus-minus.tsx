"use client";

import { useCallback, useId, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface InputWithPlusMinusProps {
  value?: number;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  onChange?: (value: number) => void;
  label?: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
}

export function InputWithPlusMinus({
  value: controlledValue,
  defaultValue = 0,
  minValue = 0,
  maxValue,
  step = 1,
  onChange,
  label = "Količina",
  className,
  inputClassName,
  disabled = false,
}: InputWithPlusMinusProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const inputId = useId();

  const updateValue = useCallback(
    (newValue: number) => {
      // Clamp value between min and max
      let clampedValue = newValue;
      if (minValue !== undefined) {
        clampedValue = Math.max(clampedValue, minValue);
      }
      if (maxValue !== undefined) {
        clampedValue = Math.min(clampedValue, maxValue);
      }

      if (!isControlled) {
        setInternalValue(clampedValue);
      }
      onChange?.(clampedValue);
    },
    [isControlled, minValue, maxValue, onChange],
  );

  const handleDecrement = () => {
    updateValue(currentValue - step);
  };

  const handleIncrement = () => {
    updateValue(currentValue + step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    updateValue(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleDecrement();
    }
  };

  const canDecrement = minValue === undefined || currentValue > minValue;
  const canIncrement = maxValue === undefined || currentValue < maxValue;

  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && (
        <Label
          htmlFor={inputId}
          className="flex items-center gap-2 text-sm leading-none font-medium select-none"
        >
          {label}
        </Label>
      )}
      <div
        role="group"
        aria-label={label || "Količina"}
        className={cn(
          "relative inline-flex h-10 w-full min-w-0 items-center rounded-md bg-transparent text-base whitespace-nowrap shadow-none! transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-within:ring-ring/50! focus-within:ring-2",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "flex aspect-square size-10 items-center justify-center rounded-l-md rounded-r-none border border-r shadow-none! disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100!",
            "border-input bg-background text-muted-foreground hover:bg-border/50 hover:text-foreground",
            "focus-visible:border-input focus-visible:bg-border/50 focus-visible:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
          )}
          disabled={!canDecrement || disabled}
          onClick={handleDecrement}
          aria-label="Smanji"
          aria-describedby={`${inputId}-decrement-desc`}
        >
          <MinusIcon size={16} aria-hidden="true" />
          <span id={`${inputId}-decrement-desc`} className="sr-only">
            Smanji vrijednost
          </span>
        </Button>
        <Input
          id={inputId}
          type="number"
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          min={minValue}
          max={maxValue}
          step={step}
          disabled={disabled}
          aria-valuemin={minValue}
          aria-valuemax={maxValue}
          aria-valuenow={currentValue}
          aria-label={label || "Količina"}
          className={cn(
            "bg-background!",
            "boder-border selection:bg-primary selection:text-primary-foreground h-full w-full grow rounded-none border-x-0 border-y px-3 py-2 text-center text-2xl! font-semibold tabular-nums shadow-none! outline-none",
            "focus-visible:border-border focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
            "[-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            inputClassName,
          )}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "flex aspect-square size-10 items-center justify-center rounded-l-none rounded-r-md border shadow-none! disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100!",
            "border-input bg-background text-muted-foreground hover:bg-border/50 hover:text-foreground transition-colors",
            "focus-visible:border-input focus-visible:bg-border/50 focus-visible:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
          )}
          disabled={!canIncrement || disabled}
          onClick={handleIncrement}
          aria-label="Povećaj"
          aria-describedby={`${inputId}-increment-desc`}
        >
          <PlusIcon size={16} aria-hidden="true" />
          <span id={`${inputId}-increment-desc`} className="sr-only">
            Povećaj vrijednost
          </span>
        </Button>
      </div>
    </div>
  );
}
