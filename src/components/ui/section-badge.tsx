import { Badge } from "./badge";

export default function SectionBadge({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <Badge className="text-md font-bold gap-2!" variant="secondary">
      {icon && (
        <span className="font-light flex items-center justify-center size-5">
          {icon}
        </span>
      )}
      {children}
    </Badge>
  );
}
