import React from "react";
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

type BreadcrumbItemType = {
  label: string;
  href: string;
};

export default function PageHeader({
  title,
  description,
  breadcrumbItems,
}: {
  title: string;
  description: string;
  breadcrumbItems?: BreadcrumbItemType[];
}) {
  return (
    <div className="py-8 lg:py-12 border-b mb-20 bg-gray-50">
      <Container className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-bold text-3xl xl:text-4xl ">{title}</h1>
          <p className="text-lg mt-2">{description}</p>
        </div>
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem className="text-lg">
                    {index === breadcrumbItems.length - 1 ? (
                      <BreadcrumbPage className="text-primary">
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </Container>
    </div>
  );
}
