import Container from "@/components/layout/container";
import PageHeader from "@/components/layout/page-header";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reklamacije i povrat robe",
  description:
    "Politika povrata i reklamacije ANE d.o.o. Sarajevo – uslovi povrata robe u skladu sa Zakonom o zaštiti potrošača u BiH.",
};

export default function PolitikaPovrataPage() {
  return (
    <>
      <PageHeader
        title="Reklamacije i povrat robe"
        description="Uslovi povrata i reklamacije u skladu sa Zakonom o zaštiti potrošača u BiH"
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Politika povrata", href: "/politika-povrata" },
        ]}
      />
      <Container className="max-w-3xl pb-20">
        <article className="text-foreground mx-auto">
          <p>
            U firmi <strong>ANE d.o.o.</strong> Sarajevo, zadovoljstvo naših
            kupaca je prioritet. Ukoliko iz bilo kojeg razloga niste zadovoljni
            isporučenim artiklima, imate pravo na reklamaciju i povrat u skladu
            sa Zakonom o zaštiti potrošača u Bosni i Hercegovini.
          </p>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              1. Pravo na povrat (Odustajanje od kupovine)
            </h2>
            <p>
              Kupac ima pravo da odustane od kupovine u roku od 15 dana od dana
              preuzimanja pošiljke, bez navođenja posebnog razloga.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                <strong>Uslov za povrat:</strong> Artikli moraju biti u
                originalnom stanju — nenošeni, neoprani, neoštećeni i sa svim
                originalnim etiketama.
              </li>
              <li>
                <strong>Ambalaža:</strong> Roba mora biti vraćena u originalnom
                pakovanju.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              2. Postupak povrata novca
            </h2>
            <p>
              Budući da se plaćanje vrši isključivo gotovinom (pouzećem) ili
              žiralno, povrat sredstava vršimo na sljedeći način:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                <strong>Transakcijski račun:</strong> Povrat novca vrši se
                isključivo uplatom na vaš bankovni račun (tekući ili žiro
                račun).
              </li>
              <li>
                <strong>Rok:</strong> Povrat novca izvršićemo najkasnije u roku
                od 7 radnih dana nakon što zaprimimo i pregledamo vraćenu robu
                kako bismo potvrdili njenu ispravnost.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              3. Reklamacije na oštećenja
            </h2>
            <p>
              Iako detaljno provjeravamo svaki artikal prije slanja, molimo vas
              da pošiljku pregledate odmah po preuzimanju.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                <strong>Oštećenja u transportu:</strong> Ukoliko primijetite da
                je paket fizički oštećen ili otvoren prilikom dostave,
                savjetujemo da odbijete prijem i odmah nas kontaktirate.
              </li>
              <li>
                <strong>Skriveni nedostaci:</strong> Ukoliko nakon otvaranja
                paketa utvrdite da artikal ima fabričku grešku ili ne odgovara
                naručenom (pogrešan broj/boja), molimo vas da nas obavijestite u
                roku od 24 sata od prijema.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              4. Troškovi dostave prilikom povrata
            </h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Redovan povrat:</strong> U slučaju da kupac odustane od
                kupovine jer mu artikal ne odgovara (npr. pogrešna veličina),
                troškove poštarine snosi kupac.
              </li>
              <li>
                <strong>Opravdana reklamacija:</strong> Ukoliko je povrat
                uzrokovan našom greškom (poslan pogrešan artikal ili roba sa
                greškom), ANE d.o.o. snosi kompletne troškove ponovne dostave.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              5. Kako izvršiti povrat?
            </h2>
            <p>
              Prije nego što pošaljete paket nazad, obavezno nas kontaktirajte
              putem:
            </p>
            <ul className="mt-3 list-none space-y-2 pl-0">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@ane-doo.com"
                  className="text-primary hover:underline"
                >
                  info@ane-doo.com
                </a>
              </li>
              <li>
                <strong>Telefon:</strong>{" "}
                <a
                  href="tel:+38761101871"
                  className="text-primary hover:underline"
                >
                  (+387) 61 101 871
                </a>
              </li>
            </ul>
            <p className="mt-3">
              Uz paket je potrebno priložiti kopiju računa i podatke o vašem
              bankovnom računu za povrat sredstava.
            </p>
          </section>
        </article>

        <Link href="/" className="mt-12 block text-center">
          <InteractiveHoverButton>Nazad na Početnu</InteractiveHoverButton>
        </Link>
      </Container>
    </>
  );
}
