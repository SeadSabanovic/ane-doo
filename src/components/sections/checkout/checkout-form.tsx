"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CheckoutForm() {
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email je obavezan";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Molimo unesite validan email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Broj telefona je obavezan";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ime je obavezno";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Prezime je obavezno";
    }

    // Validacija adrese samo ako je odabrana dostava
    if (deliveryMethod === "delivery") {
      if (!formData.address.trim()) {
        newErrors.address = "Adresa je obavezna";
      }

      if (!formData.city.trim()) {
        newErrors.city = "Grad je obavezan";
      }

      if (!formData.zip.trim()) {
        newErrors.zip = "Poštanski broj je obavezan";
      }

      if (!formData.country.trim()) {
        newErrors.country = "Država je obavezna";
      }
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
      console.log("Checkout form submitted:", formData);
      // Reset form on success
      setFormData({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zip: "",
        country: "",
      });
      alert("Narudžba je uspješno poslana!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Došlo je do greške. Molimo pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-6 border rounded-md lg:col-span-2 h-fit"
    >
      {/* Contact Information */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Kontakt informacije</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-2"
              >
                Ime <span className="text-destructive">*</span>
              </label>
              <Input
                id="firstName"
                name="firstName"
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
                <p
                  id="firstName-error"
                  className="text-sm text-destructive mt-1"
                >
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-2"
              >
                Prezime <span className="text-destructive">*</span>
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Prezime"
                aria-invalid={!!errors.lastName}
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
                className={cn(errors.lastName && "border-destructive")}
              />
              {errors.lastName && (
                <p
                  id="lastName-error"
                  className="text-sm text-destructive mt-1"
                >
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="vas.email@primjer.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(errors.email && "border-destructive")}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Broj telefona <span className="text-destructive">*</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+387 xx xxx xxx"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={cn(errors.phone && "border-destructive")}
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm text-destructive mt-1">
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Delivery Method */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Način preuzimanja</h2>
        <div className="space-y-2">
          <Label
            htmlFor="pickup"
            className={cn(
              "hover:bg-primary/20 hover:border-primary/20 flex items-start gap-2 rounded-lg border p-3 cursor-pointer transition-colors",
              deliveryMethod === "pickup" && "border-primary bg-primary/10"
            )}
          >
            <Checkbox
              id="pickup"
              checked={deliveryMethod === "pickup"}
              onCheckedChange={() => {
                setDeliveryMethod("pickup");
                // Clear address errors when switching to pickup
                if (
                  errors.address ||
                  errors.city ||
                  errors.zip ||
                  errors.country
                ) {
                  setErrors((prev) => ({
                    ...prev,
                    address: "",
                    city: "",
                    zip: "",
                    country: "",
                  }));
                }
              }}
              className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            />
            <div className="grid gap-1.5 font-normal flex-1">
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
              "hover:bg-primary/20 hover:border-primary/20 flex items-start gap-2 rounded-lg border p-3 cursor-pointer transition-colors",
              deliveryMethod === "delivery" && "border-primary bg-primary/10"
            )}
          >
            <Checkbox
              id="delivery"
              checked={deliveryMethod === "delivery"}
              onCheckedChange={() => setDeliveryMethod("delivery")}
              className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            />
            <div className="grid gap-1.5 font-normal flex-1">
              <p className="text-sm leading-none font-medium">Dostava</p>
              <p className="text-muted-foreground text-sm">
                Dostavljamo na vašu adresu
              </p>
            </div>
          </Label>
        </div>
      </div>

      {/* Shipping Address - Only show if delivery is selected */}
      {deliveryMethod === "delivery" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Adresa dostave</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-2"
              >
                Adresa <span className="text-destructive">*</span>
              </label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ulica i broj"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? "address-error" : undefined}
                className={cn(errors.address && "border-destructive")}
              />
              {errors.address && (
                <p id="address-error" className="text-sm text-destructive mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-2"
                >
                  Grad <span className="text-destructive">*</span>
                </label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Grad"
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? "city-error" : undefined}
                  className={cn(errors.city && "border-destructive")}
                />
                {errors.city && (
                  <p id="city-error" className="text-sm text-destructive mt-1">
                    {errors.city}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium mb-2">
                  Poštanski broj <span className="text-destructive">*</span>
                </label>
                <Input
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  placeholder="00000"
                  aria-invalid={!!errors.zip}
                  aria-describedby={errors.zip ? "zip-error" : undefined}
                  className={cn(errors.zip && "border-destructive")}
                />
                {errors.zip && (
                  <p id="zip-error" className="text-sm text-destructive mt-1">
                    {errors.zip}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium mb-2"
                >
                  Država <span className="text-destructive">*</span>
                </label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Bosna i Hercegovina"
                  aria-invalid={!!errors.country}
                  aria-describedby={
                    errors.country ? "country-error" : undefined
                  }
                  className={cn(errors.country && "border-destructive")}
                />
                {errors.country && (
                  <p
                    id="country-error"
                    className="text-sm text-destructive mt-1"
                  >
                    {errors.country}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Button className="flex-1" size="lg">
        Završi narudžbu
      </Button>
    </form>
  );
}
