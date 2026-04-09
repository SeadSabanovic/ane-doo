import { defineType, defineField, defineArrayMember } from "sanity";
import { TagsInput } from "../components/tags-input";
import { AltTextWithGenerate } from "../components/alt-text-with-generate";
import { DescriptionWithCharCount } from "../components/description-with-char-count";
import { WholesalePricePerPackageInput } from "../components/wholesale-pricing-inputs";
import {
  REQUIRED_TITLE_SUFFIX,
  WHOLESALE_PACKAGE_TITLE_SUFFIX,
  WHOLESALE_PRICE_TITLE_SUFFIX,
} from "../constants/field-labels";
import {
  getDocumentForValidation,
  getWholesaleBaseUnit,
  hasValidWholesaleQty,
  isFiniteNumber,
  isPositivePrice,
  normalizeWholesaleQty,
  wholesaleFieldsReadOnly,
} from "../utils/wholesale-validation";

const MSG_WHOLESALE_NO_QTY_PIECE =
  "Bez „Komada u paketu” (cijeli broj ≥1) ova cijena ne smije postojati. Unesite broj komada ili kliknite „Obriši veleprodajne cijene” ispod polja za cijenu po paketu.";

const MSG_WHOLESALE_NO_QTY_PACKAGE =
  "Bez „Komada u paketu” (cijeli broj ≥1) ova cijena ne smije postojati. Unesite broj komada ili kliknite „Obriši veleprodajne cijene” ispod polja za cijenu po paketu.";

const MSG_SALE_NO_QTY =
  "Bez „Komada u paketu” (cijeli broj ≥1) akcija ne smije postojati. Unesite broj komada ili kliknite „Obriši veleprodajne cijene” ispod polja za cijenu po paketu.";

const MSG_WHOLESALE_PRICING_REQUIRED =
  "Kad je unesen broj komada u paketu, unesite veleprodajnu cijenu po komadu i/ili po paketu, ili maloprodajnu/akcijsku cijenu — ne ostavljajte sva cijenska polja prazna.";

