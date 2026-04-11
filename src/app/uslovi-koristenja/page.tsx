import Container from "@/components/layout/container";
import PageHeader from "@/components/layout/page-header";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uslovi Korištenja",
  description:
    "Uslovi korištenja online trgovine ANE d.o.o. Sarajevo – informacije o naručivanju, plaćanju, dostavi i zaštiti podataka.",
  alternates: {
    canonical: "/uslovi-koristenja",
  },
};

export default function UsloviKoristenjaPage() {
  return (
    <>
      <PageHeader
        title="Uslovi Korištenja"
        description="Uslovi Korištenja internet stranice www.ane-doo.com"
        breadcrumbItems={[
          { label: "Početna", href: "/" },
          { label: "Uslovi Korištenja", href: "/uslovi-koristenja" },
        ]}
      />
      <Container className="max-w-3xl pb-20">
        <article className="text-foreground mx-auto">
          <p>
            <strong>ANE d.o.o.</strong> Sarajevo pruža uslugu putem internet
            stranice na domeni www.ane-doo.com (u daljem tekstu: &quot;Online
            trgovina&quot;). Usluga se sastoji iz pružanja informacija o
            proizvodima, online naručivanja, te upravljanja sadržajem stranice.
          </p>

          <p>
            Uslovi korištenja napravljeni su u skladu sa Zakonom o zaštiti
            potrošača u Bosni i Hercegovini i međunarodnim običajima online
            poslovanja.
          </p>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              1. Opšte odredbe
            </h2>
            <p>
              Korištenjem ove online trgovine, svaki korisnik potvrđuje da je
              pročitao uslove korištenja te da iste prihvata. Ukoliko se
              korisnik ne slaže sa uslovima, treba se suzdržati od korištenja
              stranice. Online trgovina je dostupna 24h dnevno, osim u
              slučajevima tehničkog održavanja ili ažuriranja podataka.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              2. Cijene i valuta
            </h2>
            <p>
              Sve cijene navedene na stranici izražene su u BAM (Konvertibilna
              marka) valuti sa uračunatim PDV-om. Cijene vrijede u trenutku
              slanja narudžbe. ANE d.o.o. zadržava pravo promjene cijena u
              slučaju tehničkih grešaka ili promjena na tržištu.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              3. Način plaćanja i dostava
            </h2>
            <p>
              Budući da stranica ne podržava direktno online plaćanje karticama,
              plaćanje se vrši na sljedeće načine:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                <strong>Gotovinski (Pouzećem):</strong> Plaćanje kuriru prilikom
                preuzimanja pošiljke.
              </li>
              <li>
                <strong>Žiralno (Virmanski):</strong> Na osnovu predračuna,
                direktno na bankovni račun firme ANE d.o.o. (isključivo za
                pravna lica i prethodno dogovorene narudžbe).
              </li>
            </ul>
            <p className="mt-3">
              Korisnik koji izvrši narudžbu automatski prihvata uslove dostave
              koji su definisani unutar procesa naručivanja.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              4. Tačnost podataka i fotografije
            </h2>
            <p>
              Nastojimo pružiti što tačnije informacije i precizne opise
              proizvoda. Ipak, fotografije artikala mogu biti ilustrativne
              prirode i ne moraju u potpunosti odgovarati stvarnom izgledu
              proizvoda (zbog različitih kalibracija ekrana ili serija
              proizvodnje). Podaci o proizvodima su podložni promjenama bez
              prethodne najave.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              5. Intelektualno vlasništvo
            </h2>
            <p>
              Sav sadržaj na domeni www.ane-doo.com, uključujući logotipe,
              tekstove, fotografije i dizajn, privatno je vlasništvo firme ANE
              d.o.o. Sarajevo, ID: 4201939560009. Svako neovlašteno kopiranje,
              distribucija ili korištenje materijala bez pismene dozvole
              vlasnika je strogo zabranjeno.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">6. Odgovornost</h2>
            <p>
              ANE d.o.o. nije odgovoran za bilo kakvu štetu na opremi korisnika
              nastalu prilikom korištenja stranice, niti za greške nastale
              usljed prekida internet konekcije, računarskih virusa ili
              neovlaštenog pristupa podacima.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              7. Privatnost (Bez kolačića)
            </h2>
            <p>
              Vaša privatnost nam je prioritet. Ova web stranica ne koristi
              kolačiće (cookies) za praćenje korisnika. Prikupljamo isključivo
              podatke koji su neophodni za realizaciju vaše narudžbe (ime,
              adresa, broj telefona) i iste ne dijelimo sa trećim stranama, osim
              sa kurirskom službom radi dostave.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-xl font-semibold">
              8. Kontakt i podrška
            </h2>
            <p>
              Za sve dodatne informacije, reklamacije ili pitanja, možete nas
              kontaktirati putem:
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

        <InteractiveHoverButton href="/" className="mt-12 block text-center">
          Nazad na Početnu
        </InteractiveHoverButton>
      </Container>
    </>
  );
}
