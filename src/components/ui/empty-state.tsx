import Link from "next/link";
import { InteractiveHoverButton } from "./interactive-hover-button";
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
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
        <Icon className="w-12 h-12 text-primary" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Link href={actionHref}>
        <InteractiveHoverButton className="w-fit text-center">
          {actionLabel}
        </InteractiveHoverButton>
      </Link>
    </div>
  );
}
