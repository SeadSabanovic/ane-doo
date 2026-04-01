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
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInputWithCountryCode from "@/components/ui/phone-input-with-country-code";
import { CONTACT_MESSAGE_MAX_LENGTH } from "@/constants/contact-form";

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
      "Molimo odaberite predmet",
    ),
  message: z
    .string()
    .trim()
    .min(1, "Poruka je obavezna")
    .max(
      CONTACT_MESSAGE_MAX_LENGTH,
      `Poruka ne smije biti duža od ${CONTACT_MESSAGE_MAX_LENGTH} znakova.`,
    ),
  website: z.string().trim(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Preglednik često vraća engleske poruke za mrežne greške. */
function localizeClientErrorMessage(message: string): string {
  const m = message.trim().toLowerCase();
  if (
    m === "failed to fetch" ||
    m.includes("networkerror") ||
    m === "load failed" ||
    m.includes("network request failed")
  ) {
    return "Nema veze sa serverom. Provjerite internet i pokušajte ponovo.";
  }
  if (m.includes("aborted")) {
    return "Zahtjev je prekinut. Pokušajte ponovo.";
  }
  return message;
}

export default function ContactForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);

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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const messageLength = watch("message")?.length ?? 0;

  const onSubmit: SubmitHandler<ContactFormValues> = async (formData) => {
    setSubmitError(null);

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
        let errorMessage = "Došlo je do greške. Molimo pokušajte ponovo.";
        try {
          const errorBody = (await response.json()) as { error?: string };
          if (errorBody?.error) {
            errorMessage = errorBody.error;
          }
        } catch {
          // Ignore JSON parsing errors and keep default message.
        }

        throw new Error(errorMessage);
      }

      reset(defaultValues);
      setIsSubmittedSuccessfully(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      const message =
        error instanceof Error
          ? localizeClientErrorMessage(error.message)
          : "Došlo je do greške. Molimo pokušajte ponovo.";
      setSubmitError(message);
    }
  };

  return (
    <section className="mx-auto w-full overflow-hidden rounded-2xl border lg:grid lg:grid-cols-2">
      <div className="relative aspect-video p-6 lg:aspect-auto lg:min-h-full">
        <AnimatedImage
          src="/images/contact/ane-doo-contact.jpg"
          alt="Kontakt forma"
          width={1240}
          height={700}
          className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
          loading="eager"
        />
      </div>

      <div className="p-6">
        {isSubmittedSuccessfully ? (
          <div className="flex h-full flex-col justify-center lg:min-h-[400px]">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Poruka je uspješno poslana
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl">
              Hvala vam na upitu. Naš tim će vas kontaktirati u najkraćem roku.
            </p>
            <InteractiveHoverButton
              type="button"
              className="mt-6 w-fit"
              onClick={() => {
                setIsSubmittedSuccessfully(false);
                setSubmitError(null);
              }}
            >
              Pošalji novu poruku
            </InteractiveHoverButton>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold lg:text-4xl">Kontakt forma</h2>
              <p className="text-muted-foreground mt-4">
                Ispunite kontakt formu ispod i odgovoriti ćemo na vaš upit u
                najkraćem mogućem roku. Izgradimo uspješno partnerstvo zajedno.
              </p>
            </div>

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
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    <p
                      id="firstName-error"
                      className="text-destructive text-sm"
                    >
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <label
                    htmlFor="lastName"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    <p id="lastName-error" className="text-destructive text-sm">
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
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    <p id="email-error" className="text-destructive text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <label
                    htmlFor="phone"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                            describedBy={
                              errors.phone ? "phone-error" : undefined
                            }
                            placeholder="123-456"
                          />
                        )}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-destructive text-sm">
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
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Predmet <span className="text-destructive">*</span>
                  </label>
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="subject"
                          aria-invalid={!!errors.subject}
                          aria-describedby={
                            errors.subject ? "subject-error" : undefined
                          }
                          className={cn(
                            "w-full justify-between",
                            errors.subject && "border-destructive",
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
                    <p id="subject-error" className="text-destructive text-sm">
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
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Poruka <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="message"
                placeholder="Unesite vašu poruku..."
                rows={6}
                maxLength={CONTACT_MESSAGE_MAX_LENGTH}
                {...register("message")}
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message
                    ? "message-error message-length-hint"
                    : "message-length-hint"
                }
                className={cn(
                  errors.message && "border-destructive",
                  "max-h-36 min-h-36 resize-none",
                )}
              />
              <div className="space-y-1">
                {errors.message && (
                  <p id="message-error" className="text-destructive text-sm">
                    {errors.message.message}
                  </p>
                )}
                <p
                  id="message-length-hint"
                  className={cn(
                    "text-muted-foreground text-right text-xs tabular-nums",
                    messageLength >= CONTACT_MESSAGE_MAX_LENGTH &&
                      "text-destructive",
                  )}
                  aria-live="polite"
                >
                  {messageLength} / {CONTACT_MESSAGE_MAX_LENGTH}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <InteractiveHoverButton
              type="submit"
              disabled={isSubmitting}
              className="ml-auto disabled:opacity-60"
            >
              {isSubmitting ? "Šalje se..." : "Pošalji"}
            </InteractiveHoverButton>

            {submitError && (
              <p className="text-destructive text-sm" role="alert">
                {submitError}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
