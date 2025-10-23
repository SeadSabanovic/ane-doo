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
    title: "Prodaja",
    newTab: false,
    path: "/",
  },
  {
    id: 3,
    title: "Kontakt",
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
        title: "Shop With Sidebar",
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
