import Container from "@/components/layout/container";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import SectionBadge from "@/components/ui/section-badge";
import AnimatedImage from "@/components/ui/animated-image";
import SpinningText from "@/components/ui/spinning-text";
import Link from "next/link";

const SALE_SPIN_TEXT =
  "OGRANIČENA KOLIČINA • AKCIJA • OGRANIČENA KOLIČINA • AKCIJA • ";

export default function SaleSection() {
  return (
    <section className="py-10">
      <Container className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-2 text-center lg:items-start lg:text-left">
          <SectionBadge>Do isteka zaliha</SectionBadge>
          <h2 className="text-6xl font-bold">AKCIJA</h2>
          <p className="text-muted-foreground mt-2 text-xl">
            Naš asortiman na akciji nikada nije isti. Svake sedmice pažljivo
            biramo nove artikle koji postaju dio naše posebne ponude, dok se
            drugi vraćaju u redovnu prodaju.
          </p>
          <Link href="/shop?akcija=1">
            <InteractiveHoverButton className="mt-8 w-fit text-center lg:text-left">
              Istraži ponudu
            </InteractiveHoverButton>
          </Link>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-md">
          <AnimatedImage
            src="/images/home/ane-doo-sale.jpg"
            alt="Sale"
            width={1000}
            height={1000}
            className="absolute top-0 left-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <SpinningText
              text={SALE_SPIN_TEXT}
              radius={26.3}
              speed={22}
              direction="normal"
              className="size-[min(80%,500px)]"
              textClassName="fill-[#fffcf3] text-[4px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
