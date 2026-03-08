import Container from "@/components/layout/container";
import EmptyState from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center py-16">
      <Container>
        <EmptyState
          icon={SearchX}
          title="Stranica nije pronađena"
          description="Nažalost, stranica koju tražite ne postoji ili je premještena."
          actionLabel="Nastavi sa kupovinom"
          actionHref="/shop"
        />
      </Container>
    </div>
  );
}
