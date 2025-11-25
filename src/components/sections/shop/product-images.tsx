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
  mainImage: string;
  images?: string[];
  productName: string;
  className?: string;
}

export function ProductImages({
  mainImage,
  images = [],
  productName,
  className,
}: ProductImagesProps) {
  const allImages = [mainImage, ...images];
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
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
    };

    updateCurrent();
    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
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
        '[data-slot="dialog-content"]'
      ) as HTMLElement;
      const dialogOverlay = document.querySelector(
        '[data-slot="dialog-overlay"]'
      ) as HTMLElement;

      if (dialogContent) {
        dialogContent.style.setProperty(
          "transition-duration",
          "0ms",
          "important"
        );
        dialogContent.style.setProperty(
          "animation-duration",
          "0ms",
          "important"
        );
        dialogContent.style.setProperty("transition", "none", "important");
        dialogContent.style.setProperty("animation", "none", "important");
      }

      if (dialogOverlay) {
        dialogOverlay.style.setProperty(
          "transition-duration",
          "0ms",
          "important"
        );
        dialogOverlay.style.setProperty(
          "animation-duration",
          "0ms",
          "important"
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
          "flex-1 w-full lg:max-w-xl flex flex-col gap-4 lg:h-fit lg:sticky top-36",
          className
        )}
      >
        <div
          className="relative aspect-square rounded-md overflow-hidden w-full max-h-[60svh] cursor-pointer group"
          onClick={() => setSelectedIndex(0)}
        >
          <AnimatedImage
            src={mainImage}
            alt={productName}
            width={1000}
            height={1000}
            className="object-cover size-full transition-transform duration-300 group-hover:scale-105"
            priority={true}
          />
        </div>

        {allImages.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {allImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-md overflow-hidden w-full cursor-pointer group"
                onClick={() => setSelectedIndex(index)}
              >
                <AnimatedImage
                  src={image}
                  alt={`${productName} - Slika ${index + 1}`}
                  width={1000}
                  height={1000}
                  className="object-cover size-full transition-transform duration-300 group-hover:scale-105"
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
          className="p-0 overflow-hidden bg-transparent backdrop-blur-sm border-0 max-w-[unset]! h-screen duration-0!"
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
              <CarouselContent className="size-full ml-0">
                {allImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="size-full pl-0 basis-full"
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
                        onClick={(e) => e.stopPropagation()}
                        className="max-h-[80svh] object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full size-12 bg-secondary/20 border border-secondary/40 backdrop-blur-sm pointer-events-auto hover:bg-secondary/40 text-primary"
                  onClick={() => api?.scrollPrev()}
                >
                  <ArrowLeft size={18} strokeWidth={3} />
                  <span className="sr-only">Prethodna slika</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full size-12 bg-secondary/20 border border-secondary/40 backdrop-blur-sm pointer-events-auto hover:bg-secondary/40 text-primary"
                  onClick={() => api?.scrollNext()}
                >
                  <ArrowRight size={18} strokeWidth={3} />
                  <span className="sr-only">Sljedeća slika</span>
                </Button>
              </div>
              <div className="absolute top-[5lvh] right-4 pointer-events-none">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full size-12 bg-secondary/20 border border-accent/40 backdrop-blur-sm pointer-events-auto hover:bg-secondary/40 text-accent"
                  onClick={handleClose}
                >
                  <X size={18} strokeWidth={3} />
                  <span className="sr-only">Zatvori</span>
                </Button>
              </div>
              {!isClosing && (
                <div className="absolute bottom-[5lvh] right-4 pointer-events-none">
                  <div className="rounded-full px-4 py-2 bg-secondary/20 backdrop-blur-sm text-accent text-sm font-medium border border-secondary/40">
                    {current + 1} / {allImages.length}
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
