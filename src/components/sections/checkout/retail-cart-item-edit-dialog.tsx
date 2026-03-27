"use client";

import { useEffect, useState } from "react";
import { CheckIcon, Loader2, Pencil, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { InputWithPlusMinus } from "@/components/ui/input-with-plus-minus";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { CartItem } from "@/stores/cart-store";
import { useCartStore } from "@/stores";

type VariantOptionsResponse = {
  sizeOptions: string[];
  colorOptions: { label: string; hex: string }[];
};

export function RetailCartItemEditDialog({
  item,
  triggerClassName,
}: {
  item: CartItem;
  /** npr. w-full md:w-auto kad su dugmad u flex-col */
  triggerClassName?: string;
}) {
  const removeItem = useCartStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoadingVariants, setIsLoadingVariants] = useState(false);
  const [variantError, setVariantError] = useState<string | null>(null);
  const [variantOptions, setVariantOptions] =
    useState<VariantOptionsResponse | null>(null);

  const [nextSize, setNextSize] = useState(item.size);
  const [nextColor, setNextColor] = useState(item.color);
  const [nextQuantity, setNextQuantity] = useState(item.quantity);

  useEffect(() => {
    if (!isEditOpen) return;

    let cancelled = false;
    const fetchVariants = async () => {
      setIsLoadingVariants(true);
      setVariantError(null);
      try {
        const res = await fetch(`/api/products/${item.slug}/variants`);
        if (!res.ok) {
          throw new Error("Ne mogu učitati varijante za uređivanje.");
        }
        const data = (await res.json()) as VariantOptionsResponse;
        if (cancelled) return;
        setVariantOptions(data);
        setNextSize(item.size);
        setNextColor(item.color);
        setNextQuantity(item.quantity);
      } catch (error) {
        if (cancelled) return;
        setVariantError(
          error instanceof Error
            ? error.message
            : "Ne mogu učitati varijante za uređivanje.",
        );
      } finally {
        if (!cancelled) setIsLoadingVariants(false);
      }
    };

    void fetchVariants();
    return () => {
      cancelled = true;
    };
  }, [isEditOpen, item.slug, item.size, item.color, item.quantity]);

  const handleSave = () => {
    if (!variantOptions) return;
    if (variantOptions.sizeOptions.length > 0 && !nextSize) {
      toast.error("Odaberite veličinu.");
      return;
    }
    if (variantOptions.colorOptions.length > 0 && !nextColor) {
      toast.error("Odaberite boju.");
      return;
    }

    removeItem(item.productId, item.size, item.color, item.purchaseType);
    addItem({
      ...item,
      size: nextSize,
      color: nextColor,
      quantity: nextQuantity,
    });

    setIsEditOpen(false);
    toast.success("Detalji artikla su ažurirani.");
  };

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(triggerClassName)}
        >
          <Pencil />
          Uredi
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uredi detalje</DialogTitle>
          <DialogDescription>{item.name}</DialogDescription>
        </DialogHeader>

        {isLoadingVariants ? (
          <div className="flex items-center gap-2 py-3 text-sm">
            <Loader2 className="size-4 animate-spin" />
            Učitavanje opcija...
          </div>
        ) : variantError ? (
          <p className="text-destructive text-sm">{variantError}</p>
        ) : variantOptions ? (
          <div className="space-y-4">
            {variantOptions.sizeOptions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Veličina</p>
                <div className="flex flex-wrap gap-2">
                  {variantOptions.sizeOptions.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setNextSize(size)}
                      className={cn(
                        nextSize === size &&
                          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                      )}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {variantOptions.colorOptions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Boja</p>
                <div className="flex flex-wrap gap-2">
                  {variantOptions.colorOptions.map(({ label, hex }) => {
                    const selected = nextColor === label;
                    return (
                      <button
                        key={`${label}-${hex}`}
                        type="button"
                        onClick={() => setNextColor(label)}
                        aria-label={`Odaberi boju ${label}`}
                        className={cn(
                          "border-input flex size-10 items-stretch rounded-md border p-1.5",
                          selected && "border-primary border-2",
                        )}
                      >
                        <span
                          className="min-h-0 min-w-0 flex-1 rounded-sm border border-black/10"
                          style={{ backgroundColor: hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <InputWithPlusMinus
              value={nextQuantity}
              minValue={1}
              onChange={setNextQuantity}
              label="Količina"
              className="w-full"
            />
          </div>
        ) : null}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditOpen(false)}
          >
            <XIcon />
            Odustani
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isLoadingVariants || !!variantError || !variantOptions}
          >
            <CheckIcon />
            Sačuvaj
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

