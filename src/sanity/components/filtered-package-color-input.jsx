"use client";

import { Flex, Text, Box } from "@sanity/ui";
import { set, unset, useFormValue } from "sanity";
import { PRODUCT_COLOR_OPTIONS } from "../../constants/product-variants";

const COLOR_TITLE = Object.fromEntries(
  PRODUCT_COLOR_OPTIONS.map((o) => [o.value, o.title]),
);

/**
 * Boja u redu rasporeda paketa – samo vrijednosti odabrane u Boje iznad.
 */
export function FilteredPackageColorInput(props) {
  const { value, onChange } = props;
  const selectedColors = useFormValue(["colors"]) || [];

  const options = selectedColors.map((v) => ({
    value: v,
    title: COLOR_TITLE[v] || v,
  }));

  if (options.length === 0) {
    return (
      <Box paddingY={2}>
        <Text size={1} muted>
          Prvo odaberite boje iznad.
        </Text>
      </Box>
    );
  }

  return (
    <Flex direction="column" gap={2}>
      <select
        value={value || ""}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v ? set(v) : unset());
        }}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          borderRadius: 4,
          border: "1px solid var(--card-border-color)",
          background: "var(--card-bg-color)",
          color: "inherit",
          fontSize: 14,
        }}
      >
        <option value="">Odaberite boju</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.title}
          </option>
        ))}
      </select>
    </Flex>
  );
}
