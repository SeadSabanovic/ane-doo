import Link from "next/link";
import { Button } from "./button";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-muted">
        <Icon className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button asChild size="lg">
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  );
}
