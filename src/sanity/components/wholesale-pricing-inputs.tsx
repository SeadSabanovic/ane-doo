"use client";

import { useCallback } from "react";
import type { ComponentProps } from "react";
import { Box, Button, Card, Flex, Text } from "@sanity/ui";
import { TrashIcon } from "@sanity/icons";
import { NumberInput, PatchEvent, set, unset, useFormCallbacks, useFormValue } from "sanity";
import { isFiniteNumber, normalizeWholesaleQty } from "../utils/wholesale-validation";

type NumberInputProps = ComponentProps<typeof NumberInput>;

function roundMoney(n: number) {
  return Math.round(n * 100) / 100;
}

/** Broj polje + dugme koje postavlja cijenu po paketu = (po komadu × komada), ako su ta polja popunjena. */
export function WholesalePricePerPackageInput(props: NumberInputProps) {
  const qty = useFormValue(["wholesaleMinQuantity"]) as number | undefined;
  const piece = useFormValue(["wholesalePrice"]) as number | undefined;
  const pkg = useFormValue(["wholesalePricePerPackage"]) as number | undefined;
  const sale = useFormValue(["salePrice"]) as number | undefined;
  const { renderDefault, onChange, readOnly } = props;

  const { onChange: onDocumentChange } = useFormCallbacks();

  const qtyNorm = normalizeWholesaleQty(qty);
  const hasValidQty = qtyNorm != null;

  const hasWholesaleNumbers =
    isFiniteNumber(piece) || isFiniteNumber(pkg) || isFiniteNumber(sale);

  /** Dokument ima veleprodajne iznose, a „Komada u paketu” nije validan — treba brisanje ili unos komada. */
  const showConflictClear = !hasValidQty && hasWholesaleNumbers;

  const canComputeFromPiece =
    hasValidQty &&
    typeof piece === "number" &&
    Number.isFinite(piece) &&
    piece >= 0;

  const canComputeFromPackage =
    hasValidQty &&
    typeof pkg === "number" &&
    Number.isFinite(pkg) &&
    pkg >= 0;

  const canCompute = canComputeFromPiece || canComputeFromPackage;

  const handleSync = useCallback(() => {
    if (!canCompute || readOnly || qtyNorm == null) return;
    if (canComputeFromPiece) {
      onChange(set(roundMoney(piece! * qtyNorm)));
      return;
    }
    if (canComputeFromPackage) {
      onDocumentChange(PatchEvent.from([set(roundMoney(pkg! / qtyNorm), ["wholesalePrice"])]));
    }
  }, [
    canCompute,
    canComputeFromPackage,
    canComputeFromPiece,
    onChange,
    onDocumentChange,
    piece,
    pkg,
    qtyNorm,
    readOnly,
  ]);

  const handleClearWholesale = useCallback(() => {
    onDocumentChange(
      PatchEvent.from([
        unset(["wholesalePrice"]),
        unset(["wholesalePricePerPackage"]),
        unset(["salePrice"]),
      ]),
    );
  }, [onDocumentChange]);

  const defaultInput =
    typeof renderDefault === "function" ? (
      renderDefault(props)
    ) : (
      <NumberInput {...props} />
    );

  const disabledHint = readOnly
    ? "Prvo unesite „Komada u paketu” (cijeli broj ≥ 1) da otključate veleprodajna polja i dugme."
    : !canCompute
      ? "Dugme je aktivno kad su uneseni „Komada u paketu” (≥1) i bar jedna od veleprodajnih cijena (po komadu ili po paketu)."
      : null;

  return (
    <Flex direction="column" gap={3}>
      <Box>{defaultInput}</Box>

      {showConflictClear && (
        <Card padding={3} radius={2} shadow={1} tone="critical">
          <Flex direction="column" gap={3}>
            <Text size={1}>
              <strong>Nekonzistentno stanje:</strong> postoje veleprodajne cijene ili akcija, a „Komada u
              paketu” nije unesen (ili nije cijeli broj ≥ 1). Ne možete objaviti dokument dok to ne
              ispravite — obrišite veleprodaju ili unesite broj komada u paketu.
            </Text>
            <Box>
              <Button
                icon={TrashIcon}
                text="Obriši veleprodajne cijene i akciju"
                mode="ghost"
                tone="critical"
                type="button"
                onClick={handleClearWholesale}
              />
            </Box>
          </Flex>
        </Card>
      )}

      <Box>
        <Text size={1} weight="semibold">
          Zašto je ovo polje važno i šta radi dugme
        </Text>
        <Text as="p" muted size={1} style={{ marginTop: "0.65rem", lineHeight: 1.45 }}>
          Na sajtu se veleprodaja prikazuje pretežno preko <strong>cijene po komadu</strong>.{" "}
          <strong>Cijena po paketu</strong> je opcionalna (ukupni iznos paketa); korisna je za kontrolu ili
          ako želite cijenu po komadu izračunati iz ukupnog paketa.
        </Text>
        <Text as="p" muted size={1} style={{ marginTop: "0.5rem", lineHeight: 1.45 }}>
          Ako unesete oba iznosa, trebaju odgovarati <strong>cijena po komadu × komada u paketu</strong>.
          Dugme ispod izračunava nedostajuće polje (× komada ili ÷ komada).
        </Text>
      </Box>

      <Flex align="center" gap={2} wrap="wrap">
        <Button
          text="Izračunaj drugo polje (× komada ili ÷ komada)"
          mode="ghost"
          tone="primary"
          type="button"
          disabled={readOnly || !canCompute}
          onClick={handleSync}
        />
        {disabledHint && (
          <Text muted size={1}>
            {disabledHint}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
