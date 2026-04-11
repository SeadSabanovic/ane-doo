"use client";

import isPropValid from "@emotion/is-prop-valid";
import { NextStudio } from "next-sanity/studio";
import type { ComponentProps } from "react";
import { StyleSheetManager } from "styled-components";

type StudioConfig = ComponentProps<typeof NextStudio>["config"];

/**
 * styled-components v6 ne filtrira ne-HTML propove kao u v5; @sanity/ui šalje npr. `tone` na primitiv.
 * StyleSheetManager + isPropValid sužava upozorenja u konzoli u Studiju.
 */
export default function StudioRoot({ config }: { config: StudioConfig }) {
  return (
    <StyleSheetManager
      shouldForwardProp={(prop, target) =>
        typeof target === "string" ? isPropValid(prop) : true
      }
    >
      <NextStudio config={config} />
    </StyleSheetManager>
  );
}
