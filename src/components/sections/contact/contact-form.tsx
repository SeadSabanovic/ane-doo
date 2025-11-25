"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
    fullName: "",
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

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Ime i prezime je obavezno";
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
        fullName: "",
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
      {/* Full Name - Required */}
      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Ime i prezime <span className="text-destructive">*</span>
        </label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Unesite vaše ime i prezime"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={cn(errors.fullName && "border-destructive")}
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-sm text-destructive">
            {errors.fullName}
          </p>
        )}
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
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "disabled:cursor-not-allowed disabled:opacity-50",
            errors.subject && "border-destructive"
          )}
        >
          <option value="">Odaberite predmet</option>
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
