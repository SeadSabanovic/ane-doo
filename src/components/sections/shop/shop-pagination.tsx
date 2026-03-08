import {
  Pagination,
  PaginationLink,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";

interface ShopPaginationProps {
  currentPage: number;
  totalPages: number;
  searchParamsString: string;
}

const WINDOW_SIZE = 1;

function buildPageHref(
  page: number,
  baseSearchParams: URLSearchParams
) {
  const params = new URLSearchParams(baseSearchParams.toString());

  if (page <= 1) {
    params.delete("stranica");
  } else {
    params.set("stranica", String(page));
  }

  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "ellipsis-left" | "ellipsis-right"> = [1];
  const start = Math.max(2, currentPage - WINDOW_SIZE);
  const end = Math.min(totalPages - 1, currentPage + WINDOW_SIZE);

  if (start > 2) {
    pages.push("ellipsis-left");
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < totalPages - 1) {
    pages.push("ellipsis-right");
  }

  pages.push(totalPages);
  return pages;
}

export default function ShopPagination({
  currentPage,
  totalPages,
  searchParamsString,
}: ShopPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const baseSearchParams = new URLSearchParams(searchParamsString);
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={hasPrevious ? buildPageHref(currentPage - 1, baseSearchParams) : "#"}
            aria-disabled={!hasPrevious}
            className={!hasPrevious ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {visiblePages.map((page, index) =>
          typeof page === "number" ? (
            <PaginationItem key={page}>
              <PaginationLink
                href={buildPageHref(page, baseSearchParams)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={`${page}-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={hasNext ? buildPageHref(currentPage + 1, baseSearchParams) : "#"}
            aria-disabled={!hasNext}
            className={!hasNext ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
