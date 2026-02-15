import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Proizvod",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Naziv proizvoda",
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
      title: "Opis proizvoda",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Cijena",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "salePrice",
      title: "Cijena na popustu",
      type: "number",
      description: "Ako postoji, prikazuje se umjesto regularne cijene",
    }),
    defineField({
      name: "images",
      title: "Slike",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt tekst",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "sizes",
      title: "Veličine",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "colors",
      title: "Boje",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "inStock",
      title: "Na stanju",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Istaknuti proizvod",
      description: 'Prikazuje se u "Najprodavaniji" sekciji',
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "new",
      title: "Novi proizvod",
      description: 'Prikazuje se u "Novo" sekciji',
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Redosled",
      type: "number",
      description: "Broj za sortiranje (manji = prvi)",
    }),
  ],
  orderings: [
    {
      title: "Naziv A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Cijena najniža",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
    {
      title: "Redosled",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `${subtitle} BAM`,
        media,
      };
    },
  },
});
