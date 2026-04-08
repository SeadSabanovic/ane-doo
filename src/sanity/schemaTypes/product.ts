import { defineType, defineField } from "sanity";
import { SelectAllArrayInput } from "../components/select-all-array-input";
import { TagsInput } from "../components/tags-input";
import { AltTextWithGenerate } from "../components/alt-text-with-generate";
import { WholesalePricePerPackageInput } from "../components/wholesale-pricing-inputs";
import {
  PRODUCT_COLOR_OPTIONS,
  PRODUCT_SIZE_OPTIONS,
} from "../../constants/product-variants";
import {
  REQUIRED_TITLE_SUFFIX,
  WHOLESALE_PRICE_TITLE_SUFFIX,
} from "../constants/field-labels";
import {
  getDocumentForValidation,
  hasValidWholesaleQty,
  isFiniteNumber,
  isPositivePrice,
  normalizeWholesaleQty,
  wholesaleFieldsReadOnly,
} from "../utils/wholesale-validation";

const MSG_WHOLESALE_NO_QTY_PIECE =
  'Bez „Komada u paketu” (cijeli broj ≥1) ova cijena ne smije postojati. Unesite broj komada ili kliknite „Obriši veleprodajne cijene” ispod polja za cijenu po paketu.';

const MSG_WHOLESALE_NO_QTY_PACKAGE =
  'Bez „Komada u paketu” (cijeli broj ≥1) ova cijena ne smije postojati. Unesite broj komada ili kliknite „Obriši veleprodajne cijene” ispod polja za cijenu po paketu.';

const MSG_SALE_NO_QTY =
  'Bez „Komada u paketu” (cijeli broj ≥1) akcija ne smije postojati. Unesite broj komada ili kliknite „Obriši veleprodajne cijene” ispod polja za cijenu po paketu.';

