"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import AnimatedImage from "@/components/ui/animated-image";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInputWithCountryCode from "@/components/ui/phone-input-with-country-code";

const subjectOptions = [
  { value: "upit-o-proizvodima", label: "Upit o proizvodima" },
  { value: "veleprodaja-i-saradnja", label: "Veleprodaja i saradnja" },
  { value: "zahtjev-za-ponudu", label: "Zahtjev za ponudu" },
  { value: "reklamacije-i-povrati", label: "Reklamacije i povrati" },
  { value: "opsti-upit", label: "Opšti upit" },
];

const contactFormSchema = z.object({
  firstName: z.string().trim().min(1, "Ime je obavezno"),
  lastName: z.string().trim().min(1, "Prezime je obavezno"),
  email: z
    .string()
    .trim()
    .min(1, "Email je obavezan")
    .email("Molimo unesite validan email"),
  phoneCountryCode: z.enum(["+387", "+381", "+385", "+382"]),
  phone: z
    .string()
    .trim()
    .min(1, "Kontakt telefon je obavezan")
    .regex(/^\d+$/, "Telefon može sadržavati samo brojeve")
    .min(6, "Kontakt telefon mora imati između 6 i 12 cifara")
    .max(12, "Kontakt telefon mora imati između 6 i 12 cifara"),
  company: z.string().trim(),
  subject: z
    .string()
    .min(1, "Molimo odaberite predmet")
    .refine(
      (value) => subjectOptions.some((option) => option.value === value),
      "Molimo odaberite predmet"
    ),
  message: z.string().trim().min(1, "Poruka je obavezna"),
  website: z.string().trim(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const defaultValues: ContactFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+387",
    phone: "",
    company: "",
    subject: "",
    message: "",
    website: "",
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (formData) => {
    const normalizedPhone = formData.phone.replace(/\D/g, "");
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: `${formData.phoneCountryCode} ${normalizedPhone}`.trim(),
      company: formData.company,
      subject: formData.subject,
      message: formData.message,
      website: formData.website,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      reset(defaultValues);
      alert("Poruka je uspješno poslana! Kontaktirat ćemo vas uskoro.");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Došlo je do greške. Molimo pokušajte ponovo.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border rounded-md lg:max-w-5xl mx-auto w-full overflow-hidden"
    >
      <div className="p-6 relative aspect-video flex flex-col justify-end">
        <h2 className="text-3xl lg:text-4xl font-bold mt-auto text-background text-shadow-sm">
          Kontakt forma
        </h2>
        <p className="text-shadow-sm mt-4 max-w-md text-muted">
          Sa više od 20 godina iskustva u veleprodaji, uvijek smo otvoreni za
          nova partnerstva. Pišite nam za upite, ponude ili dodatne informacije.
        </p>

        <AnimatedImage
          src="https://images.pexels.com/photos/10558185/pexels-photo-10558185.jpeg?_gl=1*10zj0ze*_ga*MjA0MTQwODUxLjE3NjMzMjUxNzE.*_ga_8JE65Q40S6*czE3NjQ3NTg3MjIkbzIkZzEkdDE3NjQ3NjAxMzEkajMzJGwwJGgw"
          alt="Kontakt forma"
          width={1240}
          height={700}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
      </div>

      <div className="p-6 space-y-6">
        {/* Honeypot field (anti-spam) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <Input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

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
                type="text"
                placeholder="Ime"
                {...register("firstName")}
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
                className={cn(errors.firstName && "border-destructive")}
              />
              {errors.firstName && (
                <p id="firstName-error" className="text-sm text-destructive">
                  {errors.firstName.message}
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
                type="text"
                placeholder="Prezime"
                {...register("lastName")}
                aria-invalid={!!errors.lastName}
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
                className={cn(errors.lastName && "border-destructive")}
              />
              {errors.lastName && (
                <p id="lastName-error" className="text-sm text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Email & Phone - Required */}
        <div className="space-y-2">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                type="text"
                inputMode="email"
                autoComplete="email"
                placeholder="vas@email.com"
                {...register("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={cn(errors.email && "border-destructive")}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="phone"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Kontakt telefon <span className="text-destructive">*</span>
              </label>
              <Controller
                name="phoneCountryCode"
                control={control}
                render={({ field: phoneCodeField }) => (
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: phoneField }) => (
                      <PhoneInputWithCountryCode
                        id="phone"
                        phoneValue={phoneField.value}
                        onPhoneChange={phoneField.onChange}
                        countryCodeValue={phoneCodeField.value}
                        onCountryCodeChange={phoneCodeField.onChange}
                        hasError={!!errors.phone}
                        describedBy={errors.phone ? "phone-error" : undefined}
                      />
                    )}
                  />
                )}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Company & Subject */}
        <div className="space-y-2">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="company"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Firma
              </label>
              <Input
                id="company"
                type="text"
                placeholder="Unesite naziv firme"
                {...register("company")}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="subject"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Predmet <span className="text-destructive">*</span>
              </label>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
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
                )}
              />
              {errors.subject && (
                <p id="subject-error" className="text-sm text-destructive">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>
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
            placeholder="Unesite vašu poruku..."
            rows={6}
            {...register("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(errors.message && "border-destructive", "min-h-36 max-h-36 resize-none")}
          />
          {errors.message && (
            <p id="message-error" className="text-sm text-destructive">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <InteractiveHoverButton
          type="submit"
          disabled={isSubmitting}
          className="disabled:opacity-60 ml-auto"
        >
          {isSubmitting ? "Šalje se..." : "Pošalji"}
        </InteractiveHoverButton>
      </div>
    </form>
  );
}
