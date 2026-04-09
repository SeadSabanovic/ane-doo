import { defineField, defineType } from "sanity";
import { REQUIRED_TITLE_SUFFIX } from "../constants/field-labels";

/** Jedna veličina u katalogu (kao kategorija) — proizvodi je biraju referencom. */
export default defineType({
  name: "size",
  title: "Veličina",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: `Naziv (prikaz kupcu)${REQUIRED_TITLE_SUFFIX}`,
      type: "string",
      description:
        "Npr. M, XL, 180 × 200 cm. Isti naziv se koristi u odabiru na sajtu.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: `Slug${REQUIRED_TITLE_SUFFIX}`,
      type: "slug",
      description:
        "VAZNO: Slug je tehnicki identifikator velicine (koristi se za stabilne reference i migracije). Najbolje ga je postaviti jednom i ne mijenjati bez potrebe.",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Redoslijed",
      type: "number",
      description: "Manji broj = ranije u listama u Studiju (opcionalno).",
    }),
  ],
  orderings: [
    {
      title: "Redoslijed",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Naziv A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return { title: title ?? "Veličina", subtitle: subtitle ?? "" };
    },
  },
});
