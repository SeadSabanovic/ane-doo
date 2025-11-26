"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const subjectOptions = [
  { value: "upit-o-artiklima", label: "Upit o artiklima" },
  { value: "ponuda", label: "Ponuda" },
  { value: "partnerstvo", label: "Partnerstvo" },
  { value: "tehnicka-podrska", label: "Tehnička podrška" },
  { value: "opsti-upit", label: "Opšti upit" },
  { value: "reklamacija", label: "Reklamacija" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as string]) {
      setErrors((prev) => ({ ...prev, [name as string]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ime je obavezno";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Prezime je obavezno";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email je obavezan";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Molimo unesite validan email";
    }

    if (!formData.subject) {
      newErrors.subject = "Molimo odaberite predmet";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Poruka je obavezna";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // TODO: Implement actual form submission
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      // Reset form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
      alert("Poruka je uspješno poslana! Kontaktirat ćemo vas uskoro.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Došlo je do greške. Molimo pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First & Last Name - Required */}
      <div className="space-y-2">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 flex-col gap-1.5">
            <label
              htmlFor="firstName"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ime <span className="text-destructive">*</span>
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Ime"
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
              className={cn(errors.firstName && "border-destructive")}
            />
            {errors.firstName && (
              <p id="firstName-error" className="text-sm text-destructive">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <label
              htmlFor="lastName"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Prezime <span className="text-destructive">*</span>
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Prezime"
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={cn(errors.lastName && "border-destructive")}
            />
            {errors.lastName && (
              <p id="lastName-error" className="text-sm text-destructive">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Email - Required */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Email <span className="text-destructive">*</span>
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="vas@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(errors.email && "border-destructive")}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone - Optional */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Kontakt telefon{" "}
          <span className="text-muted-foreground text-xs">(opcionalno)</span>
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+387 XX XXX XXX"
        />
      </div>

      {/* Company - Optional */}
      <div className="space-y-2">
        <label
          htmlFor="company"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Firma{" "}
          <span className="text-muted-foreground text-xs">(opcionalno)</span>
        </label>
        <Input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Unesite naziv firme"
        />
      </div>

      {/* Subject - Required */}
      <div className="space-y-2">
        <label
          htmlFor="subject"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Predmet <span className="text-destructive">*</span>
        </label>
        <Select
          value={formData.subject}
          onValueChange={(value) => handleSelectChange("subject", value)}
        >
          <SelectTrigger
            id="subject"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={cn(
              "w-full justify-between",
              errors.subject && "border-destructive"
            )}
          >
            <SelectValue placeholder="Odaberite predmet" />
          </SelectTrigger>
          <SelectContent className="w-(--radix-select-trigger-width)">
            {subjectOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="subject" value={formData.subject} />
        {errors.subject && (
          <p id="subject-error" className="text-sm text-destructive">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message - Required */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Poruka <span className="text-destructive">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Unesite vašu poruku..."
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(errors.message && "border-destructive")}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? "Šalje se..." : "Pošalji"}
      </Button>
    </form>
  );
}
