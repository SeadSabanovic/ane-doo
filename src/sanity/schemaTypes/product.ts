import { defineType, defineField } from "sanity";
import { SelectAllArrayInput } from "../components/select-all-array-input";
import { TagsInput } from "../components/tags-input";
import { AltTextWithGenerate } from "../components/alt-text-with-generate";
import { FilteredPackageColorInput } from "../components/filtered-package-color-input";
import { FilteredPackageSizeInput } from "../components/filtered-package-size-input";
import {
  PRODUCT_COLOR_OPTIONS,
  PRODUCT_SIZE_OPTIONS,
} from "../../constants/product-variants";

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
      name: "packageInfo",
      title: "Informacije o paketu",
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
      name: "packageInfo",
      title: "Informacije o paketu",
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
      name: "wholesalePrice",
      title: "Veleprodajna cijena (po komadu)",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "Glavna referentna cijena po komadu za veleprodaju. Uvijek je prva u listi.",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "salePrice",
      title: "Cijena na akciji (po komadu)",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "Akcijska cijena po komadu – odnosi se samo na veleprodaju (na sajtu: precrtana veleprodajna + akcijska). Ne utiče na maloprodajnu cijenu.",
    }),
    defineField({
      name: "retailPrice",
      title: "Maloprodajna cijena (po komadu)",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "Ako je popunjeno, na sajtu se prikazuje maloprodaja (fiksna cijena po komadu, bez akcije). Treba biti veća od veleprodajne.",
      validation: (Rule) =>
        Rule.custom((retailPrice, context) => {
          const doc = context.document as {
            wholesalePrice?: number;
          };
          if (
            retailPrice != null &&
            typeof doc.wholesalePrice === "number" &&
            retailPrice <= doc.wholesalePrice
          ) {
            return "Maloprodajna cijena mora biti veća od veleprodajne cijene";
          }
          return true;
        }),
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
            defineField({
              name: "alt",
              title: "Alt tekst",
              type: "string",
              description:
                "Za SEO i pristupačnost. Generiši puni tekst iz naziva proizvoda.",
              components: {
                input: AltTextWithGenerate,
              },
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "wholesaleMinQuantity",
      title: "Komada u paketu",
      type: "number",
      group: "packageInfo",
      fieldset: "packageInfo",
      description: "Broj komada u jednom veleprodajnom paketu (mora se slagati sa zbrojem u rasporedu ispod).",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 12,
    }),
    defineField({
      name: "sizes",
      title: "Veličine",
      type: "array",
      group: "packageInfo",
      fieldset: "packageInfo",
      components: {
        input: SelectAllArrayInput,
      },
      of: [{ type: "string" }],
      options: {
        list: [...PRODUCT_SIZE_OPTIONS],
      },
      description:
        "Koje veličine ulaze u ponudu: veleprodaja (sadržaj paketa) i maloprodaja (odabir kupca). Za nestandardne veličine koristite polje ispod.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "customSizes",
      title: "Dodatne veličine (proizvoljno)",
      type: "array",
      group: "packageInfo",
      fieldset: "packageInfo",
      of: [{ type: "string" }],
      components: {
        input: TagsInput,
      },
      description:
        "Slobodan unos ako veličina nije na listi (npr. 220×240 cm, poseban kroj). Pojavit će se u rasporedu paketa zajedno s odabranim veličinama.",
    }),
    defineField({
      name: "colors",
      title: "Boje",
      type: "array",
      group: "packageInfo",
      fieldset: "packageInfo",
      components: {
        input: SelectAllArrayInput,
      },
      of: [{ type: "string" }],
      description:
        "Koje boje ulaze u ponudu: veleprodaja (sadržaj paketa) i maloprodaja (odabir kupca).",
      options: {
        list: [...PRODUCT_COLOR_OPTIONS],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "packageContents",
      title: "Raspored sadržaja paketa",
      type: "array",
      group: "packageInfo",
      fieldset: "packageInfo",
      description:
        "Za svaku kombinaciju veličine i boje unesite koliko komada ulazi u jedan paket. Zbroj mora biti jednak polju „Komada u paketu” iznad.",
      of: [
        {
          type: "object",
          name: "packageContentLine",
          fields: [
            defineField({
              name: "size",
              title: "Veličina",
              type: "string",
              components: {
                input: FilteredPackageSizeInput,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "color",
              title: "Boja",
              type: "string",
              components: {
                input: FilteredPackageColorInput,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "quantity",
              title: "Komada",
              type: "number",
              initialValue: 1,
              validation: (Rule) => Rule.required().integer().min(1),
            }),
          ],
          preview: {
            select: {
              size: "size",
              color: "color",
              quantity: "quantity",
            },
            prepare({ size, color, quantity }) {
              const s = typeof size === "string" ? size.toUpperCase() : "";
              return {
                title: `${quantity ?? "?"}× ${s} · ${color ?? ""}`,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((lines, context) => {
          const doc = context.document as {
            wholesaleMinQuantity?: number;
            sizes?: string[];
            customSizes?: string[];
            colors?: string[];
          };
          const min = doc?.wholesaleMinQuantity;
          const arr = lines as
            | { size?: string; color?: string; quantity?: number }[]
            | undefined;
          if (!arr?.length) return true;

          const allowedSizes = new Set([
            ...(doc.sizes || []),
            ...(doc.customSizes || []),
          ]);
          const allowedColors = new Set(doc.colors || []);

          for (let i = 0; i < arr.length; i++) {
            const line = arr[i];
            if (!line?.size || !allowedSizes.has(line.size)) {
              return `Red ${i + 1}: veličina mora biti među odabranim u Veličine / Dodatne veličine.`;
            }
            if (!line?.color || !allowedColors.has(line.color)) {
              return `Red ${i + 1}: boja mora biti među odabranim u Boje.`;
            }
          }

          const sum = arr.reduce(
            (s, l) => s + (typeof l.quantity === "number" ? l.quantity : 0),
            0,
          );
          if (typeof min === "number" && sum !== min) {
            return `Zbroj komada u rasporedu (${sum}) mora biti jednak „Komada u paketu” (${min}).`;
          }
          return true;
        }),
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
  ],
  orderings: [
    {
      title: "Naziv A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Veleprodajna cijena (rastuća)",
      name: "wholesalePriceAsc",
      by: [{ field: "wholesalePrice", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      wholesalePrice: "wholesalePrice",
      firstImage: "images.0",
      firstImageAsset: "images.0.asset",
    },
    prepare({ title, wholesalePrice, firstImage, firstImageAsset }) {
      return {
        title,
        subtitle:
          typeof wholesalePrice === "number"
            ? `${wholesalePrice} BAM / kom (veleprodaja)`
            : undefined,
        media: firstImage ?? firstImageAsset,
      };
    },
  },
});
