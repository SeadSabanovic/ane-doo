import Container from "@/components/layout/container";
import { SOCIALS } from "@/constants/socials";
import Link from "next/link";
import FooterLines from "@/components/icons/footer-lines";
import Image from "next/image";

/** Isti URL kao u kontakt sekciji — otvara lokaciju u Google Maps. */
const MAPS_URL =
  "https://www.google.com/maps?ll=43.843643,18.31726&z=16&t=m&hl=en&gl=BA&mapclient=embed&cid=12238694585567866561";

const footerLinkClass =
  "ease-out duration-200 hover:underline w-fit text-primary-foreground";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-linear-to-r from-primary to-card-foreground text-secondary-foreground lg:max-w-[calc(100%-4rem)] lg:mx-auto lg:mb-8 lg:rounded-lg lg:overflow-hidden w-full">
      <div className="relative overflow-hidden">
        <Container className="relative z-20">
          {/* <!-- footer menu start --> */}
          <div className="flex flex-wrap flex-col md:flex-row xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between py-12 xl:py-24">
            <div className="shrink-0 max-w-sm">
              <Link
                className="shrink-0 text-2xl font-bold text-primary-foreground inline-flex items-center gap-2"
                href="/"
              >
                <Image
                  src="/icons/ANE-logo.svg"
                  alt="ANE d.o.o. Logo"
                  width={40}
                  height={40}
                  priority
                  className="size-10"
                />
                <span className="text-2xl font-bold font-heading">ANE d.o.o.</span>
              </Link>
              <p className="text-primary-foreground/80">
                Pouzdan veleprodajni partner
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full lg:w-auto lg:gap-16">


              {/* Navigacija */}
              <div>
                <h2 className="mb-4 text-accent font-medium text-xl">
                  Navigacija
                </h2>

                <ul className="flex flex-col gap-2 text-primary-foreground">
                  <li>
                    <Link className={footerLinkClass} href="/">
                      Početna
                    </Link>
                  </li>
                  <li>
                    <Link className={footerLinkClass} href="/shop">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link className={footerLinkClass} href="/o-nama">
                      O nama
                    </Link>
                  </li>
                  <li>
                    <Link className={footerLinkClass} href="/kontakt">
                      Kontakt
                    </Link>
                  </li>
                  <li>
                    <Link className={footerLinkClass} href="/spaseno">
                      Spašeno
                    </Link>
                  </li>
                  <li>
                    <Link className={footerLinkClass} href="/narudzba">
                      Narudžba
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Pravne informacije */}
              <div>
                <h2 className="mb-4 text-accent font-medium text-xl">
                  Pravne informacije
                </h2>

                <ul className="flex flex-col gap-2 text-primary-foreground">
                  <li>
                    <Link className={footerLinkClass} href="/politika-privatnosti">
                      Politika privatnosti
                    </Link>
                  </li>
                  <li>
                    <Link className={footerLinkClass} href="/politika-povrata">
                      Politika povrata
                    </Link>
                  </li>
                  <li>
                    <Link className={footerLinkClass} href="/uslovi-koristenja">
                      Uslovi korišćenja
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Informacije i podrška */}
              <div>
                <h2 className="mb-4 text-accent font-medium text-xl">
                  Informacije i podrška
                </h2>

                <ul className="flex flex-col gap-2 text-primary-foreground">
                  <li>
                    <a
                      href="mailto:info@ane-doo.com"
                      className={footerLinkClass}
                    >
                      info@ane-doo.com
                    </a>
                  </li>

                  <li>
                    <a href="tel:+38761101871" className={footerLinkClass}>
                      (+387) 61 101 871
                    </a>
                  </li>

                  <li className="text-primary-foreground/90">
                    Pon–Pet: 08:00 – 16:00
                  </li>

                  <li>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={footerLinkClass}
                    >
                      Ismeta Alajbegovića Šerbe 30,
                      <br />
                      71000 Sarajevo
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </Container>
        <FooterLines />
      </div>


      <div className="py-5 xl:py-7.5 bg-primary text-primary-foreground font-medium z-10">
        <Container className="flex items-center justify-between flex-col md:flex-row gap-4">
          <p>&copy; 2014 - {year} ANE d.o.o. Sva prava zadržana.  ID: 4201939560009</p>

          <div className="flex items-center gap-6">
            {SOCIALS.map((social) => (
              <Link key={social.name} href={social.url} target="_blank">
                <div className="size-5 rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-all duration-200">
                  {social.icon}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
