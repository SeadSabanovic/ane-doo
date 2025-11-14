export const menuData: Array<{
  id: number;
  title: string;
  newTab: boolean;
  path: string;
  submenu?: {
    id: number;
    title: string;
    newTab: boolean;
    path: string;
  }[];
}> = [
  {
    id: 1,
    title: "Početna",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Shop",
    newTab: false,
    path: "/shop",
  },
  {
    id: 3,
    title: "Kategorije",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 31,
        title: "Muška odjeća",
        newTab: false,
        path: "/",
      },
      {
        id: 32,
        title: "Ženska odjeća",
        newTab: false,
        path: "/",
      },
      {
        id: 33,
        title: "Dječija odjeća",
        newTab: false,
        path: "/",
      },
      {
        id: 34,
        title: "Sportska odjeća",
        newTab: false,
        path: "/",
      },
    ],
  },
  {
    id: 4,
    title: "O Nama",
    newTab: false,
    path: "/o-nama",
  },
  {
    id: 5,
    title: "Kontakt",
    newTab: false,
    path: "/kontakt",
  },
];
