"use client";

import { Box, Flex, Text } from "@sanity/ui";

const RECOMMENDED_MIN = 75;
const RECOMMENDED_MAX = 155;

export function DescriptionWithCharCount(props) {
  const value = typeof props.value === "string" ? props.value : "";
  const count = value.length;
  const inRange = count >= RECOMMENDED_MIN && count <= RECOMMENDED_MAX;

  return (
    <Flex direction="column" gap={2}>
      <Box>{typeof props.renderDefault === "function" ? props.renderDefault(props) : null}</Box>
      <Text size={1} muted={!inRange} tone={inRange ? "positive" : "caution"}>
        Broj karaktera: {count} (preporuka: {RECOMMENDED_MIN}-{RECOMMENDED_MAX})
      </Text>
    </Flex>
  );
}
