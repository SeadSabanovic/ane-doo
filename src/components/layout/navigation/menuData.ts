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
    path: "/",
  },
  {
    id: 6,
    title: "Kategorije",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Muška odjeća",
        newTab: false,
        path: "/",
      },
      {
        id: 62,
        title: "Ženska odjeća",
        newTab: false,
        path: "/",
      },
      {
        id: 63,
        title: "Dječja odjeća",
        newTab: false,
        path: "/",
      },
      {
        id: 64,
        title: "Sportska odjeća",
        newTab: false,
        path: "/",
      },
    ],
  },
  {
    id: 9,
    title: "O Nama",
    newTab: false,
    path: "/",
  },
];
