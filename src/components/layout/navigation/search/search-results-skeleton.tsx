import { cn } from "@/lib/utils";

function SearchProductRowSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-start gap-3 rounded-md pr-3", className)}>
      <div className="bg-muted/20 size-24 shrink-0 animate-pulse rounded-md" />
      <div className="flex min-w-0 flex-1 flex-col gap-2 py-2">
        <div className="bg-muted/20 h-6 max-w-[min(100%,280px)] animate-pulse rounded-md" />
        <div className="bg-muted/20 h-4 w-28 animate-pulse rounded-md" />
      </div>
      <div className="bg-muted/20 size-8 shrink-0 animate-pulse self-center rounded-md" />
    </div>
  );
}

export default function SearchResultsSkeleton({
  count = 5,
}: {
  count?: number;
}) {
  return (
    <div
      className="flex flex-col gap-2 space-y-2"
      role="status"
      aria-label="Učitavanje rezultata"
    >
      <span className="sr-only">Učitavanje rezultata…</span>
      {Array.from({ length: count }).map((_, i) => (
        <SearchProductRowSkeleton key={i} />
      ))}
    </div>
  );
}