export default defineType({
  name: "product",
  title: "Proizvod",
  type: "document",
  validation: (Rule) =>
    Rule.custom((doc) => {
      const d = doc as {
        retailPrice?: number;
        salePrice?: number;
        wholesalePrice?: number;
        wholesalePricePerPackage?: number;
        wholesaleMinQuantity?: number;
      } | null;
      if (!d) return true;

      const hasValidQty = normalizeWholesaleQty(d.wholesaleMinQuantity) != null;

      const hasWPiece = isFiniteNumber(d.wholesalePrice);
      const hasWPackage = isFiniteNumber(d.wholesalePricePerPackage);
      const hasSale = isPositivePrice(d.salePrice);
      const hasRetail = isPositivePrice(d.retailPrice);

      // Bez „Komada u paketu”: greške na pojedinačnim poljima; ovdje samo maloprodaja kad nema ničeg.
      if (!hasValidQty) {
        if (!hasWPiece && !hasWPackage && !hasSale && !hasRetail) {
          return "Kad ne prodajete na veleprodaju (prazno „Komada u paketu”), maloprodajna cijena (po komadu) je obavezna.";
        }
        return true;
      }

      // Uz „Komada u paketu”: treba barem jedna cijena (veleprodaja po komadu i/ili po paketu, ili maloprodaja, ili akcija).
      if (!hasWPiece && !hasWPackage && !hasRetail && !hasSale) {
        return MSG_WHOLESALE_PRICING_REQUIRED;
      }

      // Ako su oba veleprodajna iznosa unesena, trebaju se slagati s formulom.
      if (hasWPiece && hasWPackage && hasValidQty) {
        const qty = normalizeWholesaleQty(d.wholesaleMinQuantity)!;
        const expected = d.wholesalePrice! * qty;
        if (Math.abs(expected - d.wholesalePricePerPackage!) > 0.02) {
          return "Cijena po paketu ne odgovara (cijena po komadu) × (komada u paketu). Ispravite jedno od polja ili koristite dugme za izračun.";
        }
      }

      const baseUnit = getWholesaleBaseUnit(d);

      if (
        hasRetail &&
        baseUnit != null &&
        (d.retailPrice as number) <= baseUnit
      ) {
        return "Maloprodajna cijena mora biti veća od veleprodajne (referentno po komadu).";
      }

      if (hasSale) {
        if (baseUnit == null) {
          return "Akcijska cijena zahtijeva veleprodajnu cijenu po komadu ili po paketu (s komada u paketu).";
        }
        if (d.salePrice! >= baseUnit) {
          return "Akcijska cijena mora biti niža od veleprodajne (po komadu).";
        }
      }

      return true;
    }),
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
      title: `Naziv proizvoda${REQUIRED_TITLE_SUFFIX}`,
      type: "string",
      group: "basic",
      fieldset: "basic",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: `Slug${REQUIRED_TITLE_SUFFIX}`,
      type: "slug",
      group: "basic",
      fieldset: "basic",
      description:
        "VAZNO: Slug je jedinstveni URL identifikator proizvoda (npr. /katalog/ime-proizvoda). Mijenjanje sluga nakon objave mijenja link proizvoda i moze pokvariti stare linkove, SEO i dijeljenje.",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sku",
      title: `Šifra proizvoda${REQUIRED_TITLE_SUFFIX}`,
      type: "string",
      group: "basic",
      fieldset: "basic",
      description:
        "Jedinstvena šifra proizvoda (koristi se samo za internu upotrebu i ne prikazuje se na sajtu; primarni cilj lakša pretraga)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: `Opis proizvoda${REQUIRED_TITLE_SUFFIX}`,
      type: "text",
      group: "basic",
      fieldset: "basic",
      components: {
        input: DescriptionWithCharCount,
      },
      description:
        "Opis koji kupac vidi na stranici proizvoda. SEO preporuka: ciljajte 150-300 karaktera (jasno, konkretno, bez nabrajanja kljucnih rijeci).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: `Kategorija${REQUIRED_TITLE_SUFFIX}`,
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
      description:
        "Unesite 3-5 kratkih pojmova koje kupci stvarno pretražuju (npr. materijal, stil, namjena). Oznake pomažu pretrazi i filtriranju na sajtu, pa izbjegavajte duge rečenice i duplikate.",
    }),
    defineField({
      name: "wholesaleMinQuantity",
      title: "Komada u paketu",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "PRAVILO: Prazno polje = nemate veleprodaju — tada su prazna veleprodajna polja zaključana u Studiju; ako već postoje stare vrijednosti bez broja komada, polja su otključana da možete obrisati ili unijeti „Komada u paketu”. Maloprodajna cijena ispod je obavezna kad nema veleprodaje.\n\n" +
        "Ako unesete cijeli broj ≥ 1, otvara se veleprodaja: na sajtu se veleprodaja prikazuje pretežno preko cijene po komadu; cijena po paketu je opcionalna (korisno za kontrolu formule).\n\n" +
        "Broj se koristi za tekst tipa „1 paket = n komada” i za formulu: cijena po paketu ≈ cijena po komadu × ovaj broj (ako oba unesete).",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = getDocumentForValidation(context);
          if (value == null) {
            return true;
          }
          if (normalizeWholesaleQty(value) == null) {
            return "Mora biti cijeli broj ≥ 1 ili prazno (samo maloprodaja).";
          }
          // Kad je veleprodaja uključena, ova validacija se okida odmah (ne samo kad korisnik dirne polja za cijene).
          if (!doc) return true;
          const hasPiece = isFiniteNumber(doc.wholesalePrice);
          const hasPkg = isFiniteNumber(doc.wholesalePricePerPackage);
          const hasRetail = isPositivePrice(doc.retailPrice);
          const hasSale = isPositivePrice(doc.salePrice);

          if (!hasPiece && !hasPkg && !hasRetail && !hasSale) {
            return MSG_WHOLESALE_PRICING_REQUIRED;
          }
          if (hasPiece && hasPkg) {
            const qty = normalizeWholesaleQty(value)!;
            const wp = doc.wholesalePrice as number;
            const wpp = doc.wholesalePricePerPackage as number;
            const expected = wp * qty;
            if (Math.abs(expected - wpp) > 0.02) {
              return "Cijena po paketu ne odgovara (cijena po komadu) × (komada u paketu). Ispravite jedno od polja ili koristite dugme za izračun.";
            }
          }
          return true;
        }),
    }),
    defineField({
      name: "wholesalePrice",
      title: `Veleprodajna cijena (po komadu)${WHOLESALE_PRICE_TITLE_SUFFIX}`,
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "OBVEZNO kad je „Komada u paketu” unesen (≥1), osim ako prodajete samo maloprodajno ili akciju bez veleprodajnih cijena — tada unesite maloprodajnu/akcijsku cijenu.\n\n" +
        "Na sajtu se veleprodaja prikazuje preko ove cijene po komadu (glavna vrijednost).\n\n" +
        "Mora postojati „Komada u paketu” (≥1). Cijena po paketu je opcionalna; ako oba unesete, trebaju odgovarati formuli (vidi polje ispod).\n\n" +
        "Možete koristiti dugme ispod polja za cijenu po paketu da izračunate paket iz po komadu × komada ili obrnuto.",
      readOnly: ({ document, parent }) =>
        wholesaleFieldsReadOnly(document ?? parent),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = getDocumentForValidation(context);
          if (!doc) {
            return "Validacija nema pristup dokumentu (osvježite Studio ili kontaktirajte podršku).";
          }

          if (!hasValidWholesaleQty(doc)) {
            if (isFiniteNumber(value)) return MSG_WHOLESALE_NO_QTY_PIECE;
            return true;
          }

          const hasPiece = isFiniteNumber(value);
          const hasPkg = isFiniteNumber(doc.wholesalePricePerPackage);
          const hasRetail = isPositivePrice(doc.retailPrice);
          const hasSale = isPositivePrice(doc.salePrice);

          if (!hasPiece && !hasPkg && !hasRetail && !hasSale) {
            return MSG_WHOLESALE_PRICING_REQUIRED;
          }

          return true;
        }).min(0),
    }),
    defineField({
      name: "wholesalePricePerPackage",
      title: `Veleprodajna cijena (po paketu)${WHOLESALE_PACKAGE_TITLE_SUFFIX}`,
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      components: {
        input: WholesalePricePerPackageInput,
      },
      description:
        "Opcionalno. Ukupna cijena cijelog veleprodajnog paketa. Na sajtu se cijena po komadu koristi za prikaz; ovo polje je korisno za kontrolu ili ako želite eksplicitno unijeti ukupni iznos.\n\n" +
        "Ako unesete i po komadu i po paketu, vrijednosti trebaju odgovarati: (cijena po komadu) × (komada u paketu). Ručno ili dugmetom ispod.",
      readOnly: ({ document, parent }) =>
        wholesaleFieldsReadOnly(document ?? parent),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = getDocumentForValidation(context);
          if (!doc) {
            return "Validacija nema pristup dokumentu (osvježite Studio ili kontaktirajte podršku).";
          }

          if (!hasValidWholesaleQty(doc)) {
            if (isFiniteNumber(value)) return MSG_WHOLESALE_NO_QTY_PACKAGE;
            return true;
          }

          const hasPkg = isFiniteNumber(value);
          const hasPiece = isFiniteNumber(doc.wholesalePrice);
          const hasRetail = isPositivePrice(doc.retailPrice);
          const hasSale = isPositivePrice(doc.salePrice);

          if (!hasPiece && !hasPkg && !hasRetail && !hasSale) {
            return MSG_WHOLESALE_PRICING_REQUIRED;
          }

          return true;
        }).min(0),
    }),
    defineField({
      name: "salePrice",
      title: "Cijena na akciji (po komadu)",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "Samo za veleprodaju (na sajtu: precrtana veleprodajna po komadu + akcijska). Ne mijenja maloprodajnu cijenu.\n\n" +
        "Potrebni su „Komada u paketu” i referentna veleprodajna cijena (po komadu, ili po paketu ÷ komada) — akcija mora biti niža od te baze.",
      readOnly: ({ document, parent }) =>
        wholesaleFieldsReadOnly(document ?? parent),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = getDocumentForValidation(context);
          if (!doc) {
            return "Validacija nema pristup dokumentu (osvježite Studio ili kontaktirajte podršku).";
          }
          if (!hasValidWholesaleQty(doc)) {
            if (isFiniteNumber(value)) return MSG_SALE_NO_QTY;
          }
          return true;
        }).min(0),
    }),
    defineField({
      name: "retailPrice",
      title: "Maloprodajna cijena (po komadu)",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "OBVEZNO kad je „Komada u paketu” prazno — tada prodajete samo maloprodajno i ovo polje mora imati cijenu.\n\n" +
        "Kad je veleprodaja uključena (unesen broj komada u paketu), maloprodaja je opciona ako prodajete samo veleprodajno; ako je i maloprodaja i veleprodaja, maloprodaja mora biti veća od veleprodajne po komadu.\n\n" +
        "Na sajtu: fiksna cijena po komadu za krajnjeg kupca (bez veleprodajne akcije).",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = getDocumentForValidation(context);
          if (!doc) {
            return "Validacija nema pristup dokumentu (osvježite Studio ili kontaktirajte podršku).";
          }
          const hasValidQty =
            normalizeWholesaleQty(doc.wholesaleMinQuantity) != null;
          if (!hasValidQty && !isPositivePrice(value)) {
            return "Kad je „Komada u paketu” prazno, maloprodajna cijena je obavezna (samo maloprodaja).";
          }
          return true;
        }).min(0),
    }),
    defineField({
      name: "images",
      title: `Slike${REQUIRED_TITLE_SUFFIX}`,
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
      name: "sizes",
      title: "Veličine",
      type: "array",
      group: "packageInfo",
      fieldset: "packageInfo",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "size" }],
          options: {
            disableNew: false,
          },
        }),
      ],
      options: {
        layout: "tags",
      },
      description:
        "Opciono. Odaberite veličine iz kataloga (Content → Veličina). „+ Dodaj” → možete ili izabrati postojeću ili **Nova veličina** da se trajno doda u katalog i ovdje.",
      validation: (Rule) =>
        Rule.custom((refs) => {
          if (!Array.isArray(refs) || refs.length === 0) return true;
          const ids = refs
            .map(
              (r) =>
                r &&
                typeof r === "object" &&
                "_ref" in r &&
                (r as { _ref?: string })._ref,
            )
            .filter(Boolean) as string[];
          if (ids.length !== new Set(ids).size) {
            return "Ista veličina je dva puta u listi — uklonite duplikat.";
          }
          return true;
        }),
    }),
    defineField({
      name: "colors",
      title: "Boje",
      type: "array",
      group: "packageInfo",
      fieldset: "packageInfo",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "color" }],
          options: {
            disableNew: false,
          },
        }),
      ],
      options: {
        layout: "tags",
      },
      description:
        "Opciono. Odaberite boje iz kataloga (Content → Boja). Preko „+ Dodaj” možete odabrati postojeću ili kreirati novu boju koja ostaje u katalogu za druge proizvode.",
      validation: (Rule) =>
        Rule.custom((refs) => {
          if (!Array.isArray(refs) || refs.length === 0) return true;
          const ids = refs
            .map(
              (r) =>
                r &&
                typeof r === "object" &&
                "_ref" in r &&
                (r as { _ref?: string })._ref,
            )
            .filter(Boolean) as string[];
          if (ids.length !== new Set(ids).size) {
            return "Ista boja je dva puta u listi — uklonite duplikat.";
          }
          return true;
        }),
    }),
    defineField({
      name: "packageContentsText",
      title: "Opis sadržaja paketa",
      type: "text",
      rows: 5,
      group: "packageInfo",
      fieldset: "packageInfo",
      description:
        "Opciono. Ručno opišite što je u paketu (npr. koliko komada kojih veličina i boja). Prikazuje se na sajtu ispod linije „1 paket = n komada”.",
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
              title: `Naziv${REQUIRED_TITLE_SUFFIX}`,
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
      retailPrice: "retailPrice",
      firstImage: "images.0",
      firstImageAsset: "images.0.asset",
    },
    prepare({
      title,
      wholesalePrice,
      retailPrice,
      firstImage,
      firstImageAsset,
    }) {
      let subtitle: string | undefined;
      if (typeof wholesalePrice === "number") {
        subtitle = `${wholesalePrice} BAM / kom (veleprodaja)`;
      } else if (typeof retailPrice === "number") {
        subtitle = `${retailPrice} BAM / kom (maloprodaja)`;
      }
      return {
        title,
        subtitle,
        media: firstImage ?? firstImageAsset,
      };
    },
  },
});
