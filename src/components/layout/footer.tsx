import { Clock, Mail, MapPinned, Phone } from "lucide-react";
import Container from "@/components/layout/container";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden border-t">
      <Container>
        {/* <!-- footer menu start --> */}
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between py-12 xl:py-24">
          <div className="flex-1">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">
              Help & Support
            </h2>

            <ul className="flex flex-col gap-3">
              <li>
                <a href="#" className="flex items-center gap-4.5">
                  <Mail size={24} className="shrink-0 text-primary" />
                  info@ane-doo.com
                </a>
              </li>

              <li>
                <a href="#" className="flex items-center gap-4.5">
                  <Phone size={24} className="shrink-0 text-primary" />
                  (+387) 61 101 871
                </a>
              </li>

              <li>
                <a href="#" className="flex items-center gap-4.5">
                  <Clock size={24} className="shrink-0 text-primary" />
                  8:00 - 16:00
                </a>
              </li>

              <li className="flex gap-4.5">
                <MapPinned size={24} className="shrink-0 text-primary" />
                Ismeta Alajbegovića Šerbe 30,
                <br />
                Sarajevo 71000
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">
              Account
            </h2>

            <ul className="flex flex-col gap-3">
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  My Account
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Login / Register
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Cart
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Wishlist
                </a>
              </li>
              <li>
                <a className="ease-out duration-200 hover:text-blue" href="#">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">
              Brzi Linkovi
            </h2>

            <ul className="flex flex-col gap-3">
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
                  Često postavljena pitanja
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

      <div className="py-5 xl:py-7.5 bg-gray-50">
        <Container>
          <p>&copy; 2000 - {year} ANE D.O.O. Sva prava zadržana.</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
