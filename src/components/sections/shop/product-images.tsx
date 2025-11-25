import AnimatedImage from "@/components/ui/animated-image";
import { cn } from "@/lib/utils";

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

  return (
    <div
      className={cn(
        "flex-1 w-full lg:max-w-xl flex flex-col gap-4 lg:h-fit lg:sticky top-36",
        className
      )}
    >
      <div className="relative aspect-square rounded-md overflow-hidden w-full max-h-[60svh]">
        <AnimatedImage
          src={mainImage}
          alt={productName}
          width={1000}
          height={1000}
          className="object-cover size-full"
          priority={true}
        />
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-md overflow-hidden w-full"
            >
              <AnimatedImage
                src={image}
                alt={`${productName} - Slika ${index + 1}`}
                width={1000}
                height={1000}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
