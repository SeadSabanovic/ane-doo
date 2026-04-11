"use client";

import { useCallback, useMemo } from "react";
import { Flex, Button, Box, Text } from "@sanity/ui";
import { useFormValue, set } from "sanity";

/**
 * Alt tekst za slike proizvoda – dugme „Generiši” popunjava iz naziva dokumenta
 * (slično kao Generate za slug iz naziva).
 */
export function AltTextWithGenerate(props) {
  const { onChange, renderDefault } = props;
  const productName = useFormValue(["name"]);
  const images = useFormValue(["images"]);
  const path = props.path;

  const imageIndex = useMemo(
    () => getImageIndexFromPath(path, images),
    [path, images],
  );

  const nameOk =
    typeof productName === "string" && productName.trim().length > 0;

  const handleGenerate = useCallback(() => {
    const name = typeof productName === "string" ? productName.trim() : "";
    if (!name) return;

    const count = Array.isArray(images) ? images.length : 0;
    const text =
      count > 1
        ? `${name} – slika ${imageIndex + 1}`
        : `${name} – fotografija proizvoda`;

    onChange(set(text));
  }, [productName, images, imageIndex, onChange]);

  return (
    <Flex direction="column" gap={3}>
      <Box>{renderDefault(props)}</Box>
      <Flex align="center" gap={3} wrap="wrap">
        <Button
          text="Generiši"
          mode="ghost"
          tone="primary"
          disabled={!nameOk}
          onClick={handleGenerate}
          type="button"
        />
        {!nameOk && (
          <Text size={1} muted>
            Unesite naziv proizvoda u osnovnim podacima
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

function getImageIndexFromPath(path, images) {
  if (!Array.isArray(path) || !Array.isArray(images)) return 0;
  const keySeg = path.find((p) => p && typeof p === "object" && "_key" in p);
  if (!keySeg?._key) return 0;
  const i = images.findIndex((img) => img?._key === keySeg._key);
  return i >= 0 ? i : 0;
}
