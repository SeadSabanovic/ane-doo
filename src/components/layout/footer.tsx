import Container from "@/components/layout/container";
import { SOCIALS } from "@/constants/socials";
import Link from "next/link";
import FooterLines from "@/components/icons/footer-lines";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-linear-to-r from-primary to-card-foreground text-secondary-foreground lg:max-w-[calc(100%-4rem)] lg:mx-auto lg:mb-8 lg:rounded-lg lg:overflow-hidden w-full">
            <div className="relative overflow-hidden">
                <Container className="relative z-20">
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
                            <h2 className="mb-4 text-accent font-medium text-xl">ANE d.o.o.</h2>

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
                <FooterLines />
            </div>


            <div className="py-5 xl:py-7.5 bg-primary text-primary-foreground font-medium z-10">
                <Container className="flex items-center justify-between flex-col md:flex-row gap-4">
                    <p>&copy; 2014 - {year} ANE d.o.o. Sva prava zadržana.</p>

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
