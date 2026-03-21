"use client";

import { useState, useCallback, useMemo } from "react";
import { Box, Flex, TextInput, Button, Card } from "@sanity/ui";
import { AddIcon, CloseIcon } from "@sanity/icons";
import { set, unset } from "sanity";

export function TagsInput(props) {
  const { value = [], onChange } = props;
  const tags = useMemo(
    () => (Array.isArray(value) ? value.filter(Boolean) : []),
    [value],
  );
  const [inputValue, setInputValue] = useState("");

  const handleAdd = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed || tags.includes(trimmed)) {
      setInputValue("");
      return;
    }
    onChange(set([...tags, trimmed]));
    setInputValue("");
  }, [inputValue, tags, onChange]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAdd();
      }
    },
    [handleAdd],
  );

  const handleRemove = useCallback(
    (index) => {
      const next = tags.filter((_, i) => i !== index);
      onChange(next.length > 0 ? set(next) : unset());
    },
    [tags, onChange],
  );

  return (
    <Flex direction="column" gap={3}>
      {/* Dodane oznake sa X za uklanjanje */}
      {tags.length > 0 && (
        <Flex gap={2} wrap="wrap">
          {tags.map((tag, index) => (
            <Card
              key={`${tag}-${index}`}
              padding={2}
              radius={2}
              tone="default"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Box style={{ fontSize: 12 }}>{tag}</Box>
              <Button
                icon={CloseIcon}
                mode="bleed"
                padding={1}
                tone="critical"
                fontSize={1}
                aria-label={`Ukloni ${tag}`}
                onClick={() => handleRemove(index)}
              />
            </Card>
          ))}
        </Flex>
      )}

      {/* Input + dugme za dodavanje */}
      <Flex gap={2}>
        <Box flex={1}>
          <TextInput
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            placeholder="Unesi oznaku i pritisni Enter ili +"
          />
        </Box>
        <Button
          icon={AddIcon}
          text="Dodaj"
          mode="ghost"
          tone="primary"
          type="button"
          onClick={handleAdd}
          disabled={!inputValue.trim()}
        />
      </Flex>
    </Flex>
  );
}
