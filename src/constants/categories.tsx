export interface Category {
  id: number;
  title: string;
  path: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: number;
  title: string;
  path: string;
}

export const categoryData: Category[] = [
  {
    id: 1,
    title: "Odjeća",
    path: "/katalog/odjeca",
    subcategories: [
      {
        id: 11,
        title: "Majice",
        path: "/katalog/odjeca/majice",
      },
      {
        id: 12,
        title: "Jakne",
        path: "/katalog/odjeca/jakne",
      },
      {
        id: 13,
        title: "Prsluci",
        path: "/katalog/odjeca/prsluci",
      },
      {
        id: 14,
        title: "Dukserice",
        path: "/katalog/odjeca/dukserice",
      },
      {
        id: 15,
        title: "Trenerke",
        path: "/katalog/odjeca/trenerke",
      },
      {
        id: 16,
        title: "Pidžame",
        path: "/katalog/odjeca/pidzame",
      },
      {
        id: 17,
        title: "Džemperi",
        path: "/katalog/odjeca/dzemperi",
      },
      {
        id: 18,
        title: "Helanke",
        path: "/katalog/odjeca/helanke",
      },
    ],
  },
  {
    id: 2,
    title: "Donji veš",
    path: "/katalog/donji-ves",
    subcategories: [
      {
        id: 21,
        title: "Veš",
        path: "/katalog/donji-ves/ves",
      },
      {
        id: 22,
        title: "Čarape",
        path: "/katalog/donji-ves/carape",
      },
    ],
  },
  {
    id: 3,
    title: "Kućni tekstil",
    path: "/katalog/kucni-tekstil",
    subcategories: [
      {
        id: 31,
        title: "Posteljine",
        path: "/katalog/kucni-tekstil/posteljine",
      },
      {
        id: 32,
        title: "Jastučnice",
        path: "/katalog/kucni-tekstil/jastucnice",
      },
      {
        id: 33,
        title: "Jastuci",
        path: "/katalog/kucni-tekstil/jastuci",
      },
      {
        id: 34,
        title: "Jorgani",
        path: "/katalog/kucni-tekstil/jorgani",
      },
      {
        id: 35,
        title: "Deke",
        path: "/katalog/kucni-tekstil/deke",
      },
      {
        id: 36,
        title: "Peškiri",
        path: "/katalog/kucni-tekstil/peskiri",
      },
    ],
  },
  {
    id: 4,
    title: "Stolnjaci i mušeme",
    path: "/katalog/stolnjaci-i-museme",
    subcategories: [
      {
        id: 41,
        title: "Stolnjaci",
        path: "/katalog/stolnjaci-i-museme/stolnjaci",
      },
      {
        id: 42,
        title: "Mušeme",
        path: "/katalog/stolnjaci-i-museme/museme",
      },
    ],
  },
  {
    id: 5,
    title: "Dodaci",
    path: "/katalog/dodaci",
    subcategories: [
      {
        id: 51,
        title: "Kape",
        path: "/katalog/dodaci/kape",
      },
      {
        id: 52,
        title: "Rukavice",
        path: "/katalog/dodaci/rukavice",
      },
      {
        id: 53,
        title: "Papuče",
        path: "/katalog/dodaci/papuce",
      },
    ],
  },
];
