import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Kategorija",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naziv kategorije",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis kategorije",
      type: "text",
    }),
    defineField({
      name: "isParent",
      title: "Glavna kategorija",
      type: "boolean",
      description: "Da li je ovo glavna kategorija (parent) ili podkategorija",
      initialValue: false,
    }),
    defineField({
      name: "parent",
      title: "Nadređena kategorija",
      type: "reference",
      to: [{ type: "category" }],
      description:
        "Izaberi glavnu kategoriju (ostavi prazno ako je ovo glavna kategorija)",
      hidden: ({ document }) => document?.isParent === true,
      validation: (Rule) =>
        Rule.custom((parent, context) => {
          const isParent = (context.document as any)?.isParent;
          if (!isParent && !parent) {
            return "Podkategorija mora imati nadređenu kategoriju";
          }
          return true;
        }),
    }),
    defineField({
      name: "image",
      title: "Slika kategorije",
      type: "image",
      description: "Slika se koristi za glavne kategorije u Browse sekciji",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "icon",
      title: "Ikona",
      type: "string",
      description: "Naziv ikone (opcionalno, za navigaciju)",
    }),
    defineField({
      name: "order",
      title: "Redoslijed",
      type: "number",
      description: "Broj za sortiranje kategorija (manji = prvi)",
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
      media: "image",
      isParent: "isParent",
      parent: "parent.name",
    },
    prepare({ title, subtitle, media, isParent, parent }) {
      return {
        title,
        subtitle: isParent
          ? "Glavna kategorija"
          : parent
            ? `Podkategorija → ${parent}`
            : subtitle,
        media,
      };
    },
  },
});
