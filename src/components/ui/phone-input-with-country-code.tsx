"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const PHONE_COUNTRY_CODE_OPTIONS = [
  { value: "+387", label: "+387" },
  { value: "+381", label: "+381" },
  { value: "+385", label: "+385" },
  { value: "+382", label: "+382" },
] as const;

interface PhoneInputWithCountryCodeProps {
  id: string;
  phoneValue: string;
  onPhoneChange: (value: string) => void;
  countryCodeValue: string;
  onCountryCodeChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
  describedBy?: string;
}

export default function PhoneInputWithCountryCode({
  id,
  phoneValue,
  onPhoneChange,
  countryCodeValue,
  onCountryCodeChange,
  placeholder = "61486300",
  hasError = false,
  describedBy,
}: PhoneInputWithCountryCodeProps) {
  return (
    <div className="flex rounded-md">
      <Select value={countryCodeValue} onValueChange={onCountryCodeChange}>
        <SelectTrigger
          id={`${id}-country-code`}
          className={cn(
            "w-[150px] rounded-r-none shadow-none focus-visible:z-10",
            hasError && "border-destructive"
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PHONE_COUNTRY_CODE_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="pr-2 [&_svg]:hidden"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={phoneValue}
        onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
        maxLength={12}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        className={cn(
          "-ms-px rounded-l-none shadow-none",
          hasError && "border-destructive"
        )}
      />
    </div>
  );
}
