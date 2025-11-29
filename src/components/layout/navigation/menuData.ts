import { categoryData } from "@/constants/categories";

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
    path: "/shop",
    submenu: categoryData.map((category) => ({
      id: category.id,
      title: category.title,
      newTab: false,
      path: category.path,
    })),
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
