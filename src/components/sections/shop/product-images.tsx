"use client";

import { useState, useEffect, useCallback } from "react";
import AnimatedImage from "@/components/ui/animated-image";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ProductImagesProps {
  images?: string[];
  galleryImages?: string[];
  productName: string;
  className?: string;
}

export function ProductImages({
  images = [],
  galleryImages,
  productName,
  className,
}: ProductImagesProps) {
  const modalImages =
    galleryImages && galleryImages.length > 0 ? galleryImages : images;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);
  const isModalOpen = selectedIndex !== -1;

  // Scroll to selected index when modal opens
  useEffect(() => {
    if (!api || selectedIndex === -1) return;
    api.scrollTo(selectedIndex);
  }, [api, selectedIndex]);

  // Track current slide
  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      const selected = api.selectedScrollSnap();
      setCurrent(selected);
      setCanGoPrev(api.canScrollPrev());
      setCanGoNext(api.canScrollNext());
    };

    updateCurrent();
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Use setTimeout to ensure state update happens before dialog closes
    setTimeout(() => {
      setSelectedIndex(-1);
      setIsClosing(false);
    }, 0);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handleClose]);

  // Disable dialog animations
  useEffect(() => {
    if (!isModalOpen) return;

    const disableAnimations = () => {
      const dialogContent = document.querySelector(
        '[data-slot="dialog-content"]',
      ) as HTMLElement;
      const dialogOverlay = document.querySelector(
        '[data-slot="dialog-overlay"]',
      ) as HTMLElement;

      if (dialogContent) {
        dialogContent.style.setProperty(
          "transition-duration",
          "0ms",
          "important",
        );
        dialogContent.style.setProperty(
          "animation-duration",
          "0ms",
          "important",
        );
        dialogContent.style.setProperty("transition", "none", "important");
        dialogContent.style.setProperty("animation", "none", "important");
      }

      if (dialogOverlay) {
        dialogOverlay.style.setProperty(
          "transition-duration",
          "0ms",
          "important",
        );
        dialogOverlay.style.setProperty(
          "animation-duration",
          "0ms",
          "important",
        );
        dialogOverlay.style.setProperty("transition", "none", "important");
        dialogOverlay.style.setProperty("animation", "none", "important");
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      setTimeout(disableAnimations, 0);
    });
  }, [isModalOpen]);

  return (
    <>
      <div
        className={cn(
          "top-24 flex w-full flex-1 flex-col gap-4 lg:sticky lg:h-fit lg:max-w-xl",
          className,
        )}
      >
        <div
          className="group relative aspect-square max-h-[60svh] w-full cursor-pointer overflow-hidden rounded-md"
          onClick={() => setSelectedIndex(0)}
        >
          <AnimatedImage
            src={images[0]}
            alt={productName}
            width={1000}
            height={1000}
            className="size-full object-cover transition-all duration-300 group-hover:scale-105"
            priority={true}
          />
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-md"
                onClick={() => setSelectedIndex(index)}
              >
                <AnimatedImage
                  src={image}
                  alt={`${productName} - Slika ${index + 1}`}
                  width={1000}
                  height={1000}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && handleClose()}
      >
        <DialogContent
          className="h-screen max-w-[unset]! overflow-hidden border-0 bg-transparent p-0 backdrop-blur-sm duration-0!"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Galerija slika</DialogTitle>
          <DialogDescription className="sr-only">
            Pregled slika sa navigacijskim kontrolama
          </DialogDescription>
          <div className="relative size-full">
            <Carousel
              setApi={setApi}
              opts={{
                startIndex: selectedIndex >= 0 ? selectedIndex : 0,
                loop: true,
              }}
              className="size-full"
            >
              <CarouselContent className="ml-0 size-full">
                {modalImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="size-full basis-full pl-0"
                  >
                    <div
                      className="relative size-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                      }}
                    >
                      <AnimatedImage
                        src={image}
                        alt={`${productName} - Slika ${index + 1}`}
                        width={1200}
                        height={1200}
                        unoptimized
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-1/2 left-1/2 h-auto max-h-[80svh] w-auto -translate-x-1/2 -translate-y-1/2 object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  disabled={!canGoPrev}
                  className="bg-primary/10 border-primary/40 hover:bg-primary/20 text-primary pointer-events-auto size-12 rounded-full border backdrop-blur-sm disabled:pointer-events-none disabled:opacity-35"
                  onClick={() => api?.scrollPrev()}
                  aria-label="Prethodna slika"
                >
                  <ArrowLeft size={18} strokeWidth={3} aria-hidden />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  disabled={!canGoNext}
                  className="bg-primary/10 border-primary/40 hover:bg-primary/20 text-primary pointer-events-auto size-12 rounded-full border backdrop-blur-sm disabled:pointer-events-none disabled:opacity-35"
                  onClick={() => api?.scrollNext()}
                  aria-label="Sljedeća slika"
                >
                  <ArrowRight size={18} strokeWidth={3} aria-hidden />
                </Button>
              </div>
              <div className="pointer-events-none absolute top-[10lvh] right-4 md:top-[5lvh]">
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="bg-primary/10 border-primary/40 hover:bg-primary/20 text-primary pointer-events-auto size-12 rounded-full border backdrop-blur-sm"
                  onClick={handleClose}
                  aria-label="Zatvori galeriju"
                >
                  <X size={18} strokeWidth={3} aria-hidden />
                </Button>
              </div>
              {!isClosing && (
                <div className="pointer-events-none absolute right-4 bottom-[10lvh] md:bottom-[5lvh]">
                  <div className="bg-primary/10 text-primary border-primary/40 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    {current + 1} / {modalImages.length}
                  </div>
                </div>
              )}
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