const MSG_WHOLESALE_PAIR_REQUIRED =
  "Kad je unesen broj komada u paketu, unesite i veleprodajnu cijenu po komadu i po paketu, ili unesite maloprodajnu cijenu (ili akciju) ako ne prodajete veleprodajno.";

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
          return 'Kad ne prodajete na veleprodaju (prazno „Komada u paketu”), maloprodajna cijena (po komadu) je obavezna.';
        }
        return true;
      }

      // Uz validan paket: po komadu i po paketu uvijek zajedno (FE i prikaz ovise o obje vrijednosti).
      if (hasWPiece !== hasWPackage) {
        return "Veleprodajna cijena po komadu i po paketu moraju biti obje unesene ili obje prazne. Sajt očekuje oba iznosa kad postoji veleprodaja.";
      }

      const hasWholesalePair = hasWPiece && hasWPackage;

      if (!hasWholesalePair) {
        if (!hasRetail && !hasSale) {
          return "Unesite maloprodajnu cijenu i/ili obje veleprodajne cijene (po komadu i po paketu) i/ili akciju po komadu.";
        }
      }

      const baseUnit = hasWholesalePair ? d.wholesalePrice! : null;

      if (hasRetail && baseUnit != null && (d.retailPrice as number) <= baseUnit) {
        return "Maloprodajna cijena mora biti veća od veleprodajne (po komadu).";
      }

      if (hasSale) {
        if (!hasWholesalePair || baseUnit == null) {
          return "Akcijska cijena zahtijeva potpunu veleprodaju: „Komada u paketu”, cijena po komadu i cijena po paketu.";
        }
        if (d.salePrice! >= baseUnit) {
          return "Akcijska cijena mora biti niža od veleprodajne (po komadu).";
        }
      }

      if (hasWholesalePair && hasValidQty) {
        const qty = normalizeWholesaleQty(d.wholesaleMinQuantity)!;
        const expected = d.wholesalePrice! * qty;
        if (Math.abs(expected - d.wholesalePricePerPackage!) > 0.02) {
          return "Cijena po paketu mora odgovarati: (cijena po komadu) × (komada u paketu). Ispravite jedno od polja ili koristite dugme za izračun.";
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
      description: "URL za proizvod na sajtu",
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
      description: "Ključne riječi za pretragu i filtriranje",
    }),
    defineField({
      name: "wholesaleMinQuantity",
      title: "Komada u paketu",
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      description:
        "PRAVILO: Prazno polje = nemate veleprodaju — tada su prazna veleprodajna polja zaključana u Studiju; ako već postoje stare vrijednosti bez broja komada, polja su otključana da možete obrisati ili unijeti „Komada u paketu”. Maloprodajna cijena ispod je obavezna kad nema veleprodaje.\n\n" +
        "Ako unesete cijeli broj ≥ 1, otvara se veleprodaja: tada morate imati i „Veleprodajnu cijenu (po komadu)” i „Veleprodajnu cijenu (po paketu)” kad god želite prodavati veleprodajno (obje vrijednosti; sajt i prikaz cijena računaju od njih).\n\n" +
        "Broj se koristi za tekst tipa „1 paket = n komada” i za formulu: cijena po paketu = cijena po komadu × ovaj broj.",
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

          if (hasPiece !== hasPkg) {
            return "Veleprodajna cijena po komadu i po paketu moraju biti obje unesene ili obje prazne. Sajt očekuje oba iznosa kad postoji veleprodaja.";
          }
          if (!hasPiece && !hasPkg && !hasRetail && !hasSale) {
            return MSG_WHOLESALE_PAIR_REQUIRED;
          }
          if (hasPiece && hasPkg) {
            const qty = normalizeWholesaleQty(value)!;
            const wp = doc.wholesalePrice as number;
            const wpp = doc.wholesalePricePerPackage as number;
            const expected = wp * qty;
            if (Math.abs(expected - wpp) > 0.02) {
              return "Cijena po paketu mora odgovarati: (cijena po komadu) × (komada u paketu). Ispravite jedno od polja ili koristite dugme za izračun.";
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
        "VAŽNO ZA SAJT: Ovo je glavna veleprodajna jedinica koju frontend prikazuje (cijena po jednom komadu za veleprodaju).\n\n" +
        "Mora postojati „Komada u paketu” (≥1). Ne možete imati samo cijenu po paketu bez ove cijene — oba polja moraju biti popunjena zajedno.\n\n" +
        "Mora se slagati s „Veleprodajnom cijenom (po paketu)”: po paketu ≈ (po komadu) × (komada u paketu). Možete koristiti dugme ispod polja za cijenu po paketu da izračunate drugo polje.",
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

          if (hasPiece !== hasPkg) {
            if (hasPiece && !hasPkg) {
              return "Unesite i veleprodajnu cijenu po paketu (obje moraju biti popunjene).";
            }
            if (!hasPiece && hasPkg) {
              return "Unesite i veleprodajnu cijenu po komadu (obje moraju biti popunjene).";
            }
          }

          if (!hasPiece && !hasPkg && !hasRetail && !hasSale) {
            return MSG_WHOLESALE_PAIR_REQUIRED;
          }

          return true;
        }).min(0),
    }),
    defineField({
      name: "wholesalePricePerPackage",
      title: `Veleprodajna cijena (po paketu)${WHOLESALE_PRICE_TITLE_SUFFIX}`,
      type: "number",
      group: "pricing",
      fieldset: "pricing",
      components: {
        input: WholesalePricePerPackageInput,
      },
      description:
        "OBVEZNO kad je „Komada u paketu” unesen (≥1), osim ako prodajete samo maloprodajno ili akciju bez veleprodajnih cijena — tada unesite maloprodajnu/akcijsku cijenu.\n\n" +
        "Ukupna cijena cijelog veleprodajnog paketa (zbir za n komada). Zajedno s „Veleprodajnom cijenom (po komadu)” čini par: ako jedno popunjavate, morate i drugo — inače FE nema konzistentan prikaz.\n\n" +
        "Mora odgovarati: (cijena po komadu) × (komada u paketu). Ručno unesite ili ispod koristite dugme za izračun iz druga dva polja.",
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

          if (hasPiece !== hasPkg) {
            if (hasPiece && !hasPkg) {
              return "Unesite i veleprodajnu cijenu po paketu (obje moraju biti popunjene).";
            }
            if (!hasPiece && hasPkg) {
              return "Unesite i veleprodajnu cijenu po komadu (obje moraju biti popunjene).";
            }
          }

          if (!hasPiece && !hasPkg && !hasRetail && !hasSale) {
            return MSG_WHOLESALE_PAIR_REQUIRED;
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
        "Dozvoljeno je samo kad su uneseni „Komada u paketu”, „Veleprodajna cijena (po komadu)” i „Veleprodajna cijena (po paketu)” — akcija mora biti niža od veleprodajne po komadu.",
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
          const hasValidQty = normalizeWholesaleQty(doc.wholesaleMinQuantity) != null;
          if (!hasValidQty && !isPositivePrice(value)) {
            return 'Kad je „Komada u paketu” prazno, maloprodajna cijena je obavezna (samo maloprodaja).';
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
      components: {
        input: SelectAllArrayInput,
      },
      of: [{ type: "string" }],
      options: {
        list: [...PRODUCT_SIZE_OPTIONS],
      },
      description:
        "Opciono. Koje veličine ulaze u ponudu: veleprodaja (sadržaj paketa) i maloprodaja (odabir kupca). Za nestandardne veličine koristite polje ispod.",
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
        "Slobodan unos ako veličina nije na listi (npr. 220×240 cm, poseban kroj). Pojaviti će se u rasporedu paketa zajedno s odabranim veličinama.",
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
        "Opciono. Koje boje ulaze u ponudu: veleprodaja (sadržaj paketa) i maloprodaja (odabir kupca). Za boje koje nisu na listi koristite polje ispod.",
      options: {
        list: [...PRODUCT_COLOR_OPTIONS],
      },
    }),
    defineField({
      name: "customColors",
      title: "Dodatne boje (proizvoljno)",
      type: "array",
      group: "packageInfo",
      fieldset: "packageInfo",
      description:
        "Za svaku boju unesite naziv (kako se prikazuje kupcu) i hex u formatu #RRGGBB (npr. #C9A227 za zlatnu). Pojaviti će se u odabiru zajedno s bojama s liste iznad.",
      of: [
        {
          type: "object",
          name: "customColor",
          fields: [
            defineField({
              name: "name",
              title: `Naziv${REQUIRED_TITLE_SUFFIX}`,
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "hex",
              title: `Hex (#RRGGBB)${REQUIRED_TITLE_SUFFIX}`,
              type: "string",
              description: "Npr. #8B4513 ili #23695e",
              validation: (Rule) =>
                Rule.required().custom((val) => {
                  if (typeof val !== "string" || !val.trim()) {
                    return "Obavezno";
                  }
                  const v = val.trim();
                  if (!/^#[0-9A-Fa-f]{6}$/i.test(v)) {
                    return "Mora biti u formatu #RRGGBB (6 hex znamenki)";
                  }
                  return true;
                }),
            }),
          ],
          preview: {
            select: {
              name: "name",
              hex: "hex",
            },
            prepare({ name, hex }) {
              return {
                title: name || "Boja",
                subtitle: hex || "",
              };
            },
          },
        },
      ],
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
    prepare({ title, wholesalePrice, retailPrice, firstImage, firstImageAsset }) {
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
