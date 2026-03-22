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
import PageHeaderLines from "../icons/page-header-lines";
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
  const hasIntro = Boolean(
    (title && title.length > 0) || (description && description.length > 0),
  );
  const hasBreadcrumbs = Boolean(breadcrumbItems && breadcrumbItems.length > 0);

  return (
    <section
      className={cn(
        "bg-secondary/10 relative mb-20 overflow-hidden",
        !hasIntro && "mb-4 lg:mb-20",
      )}
      aria-label={hasIntro ? "Uvod stranice" : "Putanja stranice"}
    >
      {hasIntro && (
        <>
          <PageHeaderLines />
          <Container className="relative z-10 py-8 lg:py-12">
            <div>
              {title && title.length > 0 && (
                <h1 className="text-primary text-center text-3xl font-bold lg:text-4xl">
                  {title}
                </h1>
              )}
              {description && description.length > 0 && (
                <p className="mx-auto mt-2 max-w-2xl text-center text-lg italic">
                  {description}
                </p>
              )}
            </div>
          </Container>
        </>
      )}

      {hasBreadcrumbs && (
        <div className="bg-secondary/5 relative z-10 backdrop-blur-sm">
          <Container className="py-4">
            <Breadcrumb>
              <BreadcrumbList className="justify-end">
                {breadcrumbItems?.map((item, index) => (
                  <Fragment key={index}>
                    <BreadcrumbItem className="text-base">
                      {index === breadcrumbItems.length - 1 ? (
                        <BreadcrumbPage className="text-primary">
                          {item.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          asChild
                          className="text-primary/70 hover:text-primary transition-colors"
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
          </Container>
        </div>
      )}
    </section>
  );
}
