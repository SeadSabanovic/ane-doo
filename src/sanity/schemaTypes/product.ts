import { defineType, defineField } from "sanity";
import { SelectAllArrayInput } from "../components/select-all-array-input";
import { TagsInput } from "../components/tags-input";

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
  fieldsets: [
    {
      name: "basic",
      title: "Osnovni podaci",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "pricing",
      title: "Cijene",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "media",
      title: "Slike",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "variants",
      title: "Varijante",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "inventory",
      title: "Zalihe",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "details",
      title: "Detalji",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Naziv proizvoda",
      type: "string",
      group: "basic",
      fieldset: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      fieldset: "basic",
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
      fieldset: "basic",
      description: "Jedinstvena šifra proizvoda",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis proizvoda",
      type: "text",
      group: "basic",
      fieldset: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategorija",
      type: "reference",
      group: "basic",
      fieldset: "basic",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Oznake",
      type: "array",
      group: "basic",
      fieldset: "basic",
      of: [{ type: "string" }],
      components: {
        input: TagsInput,
      },
      description: "Ključne riječi za pretragu i filtriranje",
    }),
    defineField({
      name: "price",
      title: "Maloprodajna cijena (regularna)",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "Samo za proizvode na akciji – originalna cijena prije popusta. Ostavite prazno za veleprodajne-only artikle.",
    }),
    defineField({
      name: "salePrice",
      title: "Maloprodajna cijena (na akciji)",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "Ako unesete – artikal je na akciji i omogućena je maloprodaja (kupovina po komadu). Bez ovog polja artikal je isključivo veleprodaja.",
    }),
    defineField({
      name: "wholesalePrice",
      title: "Veleprodajna cijena",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description: "Cijena po komadu za veleprodaju",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "wholesaleMinQuantity",
      title: "Komada u paketu",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description: "Broj komada u jednom veleprodajnom paketu",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 12,
    }),
    defineField({
      name: "images",
      title: "Slike",
      type: "array",
      group: "media",
      fieldset: "media",
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
      fieldset: "variants",
      components: {
        input: SelectAllArrayInput,
      },
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
      description:
        "Veleprodaja: veličine u paketu. Maloprodaja: dostupne opcije za odabir.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "colors",
      title: "Boje",
      type: "array",
      group: "variants",
      fieldset: "variants",
      components: {
        input: SelectAllArrayInput,
      },
      of: [{ type: "string" }],
      description:
        "Veleprodaja: boje u paketu. Maloprodaja: dostupne opcije za odabir.",
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
      fieldset: "inventory",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Istaknuti proizvod",
      description: 'Prikazuje se u "Najprodavaniji" sekciji',
      type: "boolean",
      group: "inventory",
      fieldset: "inventory",
      initialValue: false,
    }),
    defineField({
      name: "new",
      title: "Novi proizvod",
      description: 'Prikazuje se u "Novo" sekciji',
      type: "boolean",
      group: "inventory",
      fieldset: "inventory",
      initialValue: false,
    }),
    defineField({
      name: "material",
      title: "Materijal",
      type: "string",
      group: "details",
      fieldset: "details",
      description: "Npr. 100% pamuk, Poliester, itd.",
    }),
    defineField({
      name: "weight",
      title: "Težina",
      type: "string",
      group: "details",
      fieldset: "details",
      description: "Npr. 100g po komadu",
    }),
    defineField({
      name: "originCountry",
      title: "Zemlja porijekla",
      type: "string",
      group: "details",
      fieldset: "details",
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
      fieldset: "details",
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
              description: "Opciono – npr. za „Vodootporna” ostavi prazno",
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
      fieldset: "basic",
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
      firstImage: "images.0",
      firstImageAsset: "images.0.asset",
    },
    prepare({ title, subtitle, firstImage, firstImageAsset }) {
      return {
        title,
        subtitle: `${subtitle} BAM`,
        media: firstImage ?? firstImageAsset,
      };
    },
  },
});
