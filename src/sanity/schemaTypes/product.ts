import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Proizvod",
  type: "document",
  groups: [
    {
      name: "basic",
      title: "Osnovni podaci",
    },
    {
      name: "pricing",
      title: "Cijene",
    },
    {
      name: "media",
      title: "Slike",
    },
    {
      name: "variants",
      title: "Varijante",
    },
    {
      name: "inventory",
      title: "Zalihe",
    },
    {
      name: "details",
      title: "Detalji",
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Naziv proizvoda",
      type: "string",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sku",
      title: "Šifra proizvoda",
      type: "string",
      group: "basic",
      description: "Jedinstvena šifra proizvoda",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis proizvoda",
      type: "text",
      group: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "reference",
      group: "basic",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Oznake",
      type: "array",
      group: "basic",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Ključne riječi za pretragu i filtriranje",
    }),
    defineField({
      name: "price",
      title: "Maloprodajna cijena",
      type: "number",
      group: "pricing",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "salePrice",
      title: "Cijena na popustu",
      type: "number",
      group: "pricing",
      description: "Ako postoji, prikazuje se umjesto regularne cijene",
    }),
    defineField({
      name: "wholesalePrice",
      title: "Veleprodajna cijena",
      type: "number",
      group: "pricing",
      description: "Cijena za veleprodaju",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "wholesaleMinQuantity",
      title: "Minimalna količina za veleprodaju",
      type: "number",
      group: "pricing",
      description: "Minimalan broj komada za veleprodajnu cijenu",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 12,
    }),
    defineField({
      name: "images",
      title: "Slike",
      type: "array",
      group: "media",
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
      group: "variants",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "XS", value: "xs" },
          { title: "S", value: "s" },
          { title: "M", value: "m" },
          { title: "L", value: "l" },
          { title: "XL", value: "xl" },
          { title: "XXL", value: "xxl" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "colors",
      title: "Boje",
      type: "array",
      group: "variants",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Crna", value: "crna" },
          { title: "Bijela", value: "bijela" },
          { title: "Siva", value: "siva" },
          { title: "Plava", value: "plava" },
          { title: "Crvena", value: "crvena" },
          { title: "Zelena", value: "zelena" },
          { title: "Žuta", value: "zuta" },
          { title: "Roze", value: "roze" },
          { title: "Smeđa", value: "smeda" },
          { title: "Narandžasta", value: "narandzasta" },
        ],
      },
    }),
    defineField({
      name: "inStock",
      title: "Na stanju",
      type: "boolean",
      group: "inventory",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Istaknuti proizvod",
      description: 'Prikazuje se u "Najprodavaniji" sekciji',
      type: "boolean",
      group: "inventory",
      initialValue: false,
    }),
    defineField({
      name: "new",
      title: "Novi proizvod",
      description: 'Prikazuje se u "Novo" sekciji',
      type: "boolean",
      group: "inventory",
      initialValue: false,
    }),
    defineField({
      name: "material",
      title: "Materijal",
      type: "string",
      group: "details",
      description: "Npr. 100% pamuk, Poliester, itd.",
    }),
    defineField({
      name: "weight",
      title: "Težina",
      type: "string",
      group: "details",
      description: "Npr. 100g po komadu",
    }),
    defineField({
      name: "originCountry",
      title: "Zemlja porijekla",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Turska", value: "turska" },
          { title: "Indonezija", value: "indonezija" },
        ],
      },
    }),
    defineField({
      name: "specifications",
      title: "Dodatne specifikacije",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Naziv",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "value",
              title: "Vrijednost",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
      description: "Dodatne specifikacije koje nisu pokrivene osnovnim poljima",
    }),
    defineField({
      name: "order",
      title: "Redoslijed",
      type: "number",
      group: "basic",
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
