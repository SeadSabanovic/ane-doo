import Container from "@/components/layout/container";
import PageHeader from "@/components/layout/page-header";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description:
    "Politika privatnosti ANE d.o.o. Sarajevo – kako postupamo sa vašim podacima na stranici www.ane-doo.com.",
};

export default function PolitikaPrivatnostiPage() {
  return (
    <>
      <PageHeader
        title="Politika privatnosti"
        description="Kako postupamo sa vašim podacima na stranici www.ane-doo.com"
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Politika privatnosti", href: "/politika-privatnosti" },
        ]}
      />
      <Container className="max-w-3xl pb-20">
        <article className="text-foreground mx-auto">
          <p>
            Firma <strong>ANE d.o.o.</strong> Sarajevo (u daljem tekstu:
            &quot;mi&quot;, &quot;naša trgovina&quot;) posvećena je zaštiti vaše
            privatnosti. Ova politika objašnjava kako postupamo sa vašim
            podacima na stranici www.ane-doo.com.
          </p>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              1. Prikupljanje ličnih podataka
            </h2>
            <p>
              Prikupljamo samo minimalne podatke koji su nam neophodni da bismo
              vam isporučili naručenu robu. To su:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                <strong>Identifikacioni podaci:</strong> Ime i prezime.
              </li>
              <li>
                <strong>Kontakt podaci:</strong> Adresa stanovanja (za dostavu),
                broj telefona (za kontakt kurira) i email adresa (za potvrdu
                narudžbe).
              </li>
            </ul>
            <p className="mt-3">
              Ove podatke nam dajete isključivo svojom voljom prilikom
              popunjavanja forme za narudžbu.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              2. Svrha korištenja podataka
            </h2>
            <p>Vaše podatke koristimo isključivo u sljedeće svrhe:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Obrada i potvrda vaše narudžbe.</li>
              <li>
                Dostava kupljenih artikala na vašu adresu putem kurirske službe.
              </li>
              <li>
                Komunikacija s vama u slučaju potrebe za pojašnjenjem detalja
                narudžbe.
              </li>
            </ul>
            <p className="mt-3">
              Vaše podatke ne prodajemo, ne iznajmljujemo i ne koristimo za
              neželjene marketinške kampanje (spam).
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              3. Analitika i praćenje (Vercel Analytics)
            </h2>
            <p>
              Naša stranica koristi Vercel Web Analytics kako bismo razumjeli
              kako posjetioci koriste sajt i poboljšali korisničko iskustvo.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                <strong>Bez kolačića (Cookie-free):</strong> Ovaj alat ne
                postavlja nikakve kolačiće u vaš pretraživač.
              </li>
              <li>
                <strong>Anonimnost:</strong> Svi podaci o posjetama su potpuno
                anonimni. Ne prikupljamo vašu IP adresu u punom formatu niti
                bilo koji podatak koji vas može lično identifikovati.
              </li>
              <li>
                <strong>Privatnost:</strong> Podaci služe isključivo za
                statistički uvid u broj posjeta i popularnost artikala.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              4. Kolačići (Cookies)
            </h2>
            <p>
              Osim gore navedene anonimne analitike, naša stranica ne koristi
              kolačiće za profilisanje ili praćenje vaših aktivnosti na drugim
              sajtovima. Možemo koristiti samo osnovne tehničke sesije neophodne
              za funkcionisanje korpe tokom vaše posjete.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              5. Dijeljenje podataka sa trećim licima
            </h2>
            <p>
              Vaše podatke o adresi i broju telefona dijelimo isključivo sa
              našim logističkim partnerima (ovlaštenim kurirskim službama) radi
              realizacije isporuke. Svi naši partneri su obavezni čuvati te
              podatke u skladu sa Zakonom o zaštiti ličnih podataka u BiH.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              6. Sigurnost podataka
            </h2>
            <p>
              Primjenjujemo savremene sigurnosne mjere, uključujući SSL (TLS)
              enkripciju, kako bismo osigurali da podaci koje unosite tokom
              procesa narudžbe budu zaštićeni od neovlaštenog pristupa. Budući
              da ne vršimo online naplatu karticama, podaci o vašim bankovnim
              računima nikada se ne traže niti pohranjuju na našoj stranici.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">7. Vaša prava</h2>
            <p>U skladu sa zakonom, imate pravo da od nas zatražite:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Informaciju o tome koje vaše podatke posjedujemo.</li>
              <li>Ispravku ili dopunu vaših podataka.</li>
              <li>Trajno brisanje vaših podataka iz naših operativnih baza.</li>
            </ul>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">8. Kontakt</h2>
            <p>
              Za sva pitanja vezana za privatnost i zaštitu podataka, možete nas
              kontaktirati na:
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
              <li>
                <strong>Adresa:</strong> Ismeta Alajbegovića Šerbe 30, 71000
                Sarajevo
              </li>
            </ul>
          </section>
        </article>

        <Link href="/" className="mt-12 block text-center">
          <InteractiveHoverButton>Nazad na Početnu</InteractiveHoverButton>
        </Link>
      </Container>
    </>
  );
}
