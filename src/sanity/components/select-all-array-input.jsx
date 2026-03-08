"use client";

import { Button, Flex } from "@sanity/ui";
import { set, unset } from "sanity";

function getOptionValue(option) {
  if (typeof option === "string") return option;
  if (option && typeof option === "object" && "value" in option) {
    return option.value;
  }
  return null;
}

export function SelectAllArrayInput(props) {
  const options = props.schemaType?.options?.list ?? [];
  const optionValues = options.map(getOptionValue).filter(Boolean);
  const hasSelectedValues = Array.isArray(props.value) && props.value.length > 0;

  const handleSelectAll = () => {
    props.onChange(optionValues.length > 0 ? set(optionValues) : unset());
  };

  const handleClearAll = () => {
    props.onChange(unset());
  };

  if (optionValues.length === 0) {
    return props.renderDefault(props);
  }

  return (
    <Flex direction="column" gap={3}>
      <Flex gap={2}>
        <Button mode="ghost" text="Označi sve" onClick={handleSelectAll} />
        <Button
          mode="ghost"
          text="Očisti sve"
          onClick={handleClearAll}
          disabled={!hasSelectedValues}
        />
      </Flex>
      {props.renderDefault(props)}
    </Flex>
  );
}
