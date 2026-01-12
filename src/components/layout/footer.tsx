import Container from "@/components/layout/container";
import { SOCIALS } from "@/constants/socials";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-primary to-card-foreground text-secondary-foreground">
      <Container>
        {/* <!-- footer menu start --> */}
        <div className="flex flex-wrap flex-col md:flex-row xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between py-12 xl:py-24">
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-4 text-accent font-medium text-xl">
              Informacije i podrška
            </h2>

            <ul className="flex flex-col gap-2 text-primary-foreground">
              <li>
                <a href="#" className="w-fit">
                  info@ane-doo.com
                </a>
              </li>

              <li>
                <a href="#" className="w-fit">
                  (+387) 61 101 871
                </a>
              </li>

              <li>
                <a href="#" className="w-fit">
                  08:00 - 16:00
                </a>
              </li>

              <li className="md:w-fit">
                Ismeta Alajbegovića Šerbe 30,
                <br />
                Sarajevo 71000
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h2 className="mb-4 text-accent font-medium text-xl">Linkovi</h2>

            <ul className="flex flex-col gap-2 text-primary-foreground">
              <li>
                <a className="ease-out duration-200 hover:underline" href="#">
                  Početna
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:underline" href="#">
                  Shop
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:underline" href="#">
                  O Nama
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:underline" href="#">
                  Često postavljena pitanja
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h2 className="mb-4 text-accent font-medium text-xl">ANE D.O.O.</h2>

            <ul className="flex flex-col gap-2 text-primary-foreground">
              <li>
                <a className="ease-out duration-200 hover:underline" href="#">
                  Politika privatnosti
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:underline" href="#">
                  Politika povrata
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:underline" href="#">
                  Uslovi korišćenja
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:underline" href="#">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="py-5 xl:py-7.5 bg-accent text-accent-foreground font-medium">
        <Container className="flex items-center justify-between flex-col md:flex-row gap-4">
          <p>&copy; 2000 - {year} ANE D.O.O. Sva prava zadržana.</p>

          <div className="flex items-center gap-6">
            {SOCIALS.map((social) => (
              <Link key={social.name} href={social.url} target="_blank">
                <div className="size-5 rounded-full flex items-center justify-center text-primary hover:scale-110 transition-all duration-200">
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
