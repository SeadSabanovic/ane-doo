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
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
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
  const isModalOpen = selectedIndex !== -1;

  // Scroll to selected index when modal opens
  useEffect(() => {
    if (!api || selectedIndex === -1) return;
    api.scrollTo(selectedIndex);
  }, [api, selectedIndex]);

  const handleClose = useCallback(() => {
    setSelectedIndex(-1);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handleClose]);

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
        <DialogContent className="p-0 overflow-hidden bg-transparent backdrop-blur-sm border-0 max-w-[unset]! h-screen">
          <DialogTitle className="sr-only">Gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Image gallery viewer with navigation controls
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
                    <div className="flex items-center justify-center size-full">
                      <AnimatedImage
                        src={image}
                        alt={`${productName} - Slika ${index + 1}`}
                        width={1200}
                        height={1200}
                        className="max-h-[80svh] w-full object-contain max-w-[95vw]"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur-md pointer-events-auto hover:bg-white/30"
                  onClick={() => api?.scrollPrev()}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full bg-white/20 backdrop-blur-md pointer-events-auto hover:bg-white/30"
                  onClick={() => api?.scrollNext()}
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
