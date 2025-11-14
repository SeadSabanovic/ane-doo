import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "ANE D.O.O. | Kontakt",
  description:
    "Kontaktirajte nas za sve vaše pitanja. Mi smo ovdje da vam pomognemo.",
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Kontakt</h1>
          <p className="text-muted-foreground">
            Javite nam se za sve vaše pitanja i upite
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Kontakt Informacije
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresa</h3>
                    <p className="text-muted-foreground text-sm">
                      Ulica Primjer 123
                      <br />
                      71000 Sarajevo
                      <br />
                      Bosna i Hercegovina
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefon</h3>
                    <p className="text-muted-foreground text-sm">
                      <a
                        href="tel:+38733123456"
                        className="hover:text-primary transition-colors"
                      >
                        +387 33 123 456
                      </a>
                      <br />
                      <a
                        href="tel:+38761123456"
                        className="hover:text-primary transition-colors"
                      >
                        +387 61 123 456
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      <a
                        href="mailto:info@anedoo.ba"
                        className="hover:text-primary transition-colors"
                      >
                        info@anedoo.ba
                      </a>
                      <br />
                      <a
                        href="mailto:prodaja@anedoo.ba"
                        className="hover:text-primary transition-colors"
                      >
                        prodaja@anedoo.ba
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Radno Vrijeme</h3>
                    <p className="text-muted-foreground text-sm">
                      Ponedjeljak - Petak: 09:00 - 18:00
                      <br />
                      Subota: 09:00 - 15:00
                      <br />
                      Nedjelja: Zatvoreno
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">
                Pošaljite Nam Poruku
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Ime i Prezime <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Unesite vaše ime i prezime"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="vas.email@primjer.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Broj telefona</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+387 xx xxx xxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      Predmet <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Predmet poruke"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Poruka <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Unesite vašu poruku..."
                    rows={6}
                    required
                    className="min-h-[150px]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Pošaljite Poruku
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
