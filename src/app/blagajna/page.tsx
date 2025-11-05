import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blagajna",
  description:
    "Završite vašu narudžbu. Unesite podatke za dostavu i odaberite način plaćanja.",
};

export default function CheckoutPage() {
  // Privremeni dummy podaci za korpu
  const cartItems = [
    {
      id: 1,
      name: "Basic T-Shirt",
      price: 29.99,
      image: "/images/product/shirt.png",
      quantity: 2,
      size: "M",
      color: "Crna",
    },
    {
      id: 3,
      name: "Denim Jacket",
      price: 89.99,
      image: "/images/product/shirt.png",
      quantity: 1,
      size: "L",
      color: "Dark Blue",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal + shipping;

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Blagajna</h1>
          <p className="text-muted-foreground">Završite vašu narudžbu</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Kontakt informacije
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="vas.email@primjer.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    Broj telefona <span className="text-destructive">*</span>
                  </label>
                  <Input id="phone" type="tel" placeholder="+387 xx xxx xxx" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Shipping Address */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Adresa dostave</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-2"
                    >
                      Ime <span className="text-destructive">*</span>
                    </label>
                    <Input id="firstName" placeholder="Ime" />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-2"
                    >
                      Prezime <span className="text-destructive">*</span>
                    </label>
                    <Input id="lastName" placeholder="Prezime" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-2"
                  >
                    Adresa <span className="text-destructive">*</span>
                  </label>
                  <Input id="address" placeholder="Ulica i broj" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-2"
                    >
                      Grad <span className="text-destructive">*</span>
                    </label>
                    <Input id="city" placeholder="Grad" />
                  </div>
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium mb-2"
                    >
                      Poštanski broj <span className="text-destructive">*</span>
                    </label>
                    <Input id="zip" placeholder="00000" />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium mb-2"
                    >
                      Država <span className="text-destructive">*</span>
                    </label>
                    <Input id="country" placeholder="Bosna i Hercegovina" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-4">Pregled narudžbe</h2>

              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.size} | {item.color}
                      </p>
                      <p className="text-sm">
                        Količina: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Međuzbir:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dostava:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Ukupno:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Završi narudžbu
              </Button>

              <Link href="/shop" className="block text-center mt-4">
                <Button variant="ghost" className="w-full">
                  Nastavi kupovinu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
