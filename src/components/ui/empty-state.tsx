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
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="bg-primary/10 flex h-24 w-24 items-center justify-center rounded-full">
        <Icon className="text-primary h-12 w-12" />
      </div>
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <InteractiveHoverButton
        href={actionHref}
        className="w-fit text-center"
      >
        {actionLabel}
      </InteractiveHoverButton>
    </div>
  );
}
