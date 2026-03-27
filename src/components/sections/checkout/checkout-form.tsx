"use client";

import { useState } from "react";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PhoneInputWithCountryCode from "@/components/ui/phone-input-with-country-code";
import { useCartStore } from "@/stores";

const checkoutFormSchema = z
  .object({
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
    deliveryMethod: z.enum(["pickup", "delivery"]),
    address: z.string().trim(),
    city: z.string().trim(),
    zip: z.string().trim(),
    country: z.string().trim(),
    website: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMethod === "delivery") {
      if (!data.address) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Adresa je obavezna",
          path: ["address"],
        });
      }
      if (!data.city) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Grad je obavezan",
          path: ["city"],
        });
      }
      if (!data.zip) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Poštanski broj je obavezan",
          path: ["zip"],
        });
      }
      if (!data.country) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Država je obavezna",
          path: ["country"],
        });
      }
    }
  });

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const defaultValues: CheckoutFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneCountryCode: "+387",
    phone: "",
    deliveryMethod: "pickup",
    address: "",
    city: "",
    zip: "",
    country: "",
    website: "",
  };

  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const deliveryMethod = watch("deliveryMethod");

  const onSubmit: SubmitHandler<CheckoutFormValues> = async (formData) => {
    setSubmitError(null);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: `${formData.phoneCountryCode} ${formData.phone}`.trim(),
      deliveryMethod: formData.deliveryMethod,
      address: formData.deliveryMethod === "delivery" ? formData.address : "",
      city: formData.deliveryMethod === "delivery" ? formData.city : "",
      zip: formData.deliveryMethod === "delivery" ? formData.zip : "",
      country: formData.deliveryMethod === "delivery" ? formData.country : "",
      website: formData.website,
      items: cartItems,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "Došlo je do greške. Molimo pokušajte ponovo.";
        try {
          const errorBody = (await response.json()) as { error?: string };
          if (errorBody?.error) message = errorBody.error;
        } catch {
          // Keep default message.
        }
        throw new Error(message);
      }

      clearCart();
      reset(defaultValues);
      setIsSubmittedSuccessfully(true);
    } catch (error) {
      console.error("Error submitting checkout form:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Došlo je do greške. Molimo pokušajte ponovo.",
      );
    }
  };

  return (
    <section className="h-fit rounded-md border p-6 lg:col-span-2">
      {isSubmittedSuccessfully ? (
        <div className="space-y-4 py-4">
          <h2 className="text-2xl font-semibold">Narudžba je uspješno poslana</h2>
          <p className="text-muted-foreground">
            Hvala vam. Uskoro ćemo vas kontaktirati s potvrdom narudžbe.
          </p>
          <Button
            type="button"
            onClick={() => {
              setIsSubmittedSuccessfully(false);
              setSubmitError(null);
            }}
          >
            Pošalji novu narudžbu
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-8"
        >
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

          {/* Contact Information */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Kontakt informacije</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    Ime <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="firstName"
                    placeholder="Ime"
                    {...register("firstName")}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={
                      errors.firstName ? "checkout-firstName-error" : undefined
                    }
                    className={cn(errors.firstName && "border-destructive")}
                  />
                  {errors.firstName && (
                    <p
                      id="checkout-firstName-error"
                      className="text-destructive text-sm"
                    >
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Prezime <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Prezime"
                    {...register("lastName")}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={
                      errors.lastName ? "checkout-lastName-error" : undefined
                    }
                    className={cn(errors.lastName && "border-destructive")}
                  />
                  {errors.lastName && (
                    <p
                      id="checkout-lastName-error"
                      className="text-destructive text-sm"
                    >
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="vas@email.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "checkout-email-error" : undefined
                    }
                    className={cn(errors.email && "border-destructive")}
                  />
                  {errors.email && (
                    <p
                      id="checkout-email-error"
                      className="text-destructive text-sm"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium">
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
                              errors.phone ? "checkout-phone-error" : undefined
                            }
                            placeholder="61 234 567"
                          />
                        )}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p id="checkout-phone-error" className="text-destructive text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Način preuzimanja</h2>
            <Controller
              name="deliveryMethod"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="pickup"
                    className={cn(
                      "hover:bg-primary/20 hover:border-primary/20 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                      field.value === "pickup" && "border-primary bg-primary/10",
                    )}
                  >
                    <RadioGroupItem id="pickup" value="pickup" />
                    <div className="grid flex-1 gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">
                        Lično preuzimanje
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Preuzmite narudžbu lično u našoj poslovnici
                      </p>
                    </div>
                  </Label>
                  <Label
                    htmlFor="delivery"
                    className={cn(
                      "hover:bg-primary/20 hover:border-primary/20 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors",
                      field.value === "delivery" &&
                        "border-primary bg-primary/10",
                    )}
                  >
                    <RadioGroupItem id="delivery" value="delivery" />
                    <div className="grid flex-1 gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">Dostava</p>
                      <p className="text-muted-foreground text-sm">
                        Dostavljamo na vašu adresu
                      </p>
                    </div>
                  </Label>
                </RadioGroup>
              )}
            />
          </div>

          {/* Shipping Address */}
          {deliveryMethod === "delivery" && (
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Adresa dostave</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="address" className="text-sm font-medium">
                    Adresa <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="address"
                    placeholder="Ulica i broj"
                    {...register("address")}
                    aria-invalid={!!errors.address}
                    aria-describedby={
                      errors.address ? "checkout-address-error" : undefined
                    }
                    className={cn(errors.address && "border-destructive")}
                  />
                  {errors.address && (
                    <p
                      id="checkout-address-error"
                      className="text-destructive text-sm"
                    >
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="city" className="text-sm font-medium">
                      Grad <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="city"
                      placeholder="Grad"
                      {...register("city")}
                      aria-invalid={!!errors.city}
                      aria-describedby={
                        errors.city ? "checkout-city-error" : undefined
                      }
                      className={cn(errors.city && "border-destructive")}
                    />
                    {errors.city && (
                      <p id="checkout-city-error" className="text-destructive text-sm">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="zip" className="text-sm font-medium">
                      Poštanski broj <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="zip"
                      placeholder="71000"
                      {...register("zip")}
                      aria-invalid={!!errors.zip}
                      aria-describedby={
                        errors.zip ? "checkout-zip-error" : undefined
                      }
                      className={cn(errors.zip && "border-destructive")}
                    />
                    {errors.zip && (
                      <p id="checkout-zip-error" className="text-destructive text-sm">
                        {errors.zip.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="country" className="text-sm font-medium">
                      Država <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="country"
                      placeholder="Bosna i Hercegovina"
                      {...register("country")}
                      aria-invalid={!!errors.country}
                      aria-describedby={
                        errors.country ? "checkout-country-error" : undefined
                      }
                      className={cn(errors.country && "border-destructive")}
                    />
                    {errors.country && (
                      <p
                        id="checkout-country-error"
                        className="text-destructive text-sm"
                      >
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button className="flex-1" size="lg" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Slanje..." : "Završi narudžbu"}
          </Button>

          {submitError && (
            <p className="text-destructive text-sm" role="alert">
              {submitError}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
