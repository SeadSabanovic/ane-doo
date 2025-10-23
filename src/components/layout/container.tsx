import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("container mx-auto px-4 sm:px-8 xl:px-0", className)}
    >
      {children}
    </section>
  );
}
