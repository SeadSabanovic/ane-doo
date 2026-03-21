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
  const hasIntro = Boolean((title && title.length > 0) || (description && description.length > 0));
  const hasBreadcrumbs = Boolean(breadcrumbItems && breadcrumbItems.length > 0);

  return (
    <header
      className={cn(
        "relative overflow-hidden mb-20 bg-secondary/10",
        !hasIntro && "mb-4 lg:mb-20"
      )}
    >
      {hasIntro && (
        <>
          <PageHeaderLines />
          <Container className="relative z-10 py-8 lg:py-12">
            <div>
              {title && title.length > 0 && (
                <h1 className="font-bold text-3xl lg:text-4xl text-primary text-center">
                  {title}
                </h1>
              )}
              {description && description.length > 0 && (
                <p className="text-lg mt-2 mx-auto max-w-2xl italic text-center">
                  {description}
                </p>
              )}
            </div>
          </Container>
        </>
      )}

      {hasBreadcrumbs && (
        <div className="relative z-10 backdrop-blur-sm bg-secondary/5">
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
                          className="text-primary/70 transition-colors hover:text-primary"
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </Container>
        </div>
      )}
    </header>
  );
}
