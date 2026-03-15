import { Fragment } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Container from "./container";
import { cn } from "@/lib/utils";

type BreadcrumbItemType = {
  label: string;
  href: string;
};

export default function PageHeader({
  title,
  description = "",
  breadcrumbItems,
}: {
  title?: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItemType[];
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden py-8 lg:py-12 mb-20 bg-primary/20",
        !title && "py-4 lg:py-6 mb-4 lg:mb-20"
      )}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e7e5e4 1px, transparent 1px), linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage:
            "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px), radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          WebkitMaskImage:
            "repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px), repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px), radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <Container className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {title && title.length > 0 && (
            <h1 className="font-bold text-3xl lg:text-4xl text-primary">
              {title}
            </h1>
          )}
          {description && description.length > 0 && (
            <p className="text-lg mt-2 max-w-2xl italic">
              {description}
            </p>
          )}
        </div>
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <Fragment key={index}>
                  <BreadcrumbItem className="text-lg">
                    {index === breadcrumbItems.length - 1 ? (
                      <BreadcrumbPage className="text-primary">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        asChild
                        className="text-primary/70"
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </Container>
    </div>
  );
}
