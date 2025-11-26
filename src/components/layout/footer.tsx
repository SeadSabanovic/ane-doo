import { Clock, Mail, MapPinned, Phone } from "lucide-react";
import Container from "@/components/layout/container";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-muted bg-linear-to-r from-primary to-card-foreground">
      <Container>
        {/* <!-- footer menu start --> */}
        <div className="flex flex-wrap flex-col md:flex-row xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between py-12 xl:py-24">
          <div className="flex-1">
            <h2 className="mb-4 text-accent font-medium text-xl">
              Informacije i podrška
            </h2>

            <ul className="flex flex-col gap-2 text-secondary">
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

              <li className="w-fit">
                Ismeta Alajbegovića Šerbe 30,
                <br />
                Sarajevo 71000
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-accent font-medium text-xl">Linkovi</h2>

            <ul className="flex flex-col gap-2 text-secondary">
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Početna
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Shop
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  O Nama
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Često postavljena pitanja
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-accent font-medium text-xl">ANE D.O.O.</h2>

            <ul className="flex flex-col gap-2 text-secondary">
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Politika privatnosti
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Politika povrata
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Uslovi korišćenja
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="py-5 xl:py-7.5 bg-linear-to-r from-secondary to-secondary-muted text-secondary-foreground">
        <Container>
          <p>&copy; 2000 - {year} ANE D.O.O. Sva prava zadržana.</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
