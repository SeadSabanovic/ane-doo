import React from "react";
import { defineField, defineType } from "sanity";
import { REQUIRED_TITLE_SUFFIX } from "../constants/field-labels";

function isValidHex(v: unknown): v is string {
  return typeof v === "string" && /^#[0-9A-Fa-f]{6}$/i.test(v.trim());
}

function previewSwatchMedia(hex: unknown) {
  const fill = isValidHex(hex) ? hex.trim() : "#9ca3af";
  return React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      minWidth: 36,
      minHeight: 36,
      borderRadius: 6,
      backgroundColor: fill,
      boxSizing: "border-box",
      border: "1px solid rgba(0,0,0,0.12)",
    },
    title: isValidHex(hex) ? hex.trim() : undefined,
  });
}

/** Jedna boja u katalogu — proizvodi je biraju referencom (kao veličina). */
export default defineType({
  name: "color",
  title: "Boja",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: `Naziv (prikaz kupcu)${REQUIRED_TITLE_SUFFIX}`,
      type: "string",
      description: "Npr. Crna, Zlatna, Navy.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: `Slug${REQUIRED_TITLE_SUFFIX}`,
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hex",
      title: `Hex (#RRGGBB)${REQUIRED_TITLE_SUFFIX}`,
      type: "string",
      description: "Boja za krug na sajtu i u Studiju (preview).",
      validation: (Rule) =>
        Rule.required().custom((val) => {
          if (typeof val !== "string" || !val.trim()) return "Obavezno";
          const v = val.trim();
          if (!/^#[0-9A-Fa-f]{6}$/i.test(v)) {
            return "Mora biti u formatu #RRGGBB (6 hex znamenki)";
          }
          return true;
        }),
    }),
    defineField({
      name: "order",
      title: "Redoslijed",
      type: "number",
      description: "Manji broj = ranije u listama (opcionalno).",
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
      hex: "hex",
      subtitle: "slug.current",
    },
    prepare({ title, hex, subtitle }) {
      return {
        title: title ?? "Boja",
        subtitle: [hex, subtitle].filter(Boolean).join(" · ") || "",
        media: previewSwatchMedia(hex),
      };
    },
  },
});
