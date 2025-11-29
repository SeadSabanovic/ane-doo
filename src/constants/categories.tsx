import { MajicaDugih } from "@/components/icons";
import AccessoriesIcon from "@/components/icons/dodaci";
import DonjiVes from "@/components/icons/donji-ves";
import TableIcon from "@/components/icons/table";
import { Bed } from "lucide-react";
import { ReactNode } from "react";

export interface Category {
  id: number;
  title: string;
  path: string;
  icon?: ReactNode;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  title: string;
  path: string;
  icon?: ReactNode;
}

export const categoryData: Category[] = [
  {
    id: 1,
    title: "Odjeća",
    path: "/shop/odjeca",
    icon: <MajicaDugih className="size-6" />,
    subcategories: [
      {
        id: 11,
        title: "Majice",
        path: "/shop/odjeca/majice",
      },
      {
        id: 12,
        title: "Jakne",
        path: "/shop/odjeca/jakne",
      },
      {
        id: 13,
        title: "Prsluci",
        path: "/shop/odjeca/prsluci",
      },
      {
        id: 14,
        title: "Dukserice",
        path: "/shop/odjeca/dukserice",
      },
      {
        id: 15,
        title: "Trenerke",
        path: "/shop/odjeca/trenerke",
      },
      {
        id: 16,
        title: "Pidžame",
        path: "/shop/odjeca/pidzame",
      },
      {
        id: 17,
        title: "Džemperi",
        path: "/shop/odjeca/dzemperi",
      },
      {
        id: 18,
        title: "Helanke",
        path: "/shop/odjeca/helanke",
      },
    ],
  },
  {
    id: 2,
    title: "Donji veš",
    path: "/shop/donji-ves",
    icon: <DonjiVes className="size-6" />,
    subcategories: [
      {
        id: 21,
        title: "Veš",
        path: "/shop/donji-ves/ves",
      },
      {
        id: 22,
        title: "Čarape",
        path: "/shop/donji-ves/carape",
      },
    ],
  },
  {
    id: 3,
    title: "Kućni tekstil",
    path: "/shop/kucni-tekstil",
    icon: <Bed className="size-6" strokeWidth={1} />,
    subcategories: [
      {
        id: 31,
        title: "Posteljine",
        path: "/shop/kucni-tekstil/posteljine",
      },
      {
        id: 32,
        title: "Jastučnice",
        path: "/shop/kucni-tekstil/jastucnice",
      },
      {
        id: 33,
        title: "Jastuci",
        path: "/shop/kucni-tekstil/jastuci",
      },
      {
        id: 34,
        title: "Jorgani",
        path: "/shop/kucni-tekstil/jorgani",
      },
      {
        id: 35,
        title: "Deke",
        path: "/shop/kucni-tekstil/deke",
      },
      {
        id: 36,
        title: "Peškiri",
        path: "/shop/kucni-tekstil/peskiri",
      },
    ],
  },
  {
    id: 4,
    title: "Stolnjaci i mušeme",
    path: "/shop/stolnjaci-i-museme",
    icon: <TableIcon className="size-6" />,
    subcategories: [
      {
        id: 41,
        title: "Stolnjaci",
        path: "/shop/stolnjaci-i-museme/stolnjaci",
      },
      {
        id: 42,
        title: "Mušeme",
        path: "/shop/stolnjaci-i-museme/museme",
      },
    ],
  },
  {
    id: 5,
    title: "Dodaci",
    path: "/shop/dodaci",
    icon: <AccessoriesIcon className="size-6" />,
    subcategories: [
      {
        id: 51,
        title: "Kape",
        path: "/shop/dodaci/kape",
      },
      {
        id: 52,
        title: "Rukavice",
        path: "/shop/dodaci/rukavice",
      },
      {
        id: 53,
        title: "Papuče",
        path: "/shop/dodaci/papuce",
      },
    ],
  },
];
