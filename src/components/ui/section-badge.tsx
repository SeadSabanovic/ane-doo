import { Badge } from "./badge";

export default function SectionBadge({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <Badge variant="secondary">
      {children}
      {icon && icon}
    </Badge>
  );
}
